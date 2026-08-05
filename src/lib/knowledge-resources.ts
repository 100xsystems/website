/**
 * ## Knowledge Resources
 *
 * Generic resource hub loader for any knowledge category (languages, patterns,
 * principles, frameworks, databases, infrastructure, tools, etc.).
 *
 * Data is loaded dynamically from the registry JSON clone
 * (cloned by scripts/dev-cache.mjs on startup).
 *
 * Two file structures are supported:
 *   1. Folder structure:  category/javascript/index.json  (preferred)
 *   2. Flat structure:    category/javascript.json        (legacy fallback)
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

// ─── Cache Refresh (ISR) ────────────────────────────────────────────
// The knowledge cache under public/knowledge-cache/ is cloned from the
// registry. ISR pages call refreshKnowledgeCacheIfStale() at the top of
// their render so that revalidation picks up freshly-published registry
// content — without this, `revalidate` only re-renders stale files.

const CACHE_ROOT = path.resolve(process.cwd(), 'public', 'knowledge-cache');
const SYNC_MARKER = path.join(CACHE_ROOT, '.last-synced');
/** 6 hours — after this the loader re-clones the registry for fresh data. */
export const KNOWLEDGE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

/**
 * Re-clone the registry knowledge tree when the local cache is stale.
 * Never throws — on failure it silently keeps serving the stale cache so
 * ISR re-renders never crash. Uses a synchronous clone so page renders get
 * the freshest data on the very next revalidation cycle.
 *
 * In local development (sibling registry present) it copies the tree
 * directly, which is instant; in production it does a shallow sparse clone
 * from GitHub.
 */
export function refreshKnowledgeCacheIfStale(now = Date.now()): void {
  // In production the registry clone is baked in at build time (prebuild) and
  // public/ is immutable at runtime — a clone here writes to the ephemeral
  // per-instance filesystem and is never served. Skip it entirely so ISR/dynamic
  // renders don't pay for a synchronous git clone.
  if (process.env.NODE_ENV === 'production') return;
  try {
    if (fs.existsSync(SYNC_MARKER)) {
      const age = now - fs.statSync(SYNC_MARKER).mtimeMs;
      if (age < KNOWLEDGE_CACHE_TTL_MS) return;
    } else if (fs.existsSync(CACHE_ROOT)) {
      const newest = newestFileMtime(CACHE_ROOT);
      if (newest && now - newest < KNOWLEDGE_CACHE_TTL_MS) return;
    }

    const sibling = path.resolve(process.cwd(), '..', 'registry', 'static-data', 'knowledge');
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
    execSync(`git -C "${cloneDir}" sparse-checkout set static-data/knowledge`, { stdio: 'pipe' });
    const src = path.join(cloneDir, 'static-data', 'knowledge');
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

// ─── Types ──────────────────────────────────────────────────────────

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  label: string;
  icon: string;
  items: ResourceLink[];
}

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'challenge';
  order: number;
  duration?: string;
  difficulty?: string;
}

export interface ResourceHub {
  /** ISO / common slug (e.g. "javascript", "solid") */
  slug: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Sorted array of resource categories */
  categories: ResourceCategory[];
  /** Optional ordered lessons for this hub */
  lessons?: LessonMeta[];
}

// ─── Cache ──────────────────────────────────────────────────────────
// NOTE: No module-level memoization — ISR revalidation must re-read the
// freshly-cloned registry data from disk on every render.

const CACHE_BASE = CACHE_ROOT;

/**
 * Load all resource hubs for a knowledge category.
 *
 * @param category - The subdirectory name (e.g. "languages", "patterns", "frameworks")
 */
function loadAllHubs(category: string): Record<string, ResourceHub> {
  // NOTE: paths are built with template literals (not path.join) so Turbopack
  // doesn't trace the dynamic reads in public/knowledge-cache/ as a broad
  // pattern ("Overly broad patterns" build warning over 10k+ files).
  const dir = `${CACHE_BASE}/${category}`;
  const all: Record<string, ResourceHub> = {};

  try {
    if (!fs.existsSync(dir)) return all;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      let slug = '';
      let data: (ResourceHub & { id?: string; label?: string }) | null = null;

      // Folder structure:  category/slug/index.json
      if (entry.isDirectory()) {
        slug = entry.name;
        const indexPath = `${dir}/${entry.name}/index.json`;
        if (fs.existsSync(indexPath)) {
          try {
            data = JSON.parse(fs.readFileSync(indexPath, 'utf-8')) as ResourceHub & { id?: string; label?: string };
          } catch { /* skip malformed */ }
        }
      }

      // Flat structure:  category/slug.json  (legacy fallback)
      if (!data && entry.name.endsWith('.json')) {
        slug = entry.name.replace(/\.json$/, '');
        try {
          data = JSON.parse(fs.readFileSync(`${dir}/${entry.name}`, 'utf-8')) as ResourceHub & { id?: string; label?: string };
        } catch { /* skip malformed */ }
      }

      if (data) {
        all[data.slug || slug] = {
          ...data,
          // Normalize legacy schemas (some indices use `id`/`label`).
          slug: data.slug || data.id || slug,
          name: data.name || data.label || slug,
        };
      }
    }
  } catch {
    // directory doesn't exist yet
  }

  return all;
}

function loadIndex(category: string): string[] {
  return Object.keys(loadAllHubs(category));
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get all resource hubs for a knowledge category. */
export function getHubs(category: string): ResourceHub[] {
  return Object.values(loadAllHubs(category));
}

/** Get a single resource hub by slug. Returns null if not found. */
export function getHub(category: string, slug: string): ResourceHub | null {
  const all = loadAllHubs(category);
  return all[slug] || null;
}

/** Get all slugs for a knowledge category. */
export function getHubSlugs(category: string): string[] {
  return loadIndex(category);
}

/** Count total resources across all hubs in a category. */
export function countTotalResources(category: string): number {
  return Object.values(loadAllHubs(category)).reduce((sum, hub) => {
    if (!hub.categories) return sum;
    return sum + hub.categories.reduce((s, cat) => s + (cat.items?.length ?? 0), 0);
  }, 0);
}

/** Count total resources for a single hub. Safely handles missing categories. */
export function countHubResources(hub: ResourceHub): number {
  if (!hub.categories) return 0;
  return hub.categories.reduce((sum, cat) => sum + (cat.items?.length ?? 0), 0);
}
