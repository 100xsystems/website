#!/usr/bin/env node
/**
 * fetch-feed-cache.mjs
 *
 * Build-time script that fetches all feed JSON files from the registry repo
 * and generates `public/feed-cache.json`.
 *
 * This runs during `next build` (via `prebuild` script) to generate the cache
 * that is deployed with the static assets.
 *
 * Two strategies, tried in order:
 *   STRATEGY A: Copy from local registry path (development)
 *   STRATEGY B: Shallow clone the registry repo from GitHub (CI/build)
 *
 * Environment variables:
 *   REGISTRY_REPO      — GitHub repo path (default: "100xsystems/registry")
 *   REGISTRY_BRANCH    — Branch to use (default: "main")
 *   LOCAL_REGISTRY_DIR — Path to local registry clone (default: "../registry")
 *
 * ETHICAL NOTE:
 *   We cache only metadata — title, link, summary, author, publishedAt, guid.
 *   We NEVER store article body content. Users click through to the original
 *   source to read.
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve(process.cwd(), process.env.LOCAL_REGISTRY_DIR || '../registry');
const LOCAL_FEEDS_DIR = path.join(LOCAL_REGISTRY_DIR, 'feeds');
const LOCAL_CACHE_DIR = path.resolve(process.cwd(), '.registry-cache');
const OUTPUT_FILE = path.resolve(process.cwd(), 'public', 'feed-cache.json');
const TEMP_OUTPUT = path.resolve(process.cwd(), 'public', 'feed-cache.json.tmp');

// ── Helpers ───────────────────────────────────────────────────────────

function ensurePublicDir() {
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
}

/**
 * Strategy A: Copy feeds from a local registry path.
 * Used during local development when the registry is checked out
 * as a sibling directory.
 */
function copyFromLocal() {
  if (!fs.existsSync(LOCAL_FEEDS_DIR)) {
    return false;
  }
  const files = fs.readdirSync(LOCAL_FEEDS_DIR).filter((f) => f.endsWith('.json') && f !== '.gitkeep');
  if (files.length === 0) {
    return false;
  }

  console.log(`  Copying ${files.length} feed files from ${LOCAL_FEEDS_DIR}...`);
  const destDir = path.join(LOCAL_CACHE_DIR, 'feeds');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const file of files) {
    fs.copyFileSync(path.join(LOCAL_FEEDS_DIR, file), path.join(destDir, file));
  }
  return true;
}

/**
 * Strategy B: Shallow clone the registry repo from GitHub.
 * Used in CI/Vercel builds where the local registry isn't available.
 */
function cloneFromGitHub() {
  try {
    const cloneUrl = `https://github.com/${REGISTRY_REPO}.git`;
    if (fs.existsSync(LOCAL_CACHE_DIR)) {
      console.log('  Registry cache exists — pulling latest...');
      execSync(`git -C "${LOCAL_CACHE_DIR}" pull origin ${REGISTRY_BRANCH} --depth=1`, {
        stdio: 'pipe',
        timeout: 30000,
      });
    } else {
      console.log(`  Cloning ${REGISTRY_REPO} (shallow)...`);
      execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} ${cloneUrl} "${LOCAL_CACHE_DIR}"`, {
        stdio: 'pipe',
        timeout: 60000,
      });
    }
    return true;
  } catch (err) {
    console.warn(`  ⚠ Shallow clone failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

/**
 * Get the list of feed IDs from the cloned feeds directory.
 */
function getFeedIdsFromCache() {
  const feedsDir = path.join(LOCAL_CACHE_DIR, 'feeds');
  if (!fs.existsSync(feedsDir)) return [];
  return fs.readdirSync(feedsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''));
}

/**
 * Build the combined cache from individual JSON files in the cloned repo.
 */
function buildCache() {
  const feedsDir = path.join(LOCAL_CACHE_DIR, 'feeds');
  const feedIds = getFeedIdsFromCache();

  if (feedIds.length === 0) {
    console.warn('  ⚠ No feed JSON files found in registry cache');
    return { totalItems: 0, feedCount: 0 };
  }

  const feeds = {};
  let totalItems = 0;

  for (const feedId of feedIds) {
    try {
      const filePath = path.join(feedsDir, `${feedId}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      feeds[feedId] = data;
      totalItems += data.items?.length ?? 0;
    } catch (err) {
      console.warn(`  ⚠ Error reading ${feedId}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  const cache = {
    version: 2,
    updatedAt: new Date().toISOString(),
    feedCount: feedIds.length,
    totalItems,
    feeds,
  };

  // Atomic write: write to temp, then rename
  ensurePublicDir();
  fs.writeFileSync(TEMP_OUTPUT, JSON.stringify(cache), 'utf-8');
  fs.renameSync(TEMP_OUTPUT, OUTPUT_FILE);

  console.log(`  ✓ Generated ${OUTPUT_FILE}`);
  console.log(`    Feeds: ${feedIds.length}, Total items: ${totalItems}`);

  return { totalItems, feedCount: feedIds.length };
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  console.log('\n' + '📦 Fetching feed cache from registry...');
  const startTime = Date.now();

  // Strategy A: Try local path first (development speed)
  const localOk = copyFromLocal();

  if (!localOk) {
    // Strategy B: Clone from GitHub (CI/build)
    console.log('  Local registry not found, cloning from GitHub...');
    const cloned = cloneFromGitHub();
    if (!cloned) {
      console.error('  ✗ Failed to clone registry from GitHub');
      console.error('  ✗ Ensure the registry repo exists at https://github.com/' + REGISTRY_REPO);
      process.exit(1);
    }
  }

  // Build the combined cache
  const result = buildCache();

  // Cleanup
  try {
    fs.rmSync(LOCAL_CACHE_DIR, { recursive: true, force: true });
  } catch { /* ignore */ }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('   Done in ' + elapsed + 's\n');
}

main();
