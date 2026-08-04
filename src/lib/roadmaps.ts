/**
 * ## Roadmaps
 *
 * Role-based engineering roadmaps, loaded from the registry clone at
 * public/roadmaps-cache/. Roadmaps live outside the knowledge tree in the
 * registry (static-data/roadmaps/) because they are navigation over the
 * knowledge base — each roadmap is an ordered sequence of steps, and every
 * step points to a real course in /knowledge/<category>/<slug>.
 *
 * Like the knowledge loader, data is cloned from the registry on startup
 * (scripts/dev-cache.mjs) and refreshed lazily via ISR revalidation.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

// ─── Cache Refresh (ISR) ────────────────────────────────────────────

const CACHE_ROOT = path.resolve(process.cwd(), 'public', 'roadmaps-cache');
const SYNC_MARKER = path.join(CACHE_ROOT, '.last-synced');
/** 6 hours — after this the loader re-clones the registry for fresh data. */
export const ROADMAPS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function newestFileMtime(dir: string): number | null {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let newest = 0;
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const child = newestFileMtime(full);
        if (child && child > newest) newest = child;
      } else {
        const m = fs.statSync(full).mtimeMs;
        if (m > newest) newest = m;
      }
    }
    return newest || null;
  } catch {
    return null;
  }
}

function copyTree(src: string, dest: string): void {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyTree(s, d);
    else fs.copyFileSync(s, d);
  }
}

/**
 * Re-clone the registry roadmaps tree when the local cache is stale.
 * Never throws — on failure it silently keeps serving the stale cache.
 * In local development (sibling registry present) it copies the tree
 * directly; in production it does a shallow sparse clone from GitHub.
 */
export function refreshRoadmapCacheIfStale(now = Date.now()): void {
  try {
    if (fs.existsSync(SYNC_MARKER)) {
      const age = now - fs.statSync(SYNC_MARKER).mtimeMs;
      if (age < ROADMAPS_CACHE_TTL_MS) return;
    } else if (fs.existsSync(CACHE_ROOT)) {
      const newest = newestFileMtime(CACHE_ROOT);
      if (newest && now - newest < ROADMAPS_CACHE_TTL_MS) return;
    }

    const sibling = path.resolve(process.cwd(), '..', 'registry', 'static-data', 'roadmaps');
    const useSibling = fs.existsSync(sibling);
    if (useSibling) {
      fs.mkdirSync(CACHE_ROOT, { recursive: true });
      copyTree(sibling, CACHE_ROOT);
      fs.writeFileSync(SYNC_MARKER, new Date().toISOString(), 'utf-8');
      return;
    }

    // Production: clone the registry repo from GitHub (fresh, shallow).
    const REGISTRY_REPO = process.env.REGISTRY_REPO || '100xsystems/registry';
    const REGISTRY_BRANCH = process.env.REGISTRY_BRANCH || 'main';
    const cloneDir = path.join(process.cwd(), '.registry-cache');
    if (fs.existsSync(cloneDir)) fs.rmSync(cloneDir, { recursive: true, force: true });
    execSync(
      `git clone --depth=1 --branch=${REGISTRY_BRANCH} --filter=blob:none --sparse https://github.com/${REGISTRY_REPO}.git "${cloneDir}"`,
      { stdio: 'pipe', timeout: 60_000 },
    );
    execSync(`git -C "${cloneDir}" sparse-checkout set static-data/roadmaps`, { stdio: 'pipe' });
    const src = path.join(cloneDir, 'static-data', 'roadmaps');
    if (fs.existsSync(src)) {
      fs.mkdirSync(CACHE_ROOT, { recursive: true });
      copyTree(src, CACHE_ROOT);
      fs.writeFileSync(SYNC_MARKER, new Date().toISOString(), 'utf-8');
    }
    try { fs.rmSync(cloneDir, { recursive: true, force: true }); } catch { /* ignore */ }
  } catch {
    // Keep serving whatever cache exists.
  }
}

// ─── Types ──────────────────────────────────────────────────────────

/** A single ordered step in a roadmap — one course in the knowledge base. */
export interface RoadmapStep {
  /** Knowledge category the course belongs to (e.g. "languages", "databases") */
  category: string;
  /** Course slug within that category (e.g. "python", "postgresql") */
  slug: string;
}

export interface Roadmap {
  slug: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  /** Ordered learning sequence — each step builds on the previous. */
  steps: RoadmapStep[];
}

// ─── Cache ──────────────────────────────────────────────────────────
// NOTE: No module-level memoization — ISR revalidation must re-read the
// freshly-cloned registry data from disk on every render.

const CACHE_BASE = CACHE_ROOT;

function loadAllRoadmaps(): Record<string, Roadmap> {
  const all: Record<string, Roadmap> = {};
  try {
    if (!fs.existsSync(CACHE_BASE)) return all;
    for (const entry of fs.readdirSync(CACHE_BASE, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      const indexPath = path.join(CACHE_BASE, entry.name, 'index.json');
      if (!fs.existsSync(indexPath)) continue;
      try {
        const data = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as Roadmap;
        all[data.slug || entry.name] = {
          ...data,
          slug: data.slug || entry.name,
          steps: Array.isArray(data.steps) ? data.steps : [],
        };
      } catch { /* skip malformed */ }
    }
  } catch {
    // directory doesn't exist yet
  }
  return all;
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get all roadmaps, sorted alphabetically. */
export function getRoadmaps(): Roadmap[] {
  return Object.values(loadAllRoadmaps()).sort((a, b) => a.name.localeCompare(b.name));
}

/** Get a single roadmap by slug. Returns null if not found. */
export function getRoadmap(slug: string): Roadmap | null {
  return loadAllRoadmaps()[slug] || null;
}
