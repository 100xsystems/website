import type { Metadata } from 'next';
import { SiZig } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Zig — Knowledge Base', description: 'Curated resources for learning Zig.' };
const config: LanguagePageConfig = { slug: 'zig', name: 'Zig', description: 'Zig is a modern systems programming language focused on robustness, optimality, and maintainability with manual memory management and seamless C interop.', layout: 'compact', accentBg: 'bg-[#F7A41D]', accentText: 'text-black', icon: <SiZig size={28} /> };
export default function ZigPage() { return <LanguagePageShell config={config} />; }
