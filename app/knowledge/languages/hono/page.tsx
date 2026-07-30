import type { Metadata } from 'next';
import { SiHono } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Hono — Knowledge Base',
  description: 'Curated resources for learning Hono — the lightweight web framework.',
};

const config: LanguagePageConfig = {
  slug: 'hono', name: 'Hono',
  description: 'Hono is a lightweight, ultrafast web framework for building APIs and web apps. It runs on multiple runtimes including Node.js, Deno, Bun, Cloudflare Workers, and Fastly Compute.',
  layout: 'bento', accentBg: 'bg-[#E36002]', accentText: 'text-white',
  icon: <SiHono size={28} />,
};

export default function HonoPage() { return <LanguagePageShell config={config} />; }
