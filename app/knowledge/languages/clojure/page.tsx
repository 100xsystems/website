import type { Metadata } from 'next';
import { SiClojure } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Clojure — Knowledge Base', description: 'Curated resources for learning Clojure.' };
const config: LanguagePageConfig = { slug: 'clojure', name: 'Clojure', description: 'Clojure is a modern, functional Lisp dialect on the JVM emphasizing immutability, persistent data structures, and concurrency with powerful macro capabilities.', layout: 'bento', accentBg: 'bg-[#5881D8]', accentText: 'text-white', icon: <SiClojure size={28} /> };
export default function ClojurePage() { return <LanguagePageShell config={config} />; }
