import type { Metadata } from 'next';
import { SiDocker } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Docker — Knowledge Base',
  description: 'Curated resources for learning Docker — the industry standard for containers.',
};

const config: LanguagePageConfig = {
  slug: 'docker',
  name: 'Docker',
  description: 'Docker is the industry standard for containerized application development. It enables developers to package applications with all dependencies into standardized units for seamless deployment across any environment.',
  layout: 'grid',
  accentBg: 'bg-[#2496ED]',
  accentText: 'text-white',
  icon: <SiDocker size={28} />,
};

export default function DockerPage() {
  return <LanguagePageShell config={config} />;
}
