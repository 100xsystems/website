import type { Metadata } from 'next';
import { SiApachegroovy } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Groovy — Knowledge Base', description: 'Curated resources for learning Apache Groovy.' };
const config: LanguagePageConfig = { slug: 'groovy', name: 'Groovy', description: 'Apache Groovy is a powerful, optionally typed, dynamic language for the JVM powering Gradle builds, Jenkins pipelines, and DSLs.', layout: 'feed', accentBg: 'bg-[#4298B8]', accentText: 'text-white', icon: <SiApachegroovy size={28} /> };
export default function GroovyPage() { return <LanguagePageShell config={config} />; }
