import type { Metadata } from 'next';
import { SiLatex } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'LaTeX — Knowledge Base',
  description: 'Curated resources for learning LaTeX — the gold standard for technical documents.',
};

const config: LanguagePageConfig = {
  slug: 'latex',
  name: 'LaTeX',
  description: 'LaTeX is the gold standard for technical and scientific document preparation. It is essential for academic papers, theses, and any document requiring precise mathematical typesetting, cross-references, and bibliographies.',
  layout: 'compact',
  accentBg: 'bg-[#008080]',
  accentText: 'text-white',
  icon: <SiLatex size={28} />,
};

export default function LatexPage() {
  return <LanguagePageShell config={config} />;
}
