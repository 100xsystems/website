import type { Metadata } from 'next';
import { SiSolidity } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Solidity — Knowledge Base',
  description: 'Curated resources for learning Solidity — the language for smart contracts.',
};

const config: LanguagePageConfig = {
  slug: 'solidity',
  name: 'Solidity',
  description: 'Solidity is the primary programming language for writing smart contracts on Ethereum and EVM-compatible blockchains. It enables decentralized applications, DeFi protocols, and NFTs — the backbone of Web3.',
  layout: 'grid',
  accentBg: 'bg-[#363636]',
  accentText: 'text-white',
  icon: <SiSolidity size={28} />,
};

export default function SolidityPage() {
  return <LanguagePageShell config={config} />;
}
