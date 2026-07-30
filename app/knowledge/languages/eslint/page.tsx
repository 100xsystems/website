import type { Metadata } from 'next';
import { SiEslint } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'ESLint — Knowledge Base', description: 'Curated resources for learning ESLint — JavaScript linting.' };
const config: LanguagePageConfig = { slug: 'eslint', name: 'ESLint', description: 'ESLint is the most widely used JavaScript linting tool for identifying and fixing code quality issues. It provides a pluggable architecture with hundreds of rules.', layout: 'bento', accentBg: 'bg-[#4B32C3]', accentText: 'text-white', icon: <SiEslint size={28} /> };
export default function EslintPage() { return <LanguagePageShell config={config} />; }
