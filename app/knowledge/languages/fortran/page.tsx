import type { Metadata } from 'next';
import { SiFortran } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Fortran — Knowledge Base', description: 'Curated resources for learning Fortran.' };
const config: LanguagePageConfig = { slug: 'fortran', name: 'Fortran', description: 'Fortran is the original high-performance computing language, still dominant in scientific computing, weather simulation, computational physics, and HPC.', layout: 'compact', accentBg: 'bg-[#734F96]', accentText: 'text-white', icon: <SiFortran size={28} /> };
export default function FortranPage() { return <LanguagePageShell config={config} />; }
