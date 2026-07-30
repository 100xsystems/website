import type { Metadata } from 'next';
import { SiNodedotjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Node.js — Knowledge Base', description: 'Curated resources for learning Node.js — JavaScript runtime.' };
const config: LanguagePageConfig = { slug: 'nodejs', name: 'Node.js', description: 'Node.js is a JavaScript runtime built on Chrome V8 engine that enables server-side JavaScript with event-driven, non-blocking I/O.', layout: 'feed', accentBg: 'bg-[#339933]', accentText: 'text-white', icon: <SiNodedotjs size={28} /> };
export default function NodejsPage() { return <LanguagePageShell config={config} />; }
