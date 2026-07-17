/**
 * ## Application: Hooks Barrel
 *
 * Re-exports all application-level React hooks for
 * convenient imports.
 *
 * @packageDocumentation
 */

export { useContactForm } from './contact.hooks';
export type { ContactFormData, UseContactFormReturn } from './contact.hooks';

export { useUserAchievements } from './achievements.hooks';
export type { UseUserAchievementsReturn } from './achievements.hooks';

export { useLoadingScreen } from './loadingScreen.hooks';

export { useMemory } from './memory.hooks';

export { useVideoAutoplay } from './videoAutoplay.hooks';
