import type { Metadata } from 'next';
import { SiPrisma } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Prisma — Knowledge Base', description: 'Curated resources for learning Prisma — the next-gen ORM.' };
const config: LanguagePageConfig = { slug: 'prisma', name: 'Prisma', description: 'Prisma is a next-generation ORM for Node.js and TypeScript. It provides a type-safe database client, auto-generated queries, and a declarative data modeling language.', layout: 'bento', accentBg: 'bg-[#2D3748]', accentText: 'text-white', icon: <SiPrisma size={28} /> };
export default function PrismaPage() { return <LanguagePageShell config={config} />; }
