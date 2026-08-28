import { plans, studios } from "../data";
import { Reveal, SectionHeading } from "./ui";

const guarantees = [
  {
    icon: "💡",
    title: "新手友善",
    desc: "預約即享 10 分鐘專人設備教學，免擔心器材不會用！",
  },
  {
    icon: "🏢",
    title: "企業便利",
    desc: "全方案支援開立二聯／三聯式電子發票，公司報帳輕鬆搞定！",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-cream py-24 text-ink sm:py-32">
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
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {studios.map((s, i) => (
            <Reveal key={s.key} delay={i * 120}>
              <div className="group h-full overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_-30px_rgba(20,16,13,0.45)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-30px_rgba(20,16,13,0.5)]">
                <div className="relative h-60 overflow-hidden sm:h-72">
                  <img
                    src={s.image}
                    alt={`${s.name}空間實景`}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                  <div className="absolute bottom-5 left-6 flex items-end gap-3">
                    <span className="text-3xl font-black text-white">{s.name}</span>
                    <span className="mb-1 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                      {s.tag}
                    </span>
                  </div>
                </div>

                <div className="p-7 sm:p-8">
                  <dl className="grid grid-cols-2 gap-4 border-b border-ink/8 pb-6 text-sm">
                    <div>
                      <dt className="text-xs tracking-widest text-ink/40 uppercase">視覺風格</dt>
                      <dd className="mt-1.5 font-medium text-ink/85">{s.style}</dd>
                    </div>
                    <div>
                      <dt className="text-xs tracking-widest text-ink/40 uppercase">麥克風配置</dt>
                      <dd className="mt-1.5 font-medium text-ink/85">{s.mics}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 space-y-3">
                    {plans.map((p) => (
                      <div
                        key={p.key}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-cream/70 px-5 py-4 ring-1 ring-ink/5"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-ink">{p.name}</div>
                          <div className="mt-1 text-xs leading-relaxed text-ink/50">{p.note}</div>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className="text-2xl font-black text-brand">
                            ${s.prices[p.key].toLocaleString()}
                          </span>
                          <span className="ml-1 text-xs font-medium text-ink/45">/ 小時</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-ink/60">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="mt-0.5 h-3 w-3 shrink-0 text-brand"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#booking"
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-cream transition-colors hover:bg-brand"
                  >
                    預約{s.name}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 規格比較表 */}
        <Reveal>
          <div className="mt-14 overflow-hidden rounded-3xl bg-white ring-1 ring-ink/8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-ink text-cream">
                    <th className="px-6 py-5 font-medium tracking-widest">空間規格</th>
                    {studios.map((s) => (
                      <th key={s.key} className="px-6 py-5 font-bold">
                        {s.name}
                        <span className="ml-2 text-xs font-normal text-cream/50">（{s.tag}）</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/6">
                  <tr>
                    <td className="px-6 py-4 font-medium text-ink/50">視覺風格</td>
                    {studios.map((s) => (
                      <td key={s.key} className="px-6 py-4 text-ink/85">
                        {s.style}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-cream/40">
                    <td className="px-6 py-4 font-medium text-ink/50">麥克風配置</td>
                    {studios.map((s) => (
                      <td key={s.key} className="px-6 py-4 text-ink/85">
                        {s.mics}
                      </td>
                    ))}
                  </tr>
                  {plans.map((p, idx) => (
                    <tr key={p.key} className={idx % 2 === 1 ? "bg-cream/40" : ""}>
                      <td className="px-6 py-4 font-medium text-ink/50">{p.name}</td>
                      {studios.map((s) => (
                        <td key={s.key} className="px-6 py-4">
                          <span className="text-lg font-black text-brand">
                            NT$ {s.prices[p.key].toLocaleString()}
                          </span>
                          <span className="text-xs text-ink/45"> / 小時</span>
                          <div className="mt-1 text-xs text-ink/45">（{p.note}）</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* 安心預約保證 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-brand/25 bg-brand/8 p-6">
                <span className="text-2xl">{g.icon}</span>
                <div>
                  <div className="text-sm font-bold text-ink">{g.title}</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{g.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink/40">
          安心預約保證｜所有方案皆含基本設備使用、環境清潔與現場人員協助。
        </p>
      </div>
    </section>
  );
}
