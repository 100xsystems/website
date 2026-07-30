import type { Metadata } from 'next';
import { SiVite } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Vite — Knowledge Base', description: 'Curated resources for learning Vite — the modern build tool.' };
const config: LanguagePageConfig = { slug: 'vite', name: 'Vite', description: 'Vite is a modern build tool that provides an extremely fast development server with native ES module imports and optimized production builds using Rollup.', layout: 'grid', accentBg: 'bg-[#646CFF]', accentText: 'text-white', icon: <SiVite size={28} /> };
export default function VitePage() { return <LanguagePageShell config={config} />; }
