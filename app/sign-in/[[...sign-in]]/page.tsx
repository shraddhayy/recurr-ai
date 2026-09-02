import { SignIn } from "@clerk/nextjs";

import { AuthLayout } from "@/components/auth/auth-layout";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignInPage() {
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to Recurr AI"
      description="Pick up right where you left off — your subscriptions, renewals, and savings are waiting."
    >
      <SignIn
        appearance={clerkAppearance}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/overview"
      />
    </AuthLayout>
  );
}
