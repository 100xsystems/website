import type { Metadata } from 'next';
import { SiRedis } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Redis — Knowledge Base', description: 'Curated resources for learning Redis — the in-memory data store.' };
const config: LanguagePageConfig = { slug: 'redis', name: 'Redis', description: 'Redis is an open-source, in-memory data structure store used as database, cache, message broker, and streaming engine with sub-millisecond latency.', layout: 'bento', accentBg: 'bg-[#DC382D]', accentText: 'text-white', icon: <SiRedis size={28} /> };
export default function RedisPage() { return <LanguagePageShell config={config} />; }
