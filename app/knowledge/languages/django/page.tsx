import type { Metadata } from 'next';
import { SiDjango } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Django — Knowledge Base',
  description: 'Curated resources for learning Django — the Python web framework.',
};

const config: LanguagePageConfig = {
  slug: 'django', name: 'Django',
  description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It includes everything needed to build web applications: ORM, admin, auth, and more.',
  layout: 'bento', accentBg: 'bg-[#092E20]', accentText: 'text-white',
  icon: <SiDjango size={28} />,
};

export default function DjangoPage() { return <LanguagePageShell config={config} />; }
