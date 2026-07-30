/**
 * ## Language Resources
 *
 * Curated, hand-picked resources for learning programming languages.
 * We do NOT host content — we point to the absolute best free resources
 * on the internet so learners find the right path through the noise.
 *
 * Data is loaded dynamically from the registry JSON clone
 * (cloned by scripts/dev-cache.mjs on startup).
 *
 * The JSON source lives in the registry repo at:
 *   static-data/knowledge/languages/
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

export interface LanguageResources {
  /** ISO / common slug for the language (e.g. "javascript", "python") */
  slug: string;
  /** Display name */
  name: string;
  /** Short description for the hero */
  description: string;
  /** Sorted array of resource categories */
  categories: ResourceCategory[];
}

// ─── Cache Directory + Module-level Cache ───────────────────────────

const CACHE_DIR = path.resolve(process.cwd(), 'public', 'knowledge-cache', 'languages');

let _allResources: Record<string, LanguageResources> | null = null;
let _index: string[] | null = null;

function loadAllResources(): Record<string, LanguageResources> {
  if (_allResources) return _allResources;
  try {
    const allPath = path.join(CACHE_DIR, 'all-resources.json');
    const raw = fs.readFileSync(allPath, 'utf-8');
    _allResources = JSON.parse(raw);
    return _allResources!;
  } catch {
    _allResources = {};
    return _allResources;
  }
}

function loadIndex(): string[] {
  if (_index) return _index;
  // Derive slugs from all-resources keys as primary source
  const all = loadAllResources();
  const keys = Object.keys(all);
  if (keys.length > 0) {
    _index = keys;
    return _index;
  }
  // Fallback to index.json if all-resources is empty
  try {
    const indexPath = path.join(CACHE_DIR, 'index.json');
    const raw = fs.readFileSync(indexPath, 'utf-8');
    const index: { slugs?: string[] } = JSON.parse(raw);
    _index = index.slugs ?? [];
    return _index;
  } catch {
    _index = [];
    return _index;
  }
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get resources for a specific language slug. Returns null if not found. */
export function getLanguageResources(slug: string): LanguageResources | null {
  const all = loadAllResources();
  return all[slug] || null;
}

/** Get all language slugs that have curated resources. */
export function getLanguagesWithResources(): string[] {
  return loadIndex();
}
