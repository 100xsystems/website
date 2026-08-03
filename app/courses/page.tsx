import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getLanguagesWithResources,
  getLanguageResources,
  refreshLanguageResourcesIfStale,
} from '@/lib/language-resources';
import { getHubs } from '@/lib/knowledge-resources';
import { getLangIcon, getLangBg } from '@/lib/language-icons';
import { classifyCourse, courseStatusMeta, totalCourseMinutes, formatMinutes } from '@/lib/course-status';

export const metadata: Metadata = {
  title: 'Courses — Knowledge Base',
  description:
    'Every available course in the 100xSystems knowledge base — complete language courses, principles, patterns, tools, and technologies. All free.',
};

export const revalidate = 3600;

interface CourseEntry {
  category: string;
  categoryLabel: string;
  slug: string;
  name: string;
  description: string;
  lessons: number;
  status: 'complete' | 'in-progress' | 'resources-only';
  minutes: number;
  href: string;
  iconSlug?: string;
}

const CATEGORY_ORDER: Array<{ key: string; label: string; blurb: string }> = [
  { key: 'ai', label: 'AI', blurb: 'Twelve complete courses: data science, ML, deep learning, computer vision, NLP, generative AI, RL, MLOps, LLM engineering, agents, prompt engineering and AI safety.' },
  { key: 'languages', label: 'Languages', blurb: 'Complete 21-lesson courses from first program to expert patterns.' },
  { key: 'principles', label: 'Principles', blurb: 'The “why” behind architecture and code quality.' },
  { key: 'patterns', label: 'Patterns', blurb: 'Design patterns and blueprints for real systems.' },
  { key: 'technologies', label: 'Technologies', blurb: 'Key platforms and technologies, with courses.' },
  { key: 'tools', label: 'Tools', blurb: 'Essential dev tools and infrastructure.' },
  { key: 'case-studies', label: 'Case Studies', blurb: 'Real systems analyzed and explained.' },
];

function collectCourses(): CourseEntry[] {
  const entries: CourseEntry[] = [];

  // Languages (folder-based hub data with lessons)
  for (const slug of getLanguagesWithResources()) {
    const res = getLanguageResources(slug);
    if (!res) continue;
    entries.push({
      category: 'languages',
      categoryLabel: 'Languages',
      slug,
      name: res.name,
      description: res.description,
      lessons: res.lessons?.length ?? 0,
      status: classifyCourse(res.lessons),
      minutes: totalCourseMinutes(res.lessons),
      href: `/knowledge/languages/${slug}`,
      iconSlug: slug,
    });
  }

  // Generic hub categories (principles, patterns, technologies, case-studies)
  for (const { key } of CATEGORY_ORDER) {
    if (key === 'languages') continue;
    const hubs = getHubs(key);
    for (const hub of hubs) {
      entries.push({
        category: key,
        categoryLabel: key,
        slug: hub.slug,
        name: hub.name,
        description: hub.description,
        lessons: hub.lessons?.length ?? 0,
        status: classifyCourse(hub.lessons),
        minutes: totalCourseMinutes(hub.lessons),
        href: `/knowledge/${key}/${hub.slug}`,
        iconSlug: hub.slug,
      });
    }
  }

  return entries;
}

export default function CoursesPage() {
  // ISR: pull fresh registry data before listing all courses.
  refreshLanguageResourcesIfStale();

  const courses = collectCourses();
  const complete = courses.filter((c) => c.status === 'complete').length;
  const inProgress = courses.filter((c) => c.status === 'in-progress').length;
  const totalLessons = courses.reduce((s, c) => s + c.lessons, 0);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent text-white mb-5">
              KNOWLEDGE BASE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight uppercase leading-none mb-4">
              All&nbsp;<span className="text-accent">Courses</span>
            </h1>
            <p className="text-sm text-fg-secondary max-w-xl mx-auto">
              Every course in the knowledge base — languages, principles, patterns, tools,
              and technologies. Structured, free, and complete. No sign-up required.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{courses.length}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Hubs</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{complete}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Full courses</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{inProgress}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">In progress</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-fg">{totalLessons}</span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-1">Lessons</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course groups */}
      {CATEGORY_ORDER.map(({ key, label, blurb }) => {
        const group = courses.filter((c) => c.category === key);
        if (group.length === 0) return null;
        const completeCount = group.filter((c) => c.status === 'complete').length;
        return (
          <section key={key} className="py-14 sm:py-16 bg-white border-t border-border">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
              <div className="flex items-center justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-fg tracking-tight uppercase">
                    {label}
                    <span className="text-accent ml-3">({group.length})</span>
                  </h2>
                  <p className="mt-1 text-sm text-fg-secondary">{blurb}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="block text-2xl font-extrabold text-fg tabular-nums">{completeCount}</span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-fg-muted">Full courses</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 bg-surface-secondary">
                {group.map((course) => {
                  const meta = courseStatusMeta(course.status);
                  return (
                    <Link
                      key={`${course.category}-${course.slug}`}
                      href={course.href}
                      className="group flex flex-col justify-between gap-4 p-6 bg-white transition-all duration-200 hover:bg-accent"
                    >
                      <div className="flex items-start gap-4">
                        {course.iconSlug && getLangIcon(course.iconSlug) ? (
                          <span className={`inline-flex items-center justify-center w-12 h-12 shrink-0 ${getLangBg(course.iconSlug)}`}>
                            {getLangIcon(course.iconSlug, 22)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-12 h-12 shrink-0 bg-surface-secondary text-fg-muted group-hover:bg-white/20 group-hover:text-white transition-colors text-sm font-extrabold">
                            {course.name.charAt(0)}
                          </span>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-bold uppercase tracking-wide text-fg group-hover:text-white transition-colors mb-1">
                            {course.name}
                          </h3>
                          <p className="text-xs text-fg-secondary leading-relaxed group-hover:text-white/80 transition-colors line-clamp-2">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider transition-colors ${meta.className} ${
                          course.status === 'complete' ? 'group-hover:bg-white group-hover:text-accent' : 'group-hover:bg-white/20 group-hover:text-white'
                        }`}>
                          {course.status === 'complete'
                            ? `Full course · ${course.lessons} lessons`
                            : course.status === 'in-progress'
                              ? `In progress · ${course.lessons} lessons`
                              : 'Resources only'}
                        </span>
                        {course.minutes > 0 && (
                          <span className="text-[9px] text-fg-muted group-hover:text-white/70 transition-colors">
                            ~{formatMinutes(course.minutes)}
                          </span>
                        )}
                        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-accent group-hover:text-white/70 transition-colors">
                          &rarr;
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
