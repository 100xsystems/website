import type { Metadata } from 'next';
import { HomeHero } from '@/presentation/features/homeHero.feature';
import { HomePhilosophy } from '@/presentation/features/homePhilosophy.feature';
import { HomeWhatIsSystem } from '@/presentation/features/homeWhatIsSystem.feature';
import { HomeVideoParallax } from '@/presentation/features/homeVideoParallax.feature';
import { HomeBuildSystems } from '@/presentation/features/homeBuildSystems.feature';
import { HomeLearningPhilosophy } from '@/presentation/features/homeLearningPhilosophy.feature';
import { HomeComparison } from '@/presentation/features/homeComparison.feature';
import { HomeCubix } from '@/presentation/features/homeCubix.feature';
import { HomeOpenSource } from '@/presentation/features/homeOpenSource.feature';
import { HomeMission } from '@/presentation/features/homeMission.feature';

export const metadata: Metadata = {
  title: 'About — 100xSystems',
  description: 'Our philosophy, principles, and approach to software engineering education.',
};

export default function AboutPage() {
  return (
    <>
      <HomeHero />
      <HomePhilosophy />
      <HomeWhatIsSystem />
      <HomeVideoParallax />
      <HomeBuildSystems />
      <HomeLearningPhilosophy />
      <HomeComparison />
      <HomeCubix />
      <HomeOpenSource />
      <HomeMission />
    </>
  );
}
