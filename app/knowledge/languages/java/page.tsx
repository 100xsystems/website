import type { Metadata } from 'next';
import { SiOpenjdk } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Java — Knowledge Base',
  description: 'Curated resources for learning Java — enterprise software foundation.',
};

const config: LanguagePageConfig = {
  slug: 'java',
  name: 'Java',
  description:
    'Java is the bedrock of enterprise software. It powers Android apps, backend systems, big data pipelines (Apache Hadoop, Spark), and financial infrastructure worldwide. These are the definitive free resources — vetted, current, and complete.',
  layout: 'bento',
  accentBg: 'bg-[#ED8B00]',
  accentText: 'text-white',
  icon: <SiOpenjdk size={28} />,
};

export default function JavaPage() {
  return <LanguagePageShell config={config} />;
}
