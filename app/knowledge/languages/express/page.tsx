import type { Metadata } from 'next';
import { SiExpress } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Express.js — Knowledge Base', description: 'Curated resources for learning Express.js — the Node.js web framework.' };
const config: LanguagePageConfig = { slug: 'express', name: 'Express.js', description: 'Express is the most popular web framework for Node.js, providing a robust set of features for web and mobile applications.', layout: 'compact', accentBg: 'bg-[#000000]', accentText: 'text-white', icon: <SiExpress size={28} /> };
export default function ExpressPage() { return <LanguagePageShell config={config} />; }
