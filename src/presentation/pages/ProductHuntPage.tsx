'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@/presentation/__components';
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

const MAX_DATE_FALLBACKS = 3;

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
                  <span className="text-base text-fg-muted/60">{product.commentsCount} comments</span>
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

        <div className="px-8 py-6 space-y-6">
          {product.description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-2">Description</h3>
              <p className="text-base text-fg-secondary leading-relaxed">{product.description}</p>
            </div>
          )}

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

// ─── Page Component ─────────────────────────────────────────────────

export function ProductHuntPage() {
  const [allProducts, setAllProducts] = useState<PhProduct[]>([]);
  const [dateLabel, setDateLabel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PhProduct | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const indexRes = await fetch('/ph-cache/index.json');
        if (!indexRes.ok) throw new Error('Product Hunt index not available');
        const index: PhIndex = await indexRes.json();
        if (!mounted) return;

        const availableDates = index.availableDates;
        if (!availableDates || availableDates.length === 0) {
          throw new Error('No Product Hunt data available');
        }

        // Try latest dates first for fresh data
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

        // Fallback to full products.json for the complete catalog
        if (foundProducts.length === 0) {
          const fallbackRes = await fetch('/ph-cache/products.json');
          if (fallbackRes.ok) {
            const data = await fallbackRes.json() as { products: PhProduct[] };
            foundProducts = data.products || [];
            foundDate = 'All time';
          }
        }

        if (mounted && foundProducts.length > 0) {
          const sorted = [...foundProducts].sort((a, b) => (b.votesCount || 0) - (a.votesCount || 0));
          setAllProducts(sorted);
          if (foundDate.length >= 10) {
            setDateLabel(new Date(foundDate.slice(0, 10)).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }));
          } else {
            setDateLabel(foundDate);
          }
        } else if (mounted) {
          setError('No products found in recent data');
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  // All unique topics from ALL products
  const allTopics = useMemo(() => {
    const topicSet = new Set<string>();
    for (const p of allProducts) {
      if (p.topics) p.topics.forEach((t) => topicSet.add(t.slug));
    }
    return Array.from(topicSet).sort();
  }, [allProducts]);

  // Filter + search
  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedTopic) {
      result = result.filter((p) => p.topics && p.topics.some((t) => t.slug === selectedTopic));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.makers && p.makers.some((m) => m.name.toLowerCase().includes(q))) ||
        (p.topics && p.topics.some((t) => t.name.toLowerCase().includes(q)))
      );
    }
    return result;
  }, [allProducts, selectedTopic, searchQuery]);

  return (
    <div className="min-h-screen py-16 sm:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-red-500 text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Product Hunt
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            All&nbsp;
            <span className="text-red-500">Products</span>
          </h1>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Browse the latest product launches from Product Hunt — filter by topic, search by name or maker.
            {allProducts.length > 0 && ` ${allProducts.length} products loaded.`}
          </p>
          {dateLabel && (
            <p className="mt-2 text-base text-fg-muted/60">
              Most recent data from <span className="font-semibold">{dateLabel}</span>
            </p>
          )}
        </div>

        {/* Search bar */}
        <div className="relative mb-8 max-w-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-fg-muted">
            <Icon name="search" size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name, maker, topic..."
            className="w-full bg-surface-secondary border-0 py-4 pl-12 pr-12 text-base text-fg placeholder:text-fg-muted/50 outline-none focus:ring-2 focus:ring-red-500/30 transition-shadow"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-4 text-fg-muted hover:text-fg">
              <Icon name="x" size={16} />
            </button>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-surface-secondary p-8">
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-20 h-20 bg-surface-muted animate-pulse rounded-xl shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-8 w-3/4 bg-surface-muted animate-pulse" />
                    <div className="h-5 w-full bg-surface-muted animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-full bg-surface-muted animate-pulse mb-3" />
                <div className="h-5 w-2/3 bg-surface-muted animate-pulse mb-5" />
                <div className="flex gap-4">
                  <div className="h-6 w-16 bg-surface-muted animate-pulse" />
                  <div className="h-6 w-20 bg-surface-muted animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-12 text-center bg-surface-secondary">
            <p className="text-xl text-fg-secondary mb-3">{error}</p>
            <p className="text-base text-fg-muted/60">Run the daily Product Hunt workflow first.</p>
          </div>
        )}

        {/* Topic filter cards */}
        {!isLoading && !error && allTopics.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
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
              All ({allProducts.length})
            </button>
            {allTopics.map((topic) => {
              const count = selectedTopic === topic
                ? filteredProducts.length
                : allProducts.filter((p) => p.topics && p.topics.some((t) => t.slug === topic)).length;
              return (
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
                  {topic.replace(/-/g, ' ')} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && (
          <p className="mb-6 text-sm text-fg-muted/60 uppercase tracking-wider">
            {searchQuery
              ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} for "${searchQuery}"`
              : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} ${selectedTopic ? `in "${selectedTopic.replace(/-/g, ' ')}"` : ''}`
            }
          </p>
        )}

        {/* Products grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <button
                type="button"
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-surface-secondary p-8 flex flex-col text-left transition-all duration-300 hover:bg-red-500 hover:scale-[1.03] hover:shadow-2xl cursor-pointer w-full border-0"
              >
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

                {product.description && (
                  <p className="text-sm text-fg-tertiary leading-relaxed transition-colors duration-300 group-hover:text-white/60 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                )}

                <div className="mt-auto pt-5 border-t border-border/40 flex items-center gap-2 flex-wrap">
                  {(product.topics ?? []).slice(0, 3).map((topic) => (
                    <span
                      key={topic.slug}
                      className={cn(
                        'px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300',
                        selectedTopic === topic.slug
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-fg-muted group-hover:bg-white/20 group-hover:text-white/80'
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
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="bg-surface-secondary p-12 text-center">
            <p className="text-xl text-fg-secondary mb-2">
              {searchQuery
                ? `No products found for "${searchQuery}"`
                : selectedTopic
                  ? `No products in "${selectedTopic.replace(/-/g, ' ')}"`
                  : 'No Product Hunt data available.'
              }
            </p>
            <p className="text-base text-fg-muted/60">
              {searchQuery || selectedTopic ? 'Try different search terms or filters.' : 'Run the daily update workflow first.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
