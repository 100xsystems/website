# Research: Applying YC-Style Algolia Scraping to Other Platforms

> **Date:** July 28, 2026
> **Context:** The YC Combinator bulk fetcher (scripts/one-time/fetch-yc-bulk.ts) scrapes all 6,089 YC companies in ~15 seconds by directly querying YC's public Algolia API. This document investigates whether the same approach can be applied to other major platforms.

---

## Table of Contents

1. [How the YC Approach Works](#1-how-the-yc-approach-works)
2. [Platform-by-Platform Analysis](#2-platform-by-platform-analysis)
3. [Sites Known to Use Publicly Accessible Algolia Instances](#3-sites-known-to-use-publicly-accessible-algolia-instances)
4. [How to Detect Algolia on Any Website](#4-how-to-detect-algolia-on-any-website)
5. [Technical Limitations & Challenges](#5-technical-limitations--challenges)
6. [Legal & Ethical Considerations](#6-legal--ethical-considerations)
7. [Recommended Strategy for 100xSystems](#7-recommended-strategy-for-100xsystems)

---

## 1. How the YC Approach Works

The YC script achieves its speed through a specific technique:

| Step | Description |
|------|-------------|
| **1. Extract API Key** | Visit the YC companies page, parse `window.AlgoliaOpts` from the HTML to get the public Algolia API key |
| **2. Query Facets** | Use Algolia's multi-query endpoint to get facet counts for `batch` field — reveals all 50+ batches |
| **3. Iterate Facets** | Loop through each batch with a facet filter (`batch:W24`), fetching up to 1,000 hits per query |
| **4. Merge Results** | Combine all hits into a single sorted array of 6,089 companies |
| **5. Write Output** | Save as `companies.json`, generate `featured.json`, `meta.json`, `index.json` |

**Why it's fast:** No HTML parsing, no browser rendering, no pagination through hundreds of pages — just direct JSON API calls to Algolia's backend, which is designed for speed.

**Why it works for YC:** YC exposes a **public read-only Algolia API key** embedded in their frontend JavaScript. This key allows querying the entire `YCCompany_By_Launch_Date_production` index.

---

## 2. Platform-by-Platform Analysis

### 2.1 Techstars (Startup Accelerator)

**Verdict: ⚠️ Uncertain — Requires Direct Investigation**

| Factor | Assessment |
|--------|------------|
| Public API Key | Unconfirmed — Techstars likely uses Algolia based on their directory interface, but the API key may be restricted |
| Anti-Bot Protection | Moderate — Likely has Cloudflare |
| Data Volume | ~6,000+ portfolio companies |
| Scraping Difficulty | Medium |

**Research Notes:**
- Techstars' portfolio directory at `techstars.com/companies` uses a searchable interface similar to YC's
- Historical analysis suggests some versions of the Techstars directory used Algolia
- **To investigate:** Open DevTools → Network tab → Filter by "algolia" or "x-algolia" when browsing their portfolio
- If Algolia is found, the same facet-iteration technique (looping by industry, batch year, or accelerator class) would work

---

### 2.2 Wellfound (Formerly AngelList Talent)

**Verdict: ❌ Not Scrapable via Simple API**

| Factor | Assessment |
|--------|------------|
| Public API | ❌ No public developer API exists |
| Search Engine | Proprietary (Next.js + Apollo GraphQL, no Algolia) |
| Anti-Bot Protection | 🛡️ **DataDome** + Cloudflare — extremely aggressive |
| Data Volume | ~150,000+ startups |
| Scraping Difficulty | **Very High** |

**Research Findings:**
- Wellfound uses **Next.js + Apollo GraphQL** for its frontend
- The internal `/graphql` endpoint is **heavily protected**:
  - Requires valid session cookies (`_wellfound`)
  - Requires CSRF tokens
  - **DataDome** anti-bot validation blocks raw API requests (returns 401/403)
- Raw out-of-band GraphQL requests return `401 Unauthorized` or `403 Forbidden`
- No Algolia, no Elasticsearch exposed externally
- Feasible approaches would require:
  - Authenticated browser sessions (Playwright/Puppeteer)
  - Residential proxies
  - DataDome bypass (very difficult)
  - Parsing `__NEXT_DATA__` from rendered pages instead of API calls

---

### 2.3 Crunchbase

**Verdict: ⚠️ Limited — Paywall Blocks Full Access**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ Yes, but **heavily rate-limited & paywalled** for premium data |
| Search Engine | Custom (used to have Algolia for autocomplete in older versions) |
| Anti-Bot Protection | High — WAF, rate limiting, login walls |
| Data Volume | Millions of companies & people |
| Scraping Difficulty | **High** (for complete data) |

**Research Findings:**
- Crunchbase has an official API (v3.1, crnbase.com/v3.1) but it's **not free** — requires a paid subscription for meaningful access
- Free tier is extremely limited (only 50 requests/day, basic data only)
- The public website uses Next.js with `__NEXT_DATA__` hydration
- **Partial data can be extracted** from:
  - Autocomplete/search endpoints (limited results per query)
  - Public company profile pages (via Next.js data endpoints: `/_next/data/...`)
  - Basic search listings
- Premium data (funding rounds, acquisitions, financials) is **strictly behind paywall**
- **Legal note:** Scraping Crunchbase has led to lawsuits — they actively pursue scrapers

---

### 2.4 Product Hunt

**Verdict: ✅ Fully Supported via Official API v2 + Developer Token**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ **Official GraphQL API v2** — well documented |
| Authentication | Developer Token (permanent) or OAuth 2.0 |
| Rate Limits | **6,250 complexity points per 15 minutes** (GraphQL) |
| Daily Data | ✅ Can fetch today's products, trending, topics, collections |
| Historical Data | ✅ Paginated via GraphQL cursors |
| Scraping Difficulty | **Low** (official API, no scraping needed) |

**Research Findings:**
- Endpoint: `https://api.producthunt.com/v2/api/graphql`
- Developer tokens are **permanent and never expire** — perfect for scripting
- You already have: API Key `fV1ZLvJFofeJ6lqlvqJVEbhTzQ84vulb9tkjqKadELg` and Secret `yq03uhsbLrx73y0hG80tl3XYpEITTByidaVhiRQ7_Mo`
- **What you can fetch daily:**
  - Today's featured products (`posts(order: NEWEST)`)
  - Top products (`posts(order: VOTES)`)
  - Products by topic (`topic(slug: "artificial-intelligence")`)
  - Collections
  - Users & makers
- **What to watch out for:**
  - GraphQL complexity limits mean you can't fetch everything in one query
  - Deep pagination requires cursor-based navigation (`after`, `before`)
  - Each query's complexity is calculated based on nested fields and items requested
- **Recommendation:** Use developer token, query only today's new products + trending for daily workflow. Use historical pagination sparingly.

---

### 2.5 LinkedIn

**Verdict: ❌ Not Recommended — Legally Risky & Technically Difficult**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ Restricted partner API (requires approval) |
| Search Engine | **Proprietary (Galene)** — built on Apache Lucene, NOT Algolia/Elasticsearch |
| Anti-Bot Protection | 🛡️ Extremely aggressive behavioral analysis |
| Legal Status | ⚖️ **High risk** — hiQ Labs case ended in settlement/injunction |
| Scraping Difficulty | **Extremely High** |

**Research Findings:**
- LinkedIn does **NOT** use Algolia or Elasticsearch — they use a proprietary search architecture called **Galene** built on Apache Lucene
- **Legal landscape (hiQ Labs v. LinkedIn):**
  - 9th Circuit ruled scraping public data does NOT violate CFAA (Computer Fraud and Abuse Act)
  - BUT hiQ still lost on contract claims (ToS violation)
  - hiQ collapsed, paid settlement, permanent injunction
  - **Key takeaway:** Scraping public data may not be a federal crime, but it IS a breach of contract, exposing you to civil lawsuits
  - GDPR/CCPA compliance is also a major issue — scraping personal profiles without consent violates data privacy laws
- LinkedIn's API is **partner-only** — you must apply and be approved for specific API products

---

### 2.6 GitHub

**Verdict: ✅ Excellent — Official API with Generous Limits**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ **Excellent REST + GraphQL APIs** (v3 REST, v4 GraphQL) |
| Authentication | Personal Access Token (you have one: `ghp_vtjfa...`) |
| Rate Limits | **5,000 req/hr** (authenticated), **60 req/hr** (unauthenticated) |
| Data Volume | Millions of public repos |
| Scraping Difficulty | **Low** — official API, well documented |

**Research Findings:**
- **REST API v3:**
  - `GET /orgs/{org}/repos` — list all public repos in an organization
  - `GET /search/repositories?q=topic:awesome+language:typescript` — search repos
  - `GET /repos/{owner}/{repo}/contents/{path}` — access file contents
  - `GET /repos/{owner}/{repo}/readme` — get README
- **GraphQL API v4:**
  - More efficient for bulk fetching (nested queries)
  - Can fetch repos, stars, languages, topics in a single query
  - Node limit: 500,000 nodes per query
- **What we already use it for:**
  - Auto-fetching awesome lists from public repos
  - Cloning awesome-list repos and caching their contents
- **Untapped potential:**
  - Can crawl all public repos for organizations
  - Can search by topic, language, stars count
  - Can fetch READMEs, package.json content, etc.
  - Can discover trending repos daily

---

### 2.7 Remote Job Boards

**Verdict: ✅ Some Have Public APIs, Others Require Scraping**

#### Remote OK

| Factor | Assessment |
|--------|------------|
| Public API | ✅ `https://remoteok.com/api` — **free, no auth required** |
| Rate Limits | Unknown but generous |
| Data | Returns all jobs as JSON |
| Difficulty | **Very Low** |

#### Remotive

| Factor | Assessment |
|--------|------------|
| Public API | ✅ `https://remotive.com/api/remote-jobs` — **free, no auth required** |
| Rate Limits | Unknown but generous |
| Data | Returns paginated job listings |
| Difficulty | **Very Low** |

#### We Work Remotely

| Factor | Assessment |
|--------|------------|
| Public API | ❌ No official public API |
| Data | Must be scraped from HTML |
| Difficulty | Medium |

#### Stack Overflow Jobs

| Factor | Assessment |
|--------|------------|
| Public API | ⚠️ Very limited — Stack Overflow API doesn't include jobs |
| Data | Jobs are part of the main site, no dedicated API |
| Difficulty | Medium-High |

---

### 2.8 Dev.to

**Verdict: ✅ Excellent Free API**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ **Forem API** (v0) — free, well documented |
| Authentication | Optional API key for higher rate limits |
| Rate Limits | Generous without key, higher with key |
| Data Volume | Millions of articles |
| Difficulty | **Very Low** |

**Key Endpoints:**
- `GET /api/articles` — list articles (pagination, tags, username filters)
- `GET /api/articles/{id}` — single article with body
- `GET /api/tags` — list all tags
- `GET /api/users/{id}` — user profile
- `GET /api/organizations/{id}` — organization info

---

### 2.9 Medium

**Verdict: ⚠️ Limited — Mostly RSS-Based**

| Factor | Assessment |
|--------|------------|
| Public API | ❌ Official API deprecated. No replacement |
| Data Access | RSS feeds (`medium.com/feed/@{username}`), unofficial scrapers |
| Anti-Bot Protection | Moderate |
| Difficulty | Medium |

**Access Methods:**
- RSS feeds: `https://medium.com/feed/@{username}` — returns full posts in XML
- No official REST/GraphQL API for article search
- Medium aggressively blocks scrapers via Cloudflare
- Some unofficial reverse-engineered APIs exist but are unstable

---

### 2.10 Stack Overflow

**Verdict: ✅ Excellent — Stack Exchange API**

| Factor | Assessment |
|--------|------------|
| Public API | ✅ **Stack Exchange API v2.3** — free, well documented |
| Authentication | OAuth or `access_token` (optional, for higher limits) |
| Rate Limits | 300 req/day (unauthenticated), 10,000 req/day (authenticated) |
| Data Volume | 20M+ questions |
| Difficulty | **Low** |

**Key Endpoints:**
- `GET /questions` — search/fetch questions
- `GET /search/advanced` — advanced search with tags, dates, etc.
- `GET /tags` — list all tags
- `GET /users/{ids}` — user profiles
- Backoff mechanism: API returns `backoff` parameter when rate-limited

---

## 3. Sites Known to Use Publicly Accessible Algolia Instances

These platforms are known (or suspected) to expose public Algolia API keys that could enable YC-style bulk extraction:

| Site | Algolia? | Notes |
|------|----------|-------|
| **Y Combinator** | ✅ Confirmed | Extracted 6,089 companies in 15s |
| **Product Hunt** | ✅ Historically | Now has official v2 GraphQL API |
| **Lobsters** | ✅ Confirmed | Link aggregation, uses Algolia for search |
| **HackerNews** | ⚠️ Algolia-powered search | But HN's Algolia instance is by Algolia themselves (hn.algolia.com) — may have rate limits |
| **Slack App Directory** | ⚠️ Suspected | Directory search may use Algolia |
| **Dribbble** | ⚠️ Suspected | Shot/search might use Algolia |
| **Resumé.io** | ⚠️ Suspected | Resume directory |
| **Swell** | ⚠️ Suspected | Swell investing directory uses Algolia |
| **YC-specific forks** | ✅ Confirmed | yc-oss/api repo uses same Algolia instance |

**How to find more:**
1. Visit a site's directory/search page
2. Open DevTools → Network tab → Filter by: `algolia`, `x-algolia-api-key`, `x-algolia-application-id`
3. Check window variables: `window.algolia`, `window.searchClient`, `window.ALGOLIA_*`
4. Check Wappalyzer browser extension for "Algolia" detection
5. Search GitHub for `algolia.appId` or `x-algolia-application-id` in frontend code

---

## 4. How to Detect Algolia on Any Website

### Method 1: Network Tab Inspection

1. Open Chrome DevTools (F12 → Network tab)
2. Browse to the site's search/directory page
3. Filter by any of:
   - `algolia` (captures all Algolia-related requests)
   - `x-algolia-api-key` (request header filter)
   - `x-algolia-application-id` (request header filter)
4. Type something in the search box
5. Look for requests to `*.algolia.net`, `*.algolianet.com`, or `*.algoliasearch.com`

### Method 2: Source Code Inspection

1. Open DevTools → Sources tab
2. Search page source for:
   - `window.__ALGOLIA__`
   - `window.algolia`
   - `AlgoliaSearch`
   - `algoliasearch`
   - `.algolia.net`
   - Application ID pattern: uppercase alphanumeric string (e.g., `45BWZJ1SGC`)
3. Check the initial HTML for inline `<script>` tags containing Algolia config

### Method 3: Wappalyzer

- Install the [Wappalyzer browser extension](https://www.wappalyzer.com/)
- Visit the target site — Wappalyzer will detect Algolia if present

### Method 4: Testing the Key

Once you find an Algolia Application ID and API key:

```javascript
// Test if the key works
const appId = 'YOUR_APP_ID';
const apiKey = 'YOUR_API_KEY';

// Try a search query
const result = await fetch(
  `https://${appId.toLowerCase()}-dsn.algolia.net/1/indexes/*/queries`,
  {
    method: 'POST',
    headers: {
      'X-Algolia-Application-Id': appId,
      'X-Algolia-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requests: [{ indexName: '*', params: 'query=&hitsPerPage=1' }]
    })
  }
);
const data = await result.json();
console.log(data); // If successful, shows available indices
```

### Method 5: GitHub Public Repos

Search GitHub for `algolia.appId` or `x-algolia-application-id` in frontend repositories — many open-source projects accidentally expose their Algolia credentials.

---

## 5. Technical Limitations & Challenges

### 5.1 Algolia's 1,000-Hit Limit

| Constraint | Detail |
|------------|--------|
| Default max | Algolia typically limits public indices to **1,000 hits** per query |
| Bypass | ✅ Iterate through facet filters (as YC script does with batches) |
| Alternative | Iterate by alphabetical letter, industry, category, date range |
| Custom config | Site owners can configure higher limits, but most don't |

**YC's approach works because** YC has ~50 batch facets (W09, S10, W10, ..., S26), each with much fewer than 1,000 companies. Looping through all 50 batches yields all 6,089 companies without hitting the limit.

### 5.2 Anti-Bot Protections

| Protection | Platforms Using It | Bypass Difficulty |
|------------|-------------------|-------------------|
| **Cloudflare** | Most modern sites | Medium — needs TLS impersonation + stealth browser |
| **DataDome** | Wellfound, high-value targets | **Very High** — behavioral analysis |
| **AWS WAF** | Enterprise sites | High — requires `aws-waf-token` acquisition |
| **CAPTCHAs** | Aggressive targets | Medium — CAPTCHA solving services ($) |
| **Rate Limiting** | All API endpoints | Low — add delays, backoff, retry logic |

**Bypass Stack for Hard Targets:**
1. Residential proxies ($1-6/GB)
2. TLS impersonation (`curl_cffi` / `tls-client`)
3. Stealth browser (`playwright-stealth`)
4. Cookie/session management
5. Human-like behavior simulation

**Cost Estimate:**
- Managed scraping APIs: $30-150/month (96-99.9% success rate)
- DIY stack: $50-200/month (proxies + engineering time)
- Residential proxies alone for large-scale: $500+/month

### 5.3 Dynamic API Tokens

YC embeds their Algolia key in `window.AlgoliaOpts` — a static global variable. Other sites may use:

| Method | Detection Difficulty | Example |
|--------|---------------------|---------|
| Static window var | Easy | `window.AlgoliaOpts` (YC) |
| Build-time ID | Medium | Next.js `buildId` in `__NEXT_DATA__` |
| Session-based token | Hard | Generated per-session, short expiry |
| Environment-injected | Very Hard | Inaccessible from frontend |

### 5.4 GraphQL Complexity Quotas

For platforms with official GraphQL APIs (like Product Hunt v2):

| Platform | Limit | Strategy |
|----------|-------|----------|
| **Product Hunt** | 6,250 complexity pts / 15 min | Use shallow queries, cache aggressively |
| **GitHub** | 5,000 pts / hr (v4) | Use REST for bulk, GraphQL for nested |
| **Stack Exchange** | 10,000 req / day | Spread requests across hours |

### 5.5 Legal Boundaries

| Risk | Severity | Examples |
|------|----------|----------|
| **CFAA violation** | Low-Medium | _hiQ v. LinkedIn_ ruled scraping public data ≠ CFAA violation |
| **ToS breach** | ⚠️ **Medium-High** | Breach of contract → civil liability, cease-and-desist |
| **GDPR/CCPA** | ⚠️ **High** | Scraping personal data without consent violates privacy laws |
| **Copyright** | Low | Facts can't be copyrighted, but curated compilations can be |
| **Rate-limit abuse** | Low | Account suspension, IP ban |

**Safe zone:** Extracting organizational/company data (not personal profiles), from platforms with explicit APIs or publicly-accessible directories, respecting `robots.txt` and terms of service.

**Grey zone:** Extracting personal data (LinkedIn profiles, employee names), bypassing technical protections, violating ToS.

---

## 6. Legal & Ethical Considerations

### The hiQ Labs Precedent (Key Takeaways)

1. **Scraping public data is NOT a federal crime** — 9th Circuit ruled CFAA doesn't apply to public, unauthenticated data
2. **Scraping IS a ToS violation** — hiQ was permanently enjoined for breaching LinkedIn's User Agreement
3. **Practical reality:** Companies rarely sue individual scrapers, but will aggressively pursue commercial competitors or data resellers
4. **GDPR is a bigger risk** in Europe — fines up to €20M or 4% of global revenue for processing personal data without consent

### Recommendations for 100xSystems

| Data Type | Safe? | Notes |
|-----------|-------|-------|
| Company directories (YC, Techstars) | ✅ Safe | Public organizational data |
| Product listings (Product Hunt) | ✅ Safe | Official API, developer token |
| Public GitHub repos | ✅ Safe | Official API, well documented |
| Job listings (RemoteOK, Remotive) | ✅ Safe | Public APIs |
| Dev.to articles | ✅ Safe | Official API |
| Stack Exchange content | ✅ Safe | Official API |
| LinkedIn profiles | ❌ Avoid | Legal grey zone, heavy protection |
| Wellfound startup data | ⚠️ Caution | Protected by DataDome, ToS violation |
| Medium articles | ⚠️ Acceptable | RSS feeds are public |

---

## 7. Recommended Strategy for 100xSystems

### Tier 1: ✅ Implement Immediately (Official APIs)

| Platform | Approach | Estimated Data | Time to Build |
|----------|----------|----------------|---------------|
| **Product Hunt** | Official v2 GraphQL API with developer token | Daily trending + new products | ✅ Already done |
| **GitHub** | REST + GraphQL APIs for awesome-lists, org repos | Millions of repos | ✅ Already done |
| **Dev.to** | Forem API for articles | Trending articles by tag | 1-2 hours |
| **Stack Overflow** | Stack Exchange API for Q&A | Questions by tag (tech-focused) | 1-2 hours |
| **RemoteOK** | Public API | All remote jobs | 30 minutes |
| **Remotive** | Public API | All remote jobs | 30 minutes |

### Tier 2: ✅ Investigate Algolia-Based (YC-Style)

| Platform | Approach | Difficulty | Risk |
|----------|----------|------------|------|
| **Techstars** | Check DevTools for Algolia, extract companies | Medium | Low |
| **Slack App Directory** | Check for Algolia-powered search | Medium | Low |
| **Dribbble** | Check for Algolia-powered shot search | Medium | Low |

### Tier 3: ❌ Avoid (High Effort, High Risk)

| Platform | Reason |
|----------|--------|
| **LinkedIn** | Legal risk, proprietary search, heavy anti-bot |
| **Wellfound** | DataDome protection, no public API, ToS violation |
| **Crunchbase (premium)** | Paywall, legal precedent for lawsuits |
| **Medium (full catalog)** | No public API, Cloudflare protection |

### Performance Projections

| Approach | 100 items | 1,000 items | 10,000 items |
|----------|-----------|-------------|--------------|
| **Algolia facet iteration** (YC-style) | ~1s | ~3s | ~20s |
| **Official REST API** | ~2s | ~15s | ~2-3 min |
| **GraphQL API** | ~1s | ~10s | ~1-2 min |
| **Browser automation** (Playwright) | ~30s | ~5 min | ~1 hr |
| **HTML scraping** | ~20s | ~3 min | ~30 min |

---

## Summary

| Platform | Viable Approach | Speed | Legal Risk | Build Time |
|----------|----------------|-------|------------|------------|
| ✅ **Y Combinator** | Algolia facet iteration (already built) | 🚀 15s for 6,089 | Low | ✅ Done |
| ✅ **Product Hunt** | Official GraphQL API v2 | 🚀 Fast | Low | ✅ Done |
| ✅ **GitHub** | Official REST/GraphQL API | 🚀 Fast | Low | ✅ Partially done |
| ⚠️ **Techstars** | Algolia (if available) | 🚀 Fast | Low | 2-3 hours |
| ✅ **Dev.to** | Forem API | 🚀 Fast | Low | 1-2 hours |
| ✅ **Stack Overflow** | Stack Exchange API | 🚀 Fast | Low | 1-2 hours |
| ✅ **RemoteOK** | Public API | 🚀 Fast | Low | 30 min |
| ✅ **Remotive** | Public API | 🚀 Fast | Low | 30 min |
| ❌ **LinkedIn** | Not recommended | 🐢 Slow | ⚠️ High | N/A |
| ❌ **Wellfound** | Not recommended | 🐢 Slow | ⚠️ Medium | N/A |
| ❌ **Crunchbase (premium)** | Paywalled | N/A | ⚠️ High | N/A |
| ⚠️ **Medium** | RSS feeds only | 🐢 Slow | Low | 1-2 hours |

---

*End of research document. Research conducted with 24 parallel web researcher agents across 12 topic areas.*
