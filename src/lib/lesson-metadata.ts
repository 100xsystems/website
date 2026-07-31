/**
 * ## Lesson Metadata (server-safe)
 *
 * buildLessonMetadata is called from generateMetadata() in route wrappers,
 * which executes on the server. It must therefore live in a module WITHOUT
 * a 'use client' directive — importing it from a client component file
 * throws "Attempted to call buildLessonMetadata() from the server but
 * buildLessonMetadata is on the client."
 *
 * The client-side lesson page imports LessonMetaFE as a type only.
 */

// ─── Types ──────────────────────────────────────────────────────────

export interface LessonMetaFE {
  slug: string;
  title: string;
  type?: string;
  duration?: string;
  difficulty?: string;
  description?: string;
  level?: string;
}

// ─── Metadata builder ───────────────────────────────────────────────

/** Build Metadata for a lesson page (for generateMetadata in route wrappers) */
export function buildLessonMetadata(
  hubName: string,
  lessonSlug: string,
  lessons?: LessonMetaFE[],
): { title: string } {
  const lesson = lessons?.find((l) => l.slug === lessonSlug);
  return { title: `${lesson?.title || lessonSlug} — ${hubName}` };
}
