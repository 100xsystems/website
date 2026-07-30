import type { Metadata } from 'next';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Prolog — Knowledge Base', description: 'Curated resources for learning Prolog.' };
const config: LanguagePageConfig = { slug: 'prolog', name: 'Prolog', description: 'Prolog is a logic programming language for AI, computational linguistics, and symbolic reasoning — using declarative programming where you describe constraints and let the engine find solutions.', layout: 'feed', accentBg: 'bg-[#E61C24]', accentText: 'text-white', icon: <span className="text-lg font-bold text-white">?</span> };
export default function PrologPage() { return <LanguagePageShell config={config} />; }
