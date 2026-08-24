import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";

import { Navbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { ProblemSection } from "@/components/marketing/problem-section";
import { TransformationSection } from "@/components/marketing/transformation-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { SavingsSection } from "@/components/marketing/savings-section";
import { AiSection } from "@/components/marketing/ai-section";
import { RenewalSection } from "@/components/marketing/renewal-section";
import { DuplicateDetection } from "@/components/marketing/duplicate-detection";
import { TrustSection } from "@/components/marketing/trust-section";
import { FinalCta } from "@/components/marketing/final-cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Recurr AI — Turn recurring spending into something you control",
  description:
    "Recurr AI brings every subscription into one clear view — track renewals, spot duplicates, and find real savings on the money that leaves your account every month.",
};

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-surface-page">
        <Navbar />
        <main>
          <Hero />
          <ProblemSection />
          <TransformationSection />
          <HowItWorks />
          <ProductShowcase />
          <SavingsSection />
          <AiSection />
          <RenewalSection />
          <DuplicateDetection />
          <TrustSection />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
