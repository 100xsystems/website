import type { Metadata } from 'next';
import { SiTerraform } from 'react-icons/si';
import { LanguagePageShell, type LanguagePageConfig } from '@/lib/language-page-shell';

export const metadata: Metadata = {
  title: 'Terraform — Knowledge Base',
  description: 'Curated resources for learning Terraform — Infrastructure as Code standards.',
};

const config: LanguagePageConfig = {
  slug: 'terraform',
  name: 'Terraform',
  description: 'Terraform by HashiCorp is the industry standard Infrastructure as Code (IaC) tool. Using the HCL (HashiCorp Configuration Language), it lets you define, provision, and manage cloud infrastructure across all major providers.',
  layout: 'grid',
  accentBg: 'bg-[#7B42BC]',
  accentText: 'text-white',
  icon: <SiTerraform size={28} />,
};

export default function TerraformPage() {
  return <LanguagePageShell config={config} />;
}
