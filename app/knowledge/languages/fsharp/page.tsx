import type { Metadata } from 'next';
import { SiFsharp } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'F# — Knowledge Base', description: 'Curated resources for learning F#.' };
const config: LanguagePageConfig = { slug: 'fsharp', name: 'F#', description: 'F# is a functional-first, cross-platform .NET language excelling at data science, financial modeling, and concurrent systems with type providers and computation expressions.', layout: 'bento', accentBg: 'bg-[#378BBA]', accentText: 'text-white', icon: <SiFsharp size={28} /> };
export default function FsharpPage() { return <LanguagePageShell config={config} />; }
