/**
 * /settings/profile
 *
 * Shows user profile information from the users table.
 * Uses localStorage as primary cache, falls back to API.
 * Includes a yellow logout button.
 */

'use client';

import { useUser, useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Heading, Text, Divider, Spinner, InfoRow } from '@/presentation/__components';

interface UserProfile {
  githubEmail: string;
  githubUsername: string | null;
  displayName: string | null;
  linkedinUrl: string | null;
  githubAvatar: string | null;
  shortBio: string | null;
  currentProfession: string | null;
  experienceYears: number;
  createdAt: string;
  lastLoginAt: string | null;
}

function loadFromLocalStorage(): UserProfile | null {
  try {
    const stored = localStorage.getItem('current-user');
    if (!stored) return null;
    const data = JSON.parse(stored);
    if (data.email) {
      return {
        githubEmail: data.email,
        githubUsername: data.username || null,
        displayName: data.displayName || data.username || null,
        linkedinUrl: null,
        githubAvatar: null,
        shortBio: null,
        currentProfession: null,
        experienceYears: 0,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };
    }
  } catch {}
  return null;
}

export default function ProfilePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/'); return; }

    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) { setLoading(false); return; }

    // Try localStorage first for instant display
    const cached = loadFromLocalStorage();
    if (cached) {
      setProfile(cached);
      setLoading(false);
    }

    // Then fetch from API for up-to-date data
    fetch(`/api/portfolio/${encodeURIComponent(email)}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) throw new Error('User not found in database');
          throw new Error(`API error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.user) {
          setProfile({
            githubEmail: data.user.githubEmail,
            githubUsername: data.user.githubUsername,
            displayName: data.user.displayName,
            linkedinUrl: data.user.linkedinUrl,
            githubAvatar: data.user.githubAvatar,
            shortBio: data.user.shortBio,
            currentProfession: data.user.currentProfession,
            experienceYears: data.user.experienceYears || 0,
            createdAt: data.user.createdAt,
            lastLoginAt: data.user.lastLoginAt,
          });
          // Update localStorage with fresh data
          try {
            const currentUser = JSON.parse(localStorage.getItem('current-user') || '{}');
            localStorage.setItem('current-user', JSON.stringify({
              ...currentUser,
              email: data.user.githubEmail,
              username: data.user.githubUsername || currentUser.username,
            }));
          } catch {}
        }
        setLoading(false);
      })
      .catch((err) => {
        // If localStorage already has data, keep it and just clear the error
        if (!cached) {
          setError(err.message || 'Failed to load profile');
        }
        setLoading(false);
      });
  }, [isLoaded, isSignedIn, user, router]);

  const handleLogout = async () => {
    localStorage.removeItem('current-user');
    await signOut();
    router.push('/');
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <Heading variant="h1">My Profile</Heading>
        <Text variant="body" className="mt-4">
          {error || "Unable to load profile. Please ensure you're logged in."}
        </Text>
        {error && (
          <div className="mt-6">
            <Text variant="muted" className="mb-3">
              Try signing out and back in to sync your account.
            </Text>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                Retry
              </Button>
              <Button variant="ripple" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-6 py-16">
      <Heading variant="h1" className="mb-2">My Profile</Heading>
      <Text variant="muted" className="mb-8">Your account information and settings</Text>

      <Divider className="mb-8" />

      <div className="border border-black bg-white p-6">
        <Heading variant="h3" className="mb-6">Account Information</Heading>

        <InfoRow label="Email" value={profile.githubEmail} />
        <InfoRow label="Username" value={profile.githubUsername || '-'} />
        <InfoRow label="Display Name" value={profile.displayName || '-'} />
        <InfoRow label="Created" value={new Date(profile.createdAt).toLocaleDateString()} />
        {profile.lastLoginAt && (
          <InfoRow label="Last Login" value={new Date(profile.lastLoginAt).toLocaleDateString()} />
        )}
      </div>

      <div className="mt-8">
        <Button
          variant="ripple"
          size="default"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
