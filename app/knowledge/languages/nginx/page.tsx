import type { Metadata } from 'next';
import { SiNginx } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Nginx — Knowledge Base',
  description: 'Curated resources for learning Nginx — the high-performance web server.',
};

const config: LanguagePageConfig = {
  slug: 'nginx', name: 'Nginx',
  description: 'Nginx is a high-performance web server, reverse proxy, and load balancer. It is designed for maximum performance and stability, handling millions of concurrent connections with minimal resource usage.',
  layout: 'bento', accentBg: 'bg-[#009639]', accentText: 'text-white',
  icon: <SiNginx size={28} />,
};

export default function NginxPage() { return <LanguagePageShell config={config} />; }
