import React from 'react';
import type { Article } from './feed.types';

/**
 * Hacker News ranking algorithm.
 * Score = (P - 1) / (T + 2)^G
 * where P = upvotes, T = hours since publication, G = gravity (1.8 by default).
 *
 * Higher scores mean the article appears higher in the feed.
 */
export function calculateHnScore(
  upvotes: number,
  publishedAt: string | null,
  gravity = 1.8
): number {
  const points = Math.max(upvotes, 1);

  if (!publishedAt) return 0;

  const publishedMs = new Date(publishedAt).getTime();
  if (isNaN(publishedMs)) return 0;

  const hoursSincePublished =
    (Date.now() - publishedMs) / (1000 * 60 * 60);

  // Negative time means future date — shouldn't happen, but handle gracefully
  if (hoursSincePublished < 0) return points;

  return (points - 1) / Math.pow(hoursSincePublished + 2, gravity);
}

/**
 * Sort articles by HN score (descending).
 */
export function sortByHnScore(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const scoreA = calculateHnScore(a.upvotes, a.publishedAt);
    const scoreB = calculateHnScore(b.upvotes, b.publishedAt);
    return scoreB - scoreA;
  });
}

/**
 * Sort articles by publish date (newest first).
 */
export function sortByNewest(articles: Article[]): Article[] {
  return [...articles].sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
}

/**
 * Filter articles to only those whose feed matches the given feed IDs.
 */
export function filterByFeedIds(
  articles: Article[],
  feedIds: string[]
): Article[] {
  if (feedIds.length === 0) return articles;
  return articles.filter((a) => feedIds.includes(a.feedId));
}

/**
 * Filter articles whose tags overlap with selected tags.
 */
export function filterByTags(
  articles: Article[],
  selectedTags: string[]
): Article[] {
  if (selectedTags.length === 0) return articles;
  return articles.filter((a) =>
    a.tags.some((t) => selectedTags.includes(t))
  );
}

/**
 * Get a random article (for "I'm Feeling Lucky") weighted by recency.
 * More recent articles have a higher chance of being selected.
 */
export function getRandomArticle(articles: Article[]): Article | null {
  if (articles.length === 0) return null;

  // Weight by recency: articles published within last 7 days get higher weight
  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;

  const weighted = articles.map((a) => {
    const publishedMs = a.publishedAt
      ? new Date(a.publishedAt).getTime()
      : 0;
    const age = Math.max(0, now - publishedMs);
    const weight = Math.max(0.1, 1 - age / (weekMs * 4)); // Decay over ~1 month
    return { article: a, weight };
  });

  const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0);
  let random = Math.random() * totalWeight;

  for (const entry of weighted) {
    random -= entry.weight;
    if (random <= 0) return entry.article;
  }

  return weighted[weighted.length - 1].article;
}

/**
 * Format a date string into a human-readable format like "2 hours ago".
 */
export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000)
    return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
}

/**
 * Highlight search query terms within a text string.
 * Splits on the query (case-insensitive) and wraps matches in a styled <mark>.
 * Returns plain text if query < 2 chars or no matches found.
 */
export function highlightMatches(
  text: string,
  query: string
): React.ReactNode {
  if (!query.trim() || query.trim().length < 2) return text;

  const escaped = query
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex).filter(Boolean);

  if (parts.length <= 1) return text;

  const lowerQuery = query.trim().toLowerCase();

  return parts.map((part, i) => {
    if (part.toLowerCase() === lowerQuery) {
      return (
        <mark key={i} className="bg-amber-200 text-amber-900 rounded-sm px-0.5">
          {part}
        </mark>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Truncate text to a certain length, appending "..." if needed.
 */
export function truncate(text: string | null, maxLength = 200): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

/**
 * Generate a unique ID for an article based on its feed and URL.
 */
export function makeArticleId(feedId: string, url: string): string {
  const hash = url
    .replace(/https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .slice(0, 80);
  return `${feedId}-${hash}`;
}
