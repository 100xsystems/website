import type { Metadata } from 'next';
import { SiElixir } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Elixir — Knowledge Base',
  description: 'Curated resources for learning Elixir — fault-tolerant, concurrent systems.',
};

const config: LanguagePageConfig = {
  slug: 'elixir',
  name: 'Elixir',
  description: 'Elixir is a functional, concurrent language built on the Erlang VM (BEAM). It excels at building fault-tolerant, distributed systems with the Phoenix web framework and LiveView for real-time apps.',
  layout: 'compact',
  accentBg: 'bg-[#4B275F]',
  accentText: 'text-white',
  icon: <SiElixir size={28} />,
};

export default function ElixirPage() {
  return <LanguagePageShell config={config} />;
}
