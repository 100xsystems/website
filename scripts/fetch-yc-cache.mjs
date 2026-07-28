#!/usr/bin/env node
/**
 * fetch-yc-cache.mjs
 *
 * Build/CI script that ALWAYS clones the registry repo from GitHub
 * and copies YC data to `public/yc-cache/`.
 *
 * Environment variables:
 *   REGISTRY_REPO      — GitHub repo path (default: "100xsystems/registry")
 *   REGISTRY_BRANCH    — Branch to use (default: "main")
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const CACHE_DIR = path.resolve(process.cwd(), '.registry-cache');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

const YC_ESSENTIAL = ['featured.json', 'meta.json', 'index.json', 'companies.json'];

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

function copyYcData() {
  const ycDir = path.join(CACHE_DIR, 'yc');
  if (!fs.existsSync(ycDir)) {
    console.warn('  ⚠ No yc/ directory in registry');
    return 0;
  }

  const outDir = path.join(PUBLIC_DIR, 'yc-cache');
  ensureDir(outDir);
  let copied = 0;

  for (const file of YC_ESSENTIAL) {
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

  return copied;
}

function main() {
  console.log('\n📦 Fetching YC cache from registry...');
  const startTime = Date.now();

  cloneRegistry();
  const copied = copyYcData();
  console.log(`  ✓ Copied ${copied} files to public/yc-cache/`);

  try { fs.rmSync(CACHE_DIR, { recursive: true, force: true }); } catch {}

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('   Done in ' + elapsed + 's\n');
}

main();
