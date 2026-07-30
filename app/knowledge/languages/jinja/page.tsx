import type { Metadata } from 'next';
import { SiJinja } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Jinja — Knowledge Base',
  description: 'Curated resources for learning Jinja — the Python templating language.',
};

const config: LanguagePageConfig = {
  slug: 'jinja',
  name: 'Jinja',
  description: 'Jinja is a modern, designer-friendly templating language for Python, inspired by Django templates. It is the standard for Flask web development, Ansible automation, and configuration generation.',
  layout: 'compact',
  accentBg: 'bg-[#B41717]',
  accentText: 'text-white',
  icon: <SiJinja size={28} />,
};

export default function JinjaPage() {
  return <LanguagePageShell config={config} />;
}
