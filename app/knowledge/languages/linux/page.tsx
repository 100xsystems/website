import type { Metadata } from 'next';
import { SiLinux } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = { title: 'Linux — Knowledge Base', description: 'Curated resources for learning Linux — the universal OS.' };
const config: LanguagePageConfig = { slug: 'linux', name: 'Linux', description: 'Linux is the most widely used OS for servers, cloud, embedded systems, and desktops. It powers everything from Android to supercomputers.', layout: 'bento', accentBg: 'bg-[#FCC624]', accentText: 'text-black', icon: <SiLinux size={28} /> };
export default function LinuxPage() { return <LanguagePageShell config={config} />; }
