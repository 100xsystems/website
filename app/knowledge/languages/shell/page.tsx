import type { Metadata } from 'next';
import { SiGnubash } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Shell — Knowledge Base',
  description: 'Curated resources for learning Bash and Shell scripting.',
};

const config: LanguagePageConfig = {
  slug: 'shell',
  name: 'Shell',
  description: 'Shell scripting (Bash) is the universal glue of software engineering. It automates deployments, manages infrastructure, processes data pipelines, and controls the entire development toolchain.',
  layout: 'feed',
  accentBg: 'bg-[#4EAA25]',
  accentText: 'text-white',
  icon: <SiGnubash size={28} />,
};

export default function ShellPage() {
  return <LanguagePageShell config={config} />;
}
