import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Clock } from 'lucide-react';
import { getLanguageMeta, getAllLanguageSlugs } from '@/lib/mdx';
import { MarkdownRenderer } from '@/lib/markdown-renderer';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Props {
  params: Promise<{ slug: string; chapterSlug: string }>;
}

const CURRICULUM_ROOT = path.join(process.cwd(), '..', 'curriculum');

export async function generateStaticParams() {
  const slugs = getAllLanguageSlugs();
  const params: Array<{ slug: string; chapterSlug: string }> = [];

  for (const langSlug of slugs) {
    const lang = getLanguageMeta(langSlug);
    if (lang) {
      lang.chapters.forEach((ch) => {
        params.push({ slug: langSlug, chapterSlug: ch.slug });
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, chapterSlug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) return { title: 'Not Found' };

  const mdPath = path.join(CURRICULUM_ROOT, 'languages', slug, 'chapters', chapterSlug, 'index.md');
  let title = chapterSlug;
  try {
    if (fs.existsSync(mdPath)) {
      const { data } = matter(fs.readFileSync(mdPath, 'utf-8'));
      title = data.title || title;
    }
  } catch {}

  return {
    title: `${title} — ${lang.title} — Knowledge Base`,
  };
}

export default async function LanguageChapterPage({ params }: Props) {
  const { slug, chapterSlug } = await params;
  const lang = getLanguageMeta(slug);
  if (!lang) notFound();

  const mdPath = path.join(CURRICULUM_ROOT, 'languages', slug, 'chapters', chapterSlug, 'index.md');
  if (!fs.existsSync(mdPath)) notFound();

  const fileContent = fs.readFileSync(mdPath, 'utf-8');
  const { data, content } = matter(fileContent);

  const chapterIndex = lang.chapters.findIndex((ch) => ch.slug === chapterSlug);
  const prevChapter = chapterIndex > 0 ? lang.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < lang.chapters.length - 1 ? lang.chapters[chapterIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-[780px] mx-auto">

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-fg-muted uppercase tracking-wider mb-8">
          <Link href="/knowledge/languages" className="hover:text-accent transition-colors">Languages</Link>
          <span className="text-fg-muted/40">/</span>
          <Link href={`/knowledge/languages/${slug}`} className="hover:text-accent transition-colors">{lang.title}</Link>
          <span className="text-fg-muted/40">/</span>
          <span className="text-accent">{data.title || chapterSlug}</span>
        </nav>

        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center px-2 py-1 text-[9px] font-bold uppercase tracking-widest bg-accent/10 text-accent border border-accent/20">
              Chapter {chapterIndex + 1}
            </span>
            {data.estimatedTime && (
              <span className="flex items-center gap-1.5 text-xs text-fg-muted">
                <Clock size={12} />
                {data.estimatedTime}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-fg tracking-tight uppercase leading-tight mb-2">
            {data.title || chapterSlug}
          </h1>
          {data.description && (
            <p className="text-sm text-fg-secondary leading-relaxed">
              {data.description}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-10" />

        {/* Markdown Content */}
        <article className="prose prose-lg max-w-none
          prose-headings:text-fg prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-[1.75rem] prose-h2:mt-12 prose-h2:mb-4 prose-h2:leading-tight
          prose-h3:text-[1.375rem] prose-h3:mt-10 prose-h3:mb-3
          prose-p:text-[1.0625rem] prose-p:text-fg prose-p:leading-[1.75] prose-p:mb-6
          prose-a:text-accent prose-a:font-semibold hover:prose-a:underline
          prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.875rem]
          prose-pre:overflow-x-auto prose-pre:p-5 prose-pre:bg-surface-secondary
          prose-img:my-8
          prose-strong:text-fg
          prose-ul:text-fg prose-ul:leading-[1.75]
          prose-ol:text-fg prose-ol:leading-[1.75]
          prose-li:mb-2
          prose-blockquote:border-l-[3px] prose-blockquote:border-l-accent prose-blockquote:bg-accent-bg/10 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
          [&_pre]:text-[0.875rem] [&_pre]:leading-[1.6]
          [&_code]:before:content-none [&_code]:after:content-none
        ">
          <MarkdownRenderer source={content} />
        </article>

        {/* Chapter Navigation */}
        <div className="border-t border-border my-14" />
        <div className="flex items-center justify-between">
          {prevChapter ? (
            <Link
              href={`/knowledge/languages/${slug}/${prevChapter.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-fg-muted uppercase tracking-wider font-bold">Previous</div>
                <div className="text-fg group-hover:text-accent transition-colors">{prevChapter.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextChapter ? (
            <Link
              href={`/knowledge/languages/${slug}/${nextChapter.slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline group text-right"
            >
              <div>
                <div className="text-[10px] text-fg-muted uppercase tracking-wider font-bold">Next</div>
                <div className="text-fg group-hover:text-accent transition-colors">{nextChapter.title}</div>
              </div>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
          ) : (
            <Link
              href={`/knowledge/languages/${slug}`}
              className="flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <Check size={14} />
              Complete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
