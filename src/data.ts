export type StudioKey = "A" | "B";
export type PlanKey = "self" | "business";

export const studios = [
  {
    key: "A" as StudioKey,
    name: "一棚",
    tag: "多人協作首選",
    image: "/images/soon1.jpg",
    style: "空間寬敞、專業書牆背景",
    mics: "最高支援 4 支",
    hint: "空間寬敞、書牆背景，最多 4 支麥克風",
    prices: { self: 800, business: 1800 },
    features: ["專業書牆視覺背景", "最多 4 人同時錄製", "適合團體節目與企業訪談", "可搭配影像錄製"],
  },
  {
    key: "B" as StudioKey,
    name: "二棚",
    tag: "舒適對談空間",
    image: "/images/soon2.jpg",
    style: "舒適沙發、極佳隔音設計",
    mics: "最高支援 2 支",
    hint: "沙發對談、隔音極佳，最多 2 支麥克風",
    prices: { self: 600, business: 1600 },
    features: ["柔軟沙發放鬆對談", "極佳隔音聲學設計", "適合雙人／單人節目", "溫暖燈光氛圍"],
  },
];

export const plans = [
  {
    key: "self" as PlanKey,
    name: "純租棚方案",
    note: "含基本設備，適合熟練器材的創作者",
    hint: "需自行操作設備",
  },
  {
    key: "business" as PlanKey,
    name: "商務型方案",
    note: "含錄音師跟錄，適合企業與訪談節目",
    hint: "含錄音師跟錄技術支援",
  },
];

export const equipments = [
  { cat: "錄音混音台", name: "RODE CASTER PRO II", icon: "🎛️" },
  { cat: "動圈式麥克風", name: "SHURE MV7X", icon: "🎙️" },
  { cat: "動圈式麥克風", name: "鐵三角 AT2040", icon: "🎙️" },
  { cat: "夾式懸臂麥克風支架", name: "鐵三角 AT8700J", icon: "🦾" },
  { cat: "麥克風架", name: "HERCULES MS432B / MS533B", icon: "🧱" },
  { cat: "防噴遮罩", name: "ALCTRON PF04（雙層防護款）", icon: "🛡️" },
  { cat: "監聽耳機", name: "SONY 監聽耳機", icon: "🎧" },
  { cat: "專業錄音軟體", name: "Adobe Audition（專業多軌錄音）", icon: "💻" },
  { cat: "影像錄製支援", name: "SONY α7", icon: "📷" },
];

export const faqs = [
  {
    q: "錄音結束後如何取得音檔？",
    a: "錄音師會於現場確認檔案完整性。建議攜帶隨身碟，或由我們提供雲端連結上傳（請於預約時間內預留 10 分鐘存檔時間）。",
  },
  {
    q: "完全沒經驗的新手也能錄嗎？",
    a: "完全沒問題！現場人員會提供 10 分鐘的混音台與麥克風操作教學，確保您快速進入狀況。若需要全程協助，建議選擇「商務型方案」。",
  },
  {
    q: "空間內可以飲食嗎？",
    a: "為了維持良好的使用環境並保護專業器材，本空間全面禁止進食，僅允許飲用瓶裝水，感謝您的體諒與配合。",
  },
  {
    q: "超時費用如何計算？",
    a: "租借時段包含「進場準備」與「撤場存檔」。若超時 15 分鐘以上，將依該空間之半小時單價酌收費用，以保障下一組客戶權益。",
  },
  {
    q: "可以開立發票報帳嗎？",
    a: "可以的！我們全面支援開立「二聯式」或「三聯式」電子發票。若您有企業報帳需求，請於預約時主動告知「公司統編與抬頭」，我們將為您開立合規的電子發票，方便您後續輕鬆完成公司核銷流程。",
  },
];
