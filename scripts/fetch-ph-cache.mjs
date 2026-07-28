#!/usr/bin/env node
/**
 * fetch-ph-cache.mjs
 *
 * Build/CI script that ALWAYS clones the registry repo from GitHub
 * and copies Product Hunt data to `public/ph-cache/`.
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

function copyPhData() {
  const phDir = path.join(CACHE_DIR, 'producthunt');
  if (!fs.existsSync(phDir)) {
    console.warn('  ⚠ No producthunt/ directory in registry');
    return 0;
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

  return copied;
}

function main() {
  console.log('\n🦊 Fetching Product Hunt cache from registry...');
  const startTime = Date.now();

  cloneRegistry();
  const copied = copyPhData();
  console.log(`  ✓ Copied ${copied} files to public/ph-cache/`);

  try { fs.rmSync(CACHE_DIR, { recursive: true, force: true }); } catch {}

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('   Done in ' + elapsed + 's\n');
}

main();
