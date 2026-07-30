import { redirect } from 'next/navigation';

export default function FeedBookmarksRedirect() {
  redirect('/discover/feed/bookmarks');
}
