#!/usr/bin/env node
/**
 * fetch-awesome-cache.mjs
 *
 * Build-time script that copies all awesome list JSON files from the registry
 * repo into the website's public/ directory, so they can be consumed at runtime.
 *
 * This runs during `next build` (via `prebuild` script) to generate the cache
 * that is deployed with the static assets.
 *
 * Two strategies, tried in order:
 *   STRATEGY A: Copy from local registry path (development)
 *   STRATEGY B: Shallow clone the registry repo from GitHub (CI/build)
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve(process.cwd(), process.env.LOCAL_REGISTRY_DIR || '../registry');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'awesome-cache');

// ── Helpers ───────────────────────────────────────────────────────────

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

/**
 * Strategy A: Copy awesome JSON files from a local registry path.
 */
function copyFromLocal() {
  const localAwesomeDir = path.join(LOCAL_REGISTRY_DIR, 'awesome');
  if (!fs.existsSync(localAwesomeDir)) return false;
  
  const files = fs.readdirSync(localAwesomeDir).filter(
    (f) => f.endsWith('.json') && f !== '.gitkeep' && f !== 'index.json'
  );
  if (files.length === 0) return false;

  console.log(`  Copying ${files.length} awesome list files from ${localAwesomeDir}...`);

  ensureOutputDir();
  for (const file of files) {
    fs.copyFileSync(path.join(localAwesomeDir, file), path.join(OUTPUT_DIR, file));
  }
  // Also copy the aggregated index
  const indexSrc = path.join(localAwesomeDir, 'index.json');
  if (fs.existsSync(indexSrc)) {
    fs.copyFileSync(indexSrc, path.join(OUTPUT_DIR, 'index.json'));
  }

  console.log(`  ✓ Generated ${OUTPUT_DIR} (${files.length + 1} files)`);
  return true;
}

/**
 * Strategy B: Shallow clone the registry repo and extract awesome/ directory.
 */
function cloneFromGitHub() {
  try {
    const cloneUrl = `https://github.com/${REGISTRY_REPO}.git`;
    const cacheDir = path.resolve(process.cwd(), '.registry-cache');

    if (fs.existsSync(cacheDir)) {
      console.log('  Registry cache exists — pulling latest...');
      execSync(`git -C "${cacheDir}" pull origin ${REGISTRY_BRANCH} --depth=1`, {
        stdio: 'pipe',
        timeout: 30000,
      });
    } else {
      console.log(`  Cloning ${REGISTRY_REPO} (shallow)...`);
      execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} ${cloneUrl} "${cacheDir}"`, {
        stdio: 'pipe',
        timeout: 60000,
      });
    }

    const awesomeDir = path.join(cacheDir, 'awesome');
    if (!fs.existsSync(awesomeDir)) {
      console.warn('  ⚠ No awesome/ directory in registry');
      return false;
    }

    const files = fs.readdirSync(awesomeDir).filter(
      (f) => f.endsWith('.json') && f !== '.gitkeep' && f !== 'index.json'
    );
    if (files.length === 0) {
      console.warn('  ⚠ No JSON files in awesome/ directory');
      return false;
    }

    ensureOutputDir();
    for (const file of files) {
      fs.copyFileSync(path.join(awesomeDir, file), path.join(OUTPUT_DIR, file));
    }
    const indexSrc = path.join(awesomeDir, 'index.json');
    if (fs.existsSync(indexSrc)) {
      fs.copyFileSync(indexSrc, path.join(OUTPUT_DIR, 'index.json'));
    }

    console.log(`  ✓ Generated ${OUTPUT_DIR} (${files.length + 1} files)`);

    try { fs.rmSync(cacheDir, { recursive: true, force: true }); } catch { /* ignore */ }
    return true;
  } catch (err) {
    console.warn(`  ⚠ Shallow clone failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  console.log('\n' + '⭐ Fetching awesome list cache from registry...');
  const startTime = Date.now();

  const localOk = copyFromLocal();
  if (!localOk) {
    console.log('  Local awesome list cache not found, cloning from GitHub...');
    const cloned = cloneFromGitHub();
    if (!cloned) {
      console.warn('  ✗ Could not fetch awesome list cache.');
      return;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('   Done in ' + elapsed + 's\n');
}

main();
