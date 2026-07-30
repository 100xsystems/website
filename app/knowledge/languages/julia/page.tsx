import type { Metadata } from 'next';
import { SiJulia } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Julia — Knowledge Base', description: 'Curated resources for learning Julia.' };
const config: LanguagePageConfig = { slug: 'julia', name: 'Julia', description: 'Julia is a high-performance, dynamically typed language designed for scientific computing, numerical analysis, and machine learning.', layout: 'grid', accentBg: 'bg-[#4063D8]', accentText: 'text-white', icon: <SiJulia size={28} /> };
export default function JuliaPage() { return <LanguagePageShell config={config} />; }
