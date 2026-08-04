import Link from 'next/link';
import { Layers, Star, Rss, Compass } from 'lucide-react';
import { SiYcombinator, SiProducthunt } from 'react-icons/si';
import type { ReactNode } from 'react';

/**
 * Homepage section index — one row of big color-block cards, each jumping
 * straight to a homepage section (or route). White text + real icon per card,
 * borderless and shadow-free with a subtle brightness lift on hover.
 */

interface SectionDef {
  id: string;
  label: string;
  description: string;
  href: string;
  color: string;
  icon: ReactNode;
}

const SECTIONS: SectionDef[] = [
  {
    id: 'concepts',
    label: 'Knowledge',
    description: 'Principles · patterns · tools · technologies',
    href: '#concepts',
    color: '#572EFF',
    icon: <Layers size={26} />,
  },
  {
    id: 'concepts',
    label: 'Knowledge',
    description: 'Principles · patterns · tools · technologies',
    href: '#concepts',
    color: '#572EFF',
    icon: <Layers size={26} />,
  },
  {
    id: 'awesome',
    label: 'Awesome',
    description: 'Curated GitHub resource lists',
    href: '#awesome',
    color: '#F59E0B',
    icon: <Star size={26} />,
  },
  {
    id: 'updates',
    label: 'Feeds',
    description: 'Latest engineering blog articles',
    href: '#updates',
    color: '#0D9488',
    icon: <Rss size={26} />,
  },
  {
    id: 'discover',
    label: 'Discover',
    description: 'Every data source, one gateway',
    href: '#discover',
    color: '#0284C7',
    icon: <Compass size={26} />,
  },
  {
    id: 'yc',
    label: 'YC Companies',
    description: 'Y Combinator startups & changes',
    href: '#yc',
    color: '#F97316',
    icon: <SiYcombinator size={26} />,
  },
  {
    id: 'products',
    label: 'Products',
    description: 'Product Hunt launches & trends',
    href: '#products',
    color: '#EF4444',
    icon: <SiProducthunt size={26} />,
  },
];

export function HomeSectionNav() {
  return (
    <section className="py-10 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-bold uppercase tracking-widest bg-accent text-white mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Explore
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight uppercase leading-tight">
            Everything in&nbsp;<span className="text-accent">one place</span>
          </h2>
          <p className="mt-4 text-lg text-fg-secondary max-w-2xl">
            Jump straight to any section — courses, knowledge, awesome lists, feeds, and live data.
          </p>
        </div>

        {/* Color-block cards — borderless, no shadows */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              className="group flex flex-col items-start gap-6 p-6 sm:p-8 transition-all duration-200 hover:brightness-110 min-h-[180px] sm:min-h-[220px]"
              style={{ backgroundColor: s.color }}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center bg-white/15 text-white">
                {s.icon}
              </span>
              <div className="mt-auto">
                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white leading-tight">
                  {s.label}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                  {s.description}
                </p>
              </div>
            </Link>
          ))}

          {/* Filler card → the search route */}
          <Link
            href="/search"
            className="group flex flex-col items-start gap-6 p-6 sm:p-8 transition-all duration-200 hover:brightness-110 min-h-[180px] sm:min-h-[220px]"
            style={{ backgroundColor: '#0F172A' }}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center bg-white/15 text-white">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <div className="mt-auto">
              <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white leading-tight">
                Search
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed line-clamp-2">
                Search everything, everywhere, at once.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
