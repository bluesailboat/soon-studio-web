import { useState } from "react";
import { faqs } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="常見問題解答"
          desc={
            <>
              還有其他疑問嗎？歡迎透過{" "}
              <a href="https://lin.ee/3qxucJc" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                官方 LINE
              </a>{" "}
              直接詢問，我們會盡快回覆。
            </>
          }
        />

        <div className="mt-10 space-y-2.5 sm:mt-14 sm:space-y-3">
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
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
                  >
                    <span
                      className={cn(
                        "shrink-0 text-xs font-black transition-colors sm:text-sm",
                        active ? "text-brand-soft" : "text-cream/35",
                      )}
                    >
                      Q{i + 1}
                    </span>
                    <span className="flex-1 text-sm leading-snug font-bold text-cream sm:text-base">{f.q}</span>
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-7 sm:w-7",
                        active
                          ? "rotate-45 border-brand bg-brand text-white"
                          : "border-cream/20 text-cream/50",
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 sm:h-3.5 sm:w-3.5">
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
                      <p className="px-4 pb-4.5 text-xs leading-relaxed text-cream/65 sm:px-6 sm:pb-6 sm:pl-[3.9rem] sm:text-sm sm:leading-loose">
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
