import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, refreshKnowledgeCacheIfStale, type ResourceHub } from '@/lib/knowledge-resources';
import { cn } from '@/application/lib/utils';
import {
  SiX,
  SiWhatsapp,
  SiDiscord,
  SiNetflix,
  SiTiktok,
  SiGoogle,
  SiUber,
} from 'react-icons/si';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Case Studies — Knowledge Base',
  description:
    'Real-world system design case studies — how Twitter, WhatsApp, Discord, Netflix, TikTok, Amazon, Google, and Uber architect their systems at scale.',
};

const CASE_META: Record<string, { icon: React.ReactNode; chip: string }> = {
  'twitter-newsfeed': { icon: <SiX size={26} />, chip: 'bg-slate-100 text-slate-900' },
  'whatsapp-messaging': { icon: <SiWhatsapp size={26} />, chip: 'bg-emerald-100 text-emerald-700' },
  'discord-chat': { icon: <SiDiscord size={26} />, chip: 'bg-indigo-100 text-indigo-700' },
  'netflix-streaming': { icon: <SiNetflix size={26} />, chip: 'bg-red-100 text-red-700' },
  'tiktok-video': { icon: <SiTiktok size={26} />, chip: 'bg-slate-100 text-slate-900' },
  'amazon-shopping-cart': { icon: <span className="text-xs font-extrabold">amzn</span>, chip: 'bg-amber-100 text-amber-700' },
  'google-search': { icon: <SiGoogle size={26} />, chip: 'bg-blue-100 text-blue-700' },
  'uber-ride-matching': { icon: <SiUber size={26} />, chip: 'bg-slate-100 text-slate-900' },
};

export default function CaseStudiesPage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  const hubs = getHubs('case-studies');

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              Case <span className="text-accent">Studies</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-2xl mx-auto">
              How the world&apos;s most demanding products are engineered — fan-out feeds,
              real-time messaging, CDNs, ride matching, and search, broken down into the
              decisions that made them work at scale.
            </p>
          </div>

          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{hubs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Case studies</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalResources(hubs)}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">References</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Cards — big borderless cards with inverted hover */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {hubs.length === 0 ? (
            <div className="bg-surface-secondary p-14 text-center">
              <p className="text-sm text-fg-muted">
                Case studies are being curated. Check back soon for real-world system design
                breakdowns from Twitter, WhatsApp, Discord, Netflix, TikTok, Amazon, Google, and Uber.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-1 bg-surface-secondary sm:grid-cols-2 lg:grid-cols-3">
              {hubs.map((hub) => {
                const meta = CASE_META[hub.slug] ?? { icon: null, chip: 'bg-surface-secondary text-fg-muted' };
                return (
                  <Link
                    key={hub.slug}
                    href={`/knowledge/case-studies/${hub.slug}`}
                    className="group flex flex-col items-start gap-6 p-7 sm:p-8 bg-white transition-colors duration-200 hover:bg-accent"
                  >
                    <div className="flex w-full items-start justify-between gap-4">
                      <span className={cn(
                        'inline-flex h-16 w-16 shrink-0 items-center justify-center transition-colors duration-200',
                        meta.chip,
                        'group-hover:bg-white/20 group-hover:text-white',
                      )}>
                        {meta.icon}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-surface-secondary text-accent transition-colors duration-200 group-hover:bg-white/20 group-hover:text-white">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold uppercase leading-tight tracking-wide text-fg transition-colors duration-200 group-hover:text-white sm:text-2xl">
                        {hub.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-fg-secondary line-clamp-2 transition-colors duration-200 group-hover:text-white/80">
                        {hub.description}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-x-5 text-xs font-bold uppercase tracking-wider text-fg-muted transition-colors duration-200 group-hover:text-white/70">
                      <span>{hub.lessons?.length ?? 1} deep dive</span>
                      <span>{countHubResources(hub).toLocaleString()} references</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function totalResources(hubs: ResourceHub[]): number {
  return hubs.reduce((sum, h) => sum + countHubResources(h), 0);
}
