import {
  AudioLines,
  Camera,
  Headphones,
  Layers,
  Mic,
  MoveVertical,
  Podcast,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import type { ReactNode } from "react";
import { equipments } from "../data";
import { Reveal, SectionHeading } from "./ui";

const equipmentIcons: Record<string, ReactNode> = {
  "RODE CASTER PRO II": <SlidersHorizontal className="h-5 w-5" strokeWidth={1.8} />,
  "SHURE MV7X": <Mic className="h-5 w-5" strokeWidth={1.8} />,
  "鐵三角 AT2040": <Podcast className="h-5 w-5" strokeWidth={1.8} />,
  "鐵三角 AT8700J": <MoveVertical className="h-5 w-5" strokeWidth={1.8} />,
  "HERCULES MS432B / MS533B": <Layers className="h-5 w-5" strokeWidth={1.8} />,
  "ALCTRON PF04（雙層防護款）": <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />,
  "SONY 監聽耳機": <Headphones className="h-5 w-5" strokeWidth={1.8} />,
  "Adobe Audition（專業多軌錄音）": <AudioLines className="h-5 w-5" strokeWidth={1.8} />,
  "SONY α7": <Camera className="h-5 w-5" strokeWidth={1.8} />,
};

export default function Equipment() {
  return (
    <section id="equipment" className="relative overflow-hidden bg-ink-2 py-20 sm:py-32">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Equipments"
              title={
                <>
                  全套專業陣容，
                  <br />
                  開錄就是最佳狀態
                </>
              }
              desc="從麥克風、混音台到監聽與影像支援，皆採業界標準配置，並由錄音師定期校調與保養。"
            />
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-white/10 sm:mt-10">
                <img
                  src="/images/gear.jpg"
                  alt="RODECaster Pro II 混音台與動圈麥克風實拍"
                  className="h-56 w-full object-cover sm:h-80"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
            {equipments.map((e, i) => (
              <Reveal key={e.name} delay={i * 60}>
                <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06] sm:gap-4 sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-soft ring-1 ring-brand/25 transition-colors group-hover:bg-brand group-hover:text-white sm:h-11 sm:w-11">
                    {equipmentIcons[e.name] ?? <Mic className="h-5 w-5" strokeWidth={1.8} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] tracking-[0.2em] text-brand-soft/80 uppercase sm:text-[11px]">
                      {e.cat}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-cream sm:text-base">{e.name}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
