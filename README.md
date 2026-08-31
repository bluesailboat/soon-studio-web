# 🎙️ 順順錄音棚 (Soon Studio) 官方網站與預約系統

這是一個為「順順錄音棚」量身打造的品牌展示與線上預約系統。採用現代化的前端技術疊棧，加上輕量化的 Node.js 後端伺服器，直接與 Google 服務串接，實現自動化的行事曆預約與試算表紀錄。

## ✨ 核心特色功能

- **精美品牌官網**：以 Tailwind CSS 打造現代化、具設計感且響應式（RWD）的網頁介面，搭配流暢的進場動畫 (Framer Motion 概念)。
- **棚型與方案展示**：
  - **一棚 (多人協作首選)**：寬敞專業書牆背景，最多支援 4 支麥克風。純租棚 800/hr，商務型 1800/hr。
  - **二棚 (舒適對談空間)**：極佳隔音與柔軟沙發，最多支援 2 支麥克風。純租棚 600/hr，商務型 1600/hr。
- **線上預約自動化**：
  - **行事曆同步**：後端直接讀取 Google Calendar ICS 檔，防止客戶預約到衝突時段。
  - **自動建檔**：成功送出表單後，系統會透過 Google API 自動將明細寫入 **Google Sheets (試算表)**，同時在 **Google Calendar (行事曆)** 建立帶有詳細客戶資訊（含發票選項）的行程。
  - **優化使用者體驗**：完成預約後彈出精美的 Modal 確認視窗，提供清晰的預約明細。

## 🛠 技術疊棧 (Tech Stack)

### 前端 (Frontend)
- **React 19**
- **Vite 7**
- **Tailwind CSS v4** (快速且高度客製化的樣式)
- **Lucide React** (清晰精簡的 SVG Icons)

### 後端 (Backend)
- **Node.js + Express v5** (處理 API 請求)
- **Googleapis** (Google 官方 API SDK，用於操作 Sheets 和 Calendar)
- **node-ical** (解析公開的行事曆資料以比對時段)

## 🚀 環境變數設定

要讓後端服務順利串接 Google 服務，請確保在部署環境 (如 Cloud Run) 或本地 `.env` 檔案中設定以下變數：

```env
# 你的 Google 服務帳號 (Service Account) Email
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# 你的 Google 服務帳號私鑰 (Private Key)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
> **注意**：無需設定 Firebase 環境變數，本系統完全依賴輕量的 `googleapis` 服務帳號權限來管理資料。

## 📦 本地開發與部署

### 本地開發 (Development)
```bash
# 安裝依賴套件
npm install

# 啟動開發伺服器 (包含 Vite 前端與 Express 後端)
npm run dev
```

### 部署建置 (Production Build)
```bash
# 執行建置，會同時打包前端靜態檔與編譯後端程式碼至 dist/
npm run build

# 啟動正式環境伺服器
npm start
```
伺服器預設會於 `http://localhost:3000` 運行，所有路由皆會自動由 Express 處理 API 與前端 SPA 的渲染。

## 💡 專業設備陣容
本專案的 `src/data.ts` 中詳細記載了所有錄音棚器材配置，如：
- **錄音混音台**：RODE CASTER PRO II
- **麥克風**：SHURE MV7X、鐵三角 AT2040
- **錄音軟體**：Adobe Audition 等

感謝選擇順順錄音棚！若有任何開發與維護上的疑問，請參考程式碼內的註解與各組件的資料結構。
