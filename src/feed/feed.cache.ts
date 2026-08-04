/**
 * feed.cache.ts
 *
 * Reads article data from the registry cache instead of fetching RSS live.
 *
 * CACHE HIERARCHY:
 *   1. /tmp/feed-cache.json — ISR revalidation output (fastest, per-cycle)
 *   2. public/feed-cache.json — Build-time artifact (deployed with static assets)
 *   3. GitHub raw — Fallback: fetch all feed JSON files (full re-sync)
 *
 * ETHICAL NOTE:
 *   This cache stores ONLY metadata (guid, title, link, summary, author, publishedAt).
 *   We NEVER store article body content. Users click through to original source.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import type { FeedCache, RegistryFeedData } from './feed.types';
import type { FeedSource, FeedExplorerFeed } from './feed.types';
import { FEED_REGISTRY } from './feed.constants';

// ── Configuration ─────────────────────────────────────────────────────

const CACHE_LIFETIME_MS = 24 * 60 * 60 * 1000;
const BUILD_CACHE_PATH = path.join(process.cwd(), 'public', 'feed-cache.json');
const TMP_CACHE_PATH = '/tmp/feed-cache.json';

const REGISTRY_OWNER = '100xsystems';
const REGISTRY_REPO = 'registry';
const REGISTRY_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${REGISTRY_OWNER}/${REGISTRY_REPO}/${REGISTRY_BRANCH}`;
const FEEDS_RAW_BASE = `${RAW_BASE}/dynamic-data/feeds`;
const FEED_REGISTRY_URL = `${RAW_BASE}/scripts/github-workflow/feed-registry.json`;

// ── Helpers ───────────────────────────────────────────────────────────

/**
 * Check if the cache is stale (older than CACHE_LIFETIME_MS).
 */
function isCacheStale(cachePath: string): boolean {
  try {
    const stat = fs.statSync(cachePath);
    return Date.now() - stat.mtimeMs > CACHE_LIFETIME_MS;
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

// ── Full Fetch ────────────────────────────────────────────────────────

/**
 * Fetch ALL individual feed JSON files from GitHub raw and build a complete cache.
 * Used as a fallback when no local cache exists.
 */
async function fetchFromRegistryRaw(): Promise<FeedCache | null> {
  console.log('[feed.cache] Fetching ALL feeds from registry (full re-sync)...');

  // 1. First fetch the feed registry to discover which feeds exist
  const registry = await fetchFeedRegistryFromRemote();
  if (!registry || registry.length === 0) {
    console.error('[feed.cache] Could not fetch feed-registry.json from registry');
    return null;
  }

  console.log(`[feed.cache] Discovered ${registry.length} feeds from registry`);

  const feeds: Record<string, RegistryFeedData> = {};
  let totalItems = 0;
  let feedCount = 0;

  const feedIds = registry.map((f) => f.id);

  // 2. Fetch all feed files in parallel
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

  writeCacheToDisk(cache, TMP_CACHE_PATH);
  console.log(`[feed.cache] Full fetch complete: ${feedCount} feeds, ${totalItems} items`);

  return cache;
}

/**
 * Fetch the feed-registry.json from the registry to get the live list of feeds.
 */
async function fetchFeedRegistryFromRemote(): Promise<FeedSource[] | null> {
  try {
    const res = await fetch(FEED_REGISTRY_URL);
    if (!res.ok) return null;
    return (await res.json()) as FeedSource[];
  } catch {
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Load the feed cache.
 *
 * Priority:
 *  1. /tmp/feed-cache.json (ISR revalidation) — return immediately
 *  2. public/feed-cache.json (build-time artifact):
 *     a. Not stale → return immediately
 *     b. Stale → full re-fetch from GitHub raw
 *  3. Nothing local → full re-fetch from GitHub raw
 */
export async function loadFeedCache(): Promise<FeedCache | null> {
  // 1. Try /tmp/ first (ISR revalidation from a previous cycle)
  const tmpCache = readCacheFromDisk(TMP_CACHE_PATH);
  if (tmpCache && !isCacheStale(TMP_CACHE_PATH)) {
    return tmpCache;
  }

  // 2. Try build cache (public/feed-cache.json)
  const buildCache = readCacheFromDisk(BUILD_CACHE_PATH);
  if (buildCache) {
    if (!isCacheStale(BUILD_CACHE_PATH)) {
      return buildCache;
    }

    // Stale — do full re-sync
    console.log('[feed.cache] Build cache is stale. Doing full re-sync...');
    const freshCache = await fetchFromRegistryRaw();
    return freshCache ?? buildCache;
  }

  // 3. Nothing local — do full fetch
  console.log('[feed.cache] No local cache found. Fetching from GitHub raw...');
  return fetchFromRegistryRaw();
}

/**
 * Get the feed data for a specific feed ID from the cache.
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

/**
 * Build the full list of feed sources shown on the feed explorer, enriched
 * with each feed's indexed article count and latest-activity date.
 *
 * The source set is the union of the curated FEED_REGISTRY and any feeds
 * present in the cache but not yet in the registry constant, so every
 * indexed source is represented. Metadata from the registry wins where
 * available; cache-only feeds fall back to their cached fields.
 *
 * Sources are ordered newest-first: feeds with a recent article (≤ 30 days)
 * come first, then feeds with older (or no) activity, so the UI can show the
 * active sources up front and tuck the rest behind a "Show all" action.
 */
export function buildFeedExplorerFeeds(cache: FeedCache | null): FeedExplorerFeed[] {
  const registryById = new Map(FEED_REGISTRY.map((f) => [f.id, f]));
  const now = Date.now();
  const monthMs = 30 * 24 * 60 * 60 * 1000;

  // Union of feed IDs: curated registry first, then cache-only feeds.
  const ids: string[] = FEED_REGISTRY.map((f) => f.id);
  for (const cached of Object.values(cache?.feeds ?? {})) {
    if (!registryById.has(cached.feedId)) ids.push(cached.feedId);
  }

  return ids
    .map((id) => {
      const reg = registryById.get(id);
      const data = cache?.feeds?.[id];
      const latestCount = data?.items?.length ?? 0;
      const articleCount = data?.totalIndexed ?? latestCount;

      let latestMs = 0;
      for (const item of data?.items ?? []) {
        const t = item.publishedAt ? Date.parse(item.publishedAt) : NaN;
        if (!isNaN(t) && t > latestMs) latestMs = t;
      }

      return {
        id,
        name: reg?.name ?? data?.feedName ?? id.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        rssUrl: reg?.rssUrl ?? data?.feedRssUrl ?? '',
        siteUrl: reg?.siteUrl ?? data?.feedSiteUrl ?? '',
        icon: reg?.icon,
        tags: reg?.tags ?? data?.tags ?? [],
        description: reg?.description ?? 'Engineering articles indexed in the registry.',
        addedBy: reg?.addedBy ?? ('curator' as const),
        language: reg?.language ?? 'en',
        articleCount,
        latestPublishedAt: latestMs ? new Date(latestMs).toISOString() : null,
        isRecent: latestMs > now - monthMs,
      };
    })
    .sort((a, b) => {
      if (a.isRecent !== b.isRecent) return a.isRecent ? -1 : 1;
      const dateA = a.latestPublishedAt ? Date.parse(a.latestPublishedAt) : 0;
      const dateB = b.latestPublishedAt ? Date.parse(b.latestPublishedAt) : 0;
      if (dateB !== dateA) return dateB - dateA;
      return b.articleCount - a.articleCount;
    });
}
