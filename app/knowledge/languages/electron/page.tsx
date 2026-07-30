import type { Metadata } from 'next';
import { SiElectron } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Electron — Knowledge Base', description: 'Curated resources for learning Electron — desktop apps with web tech.' };
const config: LanguagePageConfig = { slug: 'electron', name: 'Electron', description: 'Electron is a framework for building cross-platform desktop applications using JavaScript, HTML, and CSS. It combines Chromium and Node.js for native desktop apps.', layout: 'grid', accentBg: 'bg-[#47848F]', accentText: 'text-white', icon: <SiElectron size={28} /> };
export default function ElectronPage() { return <LanguagePageShell config={config} />; }
