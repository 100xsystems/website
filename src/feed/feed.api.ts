import type { FeedApiResponse } from './feed.types';

/**
 * Fetch articles from selected feeds via the serverless API.
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
 * Fetch multiple batches of feeds progressively.
 * First batch fetches the first `batchSize` feeds immediately.
 * Remaining feeds are fetched in the background and returned as they arrive.
 *
 * @param allFeedIds - All feed IDs the user wants
 * @param batchSize  - Number of feeds to fetch in the first batch
 * @returns Async generator yielding FeedApiResponse for each batch
 */
export async function* fetchFeedProgressively(
  allFeedIds: string[],
  batchSize = 15
): AsyncGenerator<FeedApiResponse, void, unknown> {
  if (allFeedIds.length === 0) {
    // Fetch all feeds (first batch only)
    yield await fetchFeed([], 100);
    return;
  }

  // First batch — critical, shown immediately
  const firstBatch = allFeedIds.slice(0, batchSize);
  yield await fetchFeed(firstBatch, 100);

  // Remaining feeds — fetched in background batches
  const remaining = allFeedIds.slice(batchSize);
  for (let i = 0; i < remaining.length; i += batchSize) {
    const batch = remaining.slice(i, i + batchSize);
    yield await fetchFeed(batch, 100);
  }
}
