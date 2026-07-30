import type { Metadata } from 'next';
import { SiExpo } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Expo — Knowledge Base', description: 'Curated resources for learning Expo — universal React apps.' };
const config: LanguagePageConfig = { slug: 'expo', name: 'Expo', description: 'Expo is an open-source platform for building universal native apps with React. It provides a managed workflow and comprehensive SDK for iOS, Android, and web.', layout: 'bento', accentBg: 'bg-[#000020]', accentText: 'text-white', icon: <SiExpo size={28} /> };
export default function ExpoPage() { return <LanguagePageShell config={config} />; }
