import type { Metadata } from 'next';
import { SiThreedotjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Three.js — Knowledge Base', description: 'Curated resources for learning Three.js — 3D graphics for the web.' };
const config: LanguagePageConfig = { slug: 'threejs', name: 'Three.js', description: 'Three.js is the most popular 3D JavaScript library for creating interactive 3D graphics in the browser using WebGL and WebGPU.', layout: 'compact', accentBg: 'bg-[#000000]', accentText: 'text-white', icon: <SiThreedotjs size={28} /> };
export default function ThreejsPage() { return <LanguagePageShell config={config} />; }
