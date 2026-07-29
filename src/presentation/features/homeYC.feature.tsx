'use client';

import React, { useState, useEffect } from 'react';
import { Icon, Button } from '@/presentation/__components';
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

function CompanyLogo({ website, name, size = 32 }: { website: string; name: string; size?: number }) {
  const domain = getDomain(website);
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
            <CompanyLogo website={company.url || company.website} name={company.name} size={64} />
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

  const displayCompanies = latestChanges
    ? [
        ...(latestChanges.added ?? []).map((c) => ({ ...c, _changeType: 'added' as const })),
        ...(latestChanges.updated ?? []).slice(0, 6).map((c) => {
          const full = companiesById.get(c.id);
          return {
            ...(full ?? c),
            _changeType: 'updated' as const,
          } as YcCompany & { _changeType: 'added' | 'updated' | 'featured' };
        }),
      ].slice(0, TOTAL_DISPLAY)
    : allCompanies.slice(0, TOTAL_DISPLAY).map((c) => ({ ...c, _changeType: 'featured' as const } as YcCompany & { _changeType: 'added' | 'updated' | 'featured' }));

  const hasContent = displayCompanies.length > 0;

  return (
    <section className="py-16 sm:py-24 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
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
              {'added' in latestChanges && latestChanges.added && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {latestChanges.added.length} new
                </span>
              )}
              {'updated' in latestChanges && latestChanges.updated && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  {latestChanges.updated.length} updated
                </span>
              )}
              <span className="text-sm text-fg-muted/60">
                {'fetchedAt' in latestChanges && latestChanges.fetchedAt ? timeAgo(latestChanges.fetchedAt) : ''}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-6">
                <div className="h-7 w-3/4 bg-surface-secondary animate-pulse mb-4" />
                <div className="h-5 w-full bg-surface-secondary animate-pulse mb-3" />
                <div className="h-5 w-2/3 bg-surface-secondary animate-pulse mb-5" />
                <div className="h-6 w-1/3 bg-surface-secondary animate-pulse" />
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

        {/* Companies grid — full rich cards */}
        {!isLoading && !error && hasContent && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayCompanies.map((company) => (
              <button
                type="button"
                key={`${company._changeType}-${company.id}`}
                onClick={() => setSelectedCompany(company as YcCompany)}
                className="group bg-white p-6 flex flex-col text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:bg-orange-500 cursor-pointer border-0 w-full"
              >
                {/* Logo + Name + Badge */}
                <div className="flex items-center gap-4 mb-3">
                  <CompanyLogo website={company.url || company.website} name={company.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold uppercase tracking-wide text-fg truncate transition-colors duration-300 group-hover:text-white">
                        {company.name}
                      </h3>
                      {'_changeType' in company && company._changeType === 'added' && (
                        <span className="shrink-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700 group-hover:bg-white/20 group-hover:text-white/80">
                          New
                        </span>
                      )}
                    </div>
                    {company.batch && (
                      <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-fg-muted transition-colors duration-300 group-hover:text-white/70">
                        {company.batch}
                      </span>
                    )}
                  </div>
                </div>

                {/* One-liner */}
                {company.one_liner && (
                  <p className="mt-1 text-base text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-2">
                    {company.one_liner}
                  </p>
                )}

                {/* Meta row */}
                <div className="mt-auto pt-4 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    {company.industry && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-fg-muted transition-colors duration-300 group-hover:text-white/70">
                        {company.industry}
                      </span>
                    )}
                    {company.team_size > 0 && (
                      <span className="text-xs text-fg-muted/60 transition-colors duration-300 group-hover:text-white/50">
                        · {company.team_size} {company.team_size === 1 ? 'person' : 'people'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {company.isHiring && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 transition-colors duration-300 group-hover:text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 group-hover:bg-white/90" />
                        Hiring
                      </span>
                    )}
                    {company.top_company && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 transition-colors duration-300 group-hover:text-white/90">
                        Top
                      </span>
                    )}
                  </div>
                </div>

                {/* Stage or tags */}
                {(company.stage || (company.tags && company.tags.length > 0)) && (
                  <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                    {company.stage && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/80">
                        {company.stage}
                      </span>
                    )}
                    {(company.tags ?? []).slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white/80">
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
            <p className="text-lg text-fg-secondary">No YC company data available.</p>
            <p className="text-base text-fg-muted/60 mt-2">Run the daily update workflow first.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            variant="purpleGhost"
            size="lg"
            icon={<Icon name="arrow-right" size={18} />}
            iconPosition="right"
            onClick={() => { window.location.href = 'https://www.ycombinator.com/companies'; }}
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
