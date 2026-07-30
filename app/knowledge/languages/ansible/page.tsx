import type { Metadata } from 'next';
import { SiAnsible } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Ansible — Knowledge Base',
  description: 'Curated resources for learning Ansible — simple IT automation.',
};

const config: LanguagePageConfig = {
  slug: 'ansible',
  name: 'Ansible',
  description: 'Ansible is a radically simple IT automation engine that automates cloud provisioning, configuration management, application deployment, and task automation. It uses a simple YAML-based language.',
  layout: 'feed',
  accentBg: 'bg-[#EE0000]',
  accentText: 'text-white',
  icon: <SiAnsible size={28} />,
};

export default function AnsiblePage() {
  return <LanguagePageShell config={config} />;
}
