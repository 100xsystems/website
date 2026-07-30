import type { Metadata } from 'next';
import { SiPrometheus } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Prometheus — Knowledge Base',
  description: 'Curated resources for learning Prometheus — the CNCF monitoring system.',
};

const config: LanguagePageConfig = {
  slug: 'prometheus', name: 'Prometheus',
  description: 'Prometheus is the CNCF-graduated monitoring system and time-series database. It provides a powerful dimensional data model, PromQL query language, and pull-based metrics collection for cloud-native environments.',
  layout: 'bento', accentBg: 'bg-[#E6522C]', accentText: 'text-white',
  icon: <SiPrometheus size={28} />,
};

export default function PrometheusPage() { return <LanguagePageShell config={config} />; }
