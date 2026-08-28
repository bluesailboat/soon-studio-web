import { useState } from "react";
import { faqs } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="常見問題解答"
          desc="還有其他疑問嗎？歡迎透過官方 LINE 直接詢問，我們會盡快回覆。"
        />

        <div className="mt-14 space-y-3">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    active ? "border-brand/40 bg-white/[0.05]" : "border-white/8 bg-white/[0.02]",
                  )}
                >
                  <button
                    onClick={() => setOpen(active ? null : i)}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "shrink-0 text-sm font-black transition-colors",
                        active ? "text-brand-soft" : "text-cream/35",
                      )}
                    >
                      Q{i + 1}
                    </span>
                    <span className="flex-1 text-sm font-bold text-cream sm:text-base">{f.q}</span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        active
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-cream/20 text-cream/50",
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-400 ease-out",
                      active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[3.9rem] text-sm leading-loose text-cream/60">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
