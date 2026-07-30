import type { Metadata } from 'next';
import { SiRacket } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Racket — Knowledge Base', description: 'Curated resources for learning Racket.' };
const config: LanguagePageConfig = { slug: 'racket', name: 'Racket', description: 'Racket is a modern functional Lisp/Scheme-dialect language excelling at language-oriented programming, DSL creation, and teaching CS fundamentals.', layout: 'bento', accentBg: 'bg-[#9F1D20]', accentText: 'text-white', icon: <SiRacket size={28} /> };
export default function RacketPage() { return <LanguagePageShell config={config} />; }
