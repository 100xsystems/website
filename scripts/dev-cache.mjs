#!/usr/bin/env node
/**
 * dev-cache.mjs
 *
 * ALWAYS clones the registry repo from GitHub and extracts all cached data:
 *   - Feeds   → public/feed-cache.json
 *   - YC      → public/yc-cache/
 *   - PH      → public/ph-cache/
 *
 * No local path fallback — always fresh from GitHub.
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const CACHE_DIR = path.resolve(process.cwd(), '.registry-cache');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// ── Helpers ───────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function cleanClone() {
  const url = `https://github.com/${REGISTRY_REPO}.git`;
  if (fs.existsSync(CACHE_DIR)) {
    console.log(`  Pulling ${REGISTRY_REPO} (shallow)...`);
    execSync(`git -C "${CACHE_DIR}" pull origin ${REGISTRY_BRANCH} --depth=1`, {
      stdio: 'pipe',
      timeout: 30000,
    });
  } else {
    console.log(`  Cloning ${REGISTRY_REPO} (shallow)...`);
    execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} "${url}" "${CACHE_DIR}"`, {
      stdio: 'pipe',
      timeout: 60000,
    });
  }
}

// ── Feed Cache ────────────────────────────────────────────────────────

function buildFeedCache() {
  const feedsDir = path.join(CACHE_DIR, 'feeds');
  if (!fs.existsSync(feedsDir)) {
    console.warn('  ⚠ No feeds/ directory in registry');
    return;
  }

  const feedIds = fs.readdirSync(feedsDir)
    .filter((f) => f.endsWith('.json') && f !== '.gitkeep')
    .map((f) => f.replace(/\.json$/, ''));

  if (feedIds.length === 0) {
    console.warn('  ⚠ No feed JSON files found');
    return;
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

  const outPath = path.join(PUBLIC_DIR, 'feed-cache.json');
  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(outPath + '.tmp', JSON.stringify(cache), 'utf-8');
  fs.renameSync(outPath + '.tmp', outPath);

  console.log(`  ✓ feed-cache.json — ${feedIds.length} feeds, ${totalItems} items`);
}

// ── YC Cache ──────────────────────────────────────────────────────────

function buildYcCache() {
  const ycDir = path.join(CACHE_DIR, 'yc');
  if (!fs.existsSync(ycDir)) {
    console.warn('  ⚠ No yc/ directory in registry');
    return;
  }

  const outDir = path.join(PUBLIC_DIR, 'yc-cache');
  ensureDir(outDir);
  let copied = 0;

  const essential = ['featured.json', 'meta.json', 'index.json', 'companies.json'];
  for (const file of essential) {
    const src = path.join(ycDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outDir, file));
      copied++;
    }
  }

  // Daily changes
  const changesDir = path.join(ycDir, 'changes');
  if (fs.existsSync(changesDir)) {
    const changesOut = path.join(outDir, 'changes');
    ensureDir(changesOut);
    for (const f of fs.readdirSync(changesDir)) {
      if (f.endsWith('.json') || f.endsWith('.md')) {
        fs.copyFileSync(path.join(changesDir, f), path.join(changesOut, f));
        copied++;
      }
    }
  }

  console.log(`  ✓ yc-cache/ — ${copied} files`);
}

// ── PH Cache ──────────────────────────────────────────────────────────

function buildPhCache() {
  const phDir = path.join(CACHE_DIR, 'producthunt');
  if (!fs.existsSync(phDir)) {
    console.warn('  ⚠ No producthunt/ directory in registry');
    return;
  }

  const outDir = path.join(PUBLIC_DIR, 'ph-cache');
  ensureDir(outDir);
  let copied = 0;

  for (const f of fs.readdirSync(phDir)) {
    if (f.endsWith('.json')) {
      fs.copyFileSync(path.join(phDir, f), path.join(outDir, f));
      copied++;
    }
  }

  console.log(`  ✓ ph-cache/ — ${copied} files`);
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  const startTime = Date.now();
  console.log('\n📦 Cloning registry from GitHub...');

  try {
    cleanClone();
  } catch (err) {
    console.error(`  ✗ Failed to clone registry: ${err.message}`);
    console.error('  ✗ Ensure the registry repo exists at https://github.com/' + REGISTRY_REPO);
    process.exit(1);
  }

  buildFeedCache();
  buildYcCache();
  buildPhCache();

  // Cleanup
  try { fs.rmSync(CACHE_DIR, { recursive: true, force: true }); } catch {}

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`📦 Dev cache complete in ${elapsed}s\n`);
}

main();
