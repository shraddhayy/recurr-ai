"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";

import { RecurrLogo } from "@/components/shell/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { completeOnboarding, type OnboardingData } from "@/lib/onboarding";
import { cn } from "@/lib/utils";

const goalOptions = [
  "Reduce monthly spending",
  "Find duplicate subscriptions",
  "Track upcoming renewals",
  "Understand my subscription spending",
  "Everything",
];

const TOTAL_STEPS = 3;

export function OnboardingFlow({ defaultName }: { defaultName: string }) {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    displayName: defaultName,
    currency: "INR",
    goals: [],
  });

  const canContinue =
    step === 1 ? Boolean(data.displayName?.trim()) : step === 2 ? Boolean(data.currency) : true;

  function toggleGoal(goal: string) {
    setData((d) => ({
      ...d,
      goals: d.goals?.includes(goal) ? d.goals.filter((g) => g !== goal) : [...(d.goals ?? []), goal],
    }));
  }

  async function handleFinish() {
    if (!user) return;
    setSubmitting(true);
    try {
      await completeOnboarding(user, data);
      router.push("/overview");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-surface-page px-4 py-10">
      <div className="mb-10">
        <RecurrLogo />
      </div>

      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="mb-8 flex items-center gap-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                i < step ? "bg-primary-600" : "bg-neutral-150"
              )}
            />
          ))}
        </div>
        <p className="mb-6 text-[12px] font-medium text-text-muted">
          Step {Math.min(step, TOTAL_STEPS)} of {TOTAL_STEPS}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 1 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="font-display text-[24px] font-medium tracking-tight text-text-primary">
                    What should we call you?
                  </h1>
                  <p className="mt-1.5 text-[14px] text-text-secondary">
                    Let&apos;s make your subscriptions work smarter.
                  </p>
                </div>
                <Input
                  autoFocus
                  placeholder="Your name"
                  value={data.displayName}
                  onChange={(e) => setData((d) => ({ ...d, displayName: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canContinue) setStep(2);
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="font-display text-[24px] font-medium tracking-tight text-text-primary">
                    What currency do you primarily use?
                  </h1>
                  <p className="mt-1.5 text-[14px] text-text-secondary">
                    You can change this anytime in Settings.
                  </p>
                </div>
                <Select
                  value={data.currency}
                  onValueChange={(v) => setData((d) => ({ ...d, currency: v as OnboardingData["currency"] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">₹ INR — Indian Rupee</SelectItem>
                    <SelectItem value="USD">$ USD — US Dollar</SelectItem>
                    <SelectItem value="EUR">€ EUR — Euro</SelectItem>
                    <SelectItem value="GBP">£ GBP — British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h1 className="font-display text-[24px] font-medium tracking-tight text-text-primary">
                    What do you want Recurr AI to help you with?
                  </h1>
                  <p className="mt-1.5 text-[14px] text-text-secondary">Pick as many as apply.</p>
                </div>
                <div className="flex flex-col gap-2.5">
                  {goalOptions.map((goal) => {
                    const active = data.goals?.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={cn(
                          "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-[13.5px] font-medium transition-colors",
                          active
                            ? "border-primary-300 bg-primary-50 text-primary-900"
                            : "border-border-default bg-surface-card text-text-primary hover:bg-surface-muted"
                        )}
                      >
                        {goal}
                        {active && <Check className="size-4 text-primary-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft className="size-4" />
              Back
            </Button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS ? (
            <Button disabled={!canContinue} onClick={() => setStep((s) => s + 1)}>
              Continue
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button loading={submitting} onClick={handleFinish}>
              <Sparkles className="size-4" />
              Open my dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
