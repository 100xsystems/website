#!/usr/bin/env node
/**
 * fetch-feed-cache.mjs
 *
 * Build/CI script that ALWAYS clones the registry repo from GitHub
 * and generates `public/feed-cache.json` from the feeds/ directory.
 *
 * Environment variables:
 *   REGISTRY_REPO      — GitHub repo path (default: "100xsystems/registry")
 *   REGISTRY_BRANCH    — Branch to use (default: "main")
 *
 * ETHICAL NOTE:
 *   We cache only metadata — title, link, summary, author, publishedAt, guid.
 *   We NEVER store article body content.
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const CACHE_DIR = path.resolve(process.cwd(), '.registry-cache');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'feed-cache.json');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function cloneRegistry() {
  try { fs.rmSync(CACHE_DIR, { recursive: true, force: true }); } catch {}
  const url = `https://github.com/${REGISTRY_REPO}.git`;
  console.log(`  Cloning ${REGISTRY_REPO} (shallow)...`);
  execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} "${url}" "${CACHE_DIR}"`, {
    stdio: 'pipe',
    timeout: 60000,
  });
}

function buildCache() {
  const feedsDir = path.join(CACHE_DIR, 'feeds');
  if (!fs.existsSync(feedsDir)) {
    console.warn('  ⚠ No feeds/ directory in registry');
    return { totalItems: 0, feedCount: 0 };
  }

  const feedIds = fs.readdirSync(feedsDir)
    .filter((f) => f.endsWith('.json') && f !== '.gitkeep')
    .map((f) => f.replace(/\.json$/, ''));

  if (feedIds.length === 0) {
    console.warn('  ⚠ No feed JSON files found');
    return { totalItems: 0, feedCount: 0 };
  }

  const feeds = {};
  let totalItems = 0;

  for (const feedId of feedIds) {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(feedsDir, `${feedId}.json`), 'utf-8'));
      feeds[feedId] = data;
      totalItems += data.items?.length ?? 0;
    } catch (err) {
      console.warn(`  ⚠ Error reading ${feedId}: ${err.message}`);
    }
  }

  const cache = {
    version: 2,
    updatedAt: new Date().toISOString(),
    feedCount: feedIds.length,
    totalItems,
    feeds,
  };

  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(OUTPUT_FILE + '.tmp', JSON.stringify(cache), 'utf-8');
  fs.renameSync(OUTPUT_FILE + '.tmp', OUTPUT_FILE);

  console.log(`  ✓ ${OUTPUT_FILE}`);
  console.log(`    Feeds: ${feedIds.length}, Total items: ${totalItems}`);
  return { totalItems, feedCount: feedIds.length };
}

function main() {
  console.log('\n' + '📦 Fetching feed cache from registry...');
  const startTime = Date.now();

  cloneRegistry();
  const result = buildCache();

  try { fs.rmSync(CACHE_DIR, { recursive: true, force: true }); } catch {}

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('   Done in ' + elapsed + 's\n');
}

main();
