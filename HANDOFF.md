# 看無字有聲 — 台語詞彙筆畫教學
## Phase 1 技術驗證 Hand-off 文件

**日期：** 2026-05-18  
**階段：** Phase 1 完成（核心動畫驗證）  
**交付物：** `index.html`（單一檔案，含所有 CSS / JS）

---

## 一、本次驗證目標與結果

Phase 1 的目標是「選 2 個字，完整走完拆筆畫 → SVG → 動畫的流程，確認平板上的顯示效果」。

| 目標 | 結果 |
|------|------|
| SVG 筆畫分層架構可行 | ✅ 完成，16 筆畫皆可獨立控制 |
| 三層疊合架構（底稿 / 動畫 / 設計稿）| ✅ 完成 |
| 筆畫依運筆方向顯現（非單純 fade-in）| ✅ 完成，用 SVG clipPath + RAF |
| 橫折筆畫的兩段式動畫 | ✅ 完成（先橫後豎）|
| 台語發音播放 | ✅ 完成（進頁面 / 完成後 / 手動鍵）|
| 完成後 2 秒延遲跳出讀音 banner | ✅ 完成 |
| Huninn 粉圓體字型 | ✅ 完成（Google Fonts 引入）|

---

## 二、檔案清單

```
Stroke_animation_Test/
├── index.html              ← 主要交付物（所有程式碼在此）
├── Glyphs_01_stroke.svg    ← 字「𨑨」的 8 條筆畫路徑（設計師產出）
├── Glyphs_02_stroke.svg    ← 字「迌」的 8 條筆畫路徑（設計師產出）
├── Stroke_Template_color.png ← 設計稿裝飾層（透明背景 PNG，966 KB）
├── 13522(1).mp3            ← 台語發音音訊（𨑨迌 tshit-thô）
└── 台語筆畫教學_執行方案.md  ← 原始規格文件
```

---

## 三、技術架構說明

### 3.1 三層疊合

卡片內部由三個絕對定位層組成，從下到上：

```
Layer 1  layer-guide    SVG，所有筆畫以 8% opacity 顯示
                        → 讓使用者看到字的輪廓位置（底稿參考）

Layer 2  layer-anim     SVG（id="anim-svg"），筆畫動畫主體
                        → 每條筆畫有獨立 <clipPath>，初始裁切為 0
                        → JS 控制 clipPath 依序展開

Layer 3  layer-design   PNG（Stroke_Template_color.png）
                        → pointer-events: none，純裝飾
```

### 3.2 筆畫動畫引擎（核心）

使用 **SVG `<clipPath>` + `requestAnimationFrame`**，而非 `stroke-dashoffset`。

原因：設計師提供的是填色 path（字形輪廓），不是細線中心路徑，
直接做 `stroke-dashoffset` 會畫出邊框線而非實心筆畫形狀。

**一般筆畫（橫筆或豎筆）**
```
setupSimpleClip():
  - 若 width > height × 1.35 → 橫筆：clipRect 從 width=0 展開（左→右）
  - 否則                     → 豎筆：clipRect 從 height=0 展開（上→下）
  - easing：easeOutQuart（快起筆、慢收筆）
```

**橫折 / 橫折鉤筆畫（兩段式）**

標記方式：在路徑上加 `data-fold="true"`。

```
setupFoldClip():
  分為「高挑型」（月/日框架，width < height）和「扁形型」（寬>高）
  
  高挑型（c1s2, c2s2）：
    Rect A → 頂部橫臂，width: 0 → full（左→右）
    Rect B → 全寬，height: 0 → full（上→下）
    Phase 1（前 36%時間）：橫臂掃出
    Phase 2（後 64%時間）：豎臂由上往下
    
  扁形型（c1s7, c2s7）：
    Rect A → 底部橫臂，width: 0 → full（左→右）
    Rect B → 全寬，height: 0 → full（由下往上）
    Phase 1（前 36%時間）：橫臂掃出
    Phase 2（後 64%時間）：豎臂由下往上（BTT）
```

**筆畫顏色**
- 出現瞬間：`#8a8a9c`（淡黑，模擬未乾墨水）
- 動畫結束後過渡：`#1a1a2e`（深黑，墨水沉澱）

### 3.3 筆順資料

| id | 字 | 筆畫 | 動畫類型 |
|----|---|------|---------|
| c1s1 | 𨑨 | 第 1 畫 | 豎 TTB |
| c1s2 | 𨑨 | 第 2 畫（橫折鉤）| 高挑折，橫→豎 TTB |
| c1s3 | 𨑨 | 第 3 畫 | 橫 LTR |
| c1s4 | 𨑨 | 第 4 畫 | 橫 LTR |
| c1s5 | 𨑨 | 第 5 畫 | 豎 TTB |
| c1s6 | 𨑨 | 第 6 畫 | 豎 TTB |
| c1s7 | 𨑨 | 第 7 畫（橫折）| 扁形折，橫→豎 BTT |
| c1s8 | 𨑨 | 第 8 畫 | 橫 LTR |
| c2s1–c2s8 | 迌 | 同上對應 | 同上 |

### 3.4 音訊播放時機

1. 進入頁面時（`window load`）自動播放一次
2. 第一次任意觸碰補播一次（處理瀏覽器 autoplay 限制）
3. 最後一筆完成後 **等待 2 秒** 再顯示 banner + 播放
4. 底部「𨑨迌 聽發音」按鈕可隨時手動觸發

---

## 四、介面功能

### 播放模式

| 模式 | 操作 | 說明 |
|------|------|------|
| 自動播放 | 按「播放」/「暫停」| 依速度設定自動顯現每一畫 |
| 手動逐畫 | 按「下一畫」或點卡片| 每次點擊前進一畫 |

### 速度控制
- 慢（1500ms/畫）、中（850ms/畫，預設）、快（380ms/畫）

### 鍵盤快捷鍵（桌面測試用）
- `Space` / `Enter`：播放 / 下一畫
- `→`（手動模式）：下一畫
- `R`：重置

---

## 五、環境需求與已知限制

### ⚠️ 必須用本機 HTTP Server 開啟

**不可**直接用 `file://` 在 Chrome 開啟。Chrome 把每個 `file://` URL
視為獨立的安全 origin，會封鎖 PNG 圖片、音訊、外部字型的載入。

**正確開啟方式：**
```bash
# 在專案資料夾執行：
cd /Users/kaochingchan/Downloads/Stroke_animation_Test
python3 -m http.server 8080
# 然後在 Chrome 開啟：
# http://localhost:8080/index.html
```

Safari 不受此限制，可直接雙擊開啟。

### 字型
使用 Google Fonts 的 **Huninn（粉圓體）**，需要網路連線才能載入。
Fallback：PingFang TC → Heiti TC → sans-serif。

若要離線使用，需將字型檔下載並以 `@font-face` 本地引入：
- 字型來源：`https://fonts.gstatic.com/s/huninn/v8/OpNNnoINg9bQ4xkpjg.ttf`

---

## 六、本次未完成 / 留給 Phase 2 的項目

### 互動練習模式（已嘗試，暫時擱置）

曾實作 Canvas 手寫偵測（以筆畫重心比對 SVG bounding box 判斷正確性），
但加入後 `ResizeObserver` + `canvas.width` 互相觸發造成 layout loop，
使頁面無法渲染。已完整移除。

**重新加入的前置條件：**
1. 必須在 HTTP server 環境下執行（非 `file://`）
2. ResizeObserver callback 必須加 `rafPending` flag 避免 loop
3. 判斷邏輯以筆畫 bounding box 為基礎，容差 ±55 SVG units
4. 建議先在獨立頁面驗證 canvas 行為，再整合入主頁

### 其他 Phase 2 項目（原始規格文件已定義）
- 詞彙選單頁（卡片列表）
- 完成頁（詞義說明 + 例句）
- 所有詞彙的 SVG 筆畫資料補完（估計 25–35 個字）
- PWA 設定（可離線使用）
- 互動練習模式的完整實作

---

## 七、SVG 筆畫製作規格（給設計師）

每個字需從 Illustrator 分開匯出為獨立 SVG：

1. 每畫是一個獨立 `<path>`，以 `<g>` 包裝
2. `<g>` 的 id 命名：`Glyphs01_x5F_1`、`Glyphs01_x5F_2`…（Illustrator 預設格式）
3. 依筆順命名，確保 `id` 末尾數字 = 筆順
4. viewBox 固定為 `0 0 835.63 1352.64`（與設計稿 PNG 同一坐標系）
5. 兩個字分別匯出為 `Glyphs_01_stroke.svg`、`Glyphs_02_stroke.svg`

前端處理：
- 以 `data-fold="true"` 標記有轉折的筆畫（橫折、橫折鉤）
- 其餘筆畫由演算法自動判斷橫 / 豎方向

---

## 八、程式碼關鍵位置速查

| 項目 | 位置 |
|------|------|
| 筆畫 path 資料（HTML inline）| `index.html` line ~350–380 |
| clipPath 動畫引擎 | `setupSimpleClip()`、`setupFoldClip()` |
| 動畫播放邏輯 | `animateSimple()`、`animateFold()` |
| 速度 / 時間常數 | `const SPEEDS`、`dur = speed × 0.72` |
| 折筆比例常數 | `FOLD_H_RATIO = 0.24`、`FOLD_P1_SPLIT = 0.36` |
| 音訊播放 | `playPronunciation()`，音訊檔 `13522(1).mp3` |
| 完成後延遲 | `setTimeout(..., 2000)` 在 `scheduleNext()` 與 `stepOne()` |

---

*文件由 Claude Code 自動產出，2026-05-18*
