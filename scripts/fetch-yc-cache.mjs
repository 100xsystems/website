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
const YC_OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'yc-cache');
const PH_OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'ph-cache');

function ensureOutputDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/** Only copy these essential YC files (avoids thousands of batch files in public/) */
const YC_ESSENTIAL_FILES = ['featured.json', 'meta.json', 'index.json', 'companies.json'];

/** Only copy these essential PH files */
const PH_ESSENTIAL_FILES = ['products.json', 'index.json'];

/**
 * Copy a directory with filtering, returning count of files copied.
 */
function copyDirWithFilter(srcDir, destDir, filterFn) {
  if (!fs.existsSync(srcDir)) return 0;
  ensureOutputDir(destDir);
  let count = 0;
  const files = fs.readdirSync(srcDir).filter(filterFn);
  for (const file of files) {
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    count++;
  }
  return count;
}

/**
 * Copy YC data from a registry directory to public/yc-cache/
 */
function copyYcData(ycDir) {
  if (!fs.existsSync(ycDir)) return 0;
  
  ensureOutputDir(YC_OUTPUT_DIR);
  let copied = 0;

  // Essential files
  for (const file of YC_ESSENTIAL_FILES) {
    const src = path.join(ycDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(YC_OUTPUT_DIR, file));
      copied++;
    }
  }

  // Daily changes directory
  const changesDir = path.join(ycDir, 'changes');
  copied += copyDirWithFilter(
    changesDir,
    path.join(YC_OUTPUT_DIR, 'changes'),
    (f) => f.endsWith('.json') || f.endsWith('.md'),
  );

  return copied;
}

/**
 * Copy PH data from a registry directory to public/ph-cache/
 */
function copyPhData(phDir) {
  if (!fs.existsSync(phDir)) return 0;
  
  ensureOutputDir(PH_OUTPUT_DIR);
  let copied = 0;

  // Essential files
  for (const file of PH_ESSENTIAL_FILES) {
    const src = path.join(phDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(PH_OUTPUT_DIR, file));
      copied++;
    }
  }

  // Day-wise archive files (YYYY-MM-DD.json)
  copied += copyDirWithFilter(
    phDir,
    PH_OUTPUT_DIR,
    (f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f),
  );

  return copied;
}

function copyFromLocal() {
  const localYcDir = path.join(LOCAL_REGISTRY_DIR, 'yc');
  const localPhDir = path.join(LOCAL_REGISTRY_DIR, 'producthunt');
  
  if (!fs.existsSync(localYcDir) && !fs.existsSync(localPhDir)) return false;

  let totalCopied = 0;

  if (fs.existsSync(localYcDir)) {
    console.log('  Copying YC data from local registry...');
    totalCopied += copyYcData(localYcDir);
  }

  if (fs.existsSync(localPhDir)) {
    console.log('  Copying Product Hunt data from local registry...');
    totalCopied += copyPhData(localPhDir);
  }

  console.log(`  ✓ Copied ${totalCopied} cache files from local registry`);
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
    const phDir = path.join(cacheDir, 'producthunt');
    
    let totalCopied = 0;

    if (fs.existsSync(ycDir)) {
      console.log('  Copying YC data from registry...');
      totalCopied += copyYcData(ycDir);
    } else {
      console.warn('  ⚠ No yc/ directory in registry');
    }

    if (fs.existsSync(phDir)) {
      console.log('  Copying Product Hunt data from registry...');
      totalCopied += copyPhData(phDir);
    } else {
      console.warn('  ⚠ No producthunt/ directory in registry');
    }

    console.log(`  ✓ Copied ${totalCopied} cache files from registry`);
    try { fs.rmSync(cacheDir, { recursive: true, force: true }); } catch {}
    return totalCopied > 0;
  } catch (err) {
    console.warn(`  ⚠ Failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
}

function main() {
  console.log('\n📦 Fetching registry cache...');
  const ok = copyFromLocal() || cloneFromGitHub();
  if (!ok) {
    console.warn('  ⚠ No registry data available. Skipping cache.');
  }
}

main();
