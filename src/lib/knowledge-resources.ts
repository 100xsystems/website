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

export interface ResourceHub {
  /** ISO / common slug (e.g. "javascript", "solid") */
  slug: string;
  /** Display name */
  name: string;
  /** Short description */
  description: string;
  /** Sorted array of resource categories */
  categories: ResourceCategory[];
}

// ─── Cache ──────────────────────────────────────────────────────────

const CACHE_BASE = path.resolve(process.cwd(), 'public', 'knowledge-cache');

const _categoryCache = new Map<string, Record<string, ResourceHub>>();
const _indexCache = new Map<string, string[]>();

/**
 * Load all resource hubs for a knowledge category.
 *
 * @param category - The subdirectory name (e.g. "languages", "patterns", "frameworks")
 */
function loadAllHubs(category: string): Record<string, ResourceHub> {
  if (_categoryCache.has(category)) return _categoryCache.get(category)!;

  const dir = path.join(CACHE_BASE, category);
  const all: Record<string, ResourceHub> = {};

  try {
    if (!fs.existsSync(dir)) return all;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      let slug = '';
      let data: ResourceHub | null = null;

      // Folder structure:  category/slug/index.json
      if (entry.isDirectory()) {
        slug = entry.name;
        const indexPath = path.join(dir, entry.name, 'index.json');
        if (fs.existsSync(indexPath)) {
          try {
            data = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
          } catch { /* skip malformed */ }
        }
      }

      // Flat structure:  category/slug.json  (legacy fallback)
      if (!data && entry.name.endsWith('.json')) {
        slug = entry.name.replace(/\.json$/, '');
        try {
          data = JSON.parse(fs.readFileSync(path.join(dir, entry.name), 'utf-8'));
        } catch { /* skip malformed */ }
      }

      if (data) {
        all[data.slug || slug] = data;
      }
    }
  } catch {
    // directory doesn't exist yet
  }

  _categoryCache.set(category, all);
  return all;
}

function loadIndex(category: string): string[] {
  if (_indexCache.has(category)) return _indexCache.get(category)!;
  const all = loadAllHubs(category);
  const slugs = Object.keys(all);
  _indexCache.set(category, slugs);
  return slugs;
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
