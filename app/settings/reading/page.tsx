/**
 * /settings/reading
 *
 * Reading settings page - font size, theme preferences, etc.
 * This is the same settings that were previously shown as a popup in reading articles.
 */

'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heading, Text, Divider, Button, Toggle, Select, type SelectOption } from '@/presentation/__components';

const fontSizes: SelectOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'base', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
];

const themes: SelectOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'sepia', label: 'Sepia' },
];

const lineHeights: SelectOption[] = [
  { value: 'relaxed', label: 'Relaxed' },
  { value: 'normal', label: 'Normal' },
  { value: 'tight', label: 'Tight' },
];

export default function ReadingSettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [fontSize, setFontSize] = useState('base');
  const [theme, setTheme] = useState('light');
  const [lineHeight, setLineHeight] = useState('relaxed');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { router.push('/'); return; }

    // Load from localStorage
    const savedSettings = localStorage.getItem('reading-settings');
    if (savedSettings) {
      try {
        const s = JSON.parse(savedSettings);
        if (s.fontSize) setFontSize(s.fontSize);
        if (s.theme) setTheme(s.theme);
        if (s.lineHeight) setLineHeight(s.lineHeight);
        if (s.showLineNumbers !== undefined) setShowLineNumbers(s.showLineNumbers);
      } catch {}
    }
  }, [isLoaded, isSignedIn, router]);

  const handleSave = () => {
    const settings = { fontSize, theme, lineHeight, showLineNumbers };
    localStorage.setItem('reading-settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 py-16">
      <Heading variant="h1" className="mb-2">Reading Settings</Heading>
      <Text variant="muted" className="mb-8">Customize your reading experience</Text>

      <Divider className="mb-8" />

      <div className="border border-border bg-white p-6 space-y-6">
        <Select
          label="Font Size"
          options={fontSizes}
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />

        <Select
          label="Theme"
          options={themes}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />

        <Select
          label="Line Height"
          options={lineHeights}
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
        />

        <Toggle
          checked={showLineNumbers}
          onChange={setShowLineNumbers}
          label="Show Line Numbers in Code Blocks"
        />

        <Divider />

        <div className="flex items-center gap-4">
          <Button variant="primary" size="default" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Settings'}
          </Button>
          {saved && (
            <Text variant="body-sm" className="text-green-600">Settings saved successfully!</Text>
          )}
        </div>
      </div>
    </div>
  );
}
