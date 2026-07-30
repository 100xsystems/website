import type { Metadata } from 'next';
import { SiGrafana } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Grafana — Knowledge Base',
  description: 'Curated resources for learning Grafana — the open observability platform.',
};

const config: LanguagePageConfig = {
  slug: 'grafana', name: 'Grafana',
  description: 'Grafana is the leading open-source observability platform for visualizing metrics, logs, traces, and more. It integrates with Prometheus, Loki, Tempo, and hundreds of data sources to create powerful interactive dashboards and alerts.',
  layout: 'grid', accentBg: 'bg-[#F46800]', accentText: 'text-white',
  icon: <SiGrafana size={28} />,
};

export default function GrafanaPage() { return <LanguagePageShell config={config} />; }
