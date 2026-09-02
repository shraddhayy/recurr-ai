import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { hasCompletedOnboarding } from "@/lib/onboarding";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export default async function OnboardingPage() {
  // proxy.ts already guarantees a signed-in user reaches this point.
  const user = await currentUser();
  if (user && hasCompletedOnboarding(user.unsafeMetadata)) {
    redirect("/overview");
  }

  return <OnboardingFlow defaultName={user?.firstName ?? ""} />;
}
