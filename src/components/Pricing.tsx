import { plans, studios } from "../data";
import { Reveal, SectionHeading } from "./ui";

const guarantees = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
    title: "新手友善",
    desc: "預約即享 10 分鐘專人設備教學，免擔心器材不會用！",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
      </svg>
    ),
    title: "企業便利",
    desc: "全方案支援開立二聯／三聯式電子發票，公司報帳輕鬆搞定！",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-cream py-20 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="Space & Pricing"
          title={
            <>
              兩種空間風格，
              <br className="sm:hidden" />
              四種彈性方案
            </>
          }
          desc="不論是熟練操作器材的創作者，或是希望全程被照顧的企業節目，都能找到剛剛好的選擇。"
        />

        {/* 棚型卡片 */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-2">
          {studios.map((s, i) => (
            <Reveal key={s.key} delay={i * 120}>
              <div className="group h-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(20,16,13,0.45)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(20,16,13,0.5)] sm:rounded-[2rem]">
                <div className="relative h-52 overflow-hidden sm:h-72">
                  <img
                    src={s.image}
                    alt={`${s.name}空間實景`}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-end gap-2.5 sm:bottom-5 sm:left-6 sm:gap-3">
                    <span className="text-2xl font-black text-white sm:text-3xl">{s.name}</span>
                    <span className="mb-0.5 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold text-white sm:mb-1 sm:px-3 sm:py-1 sm:text-xs">
                      {s.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-8">
                  <dl className="grid grid-cols-2 gap-3 border-b border-ink/8 pb-5 text-sm sm:gap-4 sm:pb-6">
                    <div>
                      <dt className="text-[11px] tracking-widest text-ink/40 uppercase sm:text-xs">視覺風格</dt>
                      <dd className="mt-1 text-xs font-medium text-ink/85 sm:mt-1.5 sm:text-sm">{s.style}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] tracking-widest text-ink/40 uppercase sm:text-xs">麥克風配置</dt>
                      <dd className="mt-1 text-xs font-medium text-ink/85 sm:mt-1.5 sm:text-sm">{s.mics}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                    {plans.map((p) => (
                      <div
                        key={p.key}
                        className="flex items-center justify-between gap-3 rounded-2xl bg-cream/70 px-4 py-3.5 ring-1 ring-ink/5 sm:gap-4 sm:px-5 sm:py-4"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-ink sm:text-sm">{p.name}</div>
                          <div className="mt-0.5 text-[11px] leading-relaxed text-ink/55 sm:mt-1 sm:text-xs">{p.note}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-xl font-black text-brand sm:text-2xl">
                            ${s.prices[p.key].toLocaleString()}
                          </span>
                          <span className="ml-1 text-[11px] font-medium text-ink/45 sm:text-xs">/ 小時</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-6 sm:gap-x-4 sm:gap-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[11px] text-ink/65 sm:gap-2 sm:text-xs">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-0.5 h-3 w-3 shrink-0 text-brand"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#booking"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3 text-sm font-bold text-cream transition-colors hover:bg-brand sm:mt-7 sm:py-3.5"
                  >
                    預約{s.name}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 安心預約保證 */}
        <div className="mt-8 grid gap-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-4">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="flex h-full items-start gap-3.5 rounded-2xl border border-brand/20 bg-brand/[0.06] p-5 shadow-sm sm:gap-4 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand ring-1 ring-brand/25 sm:h-11 sm:w-11">
                  {g.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{g.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-ink/65 sm:text-sm sm:leading-relaxed">{g.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-ink/40 sm:mt-6">
          所有方案皆含基本設備使用、環境清潔與現場人員協助。
        </p>
      </div>
    </section>
  );
}
