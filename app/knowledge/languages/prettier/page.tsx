import type { Metadata } from 'next';
import { SiPrettier } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Prettier — Knowledge Base', description: 'Curated resources for learning Prettier — code formatter.' };
const config: LanguagePageConfig = { slug: 'prettier', name: 'Prettier', description: 'Prettier is an opinionated code formatter that supports many languages. It enforces consistent style by parsing code and reprinting it with its own rules.', layout: 'feed', accentBg: 'bg-[#F7B93E]', accentText: 'text-black', icon: <SiPrettier size={28} /> };
export default function PrettierPage() { return <LanguagePageShell config={config} />; }
