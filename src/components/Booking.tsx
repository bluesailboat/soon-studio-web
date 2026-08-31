import { useMemo, useState, useEffect, type FormEvent } from "react";
import { plans, studios, type PlanKey, type StudioKey } from "../data";
import { cn } from "../utils/cn";
import { Reveal, SectionHeading } from "./ui";

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

const TIME_SLOTS = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (sent) {
      setTimeout(() => setShowModal(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setShowModal(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sent]);

  // Booking state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busySlots, setBusySlots] = useState<{start: string; end: string}[]>([]);

  useEffect(() => {
    if (f.date && f.studio) {
      fetch(`/api/availability?studio=${f.studio}`)
        .then((res) => res.json())
        .then((data) => {
           if (Array.isArray(data)) setBusySlots(data);
        })
        .catch((err) => console.error("Failed to fetch calendar", err));
    } else {
      setBusySlots([]);
    }
  }, [f.date, f.studio]);

  const isSlotAvailable = (time: string, isStart: boolean) => {
    if (!f.date || busySlots.length === 0) return true;
    const slotDate = new Date(`${f.date}T${time}:00+08:00`);

    for (const event of busySlots) {
      if (!event.start || !event.end) continue;
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      if (isStart) {
        if (slotDate >= eventStart && slotDate < eventEnd) return false;
      } else {
        if (slotDate > eventStart && slotDate <= eventEnd) return false;
      }
    }
    return true;
  };

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
    if (!f.date) {
      e.date = "請選擇預約日期";
    } else {
      const [y, m, d] = f.date.split("-").map(Number);
      const selectedDate = new Date(y, m - 1, d);
      const day = selectedDate.getDay();
      if (day === 0 || day === 6) {
        e.date = "僅開放週一至週五預約（營業時間 10:00 – 18:00）";
      }
    }
    if (!f.start || !f.end) e.time = "請選擇起訖時間（開放 10:00 – 18:00）";
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

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      document
        .querySelector("[data-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const studioName = studios.find((s) => s.key === f.studio)?.name || "";
      const planName = plans.find((p) => p.key === f.plan)?.name || "";

      const res = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...f,
          studioName,
          planName,
          total
        })
      });

      if (!res.ok) {
        throw new Error('Server error');
      }
      
      setSent(true);
    } catch (err) {
      console.error(err);
      alert("送出失敗，請稍後再試！或直接加入官方 LINE 聯繫預約。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const studioName = studios.find((s) => s.key === f.studio)?.name;
  const planName = plans.find((p) => p.key === f.plan)?.name;

  return (
    <section id="booking" className="relative overflow-hidden bg-ink-2 py-20 sm:py-32">
      {/* 成功預約的 Modal 彈窗 */}
      {sent && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 sm:p-6",
            showModal ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-md transition-opacity"
            onClick={() => {
              setF(empty);
              setSent(false);
            }}
          />
          <div
            className={cn(
              "relative w-full max-w-md rounded-[2rem] border border-brand/30 bg-ink-2 p-8 text-center shadow-2xl shadow-black/50 transition-all duration-500 sm:p-10",
              showModal ? "translate-y-0 scale-100" : "translate-y-8 scale-95",
            )}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-3xl text-white shadow-xl shadow-brand/30">
              ✓
            </div>
            <h3 className="mt-6 text-2xl font-black text-cream">預約申請已送出！</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              感謝 {f.name} 的預約，我們已收到您的需求。
              <br />
              客服人員將於 1 個工作天內以電話或 Email 與您確認時段。
            </p>
            <div className="mt-8 space-y-2 rounded-2xl bg-black/40 p-5 text-left text-sm text-cream/75 border border-white/5">
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">預約棚型</span>
                <span className="font-medium text-cream/90">{studioName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">租借方案</span>
                <span className="font-medium text-cream/90">{planName}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-cream/45">日期時間</span>
                <span className="font-medium text-cream/90">
                  {f.date} {f.start}–{f.end}
                </span>
              </div>
              <div className="mt-3 flex justify-between gap-4 border-t border-white/10 pt-3">
                <span className="text-cream/45">預估費用</span>
                <span className="font-black text-brand">NT$ {total.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => {
                setF(empty);
                setSent(false);
              }}
              className="mt-8 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.02] active:scale-95"
            >
              我知道了，再預約另一時段
            </button>
          </div>
        </div>
      )}

      <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-brand/10 blur-[130px]" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Booking"
          title="線上預約表單"
          desc={
            <>
              填寫以下資訊，我們將於 1 個工作天內回覆確認。急件也歡迎直接加{" "}
              <a href="https://lin.ee/3qxucJc" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                官方 LINE
              </a>{" "}
              洽詢。
            </>
          }
        />

        <Reveal>
          <form
            onSubmit={submit}
            noValidate
            className="mt-10 rounded-3xl border border-white/8 bg-white/[0.03] p-5 sm:mt-14 sm:rounded-[2rem] sm:p-10"
          >
            {/* 聯絡資訊 */}
            <p className="mb-4 text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:mb-6 sm:text-xs sm:tracking-[0.3em]">
              01 · 聯絡資訊
            </p>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
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
            <p className="mt-8 mb-4 text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:mt-10 sm:mb-6 sm:text-xs sm:tracking-[0.3em]">
              02 · 棚型與方案
            </p>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-all sm:px-4 sm:py-3.5",
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
                        <span className="mt-0.5 block text-xs text-cream/45 sm:mt-1">{s.hint}</span>
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
                        "flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-all sm:px-4 sm:py-3.5",
                        f.plan === p.key
                          ? "border-brand bg-brand/12"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-bold text-cream">{p.name}</span>
                        <span className="mt-0.5 block text-xs text-cream/45 sm:mt-1">{p.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
                {errors.plan && <p className="mt-1.5 text-xs text-red-400">{errors.plan}</p>}
              </div>
            </div>

            {/* 時間 */}
            <div className="mt-8 mb-4 flex flex-wrap items-center justify-between gap-2 sm:mt-10 sm:mb-6">
              <p className="text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:text-xs sm:tracking-[0.3em]">
                03 · 時間與人數
              </p>
              <span className="rounded-full border border-brand/20 bg-brand/10 px-3 py-1 text-[11px] font-medium text-brand-soft">
                開放時段：週一至週五 10:00 – 18:00
              </span>
            </div>
            <div className="grid gap-3.5 sm:grid-cols-4 sm:gap-5" data-error={!!errors.date || !!errors.time}>
              <div>
                <label className={label}>
                  預約日期 <Required />
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className={cn(field, "[color-scheme:dark]", errors.date && "border-red-400/70")}
                  value={f.date}
                  onChange={(e) => {
                    const val = e.target.value;
                    set("date", val);
                    if (val) {
                      const [y, m, d] = val.split("-").map(Number);
                      const selectedDate = new Date(y, m - 1, d);
                      const day = selectedDate.getDay();
                      if (day === 0 || day === 6) {
                        setErrors((p) => ({
                          ...p,
                          date: "僅開放週一至週五預約（營業時間 10:00 – 18:00）",
                        }));
                      }
                    }
                  }}
                />
              </div>
              <div>
                <label className={label}>
                  開始時間 <Required />
                </label>
                <div className="relative">
                  <select
                    className={cn(
                      field,
                      "appearance-none pr-8 cursor-pointer [color-scheme:dark]",
                      errors.time && "border-red-400/70",
                      !f.start && "text-cream/30",
                    )}
                    value={f.start}
                    onChange={(e) => set("start", e.target.value)}
                  >
                    <option value="" disabled className="bg-ink text-cream/40">
                      選擇開始時間
                    </option>
                    {TIME_SLOTS.slice(0, -1).map((t) => {
                      const avail = isSlotAvailable(t, true);
                      return (
                        <option key={t} value={t} disabled={!avail} className={avail ? "bg-ink text-cream" : "bg-ink text-cream/20"}>
                          {t} {avail ? "" : "(已被預約)"}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-cream/40">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label className={label}>
                  結束時間 <Required />
                </label>
                <div className="relative">
                  <select
                    className={cn(
                      field,
                      "appearance-none pr-8 cursor-pointer [color-scheme:dark]",
                      errors.time && "border-red-400/70",
                      !f.end && "text-cream/30",
                    )}
                    value={f.end}
                    onChange={(e) => set("end", e.target.value)}
                  >
                    <option value="" disabled className="bg-ink text-cream/40">
                      選擇結束時間
                    </option>
                    {TIME_SLOTS.slice(1).map((t) => {
                      const avail = isSlotAvailable(t, false);
                      return (
                        <option key={t} value={t} disabled={!avail} className={avail ? "bg-ink text-cream" : "bg-ink text-cream/20"}>
                          {t} {avail ? "" : "(已被預約)"}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-cream/40">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
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
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 rounded-2xl border border-brand/25 bg-brand/8 px-4 py-3.5 sm:mt-6 sm:gap-3 sm:px-5 sm:py-4">
              <span className="text-xs text-cream/60">
                {rate > 0 && hours > 0
                  ? `NT$ ${rate.toLocaleString()} / 小時 × ${hours} 小時`
                  : "選擇棚型、方案與時段後，即時顯示預估費用"}
              </span>
              <span className="text-base font-black text-brand-soft sm:text-lg">
                預估費用 NT$ {total.toLocaleString()}
              </span>
            </div>

            {/* 發票 */}
            <p className="mt-8 mb-4 text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:mt-10 sm:mb-6 sm:text-xs sm:tracking-[0.3em]">
              04 · 發票開立需求
            </p>
            <div data-error={!!errors.invoice} className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
              {[
                { key: "duplicate", name: "二聯式", hint: "一般個人" },
                { key: "triplicate", name: "三聯式", hint: "公司報帳" },
              ].map((o) => (
                <button
                  type="button"
                  key={o.key}
                  onClick={() => set("invoice", o.key)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-all sm:px-4 sm:py-3.5",
                    f.invoice === o.key
                      ? "border-brand bg-brand/12"
                      : "border-white/10 bg-white/[0.03] hover:border-white/25",
                  )}
                >
                  <span>
                    <span className="block text-sm font-bold text-cream">{o.name}電子發票</span>
                    <span className="mt-0.5 block text-xs text-cream/45 sm:mt-1">{o.hint}</span>
                  </span>
                </button>
              ))}
            </div>
            {errors.invoice && <p className="mt-2 text-xs text-red-400">{errors.invoice}</p>}

            <div
              className={cn(
                "grid transition-all duration-500",
                f.invoice === "triplicate" ? "mt-4 grid-rows-[1fr] opacity-100 sm:mt-5" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
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
            <p className="mt-8 mb-4 text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:mt-10 sm:mb-6 sm:text-xs sm:tracking-[0.3em]">
              05 · 其他備註事項
            </p>
            <textarea
              rows={3}
              className={cn(field, "resize-none leading-relaxed")}
              value={f.note}
              onChange={(e) => set("note", e.target.value)}
              placeholder="如有特殊需求（例如影像錄製、多人來賓、器材租借等），請於此說明。"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-base font-black text-white shadow-xl shadow-brand/25 transition-transform hover:scale-[1.01] sm:mt-9 sm:py-4 disabled:opacity-70 disabled:hover:scale-100"
            >
              {isSubmitting ? "送出中..." : "送出預約申請"}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </button>
            <p className="mt-3.5 text-center text-xs leading-relaxed text-cream/40 sm:mt-4">
              送出後不代表預約完成，實際時段以客服確認回覆為準。
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
