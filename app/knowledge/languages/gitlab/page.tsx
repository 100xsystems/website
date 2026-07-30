import type { Metadata } from 'next';
import { SiGitlab } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'GitLab — Knowledge Base',
  description: 'Curated resources for learning GitLab — the complete DevOps platform.',
};

const config: LanguagePageConfig = {
  slug: 'gitlab', name: 'GitLab',
  description: 'GitLab is a complete DevOps platform delivered as a single application. It provides Git repository management, CI/CD, security scanning, and monitoring throughout the entire development lifecycle.',
  layout: 'feed', accentBg: 'bg-[#FC6D26]', accentText: 'text-white',
  icon: <SiGitlab size={28} />,
};

export default function GitlabPage() { return <LanguagePageShell config={config} />; }
