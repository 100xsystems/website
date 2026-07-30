import type { Metadata } from 'next';
import { SiSvelte } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Svelte — Knowledge Base', description: 'Curated resources for learning Svelte — the frontend compiler.' };
const config: LanguagePageConfig = { slug: 'svelte', name: 'Svelte', description: 'Svelte is a revolutionary frontend compiler that shifts work from browser to build step, producing optimized vanilla JavaScript.', layout: 'compact', accentBg: 'bg-[#FF3E00]', accentText: 'text-white', icon: <SiSvelte size={28} /> };
export default function SveltePage() { return <LanguagePageShell config={config} />; }
