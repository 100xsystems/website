import type { Metadata } from 'next';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Scheme — Knowledge Base', description: 'Curated resources for learning Scheme.' };
const config: LanguagePageConfig = { slug: 'scheme', name: 'Scheme', description: 'Scheme is a minimalist, elegant Lisp dialect renowned for lexical scoping, first-class procedures, and its use in teaching programming fundamentals via SICP.', layout: 'bento', accentBg: 'bg-[#1B1B1B]', accentText: 'text-white', icon: <span className="text-lg font-bold text-white">λ</span> };
export default function SchemePage() { return <LanguagePageShell config={config} />; }
