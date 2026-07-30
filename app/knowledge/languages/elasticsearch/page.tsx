import type { Metadata } from 'next';
import { SiElasticsearch } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Elasticsearch — Knowledge Base',
  description: 'Curated resources for learning Elasticsearch — the distributed search engine.',
};

const config: LanguagePageConfig = {
  slug: 'elasticsearch', name: 'Elasticsearch',
  description: 'Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It is the heart of the Elastic Stack, powering search, logging, and observability at scale.',
  layout: 'grid', accentBg: 'bg-[#005571]', accentText: 'text-white',
  icon: <SiElasticsearch size={28} />,
};

export default function ElasticsearchPage() { return <LanguagePageShell config={config} />; }
