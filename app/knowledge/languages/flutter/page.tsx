import type { Metadata } from 'next';
import { SiFlutter } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Flutter — Knowledge Base', description: 'Curated resources for learning Flutter — Google UI toolkit.' };
const config: LanguagePageConfig = { slug: 'flutter', name: 'Flutter', description: 'Flutter is Google UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase.', layout: 'grid', accentBg: 'bg-[#02569B]', accentText: 'text-white', icon: <SiFlutter size={28} /> };
export default function FlutterPage() { return <LanguagePageShell config={config} />; }
