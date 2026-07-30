import type { Metadata } from 'next';
import { SiRabbitmq } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'RabbitMQ — Knowledge Base',
  description: 'Curated resources for learning RabbitMQ — the most popular message broker.',
};

const config: LanguagePageConfig = {
  slug: 'rabbitmq', name: 'RabbitMQ',
  description: 'RabbitMQ is the most widely deployed open-source message broker. It supports multiple messaging protocols and patterns including AMQP, MQTT, and STOMP for building reliable distributed systems.',
  layout: 'compact', accentBg: 'bg-[#FF6600]', accentText: 'text-white',
  icon: <SiRabbitmq size={28} />,
};

export default function RabbitmqPage() { return <LanguagePageShell config={config} />; }
