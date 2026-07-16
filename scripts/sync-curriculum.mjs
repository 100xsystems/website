/**
 * ## Curriculum Sync Script
 *
 * Fetches the 100xSystems registry and shallow-clones all system repositories
 * into `.curriculum/systems/` so the website can render them during SSG build.
 *
 * This script runs as part of `npm run build` (via the `presync` or `prebuild` hook).
 *
 * Registry: https://github.com/100xsystems/registry
 * Systems are cloned into `.curriculum/systems/{slug}/`
 *
 * @packageDocumentation
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ─── Configuration ──────────────────────────────────────────────────

const REGISTRY_URL = process.env.REGISTRY_URL ||
  'https://raw.githubusercontent.com/100xsystems/registry/main/registry.json';

const CACHE_DIR = path.resolve(
  process.env.CURRICULUM_CACHE_DIR || path.join(process.cwd(), '.curriculum')
);

const SYSTEMS_DIR = path.join(CACHE_DIR, 'systems');
const CLI_DOCS_DIR = path.join(CACHE_DIR, 'cli-docs');

// ─── Helpers ────────────────────────────────────────────────────────

async function fetchJson(url) {
  const httpModule = url.startsWith('https') ? 'https' : 'http';
  const http = await import(httpModule);

  return new Promise((resolve, reject) => {
    const req = http.get(url, { headers: { 'User-Agent': '100xSystems-Website/1.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        fetchJson(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Registry responded with ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { reject(new Error('Failed to parse registry JSON')); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(new Error('Registry request timed out')); });
  });
}

/**
 * Shallow-clone a git repository into the target directory.
 * Skips if the target already exists (cached from a previous build).
 */
function cloneRepo(repoUrl, targetDir) {
  if (fs.existsSync(targetDir) && fs.existsSync(path.join(targetDir, '.git'))) {
    // Already cloned — pull latest
    try {
      execSync('git pull --ff-only', { cwd: targetDir, stdio: 'pipe', timeout: 30000 });
      console.log(`  ✓ Updated ${path.basename(targetDir)}`);
    } catch {
      // If pull fails, re-clone
      fs.rmSync(targetDir, { recursive: true, force: true });
      execSync(`git clone --depth=1 ${repoUrl} "${targetDir}"`, { stdio: 'pipe', timeout: 60000 });
      console.log(`  ✓ Cloned ${path.basename(targetDir)}`);
    }
  } else {
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
    execSync(`git clone --depth=1 ${repoUrl} "${targetDir}"`, { stdio: 'pipe', timeout: 60000 });
    console.log(`  ✓ Cloned ${path.basename(targetDir)}`);
  }
}

// ─── Main ───────────────────────────────────────────────────────────

async function main() {
  console.log('\n📚 Syncing curriculum from registry...\n');

  // Step 1: Fetch registry
  console.log('  Fetching registry...');
  let registry;
  try {
    registry = await fetchJson(REGISTRY_URL);
  } catch (err) {
    console.error(`  ✗ Failed to fetch registry: ${err.message}`);
    // If cache exists, use it. Otherwise, fail gracefully.
    if (fs.existsSync(SYSTEMS_DIR) && fs.readdirSync(SYSTEMS_DIR).length > 0) {
      console.log('  Using cached curriculum (registry fetch failed).\n');
      return;
    }
    console.log('  No cached curriculum available. Continuing without systems.\n');
    return;
  }

  if (!registry.systems || !Array.isArray(registry.systems)) {
    console.log('  No systems found in registry.\n');
    return;
  }

  // Step 2: Clone each system repo
  console.log(`  Found ${registry.systems.length} system(s) in registry.\n`);
  fs.mkdirSync(SYSTEMS_DIR, { recursive: true });

  for (const system of registry.systems) {
    const cloneUrl = `https://${system.repo}`.replace(/^https:\/\/https:\/\//, 'https://');
    const targetDir = path.join(SYSTEMS_DIR, system.slug);
    console.log(`  Syncing ${system.slug}...`);
    try {
      cloneRepo(cloneUrl, targetDir);
    } catch (err) {
      console.error(`  ✗ Failed to sync ${system.slug}: ${err.message}`);
    }
  }

  console.log(`\n✅ Curriculum synced to ${CACHE_DIR}\n`);
}

main().catch((err) => {
  console.error(`\n❌ Sync failed: ${err.message}\n`);
  process.exit(1);
});
