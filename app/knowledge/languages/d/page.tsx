import type { Metadata } from 'next';
import { SiD } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'D — Knowledge Base', description: 'Curated resources for learning D.' };
const config: LanguagePageConfig = { slug: 'd', name: 'D', description: 'D is a systems programming language combining C-level performance with modern convenience — garbage collection, CTFE, and a powerful template system.', layout: 'compact', accentBg: 'bg-[#BA595E]', accentText: 'text-white', icon: <SiD size={28} /> };
export default function DPage() { return <LanguagePageShell config={config} />; }
