import type { Metadata } from 'next';
import { SiChartdotjs } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Chart.js — Knowledge Base', description: 'Curated resources for learning Chart.js — data visualization.' };
const config: LanguagePageConfig = { slug: 'chartjs', name: 'Chart.js', description: 'Chart.js is the most popular open-source JavaScript charting library. It provides beautiful, responsive, and interactive charts with a simple API for building data visualizations for the web.', layout: 'grid', accentBg: 'bg-[#FF6384]', accentText: 'text-white', icon: <SiChartdotjs size={28} /> };
export default function ChartjsPage() { return <LanguagePageShell config={config} />; }
