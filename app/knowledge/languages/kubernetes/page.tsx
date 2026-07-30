import type { Metadata } from 'next';
import { SiKubernetes } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Kubernetes — Knowledge Base',
  description: 'Curated resources for learning Kubernetes — container orchestration at scale.',
};

const config: LanguagePageConfig = {
  slug: 'kubernetes',
  name: 'Kubernetes',
  description: 'Kubernetes (K8s) is the industry standard for container orchestration, automating deployment, scaling, and management of containerized applications across clusters.',
  layout: 'grid',
  accentBg: 'bg-[#326CE5]',
  accentText: 'text-white',
  icon: <SiKubernetes size={28} />,
};

export default function KubernetesPage() {
  return <LanguagePageShell config={config} />;
}
