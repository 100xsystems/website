import type { Metadata } from 'next';
import { SiApachekafka } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Apache Kafka — Knowledge Base',
  description: 'Curated resources for learning Apache Kafka — the event streaming platform.',
};

const config: LanguagePageConfig = {
  slug: 'kafka', name: 'Apache Kafka',
  description: 'Apache Kafka is the leading distributed event streaming platform for building real-time data pipelines and streaming applications. It provides high-throughput, fault-tolerant message processing at scale.',
  layout: 'feed', accentBg: 'bg-[#231F20]', accentText: 'text-white',
  icon: <SiApachekafka size={28} />,
};

export default function KafkaPage() { return <LanguagePageShell config={config} />; }
