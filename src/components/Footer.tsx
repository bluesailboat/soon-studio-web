import { Clock, ExternalLink, Mail, MapPin, Navigation } from "lucide-react";
import { Reveal } from "./ui";
import { QRCodeSVG } from "qrcode.react";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/8 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.1fr_1fr_1fr]">
          {/* LINE */}
          <Reveal>
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:text-xs sm:tracking-[0.3em]">
                Official LINE
              </h3>
              <p className="mt-3 text-xl font-black text-cream sm:mt-4 sm:text-2xl">官方 LINE 諮詢</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/60 sm:mt-3 sm:text-sm sm:leading-relaxed">
                掃描 QR Code 加入好友，即時詢問檔期、報價與客製需求。
              </p>
              <div className="mt-5 flex items-center gap-4 sm:mt-6 sm:gap-5">
                <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-cream p-2 sm:h-28 sm:w-28">
                  <QRCodeSVG
                    value="https://lin.ee/3qxucJc"
                    className="h-full w-full"
                    bgColor="transparent"
                    fgColor="#14100d"
                    level="Q"
                  />
                </div>
                <a
                  href="https://lin.ee/3qxucJc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-xs font-bold text-brand-soft transition-colors hover:bg-brand hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  加入官方帳號
                </a>
              </div>
            </div>
          </Reveal>

          {/* 交通 */}
          <Reveal delay={100}>
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:text-xs sm:tracking-[0.3em]">
                Location
              </h3>
              <p className="mt-3 text-xl font-black text-cream sm:mt-4 sm:text-2xl">交通位置</p>
              <div className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-cream/65 sm:mt-3 sm:text-sm sm:leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft" />
                <span>
                  臺北市中山區長安東路一段 23 號 3 樓
                  <span className="block text-cream/45">（人物誌 Persona）</span>
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-xs text-cream/60 sm:mt-5 sm:text-sm">
                <li className="flex items-center gap-2">
                  <Navigation className="h-3.5 w-3.5 shrink-0 text-brand-soft/80" />
                  <span>捷運中山站 / 善導寺站步行約 10 分鐘</span>
                </li>
                <li className="flex items-center gap-2">
                  <Navigation className="h-3.5 w-3.5 shrink-0 text-brand-soft/80" />
                  <span>捷運松江南京站步行約 15 分鐘</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-brand/20 text-[9px] font-bold text-brand-soft">P</span>
                  <span>周邊備有多處收費停車場</span>
                </li>
              </ul>
              <a
                href="https://maps.app.goo.gl/L5HV7WnSevDjsX277"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-soft hover:underline sm:mt-5 sm:text-sm"
              >
                在 Google 地圖開啟 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>

          {/* 信箱 */}
          <Reveal delay={200}>
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.25em] text-brand uppercase sm:text-xs sm:tracking-[0.3em]">
                Contact
              </h3>
              <p className="mt-3 text-xl font-black text-cream sm:mt-4 sm:text-2xl">商務信箱</p>
              <a
                href="mailto:service@2him.net"
                className="mt-2 flex items-center gap-2 text-sm text-cream/75 transition-colors hover:text-brand-soft sm:mt-3 sm:text-base"
              >
                <Mail className="h-4 w-4 shrink-0 text-brand-soft" />
                <span>service@2him.net</span>
              </a>
              <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-cream/55 sm:mt-5 sm:text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-soft/80" />
                <span>
                  營業時間｜週一至週五 10:00 – 18:00
                  <span className="block text-cream/40">（採預約制，請提前預訂時段）</span>
                </span>
              </div>
              <a
                href="#booking"
                className="mt-5 inline-flex rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03] sm:mt-6 sm:px-6 sm:py-3 sm:text-sm"
              >
                立即預約時段
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 sm:mt-16 sm:flex-row sm:pt-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-black text-white sm:h-9 sm:w-9 sm:text-sm">
              順
            </span>
            <span className="text-xs text-cream/50 sm:text-sm">
              順順錄音棚 Soon Studio · 專注說好你的故事
            </span>
          </div>
          <p className="text-[11px] text-cream/35 sm:text-xs">
            © {new Date().getFullYear()} Soon Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
