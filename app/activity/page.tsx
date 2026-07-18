/**
 * /activity
 *
 * Redirects to /settings/activity which has the same functionality
 * but is accessible only to signed-in users as part of settings.
 */

import { redirect } from 'next/navigation';

export default function ActivityPage() {
  redirect('/settings/activity');
}
