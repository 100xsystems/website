#!/usr/bin/env node
/**
 * dev-cache.mjs
 *
 * Runs ALL registry cache scripts in sequence for `npm run dev`.
 * Ensures the website has fresh local data from the registry before starting.
 *
 * This runs:
 *   1. fetch-feed-cache.mjs  — clones registry, builds public/feed-cache.json
 *   2. fetch-yc-cache.mjs    — copies yc/ → public/yc-cache/
 *   3. fetch-ph-cache.mjs    — copies producthunt/ → public/ph-cache/
 *
 * Skips awesome and knowledge caches (not needed for dev, adds 30s+).
 */

import { spawnSync } from 'node:child_process';
import * as path from 'node:path';
import * as fs from 'node:fs';

const SCRIPTS_DIR = path.resolve(import.meta.dirname || path.dirname(new URL(import.meta.url).pathname));

const CACHE_SCRIPTS = [
  { file: 'fetch-feed-cache.mjs', label: 'Feed cache' },
  { file: 'fetch-yc-cache.mjs',   label: 'YC cache' },
  { file: 'fetch-ph-cache.mjs',   label: 'PH cache' },
];

function main() {
  const startTime = Date.now();
  let allOk = true;

  for (const { file, label } of CACHE_SCRIPTS) {
    const scriptPath = path.join(SCRIPTS_DIR, file);
    if (!fs.existsSync(scriptPath)) {
      console.warn(`  ⚠ Script not found: ${scriptPath}`);
      continue;
    }

    const result = spawnSync('node', [scriptPath], {
      stdio: 'inherit',
      cwd: path.resolve(SCRIPTS_DIR, '..'),
    });

    if (result.status !== 0) {
      console.warn(`  ⚠ ${label} failed (exit code ${result.status})`);
      allOk = false;
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`📦 Dev cache complete in ${elapsed}s${allOk ? '' : ' (with warnings)'}`);
}

main();
