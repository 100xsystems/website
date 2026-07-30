import type { Metadata } from 'next';
import { SiProcessingfoundation } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Processing — Knowledge Base',
  description: 'Curated resources for learning Processing — creative coding and generative art.',
};

const config: LanguagePageConfig = {
  slug: 'processing',
  name: 'Processing',
  description: 'Processing is a flexible software sketchbook and language for learning how to code within the context of the visual arts. It is the premier tool for creative coding, generative art, and data visualization.',
  layout: 'grid',
  accentBg: 'bg-[#0096D6]',
  accentText: 'text-white',
  icon: <SiProcessingfoundation size={28} />,
};

export default function ProcessingPage() {
  return <LanguagePageShell config={config} />;
}
