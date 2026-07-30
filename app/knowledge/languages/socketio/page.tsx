import type { Metadata } from 'next';
import { SiSocketdotio } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';
export const metadata: Metadata = { title: 'Socket.IO — Knowledge Base', description: 'Curated resources for learning Socket.IO — real-time communication.' };
const config: LanguagePageConfig = { slug: 'socketio', name: 'Socket.IO', description: 'Socket.IO is a real-time bidirectional event-based communication library. It enables real-time, bidirectional communication between web clients and servers using WebSocket with fallback options.', layout: 'feed', accentBg: 'bg-[#010101]', accentText: 'text-white', icon: <SiSocketdotio size={28} /> };
export default function SocketioPage() { return <LanguagePageShell config={config} />; }
