import { Reveal } from "./ui";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/8 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr_1fr]">
          {/* LINE */}
          <Reveal>
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-brand uppercase">
                Official LINE
              </h3>
              <p className="mt-4 text-2xl font-black text-cream">官方 LINE 諮詢</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                掃描 QR Code 加入好友，即時詢問檔期、報價與客製需求。
              </p>
              <div className="mt-6 flex items-center gap-5">
                <div className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl bg-cream p-2">
                  <svg viewBox="0 0 29 29" className="h-full w-full" aria-label="LINE QR Code">
                    {(() => {
                      const cells: React.ReactElement[] = [];
                      const finder = (x: number, y: number) => {
                        cells.push(
                          <rect key={`f${x}-${y}`} x={x} y={y} width="7" height="7" fill="#14100d" />,
                          <rect key={`f2${x}-${y}`} x={x + 1} y={y + 1} width="5" height="5" fill="#f6f1e9" />,
                          <rect key={`f3${x}-${y}`} x={x + 2} y={y + 2} width="3" height="3" fill="#14100d" />,
                        );
                      };
                      finder(0, 0);
                      finder(22, 0);
                      finder(0, 22);
                      let seed = 7;
                      for (let y = 0; y < 29; y++) {
                        for (let x = 0; x < 29; x++) {
                          const inFinder =
                            (x < 8 && y < 8) || (x > 20 && y < 8) || (x < 8 && y > 20);
                          if (inFinder) continue;
                          seed = (seed * 1103515245 + 12345) % 2147483648;
                          if ((seed >> 16) % 100 < 45)
                            cells.push(
                              <rect key={`c${x}-${y}`} x={x} y={y} width="1" height="1" fill="#14100d" />,
                            );
                        }
                      }
                      return cells;
                    })()}
                  </svg>
                </div>
                <a
                  href="#booking"
                  className="rounded-full border border-brand/40 bg-brand/10 px-5 py-2.5 text-sm font-bold text-brand-soft transition-colors hover:bg-brand hover:text-white"
                >
                  @soonstudio
                </a>
              </div>
            </div>
          </Reveal>

          {/* 交通 */}
          <Reveal delay={100}>
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-brand uppercase">Location</h3>
              <p className="mt-4 text-2xl font-black text-cream">交通位置</p>
              <p className="mt-3 text-sm leading-loose text-cream/55">
                臺北市中山區長安東路一段 23 號 3 樓
                <br />
                （人物誌 Persona）
              </p>
              <ul className="mt-5 space-y-2 text-sm text-cream/50">
                <li>🚇 捷運中山站步行約 5 分鐘</li>
                <li>🚇 捷運松江南京站步行約 8 分鐘</li>
                <li>🅿️ 周邊備有多處收費停車場</li>
              </ul>
              <a
                href="https://maps.google.com/?q=臺北市中山區長安東路一段23號"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-soft hover:underline"
              >
                在 Google 地圖開啟 <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>

          {/* 信箱 */}
          <Reveal delay={200}>
            <div>
              <h3 className="text-xs font-bold tracking-[0.3em] text-brand uppercase">Contact</h3>
              <p className="mt-4 text-2xl font-black text-cream">商務信箱</p>
              <a
                href="mailto:service@2him.net"
                className="mt-3 inline-block text-base text-cream/70 transition-colors hover:text-brand-soft"
              >
                service@2him.net
              </a>
              <p className="mt-5 text-sm leading-loose text-cream/50">
                營業時間｜週一至週日 10:00 – 22:00
                <br />
                （採預約制，請提前預訂時段）
              </p>
              <a
                href="#booking"
                className="mt-6 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand/25 transition-transform hover:scale-[1.03]"
              >
                立即預約時段
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-sm font-black text-white">
              順
            </span>
            <span className="text-sm text-cream/50">
              順順錄音棚 Soon Studio · 專注說好你的故事
            </span>
          </div>
          <p className="text-xs text-cream/35">
            © {new Date().getFullYear()} Soon Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
