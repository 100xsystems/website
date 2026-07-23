import type { FeedApiResponse } from './feed.types';

/**
 * Fetch articles from selected feeds via the API.
 * The API reads from the registry cache, so this is fast and doesn't time out.
 *
 * @param feedIds - Array of feed IDs to fetch (empty = all feeds)
 * @param limit  - Max articles to return
 * @param cursor - Pagination cursor (ISO date string) for older articles
 * @returns Parsed FeedApiResponse
 */
export async function fetchFeed(
  feedIds: string[],
  limit = 50,
  cursor?: string
): Promise<FeedApiResponse> {
  const params = new URLSearchParams();
  if (feedIds.length > 0) {
    params.set('feeds', feedIds.join(','));
  }
  params.set('limit', String(limit));
  if (cursor) {
    params.set('cursor', cursor);
  }

  const url = `/api/feed?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Feed API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch all articles at once (no progressive loading needed since cache reads are fast).
 * The API returns all matching articles from the local cache in one response.
 *
 * @param feedIds - Array of feed IDs to fetch (empty = all feeds)
 * @returns Parsed FeedApiResponse with all matching articles
 */
export async function fetchFeedAll(feedIds: string[]): Promise<FeedApiResponse> {
  return fetchFeed(feedIds, 200);
}
