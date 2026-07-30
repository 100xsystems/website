import type { Metadata } from 'next';
import { SiSelenium } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Selenium — Knowledge Base',
  description: 'Curated resources for learning Selenium — the browser automation framework.',
};

const config: LanguagePageConfig = {
  slug: 'selenium', name: 'Selenium',
  description: 'Selenium is the most widely used browser automation framework. It supports multiple browsers and programming languages for web application testing, scraping, and automation at scale.',
  layout: 'feed', accentBg: 'bg-[#43B02A]', accentText: 'text-white',
  icon: <SiSelenium size={28} />,
};

export default function SeleniumPage() { return <LanguagePageShell config={config} />; }
