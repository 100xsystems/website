/**
 * HomeComparison — 100xSystems vs CodeCrafters vs Exercism
 *
 * A 3-column comparison table showing how 100xSystems stacks up
 * against CodeCrafters and Exercism across key dimensions.
 *
 * Placed between Philosophy and Cubix sections on the homepage.
 */

'use client';

import { motion } from 'motion/react';
import { cn } from '@/application/lib/utils';

interface ComparisonRow {
  label: string;
  values: [string, string, string];
}

const rows: ComparisonRow[] = [
  { label: 'Focus', values: ['Rebuild real tools', 'Language mastery', 'Build full systems'] },
  { label: 'Review', values: ['Auto-tests only', 'Human mentors', 'PR-based peer review'] },
  { label: 'Price', values: ['$40–60/month', 'Free (donations)', '100% Free Forever'] },
  { label: 'Language Support', values: ['5 languages', '80+ languages', 'Any language per system'] },
  { label: 'Certificate', values: ['None', 'None', 'Verified certificate'] },
];

const logos = ['CodeCrafters', 'Exercism', '100xSystems'];

const logoColors = [
  'text-fg',
  'text-fg',
  'text-accent',
];

export function HomeComparison() {
  return (
    <section className="py-24 lg:py-32 bg-surface-secondary">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-fg-muted font-medium mb-4">
            Comparison
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-fg tracking-tight uppercase leading-tight">
            How we compare
          </h2>
          <p className="text-base text-fg-secondary leading-relaxed max-w-lg mx-auto mt-4">
            Most platforms teach you syntax. We teach you engineering.
            Here is how we stack up against the alternatives.
          </p>
        </motion.div>

        {/* Comparison Table — Desktop */}
        <motion.div
          className="hidden md:block border-2 border-black bg-white overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Header Row */}
          <div className="grid grid-cols-4 border-b-2 border-black">
            <div className="px-6 py-5 bg-surface-secondary flex items-center">
              <span className="text-[11px] font-bold uppercase tracking-widest text-fg-muted">Feature</span>
            </div>
            {logos.map((name, i) => (
              <div
                key={name}
                className={cn(
                  'px-6 py-5 flex items-center justify-center border-l border-border',
                  i === 2 && 'bg-accent-bg',
                )}
              >
                <span className={cn(
                  'text-sm font-extrabold uppercase tracking-wide',
                  logoColors[i],
                )}>
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {rows.map((row, rowIdx) => (
            <div
              key={row.label}
              className={cn(
                'grid grid-cols-4',
                rowIdx < rows.length - 1 && 'border-b border-border',
              )}
            >
              {/* Label */}
              <div className="px-6 py-5 bg-surface-secondary flex items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-fg">
                  {row.label}
                </span>
              </div>

              {/* Values */}
              {row.values.map((val, colIdx) => {
                const isHighlighted = colIdx === 2;
                return (
                  <div
                    key={colIdx}
                    className={cn(
                      'px-6 py-5 flex items-center justify-center border-l border-border',
                      isHighlighted && 'bg-accent-bg',
                    )}
                  >
                    <span className={cn(
                      'text-sm leading-relaxed text-center',
                      isHighlighted ? 'font-bold text-accent' : 'text-fg-secondary',
                    )}>
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </motion.div>

        {/* Mobile: Stacked card layout */}
        <motion.div
          className="md:hidden space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {rows.map((row) => (
            <div key={row.label} className="border-2 border-black bg-white overflow-hidden">
              <div className="px-4 py-3 bg-surface-secondary border-b border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-fg">{row.label}</span>
              </div>
              <div className="divide-y divide-border">
                {row.values.map((val, colIdx) => (
                  <div key={colIdx} className={cn(
                    'px-4 py-3 flex items-center gap-3',
                    colIdx === 2 && 'bg-accent-bg',
                  )}>
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-wider w-20 shrink-0',
                      colIdx === 2 ? 'text-accent' : 'text-fg-muted',
                    )}>
                      {logos[colIdx]}
                    </span>
                    <span className={cn(
                      'text-sm',
                      colIdx === 2 ? 'font-bold text-accent' : 'text-fg-secondary',
                    )}>
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg font-bold text-fg mb-6 uppercase tracking-wide">
            The choice is clear.
          </p>
          <a
            href="/systems"
            className="inline-flex items-center gap-3 px-12 py-5 text-base font-bold uppercase tracking-wider bg-accent-yellow text-black hover:bg-yellow-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Start Learning Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
