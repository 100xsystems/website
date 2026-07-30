import type { Metadata } from 'next';
import { SiCommonlisp } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Common Lisp — Knowledge Base',
  description: 'Curated resources for learning Common Lisp — the programmable programming language.',
};

const config: LanguagePageConfig = {
  slug: 'common-lisp',
  name: 'Common Lisp',
  description: 'Common Lisp is a multi-paradigm programming language known for its powerful macro system, dynamic typing, and interactive development cycle. It excels at AI, symbolic computing, and meta-programming.',
  layout: 'bento',
  accentBg: 'bg-[#FF6600]',
  accentText: 'text-white',
  icon: <SiCommonlisp size={28} />,
};

export default function CommonLispPage() {
  return <LanguagePageShell config={config} />;
}
