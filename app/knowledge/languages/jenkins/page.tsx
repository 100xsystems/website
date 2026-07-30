import type { Metadata } from 'next';
import { SiJenkins } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Jenkins — Knowledge Base',
  description: 'Curated resources for learning Jenkins — the leading automation server.',
};

const config: LanguagePageConfig = {
  slug: 'jenkins', name: 'Jenkins',
  description: 'Jenkins is the leading open-source automation server for building, testing, and deploying software. It supports hundreds of plugins for CI/CD, making it one of the most flexible automation platforms available.',
  layout: 'bento', accentBg: 'bg-[#D24939]', accentText: 'text-white',
  icon: <SiJenkins size={28} />,
};

export default function JenkinsPage() { return <LanguagePageShell config={config} />; }
