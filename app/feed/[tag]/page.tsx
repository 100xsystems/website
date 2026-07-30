import { redirect } from 'next/navigation';

export default async function FeedTagRedirect({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  redirect(`/discover/feed/${tag}`);
}
