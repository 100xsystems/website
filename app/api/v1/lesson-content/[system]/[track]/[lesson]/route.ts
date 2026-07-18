/**
 * GET /api/v1/lesson-content/:system/:track/:lesson
 *
 * Serves the full lesson content (markdown + frontmatter) from the
 * curriculum directory, so the client-side lesson page can render
 * the actual lesson content without hardcoded fallbacks.
 */

import { NextResponse } from 'next/server';
import { getLessonBySlug } from '@/lib/mdx';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ system: string; track: string; lesson: string }> }
) {
  const { system, track, lesson } = await params;

  try {
    const lessonData = getLessonBySlug(system, lesson);

    if (!lessonData) {
      return NextResponse.json(
        { error: 'Lesson not found', slug: lesson },
        { status: 404 }
      );
    }

    return NextResponse.json({
      slug: lessonData.slug,
      title: lessonData.title,
      content: lessonData.content,
      frontmatter: lessonData.frontmatter,
      type: lessonData.frontmatter.type || 'lesson',
      track: lessonData.track,
      module: lessonData.module,
      estimatedTime: lessonData.estimatedTime,
      difficulty: lessonData.difficulty,
      knowledgeRefs: lessonData.knowledgeRefs,
      prerequisites: lessonData.prerequisites,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to fetch lesson: ${err.message}` },
      { status: 500 }
    );
  }
}
