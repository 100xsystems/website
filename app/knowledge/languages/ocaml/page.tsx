import type { Metadata } from 'next';
import { SiOcaml } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'OCaml — Knowledge Base', description: 'Curated resources for learning OCaml.' };
const config: LanguagePageConfig = { slug: 'ocaml', name: 'OCaml', description: 'OCaml is a functional, imperative, and object-oriented language from the ML family — excelling at type-safe systems, formal verification, and high-assurance software.', layout: 'compact', accentBg: 'bg-[#EC6813]', accentText: 'text-white', icon: <SiOcaml size={28} /> };
export default function OcamlPage() { return <LanguagePageShell config={config} />; }
