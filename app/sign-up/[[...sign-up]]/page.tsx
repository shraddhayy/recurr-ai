import { SignUp } from "@clerk/nextjs";

import { AuthLayout } from "@/components/auth/auth-layout";
import { clerkAppearance } from "@/lib/clerk-appearance";

export default function SignUpPage() {
  return (
    <AuthLayout
      eyebrow="Get started free"
      title="Create your Recurr AI account"
      description="Two minutes to see every recurring charge in one place — no card required."
    >
      <SignUp
        appearance={clerkAppearance}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
      />
    </AuthLayout>
  );
}
