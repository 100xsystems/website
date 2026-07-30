import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, type ResourceHub } from '@/lib/knowledge-resources';

export const metadata: Metadata = {
  title: 'Case Studies — Knowledge Base',
  description: 'Real-world system design case studies from industry leaders.',
};

export default function CaseStudiesPage() {
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
              <span className="text-accent">Case Studies</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Real-world system design case studies from industry leaders.
              Learn how companies like Netflix, Uber, Stripe, and Spotify
              architect their systems at scale.
            </p>
          </div>

          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{hubs.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Case Studies</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalResources(hubs)}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Curated Resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      {hubs.length === 0 ? (
        <section className="py-20 text-center">
          <p className="text-sm text-fg-muted">
            Case studies are being curated. Check back soon for real-world system design
            breakdowns from Netflix, Uber, Stripe, Discord, and more.
          </p>
        </section>
      ) : (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-secondary">
              {hubs.map((hub) => {
                const total = countHubResources(hub);
                return (
                  <Link
                    key={hub.slug}
                    href={`/knowledge/case-studies/${hub.slug}`}
                    className="group bg-white p-8 transition-all duration-300 hover:bg-accent"
                  >
                    <div className="mb-4">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors">
                        {hub.name}
                      </h3>
                      <span className="inline-block w-8 h-[2px] bg-accent mt-2 transition-colors" />
                    </div>
                    <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-3 mb-4">
                      {hub.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 text-[9px] font-semibold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors">
                        {total} resources
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                        Explore &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function totalResources(hubs: ResourceHub[]): number {
  return hubs.reduce((sum, h) => sum + countHubResources(h), 0);
}
