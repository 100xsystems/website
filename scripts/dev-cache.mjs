#!/usr/bin/env node
/**
 * dev-cache.mjs
 *
 * Builds the feed, YC, and PH cache for the website from the registry.
 *
 * Strategy A (development): Copy from local filesystem (../registry/)
 * Strategy B (CI/build):    Shallow clone the registry repo from GitHub
 *
 * When pushing to GitHub: once the registry changes are pushed, the website
 * CI will pick them up via the clone strategy. For local dev, the local
 * filesystem path is used so you can iterate without pushing.
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// ── Config ────────────────────────────────────────────────────────────

const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
const CLONE_DIR = path.resolve(process.cwd(), '.registry-cache');
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

// ── Helpers ───────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Always shallow-clone the registry repo fresh from GitHub.
 *  Never reuse an existing clone dir — guarantees 100% fresh data on every run. */
function cloneFromGitHub() {
  const url = `https://github.com/${REGISTRY_REPO}.git`;
  if (fs.existsSync(CLONE_DIR)) {
    console.log(`  Removing stale clone (${CLONE_DIR})...`);
    fs.rmSync(CLONE_DIR, { recursive: true, force: true });
  }
  console.log(`  Cloning ${REGISTRY_REPO} (shallow, fresh)...`);
  execSync(`git clone --depth=1 --branch=${REGISTRY_BRANCH} "${url}" "${CLONE_DIR}"`, {
    stdio: 'pipe',
    timeout: 60000,
  });
}

// ── Feed Cache ────────────────────────────────────────────────────────

function buildFeedCache(baseDir) {
  const feedsDir = path.join(baseDir, 'dynamic-data', 'feeds');
  if (!fs.existsSync(feedsDir)) {
    console.warn('  ⚠ No dynamic-data/feeds/ directory in registry');
    return;
  }

  const feedIds = fs.readdirSync(feedsDir)
    .filter((f) => f.endsWith('.json') && f !== '.gitkeep')
    .map((f) => f.replace(/\.json$/, ''));

  if (feedIds.length === 0) {
    console.warn('  ⚠ No feed JSON files found');
    return;
  }

  const feeds = {};
  let totalItems = 0;

  for (const feedId of feedIds) {
    try {
      const filePath = path.join(feedsDir, `${feedId}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      feeds[feedId] = data;
      totalItems += data.items?.length ?? 0;
    } catch (err) {
      console.warn(`  ⚠ Error reading ${feedId}: ${err.message}`);
    }
  }

  const cache = {
    version: 2,
    updatedAt: new Date().toISOString(),
    feedCount: feedIds.length,
    totalItems,
    feeds,
  };

  const outPath = path.join(PUBLIC_DIR, 'feed-cache.json');
  ensureDir(PUBLIC_DIR);
  fs.writeFileSync(outPath + '.tmp', JSON.stringify(cache), 'utf-8');
  fs.renameSync(outPath + '.tmp', outPath);

  console.log(`  ✓ feed-cache.json — ${feedIds.length} feeds, ${totalItems} items`);
}

// ── YC Cache ──────────────────────────────────────────────────────────

function buildYcCache(baseDir) {
  const ycDir = path.join(baseDir, 'dynamic-data', 'yc');
  if (!fs.existsSync(ycDir)) {
    console.warn('  ⚠ No dynamic-data/yc/ directory in registry');
    return;
  }

  const outDir = path.join(PUBLIC_DIR, 'yc-cache');
  ensureDir(outDir);
  let copied = 0;

  const essential = ['featured.json', 'meta.json', 'index.json', 'companies.json'];
  for (const file of essential) {
    const src = path.join(ycDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(outDir, file));
      copied++;
    }
  }

  // Changes directory
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

  console.log(`  ✓ yc-cache/ — ${copied} files`);
}

// ── PH Cache ──────────────────────────────────────────────────────────

function buildPhCache(baseDir) {
  const phDir = path.join(baseDir, 'dynamic-data', 'producthunt');
  if (!fs.existsSync(phDir)) {
    console.warn('  ⚠ No dynamic-data/producthunt/ directory in registry');
    return;
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

  console.log(`  ✓ ph-cache/ — ${copied} files`);
}

// ── Lesson Index ────────────────────────────────────────────────────
// Scans all lesson .md files in knowledge-cache and builds a searchable index

function parseFrontmatter(raw) {
  const result = {};
  // Match frontmatter block between --- delimiters
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return result;

  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Strip quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function buildLessonIndex() {
  const cacheDir = path.join(PUBLIC_DIR, 'knowledge-cache');
  if (!fs.existsSync(cacheDir)) {
    console.warn('  ⚠ No knowledge-cache/ directory, skipping lesson index');
    return;
  }

  const lessons = [];
  const categories = fs.readdirSync(cacheDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const category of categories) {
    const catDir = path.join(cacheDir, category);
    const hubs = fs.readdirSync(catDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const hubSlug of hubs) {
      const hubDir = path.join(catDir, hubSlug);
      let mdFiles;
      try {
        mdFiles = fs.readdirSync(hubDir).filter((f) => f.endsWith('.md'));
      } catch {
        continue;
      }

      for (const mdFile of mdFiles) {
        const filePath = path.join(hubDir, mdFile);
        try {
          const raw = fs.readFileSync(filePath, 'utf-8');
          const fm = parseFrontmatter(raw);
          const lessonSlug = mdFile.replace(/\.md$/, '');

          // Build description from learning_objectives if description is missing
          let description = fm.description || '';

          lessons.push({
            title: fm.title || lessonSlug,
            description,
            category,
            hubSlug,
            slug: lessonSlug,
            url: `/knowledge/${category}/${hubSlug}/${lessonSlug}`,
            difficulty: fm.difficulty || 'intermediate',
            duration: fm.duration || '',
          });
        } catch (err) {
          // Skip files we can't parse
        }
      }
    }
  }

  const index = {
    version: 1,
    updatedAt: new Date().toISOString(),
    totalLessons: lessons.length,
    lessons,
  };

  const outPath = path.join(PUBLIC_DIR, 'lesson-index.json');
  fs.writeFileSync(outPath + '.tmp', JSON.stringify(index), 'utf-8');
  fs.renameSync(outPath + '.tmp', outPath);

  console.log(`  ✓ lesson-index.json — ${lessons.length} lessons indexed`);
}

// ── Main ──────────────────────────────────────────────────────────────

function main() {
  const startTime = Date.now();

  // Always clone from GitHub — never use a local registry
  console.log('\n📦 Cloning registry from GitHub...');
  let registryBaseDir;
  try {
    cloneFromGitHub();
    registryBaseDir = CLONE_DIR;
  } catch (err) {
    console.error(`  ✗ Failed to clone registry: ${err.message}`);
    console.error(`  ✗ Ensure the registry repo exists at https://github.com/${REGISTRY_REPO}`);
    process.exit(1);
  }

  buildFeedCache(registryBaseDir);
  buildYcCache(registryBaseDir);
  buildPhCache(registryBaseDir);

  // Build knowledge cache — clear stale files first, then copy from registry
  try {
    const knowledgeDir = path.join(registryBaseDir, 'static-data', 'knowledge');
    if (fs.existsSync(knowledgeDir)) {
      const cacheDir = path.join(PUBLIC_DIR, 'knowledge-cache');
      // Clear stale cache to prevent format conflicts
      if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true, force: true });
      }
      ensureDir(cacheDir);
      execSync(`cp -r "${knowledgeDir}/." "${cacheDir}/"`, { stdio: 'pipe' });
      console.log('  ✓ knowledge-cache/');

      // Build lesson index from .md files in knowledge-cache
      buildLessonIndex();
    } else {
      console.warn('  ⚠ No static-data/knowledge/ directory in registry');
    }
  } catch (err) {
    console.warn(`  ⚠ Failed to copy knowledge cache: ${err.message}`);
  }

  // Build roadmaps cache — clear stale files first, then copy from registry
  try {
    const roadmapsDir = path.join(registryBaseDir, 'static-data', 'roadmaps');
    if (fs.existsSync(roadmapsDir)) {
      const cacheDir = path.join(PUBLIC_DIR, 'roadmaps-cache');
      if (fs.existsSync(cacheDir)) {
        fs.rmSync(cacheDir, { recursive: true, force: true });
      }
      ensureDir(cacheDir);
      execSync(`cp -r "${roadmapsDir}/." "${cacheDir}/"`, { stdio: 'pipe' });
      console.log('  ✓ roadmaps-cache/');
    } else {
      console.warn('  ⚠ No static-data/roadmaps/ directory in registry');
    }
  } catch (err) {
    console.warn(`  ⚠ Failed to copy roadmaps cache: ${err.message}`);
  }

  // Cleanup clone dir
  if (registryBaseDir === CLONE_DIR) {
    try { fs.rmSync(CLONE_DIR, { recursive: true, force: true }); } catch {}
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`📦 Dev cache complete in ${elapsed}s\n`);
}

main();
