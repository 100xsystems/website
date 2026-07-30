import type { Metadata } from 'next';
import { SiWebpack } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Webpack — Knowledge Base', description: 'Curated resources for learning Webpack — the module bundler.' };
const config: LanguagePageConfig = { slug: 'webpack', name: 'Webpack', description: 'Webpack is a powerful and configurable module bundler for JavaScript applications. It processes modules with dependencies and generates static assets for the browser.', layout: 'compact', accentBg: 'bg-[#8DD6F9]', accentText: 'text-black', icon: <SiWebpack size={28} /> };
export default function WebpackPage() { return <LanguagePageShell config={config} />; }
