import type { Metadata } from 'next';
import { SiLabview } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'LabVIEW — Knowledge Base',
  description: 'Curated resources for learning LabVIEW — graphical programming for engineering.',
};

const config: LanguagePageConfig = {
  slug: 'labview',
  name: 'LabVIEW',
  description: 'LabVIEW (Laboratory Virtual Instrument Engineering Workbench) is a graphical programming platform from NI used extensively in test, measurement, and control applications across engineering and science.',
  layout: 'bento',
  accentBg: 'bg-[#DDE020]',
  accentText: 'text-black',
  icon: <SiLabview size={28} />,
};

export default function LabviewPage() {
  return <LanguagePageShell config={config} />;
}
