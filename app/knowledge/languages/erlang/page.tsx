import type { Metadata } from 'next';
import { SiErlang } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Erlang — Knowledge Base', description: 'Curated resources for learning Erlang.' };
const config: LanguagePageConfig = { slug: 'erlang', name: 'Erlang', description: 'Erlang is a functional, concurrent language for building massively scalable, fault-tolerant systems with soft real-time properties.', layout: 'compact', accentBg: 'bg-[#A90533]', accentText: 'text-white', icon: <SiErlang size={28} /> };
export default function ErlangPage() { return <LanguagePageShell config={config} />; }
