'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';
import { timeAgo } from '@/feed/feed.utils';

// ─── Types (mirrors homeYC.feature) ─────────────────────────────────

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

// ─── Helpers ────────────────────────────────────────────────────────

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
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-surface-secondary hover:bg-orange-500 hover:text-white transition-colors"
        >
          <Icon name="x" size={20} />
        </button>

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

        <div className="px-8 py-6 space-y-6">
          {company.long_description && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-fg-muted mb-2">About</h3>
              <p className="text-base text-fg-secondary leading-relaxed">{company.long_description}</p>
            </div>
          )}

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

// ─── Page Component ─────────────────────────────────────────────────

export function YcPage() {
  const [meta, setMeta] = useState<YcMeta | null>(null);
  const [allCompanies, setAllCompanies] = useState<YcCompany[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<YcCompany | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [metaRes, companiesRes] = await Promise.all([
          fetch('/yc-cache/meta.json'),
          fetch('/yc-cache/companies.json'),
        ]);
        if (!metaRes.ok) throw new Error('YC data not available');
        const metaData: YcMeta = await metaRes.json();
        if (!mounted) return;
        setMeta(metaData);

        if (companiesRes.ok) {
          const catalog: YcCatalog = await companiesRes.json();
          if (mounted) setAllCompanies(catalog.companies || []);
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

  // All unique tags from ALL companies
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    for (const c of allCompanies) {
      if (c.tags) c.tags.forEach((t) => tagSet.add(t));
    }
    return Array.from(tagSet).sort();
  }, [allCompanies]);

  // Filter + search
  const filteredCompanies = useMemo(() => {
    let result = allCompanies;
    if (selectedTag) {
      result = result.filter((c) => c.tags && c.tags.includes(selectedTag));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        (c.one_liner && c.one_liner.toLowerCase().includes(q)) ||
        (c.long_description && c.long_description.toLowerCase().includes(q)) ||
        (c.industry && c.industry.toLowerCase().includes(q)) ||
        (c.tags && c.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    return result;
  }, [allCompanies, selectedTag, searchQuery]);

  return (
    <div className="min-h-screen py-16 sm:py-24 bg-surface-secondary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-orange-500 text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Y Combinator
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            All YC&nbsp;
            <span className="text-orange-500">Companies</span>
          </h1>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Browse every Y Combinator startup we&apos;ve indexed — filter by tag, search by name or description.
            {meta && ` ${meta.totalCompanies} companies.`}
          </p>
          {meta && (
            <p className="mt-2 text-base text-fg-muted/60">
              Last updated {timeAgo(meta.last_updated)}
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
            placeholder="Search companies by name, tag, industry..."
            className="w-full bg-white border-0 py-4 pl-12 pr-12 text-base text-fg placeholder:text-fg-muted/50 outline-none focus:ring-2 focus:ring-orange-500/30 transition-shadow"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 flex items-center pr-4 text-fg-muted hover:text-fg">
              <Icon name="x" size={16} />
            </button>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
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
          <div className="p-12 text-center bg-white">
            <p className="text-xl text-fg-secondary mb-3">{error}</p>
            <p className="text-base text-fg-muted/60">Run the daily YC update workflow first.</p>
          </div>
        )}

        {/* Tag filter cards */}
        {!isLoading && !error && allTags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className={cn(
                'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                !selectedTag
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white text-fg-muted hover:bg-orange-500/10 hover:text-orange-600'
              )}
            >
              All ({allCompanies.length})
            </button>
            {allTags.map((tag) => {
              const count = selectedTag === tag
                ? filteredCompanies.length
                : allCompanies.filter((c) => c.tags && c.tags.includes(tag)).length;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={cn(
                    'px-5 py-3 text-base font-bold uppercase tracking-wider transition-all duration-200',
                    selectedTag === tag
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-white text-fg-muted hover:bg-orange-500/10 hover:text-orange-600'
                  )}
                >
                  {tag.replace(/-/g, ' ')} ({count})
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        {!isLoading && !error && (
          <p className="mb-6 text-sm text-fg-muted/60 uppercase tracking-wider">
            {searchQuery
              ? `Found ${filteredCompanies.length} company${filteredCompanies.length !== 1 ? 'ies' : 'y'} for "${searchQuery}"`
              : `${filteredCompanies.length} company${filteredCompanies.length !== 1 ? 'ies' : 'y'} ${selectedTag ? `in "${selectedTag.replace(/-/g, ' ')}"` : ''}`
            }
          </p>
        )}

        {/* Companies grid */}
        {!isLoading && !error && filteredCompanies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCompanies.map((company) => (
              <button
                type="button"
                key={company.id}
                onClick={() => setSelectedCompany(company)}
                className="group bg-white p-8 flex flex-col text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:bg-orange-500 cursor-pointer border-0 w-full"
              >
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

                {company.one_liner && (
                  <p className="text-lg text-fg-secondary leading-relaxed transition-colors duration-300 group-hover:text-white/80 line-clamp-3">
                    {company.one_liner}
                  </p>
                )}

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

                {company.tags && company.tags.length > 0 && (
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
        {!isLoading && !error && filteredCompanies.length === 0 && (
          <div className="bg-white p-12 text-center">
            <p className="text-xl text-fg-secondary mb-2">
              {searchQuery
                ? `No companies found for "${searchQuery}"`
                : selectedTag
                  ? `No companies in "${selectedTag.replace(/-/g, ' ')}"`
                  : 'No YC company data available.'
              }
            </p>
            <p className="text-base text-fg-muted/60">
              {searchQuery || selectedTag ? 'Try different search terms or filters.' : 'Run the daily update workflow first.'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCompany && (
        <CompanyModal company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </div>
  );
}
