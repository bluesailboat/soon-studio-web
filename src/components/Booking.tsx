import { useMemo, useState, type FormEvent } from "react";
import { plans, studios, type PlanKey, type StudioKey } from "../data";
import { cn } from "../utils/cn";
import { Hint, Reveal, SectionHeading } from "./ui";

type Form = {
  name: string;
  phone: string;
  email: string;
  studio: StudioKey | "";
  plan: PlanKey | "";
  date: string;
  start: string;
  end: string;
  people: string;
  invoice: "duplicate" | "triplicate" | "";
  company: string;
  taxId: string;
  note: string;
};

const empty: Form = {
  name: "",
  phone: "",
  email: "",
  studio: "",
  plan: "",
  date: "",
  start: "",
  end: "",
  people: "",
  invoice: "",
  company: "",
  taxId: "",
  note: "",
};

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-brand focus:bg-white/[0.07]";
const label = "mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-cream/70";

function Required() {
  return <span className="text-brand">*</span>;
}

export default function Booking() {
  const [f, setF] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const hours = useMemo(() => {
    if (!f.start || !f.end) return 0;
    const [sh, sm] = f.start.split(":").map(Number);
    const [eh, em] = f.end.split(":").map(Number);
    const diff = eh * 60 + em - (sh * 60 + sm);
    return diff > 0 ? diff / 60 : 0;
  }, [f.start, f.end]);

  const rate = useMemo(() => {
    if (!f.studio || !f.plan) return 0;
    return studios.find((s) => s.key === f.studio)!.prices[f.plan as PlanKey];
  }, [f.studio, f.plan]);

  const total = Math.round(rate * hours);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = "請填寫聯絡人姓名";
    if (!/^[0-9+\-() ]{8,}$/.test(f.phone.trim())) e.phone = "請填寫正確的聯絡電話";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = "請填寫正確的電子信箱";
    if (!f.studio) e.studio = "請選擇預約棚型";
    if (!f.plan) e.plan = "請選擇租借方案";
    if (!f.date) e.date = "請選擇預約日期";
    if (!f.start || !f.end) e.time = "請選擇起訖時間";
    else if (hours <= 0) e.time = "結束時間需晚於開始時間";
    if (!f.people.trim()) e.people = "請填寫預計進場人數";
    if (!f.invoice) e.invoice = "請選擇發票開立方式";
    if (f.invoice === "triplicate") {
      if (!f.company.trim()) e.company = "三聯式發票需填寫公司抬頭";
      if (!/^\d{8}$/.test(f.taxId.trim())) e.taxId = "請填寫 8 碼統一編號";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      document
        .querySelector("[data-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSent(true);
  };

  if (sent) {
    const studioName = studios.find((s) => s.key === f.studio)?.name;
    const planName = plans.find((p) => p.key === f.plan)?.name;
    return (
      <section id="booking" className="bg-ink-2 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <div className="rounded-[2rem] border border-brand/30 bg-white/[0.04] p-10 sm:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-white shadow-xl shadow-brand/30">
              ✓
            </div>
            <h3 className="mt-7 text-2xl font-black text-cream">預約申請已送出！</h3>
            <p className="mt-4 text-sm leading-loose text-cream/60">
              感謝 {f.name} 的預約，我們已收到您的需求。
              <br />
              客服人員將於 1 個工作天內以電話或 Email 與您確認時段。
            </p>
            <div className="mt-8 space-y-2 rounded-2xl bg-black/25 p-6 text-left text-sm text-cream/75">
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">預約棚型</span>
                <span className="font-medium">{studioName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">租借方案</span>
                <span className="font-medium">{planName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">日期時間</span>
                <span className="font-medium">
                  {f.date} {f.start}–{f.end}
                </span>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
                <span className="text-cream/45">預估費用</span>
                <span className="font-black text-brand-soft">NT$ {total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setF(empty);
                setSent(false);
              }}
              className="mt-8 rounded-full border border-cream/25 px-7 py-3 text-sm font-medium text-cream/80 transition-colors hover:bg-white/5"
            >
              再預約一個時段
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-ink-2 py-24 sm:py-32">
      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand/10 blur-[130px]" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Booking"
          title="線上預約表單"
          desc="填寫以下資訊，我們將於 1 個工作天內回覆確認。急件也歡迎直接加 LINE 洽詢。"
        />

        <Reveal>
          <form
            onSubmit={submit}
            noValidate
            className="mt-14 rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 sm:p-10"
          >
            {/* 聯絡資訊 */}
            <p className="mb-6 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              01 · 聯絡資訊
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              <div data-error={!!errors.name}>
                <label className={label}>
                  聯絡人姓名 <Required />
                </label>
                <input
                  className={cn(field, errors.name && "border-red-400/70")}
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="王小順"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div data-error={!!errors.phone}>
                <label className={label}>
                  聯絡電話 <Required />
                </label>
                <input
                  className={cn(field, errors.phone && "border-red-400/70")}
                  value={f.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="0912-345-678"
                  inputMode="tel"
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div data-error={!!errors.email}>
                <label className={label}>
                  聯絡電郵 <Required />
                </label>
                <input
                  className={cn(field, errors.email && "border-red-400/70")}
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@email.com"
                  inputMode="email"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
            </div>

            {/* 棚型與方案 */}
            <p className="mt-10 mb-6 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              02 · 棚型與方案
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div data-error={!!errors.studio}>
                <label className={label}>
                  選擇預約棚型 <Required />
                </label>
                <div className="space-y-2.5">
                  {studios.map((s) => (
                    <button
                      type="button"
                      key={s.key}
                      onClick={() => set("studio", s.key)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                        f.studio === s.key
                          ? "border-brand bg-brand/12"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-bold text-cream">
                          {s.name}
                          <span className="ml-2 text-xs font-normal text-cream/45">{s.tag}</span>
                        </span>
                        <span className="mt-1 block text-xs text-cream/45">{s.hint}</span>
                      </span>
                      <span className="shrink-0 text-cream/60">
                        <Hint text={s.hint} />
                      </span>
                    </button>
                  ))}
                </div>
                {errors.studio && <p className="mt-1.5 text-xs text-red-400">{errors.studio}</p>}
              </div>

              <div data-error={!!errors.plan}>
                <label className={label}>
                  選擇租借方案 <Required />
                </label>
                <div className="space-y-2.5">
                  {plans.map((p) => (
                    <button
                      type="button"
                      key={p.key}
                      onClick={() => set("plan", p.key)}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                        f.plan === p.key
                          ? "border-brand bg-brand/12"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-bold text-cream">{p.name}</span>
                        <span className="mt-1 block text-xs text-cream/45">{p.hint}</span>
                      </span>
                      <span className="shrink-0 text-cream/60">
                        <Hint text={p.note} />
                      </span>
                    </button>
                  ))}
                </div>
                {errors.plan && <p className="mt-1.5 text-xs text-red-400">{errors.plan}</p>}
              </div>
            </div>

            {/* 時間 */}
            <p className="mt-10 mb-6 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              03 · 時間與人數
            </p>
            <div className="grid gap-5 sm:grid-cols-4" data-error={!!errors.date || !!errors.time}>
              <div>
                <label className={label}>
                  預約日期 <Required />
                </label>
                <input
                  type="date"
                  className={cn(field, "[color-scheme:dark]", errors.date && "border-red-400/70")}
                  value={f.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </div>
              <div>
                <label className={label}>
                  開始時間 <Required />
                </label>
                <input
                  type="time"
                  step={1800}
                  className={cn(field, "[color-scheme:dark]", errors.time && "border-red-400/70")}
                  value={f.start}
                  onChange={(e) => set("start", e.target.value)}
                />
              </div>
              <div>
                <label className={label}>
                  結束時間 <Required />
                </label>
                <input
                  type="time"
                  step={1800}
                  className={cn(field, "[color-scheme:dark]", errors.time && "border-red-400/70")}
                  value={f.end}
                  onChange={(e) => set("end", e.target.value)}
                />
              </div>
              <div>
                <label className={label}>
                  進場人數 <Required />
                </label>
                <input
                  type="number"
                  min={1}
                  className={cn(field, errors.people && "border-red-400/70")}
                  value={f.people}
                  onChange={(e) => set("people", e.target.value)}
                  placeholder="2"
                />
              </div>
            </div>
            {(errors.date || errors.time || errors.people) && (
              <p className="mt-2 text-xs text-red-400">
                {errors.date || errors.time || errors.people}
              </p>
            )}

            {/* 即時預估 */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/25 bg-brand/8 px-5 py-4">
              <span className="text-xs text-cream/60">
                {rate > 0 && hours > 0
                  ? `NT$ ${rate.toLocaleString()} / 小時 × ${hours} 小時`
                  : "選擇棚型、方案與時段後，即時顯示預估費用"}
              </span>
              <span className="text-lg font-black text-brand-soft">
                預估費用 NT$ {total.toLocaleString()}
              </span>
            </div>

            {/* 發票 */}
            <p className="mt-10 mb-6 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              04 · 發票開立需求
            </p>
            <div data-error={!!errors.invoice} className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "duplicate", name: "二聯式", hint: "一般個人" },
                { key: "triplicate", name: "三聯式", hint: "公司報帳" },
              ].map((o) => (
                <button
                  type="button"
                  key={o.key}
                  onClick={() => set("invoice", o.key)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                    f.invoice === o.key
                      ? "border-brand bg-brand/12"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25",
                  )}
                >
                  <span>
                    <span className="block text-sm font-bold text-cream">{o.name}電子發票</span>
                    <span className="mt-1 block text-xs text-cream/45">{o.hint}</span>
                  </span>
                  <Hint text={o.hint} />
                </button>
              ))}
            </div>
            {errors.invoice && <p className="mt-2 text-xs text-red-400">{errors.invoice}</p>}

            <div
              className={cn(
                "grid transition-all duration-500",
                f.invoice === "triplicate" ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div data-error={!!errors.company}>
                    <label className={label}>
                      公司抬頭 <Required />
                    </label>
                    <input
                      className={cn(field, errors.company && "border-red-400/70")}
                      value={f.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="順順文化有限公司"
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-red-400">{errors.company}</p>
                    )}
                  </div>
                  <div data-error={!!errors.taxId}>
                    <label className={label}>
                      統一編號 <Required />
                    </label>
                    <input
                      className={cn(field, errors.taxId && "border-red-400/70")}
                      value={f.taxId}
                      onChange={(e) => set("taxId", e.target.value)}
                      placeholder="12345678"
                      inputMode="numeric"
                      maxLength={8}
                    />
                    {errors.taxId && <p className="mt-1.5 text-xs text-red-400">{errors.taxId}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* 備註 */}
            <p className="mt-10 mb-6 text-xs font-bold tracking-[0.3em] text-brand uppercase">
              05 · 其他備註事項
            </p>
            <textarea
              rows={4}
              className={cn(field, "resize-none leading-relaxed")}
              value={f.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="如有特殊需求（例如影像錄製、多人來賓、器材租借等），請於此說明。"
            />

            <button
              type="submit"
              className="group mt-9 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 text-base font-black text-white shadow-xl shadow-brand/25 transition-transform hover:scale-[1.01]"
            >
              送出預約申請
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>
            <p className="mt-4 text-center text-xs text-cream/40">
              送出後不代表預約完成，實際時段以客服確認回覆為準。
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
