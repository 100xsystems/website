'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Icon, Button } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';
import { timeAgo } from '@/feed/feed.utils';

// ─── Full YC Company Interface ──────────────────────────────────────

interface YcCompany {
  id: number;
  name: string;
  slug: string;
  former_names: string[];
  small_logo_thumb_url: string;
  website: string;
  all_locations: string;
  long_description: string;
  one_liner: string;
  team_size: number;
  highlight_black: boolean;
  highlight_latinx: boolean;
  highlight_women: boolean;
  industry: string;
  subindustry: string;
  launched_at: number;
  tags: string[];
  tags_highlighted: string[];
  top_company: boolean;
  isHiring: boolean;
  nonprofit: boolean;
  batch: string;
  status: string;
  industries: string[];
  regions: string[];
  stage: string;
  app_video_public: boolean;
  demo_day_video_public: boolean;
  app_answers: null;
  question_answers: boolean;
  url: string;
}

interface YcChangeSet {
  date: string;
  fetchedAt: string;
  previousCount: number;
  currentCount: number;
  added: YcCompany[];
  removed: YcCompany[];
  updated: Array<{
    id: number;
    name: string;
    slug: string;
    batch: string;
    url: string;
    changes: Array<{ field: string; before: unknown; after: unknown }>;
  }>;
}

interface YcMeta {
  last_updated: string;
  totalCompanies: number;
  totalBatches: number;
  totalTags: number;
  totalIndustries: number;
}

interface YcCatalog {
  fetchedAt: string;
  count: number;
  companies: YcCompany[];
}

const TOTAL_DISPLAY = 12;

function getDomain(url: string): string | null {
  try { return new URL(url).hostname; } catch { return null; }
}

function CompanyLogo({ website, name, size = 48 }: { website?: string; name: string; size?: number }) {
  const domain = website ? getDomain(website) : null;
  if (!domain) return null;
  return (
    <div className="shrink-0">
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={name}
        width={size}
        height={size}
        className="rounded-xl"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        loading="lazy"
      />
    </div>
  );
}

// ─── Detail Modal ───────────────────────────────────────────────────

function CompanyModal({ company, onClose }: { company: YcCompany; onClose: () => void }) {
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
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-surface-secondary hover:bg-accent hover:text-white transition-colors"
        >
          <Icon name="x" size={20} />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-border">
          <div className="flex items-start gap-5">
            <CompanyLogo website={company.website} name={company.name} size={72} />
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold uppercase tracking-wide text-fg">{company.name}</h2>
              {company.one_liner && (
                <p className="mt-2 text-lg text-fg-secondary leading-relaxed">{company.one_liner}</p>
              )}
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                {company.batch && (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700">{company.batch}</span>
                )}
                {company.stage && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted">{company.stage}</span>
                )}
                {company.top_company && (
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-500">Top Company</span>
                )}
                {company.isHiring && (
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600">
                    <span className="w-2 h-2 rounded-full bg-green-600" />Hiring
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">
          {/* Description */}
          {company.long_description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-2">About</h3>
              <p className="text-base text-fg-secondary leading-relaxed">{company.long_description}</p>
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {company.industry && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Industry</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.industry}</p>
              </div>
            )}
            {company.team_size > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Team Size</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.team_size}</p>
              </div>
            )}
            {company.all_locations && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Location</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.all_locations}</p>
              </div>
            )}
            {company.status && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Status</p>
                <p className="mt-1 text-sm font-semibold text-fg capitalize">{company.status}</p>
              </div>
            )}
            {company.regions && company.regions.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Regions</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.regions.join(', ')}</p>
              </div>
            )}
            {company.industries && company.industries.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Industries</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.industries.slice(0, 3).join(', ')}</p>
              </div>
            )}
            {company.former_names && company.former_names.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-muted">Former Names</p>
                <p className="mt-1 text-sm font-semibold text-fg">{company.former_names.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Tags */}
          {company.tags && company.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <a
              href={company.url || company.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white text-sm font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              <Icon name="external-link" size={16} />
              View on Y Combinator
            </a>
            <a
              href={company.website || company.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-fg text-sm font-bold uppercase tracking-wider hover:bg-surface-secondary transition-colors"
            >
              <Icon name="globe" size={16} />
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function HomeYC() {
  const [meta, setMeta] = useState<YcMeta | null>(null);
  const [allCompanies, setAllCompanies] = useState<YcCompany[]>([]);
  const [latestChanges, setLatestChanges] = useState<YcChangeSet | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<YcCompany | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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

        // Fetch all companies for full data
        const companiesRes = await fetch('/yc-cache/companies.json');
        if (companiesRes.ok) {
          const catalog: YcCatalog = await companiesRes.json();
          if (mounted) {
            setAllCompanies(catalog.companies || []);
          }
        }

        // Fetch latest changes
        const changesRes = await fetch('/yc-cache/changes/latest.json');
        if (changesRes.ok) {
          const changes: YcChangeSet = await changesRes.json();
          if (mounted) {
            setLatestChanges(changes);
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

  // Build display companies: merge changes with full data from the catalog
  const companiesById = new Map(allCompanies.map((c) => [c.id, c]));

  const rawDisplayCompanies = latestChanges
    ? [
        ...(latestChanges.added ?? []).map((c) => ({ ...c, _changeType: 'new' as const })),
        ...(latestChanges.updated ?? []).slice(0, 6).map((c) => {
          const full = companiesById.get(c.id);
          return {
            ...(full ?? c),
            _changeType: 'new' as const,
          } as YcCompany & { _changeType: 'new' | 'featured' };
        }),
      ].slice(0, TOTAL_DISPLAY)
    : allCompanies.slice(0, TOTAL_DISPLAY).map((c) => ({ ...c, _changeType: 'featured' as const } as YcCompany & { _changeType: 'new' | 'featured' }));

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const c of rawDisplayCompanies) {
      if (c.tags) c.tags.forEach((t) => tagSet.add(t));
    }
    return Array.from(tagSet).sort();
  }, [rawDisplayCompanies]);

  const displayCompanies = useMemo(() => {
    if (!selectedTag) return rawDisplayCompanies;
    return rawDisplayCompanies.filter((c) => c.tags && c.tags.includes(selectedTag));
  }, [rawDisplayCompanies, selectedTag]);

  const hasContent = displayCompanies.length > 0;

  return (
    <section id="yc" className="scroll-mt-20 py-10 sm:py-24 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-orange-500 text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Y Combinator
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            YC&nbsp;
            <span className="text-orange-500">Companies</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Discover the latest Y Combinator startups — their mission, team, industry, and more.
            {meta && ` ${meta.totalCompanies} companies indexed.`}
          </p>
          {latestChanges && (
            <div className="mt-4 flex items-center gap-6 text-base text-fg-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {(latestChanges.added?.length ?? 0) + (latestChanges.updated?.length ?? 0)} new changes
              </span>
              <span className="text-sm text-fg-muted/60">
                {'fetchedAt' in latestChanges && latestChanges.fetchedAt ? timeAgo(latestChanges.fetchedAt) : ''}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-8">
                <div className="h-9 w-3/4 bg-surface-secondary animate-pulse mb-5" />
                <div className="h-6 w-full bg-surface-secondary animate-pulse mb-4" />
                <div className="h-6 w-2/3 bg-surface-secondary animate-pulse mb-6" />
                <div className="h-8 w-1/3 bg-surface-secondary animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="p-8 text-center bg-white">
            <p className="text-lg text-fg-secondary mb-3">YC data not available yet.</p>
            <p className="text-base text-fg-muted/60">Run the daily workflow to fetch YC data.</p>
          </div>
        )}

        {/* Tag filter cards */}
        {!isLoading && !error && allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={cn(
                'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                !selectedTag
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-surface-secondary text-fg-muted hover:bg-orange-500/10 hover:text-orange-600'
              )}
            >
              All Companies
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={cn(
                  'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                  selectedTag === tag
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-surface-secondary text-fg-muted hover:bg-orange-500/10 hover:text-orange-600'
                )}
              >
                {tag.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        )}

        {/* Companies grid — BIGGER cards */}
        {!isLoading && !error && hasContent && (
          <div className="flex gap-4 overflow-x-auto -mx-6 px-6 pb-2 snap-x snap-mandatory sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:snap-none lg:grid-cols-3 xl:grid-cols-4">
            {displayCompanies.map((company) => (
              <button
                type="button"
                key={`${company._changeType}-${company.id}`}
                onClick={() => setSelectedCompany(company as YcCompany)}
                className="group flex w-[82vw] shrink-0 snap-start flex-col bg-white p-5 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-orange-500 cursor-pointer border-0 sm:w-auto sm:p-8"
              >
                {/* Logo + Name */}
                <div className="flex items-center gap-5 mb-4">
                  <CompanyLogo website={company.website} name={company.name} size={52} />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold uppercase tracking-wide text-fg truncate transition-colors duration-300 group-hover:text-white">
                      {company.name}
                    </h3>
                    {company.batch && (
                      <span className="inline-block mt-1.5 text-sm font-semibold uppercase tracking-wider text-fg-muted transition-colors duration-300 group-hover:text-white/70">
                        {company.batch}
                      </span>
                    )}
                  </div>
                </div>

                {/* One-liner — bigger */}
                {company.one_liner && (
                  <p className="text-lg text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-3">
                    {company.one_liner}
                  </p>
                )}

                {/* Meta row */}
                <div className="mt-5 pt-5 border-t border-border/40 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    {company.industry && (
                      <span className="text-sm font-bold uppercase tracking-wider text-fg-muted transition-colors duration-300 group-hover:text-white/70">
                        {company.industry}
                      </span>
                    )}
                    {company.team_size > 0 && (
                      <span className="text-sm text-fg-muted/60 transition-colors duration-300 group-hover:text-white/50">
                        · {company.team_size} {company.team_size === 1 ? 'person' : 'people'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {company.isHiring && (
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 transition-colors duration-300 group-hover:text-white/90">
                        <span className="w-2 h-2 rounded-full bg-green-600 group-hover:bg-white/90" />
                        Hiring
                      </span>
                    )}
                    {company.top_company && (
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-500 transition-colors duration-300 group-hover:text-white/90">
                        Top
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags — bigger */}
                {(company.tags && company.tags.length > 0) && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {company.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300',
                          selectedTag === tag
                            ? 'bg-orange-500 text-white'
                            : 'bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80'
                        )}
                      >
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && !hasContent && (
          <div className="bg-white p-12 text-center">
            <p className="text-lg text-fg-secondary">
              {selectedTag ? `No companies found for "${selectedTag.replace(/-/g, ' ')}"` : 'No YC company data available.'}
            </p>
            <p className="text-base text-fg-muted/60 mt-2">
              {selectedTag ? 'Try selecting a different tag.' : 'Run the daily update workflow first.'}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = '/discover/yc'; }}
          >
            View All YC Companies
          </Button>
        </div>
      </div>

      {/* Detail modal */}
      {selectedCompany && (
        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </section>
  );
}
