import type { Metadata } from 'next';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'COBOL — Knowledge Base', description: 'Curated resources for learning COBOL.' };
const config: LanguagePageConfig = { slug: 'cobol', name: 'COBOL', description: 'COBOL powers the worlds business infrastructure — banking, insurance, government systems, and enterprise transaction processing. Billions of lines run in production today.', layout: 'feed', accentBg: 'bg-[#005C99]', accentText: 'text-white', icon: <span className="text-lg font-bold text-white">C</span> };
export default function CobolPage() { return <LanguagePageShell config={config} />; }
