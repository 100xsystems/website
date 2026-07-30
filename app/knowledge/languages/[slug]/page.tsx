import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SiJavascript, SiPython, SiTypescript, SiOpenjdk, SiCplusplus,
  SiKotlin, SiSwift, SiRuby, SiPhp, SiSharp, SiGo, SiRust,
  SiScala, SiR, SiDart, SiElixir, SiHaskell, SiLua, SiGnubash,
  SiC, SiJulia, SiPerl, SiFortran, SiApachegroovy, SiClojure, SiErlang, SiAssemblyscript,
  SiOcaml, SiFsharp, SiCrystal, SiNim, SiZig, SiV, SiD, SiRacket,
  SiElm, SiGraphql, SiGleam, SiSolidity, SiWebassembly, SiAda, SiHaxe, SiTerraform, SiMarkdown,
  SiLatex, SiCommonlisp, SiProcessingfoundation, SiScratch, SiWolframlanguage, SiGodotengine, SiLabview, SiAutohotkey, SiJson, SiToml,
  SiPurescript, SiSass, SiLess, SiPug, SiJinja, SiNixos, SiDocker, SiKubernetes, SiAnsible, SiLlvm,
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiNodedotjs, SiExpress, SiFlutter, SiLinux, SiPostgresql, SiRedis,
  SiSpring, SiDjango, SiLaravel, SiNextdotjs, SiTailwindcss, SiBootstrap, SiNginx, SiMongodb, SiElasticsearch, SiMysql,
  SiGrafana, SiPrometheus, SiApachekafka, SiRabbitmq, SiApacheairflow, SiSqlite, SiJenkins, SiGitlab, SiGithubactions, SiNeovim,
  SiAstro,
  SiBun, SiDeno, SiNestjs, SiRemix, SiFastify, SiHono, SiSelenium, SiCypress, SiVitest, SiJest,
  SiVite, SiPrisma, SiSocketdotio, SiThreedotjs, SiChartdotjs, SiEslint, SiPrettier, SiWebpack, SiElectron, SiExpo,
} from 'react-icons/si';
import { FaBook, FaFileAlt, FaLaptopCode, FaPlay, FaTerminal, FaSearch, FaNewspaper, FaUsers } from 'react-icons/fa';
import { getLanguageMeta, getHandcraftedSystems } from '@/lib/mdx';
import { getLanguageResources } from '@/lib/language-resources';

interface Props {
  params: Promise<{ slug: string }>;
}

const LANG_ICONS: Record<string, React.ReactNode> = {
  javascript: <SiJavascript size={28} />,
  python:     <SiPython size={28} />,
  typescript: <SiTypescript size={28} />,
  java:       <SiOpenjdk size={28} />,
  cpp:        <SiCplusplus size={28} />,
  kotlin:     <SiKotlin size={28} />,
  swift:      <SiSwift size={28} />,
  ruby:       <SiRuby size={28} />,
  php:        <SiPhp size={28} />,
  csharp:     <SiSharp size={28} />,
  go:         <SiGo size={28} />,
  rust:       <SiRust size={28} />,
  scala:      <SiScala size={28} />,
  r:          <SiR size={28} />,
  dart:       <SiDart size={28} />,
  elixir:     <SiElixir size={28} />,
  haskell:    <SiHaskell size={28} />,
  lua:        <SiLua size={28} />,
  shell:      <SiGnubash size={28} />,
  c:          <SiC size={28} />,
  matlab:     <span className="text-lg font-bold">M</span>,
  julia:      <SiJulia size={28} />,
  perl:       <SiPerl size={28} />,
  fortran:    <SiFortran size={28} />,
  groovy:     <SiApachegroovy size={28} />,
  clojure:    <SiClojure size={28} />,
  erlang:     <SiErlang size={28} />,
  assembly:   <SiAssemblyscript size={28} />,
  cobol:   <span className="text-lg font-bold">C</span>,
  ocaml:   <SiOcaml size={28} />,
  fsharp:  <SiFsharp size={28} />,
  crystal: <SiCrystal size={28} />,
  nim:     <SiNim size={28} />,
  zig:     <SiZig size={28} />,
  v:       <SiV size={28} />,
  d:       <SiD size={28} />,
  racket:  <SiRacket size={28} />,
  scheme:  <span className="text-lg font-bold">λ</span>,
  prolog:  <span className="text-lg font-bold">?</span>,
  sql:      <span className="text-lg font-bold">S</span>,
  elm:      <SiElm size={28} />,
  graphql:  <SiGraphql size={28} />,
  gleam:    <SiGleam size={28} />,
  solidity: <SiSolidity size={28} />,
  webassembly: <SiWebassembly size={28} />,
  ada:      <SiAda size={28} />,
  haxe:     <SiHaxe size={28} />,
  terraform: <SiTerraform size={28} />,
  markdown: <SiMarkdown size={28} />,
  latex:      <SiLatex size={28} />,
  'common-lisp': <SiCommonlisp size={28} />,
  processing: <SiProcessingfoundation size={28} />,
  scratch:    <SiScratch size={28} />,
  'wolfram-language': <SiWolframlanguage size={28} />,
  gdscript:   <SiGodotengine size={28} />,
  labview:    <SiLabview size={28} />,
  autohotkey: <SiAutohotkey size={28} />,
  json:       <SiJson size={28} />,
  toml:       <SiToml size={28} />,
  purescript: <SiPurescript size={28} />,
  sass:       <SiSass size={28} />,
  less:       <SiLess size={28} />,
  pug:        <SiPug size={28} />,
  jinja:      <SiJinja size={28} />,
  nix:        <SiNixos size={28} />,
  docker:     <SiDocker size={28} />,
  kubernetes: <SiKubernetes size={28} />,
  ansible:    <SiAnsible size={28} />,
  llvm:       <SiLlvm size={28} />,
  react:      <SiReact size={28} />,
  vue:        <SiVuedotjs size={28} />,
  angular:    <SiAngular size={28} />,
  svelte:     <SiSvelte size={28} />,
  nodejs:     <SiNodedotjs size={28} />,
  express:    <SiExpress size={28} />,
  flutter:    <SiFlutter size={28} />,
  linux:      <SiLinux size={28} />,
  postgresql: <SiPostgresql size={28} />,
  redis:      <SiRedis size={28} />,
  spring:     <SiSpring size={28} />,
  django:     <SiDjango size={28} />,
  laravel:    <SiLaravel size={28} />,
  nextjs:     <SiNextdotjs size={28} />,
  tailwind:   <SiTailwindcss size={28} />,
  bootstrap:  <SiBootstrap size={28} />,
  nginx:      <SiNginx size={28} />,
  mongodb:    <SiMongodb size={28} />,
  elasticsearch: <SiElasticsearch size={28} />,
  mysql:      <SiMysql size={28} />,
  grafana:    <SiGrafana size={28} />,
  prometheus: <SiPrometheus size={28} />,
  kafka:      <SiApachekafka size={28} />,
  rabbitmq:   <SiRabbitmq size={28} />,
  airflow:    <SiApacheairflow size={28} />,
  sqlite:     <SiSqlite size={28} />,
  jenkins:    <SiJenkins size={28} />,
  gitlab:     <SiGitlab size={28} />,
  'github-actions': <SiGithubactions size={28} />,
  neovim:     <SiNeovim size={28} />,
  astro:      <SiAstro size={28} />,
  bun:        <SiBun size={28} />,
  deno:       <SiDeno size={28} />,
  nestjs:     <SiNestjs size={28} />,
  remix:      <SiRemix size={28} />,
  fastify:    <SiFastify size={28} />,
  hono:       <SiHono size={28} />,
  selenium:   <SiSelenium size={28} />,
  cypress:    <SiCypress size={28} />,
  vitest:     <SiVitest size={28} />,
  jest:       <SiJest size={28} />,
  vite:       <SiVite size={28} />,
  prisma:     <SiPrisma size={28} />,
  socketio:   <SiSocketdotio size={28} />,
  threejs:    <SiThreedotjs size={28} />,
  chartjs:    <SiChartdotjs size={28} />,
  eslint:     <SiEslint size={28} />,
  prettier:   <SiPrettier size={28} />,
  webpack:    <SiWebpack size={28} />,
  electron:   <SiElectron size={28} />,
  expo:       <SiExpo size={28} />,
};

const LANG_HERO: Record<string, { bg: string; iconBg: string }> = {
  javascript: { bg: 'bg-[#F7DF1E]', iconBg: 'bg-[#F7DF1E] text-black' },
  python:     { bg: 'bg-[#3776AB]', iconBg: 'bg-[#3776AB] text-white' },
  typescript: { bg: 'bg-[#3178C6]', iconBg: 'bg-[#3178C6] text-white' },
  java:       { bg: 'bg-[#ED8B00]', iconBg: 'bg-[#ED8B00] text-white' },
  cpp:        { bg: 'bg-[#00599C]', iconBg: 'bg-[#00599C] text-white' },
  kotlin:     { bg: 'bg-[#7F52FF]', iconBg: 'bg-[#7F52FF] text-white' },
  swift:      { bg: 'bg-[#F05138]', iconBg: 'bg-[#F05138] text-white' },
  ruby:       { bg: 'bg-[#CC342D]', iconBg: 'bg-[#CC342D] text-white' },
  php:        { bg: 'bg-[#777BB4]', iconBg: 'bg-[#777BB4] text-white' },
  csharp:     { bg: 'bg-[#239120]', iconBg: 'bg-[#239120] text-white' },
  go:         { bg: 'bg-[#00ADD8]', iconBg: 'bg-[#00ADD8] text-white' },
  rust:       { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  scala:      { bg: 'bg-[#DC322F]', iconBg: 'bg-[#DC322F] text-white' },
  r:          { bg: 'bg-[#276DC3]', iconBg: 'bg-[#276DC3] text-white' },
  dart:       { bg: 'bg-[#0175C2]', iconBg: 'bg-[#0175C2] text-white' },
  elixir:     { bg: 'bg-[#4B275F]', iconBg: 'bg-[#4B275F] text-white' },
  haskell:    { bg: 'bg-[#5D4F85]', iconBg: 'bg-[#5D4F85] text-white' },
  lua:        { bg: 'bg-[#000080]', iconBg: 'bg-[#000080] text-white' },
  shell:      { bg: 'bg-[#4EAA25]', iconBg: 'bg-[#4EAA25] text-white' },
  c:          { bg: 'bg-[#A8B9CC]', iconBg: 'bg-[#A8B9CC] text-black' },
  matlab:     { bg: 'bg-[#E16737]', iconBg: 'bg-[#E16737] text-white' },
  julia:      { bg: 'bg-[#4063D8]', iconBg: 'bg-[#4063D8] text-white' },
  perl:       { bg: 'bg-[#39457E]', iconBg: 'bg-[#39457E] text-white' },
  fortran:    { bg: 'bg-[#734F96]', iconBg: 'bg-[#734F96] text-white' },
  groovy:     { bg: 'bg-[#4298B8]', iconBg: 'bg-[#4298B8] text-white' },
  clojure:    { bg: 'bg-[#5881D8]', iconBg: 'bg-[#5881D8] text-white' },
  erlang:     { bg: 'bg-[#A90533]', iconBg: 'bg-[#A90533] text-white' },
  assembly:   { bg: 'bg-[#6E4C13]', iconBg: 'bg-[#6E4C13] text-white' },
  cobol:   { bg: 'bg-[#005C99]', iconBg: 'bg-[#005C99] text-white' },
  ocaml:   { bg: 'bg-[#EC6813]', iconBg: 'bg-[#EC6813] text-white' },
  fsharp:  { bg: 'bg-[#378BBA]', iconBg: 'bg-[#378BBA] text-white' },
  crystal: { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  nim:     { bg: 'bg-[#FFE953]', iconBg: 'bg-[#FFE953] text-black' },
  zig:     { bg: 'bg-[#F7A41D]', iconBg: 'bg-[#F7A41D] text-black' },
  v:       { bg: 'bg-[#5D87BF]', iconBg: 'bg-[#5D87BF] text-white' },
  d:       { bg: 'bg-[#BA595E]', iconBg: 'bg-[#BA595E] text-white' },
  racket:  { bg: 'bg-[#9F1D20]', iconBg: 'bg-[#9F1D20] text-white' },
  scheme:  { bg: 'bg-[#1B1B1B]', iconBg: 'bg-[#1B1B1B] text-white' },
  prolog:  { bg: 'bg-[#E61C24]', iconBg: 'bg-[#E61C24] text-white' },
  sql:      { bg: 'bg-[#336791]', iconBg: 'bg-[#336791] text-white' },
  elm:      { bg: 'bg-[#60B5CC]', iconBg: 'bg-[#60B5CC] text-white' },
  graphql:  { bg: 'bg-[#E535AB]', iconBg: 'bg-[#E535AB] text-white' },
  gleam:    { bg: 'bg-[#FFC97B]', iconBg: 'bg-[#FFC97B] text-black' },
  solidity: { bg: 'bg-[#363636]', iconBg: 'bg-[#363636] text-white' },
  webassembly: { bg: 'bg-[#654FF0]', iconBg: 'bg-[#654FF0] text-white' },
  ada:      { bg: 'bg-[#01A4FF]', iconBg: 'bg-[#01A4FF] text-white' },
  haxe:     { bg: 'bg-[#F5871F]', iconBg: 'bg-[#F5871F] text-white' },
  terraform: { bg: 'bg-[#7B42BC]', iconBg: 'bg-[#7B42BC] text-white' },
  markdown: { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  latex:      { bg: 'bg-[#008080]', iconBg: 'bg-[#008080] text-white' },
  'common-lisp': { bg: 'bg-[#FF6600]', iconBg: 'bg-[#FF6600] text-white' },
  processing: { bg: 'bg-[#0096D6]', iconBg: 'bg-[#0096D6] text-white' },
  scratch:    { bg: 'bg-[#F7A41D]', iconBg: 'bg-[#F7A41D] text-black' },
  'wolfram-language': { bg: 'bg-[#DD1100]', iconBg: 'bg-[#DD1100] text-white' },
  gdscript:   { bg: 'bg-[#478CBF]', iconBg: 'bg-[#478CBF] text-white' },
  labview:    { bg: 'bg-[#DDE020]', iconBg: 'bg-[#DDE020] text-black' },
  autohotkey: { bg: 'bg-[#334455]', iconBg: 'bg-[#334455] text-white' },
  json:       { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  toml:       { bg: 'bg-[#9C4221]', iconBg: 'bg-[#9C4221] text-white' },
  purescript: { bg: 'bg-[#333333]', iconBg: 'bg-[#333333] text-white' },
  sass:       { bg: 'bg-[#CC6699]', iconBg: 'bg-[#CC6699] text-white' },
  less:       { bg: 'bg-[#1D365D]', iconBg: 'bg-[#1D365D] text-white' },
  pug:        { bg: 'bg-[#A86454]', iconBg: 'bg-[#A86454] text-white' },
  jinja:      { bg: 'bg-[#B41717]', iconBg: 'bg-[#B41717] text-white' },
  nix:        { bg: 'bg-[#5277C3]', iconBg: 'bg-[#5277C3] text-white' },
  docker:     { bg: 'bg-[#2496ED]', iconBg: 'bg-[#2496ED] text-white' },
  kubernetes: { bg: 'bg-[#326CE5]', iconBg: 'bg-[#326CE5] text-white' },
  ansible:    { bg: 'bg-[#EE0000]', iconBg: 'bg-[#EE0000] text-white' },
  llvm:       { bg: 'bg-[#4E8CAB]', iconBg: 'bg-[#4E8CAB] text-white' },
  react:      { bg: 'bg-[#61DAFB]', iconBg: 'bg-[#61DAFB] text-black' },
  vue:        { bg: 'bg-[#4FC08D]', iconBg: 'bg-[#4FC08D] text-white' },
  angular:    { bg: 'bg-[#DD0031]', iconBg: 'bg-[#DD0031] text-white' },
  svelte:     { bg: 'bg-[#FF3E00]', iconBg: 'bg-[#FF3E00] text-white' },
  nodejs:     { bg: 'bg-[#339933]', iconBg: 'bg-[#339933] text-white' },
  express:    { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  flutter:    { bg: 'bg-[#02569B]', iconBg: 'bg-[#02569B] text-white' },
  linux:      { bg: 'bg-[#FCC624]', iconBg: 'bg-[#FCC624] text-black' },
  postgresql: { bg: 'bg-[#4169E1]', iconBg: 'bg-[#4169E1] text-white' },
  redis:      { bg: 'bg-[#DC382D]', iconBg: 'bg-[#DC382D] text-white' },
  spring:     { bg: 'bg-[#6DB33F]', iconBg: 'bg-[#6DB33F] text-white' },
  django:     { bg: 'bg-[#092E20]', iconBg: 'bg-[#092E20] text-white' },
  laravel:    { bg: 'bg-[#FF2D20]', iconBg: 'bg-[#FF2D20] text-white' },
  nextjs:     { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  tailwind:   { bg: 'bg-[#06B6D4]', iconBg: 'bg-[#06B6D4] text-white' },
  bootstrap:  { bg: 'bg-[#7952B3]', iconBg: 'bg-[#7952B3] text-white' },
  nginx:      { bg: 'bg-[#009639]', iconBg: 'bg-[#009639] text-white' },
  mongodb:    { bg: 'bg-[#47A248]', iconBg: 'bg-[#47A248] text-white' },
  elasticsearch: { bg: 'bg-[#005571]', iconBg: 'bg-[#005571] text-white' },
  mysql:      { bg: 'bg-[#4479A1]', iconBg: 'bg-[#4479A1] text-white' },
  grafana:    { bg: 'bg-[#F46800]', iconBg: 'bg-[#F46800] text-white' },
  prometheus: { bg: 'bg-[#E6522C]', iconBg: 'bg-[#E6522C] text-white' },
  kafka:      { bg: 'bg-[#231F20]', iconBg: 'bg-[#231F20] text-white' },
  rabbitmq:   { bg: 'bg-[#FF6600]', iconBg: 'bg-[#FF6600] text-white' },
  airflow:    { bg: 'bg-[#017CEE]', iconBg: 'bg-[#017CEE] text-white' },
  sqlite:     { bg: 'bg-[#003B57]', iconBg: 'bg-[#003B57] text-white' },
  jenkins:    { bg: 'bg-[#D24939]', iconBg: 'bg-[#D24939] text-white' },
  gitlab:     { bg: 'bg-[#FC6D26]', iconBg: 'bg-[#FC6D26] text-white' },
  'github-actions': { bg: 'bg-[#2088FF]', iconBg: 'bg-[#2088FF] text-white' },
  neovim:     { bg: 'bg-[#57A143]', iconBg: 'bg-[#57A143] text-white' },
  astro:      { bg: 'bg-[#BC52EE]', iconBg: 'bg-[#BC52EE] text-white' },
  bun:        { bg: 'bg-[#14151A]', iconBg: 'bg-[#14151A] text-white' },
  deno:       { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  nestjs:     { bg: 'bg-[#E0234E]', iconBg: 'bg-[#E0234E] text-white' },
  remix:      { bg: 'bg-[#121212]', iconBg: 'bg-[#121212] text-white' },
  fastify:    { bg: 'bg-[#202020]', iconBg: 'bg-[#202020] text-white' },
  hono:       { bg: 'bg-[#E36002]', iconBg: 'bg-[#E36002] text-white' },
  selenium:   { bg: 'bg-[#43B02A]', iconBg: 'bg-[#43B02A] text-white' },
  cypress:    { bg: 'bg-[#17202C]', iconBg: 'bg-[#17202C] text-white' },
  vitest:     { bg: 'bg-[#6E9F18]', iconBg: 'bg-[#6E9F18] text-white' },
  jest:       { bg: 'bg-[#C21325]', iconBg: 'bg-[#C21325] text-white' },
  vite:       { bg: 'bg-[#646CFF]', iconBg: 'bg-[#646CFF] text-white' },
  prisma:     { bg: 'bg-[#2D3748]', iconBg: 'bg-[#2D3748] text-white' },
  socketio:   { bg: 'bg-[#010101]', iconBg: 'bg-[#010101] text-white' },
  threejs:    { bg: 'bg-[#000000]', iconBg: 'bg-[#000000] text-white' },
  chartjs:    { bg: 'bg-[#FF6384]', iconBg: 'bg-[#FF6384] text-white' },
  eslint:     { bg: 'bg-[#4B32C3]', iconBg: 'bg-[#4B32C3] text-white' },
  prettier:   { bg: 'bg-[#F7B93E]', iconBg: 'bg-[#F7B93E] text-black' },
  webpack:    { bg: 'bg-[#8DD6F9]', iconBg: 'bg-[#8DD6F9] text-black' },
  electron:   { bg: 'bg-[#47848F]', iconBg: 'bg-[#47848F] text-white' },
  expo:       { bg: 'bg-[#000020]', iconBg: 'bg-[#000020] text-white' },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  book: <FaBook size={14} />,
  docs: <FaFileAlt size={14} />,
  code: <FaLaptopCode size={14} />,
  video: <FaPlay size={14} />,
  terminal: <FaTerminal size={14} />,
  reference: <FaSearch size={14} />,
  news: <FaNewspaper size={14} />,
  community: <FaUsers size={14} />,
};

const CATEGORY_BG: Record<string, string> = {
  book: 'bg-amber-50 text-amber-600',
  docs: 'bg-blue-50 text-blue-600',
  code: 'bg-emerald-50 text-emerald-600',
  video: 'bg-rose-50 text-rose-600',
  terminal: 'bg-violet-50 text-violet-600',
  reference: 'bg-cyan-50 text-cyan-600',
  news: 'bg-orange-50 text-orange-600',
  community: 'bg-indigo-50 text-indigo-600',
};

const KNOWN_SLUGS = new Set([
  'javascript', 'python', 'typescript', 'java', 'cpp',
  'kotlin', 'swift', 'ruby', 'php', 'csharp', 'go', 'rust',
  'scala', 'r', 'dart', 'elixir', 'haskell', 'lua', 'shell',
  'c', 'matlab', 'julia', 'perl', 'fortran', 'groovy',
  'clojure', 'erlang', 'assembly', 'cobol',
  'ocaml', 'fsharp', 'crystal', 'nim', 'zig', 'v', 'd',
  'racket', 'scheme', 'prolog',
  'sql', 'elm', 'graphql', 'gleam', 'solidity', 'webassembly',
  'ada', 'haxe', 'terraform', 'markdown',
  'latex', 'common-lisp', 'processing', 'scratch', 'wolfram-language',
  'gdscript', 'labview', 'autohotkey', 'json', 'toml',
  'purescript', 'sass', 'less', 'pug', 'jinja',
  'nix', 'docker', 'kubernetes', 'ansible', 'llvm',
  'react', 'vue', 'angular', 'svelte', 'nodejs',
  'express', 'flutter', 'linux', 'postgresql', 'redis',
  'spring', 'django', 'laravel', 'nextjs', 'tailwind',
  'bootstrap', 'nginx', 'mongodb', 'elasticsearch', 'mysql',
  'grafana', 'prometheus', 'kafka', 'rabbitmq', 'airflow',
  'sqlite', 'jenkins', 'gitlab', 'github-actions', 'neovim',
  'astro',
  'bun', 'deno', 'nestjs', 'remix', 'fastify',
  'hono', 'selenium', 'cypress', 'vitest', 'jest',
  'vite', 'prisma', 'socketio', 'threejs', 'chartjs',
  'eslint', 'prettier', 'webpack', 'electron', 'expo',
]);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  const resources = getLanguageResources(slug);
  const title = lang?.title || resources?.name || slug;
  return { title: `${title} — Knowledge Base` };
}

export default async function LanguageDetailPage({ params }: Props) {
  const { slug } = await params;
  const lang = getLanguageMeta(slug);
  const resources = getLanguageResources(slug);

  // Don't 404 if we have curated resources OR if it's a known slug
  // Only 404 if we have neither curriculum data nor resource data
  if (!lang && !resources && !KNOWN_SLUGS.has(slug)) {
    notFound();
  }

  const displayName = lang?.title || resources?.name || slug;
  const hero = LANG_HERO[slug] || { bg: 'bg-accent', iconBg: 'bg-accent text-white' };

  const relatedSystems = getHandcraftedSystems().filter(
    (s) => s.tags && s.tags.some(t => t.toLowerCase().includes(slug.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Brand Banner */}
      <div className={cn('relative py-16 px-6 lg:px-12', hero.bg)}>
        <div className="max-w-[1200px] mx-auto">
          <Link href="/knowledge/languages" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors mb-8">
            &larr; Languages
          </Link>
          <div className="flex items-center gap-6">
            <span className={cn('inline-flex items-center justify-center w-16 h-16', hero.iconBg)}>
              {LANG_ICONS[slug] || (
                <span className="text-lg font-bold">{displayName.charAt(0)}</span>
              )}
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
                {displayName}
              </h1>
              {resources?.description && (
                <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                  {resources.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-12">

        {/* Curated Resources Grid — borderless */}
        {resources && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent">
                Curated Resources
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.categories.map((category) => (
                <div key={category.label} className="bg-surface-secondary p-6 transition-all duration-200 hover:bg-accent group">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={cn(
                      'inline-flex items-center justify-center w-8 h-8',
                      CATEGORY_BG[category.icon] || 'bg-neutral-100 text-neutral-600',
                    )}>
                      {CATEGORY_ICONS[category.icon] || <FaBook size={14} />}
                    </span>
                    <h2 className="text-[11px] font-bold uppercase tracking-widest text-fg-muted group-hover:text-white/70 transition-colors">
                      {category.label}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <a
                        key={item.title}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group/link"
                      >
                        <h3 className="text-sm font-semibold text-fg group-hover:text-white transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-fg-secondary/70 leading-relaxed mt-1 group-hover:text-white/70 transition-colors line-clamp-2">
                          {item.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Curriculum / Chapters — borderless */}
        {lang && (
          <section className="mb-16 max-w-[900px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                Curriculum
              </span>
            </div>

            {lang.chapters.length === 0 ? (
              <p className="text-sm text-fg-muted">
                {resources
                  ? 'A structured curriculum path is being developed for this language. The curated resources above will keep you learning in the meantime.'
                  : 'Curriculum chapters are coming soon for this language.'}
              </p>
            ) : (
              <div className="space-y-px">
                {lang.chapters.map((chapter, idx) => (
                  <Link
                    key={chapter.slug}
                    href={`/knowledge/languages/${slug}/${chapter.slug}`}
                    className="flex items-center gap-4 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent group"
                  >
                    <span className="flex items-center justify-center w-7 h-7 text-[10px] font-bold shrink-0 bg-accent/10 text-accent group-hover:bg-white/20 group-hover:text-white transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors flex-1">
                      {chapter.title}
                    </span>
                    <span className="text-xs text-fg-muted group-hover:text-white/60 transition-colors">&rarr;</span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Related Systems — borderless */}
        {relatedSystems.length > 0 && (
          <section className="max-w-[900px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-surface-secondary text-fg-muted">
                Systems &amp; Tracks
              </span>
            </div>
            <div className="space-y-px">
              {relatedSystems.map((system) => (
                <Link
                  key={system.slug}
                  href={`/systems/${system.slug}`}
                  className="flex items-center gap-4 px-5 py-4 transition-all duration-200 bg-white hover:bg-accent group"
                >
                  <span className="text-sm font-semibold text-fg group-hover:text-white transition-colors flex-1 uppercase tracking-wide">
                    {system.title}
                  </span>
                  <span className="text-xs text-fg-muted group-hover:text-white/60 transition-colors">&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
