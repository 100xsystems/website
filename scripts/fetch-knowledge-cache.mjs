/**
 * fetch-knowledge-cache.mjs
 *
 * Copies the entire static-data/knowledge/ tree from the registry into the
 * website's public/knowledge-cache/ directory so resource hubs and knowledge
 * entities are served as static JSON.
 *
 * Supports both folder structures (resource hubs: languages/javascript/index.json)
 * and flat structures (legacy knowledge entity JSON files).
 *
 * Runs during the prebuild phase (before `next build`).
 *
 * Two strategies:
 *   A) Development: copy from local filesystem (../registry/static-data/knowledge/)
 *   B) CI/Build:    shallow clone the registry repo
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

const CACHE_DIR = path.resolve('public', 'knowledge-cache');
const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve('..', 'registry', 'static-data', 'knowledge');

/**
 * Copy the entire knowledge directory tree recursively.
 * Handles both folder structures (languages/javascript/index.json)
 * and flat files (principles/solid.json).
 */
function copyKnowledgeTree(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return 0;

  let count = 0;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectory — this handles both
      // folder/slug/index.json (resource hubs) and
      // folder/flatfile.json (knowledge entities — legacy)
      fs.mkdirSync(destPath, { recursive: true });
      count += copyKnowledgeTree(srcPath, destPath);
    } else if (entry.name.endsWith('.json') || entry.name.endsWith('.md')) {
      fs.cpSync(srcPath, destPath, { force: true });
      count++;
    }
  }

  return count;
}

/**
 * Strategy A: Copy from local filesystem.
 * Used during development when the registry is a sibling directory.
 */
function copyFromLocal() {
  if (!fs.existsSync(LOCAL_REGISTRY_DIR)) return false;

  console.log(`  Copying from local: ${LOCAL_REGISTRY_DIR}`);

  // Clear stale cache first
  if (fs.existsSync(CACHE_DIR)) {
    fs.rmSync(CACHE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const totalFiles = copyKnowledgeTree(LOCAL_REGISTRY_DIR, CACHE_DIR);
  console.log(`  Copied ${totalFiles} files`);

  return true;
}

/**
 * Strategy B: Shallow clone the registry repo.
 * Used in CI/build environments.
 */
function cloneFromGit() {
  const tmpDir = path.join('/tmp', 'registry-knowledge-clone');

  console.log(`  Cloning from GitHub: ${REGISTRY_REPO}#${REGISTRY_BRANCH}`);

  // Clean up any previous clone
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true });
  }

  try {
    execSync(
      `git clone --depth=1 --branch=${REGISTRY_BRANCH} https://github.com/${REGISTRY_REPO}.git ${tmpDir}`,
      { stdio: 'pipe', timeout: 30000 },
    );
  } catch (err) {
    console.error(`  Git clone failed: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }

  const knowledgeDir = path.join(tmpDir, 'static-data', 'knowledge');
  if (!fs.existsSync(knowledgeDir)) {
    console.log('  No static-data/knowledge/ directory in registry');
    return false;
  }

  // Clear stale cache
  if (fs.existsSync(CACHE_DIR)) {
    fs.rmSync(CACHE_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const totalFiles = copyKnowledgeTree(knowledgeDir, CACHE_DIR);

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`  Cloned ${totalFiles} files`);

  return true;
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log('\n📚  Fetching knowledge graph cache...');

  // Try strategy A first (local copy)
  const success = copyFromLocal() || cloneFromGit();

  if (success) {
    let entityCount = 0;
    const categories = ['principles', 'patterns', 'tools', 'languages', 'frameworks', 'infrastructure', 'databases', 'data-formats', 'runtimes'];    
    for (const cat of categories) {
      const catDir = path.join(CACHE_DIR, cat);
      if (fs.existsSync(catDir)) {
        entityCount += fs.readdirSync(catDir).length;
      }
    }
    console.log(`  ✅ ${entityCount} items in knowledge cache`);
  } else {
    console.log('  ⚠  Could not fetch knowledge cache (no registry found)');
  }
}

main();
