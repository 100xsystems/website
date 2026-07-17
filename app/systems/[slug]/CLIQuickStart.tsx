'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/application/lib/utils';
import { Icon } from '@/presentation/__components/components.atomic';

// ─── Types ──────────────────────────────────────────────────────────

interface CliCommandProps {
  command: string;
  label: string;
  description: string;
}

interface CLIQuickStartProps {
  systemSlug: string;
  systemTitle: string;
}

// ─── Individual Command Block ───────────────────────────────────────

function CliCommandBlock({ command, label, description }: CliCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, [command]);

  return (
    <div className="group relative border border-border bg-white transition-all duration-200 hover:border-accent/20 hover:shadow-sm">
      {/* Label */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-fg-muted">
          {label}
        </span>
        <p className="text-xs text-fg-secondary mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Command */}
      <div className="flex items-stretch min-h-0">
        <div className="flex-1 px-5 py-3 bg-surface-secondary font-mono text-sm text-fg overflow-x-auto whitespace-nowrap">
          <span className="text-fg-muted select-none">$ </span>
          {command}
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            'shrink-0 px-4 flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-all duration-200',
            copied
              ? 'bg-accent text-white'
              : 'bg-surface-secondary text-fg-muted hover:bg-accent hover:text-white',
          )}
          aria-label={copied ? 'Copied' : 'Copy command'}
        >
          {copied ? (
            <Icon name="check" size={14} />
          ) : (
            <Icon name="copy" size={14} />
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Get Started Button ────────────────────────────────────────────

function BuildThisSystemButton({ systemSlug }: { systemSlug: string }) {
  const [copied, setCopied] = useState(false);

  const allCommands = `npm install -g @100xsystems/cli\n100xsystems init ${systemSlug}\ncd ${systemSlug}-implementation\n100xsystems validate`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(allCommands);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {}
  }, [allCommands]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200',
        copied
          ? 'bg-accent text-white'
          : 'bg-accent text-white hover:bg-accent/90 hover:shadow-md',
      )}
    >
      {copied ? (
        <>
          <Icon name="check" size={14} />
          Copied! Paste in terminal
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
          </svg>
          Build this System
        </>
      )}
    </button>
  );
}

// ─── CLI Quick Start Section ───────────────────────────────────────

export function CLIQuickStart({ systemSlug, systemTitle }: CLIQuickStartProps) {
  const commands: CliCommandProps[] = [
    {
      label: '1. Install the CLI',
      description: 'Install the 100xSystems CLI globally via npm.',
      command: 'npm install -g @100xsystems/cli',
    },
    {
      label: '2. Initialize a project',
      description: `Scaffold a new "${systemTitle}" project in your workspace.`,
      command: `100xsystems init ${systemSlug}`,
    },
    {
      label: '3. Validate your progress',
      description: 'Check your implementation against lesson requirements. Run this inside your project directory.',
      command: '100xsystems validate',
    },
    {
      label: '4. List available systems',
      description: 'Browse all available systems in the curriculum, or view details for a specific system.',
      command: '100xsystems list',
    },
    {
      label: '5. Check your environment',
      description: 'Verify that required development tools (Node.js, Docker, Git, etc.) are installed and configured.',
      command: '100xsystems doctor',
    },
    {
      label: '6. Submit for review',
      description: 'Create a pull request with your review package once all lessons pass.',
      command: '100xsystems submit',
    },
  ];

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-8 h-8 bg-accent/10 shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
            <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>
        <h2 className="text-lg font-extrabold tracking-tight text-fg">
          CLI Quick Start
        </h2>
      </div>
      <p className="text-sm text-fg-secondary ml-11 mb-6 leading-relaxed">
        Use the 100xSystems CLI to build, validate, and submit your work — all from your terminal.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-11">
        {commands.map((cmd) => (
          <CliCommandBlock
            key={cmd.label}
            command={cmd.command}
            label={cmd.label}
            description={cmd.description}
          />
        ))}
      </div>

      {/* Two-column bottom row: Get Started CTA + View all docs */}
      <div className="ml-11 mt-6 flex items-center justify-between gap-4">
        <a
          href="/cli-docs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:text-accent/80 transition-colors group"
        >
          <span>View all CLI commands</span>            <Icon name="arrow-right" size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </a>

        <BuildThisSystemButton systemSlug={systemSlug} />
      </div>
    </section>
  );
}
