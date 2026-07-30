import type { Metadata } from 'next';
import { SiScala } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Scala — Knowledge Base',
  description: 'Curated resources for learning Scala — functional + OOP on the JVM.',
};

const config: LanguagePageConfig = {
  slug: 'scala',
  name: 'Scala',
  description: 'Scala combines object-oriented and functional programming on the JVM. It powers high-performance data pipelines (Apache Spark), distributed systems (Akka), and type-safe web applications.',
  layout: 'bento',
  accentBg: 'bg-[#DC322F]',
  accentText: 'text-white',
  icon: <SiScala size={28} />,
};

export default function ScalaPage() {
  return <LanguagePageShell config={config} />;
}
