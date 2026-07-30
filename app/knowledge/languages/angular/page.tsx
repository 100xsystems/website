import type { Metadata } from 'next';
import { SiAngular } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Angular — Knowledge Base', description: 'Curated resources for learning Angular — the web development framework by Google.' };
const config: LanguagePageConfig = { slug: 'angular', name: 'Angular', description: 'Angular is a platform for building mobile and desktop web applications, developed by Google with routing, forms, HTTP client, and testing built in.', layout: 'grid', accentBg: 'bg-[#DD0031]', accentText: 'text-white', icon: <SiAngular size={28} /> };
export default function AngularPage() { return <LanguagePageShell config={config} />; }
