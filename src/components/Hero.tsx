import { Reveal } from "./ui";

const stats = [
  { k: "2", u: "間", label: "風格獨立錄音棚" },
  { k: "4", u: "支", label: "最高麥克風配置" },
  { k: "10", u: "分鐘", label: "新手專人教學" },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      <img
        src="/images/studio-1.jpg"
        alt="順順錄音棚一棚：專業書牆與皮革沙發錄音空間"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      <div className="grain absolute inset-0 opacity-60" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-medium tracking-widest text-brand-soft backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-soft opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-soft" />
              </span>
              TAIPEI · 中山區 PODCAST STUDIO
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="text-[2.6rem] leading-[1.12] font-black tracking-tight text-cream sm:text-6xl lg:text-[4.4rem]">
              專注說好你的故事
              <span className="mt-2 block">
                <span className="relative inline-block text-brand-soft">
                  「順順」
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded bg-brand/70" />
                </span>
                成就每個動人細節
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-xl text-base leading-loose text-cream/70 sm:text-lg">
              台北中山區高質感 Podcast 錄音空間，
              <br className="hidden sm:block" />
              提供專業設備與錄音師駐點服務。
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="group relative overflow-hidden rounded-full bg-brand px-9 py-4 text-base font-bold text-white shadow-2xl shadow-brand/30 transition-transform hover:scale-[1.03]"
              >
                <span className="relative z-10">立即預約時段</span>
                <span className="absolute inset-0 translate-y-full bg-white/15 transition-transform duration-300 group-hover:translate-y-0" />
              </a>
              <a
                href="#pricing"
                className="rounded-full border border-cream/25 px-8 py-4 text-base font-medium text-cream/90 backdrop-blur transition-colors hover:border-cream/60 hover:bg-white/5"
              >
                查看棚型與價格
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline gap-1 text-brand-soft">
                    <span className="text-3xl font-black">{s.k}</span>
                    <span className="text-sm font-medium">{s.u}</span>
                  </div>
                  <div className="mt-1 text-xs tracking-wide text-cream/50">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
