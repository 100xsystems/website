import type { Metadata } from 'next';
import { SiGithubactions } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'GitHub Actions — Knowledge Base',
  description: 'Curated resources for learning GitHub Actions — CI/CD built into GitHub.',
};

const config: LanguagePageConfig = {
  slug: 'github-actions', name: 'GitHub Actions',
  description: 'GitHub Actions is the CI/CD and automation platform built into GitHub. It enables you to build, test, and deploy your code directly from GitHub with workflows defined as YAML files.',
  layout: 'grid', accentBg: 'bg-[#2088FF]', accentText: 'text-white',
  icon: <SiGithubactions size={28} />,
};

export default function GithubActionsPage() { return <LanguagePageShell config={config} />; }
