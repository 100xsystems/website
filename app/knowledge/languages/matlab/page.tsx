import type { Metadata } from 'next';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'MATLAB — Knowledge Base', description: 'Curated resources for learning MATLAB.' };
const config: LanguagePageConfig = { slug: 'matlab', name: 'MATLAB', description: 'MATLAB is the premier platform for numerical computing, data analysis, and algorithm development used in engineering and scientific research.', layout: 'bento', accentBg: 'bg-[#E16737]', accentText: 'text-white', icon: <span className="text-lg font-bold text-white">M</span> };
export default function MatlabPage() { return <LanguagePageShell config={config} />; }
