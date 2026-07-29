'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Icon, Button } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

// ─── Types ──────────────────────────────────────────────────────────

interface PhProduct {
  id: string;
  name: string;
  tagline: string;
  description: string | null;
  url: string;
  website: string;
  slug: string;
  votesCount: number;
  commentsCount: number;
  reviewsCount: number;
  reviewsRating: number;
  dailyRank: number | null;
  featuredAt: string | null;
  createdAt: string;
  makers: { name: string; username: string }[];
  topics: { name: string; slug: string }[];
  thumbnail: { type: string; url: string } | null;
  media: Array<{ type: string; url: string; videoUrl: string | null }>;
}

interface PhDayFile {
  date: string;
  fetchedAt: string;
  totalCount: number;
  posts: PhProduct[];
}

interface PhIndex {
  type: 'producthunt';
  fetchedAt: string;
  lastFetchedDate: string;
  firstFetchedDate: string;
  totalDaysFetched: number;
  totalProducts: number;
  availableDates: string[];
}

const PRODUCTS_TO_SHOW = 12;
const MAX_DATE_FALLBACKS = 5; // Try up to 5 most recent days

function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

function ProductThumbnail({ thumbnail, name, size = 80 }: { thumbnail: { type: string; url: string } | null; name: string; size?: number }) {
  if (!thumbnail?.url) return null;
  return (
    <img
      src={thumbnail.url}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-lg object-cover bg-surface-secondary"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy"
    />
  );
}

function ProductLogo({ url, name, size = 32 }: { url: string; name: string; size?: number }) {
  const domain = getDomain(url);
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={name}
      width={size}
      height={size}
      className="shrink-0 rounded-lg bg-white/10"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      loading="lazy"
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function HomeProductHunt() {
  const [products, setProducts] = useState<PhProduct[]>([]);
  const [latestDate, setLatestDate] = useState<string>('');
  const [dateLabel, setDateLabel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PhProduct | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch index to find available dates
        const indexRes = await fetch('/ph-cache/index.json');
        if (!indexRes.ok) throw new Error('Product Hunt index not available');
        const index: PhIndex = await indexRes.json();
        if (!mounted) return;

        const availableDates = index.availableDates;
        if (!availableDates || availableDates.length === 0) {
          throw new Error('No Product Hunt data available');
        }

        // Try dates in reverse order (newest first) until we find one with products
        const reversedDates = [...availableDates].reverse();
        let foundProducts: PhProduct[] = [];
        let foundDate = '';

        for (let i = 0; i < Math.min(reversedDates.length, MAX_DATE_FALLBACKS); i++) {
          const dateFile = reversedDates[i];
          const dayRes = await fetch(`/ph-cache/${dateFile}.json`);
          if (!dayRes.ok) continue;

          const dayData: PhDayFile = await dayRes.json();
          if (dayData.posts && dayData.posts.length > 0) {
            foundProducts = dayData.posts;
            foundDate = dateFile;
            break;
          }
        }

        // If still no products, try products.json as ultimate fallback
        if (foundProducts.length === 0) {
          const fallbackRes = await fetch('/ph-cache/products.json');
          if (fallbackRes.ok) {
            const data = await fallbackRes.json() as { products: PhProduct[] };
            foundProducts = data.products || [];
            foundDate = 'All time';
          }
        }

        if (mounted && foundProducts.length > 0) {
          // Sort by votes descending, take top N
          const sorted = [...foundProducts]
            .sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0))
            .slice(0, PRODUCTS_TO_SHOW);
          setProducts(sorted);

          // Build a human-readable label
          if (foundDate.length >= 10) {
            const datePart = foundDate.slice(0, 10);
            setLatestDate(datePart);
            setDateLabel(new Date(datePart).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }));
          } else {
            setDateLabel(foundDate);
          }
        } else if (mounted) {
          setError('No products found in recent data');
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => { mounted = false; };
  }, []);

  // Extract all unique topics from products
  const allTopics = useMemo(() => {
    const topicSet = new Set<string>();
    for (const p of products) {
      if (p.topics) p.topics.forEach((t) => topicSet.add(t.slug));
    }
    return Array.from(topicSet).sort();
  }, [products]);

  // Filter products by selected topic
  const filteredProducts = useMemo(() => {
    if (!selectedTopic) return products;
    return products.filter((p) => p.topics && p.topics.some((t) => t.slug === selectedTopic));
  }, [products, selectedTopic]);

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-red-500 text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Product Hunt
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Latest&nbsp;
            <span className="text-red-500">Products</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            The freshest product launches from Product Hunt, ranked by upvotes.
            {dateLabel && (
              <span className="block mt-2 text-base text-fg-muted">
                Most recent data from <span className="font-semibold">{dateLabel}</span>
              </span>
            )}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-8">
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-20 h-20 bg-surface-secondary animate-pulse rounded-xl shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-8 w-3/4 bg-surface-secondary animate-pulse" />
                    <div className="h-5 w-full bg-surface-secondary animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-full bg-surface-secondary animate-pulse mb-3" />
                <div className="h-5 w-2/3 bg-surface-secondary animate-pulse mb-5" />
                <div className="flex gap-4">
                  <div className="h-6 w-16 bg-surface-secondary animate-pulse" />
                  <div className="h-6 w-20 bg-surface-secondary animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-8 text-center bg-white">
            <p className="text-lg text-fg-secondary mb-3">Product Hunt data not available yet.</p>
            <p className="text-base text-fg-muted/60">Run the daily workflow to fetch Product Hunt data.</p>
          </div>
        )}

        {/* Tag filter cards */}
        {!isLoading && !error && filteredProducts.length > 0 && allTopics.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedTopic(null)}
              className={cn(
                'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                !selectedTopic
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-surface-secondary text-fg-muted hover:bg-red-500/10 hover:text-red-600'
              )}
            >
              All Products
            </button>
            {allTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                className={cn(
                  'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                  selectedTopic === topic
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-surface-secondary text-fg-muted hover:bg-red-500/10 hover:text-red-600'
                )}
              >
                {topic.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Products grid — borderless rich cards */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <button
                type="button"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white p-8 flex flex-col text-left transition-all duration-300 hover:bg-red-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer w-full border-0"
              >
                {/* Thumbnail + Name + Votes */}
                <div className="flex items-start gap-5 mb-5">
                  <ProductThumbnail thumbnail={product.thumbnail} name={product.name} size={88} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xl font-bold uppercase tracking-wide text-fg transition-colors duration-300 group-hover:text-white">
                        {product.name}
                      </h3>
                      {product.votesCount > 0 && (
                        <span className="shrink-0 flex items-center gap-1.5 text-base font-bold text-fg-muted transition-colors duration-300 group-hover:text-white/80">
                          <Icon name="arrow-up" size={16} />
                          {product.votesCount}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-base text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/70 line-clamp-2">
                      {product.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {product.description && (
                  <p className="text-sm text-fg-tertiary leading-relaxed transition-colors duration-300 group-hover:text-white/60 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                )}

                {/* Topics + Makers */}
                <div className="mt-auto pt-5 border-t border-border/40 flex items-center gap-2 flex-wrap">
                  {(product.topics ?? []).slice(0, 3).map((topic) => (
                    <span
                      key={topic.slug}
                      className={cn(
                        'px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300',
                        selectedTopic === topic.slug
                          ? 'bg-red-500 text-white'
                          : 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80'
                      )}
                    >
                      {topic.name}
                    </span>
                  ))}
                  {(product.makers ?? []).length > 0 && (
                    <span className="text-xs text-fg-muted/60 ml-auto transition-colors duration-300 group-hover:text-white/50">
                      by {product.makers[0].name}
                    </span>
                  )}
                  {product.commentsCount > 0 && (
                    <span className="text-xs text-fg-muted/40 flex items-center gap-1 transition-colors duration-300 group-hover:text-white/40">
                      {product.commentsCount} comments
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="bg-white p-12 text-center">
            <p className="text-lg text-fg-secondary">
              {selectedTopic ? `No products found for "${selectedTopic.replace(/-/g, ' ')}"` : 'No Product Hunt products available.'}
            </p>
            <p className="text-base text-fg-muted/60 mt-2">
              {selectedTopic ? 'Try selecting a different topic.' : 'Run the daily update workflow first.'}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = 'https://www.producthunt.com'; }}
          >
            View All Products
          </Button>
        </div>
      </div>

      {/* Detail modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}

// ─── Product Detail Modal ───────────────────────────────────────────

function ProductModal({ product, onClose }: { product: PhProduct; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-surface-secondary hover:bg-red-500 hover:text-white transition-colors"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-border">
          <div className="flex items-start gap-5">
            {product.thumbnail?.url ? (
              <ProductThumbnail thumbnail={product.thumbnail} name={product.name} size={96} />
            ) : (
              <ProductLogo url={product.website || product.url} name={product.name} size={64} />
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-fg">{product.name}</h2>
              <p className="mt-2 text-lg text-fg-secondary leading-relaxed">{product.tagline}</p>
              <div className="mt-3 flex items-center gap-4">
                {product.votesCount > 0 && (
                  <span className="flex items-center gap-1.5 text-base font-bold text-fg-muted">
                    <Icon name="arrow-up" size={16} />
                    {product.votesCount} upvotes
                  </span>
                )}
                {product.commentsCount > 0 && (
                  <span className="text-base text-fg-muted/60 flex items-center gap-1.5">
                    {product.commentsCount} comments
                  </span>
                )}
                {product.reviewsCount > 0 && (
                  <span className="text-base text-fg-muted/60">
                    {product.reviewsRating?.toFixed(1)} ★ ({product.reviewsCount} reviews)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          {product.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-2">Description</h3>
              <p className="text-base text-fg-secondary leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Topics */}
          {product.topics && product.topics.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {product.topics.map((topic) => (
                  <span key={topic.slug} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted">
                    {topic.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Makers */}
          {product.makers && product.makers.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-3">Makers</h3>
              <div className="flex flex-wrap gap-3">
                {product.makers.map((maker) => (
                  <span key={maker.username} className="text-sm font-semibold text-fg">
                    {maker.name}
                    <span className="text-fg-muted font-normal"> @{maker.username}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors"
            >
              <Icon name="external-link" size={16} />
              View on Product Hunt
            </a>
            {product.website && (
              <a
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg text-sm font-bold uppercase tracking-wider hover:bg-surface-secondary transition-colors"
              >
                <Icon name="globe" size={16} />
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
