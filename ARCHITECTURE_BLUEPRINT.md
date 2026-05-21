# 輕量擴充藍圖

## 目標

這個專案是展覽互動裝置，不需要先升級成完整產品架構。  
目前採用「資料驅動的單頁 prototype」即可：

- 核心互動邏輯維持一份
- 每個詞彙以一包資料描述
- 個別詞彙可對少數筆畫標記特殊動畫
- 等詞彙數量真的增加後，再決定是否拆檔

## 建議分層

```text
畫面層
  - 教學模式 / 手寫模式按鈕
  - 完成 banner
  - 發音按鈕

共用引擎層
  - reset / next / complete
  - 自動播放、手動逐畫
  - 描紅、無提示手寫
  - hit test、錯誤提示、重寫這一畫

動畫策略層
  - simple：一般橫向 / 直向揭露
  - fold：折筆兩段式揭露
  - 未來若需要，再補 curve / custom 等策略

詞彙資料層
  - 詞彙文字、台羅、詞義、音訊、裝飾圖
  - 字資料
  - 筆畫 path
  - 每畫的動畫 metadata（例如 fold）
```

## 目前資料包格式

```js
{
  id: 'tshit-tho',
  text: '𨑨迌',
  romanization: 'tshit-thô',
  meaning: '遊玩・出去玩',
  audioSrc: '13522(1).mp3',
  designImageSrc: 'Stroke_Template_color.png',
  viewBox: '0 0 835.63 1352.64',
  characters: [
    { char: '𨑨', romanization: 'tshit' },
    { char: '迌', romanization: 'thô' }
  ],
  strokes: [
    {
      id: 'c1s1',
      charIndex: 0,
      strokeNumber: 1,
      d: '...'
    },
    {
      id: 'c1s2',
      charIndex: 0,
      strokeNumber: 2,
      fold: true,
      d: '...'
    }
  ]
}
```

## 擴充原則

### 1. 新增詞彙時，優先新增資料，不改共用引擎

理想情況下，新詞彙只需要新增：

- `characters`
- `strokes`
- 對應圖片 / 音訊資產
- 少量動畫 metadata

### 2. 特殊筆畫以 metadata 調整，不複製整套動畫程式

目前已支援：

- 一般筆畫：由引擎依 bbox 自動判斷橫 / 豎
- `fold: true`：使用折筆兩段式動畫

未來若某些字需要更細的控制，優先把資料升級成：

```js
animation: {
  type: 'fold',
  variant: 'flat',
  phaseSplit: 0.36
}
```

而不是為每個詞彙另寫一份播放程式。

### 3. 先保留單頁，等內容真的變多再拆檔

當詞彙數量仍少時，單頁資料驅動已足夠。  
若未來出現以下情況，再進一步拆成多檔：

- 詞彙超過 3–5 組
- 需要詞彙選單頁
- 多人共同維護內容
- 詞彙資料開始比互動程式還長很多

屆時可再拆成：

```text
index.html          ← 選單首頁
writing.html        ← 互動主體
data/vocabularies.js
js/player.js
js/practice.js
js/animations.js
```

## 目前階段刻意不做的事

- 不先導入 React / Vite
- 不先做複雜資料 loader
- 不先為所有可能的筆畫型別建策略
- 不先做完整習字評分系統

原因：這些都會讓展覽型專案提早承擔不必要的複雜度。
