import type { Metadata } from 'next';
import Link from 'next/link';
import { getHubs, countHubResources, refreshKnowledgeCacheIfStale } from '@/lib/knowledge-resources';
import { getLangIcon, getLangBg } from '@/lib/language-icons';
import { getAwesomeIcon, getAwesomeBrandColor, awesomeLabel } from '@/lib/awesome-icons';
import { loadFeedCache } from '@/feed/feed.cache';
import { ArrowUpRight } from 'lucide-react';
import {
  SiApacheairflow,
  SiApachespark,
  SiApacheflink,
  SiApachekafka,
  SiRedis,
  SiGraphql,
} from 'react-icons/si';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI Hub — 100xSystems',
  description:
    'Everything AI on 100xSystems in one place: twelve complete AI courses, machine learning awesome lists, AI engineering feeds, and the tools behind modern AI systems.',
};

// ── AI curated awesome lists (deep-link into /discover/awesome?source=…) ──

const AI_AWESOME_LISTS: Array<{ repoId: string; label: string; blurb: string }> = [
  { repoId: 'josephmisiti/awesome-machine-learning', label: 'Machine Learning', blurb: '1,000+ frameworks, libraries and software for ML.' },
  { repoId: 'academic/awesome-datascience', label: 'Data Science', blurb: 'The classic data science repository — learn and apply, for real.' },
  { repoId: 'ChristosChristofidis/awesome-deep-learning', label: 'Deep Learning', blurb: 'Tutorials, projects and communities across deep learning.' },
  { repoId: 'jbhuang0604/awesome-computer-vision', label: 'Computer Vision', blurb: 'CV papers, datasets and tools from top vision labs.' },
  { repoId: 'keon/awesome-nlp', label: 'Natural Language Processing', blurb: 'NLP libraries, datasets and tutorials for every level.' },
];

// ── AI feeds (tagged in the registry feed constants) ──

const AI_FEED_IDS = new Set([
  'apple-ml-research',
  'databricks',
  'meta-engineering',
  'pinecone-engineering',
  'openai',
  'google-deepmind',
]);

interface AiArticle {
  feedId: string;
  feedName: string;
  title: string;
  url: string;
  publishedAt: string | null;
}

async function loadAiFeeds(): Promise<{ articles: AiArticle[]; feeds: Array<{ id: string; name: string; siteUrl: string }> }> {
  try {
    const cache = await loadFeedCache();
    const feeds: Array<{ id: string; name: string; siteUrl: string }> = [];
    const articles: AiArticle[] = [];

    if (!cache?.feeds) return { articles, feeds };

    for (const [feedId, fd] of Object.entries(cache.feeds)) {
      const data = fd as { feedName?: string; feedSiteUrl?: string; tags?: string[]; items?: Array<{ guid: string; title: string; link: string; publishedAt?: string | null }> };
      const tags = data.tags ?? [];
      const isAi = AI_FEED_IDS.has(feedId) || tags.some((t) => ['ai', 'ml', 'machine-learning', 'deep-learning', 'nlp', 'llm'].includes(t.toLowerCase()));
      if (!isAi) continue;

      feeds.push({ id: feedId, name: data.feedName ?? feedId, siteUrl: data.feedSiteUrl ?? '' });
      for (const item of data.items ?? []) {
        articles.push({
          feedId,
          feedName: data.feedName ?? feedId,
          title: item.title,
          url: item.link,
          publishedAt: item.publishedAt ?? null,
        });
      }
    }

    articles.sort((a, b) => (b.publishedAt ? new Date(b.publishedAt).getTime() : 0) - (a.publishedAt ? new Date(a.publishedAt).getTime() : 0));
    return { articles: articles.slice(0, 12), feeds };
  } catch {
    return { articles: [], feeds: [] };
  }
}

// ── Knowledge tools relevant to AI/ML infra (with native brand icons) ──

const AI_TOOLS: Array<{ slug: string; name: string; blurb: string; icon: React.ReactNode }> = [
  { slug: 'airflow', name: 'Apache Airflow', blurb: 'Orchestrate ML training and data pipelines.', icon: <SiApacheairflow /> },
  { slug: 'apache-spark', name: 'Apache Spark', blurb: 'Distributed data processing for ML workloads.', icon: <SiApachespark /> },
  { slug: 'apache-flink', name: 'Apache Flink', blurb: 'Stream processing for real-time ML features.', icon: <SiApacheflink /> },
  { slug: 'kafka', name: 'Kafka', blurb: 'Event streaming backbone for AI systems.', icon: <SiApachekafka /> },
  { slug: 'redis-cache', name: 'Redis', blurb: 'Feature stores, caching and real-time inference.', icon: <SiRedis /> },
  { slug: 'graphql', name: 'GraphQL', blurb: 'APIs to serve models to the frontend.', icon: <SiGraphql /> },
];

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

export default async function AiHubPage() {
  // ISR: re-clone the registry knowledge tree if stale (brings in new AI courses).
  refreshKnowledgeCacheIfStale();
  const aiCourses = getHubs('ai');
  const { articles, feeds } = await loadAiFeeds();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              AI HUB
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              Artificial&nbsp;<span className="text-accent">Intelligence</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-2xl mx-auto">
              The AI section of 100xSystems — twelve complete structured courses covering the
              whole AI landscape, from data science and machine learning to LLM engineering,
              AI agents, reinforcement learning, MLOps and AI safety. Plus curated awesome
              lists, live AI engineering feeds, and the tools behind modern AI systems. Free,
              structured, and updated automatically.
            </p>
          </div>

          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{aiCourses.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">AI courses</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{aiCourses.reduce((s, h) => s + (h.lessons?.length ?? 0), 0)}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Lessons</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{AI_AWESOME_LISTS.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">ML lists</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{feeds.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">AI feeds</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{AI_TOOLS.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">AI tools</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Courses — complete knowledge-base courses, before the awesome lists */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight uppercase">
                AI <span className="text-accent">courses</span>
              </h2>
              <p className="mt-2 text-sm text-fg-secondary max-w-xl">
                Twelve complete 21-lesson courses — from data science and machine learning
                foundations to LLM engineering, AI agents, reinforcement learning, MLOps and
                AI safety. Learn the principles, patterns and systems behind AI.
              </p>
            </div>
            <Link href="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-accent-hover">
              All courses
            </Link>
          </div>

          {aiCourses.length === 0 ? (
            <div className="bg-surface-secondary p-14 text-center">
              <p className="text-sm text-fg-muted">AI courses land here after the next registry sync.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-secondary">
              {aiCourses.map((course) => {
                const lessons = course.lessons?.length ?? 0;
                const resources = countHubResources(course);
                const icon = getLangIcon(course.slug);
                return (
                  <Link
                    key={course.slug}
                    href={`/knowledge/ai/${course.slug}`}
                    className="group flex flex-col justify-between gap-6 p-8 bg-white transition-colors duration-200 hover:bg-accent"
                  >
                    <div className="flex items-start gap-5">
                      <span className={`inline-flex items-center justify-center w-14 h-14 shrink-0 transition-colors duration-200 ${getLangBg(course.slug)}`}>
                        {icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-extrabold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 leading-tight">
                          {course.name}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors duration-200">
                          {lessons} lessons
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-fg-secondary leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-200">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors duration-200">
                      <span className="px-2 py-1 bg-surface-secondary text-fg-secondary group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                        Full course
                      </span>
                      <span>{resources} curated resources</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ML Awesome Lists */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight uppercase">
                Machine learning <span className="text-accent">awesome lists</span>
              </h2>
              <p className="mt-2 text-sm text-fg-secondary max-w-xl">
                The most-starred curated ML collections on GitHub — click through to the flat,
                filterable list of every resource.
              </p>
            </div>
            <Link href="/discover/awesome" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-accent-hover">
              All awesome lists
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 bg-white">
            {AI_AWESOME_LISTS.map((list) => (
              <Link
                key={list.repoId}
                href={`/discover/awesome?source=${encodeURIComponent(list.repoId)}`}
                className="group flex flex-col gap-6 p-7 bg-surface-secondary transition-colors duration-200 hover:bg-accent"
              >
                <span
                  className="inline-flex items-center justify-center w-14 h-14 shrink-0 transition-colors duration-200"
                  style={{ backgroundColor: `${getAwesomeBrandColor(list.repoId)}1A`, color: getAwesomeBrandColor(list.repoId) }}
                >
                  {getAwesomeIcon(list.repoId, 26)}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-extrabold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 leading-tight mb-2">
                    {list.label}
                  </h3>
                  <p className="text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors duration-200">
                    {list.blurb}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted group-hover:text-white/70 transition-colors duration-200">
                  Browse {awesomeLabel(list.repoId)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI feeds */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight uppercase">
                Latest from <span className="text-accent">AI engineering</span>
              </h2>
              <p className="mt-2 text-sm text-fg-secondary max-w-xl">
                Fresh articles from AI-focused engineering blogs — Apple ML, Meta, Databricks,
                Pinecone and more.
              </p>
            </div>
            <Link href="/discover/feed" className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-accent-hover">
              Full feed
            </Link>
          </div>

          {articles.length === 0 ? (
            <div className="bg-surface-secondary p-14 text-center">
              <p className="text-sm text-fg-muted">AI feeds will appear here after the next registry sync.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-surface-secondary">
              {articles.map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between gap-5 bg-white p-7 transition-colors duration-200 hover:bg-accent"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white/80 transition-colors duration-200">
                        {article.feedName}
                      </span>
                      {article.publishedAt && (
                        <span className="text-[9px] text-fg-muted group-hover:text-white/60 transition-colors duration-200 ml-auto">
                          {formatDate(article.publishedAt)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-fg leading-snug line-clamp-3 group-hover:text-white transition-colors duration-200">
                      {article.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent group-hover:text-white/80 transition-colors duration-200">
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI tools from knowledge base */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight uppercase">
              Tools behind <span className="text-accent">AI systems</span>
            </h2>
            <p className="mt-2 text-sm text-fg-secondary max-w-xl">
              Curated knowledge-base hubs for the infrastructure that powers modern machine
              learning and AI products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 bg-white">
            {AI_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/knowledge/tools/${tool.slug}`}
                className="group flex items-start gap-5 p-7 bg-surface-secondary transition-colors duration-200 hover:bg-accent"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-white text-fg group-hover:bg-white/20 group-hover:text-white transition-colors duration-200">
                  {tool.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors duration-200 mb-1.5">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors duration-200">
                    {tool.blurb}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
