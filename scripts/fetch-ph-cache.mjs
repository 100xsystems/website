#!/usr/bin/env node
/**
 * fetch-ph-cache.mjs
 *
 * Build-time script that fetches Product Hunt data from the registry repo
 * and generates public/ph-cache/ for the website.
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve(process.cwd(), process.env.LOCAL_REGISTRY_DIR || '../registry');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'ph-cache');

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function copyFromLocal() {
  const localPhDir = path.join(LOCAL_REGISTRY_DIR, 'producthunt');
  if (!fs.existsSync(localPhDir)) return false;

  console.log('  Copying Product Hunt data from local registry...');
  ensureOutputDir();
  execSync(`cp -r "${localPhDir}/." "${OUTPUT_DIR}/"`, { stdio: 'pipe' });
  console.log('  ✓ Copied Product Hunt cache');
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

    const phDir = path.join(cacheDir, 'producthunt');
    if (!fs.existsSync(phDir)) {
      console.warn('  ⚠ No producthunt/ directory in registry');
      return false;
    }

    ensureOutputDir();
    execSync(`cp -r "${phDir}/." "${OUTPUT_DIR}/"`, { stdio: 'pipe' });
    try { fs.rmSync(cacheDir, { recursive: true, force: true }); } catch {}
    return true;
  } catch (err) {
    console.warn(`  ⚠ Failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

function main() {
  console.log('\n🦊 Fetching Product Hunt cache...');
  const ok = copyFromLocal() || cloneFromGitHub();
  if (!ok) {
    console.warn('  ⚠ No Product Hunt data available. Skipping.');
  }
}

main();
