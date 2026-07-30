import type { Metadata } from 'next';
import { SiRemix } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Remix — Knowledge Base',
  description: 'Curated resources for learning Remix — the full-stack React framework.',
};

const config: LanguagePageConfig = {
  slug: 'remix', name: 'Remix',
  description: 'Remix is a full-stack React framework built on Web Fetch API. It enables server-rendered, progressively enhanced web applications with a focus on web fundamentals, data loading, and form handling.',
  layout: 'compact', accentBg: 'bg-[#121212]', accentText: 'text-white',
  icon: <SiRemix size={28} />,
};

export default function RemixPage() { return <LanguagePageShell config={config} />; }
