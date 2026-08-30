import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const links = [
  { id: "value", label: "核心優勢" },
  { id: "pricing", label: "空間方案" },
  { id: "equipment", label: "設備清單" },
  { id: "faq", label: "常見問題" },
  { id: "booking", label: "線上預約" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "bg-ink/85 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-lg font-black text-white shadow-lg shadow-brand/30">
            順
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-wide text-cream">順順錄音棚</span>
            <span className="block text-[10px] tracking-[0.34em] text-cream/45 uppercase">
              Soon Studio
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="relative text-sm font-medium text-cream/70 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.04]"
          >
            立即預約時段
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="開啟選單"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-cream transition-transform",
              open && "translate-y-[3.5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-cream transition-transform",
              open && "-translate-y-[3.5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-white/5 bg-ink/95 backdrop-blur-xl transition-all duration-400 lg:hidden",
          open ? "max-h-96 border-t" : "max-h-0",
        )}
      >
        <div className="flex flex-col px-6 py-3">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-3.5 text-sm text-cream/80 last:border-0"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
