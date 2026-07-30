import type { Metadata } from 'next';
import { SiSharp } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'C# — Knowledge Base',
  description: 'Curated resources for learning C# — Microsoft flagship language.',
};

const config: LanguagePageConfig = {
  slug: 'csharp',
  name: 'C#',
  description:
    'C# is Microsofts flagship language for the .NET ecosystem. It powers Windows applications, game development (Unity), cloud services on Azure, and cross-platform apps. These are the definitive free resources — vetted, current, and complete.',
  layout: 'feed',
  accentBg: 'bg-[#239120]',
  accentText: 'text-white',
  icon: <SiSharp size={28} />,
};

export default function CsharpPage() {
  return <LanguagePageShell config={config} />;
}
