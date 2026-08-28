import { Reveal, SectionHeading } from "./ui";

const items = [
  {
    no: "01",
    title: "頂級硬體配置，原音重現",
    desc: "搭載 RODE 專業混音台與鐵三角動圈麥克風，完美捕捉人聲細節，呈現最真實的聲音質感。",
    icon: (
      <>
        <path d="M12 3v10" />
        <path d="M8 8a4 4 0 0 1 8 0v3a4 4 0 0 1-8 0z" />
        <path d="M5 12a7 7 0 0 0 14 0" />
        <path d="M12 19v3" />
      </>
    ),
  },
  {
    no: "02",
    title: "多變風格，零干擾空間",
    desc: "提供專業書牆、舒適沙發等兩種視覺風格選擇。配合環境聲學控管，隔絕外界喧囂。",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16" />
        <path d="M13 9h4" />
        <path d="M13 14h4" />
      </>
    ),
  },
  {
    no: "03",
    title: "錄音師駐點，零技術門檻",
    desc: "提供 Adobe Audition 專業多軌錄製，錄音師全程跟錄與技術支援，保障音檔完美無瑕。",
    icon: (
      <>
        <path d="M3 12h3l2-6 4 14 3-11 2 3h4" />
      </>
    ),
  },
];

export default function Values() {
  return (
    <section id="value" className="relative bg-ink py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why Soon Studio"
          title={
            <>
              <span className="block sm:inline">一個讓聲音</span>
              <span className="text-brand-soft">被好好對待</span>
              <span>的地方</span>
            </>
          }
          desc="從硬體、空間到人力支援，我們把所有繁瑣的技術細節都準備好，你只需要專注在說話這件事。"
        />

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.no} delay={i * 110}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/40 sm:p-8">
                <div className="absolute -top-8 -right-4 text-[5.5rem] leading-none font-black text-white/[0.04] transition-colors group-hover:text-brand/10 sm:text-[6rem]">
                  {it.no}
                </div>
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand-soft ring-1 ring-brand/25 sm:h-14 sm:w-14">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 sm:h-7 sm:w-7"
                  >
                    {it.icon}
                  </svg>
                </div>
                <h3 className="relative mt-6 text-lg font-bold text-cream sm:mt-7 sm:text-xl">{it.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-cream/65 sm:mt-4 sm:leading-loose">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
