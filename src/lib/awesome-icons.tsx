/**
 * ## Awesome List Icons
 *
 * Maps awesome-list repo IDs to native tech icons (react-icons/si) rendered
 * in their **original brand colors**. Used by the awesome directory, homepage
 * featured lists, and the AI hub. Falls back to a star glyph for lists
 * without a mapped icon.
 */

import React from 'react';
import {
  SiGithub, SiGo, SiRust, SiPython, SiCplusplus, SiOpenjdk, SiNodedotjs,
  SiTypescript, SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNextdotjs,
  SiSwift, SiKotlin, SiRuby, SiScala, SiElixir, SiLua, SiNginx,
  SiMongodb, SiGraphql, SiDocker, SiKubernetes, SiTerraform, SiCloudflare,
  SiPostgresql, SiTensorflow, SiPytorch,
  SiJupyter, SiOpencv, SiNeovim, SiGnubash,
  SiTailwindcss, SiLinux, SiNixos,
} from 'react-icons/si';
import { FaStar } from 'react-icons/fa';

type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>;

interface BrandedIcon {
  Icon: IconComponent;
  color: string;
}

/**
 * repoId → { icon, brand color }.
 * Colors are the official brand hexes (Simple Icons), with tasteful overrides
 * for marks that ship as pure white/black (OpenJDK → Java orange).
 */
const ICON_MAP: Record<string, BrandedIcon> = {
  'sindresorhus/awesome': { Icon: FaStar, color: '#572EFF' },
  'sindresorhus/awesome-nodejs': { Icon: SiNodedotjs, color: '#5FA04E' },
  'avelino/awesome-go': { Icon: SiGo, color: '#00ADD8' },
  'rust-unofficial/awesome-rust': { Icon: SiRust, color: '#000000' },
  'vinta/awesome-python': { Icon: SiPython, color: '#3776AB' },
  'fffaraz/awesome-cpp': { Icon: SiCplusplus, color: '#00599C' },
  'akullpp/awesome-java': { Icon: SiOpenjdk, color: '#E76F00' },
  'dzharii/awesome-typescript': { Icon: SiTypescript, color: '#3178C6' },
  'enaqx/awesome-react': { Icon: SiReact, color: '#61DAFB' },
  'vuejs/awesome-vue': { Icon: SiVuedotjs, color: '#4FC08D' },
  'PatrickJS/awesome-angular': { Icon: SiAngular, color: '#DD0031' },
  'TheComputerM/awesome-svelte': { Icon: SiSvelte, color: '#FF3E00' },
  'unicodeveloper/awesome-nextjs': { Icon: SiNextdotjs, color: '#000000' },
  'matteocrippa/awesome-swift': { Icon: SiSwift, color: '#F05138' },
  'mcxiaoke/awesome-kotlin': { Icon: SiKotlin, color: '#7F52FF' },
  'markets/awesome-ruby': { Icon: SiRuby, color: '#CC342D' },
  'lauris/awesome-scala': { Icon: SiScala, color: '#DC3220' },
  'h4cc/awesome-elixir': { Icon: SiElixir, color: '#4B275F' },
  'LewisJEllis/awesome-lua': { Icon: SiLua, color: '#2C2D72' },
  'agile6v/awesome-nginx': { Icon: SiNginx, color: '#009639' },
  'ramnes/awesome-mongodb': { Icon: SiMongodb, color: '#47A248' },
  'chentsulin/awesome-graphql': { Icon: SiGraphql, color: '#E10098' },
  'veggiemonk/awesome-docker': { Icon: SiDocker, color: '#2496ED' },
  'ramitsurana/awesome-kubernetes': { Icon: SiKubernetes, color: '#326CE5' },
  'shuaibiyy/awesome-terraform': { Icon: SiTerraform, color: '#7B42BC' },
  'cloudflare/cloudflare-docs': { Icon: SiCloudflare, color: '#F38020' },
  'josephmisiti/awesome-machine-learning': { Icon: SiTensorflow, color: '#FF6F00' },
  'ChristosChristofidis/awesome-deep-learning': { Icon: SiPytorch, color: '#EE4C2C' },
  'academic/awesome-datascience': { Icon: SiJupyter, color: '#F37626' },
  'jbhuang0604/awesome-computer-vision': { Icon: SiOpencv, color: '#5C3EE8' },
  'keon/awesome-nlp': { Icon: SiGithub, color: '#181717' },
  'igorbarinov/awesome-data-engineering': { Icon: SiGithub, color: '#181717' },
  'rockerBOO/awesome-neovim': { Icon: SiNeovim, color: '#57A143' },
  'viatsko/awesome-vscode': { Icon: SiGithub, color: '#007ACC' },
  'alebcay/awesome-shell': { Icon: SiGnubash, color: '#4EAA25' },
  'aniftyco/awesome-tailwindcss': { Icon: SiTailwindcss, color: '#06B6D4' },
  'dhamaniasad/awesome-databases': { Icon: SiPostgresql, color: '#4169E1' },
  'binhnguyennus/awesome-scalability': { Icon: SiGithub, color: '#181717' },
  'madd86/awesome-system-design': { Icon: SiGithub, color: '#181717' },
  'mfornos/awesome-microservices': { Icon: SiGithub, color: '#181717' },
  'ashishps1/awesome-system-design-resources': { Icon: SiGithub, color: '#181717' },
  'heynickc/awesome-ddd': { Icon: SiGithub, color: '#181717' },
  'adriannovegil/awesome-observability': { Icon: SiGithub, color: '#181717' },
  'zoidbergwill/awesome-ebpf': { Icon: SiLinux, color: '#FCC624' },
  'danluu/post-mortems': { Icon: SiGithub, color: '#181717' },
  'jubalh/awesome-os': { Icon: SiLinux, color: '#FCC624' },
  'embedded-boston/awesome-embedded-systems': { Icon: SiCplusplus, color: '#00599C' },
  'phodal/awesome-iot': { Icon: SiGithub, color: '#181717' },
  'jslee02/awesome-robotics-libraries': { Icon: SiGithub, color: '#181717' },
  'anaibol/awesome-serverless': { Icon: SiGithub, color: '#181717' },
  'jippi/awesome-nomad': { Icon: SiNixos, color: '#5277C3' },
  'docker/awesome-compose': { Icon: SiDocker, color: '#2496ED' },
  'festum/awesome-servicemesh': { Icon: SiGithub, color: '#181717' },
  'rootsongjc/awesome-cloud-native': { Icon: SiKubernetes, color: '#326CE5' },
  'rshipp/awesome-malware-analysis': { Icon: SiGithub, color: '#181717' },
};

const FALLBACK: BrandedIcon = { Icon: FaStar, color: '#572EFF' };

/** Brand hex color for a repo ID (fallback: accent purple). */
export function getAwesomeBrandColor(repoId: string): string {
  return ICON_MAP[repoId]?.color ?? FALLBACK.color;
}

/** Get the brand-colored icon for a repo ID (fallback: purple star). */
export function getAwesomeIcon(repoId: string, size = 18): React.ReactNode {
  const { Icon, color } = ICON_MAP[repoId] ?? FALLBACK;
  return (
    <span className="inline-flex" style={{ color }}>
      <Icon size={size} />
    </span>
  );
}

/** Short human label for a repo ID, e.g. "avelino/awesome-go" → "awesome-go". */
export function awesomeLabel(repoId: string): string {
  return repoId.split('/')[1] || repoId;
}

const PRETTY_NAMES: Record<string, string> = {
  nodejs: 'Node.js',
  nextjs: 'Next.js',
  cpp: 'C++',
  mongodb: 'MongoDB',
  ebpf: 'eBPF',
  ddd: 'DDD',
  nlp: 'NLP',
  iot: 'IoT',
  os: 'OS',
  cli: 'CLI',
  vscode: 'VS Code',
};

/** Title-case a repo ID for display, e.g. "avelino/awesome-go" → "Awesome Go". */
export function humanizeListName(repoId: string): string {
  const label = awesomeLabel(repoId);
  const isAwesome = /awesome/i.test(label);
  const rest = label.replace(/^awesome-?/i, '').replace(/[-_]+/g, ' ').trim();
  if (!rest) return 'Awesome';
  const pretty = rest
    .split(' ')
    .map((word) => {
      const lower = word.toLowerCase();
      if (PRETTY_NAMES[lower]) return PRETTY_NAMES[lower];
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  return isAwesome ? `Awesome ${pretty}` : pretty;
}
