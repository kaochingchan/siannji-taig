'use strict';

// ─────────────────────────────────────────────────────────
//  詞彙資料庫
//  每筆詞彙說明：
//    id            : 流水號 1–10
//    text          : 詞彙漢字（完成 banner 及發音按鈕顯示）
//    romanization  : 台羅拼音
//    meaning       : 中文詞義
//    audioSrc      : 讀音 mp3
//    designImageSrc: 字帖背景 PNG（Layer 4 裝飾）
//    videoSrc      : 完成後播放影片
//    viewBox       : SVG 座標系（所有字帖統一 595.28×963.78）
//    characters    : 各字資料 → char, romanization, svgSrc
//
//  TODO: 補齊詞彙 02–10 的 text / romanization / meaning
// ─────────────────────────────────────────────────────────

const VOCABULARIES = [
  {
    id: 1,
    text: '𨑨迌',
    romanization: 'tshit-thô',
    meaning: '遊玩・出去玩',
    audioSrc: 'sound.mp3/sound1.mp3',
    designImageSrc: 'top.png/top-01.png',
    videoSrc: 'video.mp4/video1.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '𨑨', romanization: 'tshit', svgSrc: 'font.svg/font-01/font-01-1.svg' },
      { char: '迌', romanization: 'thô',   svgSrc: 'font.svg/font-01/font-01-2.svg' }
    ]
  },
  {
    id: 2,
    text: '刺耙耙',
    romanization: 'tshiah-pê-pê',
    meaning: '潑辣・形容女人兇巴巴',
    audioSrc: 'sound.mp3/sound2.mp3',
    designImageSrc: 'top.png/top-02.png',
    videoSrc: 'video.mp4/video2.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '刺', romanization: 'tshiah', svgSrc: 'font.svg/font-02/font-02-1.svg' },
      { char: '耙', romanization: 'pê',     svgSrc: 'font.svg/font-02/font-02-2.svg' },
      { char: '耙', romanization: 'pê',     svgSrc: 'font.svg/font-02/font-02-3.svg' }
    ]
  },
  {
    id: 3,
    text: '花巴哩貓',
    romanization: 'hue-pa-li-niau',
    meaning: '形容圖案顏色雜亂；臉上沾滿食物殘渣',
    audioSrc: 'sound.mp3/sound3.mp3',
    designImageSrc: 'top.png/top-03.png',
    videoSrc: 'video.mp4/video3.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '花', romanization: 'hue',  svgSrc: 'font.svg/font-03/font-03-1.svg' },
      { char: '巴', romanization: 'pa',   svgSrc: 'font.svg/font-03/font-03-2.svg' },
      { char: '哩', romanization: 'li',   svgSrc: 'font.svg/font-03/font-03-3.svg' },
      { char: '貓', romanization: 'niau', svgSrc: 'font.svg/font-03/font-03-4.svg' }
    ]
  },
  {
    id: 4,
    text: '佮意',
    romanization: 'kah-ì',
    meaning: '中意、喜歡、滿意',
    audioSrc: 'sound.mp3/sound4.mp3',
    designImageSrc: 'top.png/top-04.png',
    videoSrc: 'video.mp4/video4.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '佮', romanization: 'kah', svgSrc: 'font.svg/font-04/font-04-1.svg' },
      { char: '意', romanization: 'ì',   svgSrc: 'font.svg/font-04/font-04-2.svg' }
    ]
  },
  {
    id: 5,
    text: '大趁錢',
    romanization: 'tuā-thàn-tsînn',
    meaning: '發大財、賺大錢',
    audioSrc: 'sound.mp3/sound5.mp3',
    designImageSrc: 'top.png/top-05.png',
    videoSrc: 'video.mp4/video5.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '大', romanization: 'tuā',   svgSrc: 'font.svg/font-05/font-05-1.svg' },
      { char: '趁', romanization: 'thàn',  svgSrc: 'font.svg/font-05/font-05-2.svg' },
      { char: '錢', romanization: 'tsînn', svgSrc: 'font.svg/font-05/font-05-3.svg' }
    ]
  },
  {
    id: 6,
    text: '鬥相共',
    romanization: 'tàu-sann-kāng',
    meaning: '幫忙、幫助他人做事或解決困難',
    audioSrc: 'sound.mp3/sound6.mp3',
    designImageSrc: 'top.png/top-06.png',
    videoSrc: 'video.mp4/video6.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '鬥', romanization: 'tàu',  svgSrc: 'font.svg/font-06/font-06-1.svg' },
      { char: '相', romanization: 'sann', svgSrc: 'font.svg/font-06/font-06-2.svg' },
      { char: '共', romanization: 'kāng', svgSrc: 'font.svg/font-06/font-06-3.svg' }
    ]
  },
  {
    id: 7,
    text: '浮浪貢',
    romanization: 'phû-lōng-kòng',
    meaning: '浪子；游手好閒、不務正業的人',
    audioSrc: 'sound.mp3/sound7.mp3',
    designImageSrc: 'top.png/top-07.png',
    videoSrc: 'video.mp4/video7.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '浮', romanization: 'phû',  svgSrc: 'font.svg/font-07/font-07-1.svg' },
      { char: '浪', romanization: 'lōng', svgSrc: 'font.svg/font-07/font-07-2.svg' },
      { char: '貢', romanization: 'kòng', svgSrc: 'font.svg/font-07/font-07-3.svg' }
    ]
  },
  {
    id: 8,
    text: '慼心',
    romanization: 'tsheh-sim',
    meaning: '因怨恨而傷心、絕望',
    audioSrc: 'sound.mp3/sound8.mp3',
    designImageSrc: 'top.png/top-08.png',
    videoSrc: 'video.mp4/video8.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '慼', romanization: 'tsheh', svgSrc: 'font.svg/font-08/font-08-1.svg' },
      { char: '心', romanization: 'sim',   svgSrc: 'font.svg/font-08/font-08-2.svg' }
    ]
  },
  {
    id: 9,
    text: '鹹汫',
    romanization: 'kiâm-tsiánn',
    meaning: '味道的鹹或淡',
    audioSrc: 'sound.mp3/sound9.mp3',
    designImageSrc: 'top.png/top-09.png',
    videoSrc: 'video.mp4/video9.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '鹹', romanization: 'kiâm',   svgSrc: 'font.svg/font-09/font-09-1.svg' },
      { char: '汫', romanization: 'tsiánn', svgSrc: 'font.svg/font-09/font-09-2.svg' }
    ]
  },
  {
    id: 10,
    text: '鋩角',
    romanization: 'mê-kak',
    meaning: '芒角、稜角；事情的原則或關鍵',
    audioSrc: 'sound.mp3/sound10.mp3',
    designImageSrc: 'top.png/top-10.png',
    videoSrc: 'video.mp4/video10.mp4',
    viewBox: '0 0 595.28 963.78',
    characters: [
      { char: '鋩', romanization: 'mê',  svgSrc: 'font.svg/font-10/font10-1.svg' },
      { char: '角', romanization: 'kak', svgSrc: 'font.svg/font-10/font10-2.svg' }
    ]
  }
];
