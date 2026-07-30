import type { Metadata } from 'next';
import { SiVuedotjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Vue.js — Knowledge Base', description: 'Curated resources for learning Vue.js — the progressive JavaScript framework.' };
const config: LanguagePageConfig = { slug: 'vue', name: 'Vue.js', description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UIs on the web.', layout: 'compact', accentBg: 'bg-[#4FC08D]', accentText: 'text-white', icon: <SiVuedotjs size={28} /> };
export default function VuePage() { return <LanguagePageShell config={config} />; }
