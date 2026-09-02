/**
 * TEMPORARY (pre-Phase 4) onboarding-completion tracking.
 *
 * There's no database yet, so "has this user finished onboarding?" is
 * stored on the Clerk user object itself via `unsafeMetadata` — real,
 * persisted, synced across devices, but still just a flag on the auth
 * provider rather than a proper row in our own data model.
 *
 * Everything that reads or writes this flag goes through the two
 * functions below. When Phase 4 (Prisma + PostgreSQL) lands, onboarding
 * completion — and the answers collected during it — should move to a
 * `UserProfile` table keyed by Clerk's `userId`. At that point, only this
 * file needs to change: swap the bodies below for real database calls and
 * every call site (the onboarding page, the dashboard layout guard)
 * keeps working unmodified.
 */

export interface OnboardingData {
  displayName?: string;
  currency?: "INR" | "USD" | "EUR" | "GBP";
  goals?: string[];
}

type OnboardingMetadata = OnboardingData & { onboardingComplete?: boolean };

/** Server-side read — used by the dashboard layout to decide whether to redirect to /onboarding. */
export function hasCompletedOnboarding(
  metadata: Record<string, unknown> | null | undefined
): boolean {
  return Boolean((metadata as OnboardingMetadata | undefined)?.onboardingComplete);
}

/** The minimal slice of Clerk's User object this helper actually needs. */
interface UpdatableUser {
  unsafeMetadata: Record<string, unknown>;
  update: (params: { unsafeMetadata: Record<string, unknown> }) => Promise<unknown>;
}

/** Client-side write — called from the onboarding flow's final step. */
export async function completeOnboarding(user: UpdatableUser, data: OnboardingData) {
  await user.update({
    unsafeMetadata: {
      ...user.unsafeMetadata,
      ...data,
      onboardingComplete: true,
    },
  });
}
