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

export interface LessonMeta {
  slug: string;
  title: string;
  description: string;
  type: 'lesson' | 'quiz' | 'challenge';
  order: number;
  duration?: string;
  difficulty?: string;
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
  /** Optional ordered lessons for this language */
  lessons?: LessonMeta[];
}

// ─── Cache Directory + Module-level Cache ───────────────────────────

const CACHE_DIR = path.resolve(process.cwd(), 'public', 'knowledge-cache', 'languages');

let _allResources: Record<string, LanguageResources> | null = null;
let _index: string[] | null = null;

/**
 * Read all language resource folders from the cached registry clone.
 * Each language is a folder with an index.json inside:
 *   public/knowledge-cache/languages/javascript/index.json
 *   public/knowledge-cache/languages/python/index.json
 *   ...
 */
function loadAllResources(): Record<string, LanguageResources> {
  if (_allResources) return _allResources;

  const all: Record<string, LanguageResources> = {};

  try {
    const entries = fs.readdirSync(CACHE_DIR, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const indexPath = path.join(CACHE_DIR, entry.name, 'index.json');
      if (!fs.existsSync(indexPath)) continue;

      try {
        const raw = fs.readFileSync(indexPath, 'utf-8');
        const resource: LanguageResources = JSON.parse(raw);
        all[resource.slug] = resource;
      } catch {
        // skip malformed language folders
      }
    }
  } catch {
    // cache directory doesn't exist yet
  }

  _allResources = all;
  return _allResources;
}

function loadIndex(): string[] {
  if (_index) return _index;
  const all = loadAllResources();
  _index = Object.keys(all);
  return _index;
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
