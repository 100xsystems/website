'use client';

import React, { useState, useEffect } from 'react';
import { Icon, Button } from '@/presentation/__components';

interface PhProduct {
  name: string;
  upvotes: string;
  link: string;
  producthunt_link: string;
  description: string;
  tags: string;
}

interface PhCache {
  fetchedAt: string;
  count: number;
  products: PhProduct[];
}

const PRODUCTS_TO_SHOW = 8;

export function HomeProductHunt() {
  const [products, setProducts] = useState<PhProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch('/ph-cache/products.json');
        if (!res.ok) throw new Error('Product Hunt data not available');
        const data: PhCache = await res.json();
        if (!mounted) return;

        // Sort by upvotes (descending), take top N
        const sorted = [...data.products]
          .sort((a, b) => parseInt(b.upvotes || '0', 10) - parseInt(a.upvotes || '0', 10))
          .slice(0, PRODUCTS_TO_SHOW);

        setProducts(sorted);
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

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-red-500 text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Product Hunt
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Trending&nbsp;
            <span className="text-red-500">Products</span>
          </h2>
          <p className="mt-3 text-sm text-fg-secondary max-w-xl">
            Popular products and tools launching on Product Hunt, ranked by upvotes.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border border-border p-5">
                <div className="h-5 w-3/4 bg-surface-secondary animate-pulse mb-3" />
                <div className="h-3 w-full bg-surface-secondary animate-pulse mb-2" />
                <div className="h-3 w-2/3 bg-surface-secondary animate-pulse mb-4" />
                <div className="flex items-center gap-3">
                  <div className="h-4 w-10 bg-surface-secondary animate-pulse" />
                  <div className="h-4 w-16 bg-surface-secondary animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-6 text-center border border-border">
            <p className="text-sm text-fg-secondary mb-2">
              Product Hunt data not available yet.
            </p>
            <p className="text-xs text-fg-muted/60">
              Run the daily workflow in the registry repo to fetch Product Hunt data.
            </p>
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, i) => (
              <a
                key={product.name + i}
                href={product.producthunt_link || product.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border p-5 flex flex-col transition-all duration-300 hover:bg-red-500 hover:border-red-500"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-fg transition-colors duration-300 group-hover:text-white flex-1">
                    {product.name}
                  </h3>
                  {product.upvotes && (
                    <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-fg-muted transition-colors duration-300 group-hover:text-white/80">
                      <Icon name="arrow-up" size={12} />
                      {product.upvotes}
                    </span>
                  )}
                </div>
                {product.description && (
                  <p className="mt-2 text-xs text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {product.tags && (
                  <div className="mt-auto pt-3 flex items-center gap-1 flex-wrap">
                    {product.tags.split(',').slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/80"
                      >
                        {tag.trim().replace(/^#/, '')}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className="border border-border p-10 text-center">
            <p className="text-sm text-fg-secondary">No Product Hunt data available.</p>
            <p className="text-xs text-fg-muted/60 mt-1">Run the daily update workflow first.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button
            variant="purpleGhost"
            size="default"
            icon={<Icon name="arrow-right" size={14} />}
            iconPosition="right"
            onClick={() => { window.location.href = 'https://www.producthunt.com'; }}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
