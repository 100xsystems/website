import type { Metadata } from 'next';
import { SiMarkdown } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Markdown — Knowledge Base',
  description: 'Curated resources for learning Markdown — the universal markup language.',
};

const config: LanguagePageConfig = {
  slug: 'markdown',
  name: 'Markdown',
  description: 'Markdown is the most widely used lightweight markup language in software development. It powers documentation, READMEs, wikis, forums, note-taking, and static site generation across the entire tech industry.',
  layout: 'feed',
  accentBg: 'bg-[#000000]',
  accentText: 'text-white',
  icon: <SiMarkdown size={28} />,
};

export default function MarkdownPage() {
  return <LanguagePageShell config={config} />;
}
