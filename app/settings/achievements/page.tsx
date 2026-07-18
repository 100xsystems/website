/**
 * /settings/achievements
 *
 * Shows all user achievements in a beautiful 2-column grid with icons
 * based on achievement_type (bronze, silver, gold, completed).
 * Fetches data from the dedicated achievements API.
 */

'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heading, Text, Divider, Spinner, AnimatedIcon } from '@/presentation/__components';
import { cn } from '@/application/lib/utils';

interface Achievement {
  systemSlug: string;
  trackSlug: string;
  lessonSlug: string;
  achievement: string;
  achievementType: string;
  updatedAt: string;
}

const achievementStyles: Record<string, { bg: string; text: string; border: string; icon: string; iconColor: string }> = {
  gold: {
    bg: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-300',
    icon: 'star',
    iconColor: '#f59e0b',
  },
  silver: {
    bg: 'bg-gradient-to-br from-slate-50 to-gray-50',
    text: 'text-slate-800',
    border: 'border-slate-300',
    icon: 'star',
    iconColor: '#94a3b8',
  },
  bronze: {
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-400',
    icon: 'star',
    iconColor: '#d97706',
  },
  completed: {
    bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    text: 'text-purple-900',
    border: 'border-purple-300',
    icon: 'check',
    iconColor: '#7c3aed',
  },
};

const defaultStyle = {
  bg: 'bg-white',
  text: 'text-fg',
  border: 'border-border',
  icon: 'star',
  iconColor: '#a3a3a3',
};

export default function AchievementsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/'); return; }

    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) { setLoading(false); return; }

    // Fetch from dedicated achievements API
    fetch(`/api/v1/achievements/${encodeURIComponent(email)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.achievements) {
          setAchievements(data.achievements);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('[achievements] API error, showing empty:', err);
        setLoading(false);
      });
  }, [isLoaded, isSignedIn, user, router]);

  const getStyle = (type: string) => achievementStyles[type.toLowerCase()] || defaultStyle;

  const getIconName = (type: string, index: number) => {
    const style = getStyle(type);
    // Use known Lucide icons from the AnimatedIcon component set
    const icons: string[] = ['star', 'heart', 'check', 'bookmark', 'clock', 'settings', 'user', 'mail'];
    // For achievement type, use a consistent icon
    if (style.icon === 'star' && index % 3 === 1) return 'heart';
    if (style.icon === 'star' && index % 3 === 2) return 'check';
    if (style.icon === 'check') return 'check';
    return icons[index % icons.length];
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-4">
        <Heading variant="h1" className="mb-2">My Achievements</Heading>
        <Text variant="muted">
          {achievements.length > 0
            ? `You've earned ${achievements.length} achievement${achievements.length !== 1 ? 's' : ''} so far`
            : 'Badges and milestones you\'ve earned'}
        </Text>
      </div>
      <Divider className="mb-10" />

      {achievements.length === 0 ? (
        <div className="border border-black bg-white p-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-bg mb-6">
            <AnimatedIcon name="star" size={32} color="#a3a3a3" isAnimated={false} />
          </div>
          <Heading variant="h3" className="mt-4">No achievements yet</Heading>
          <Text variant="body" className="mt-2 max-w-sm mx-auto">
            Complete lessons, pass validations, and finish systems to earn achievements and badges.
          </Text>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {achievements.map((a, i) => {
            const style = getStyle(a.achievementType);
            return (
              <div
                key={i}
                className={cn(
                  'border-2 p-6 flex items-start gap-5',
                  'transition-all duration-300 ease-out',
                  'hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]',
                  'hover:-translate-y-0.5',
                  style.bg,
                  style.border,
                )}
              >
                {/* Icon */}
                <div className={cn(
                  'shrink-0 w-12 h-12 flex items-center justify-center',
                  'bg-white/80 backdrop-blur-sm border border-white/50',
                )}>
                  <AnimatedIcon
                    name={getIconName(a.achievementType, i)}
                    size={24}
                    color={style.iconColor}
                    isAnimated={true}
                    duration={0.6}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <Text variant="body" className={cn('font-bold text-base', style.text)}>
                    {a.achievement}
                  </Text>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 border',
                      style.border,
                      style.text,
                      style.bg,
                    )}>
                      {a.achievementType}
                    </span>
                    <Text variant="caption" className="text-fg-muted">
                      {new Date(a.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
