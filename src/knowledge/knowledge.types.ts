/** A knowledge graph entity sourced from Wikipedia + Wikidata */
export interface KnowledgeEntity {
  /** Slug-based identifier (e.g. "acid", "cap-theorem") */
  id: string;
  /** Category: principles, languages, tools, patterns */
  category: string;
  /** Display label */
  label: string;
  /** Alternative names (currently empty, populated from future alias sources) */
  aliases: string[];
  /** Short description (from Wikipedia description or seed fallback) */
  description: string | null;
  /** Longer plain-text intro summary from Wikipedia */
  summary: string | null;
  /** Parent concept slugs (future: populated from Wikidata relationships) */
  parents: string[];
  /** Child concept slugs (future) */
  children: string[];
  /** Related concept slugs (future) */
  related: string[];
  /** External URLs (Wikipedia, Wikidata) */
  externalUrls: Record<string, string>;
  /** When this entity was indexed */
  indexedAt: string;
}

/** Aggregated manifest of all knowledge entities */
export interface KnowledgeManifest {
  totalEntities: number;
  generatedAt: string;
  categories: Record<string, number>;
  /** Entity ID → display label */
  labelMap: Record<string, string>;
  /** Entity ID → category */
  categoryMap: Record<string, string>;
}
