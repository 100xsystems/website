import type { Metadata } from 'next';
import { SiMongodb } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'MongoDB — Knowledge Base',
  description: 'Curated resources for learning MongoDB — the leading NoSQL database.',
};

const config: LanguagePageConfig = {
  slug: 'mongodb', name: 'MongoDB',
  description: 'MongoDB is the leading NoSQL database designed for modern application development. It uses a flexible document data model with powerful querying, indexing, and aggregation capabilities.',
  layout: 'feed', accentBg: 'bg-[#47A248]', accentText: 'text-white',
  icon: <SiMongodb size={28} />,
};

export default function MongodbPage() { return <LanguagePageShell config={config} />; }
