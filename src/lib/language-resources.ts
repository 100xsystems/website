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
 *
 * ## ISR freshness
 *
 * Loaders intentionally avoid module-level caching so that Incremental
 * Static Regeneration re-renders pick up freshly-cloned registry data.
 * `refreshLanguageResourcesIfStale()` re-clones the registry when the local
 * cache is older than `LANGUAGE_CACHE_TTL_MS` — call it from pages that opt
 * into `revalidate`.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { refreshKnowledgeCacheIfStale, KNOWLEDGE_CACHE_TTL_MS } from '@/lib/knowledge-resources';

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
  prerequisites?: string[];
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

// ─── Cache Directory + TTL ─────────────────────────────────────────

const CACHE_DIR = path.resolve(process.cwd(), 'public', 'knowledge-cache', 'languages');

// Re-export for pages that already referenced the language-scoped name.
// The refresh logic lives in knowledge-resources.ts (it owns the cache).
export { refreshKnowledgeCacheIfStale as refreshLanguageResourcesIfStale, KNOWLEDGE_CACHE_TTL_MS as LANGUAGE_CACHE_TTL_MS };

// ─── Loaders (no module-level cache — ISR friendly) ─────────────────

/**
 * Read all language resource folders from the cached registry clone.
 * Each language is a folder with an index.json inside:
 *   public/knowledge-cache/languages/javascript/index.json
 */
function loadAllResources(): Record<string, LanguageResources> {
  const all: Record<string, LanguageResources> = {};

  try {
    const entries = fs.readdirSync(CACHE_DIR, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const indexPath = path.join(CACHE_DIR, entry.name, 'index.json');
      if (!fs.existsSync(indexPath)) continue;

      try {
        const raw = fs.readFileSync(indexPath, 'utf-8');
        const parsed = JSON.parse(raw);
        const resource: LanguageResources = {
          ...parsed,
          // Normalize legacy schemas: some older indices use `id`/`label`
          // instead of `slug`/`name`.
          slug: parsed.slug || parsed.id || entry.name,
          name: parsed.name || parsed.label || entry.name,
        };
        all[resource.slug] = resource;
      } catch {
        // skip malformed language folders
      }
    }
  } catch {
    // cache directory doesn't exist yet
  }

  return all;
}

// ─── Public API ─────────────────────────────────────────────────────

/** Get resources for a specific language slug. Returns null if not found. */
export function getLanguageResources(slug: string): LanguageResources | null {
  const all = loadAllResources();
  return all[slug] || null;
}

/** Get all language slugs that have curated resources. */
export function getLanguagesWithResources(): string[] {
  return Object.keys(loadAllResources());
}

/** Get every language resource hub (slug → data). */
export function getAllLanguageResources(): Record<string, LanguageResources> {
  return loadAllResources();
}
