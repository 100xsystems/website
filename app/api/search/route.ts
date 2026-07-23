/**
 * /api/search
 *
 * Unified search API that queries multiple sources in parallel and returns
 * grouped results. All API keys stay server-side.
 *
 * GET ?q=react&sources=hn,github,stackoverflow,npm,devto,ddg
 *
 * Each source returns its own array of results with a `source` field
 * so the client can group/display them independently.
 */

import { NextRequest, NextResponse } from 'next/server';

// ─── Types ──────────────────────────────────────────────────────────

interface SearchResult {
  source: string;
  title: string;
  url: string;
  description: string | null;
  metadata: Record<string, unknown>;
}

interface SearchResponse {
  query: string;
  sources: string[];
  results: SearchResult[];
  errors: Array<{ source: string; error: string }>;
}

// ─── Hacker News (Algolia) ──────────────────────────────────────────

async function searchHackerNews(query: string, limit = 10): Promise<SearchResult[]> {
  const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&hitsPerPage=${limit}&tags=story`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HN API: ${res.status}`);
  const data = await res.json();
  return (data.hits || []).map((hit: Record<string, unknown>) => ({
    source: 'hn',
    title: (hit.title as string) || '',
    url: (hit.url as string) || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    description: (hit.story_text as string) || null,
    metadata: {
      points: hit.points,
      author: hit.author,
      comments: hit.num_comments,
      createdAt: hit.created_at,
    },
  }));
}

// ─── GitHub Repos ───────────────────────────────────────────────────

async function searchGitHub(query: string, limit = 10): Promise<SearchResult[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return []; // Skip if no token

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': '100xSystems-Search',
    },
  });
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
  const data = await res.json();
  return (data.items || []).map((item: Record<string, unknown>) => ({
    source: 'github',
    title: (item.full_name as string) || '',
    url: (item.html_url as string) || '',
    description: (item.description as string) || null,
    metadata: {
      stars: item.stargazers_count,
      language: item.language,
      topics: item.topics,
      forks: item.forks_count,
      updatedAt: item.updated_at,
    },
  }));
}

// ─── Stack Overflow ─────────────────────────────────────────────────

async function searchStackOverflow(query: string, limit = 10): Promise<SearchResult[]> {
  const key = process.env.STACK_EXCHANGE_KEY;
  const params = new URLSearchParams({
    q: query,
    site: 'stackoverflow',
    sort: 'votes',
    order: 'desc',
    pagesize: String(limit),
    filter: 'withbody',
  });
  if (key) params.set('key', key);

  const url = `https://api.stackexchange.com/2.3/search/advanced?${params}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Stack Exchange API: ${res.status}`);
  const data = await res.json();
  return (data.items || []).map((item: Record<string, unknown>) => ({
    source: 'stackoverflow',
    title: (item.title as string) || '',
    url: (item.link as string) || '',
    description: (item.body_markdown as string) || null,
    metadata: {
      score: item.score,
      answerCount: item.answer_count,
      isAnswered: item.is_answered,
      tags: item.tags,
      owner: item.owner,
    },
  }));
}

// ─── NPM (npms.io) ──────────────────────────────────────────────────

async function searchNpm(query: string, limit = 10): Promise<SearchResult[]> {
  const url = `https://api.npms.io/v2/search?q=${encodeURIComponent(query)}&size=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`NPM API: ${res.status}`);
  const data = await res.json();
  return (data.results || []).map((item: Record<string, unknown>) => {
    const pkg = item.package as Record<string, unknown> || {};
    const score = item.score as Record<string, unknown> || {};
    return {
      source: 'npm',
      title: (pkg.name as string) || '',
      url: (pkg.links as Record<string, string>)?.npm || `https://www.npmjs.com/package/${pkg.name}`,
      description: (pkg.description as string) || null,
      metadata: {
        version: pkg.version,
        publisher: pkg.publisher,
        keywords: pkg.keywords,
        score: score.final,
        popularity: (score.detail as Record<string, unknown>)?.popularity,
        quality: (score.detail as Record<string, unknown>)?.quality,
        maintenance: (score.detail as Record<string, unknown>)?.maintenance,
      },
    };
  });
}

// ─── Dev.to Articles ────────────────────────────────────────────────

async function searchDevTo(query: string, limit = 10): Promise<SearchResult[]> {
  // Dev.to doesn't have a search API, so we use tag-based filtering
  // and do client-side keyword matching on the results
  const tag = query.toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!tag || tag.length < 2) return [];

  const url = `https://dev.to/api/articles?tag=${encodeURIComponent(tag)}&per_page=${limit}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': '100xSystems-Search' },
  });
  if (!res.ok) throw new Error(`Dev.to API: ${res.status}`);
  const data = await res.json();
  return (data || []).map((item: Record<string, unknown>) => ({
    source: 'devto',
    title: (item.title as string) || '',
    url: (item.url as string) || '',
    description: (item.description as string) || null,
    metadata: {
      tags: item.tag_list,
      user: item.user,
      publishedAt: item.published_at,
      readingTime: item.reading_time_minutes,
      comments: item.comments_count,
      positiveReactions: item.positive_reactions_count,
    },
  }));
}

// ─── DuckDuckGo Instant Answer ──────────────────────────────────────

async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&t=100xsystems_search`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`DDG API: ${res.status}`);
  const data = await res.json();

  const results: SearchResult[] = [];

  // Main instant answer
  if (data.AbstractText) {
    results.push({
      source: 'ddg',
      title: data.Heading || query,
      url: data.AbstractURL || '',
      description: data.AbstractText || null,
      metadata: { type: 'instant_answer', source: data.AbstractSource },
    });
  }

  // Related topics
  if (data.RelatedTopics) {
    for (const topic of data.RelatedTopics) {
      if (topic.Name) {
        // It's a category with sub-topics
        if (topic.Topics) {
          for (const sub of topic.Topics) {
            if (sub.Text && sub.FirstURL) {
              results.push({
                source: 'ddg',
                title: sub.Text.split(' - ')[0] || sub.Text,
                url: sub.FirstURL,
                description: sub.Text || null,
                metadata: { type: 'related' },
              });
            }
          }
        }
      } else if (topic.Text && topic.FirstURL) {
        results.push({
          source: 'ddg',
          title: topic.Text.split(' - ')[0] || topic.Text,
          url: topic.FirstURL,
          description: topic.Text || null,
          metadata: { type: 'related' },
        });
      }
    }
  }

  return results.slice(0, 10);
}

// ─── Reddit (HTML scrape old.reddit.com) ──────────────────────────

async function searchReddit(query: string, limit = 10): Promise<SearchResult[]> {
  const url = `https://old.reddit.com/search?q=${encodeURIComponent(query)}&limit=${limit}&sort=relevance&t=all`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  if (!res.ok) throw new Error(`Reddit: ${res.status}`);
  const html = await res.text();

  const results: SearchResult[] = [];
  // Match each search-result block — each block is a <div class="search-result ..."> closing with 3 </div> tags
  const blockRegex = /<div\s+class="[^"]*search-result[^"]*"[^>]*data-fullname="([^"]+)"([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi;
  let blockMatch: RegExpExecArray | null;

  while ((blockMatch = blockRegex.exec(html)) !== null && results.length < limit) {
    const fullBlock = blockMatch[0];
    const innerBlock = blockMatch[2];

    // Extract title
    const titleMatch = /<a[^>]*class="[^"]*search-title[^"]*"[^>]*>([\s\S]*?)<\/a>/i.exec(innerBlock);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!title) continue;

    // Extract URL — handle href before or after class in attribute order
    let href = '';
    const urlMatchHrefFirst = /<a[^>]*href="([^"]+)"[^>]*class="[^"]*search-title[^"]*"/i.exec(fullBlock);
    if (urlMatchHrefFirst) {
      href = urlMatchHrefFirst[1];
    } else {
      const urlMatchClassFirst = /<a[^>]*class="[^"]*search-title[^"]*"[^>]*href="([^"]+)"/i.exec(fullBlock);
      if (urlMatchClassFirst) href = urlMatchClassFirst[1];
    }
    if (href && href.startsWith('/r/')) {
      href = `https://old.reddit.com${href}`;
    }
    // Skip if URL couldn't be extracted (HTML structure may have changed)
    if (!href) continue;

    // Extract score
    const scoreMatch = /<span\s+class="search-score">([^<]+)<\/span>/i.exec(innerBlock);
    const score = scoreMatch ? scoreMatch[1].trim() : '';

    // Extract comment count
    const commentMatch = /<a[^>]*class="[^"]*search-comments[^"]*"[^>]*>([^<]+)<\/a>/i.exec(innerBlock);
    const comments = commentMatch ? commentMatch[1].trim() : '';

    // Extract subreddit from URL
    const subMatch = /\/r\/([^\/]+)\//i.exec(fullBlock);
    const subreddit = subMatch ? subMatch[1] : '';

    // Extract author
    const authorMatch = /<a[^>]*class="author"[^>]*>([^<]+)<\/a>/i.exec(innerBlock);
    const author = authorMatch ? authorMatch[1].trim() : '';

    const points = parseInt(score.replace(/[^0-9]/g, ''), 10) || 0;
    const commentCount = parseInt(comments.replace(/[^0-9]/g, ''), 10) || 0;

    results.push({
      source: 'reddit',
      title,
      url: href || '',
      description: subreddit ? `r/${subreddit}` : null,
      metadata: {
        points,
        comments: commentCount,
        author,
        subreddit,
      },
    });
  }

  return results;
}

// ─── Medium (RSS feed per tag) ────────────────────────────────────

/**
 * Parse a Medium RSS XML string into search results.
 * Medium RSS returns items sorted by most recent first.
 */
function parseMediumRSS(xml: string, sourceTag: string, limit: number): SearchResult[] {
  const results: SearchResult[] = [];

  // Extract each <item> block
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let itemMatch: RegExpExecArray | null;

  while ((itemMatch = itemRegex.exec(xml)) !== null && results.length < limit) {
    const item = itemMatch[1];

    // Title
    const titleMatch = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i.exec(item) || /<title>([^<]*)<\/title>/i.exec(item);
    const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
    if (!title) continue;

    // Link
    const linkMatch = /<link>([^<]*)<\/link>/i.exec(item);
    const link = linkMatch ? linkMatch[1].trim() : '';

    // Author (dc:creator)
    const creatorMatch = /<dc:creator><!\[CDATA\[([\s\S]*?)\]\]><\/dc:creator>/i.exec(item)
      || /<dc:creator>([^<]*)<\/dc:creator>/i.exec(item);
    const creator = creatorMatch ? creatorMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';

    // Pub date
    const dateMatch = /<pubDate>([^<]*)<\/pubDate>/i.exec(item);
    const pubDate = dateMatch ? dateMatch[1].trim() : '';

    // Categories (tags)
    const categories: string[] = [];
    const catRegex = /<category[^>]*>([^<]*)<\/category>/gi;
    let catMatch: RegExpExecArray | null;
    while ((catMatch = catRegex.exec(item)) !== null) {
      categories.push(catMatch[1].trim());
    }

    // Description (strip HTML)
    const descMatch = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/i.exec(item)
      || /<description>([^<]*)<\/description>/i.exec(item);
    let description = descMatch ? descMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '') : '';
    description = description.replace(/<[^>]+>/g, '').substring(0, 300).trim();

    results.push({
      source: 'medium',
      title,
      url: link,
      description: description || null,
      metadata: {
        author: creator,
        publishedAt: pubDate,
        tags: categories,
        searchTag: sourceTag,
      },
    });
  }

  return results;
}

/**
 * Search Medium by tag via RSS feed.
 * Falls back to sanitizing the query into a tag slug.
 */
async function searchMedium(query: string, limit = 10): Promise<SearchResult[]> {
  // Sanitize query into a tag slug: lowercase, no special chars, hyphens for spaces
  const tag = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  if (!tag || tag.length < 2) return [];

  const url = `https://medium.com/feed/tag/${encodeURIComponent(tag)}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; 100xSystems/1.0)' },
  });

  // 404 = this tag doesn't exist on Medium — not an error, just no results
  if (res.status === 404) return [];
  // Other failures (network, 5xx, rate limits) — report as error
  if (!res.ok) throw new Error(`Medium: ${res.status}`);

  const xml = await res.text();
  return parseMediumRSS(xml, tag, limit);
}

// ─── Source Registry ────────────────────────────────────────────────

interface SourceHandler {
  name: string;
  label: string;
  handler: (query: string, limit: number) => Promise<SearchResult[]>;
}

const SOURCES: Record<string, SourceHandler> = {
  hn: { name: 'hn', label: 'Hacker News', handler: searchHackerNews },
  github: { name: 'github', label: 'GitHub Repos', handler: searchGitHub },
  stackoverflow: { name: 'stackoverflow', label: 'Stack Overflow', handler: searchStackOverflow },
  npm: { name: 'npm', label: 'NPM Packages', handler: searchNpm },
  devto: { name: 'devto', label: 'Dev.to', handler: searchDevTo },
  ddg: { name: 'ddg', label: 'DuckDuckGo', handler: searchDuckDuckGo },
  reddit: { name: 'reddit', label: 'Reddit', handler: searchReddit },
  medium: { name: 'medium', label: 'Medium', handler: searchMedium },
};

// ─── Route Handler ──────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();
  const sourcesParam = searchParams.get('sources') || 'hn,github,stackoverflow,npm,devto,ddg,reddit,medium';
  const limit = Math.min(Number(searchParams.get('limit')) || 10, 25);

  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters' },
      { status: 400 },
    );
  }

  const sourceKeys = sourcesParam.split(',').filter((s) => s in SOURCES);
  const results: SearchResult[] = [];
  const errors: Array<{ source: string; error: string }> = [];

  // Fetch all sources in parallel
  await Promise.allSettled(
    sourceKeys.map(async (key) => {
      const source = SOURCES[key];
      try {
        const sourceResults = await source.handler(query, limit);
        results.push(...sourceResults);
      } catch (err) {
        errors.push({
          source: source.label,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }),
  );

  const response: SearchResponse = {
    query,
    sources: sourceKeys.map((k) => SOURCES[k].label),
    results,
    errors,
  };

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
    },
  });
}
