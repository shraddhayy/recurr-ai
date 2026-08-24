"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, motion, AnimatePresence } from "framer-motion";
import { Sparkles, CornerDownRight, Check } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { AmbientBackground } from "@/components/marketing/ambient-background";
import { aiConversation } from "@/lib/marketing-data";

function useTypedText(text: string, active: boolean, speed = 18) {
  const shouldReduceMotion = useReducedMotion();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!active || shouldReduceMotion) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed, shouldReduceMotion]);

  if (shouldReduceMotion) return active ? text : "";
  return typed;
}

export function AiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const [stage, setStage] = useState(0);
  // 0: nothing, 1: question shown, 2: answer typing, 3: follow-up shown, 4: recommendation shown

  useEffect(() => {
    if (!inView) return;
    const delays = shouldReduceMotion ? [0, 50, 100, 150] : [300, 900, 2600, 3300];
    const timers = delays.map((d, i) => setTimeout(() => setStage(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, [inView, shouldReduceMotion]);

  const answer = useTypedText(aiConversation.answer, stage >= 2, 14);

  return (
    <section id="ai" className="relative overflow-hidden border-t border-divider bg-neutral-950 py-20 sm:py-28">
      <AmbientBackground variant="dark" className="-z-10" />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI"
          title="Ask Recurr AI. Get a straight answer."
          description="Not a chatbot bolted onto a spreadsheet — an assistant that already understands your recurring spend."
          align="center"
          tone="dark"
        />

        <div ref={ref} className="mx-auto mt-14 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary-600">
              <Sparkles className="size-4 text-white" />
            </span>
            <span className="text-[13px] font-medium text-white">Recurr AI</span>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence>
              {stage >= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-[14px] text-white"
                >
                  {aiConversation.question}
                </motion.div>
              )}
            </AnimatePresence>

            {stage >= 2 && (
              <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-primary-600/15 px-4 py-3 text-[14px] leading-relaxed text-neutral-100">
                {answer}
                {stage === 2 && answer.length < aiConversation.answer.length && (
                  <span className="ml-0.5 inline-block h-[13px] w-[2px] animate-pulse bg-primary-300 align-middle" />
                )}
              </div>
            )}

            <AnimatePresence>
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-auto flex items-center gap-1.5 rounded-2xl rounded-tr-sm bg-white/10 px-4 py-2.5 text-[14px] text-white"
                >
                  <CornerDownRight className="size-3.5 text-neutral-300" />
                  {aiConversation.followUp}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-[90%] rounded-2xl rounded-tl-sm border border-primary-500/30 bg-primary-600/10 p-4"
                >
                  <ul className="flex flex-col gap-2.5">
                    {aiConversation.recommendation.map((line) => (
                      <li key={line} className="flex items-start gap-2 text-[13px] leading-relaxed text-neutral-100">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-primary-400" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
