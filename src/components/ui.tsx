import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/** 進場時淡入上移 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <div
        className={cn(
          "mb-4 inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase",
          dark ? "text-brand" : "text-brand",
        )}
      >
        <span className="h-px w-8 bg-brand/60" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "text-3xl leading-tight font-bold sm:text-4xl md:text-[2.75rem]",
          dark ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {desc && (
        <p className={cn("mt-5 text-base leading-relaxed", dark ? "text-ink/65" : "text-cream/60")}>
          {desc}
        </p>
      )}
    </div>
  );
}

/** 滑鼠移入顯示的浮動資訊 */
export function Hint({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("group/hint relative inline-flex items-center", className)}>
      <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-current text-[10px] leading-none opacity-60">
        i
      </span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-52 -translate-x-1/2 translate-y-1 rounded-xl bg-ink px-3 py-2 text-xs leading-relaxed font-normal text-cream/90 opacity-0 shadow-xl ring-1 ring-white/10 transition-all duration-200 group-hover/hint:translate-y-0 group-hover/hint:opacity-100">
        {text}
      </span>
    </span>
  );
}
