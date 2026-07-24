'use client';

import React, { useState, useEffect } from 'react';
import { Icon, Button } from '@/presentation/__components';

interface YcCompany {
  id: string;
  name: string;
  slug: string;
  website: string;
  one_liner: string;
  batch: string;
  tags: string[];
  top_company: boolean;
  isHiring: boolean;
  team_size: number;
  stage: string;
}

interface YcFeatured {
  fetchedAt: string;
  count: number;
  companies: YcCompany[];
}

interface YcMeta {
  last_updated: string;
  total_companies: number;
  total_batches: number;
  fetchedAt: string;
}

const TOTAL_DISPLAY = 8;

export function HomeYC() {
  const [meta, setMeta] = useState<YcMeta | null>(null);
  const [companies, setCompanies] = useState<YcCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch meta
        const metaRes = await fetch('/yc-cache/meta.json');
        if (!metaRes.ok) throw new Error('YC data not available');
        const metaData: YcMeta = await metaRes.json();
        if (!mounted) return;
        setMeta(metaData);

        // Fetch featured companies (pre-computed by registry script)
        const featuredRes = await fetch('/yc-cache/featured.json');
        if (featuredRes.ok) {
          const featured: YcFeatured = await featuredRes.json();
          if (mounted) {
            setCompanies(featured.companies.slice(0, TOTAL_DISPLAY));
          }
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

  return (
    <section className="py-20 sm:py-28 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-orange-500 text-white mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Y Combinator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            YC&nbsp;
            <span className="text-orange-500">Companies</span>
          </h2>
          <p className="mt-3 text-sm text-fg-secondary max-w-xl">
            The latest companies from Y Combinator&apos;s recent batches.
            {meta && ` ${meta.total_companies} companies indexed.`}
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-5">
                <div className="h-5 w-3/4 bg-surface-secondary animate-pulse mb-3" />
                <div className="h-3 w-full bg-surface-secondary animate-pulse mb-2" />
                <div className="h-3 w-2/3 bg-surface-secondary animate-pulse mb-4" />
                <div className="h-4 w-1/3 bg-surface-secondary animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-6 text-center bg-white">
            <p className="text-sm text-fg-secondary mb-2">
              Y Combinator data not available yet.
            </p>
            <p className="text-xs text-fg-muted/60">
              Run the daily workflow in the registry repo to fetch YC data.
            </p>
          </div>
        )}

        {/* Companies grid */}
        {!isLoading && !error && companies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {companies.map((company) => (
              <a
                key={company.id || company.name}
                href={company.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-5 flex flex-col transition-all duration-300 hover:bg-orange-500"
              >
                <h3 className="text-sm font-bold uppercase tracking-wide text-fg transition-colors duration-300 group-hover:text-white">
                  {company.name}
                </h3>
                {company.one_liner && (
                  <p className="mt-2 text-xs text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-2">
                    {company.one_liner}
                  </p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  {company.batch && (
                    <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-surface-secondary text-fg-muted transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/80">
                      {company.batch}
                    </span>
                  )}
                  {company.top_company && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-orange-500 transition-colors duration-300 group-hover:text-white/90">
                      Top Company
                    </span>
                  )}
                  {company.isHiring && (
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-green-600 transition-colors duration-300 group-hover:text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-white/90" />
                      Hiring
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && companies.length === 0 && (
          <div className="bg-white p-10 text-center">
            <p className="text-sm text-fg-secondary">No YC company data available.</p>
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
            onClick={() => { window.location.href = 'https://www.ycombinator.com/companies'; }}
          >
            View All YC Companies
          </Button>
        </div>
      </div>
    </section>
  );
}
