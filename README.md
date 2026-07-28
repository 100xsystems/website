# 100xSystems Website

> **The discovery layer for software engineering knowledge.**
> Search, browse, and explore across engineering blogs, YC startups, Product Hunt launches,
> GitHub repos, Hacker News, Stack Overflow, npm packages, Dev.to, Medium, Reddit, Wikipedia,
> and our own curated knowledge curriculum — all in one place.

---

## 🧭 Vision

Software engineering knowledge is scattered across thousands of platforms — blogs, forums,
package registries, startup directories, documentation sites, and educational resources.
Each platform has its own search, its own UX, its own silo.

**100xSystems breaks those silos.**

We are not a content aggregator. We are a **search + discovery registry layer** — a single
entry point that indexes metadata from across the web and presents it in a unified,
beautiful, fast interface. We don't store your content. We surface it, connect it, and
help engineers discover what matters.

### Core Tenets

1. **Registry-first, not storage-first.** We index metadata and links. The content lives
   on the original creator's platform — we just help people find it.
2. **Curated knowledge curriculum.** Our knowledge graph (principles, languages, tools,
   patterns) provides structured, interconnected engineering concepts sourced from
   Wikipedia + Wikidata — built by humans, not AI slop.
3. **Multi-source search.** One query spans local cached data (feeds, YC companies, PH
   products, knowledge graph) and live web APIs (GitHub, HN, SO, npm, Reddit, Medium,
   Dev.to, DDG, Wikipedia — and growing).
4. **Open source, non-commercial.** All data is sourced from Creative Commons, public
   APIs, and open repositories. We give credit and attribution. This is an open source
   educational platform.
5. **Scalable by design.** From 100 feeds to 10,000. From 5 sources to 500. The
   architecture is designed to grow horizontally — more JSON files, more API sources,
   more categories.

### The Future

- **Knowledge expansions:** MDN Web Docs, JavaScript.info, freeCodeCamp, and other
  Creative Commons resources — indexed and cross-linked at the concept level.
- **Resource packs:** Illustration collections, design assets, code snippets — with a
  single "download all" button that scrapes and bundles from their original sources.
- **Custom curricula:** User-defined learning paths across concepts, tools, and patterns.
- **Offline catalog:** A downloadable registry of all indexed content for air-gapped study.
- **Type-specific pages:** Separate routes for YC companies, Product Hunt launches,
  GitHub trending, news feeds — each with their own filtering, sorting, and exploration UX.

---

## 🏗️ Architecture

```
100xsystems/
├── registry/          ← Central index (JSON metadata files)
│   ├── feeds/         ← RSS/Atom feed data (daily delta)
│   ├── knowledge/     ← Curated knowledge curriculum (principles, languages, tools, patterns)
│   │   ├── principles/
│   │   ├── languages/
│   │   ├── tools/
│   │   ├── patterns/
│   │   ├── manifest.json
│   │   └── seeds.json
│   ├── yc/            ← Y Combinator company catalog (Algolia-sourced)
│   ├── producthunt/   ← Product Hunt product catalog
│   └── scripts/       ← Workflows to update data
│       ├── github-workflow/  ← Daily automation scripts
│       └── one-time/         ← Manual seed scripts
│
└── website/           ← Next.js static site (this repo)
    ├── app/           ← Pages & API routes
    │   └── api/search ← Multi-source live search API
    ├── src/
    │   ├── presentation/features/ ← Homepage sections & components
    │   └── knowledge/             ← Knowledge graph types
    └── public/
        ├── feed-cache.json       ← Latest feed items (cloned from registry)
        ├── yc-cache/             ← YC companies (cloned from registry)
        ├── ph-cache/             ← Product Hunt products (cloned from registry)
        └── knowledge-cache/      ← Knowledge graph (cloned from registry)
```

### Data Flow

```
Registry (GitHub)
    │  Daily workflow updates feeds, YC changes, PH daily
    ▼
Website build / dev
    │  Clones registry → caches JSON files → generates static content
    ▼
Next.js SSG
    │  Pre-renders pages with cached data at build time
    ▼
Client browser
    │  Homepage: loads cached JSON + live API search
    ▼
User
    ← Unified search across local + live sources
```

### Search Architecture

The search works in **two layers:**

1. **Local (SSG) layer** — Data cached at build time (feeds, YC companies, PH products,
   knowledge graph). Searched via **Fuse.js** (lightweight fuzzy search). Zero latency,
   works offline, instant results.

2. **Live API layer** — Real-time queries to external APIs (GitHub, HN, SO, npm, Reddit,
   Medium, Dev.to, DDG, Wikipedia). Each source is fetched in parallel with per-source
   error isolation.

The results are merged client-side into a unified, sectioned interface with unique card
components per source type, brand favicons, source-specific metadata, and a single-select
filter.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server (clones latest registry data)
npm run dev
# → Starts at http://localhost:3000

# Production build
npm run build
# → Generates static site with fresh cache
```

The dev script (`npm run dev`) automatically clones the latest registry data before
starting the server, so you always work with fresh data.

---

## 📦 Data Sources

### Local Cache (from Registry)

| Source | Description | Update Cadence |
|--------|-------------|----------------|
| **Engineering Blogs** | 400+ RSS/Atom feeds from top engineering blogs | Daily via registry workflow |
| **YC Companies** | 6,000+ Y Combinator companies (full catalog + daily changes) | Daily via Algolia API |
| **Product Hunt** | 900+ products (full catalog + daily trending) | Daily via PH API |
| **Knowledge Graph** | 162 curated engineering concepts (principles, languages, tools, patterns) | Manual curation |

### Live APIs

| Source | API | Free Tier |
|--------|-----|-----------|
| **Hacker News** | Algolia HN Search | Unlimited |
| **GitHub** | GitHub REST API | 5,000 req/hr with PAT |
| **Stack Overflow** | Stack Exchange API | 300 req/day |
| **npm** | npms.io API | Unlimited |
| **Dev.to** | DEV.to API | Unlimited |
| **Medium** | RSS feeds per tag | Unlimited |
| **DuckDuckGo** | Instant Answer API | Unlimited |
| **Reddit** | Reddit HTML parsing | Rate-limited |
| **Wikipedia** | Wikipedia REST API | Unlimited |

### Planned Sources

- W3Schools
- MDN Web Docs
- JavaScript.info
- freeCodeCamp
- Creative Commons resource directories
- Illustration & design asset catalogs

---

## 🧠 Knowledge Graph

The knowledge curriculum organizes 162 software engineering concepts into 4 categories:

```
principles/  (34) — ACID, CAP Theorem, SOLID, DRY, Circuit Breaker, etc.
languages/   (28) — Rust, Go, TypeScript, Python, WebAssembly, etc.
tools/       (56) — Kubernetes, Docker, React, PostgreSQL, Kafka, etc.
patterns/    (44) — Bloom Filter, CQRS, Event Sourcing, Saga, etc.
```

Each entity has:
- Wikipedia description + summary
- Wikidata references
- External URLs
- Parent/child/related relationships (future: full graph traversal)

The knowledge section appears **first** in search results — before any other source —
because it represents curated, structured engineering knowledge.

---

## 🗺️ Roadmap

### Phase 1 — Foundation ✅
- [x] Unified search across local + live sources
- [x] Brand SVGs and favicons for every source
- [x] Unique card components per source type
- [x] Single-select source filter
- [x] 1-second debounce
- [x] Daily registry workflow

### Phase 2 — Knowledge First 🔄
- [ ] Knowledge curriculum as first search section
- [ ] Wikipedia API integration
- [ ] Fix source pill navigation (no more query prefix pollution)
- [ ] Meaningful homepage hero heading
- [ ] Separate route pages per source type

### Phase 3 — Content Expansion
- [ ] MDN Web Docs integration
- [ ] JavaScript.info / freeCodeCamp indexing
- [ ] W3Schools reference integration
- [ ] Creative Commons content registry

### Phase 4 — Engagement
- [ ] Dark mode
- [ ] Share/bookmark per result
- [ ] "Download all" for resource packs
- [ ] User-curated collections

### Phase 5 — Scale
- [ ] 5,000+ feed sources
- [ ] 50+ live API sources
- [ ] Full knowledge graph traversal (parent/child/related navigation)
- [ ] Semantic search (alternative to keyword-only)

---

## 🔐 Attribution

We use data from the following platforms under their respective terms. All content
remains on the original creator's platform. We index metadata and provide links:

- **Wikipedia** — Creative Commons Attribution-ShareAlike
- **YC Combinator** — Public Algolia API / public directory
- **Product Hunt** — Official v2 API
- **GitHub** — Public REST API
- **Hacker News** — Algolia Search API
- **Stack Overflow / Stack Exchange** — CC BY-SA, Stack Exchange API
- **Dev.to** — Forem API
- **Medium** — RSS feeds
- **DuckDuckGo** — Instant Answer API
- **npm** — npms.io API
- **Reddit** — Public data (old.reddit.com HTML)

---

## 📄 License

MIT — see [LICENSE](LICENSE).

---

*Built with ❤️ by the 100xSystems team.*
