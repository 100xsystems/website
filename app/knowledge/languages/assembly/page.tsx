import type { Metadata } from 'next';
import { SiAssemblyscript } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Assembly — Knowledge Base', description: 'Curated resources for learning assembly language.' };
const config: LanguagePageConfig = { slug: 'assembly', name: 'Assembly', description: 'Assembly language provides direct control over CPU instructions, memory, and registers — essential for understanding computer architecture, reverse engineering, and embedded systems.', layout: 'compact', accentBg: 'bg-[#6E4C13]', accentText: 'text-white', icon: <SiAssemblyscript size={28} /> };
export default function AssemblyPage() { return <LanguagePageShell config={config} />; }
