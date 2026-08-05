import type { Metadata } from 'next';
import { refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { CategoryHubIndex } from '@/components/category-hub-index';

export const metadata: Metadata = {
  title: 'Infrastructure — Knowledge Base',
  description:
    'Seven complete infrastructure courses — Linux, Docker, Kubernetes, Terraform, Ansible, Nginx and Nix — the stack that ships and runs your code. Free and open.',
};

export default function InfrastructureKnowledgePage() {
  // ISR: re-clone the registry knowledge tree if stale.
  refreshKnowledgeCacheIfStale();
  return (
    <CategoryHubIndex
      category="infrastructure"
      categoryLabel="Infrastructure"
      hubLabel="Infrastructure"
      description="Seven complete infrastructure courses — Linux, Docker, Kubernetes, Terraform, Ansible, Nginx and Nix — the stack that ships and runs your code."
    />
  );
}
