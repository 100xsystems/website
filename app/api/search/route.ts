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
};

// ─── Route Handler ──────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();
  const sourcesParam = searchParams.get('sources') || 'hn,github,stackoverflow,npm,devto,ddg';
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
