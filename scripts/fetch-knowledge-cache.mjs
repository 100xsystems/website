/**
 * fetch-knowledge-cache.mjs
 *
 * Copies the knowledge graph JSON files from the registry into the
 * website's public/ directory so they can be served statically.
 *
 * Runs during the prebuild phase (before `next build`).
 *
 * Two strategies:
 *   A) Development: copy from local filesystem (../registry/knowledge/)
 *   B) CI/Build:    shallow clone the registry repo
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

const CACHE_DIR = path.resolve('public', 'knowledge-cache');
const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const LOCAL_REGISTRY_DIR = path.resolve('..', 'registry', 'knowledge');

// Category directories to copy from the registry
const CATEGORY_DIRS = ['principles', 'languages', 'tools', 'patterns'];

/**
 * Copy a category directory's JSON files from source to destination.
 */
function copyCategoryDir(srcBase, destBase, category) {
  const srcDir = path.join(srcBase, category);
  if (!fs.existsSync(srcDir)) return 0;

  const destDir = path.join(destBase, category);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  let count = 0;
  for (const file of files) {
    if (file.endsWith('.json')) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
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

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Copy manifest.json
  const manifestSrc = path.join(LOCAL_REGISTRY_DIR, 'manifest.json');
  if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, path.join(CACHE_DIR, 'manifest.json'));
  }

  // Copy each category directory (principles, languages, tools, patterns)
  let totalFiles = 0;
  for (const cat of CATEGORY_DIRS) {
    const count = copyCategoryDir(LOCAL_REGISTRY_DIR, CACHE_DIR, cat);
    if (count > 0) {
      console.log(`  Copied ${count} ${cat} files`);
      totalFiles += count;
    }
  }

  console.log(`  Total: ${totalFiles} entity files`);

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

  const knowledgeDir = path.join(tmpDir, 'knowledge');
  if (!fs.existsSync(knowledgeDir)) {
    console.log('  No knowledge/ directory in registry');
    return false;
  }

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Copy recursively
  execSync(`cp -r "${knowledgeDir}/." "${CACHE_DIR}/"`, { stdio: 'pipe' });

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });

  // Count files
  let totalFiles = 0;
  for (const cat of CATEGORY_DIRS) {
    const catDir = path.join(CACHE_DIR, cat);
    if (fs.existsSync(catDir)) {
      totalFiles += fs.readdirSync(catDir).filter((f) => f.endsWith('.json')).length;
    }
  }
  console.log(`  Cloned ${totalFiles} entity files`);

  return true;
}

// ── Main ─────────────────────────────────────────────────────────────

function main() {
  console.log('\n📚  Fetching knowledge graph cache...');

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  // Try strategy A first (local copy)
  const success = copyFromLocal() || cloneFromGit();

  if (success) {
    // Verify
    const manifestPath = path.join(CACHE_DIR, 'manifest.json');
    const hasManifest = fs.existsSync(manifestPath);
    let entityCount = 0;
    for (const cat of CATEGORY_DIRS) {
      const catDir = path.join(CACHE_DIR, cat);
      if (fs.existsSync(catDir)) {
        entityCount += fs.readdirSync(catDir).filter((f) => f.endsWith('.json')).length;
      }
    }

    if (hasManifest) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      console.log(`  ✅ ${manifest.totalEntities} entities (${entityCount} files cached)`);
    } else {
      console.log(`  ⚠  ${entityCount} entity files cached but no manifest`);
    }
  } else {
    console.log('  ⚠  Could not fetch knowledge cache (no registry found)');
  }
}

main();
