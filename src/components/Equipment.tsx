import { equipments } from "../data";
import { Reveal, SectionHeading } from "./ui";

export default function Equipment() {
  return (
    <section id="equipment" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-brand/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr]">
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
              <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-white/10">
                <img
                  src="/images/gear.jpg"
                  alt="RODECaster Pro II 混音台與動圈麥克風實拍"
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {equipments.map((e, i) => (
              <Reveal key={e.name} delay={i * 60}>
                <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.06]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/12 text-xl ring-1 ring-brand/20">
                    {e.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[11px] tracking-[0.2em] text-brand-soft/80 uppercase">
                      {e.cat}
                    </div>
                    <div className="mt-1 text-sm font-bold text-cream">{e.name}</div>
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
