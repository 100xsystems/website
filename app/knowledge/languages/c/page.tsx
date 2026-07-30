import type { Metadata } from 'next';
import { SiC } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'C — Knowledge Base', description: 'Curated resources for learning C programming.' };
const config: LanguagePageConfig = { slug: 'c', name: 'C', description: 'C is the foundational systems programming language that powers operating systems, embedded devices, databases, and virtually every major software infrastructure.', layout: 'compact', accentBg: 'bg-[#A8B9CC]', accentText: 'text-black', icon: <SiC size={28} /> };
export default function CPage() { return <LanguagePageShell config={config} />; }
