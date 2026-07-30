import type { Metadata } from 'next';
import { SiPerl } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Perl — Knowledge Base', description: 'Curated resources for learning Perl.' };
const config: LanguagePageConfig = { slug: 'perl', name: 'Perl', description: 'Perl is a highly capable, feature-rich programming language known for text processing power, the CPAN ecosystem, and system administration.', layout: 'feed', accentBg: 'bg-[#39457E]', accentText: 'text-white', icon: <SiPerl size={28} /> };
export default function PerlPage() { return <LanguagePageShell config={config} />; }
