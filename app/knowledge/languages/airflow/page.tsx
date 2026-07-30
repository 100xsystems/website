import type { Metadata } from 'next';
import { SiApacheairflow } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Apache Airflow — Knowledge Base',
  description: 'Curated resources for learning Apache Airflow — the workflow orchestration platform.',
};

const config: LanguagePageConfig = {
  slug: 'airflow', name: 'Apache Airflow',
  description: 'Apache Airflow is the leading platform for programmatically authoring, scheduling, and monitoring workflows. It lets you build data pipelines as directed acyclic graphs (DAGs) with Python.',
  layout: 'grid', accentBg: 'bg-[#017CEE]', accentText: 'text-white',
  icon: <SiApacheairflow size={28} />,
};

export default function AirflowPage() { return <LanguagePageShell config={config} />; }
