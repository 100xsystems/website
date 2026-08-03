/**
 * ## Course Status
 *
 * Determines whether a knowledge hub (language / principle / pattern / tool /
 * technology / case-study) has a complete course, an in-progress course, or
 * only curated resources.
 *
 * Rules (derived from registry data):
 *  - **complete**  → ≥ 8 lessons (the registry ships full 21-lesson courses)
 *  - **in-progress** → 1–7 lessons (skeleton/stub courses — e.g. "Fundamentals" + "Practical Guide")
 *  - **resources-only** → no lessons at all (curated resources hub)
 */

export type CourseStatus = 'complete' | 'in-progress' | 'resources-only';

export interface LessonMetaLite {
  slug: string;
  title: string;
  description?: string;
  type?: string;
  order?: number;
  duration?: string;
  difficulty?: string;
}

/** Full-course threshold — a real course is 8+ lessons. */
export const COMPLETE_THRESHOLD = 8;

/** Classify a hub by its lesson list. */
export function classifyCourse(lessons: LessonMetaLite[] | undefined | null): CourseStatus {
  const count = lessons?.length ?? 0;
  if (count >= COMPLETE_THRESHOLD) return 'complete';
  if (count > 0) return 'in-progress';
  return 'resources-only';
}

/** Human label + colors for a status. */
export function courseStatusMeta(status: CourseStatus): {
  label: string;
  className: string;
  dot: string;
} {
  switch (status) {
    case 'complete':
      return {
        label: 'Full course',
        className: 'bg-accent text-white',
        dot: 'bg-white',
      };
    case 'in-progress':
      return {
        label: 'Course in progress',
        className: 'bg-accent-yellow text-black',
        dot: 'bg-black',
      };
    default:
      return {
        label: 'Resources only',
        className: 'bg-surface-secondary text-fg-muted',
        dot: 'bg-fg-muted',
      };
  }
}

/** Total lesson duration estimate in minutes (used for course cards). */
export function totalCourseMinutes(lessons: LessonMetaLite[] | undefined | null): number {
  if (!lessons) return 0;
  return lessons.reduce((sum, l) => {
    const raw = l.duration;
    if (raw == null) return sum;
    if (typeof raw === 'number') return sum + raw;
    if (typeof raw === 'string') {
      const m = raw.match(/(\d+)\s*min/i);
      return sum + (m ? parseInt(m[1], 10) : 0);
    }
    return sum;
  }, 0);
}

/** Format minutes into a readable duration string. */
export function formatMinutes(minutes: number): string {
  if (minutes <= 0) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}
