/**
 * feed.cache.ts
 *
 * Reads article data from the registry cache instead of fetching RSS live.
 *
 * CACHE HIERARCHY:
 *   1. /tmp/feed-cache.json — ISR revalidation output (fastest, per-cycle)
 *   2. public/feed-cache.json — Build-time artifact (deployed with static assets)
 *   3. Delta merge — Fetch daily/delta.json (tiny, < 1KB) and merge into existing cache
 *   4. GitHub raw — Fallback: fetch all 51 feed JSON files (full re-sync)
 *
 * INCREMENTAL DELTA OPTIMIZATION:
 *   Instead of re-downloading all 51 feed JSON files every ISR cycle (which could be
 *   MBs of data), the system fetches ONLY the daily/delta.json file from the registry.
 *   This file contains only items added in the last 24 hours (typically 0-10 items).
 *   New items are merged into the existing /tmp/ cache, avoiding the full re-fetch.
 *
 *   On cold start (no /tmp/ or public/ cache), falls back to the full fetch.
 *
 * ETHICAL NOTE:
 *   This cache stores ONLY metadata (guid, title, link, summary, author, publishedAt).
 *   We NEVER store article body content. Users click through to original source.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { FeedCache, RegistryFeedData, RegistryFeedItem, DeltaCache } from './feed.types';
import { FEED_REGISTRY } from './feed.constants';

// ── Configuration ─────────────────────────────────────────────────────

const CACHE_LIFETIME_MS = 24 * 60 * 60 * 1000; // 24 hours
const FULL_FETCH_THRESHOLD_MS = 72 * 60 * 60 * 1000; // 72 hours — if cache is older, do full fetch
const BUILD_CACHE_PATH = path.join(process.cwd(), 'public', 'feed-cache.json');
const TMP_CACHE_PATH = '/tmp/feed-cache.json';

const REGISTRY_OWNER = '100xsystems';
const REGISTRY_REPO = 'registry';
const REGISTRY_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${REGISTRY_OWNER}/${REGISTRY_REPO}/${REGISTRY_BRANCH}`;
const FEEDS_RAW_BASE = `${RAW_BASE}/feeds`;
const DELTA_RAW_URL = `${RAW_BASE}/daily/delta.json`;

// ── Helpers ───────────────────────────────────────────────────────────

/**
 * Check if the cache is stale (older than CACHE_LIFETIME_MS).
 */
function isCacheStale(cachePath: string): boolean {
  try {
    const stat = fs.statSync(cachePath);
    return Date.now() - stat.mtimeMs > CACHE_LIFETIME_MS;
  } catch {
    return true; // If we can't stat it, treat as stale
  }
}

/**
 * Check if the cache is very stale (> FULL_FETCH_THRESHOLD_MS).
 * If so, delta merge may miss multiple days of updates, so we do a full fetch.
 */
function isCacheVeryStale(cachePath: string): boolean {
  try {
    const stat = fs.statSync(cachePath);
    return Date.now() - stat.mtimeMs > FULL_FETCH_THRESHOLD_MS;
  } catch {
    return true;
  }
}

/**
 * Read the cache file and parse it.
 */
function readCacheFromDisk(cachePath: string): FeedCache | null {
  try {
    const raw = fs.readFileSync(cachePath, 'utf-8');
    return JSON.parse(raw) as FeedCache;
  } catch {
    return null;
  }
}

/**
 * Write cache to disk atomically (temp file → rename).
 */
function writeCacheToDisk(cache: FeedCache, outputPath: string): boolean {
  try {
    const tmpPath = outputPath + '.tmp';
    fs.writeFileSync(tmpPath, JSON.stringify(cache), 'utf-8');
    fs.renameSync(tmpPath, outputPath);
    return true;
  } catch (err) {
    console.warn('[feed.cache] Could not write to', outputPath, ':', err);
    return false;
  }
}

// ── Delta Fetch & Merge ───────────────────────────────────────────────

/**
 * Fetch the daily/delta.json from the registry repo.
 * This file contains ONLY items added in the last 24 hours — typically < 1KB.
 */
async function fetchDeltaFromRegistry(): Promise<DeltaCache | null> {
  try {
    const res = await fetch(DELTA_RAW_URL);
    if (!res.ok) {
      if (res.status === 404) {
        console.log('[feed.cache] No delta.json found in registry (first run?)');
      } else {
        console.warn(`[feed.cache] Delta fetch returned HTTP ${res.status}`);
      }
      return null;
    }
    const data = (await res.json()) as DeltaCache;
    console.log(`[feed.cache] Fetched delta: ${data.totalNewItems} new items across ${data.feedCount} feeds (${data.date})`);
    return data;
  } catch (err) {
    console.warn('[feed.cache] Failed to fetch delta:', err instanceof Error ? err.message : String(err));
    return null;
  }
}

/**
 * Merge new items from a delta into an existing cache.
 * For each feed in the delta:
 *   1. Find the existing feed data in the cache
 *   2. If it exists, prepend new items (filtering by GUID to avoid duplicates)
 *   3. If it doesn't exist yet, create a new entry
 *   4. Cap at 10,000 items per feed
 */
function mergeDeltaIntoCache(existingCache: FeedCache, delta: DeltaCache): FeedCache {
  const merged = structuredClone(existingCache);
  let totalAdded = 0;

  for (const [feedId, newItems] of Object.entries(delta.items)) {
    if (!newItems || newItems.length === 0) continue;

    const existingFeedData = merged.feeds[feedId];

    if (existingFeedData) {
      // Build set of existing GUIDs for deduplication
      const existingGuids = new Set(existingFeedData.items.map((i) => i.guid));

      // Filter out items that already exist in the cache
      const trulyNew = newItems.filter((item) => !existingGuids.has(item.guid));

      if (trulyNew.length === 0) continue;

      // Prepend new items (newest first)
      const updatedItems = [...trulyNew, ...existingFeedData.items];

      // Cap at 10,000 items
      existingFeedData.items = updatedItems.slice(0, 10_000);
      existingFeedData.totalIndexed = (existingFeedData.totalIndexed ?? 0) + trulyNew.length;
      existingFeedData.updatedAt = delta.generatedAt;

      totalAdded += trulyNew.length;
    } else {
      // Feed doesn't exist in cache yet — create a new entry
      const feedDef = FEED_REGISTRY.find((f) => f.id === feedId);
      if (!feedDef) continue;

      merged.feeds[feedId] = {
        feedId,
        feedName: feedDef.name,
        feedSiteUrl: feedDef.siteUrl,
        feedRssUrl: feedDef.rssUrl,
        tags: feedDef.tags,
        updatedAt: delta.generatedAt,
        items: newItems.slice(0, 10_000),
        totalIndexed: newItems.length,
      };
      totalAdded += newItems.length;
    }
  }

  // Update cache metadata
  merged.updatedAt = delta.generatedAt;
  merged.totalItems = Object.values(merged.feeds).reduce((sum, f) => sum + (f.items?.length ?? 0), 0);
  merged.feedCount = Object.keys(merged.feeds).length;

  console.log(`[feed.cache] Delta merge complete: +${totalAdded} new items`);

  return merged;
}

// ── Full Fetch (Fallback) ─────────────────────────────────────────────

/**
 * Fetch ALL individual feed JSON files from GitHub raw and build a complete cache.
 * Used as a fallback when:
 *   - No local cache exists (cold start)
 *   - Cache is very stale (>72h) — delta would miss multiple days
 *   - Delta fetch failed
 */
async function fetchFromRegistryRaw(): Promise<FeedCache | null> {
  console.log('[feed.cache] Fetching ALL feeds from registry (full re-sync)...');

  const feeds: Record<string, RegistryFeedData> = {};
  let totalItems = 0;
  let feedCount = 0;

  const feedIds = FEED_REGISTRY.map((f) => f.id);

  // Fetch all feed files in parallel
  const results = await Promise.allSettled(
    feedIds.map(async (feedId) => {
      const url = `${FEEDS_RAW_BASE}/${feedId}.json`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} for ${feedId}`);
      }
      return (await res.json()) as RegistryFeedData;
    })
  );

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const feedId = feedIds[i];

    if (result.status === 'fulfilled') {
      const data = result.value;
      feeds[feedId] = data;
      totalItems += data.items?.length ?? 0;
      feedCount++;
    } else {
      console.warn(`[feed.cache] Failed to fetch ${feedId}: ${result.reason}`);
    }
  }

  if (feedCount === 0) {
    console.error('[feed.cache] Could not fetch any feed data from registry');
    return null;
  }

  const cache: FeedCache = {
    version: 2,
    updatedAt: new Date().toISOString(),
    feedCount,
    totalItems,
    feeds,
  };

  // Write to /tmp/ for subsequent ISR requests
  writeCacheToDisk(cache, TMP_CACHE_PATH);
  console.log(`[feed.cache] Full fetch complete: ${feedCount} feeds, ${totalItems} items`);

  return cache;
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Load the feed cache with incremental delta optimization.
 *
 * Priority:
 *  1. /tmp/feed-cache.json (ISR revalidation) — return immediately
 *  2. public/feed-cache.json (build-time artifact):
 *     a. Not stale → return immediately
 *     b. Stale but < 72h → try delta merge into /tmp/ and return
 *     c. Very stale (>72h) → full re-fetch from GitHub raw
 *  3. Nothing local → try delta first, then full fetch
 *
 * The delta optimization means that instead of fetching all 51 feed JSON files
 * on every ISR cycle (potentially MBs), we fetch a single tiny delta.json file
 * (< 1KB) and merge it into the existing cache in /tmp/.
 *
 * IMPORTANT: /tmp/ is also checked for staleness. If the /tmp/ cache is
 * older than 24h, we fetch a fresh delta and merge, updating /tmp/. This
 * ensures daily updates are picked up even when /tmp/ persists between ISR cycles.
 */
export async function loadFeedCache(): Promise<FeedCache | null> {
  // 1. Try /tmp/ first (ISR revalidation from a previous cycle)
  //    But check staleness — if /tmp/ is old, try delta merge
  const tmpCache = readCacheFromDisk(TMP_CACHE_PATH);
  if (tmpCache) {
    if (!isCacheStale(TMP_CACHE_PATH)) {
      // Fresh enough — return as-is
      return tmpCache;
    }
    // /tmp/ is stale — try delta merge to refresh it
    console.log('[feed.cache] /tmp/ cache is stale. Fetching delta...');
    const delta = await fetchDeltaFromRegistry();
    if (delta) {
      if (delta.totalNewItems > 0) {
        const merged = mergeDeltaIntoCache(tmpCache, delta);
        writeCacheToDisk(merged, TMP_CACHE_PATH);
        return merged;
      }
      // Empty delta — just touch the cache to reset staleness
      tmpCache.updatedAt = delta.generatedAt;
      writeCacheToDisk(tmpCache, TMP_CACHE_PATH);
      return tmpCache;
    }
    // Delta unavailable — keep using stale /tmp/ (it's still valid data)
    return tmpCache;
  }

  // 2. Try build cache (public/feed-cache.json)
  const buildCache = readCacheFromDisk(BUILD_CACHE_PATH);
  if (buildCache) {
    // 2a. Not stale — return build cache as-is
    if (!isCacheStale(BUILD_CACHE_PATH)) {
      return buildCache;
    }

    // 2b. Stale, but not VERY stale (< 72h) — try delta merge
    if (!isCacheVeryStale(BUILD_CACHE_PATH)) {
      console.log('[feed.cache] Build cache is stale. Trying delta merge...');
      const delta = await fetchDeltaFromRegistry();

      if (delta && delta.totalNewItems > 0) {
        // Merge delta into the build cache and write to /tmp/
        const merged = mergeDeltaIntoCache(buildCache, delta);
        writeCacheToDisk(merged, TMP_CACHE_PATH);
        return merged;
      }

      if (delta && delta.totalNewItems === 0) {
        // Delta exists but empty — no new items. Update /tmp/ with current cache.
        console.log('[feed.cache] No new items in delta. Copying build cache to /tmp/');
        writeCacheToDisk(buildCache, TMP_CACHE_PATH);
        // Update cache's updatedAt to reset staleness
        buildCache.updatedAt = delta.generatedAt;
        writeCacheToDisk(buildCache, TMP_CACHE_PATH);
        return buildCache;
      }

      // Delta fetch failed — fall back to full fetch
      console.log('[feed.cache] Delta unavailable. Falling back to full fetch...');
      const freshCache = await fetchFromRegistryRaw();
      return freshCache ?? buildCache;
    }

    // 2c. Very stale (> 72h) — do full fetch (delta would miss multiple days)
    console.log('[feed.cache] Build cache is very stale (>72h). Doing full re-sync...');
    const freshCache = await fetchFromRegistryRaw();
    return freshCache ?? buildCache;
  }

  // 3. Nothing local — try delta first (maybe we can build from scratch)
  console.log('[feed.cache] No local cache found. Checking for delta...');
  const delta = await fetchDeltaFromRegistry();

  if (delta && delta.totalNewItems > 0) {
    // We have a delta but no base cache — need full fetch first, then apply delta
    console.log('[feed.cache] Delta found but no base cache. Doing full fetch...');
  }

  // Fall back to full fetch
  return fetchFromRegistryRaw();
}

/**
 * Get the feed data for a specific feed ID from the cache.
 * Returns null if the feed is not found in the cache.
 */
export function getFeedDataFromCache(cache: FeedCache, feedId: string): RegistryFeedData | null {
  return cache.feeds[feedId] ?? null;
}

/**
 * Get the list of feed IDs that exist in the cache.
 */
export function getCachedFeedIds(cache: FeedCache): string[] {
  return Object.keys(cache.feeds);
}

/**
 * Check if the cache has data for a specific feed.
 */
export function hasFeedInCache(cache: FeedCache, feedId: string): boolean {
  return feedId in cache.feeds;
}
