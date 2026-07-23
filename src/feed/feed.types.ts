/**
 * Feed source definition — a single engineering blog we track.
 * Only stores metadata/links, never the actual content.
 */
export interface FeedSource {
  id: string;
  name: string;
  rssUrl: string;
  siteUrl: string;
  icon?: string;
  tags: string[];
  description: string;
  addedBy: 'curator' | 'community';
  language: string;
}

/**
 * A single article fetched from an RSS feed via the API.
 */
export interface Article {
  id: string;
  feedId: string;
  feedName: string;
  feedSiteUrl: string;
  title: string;
  url: string;
  author: string | null;
  summary: string | null;
  contentSnippet: string | null;
  publishedAt: string | null;
  tags: string[];
  /** HN-style upvotes (0 initially) */
  upvotes: number;
}

/**
 * Response from the /api/feed endpoint.
 */
export interface FeedApiResponse {
  articles: Article[];
  feeds: string[];
  /** Total articles in this response */
  total: number;
  /** Cursor for pagination — pass as ?cursor= to get the next batch */
  cursor: string | null;
  errors: Array<{ feedId: string; error: string }>;
}

/**
 * User's feed preferences stored in localStorage.
 */
export interface UserFeedPreferences {
  selectedFeeds: string[];
  selectedTags: string[];
  hiddenFeeds: string[];
  sortBy: 'newest' | 'hn-rank';
}

/**
 * A bookmarked article stored in localStorage.
 * Only stores metadata + link, never the actual content.
 */
export interface BookmarkEntry {
  url: string;
  title: string;
  feedName: string;
  feedId: string;
  savedAt: string;
}
