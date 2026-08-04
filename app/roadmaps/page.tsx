import type { Metadata } from 'next';
import { getRoadmaps, refreshRoadmapCacheIfStale } from '@/lib/roadmaps';
import { getHubs } from '@/lib/knowledge-resources';
import { RoadmapsExplorer } from './RoadmapsExplorer';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Career Roadmaps — 100xSystems',
  description:
    'Role-based engineering roadmaps — frontend, backend, DevOps, cloud, full-stack, ML, platform, SRE, and data engineering. Pick a role and follow the sequenced path, one step at a time.',
  openGraph: {
    title: 'Career Roadmaps — 100xSystems',
    description: 'Pick a role and follow a sequenced engineering curriculum.',
  },
};

interface Props {
  searchParams: Promise<{ roadmap?: string }>;
}

export default async function RoadmapsPage({ searchParams }: Props) {
  // ISR: re-clone the registry roadmaps tree if stale so revalidation serves fresh paths.
  refreshRoadmapCacheIfStale();

  const { roadmap } = await searchParams;
  const roadmaps = getRoadmaps();

  // No default roadmap — the steps stay hidden until a roadmap is picked.
  // The query param is only honored when it matches a real roadmap.
  const initialSlug =
    typeof roadmap === 'string' && roadmaps.some((r) => r.slug === roadmap) ? roadmap : null;

  // Build a lookup of course display names for every category a roadmap references.
  const courseNames: Record<string, string> = {};
  const referenced = new Set<string>();
  for (const rm of roadmaps) {
    for (const step of rm.steps) referenced.add(step.category);
  }
  for (const category of referenced) {
    for (const hub of getHubs(category)) {
      courseNames[`${category}/${hub.slug}`] = hub.name;
    }
  }

  return (
    <RoadmapsExplorer
      roadmaps={roadmaps}
      courseNames={courseNames}
      initialSlug={initialSlug}
    />
  );
}
