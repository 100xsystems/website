import type { Metadata } from 'next';
import { SiSwift } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Swift — Knowledge Base',
  description: 'Curated resources for learning Swift — Apple platform language.',
};

const config: LanguagePageConfig = {
  slug: 'swift',
  name: 'Swift',
  description:
    'Swift is the modern language for Apple platforms — iOS, macOS, watchOS, and tvOS. It is fast, safe, and expressive, powering everything from the iPhone apps you love to server-side systems. These are the definitive free resources — vetted, current, and complete.',
  layout: 'bento',
  accentBg: 'bg-[#F05138]',
  accentText: 'text-white',
  icon: <SiSwift size={28} />,
};

export default function SwiftPage() {
  return <LanguagePageShell config={config} />;
}
