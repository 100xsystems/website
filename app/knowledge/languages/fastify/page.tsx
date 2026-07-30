import type { Metadata } from 'next';
import { SiFastify } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Fastify — Knowledge Base',
  description: 'Curated resources for learning Fastify — the high-performance Node.js web framework.',
};

const config: LanguagePageConfig = {
  slug: 'fastify', name: 'Fastify',
  description: 'Fastify is a high-performance, low-overhead Node.js web framework. It features schema-based validation, extreme speed, plugin architecture, and first-class TypeScript support for building efficient APIs.',
  layout: 'grid', accentBg: 'bg-[#202020]', accentText: 'text-white',
  icon: <SiFastify size={28} />,
};

export default function FastifyPage() { return <LanguagePageShell config={config} />; }
