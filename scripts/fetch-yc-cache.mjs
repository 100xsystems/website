#!/usr/bin/env node
/**
 * fetch-yc-cache.mjs
 *
 * Build-time script that fetches Y Combinator data from the registry repo
 * and generates public/yc-cache/ for the website.
 *
 * Two strategies:
 *   A) Copy from local registry path (development)
 *   B) Shallow clone the registry repo from GitHub (CI/build)
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve(process.cwd(), process.env.LOCAL_REGISTRY_DIR || '../registry');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'yc-cache');

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function copyFromLocal() {
  const localYcDir = path.join(LOCAL_REGISTRY_DIR, 'yc');
  if (!fs.existsSync(localYcDir)) return false;

  console.log('  Copying YC data from local registry...');
  ensureOutputDir();
  execSync(`cp -r "${localYcDir}/." "${OUTPUT_DIR}/"`, { stdio: 'pipe' });

  const files = fs.readdirSync(OUTPUT_DIR, { recursive: true }).filter(f => f.endsWith('.json')).length;
  console.log(`  ✓ Copied YC cache (${files} JSON files)`);
  return true;
}

function cloneFromGitHub() {
  try {
    const cacheDir = path.resolve(process.cwd(), '.registry-cache');
    if (fs.existsSync(cacheDir)) {
      execSync(`git -C "${cacheDir}" pull origin ${REGISTRY_BRANCH} --depth=1`, { stdio: 'pipe', timeout: 30000 });
    } else {
      execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} https://github.com/${REGISTRY_REPO}.git "${cacheDir}"`, { stdio: 'pipe', timeout: 60000 });
    }

    const ycDir = path.join(cacheDir, 'yc');
    if (!fs.existsSync(ycDir)) {
      console.warn('  ⚠ No yc/ directory in registry');
      return false;
    }

    ensureOutputDir();
    execSync(`cp -r "${ycDir}/." "${OUTPUT_DIR}/"`, { stdio: 'pipe' });
    try { fs.rmSync(cacheDir, { recursive: true, force: true }); } catch {}
    return true;
  } catch (err) {
    console.warn(`  ⚠ Failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

function main() {
  console.log('\n🔬 Fetching YC cache...');
  const ok = copyFromLocal() || cloneFromGitHub();
  if (!ok) {
    console.warn('  ⚠ No YC data available. Skipping.');
  }
}

main();
