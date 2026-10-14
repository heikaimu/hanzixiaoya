(function (root) {
  // 现行统编人教版：上册识字表280字、下册410字，按教材课次排列。
  // 再次出现的多音字附在otherReadings，不重复计入识字量；例词为自主整理。
  const chars = [
  {
    "char": "天",
    "pinyin": "tiān",
    "word": "天空",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1"
  },
  {
    "char": "地",
    "pinyin": "dì",
    "word": "土地",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1",
    "otherReadings": [
      {
        "pinyin": "de",
        "word": "慢慢地",
        "id": "g1a-24",
        "semester": "上册",
        "unit": 5,
        "lesson": "阅读 4 四季",
        "page": 66
      }
    ]
  },
  {
    "char": "人",
    "pinyin": "rén",
    "word": "大人",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1"
  },
  {
    "char": "你",
    "pinyin": "nǐ",
    "word": "你好",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1"
  },
  {
    "char": "我",
    "pinyin": "wǒ",
    "word": "我们",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1"
  },
  {
    "char": "他",
    "pinyin": "tā",
    "word": "他们",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 1 天地人",
    "page": 8,
    "lessonId": "g1a-1"
  },
  {
    "char": "一",
    "pinyin": "yī",
    "word": "一个",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "二",
    "pinyin": "èr",
    "word": "二月",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "三",
    "pinyin": "sān",
    "word": "三天",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "四",
    "pinyin": "sì",
    "word": "四季",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "五",
    "pinyin": "wǔ",
    "word": "五个",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "上",
    "pinyin": "shàng",
    "word": "上面",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "下",
    "pinyin": "xià",
    "word": "下面",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 2 金木水火土",
    "page": 9,
    "lessonId": "g1a-2"
  },
  {
    "char": "口",
    "pinyin": "kǒu",
    "word": "人口",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "耳",
    "pinyin": "ěr",
    "word": "耳朵",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "目",
    "pinyin": "mù",
    "word": "耳目",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "手",
    "pinyin": "shǒu",
    "word": "小手",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "足",
    "pinyin": "zú",
    "word": "手足",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "站",
    "pinyin": "zhàn",
    "word": "车站",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "坐",
    "pinyin": "zuò",
    "word": "坐下",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 3 口耳目手足",
    "page": 11,
    "lessonId": "g1a-3"
  },
  {
    "char": "日",
    "pinyin": "rì",
    "word": "日子",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "月",
    "pinyin": "yuè",
    "word": "月亮",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "山",
    "pinyin": "shān",
    "word": "大山",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "川",
    "pinyin": "chuān",
    "word": "山川",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "水",
    "pinyin": "shuǐ",
    "word": "水果",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "火",
    "pinyin": "huǒ",
    "word": "火花",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "田",
    "pinyin": "tián",
    "word": "田地",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "禾",
    "pinyin": "hé",
    "word": "禾苗",
    "semester": "上册",
    "unit": 1,
    "lesson": "识字 4 日月山川",
    "page": 13,
    "lessonId": "g1a-4"
  },
  {
    "char": "六",
    "pinyin": "liù",
    "word": "六月",
    "semester": "上册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 15,
    "lessonId": "g1a-5"
  },
  {
    "char": "七",
    "pinyin": "qī",
    "word": "七天",
    "semester": "上册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 15,
    "lessonId": "g1a-5"
  },
  {
    "char": "八",
    "pinyin": "bā",
    "word": "八方",
    "semester": "上册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 15,
    "lessonId": "g1a-5"
  },
  {
    "char": "九",
    "pinyin": "jiǔ",
    "word": "九月",
    "semester": "上册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 15,
    "lessonId": "g1a-5"
  },
  {
    "char": "十",
    "pinyin": "shí",
    "word": "十个",
    "semester": "上册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 15,
    "lessonId": "g1a-5"
  },
  {
    "char": "爸",
    "pinyin": "bà",
    "word": "爸爸",
    "semester": "上册",
    "unit": 2,
    "lesson": "汉语拼音 3 b p m f",
    "page": 24,
    "lessonId": "g1a-6"
  },
  {
    "char": "妈",
    "pinyin": "mā",
    "word": "妈妈",
    "semester": "上册",
    "unit": 2,
    "lesson": "汉语拼音 3 b p m f",
    "page": 24,
    "lessonId": "g1a-6"
  },
  {
    "char": "大",
    "pinyin": "dà",
    "word": "大树",
    "semester": "上册",
    "unit": 2,
    "lesson": "汉语拼音 4 d t n l",
    "page": 26,
    "lessonId": "g1a-7"
  },
  {
    "char": "马",
    "pinyin": "mǎ",
    "word": "小马",
    "semester": "上册",
    "unit": 2,
    "lesson": "汉语拼音 4 d t n l",
    "page": 26,
    "lessonId": "g1a-7"
  },
  {
    "char": "路",
    "pinyin": "lù",
    "word": "马路",
    "semester": "上册",
    "unit": 2,
    "lesson": "汉语拼音 4 d t n l",
    "page": 26,
    "lessonId": "g1a-7"
  },
  {
    "char": "土",
    "pinyin": "tǔ",
    "word": "泥土",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "本",
    "pinyin": "běn",
    "word": "书本",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "学",
    "pinyin": "xué",
    "word": "学习",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "校",
    "pinyin": "xiào",
    "word": "学校",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "班",
    "pinyin": "bān",
    "word": "班级",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "级",
    "pinyin": "jí",
    "word": "班级",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "姓",
    "pinyin": "xìng",
    "word": "姓名",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "名",
    "pinyin": "míng",
    "word": "名字",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "王",
    "pinyin": "wáng",
    "word": "国王",
    "semester": "上册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 28,
    "lessonId": "g1a-8"
  },
  {
    "char": "哥",
    "pinyin": "gē",
    "word": "哥哥",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 5 g k h",
    "page": 32,
    "lessonId": "g1a-9"
  },
  {
    "char": "弟",
    "pinyin": "dì",
    "word": "弟弟",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 5 g k h",
    "page": 32,
    "lessonId": "g1a-9"
  },
  {
    "char": "画",
    "pinyin": "huà",
    "word": "画画",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 5 g k h",
    "page": 32,
    "lessonId": "g1a-9"
  },
  {
    "char": "花",
    "pinyin": "huā",
    "word": "花朵",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 5 g k h",
    "page": 32,
    "lessonId": "g1a-9"
  },
  {
    "char": "打",
    "pinyin": "dǎ",
    "word": "打球",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 6 j q x",
    "page": 34,
    "lessonId": "g1a-10"
  },
  {
    "char": "棋",
    "pinyin": "qí",
    "word": "下棋",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 6 j q x",
    "page": 34,
    "lessonId": "g1a-10"
  },
  {
    "char": "积",
    "pinyin": "jī",
    "word": "积木",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 6 j q x",
    "page": 34,
    "lessonId": "g1a-10"
  },
  {
    "char": "木",
    "pinyin": "mù",
    "word": "木头",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 6 j q x",
    "page": 34,
    "lessonId": "g1a-10"
  },
  {
    "char": "字",
    "pinyin": "zì",
    "word": "汉字",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 7 z c s",
    "page": 36,
    "lessonId": "g1a-11"
  },
  {
    "char": "词",
    "pinyin": "cí",
    "word": "词语",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 7 z c s",
    "page": 36,
    "lessonId": "g1a-11"
  },
  {
    "char": "句",
    "pinyin": "jù",
    "word": "句子",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 7 z c s",
    "page": 36,
    "lessonId": "g1a-11"
  },
  {
    "char": "子",
    "pinyin": "zǐ",
    "word": "子女",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 7 z c s",
    "page": 36,
    "lessonId": "g1a-11"
  },
  {
    "char": "桌",
    "pinyin": "zhuō",
    "word": "桌子",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 8 zh ch sh r",
    "page": 38,
    "lessonId": "g1a-12"
  },
  {
    "char": "纸",
    "pinyin": "zhǐ",
    "word": "白纸",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 8 zh ch sh r",
    "page": 38,
    "lessonId": "g1a-12"
  },
  {
    "char": "读",
    "pinyin": "dú",
    "word": "读书",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 8 zh ch sh r",
    "page": 38,
    "lessonId": "g1a-12"
  },
  {
    "char": "书",
    "pinyin": "shū",
    "word": "书本",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 8 zh ch sh r",
    "page": 38,
    "lessonId": "g1a-12"
  },
  {
    "char": "鱼",
    "pinyin": "yú",
    "word": "小鱼",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 9 y w",
    "page": 40,
    "lessonId": "g1a-13"
  },
  {
    "char": "鸭",
    "pinyin": "yā",
    "word": "小鸭",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 9 y w",
    "page": 40,
    "lessonId": "g1a-13"
  },
  {
    "char": "乌",
    "pinyin": "wū",
    "word": "乌龟",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 9 y w",
    "page": 40,
    "lessonId": "g1a-13"
  },
  {
    "char": "鸦",
    "pinyin": "yā",
    "word": "乌鸦",
    "semester": "上册",
    "unit": 3,
    "lesson": "汉语拼音 9 y w",
    "page": 40,
    "lessonId": "g1a-13"
  },
  {
    "char": "午",
    "pinyin": "wǔ",
    "word": "中午",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "星",
    "pinyin": "xīng",
    "word": "星星",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "期",
    "pinyin": "qī",
    "word": "星期",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "语",
    "pinyin": "yǔ",
    "word": "语文",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "文",
    "pinyin": "wén",
    "word": "语文",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "数",
    "pinyin": "shù",
    "word": "数字",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14",
    "otherReadings": [
      {
        "pinyin": "shǔ",
        "word": "数一数",
        "id": "g1a-37",
        "semester": "上册",
        "unit": 8,
        "lesson": "阅读 10 雨点儿",
        "page": 99
      }
    ]
  },
  {
    "char": "写",
    "pinyin": "xiě",
    "word": "写字",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "会",
    "pinyin": "huì",
    "word": "开会",
    "semester": "上册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 42,
    "lessonId": "g1a-14"
  },
  {
    "char": "白",
    "pinyin": "bái",
    "word": "白云",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 10 ai ei ui",
    "page": 45,
    "lessonId": "g1a-15"
  },
  {
    "char": "菜",
    "pinyin": "cài",
    "word": "青菜",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 10 ai ei ui",
    "page": 45,
    "lessonId": "g1a-15"
  },
  {
    "char": "西",
    "pinyin": "xī",
    "word": "西方",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 10 ai ei ui",
    "page": 45,
    "lessonId": "g1a-15"
  },
  {
    "char": "瓜",
    "pinyin": "guā",
    "word": "西瓜",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 10 ai ei ui",
    "page": 45,
    "lessonId": "g1a-15"
  },
  {
    "char": "果",
    "pinyin": "guǒ",
    "word": "水果",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 10 ai ei ui",
    "page": 45,
    "lessonId": "g1a-15"
  },
  {
    "char": "小",
    "pinyin": "xiǎo",
    "word": "小鸟",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 11 ao ou iu",
    "page": 47,
    "lessonId": "g1a-16"
  },
  {
    "char": "桥",
    "pinyin": "qiáo",
    "word": "小桥",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 11 ao ou iu",
    "page": 47,
    "lessonId": "g1a-16"
  },
  {
    "char": "流",
    "pinyin": "liú",
    "word": "流水",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 11 ao ou iu",
    "page": 47,
    "lessonId": "g1a-16"
  },
  {
    "char": "柳",
    "pinyin": "liǔ",
    "word": "柳树",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 11 ao ou iu",
    "page": 47,
    "lessonId": "g1a-16"
  },
  {
    "char": "开",
    "pinyin": "kāi",
    "word": "开门",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 12 ie üe er",
    "page": 49,
    "lessonId": "g1a-17"
  },
  {
    "char": "雪",
    "pinyin": "xuě",
    "word": "雪花",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 12 ie üe er",
    "page": 49,
    "lessonId": "g1a-17"
  },
  {
    "char": "夜",
    "pinyin": "yè",
    "word": "夜晚",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 12 ie üe er",
    "page": 49,
    "lessonId": "g1a-17"
  },
  {
    "char": "色",
    "pinyin": "sè",
    "word": "颜色",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 12 ie üe er",
    "page": 49,
    "lessonId": "g1a-17"
  },
  {
    "char": "美",
    "pinyin": "měi",
    "word": "美丽",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 12 ie üe er",
    "page": 49,
    "lessonId": "g1a-17"
  },
  {
    "char": "蓝",
    "pinyin": "lán",
    "word": "蓝天",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 13 an en in un ün",
    "page": 51,
    "lessonId": "g1a-18"
  },
  {
    "char": "云",
    "pinyin": "yún",
    "word": "白云",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 13 an en in un ün",
    "page": 51,
    "lessonId": "g1a-18"
  },
  {
    "char": "草",
    "pinyin": "cǎo",
    "word": "小草",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 13 an en in un ün",
    "page": 51,
    "lessonId": "g1a-18"
  },
  {
    "char": "原",
    "pinyin": "yuán",
    "word": "草原",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 13 an en in un ün",
    "page": 51,
    "lessonId": "g1a-18"
  },
  {
    "char": "冰",
    "pinyin": "bīng",
    "word": "冰雪",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 14 ang eng ing ong",
    "page": 54,
    "lessonId": "g1a-19"
  },
  {
    "char": "自",
    "pinyin": "zì",
    "word": "自己",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 14 ang eng ing ong",
    "page": 54,
    "lessonId": "g1a-19"
  },
  {
    "char": "行",
    "pinyin": "xíng",
    "word": "行走",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 14 ang eng ing ong",
    "page": 54,
    "lessonId": "g1a-19"
  },
  {
    "char": "车",
    "pinyin": "chē",
    "word": "汽车",
    "semester": "上册",
    "unit": 4,
    "lesson": "汉语拼音 14 ang eng ing ong",
    "page": 54,
    "lessonId": "g1a-19"
  },
  {
    "char": "晚",
    "pinyin": "wǎn",
    "word": "晚上",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "昨",
    "pinyin": "zuó",
    "word": "昨天",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "今",
    "pinyin": "jīn",
    "word": "今天",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "明",
    "pinyin": "míng",
    "word": "明天",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "个",
    "pinyin": "gè",
    "word": "一个",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "这",
    "pinyin": "zhè",
    "word": "这里",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "去",
    "pinyin": "qù",
    "word": "出去",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "年",
    "pinyin": "nián",
    "word": "新年",
    "semester": "上册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 56,
    "lessonId": "g1a-20"
  },
  {
    "char": "秋",
    "pinyin": "qiū",
    "word": "秋天",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "气",
    "pinyin": "qì",
    "word": "空气",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "了",
    "pinyin": "le",
    "word": "好了",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21",
    "otherReadings": [
      {
        "pinyin": "liǎo",
        "word": "了解",
        "id": "g1b-16",
        "semester": "下册",
        "unit": 4,
        "lesson": "阅读 9 端午粽",
        "page": 42
      }
    ]
  },
  {
    "char": "树",
    "pinyin": "shù",
    "word": "大树",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "叶",
    "pinyin": "yè",
    "word": "树叶",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "黄",
    "pinyin": "huáng",
    "word": "黄色",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "片",
    "pinyin": "piàn",
    "word": "一片",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "从",
    "pinyin": "cóng",
    "word": "从前",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "来",
    "pinyin": "lái",
    "word": "回来",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "飞",
    "pinyin": "fēi",
    "word": "飞鸟",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 1 秋天",
    "page": 60,
    "lessonId": "g1a-21"
  },
  {
    "char": "江",
    "pinyin": "jiāng",
    "word": "江水",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "南",
    "pinyin": "nán",
    "word": "南方",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "可",
    "pinyin": "kě",
    "word": "可爱",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "采",
    "pinyin": "cǎi",
    "word": "采花",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "莲",
    "pinyin": "lián",
    "word": "莲花",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "戏",
    "pinyin": "xì",
    "word": "游戏",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "间",
    "pinyin": "jiān",
    "word": "中间",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "东",
    "pinyin": "dōng",
    "word": "东方",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "北",
    "pinyin": "běi",
    "word": "北方",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 2 江南",
    "page": 62,
    "lessonId": "g1a-22"
  },
  {
    "char": "的",
    "pinyin": "de",
    "word": "我的",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "家",
    "pinyin": "jiā",
    "word": "回家",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "鸡",
    "pinyin": "jī",
    "word": "小鸡",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "竹",
    "pinyin": "zhú",
    "word": "竹子",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "牙",
    "pinyin": "yá",
    "word": "牙齿",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "用",
    "pinyin": "yòng",
    "word": "用心",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "几",
    "pinyin": "jǐ",
    "word": "几个",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "步",
    "pinyin": "bù",
    "word": "跑步",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "没",
    "pinyin": "méi",
    "word": "没有",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "参",
    "pinyin": "cān",
    "word": "参加",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "加",
    "pinyin": "jiā",
    "word": "加法",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 3 雪地里的小画家",
    "page": 64,
    "lessonId": "g1a-23"
  },
  {
    "char": "鸟",
    "pinyin": "niǎo",
    "word": "小鸟",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "说",
    "pinyin": "shuō",
    "word": "说话",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "是",
    "pinyin": "shì",
    "word": "是的",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "春",
    "pinyin": "chūn",
    "word": "春天",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "青",
    "pinyin": "qīng",
    "word": "青草",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "蛙",
    "pinyin": "wā",
    "word": "青蛙",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "夏",
    "pinyin": "xià",
    "word": "夏天",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "着",
    "pinyin": "zhe",
    "word": "看着",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24",
    "otherReadings": [
      {
        "pinyin": "zháo",
        "word": "找着",
        "id": "g1a-36",
        "semester": "上册",
        "unit": 8,
        "lesson": "阅读 9 乌鸦喝水",
        "page": 97
      }
    ]
  },
  {
    "char": "皮",
    "pinyin": "pí",
    "word": "皮球",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "就",
    "pinyin": "jiù",
    "word": "就是",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "冬",
    "pinyin": "dōng",
    "word": "冬天",
    "semester": "上册",
    "unit": 5,
    "lesson": "阅读 4 四季",
    "page": 66,
    "lessonId": "g1a-24"
  },
  {
    "char": "男",
    "pinyin": "nán",
    "word": "男孩",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "女",
    "pinyin": "nǚ",
    "word": "女孩",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "关",
    "pinyin": "guān",
    "word": "关门",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "正",
    "pinyin": "zhèng",
    "word": "正在",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "反",
    "pinyin": "fǎn",
    "word": "反面",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "先",
    "pinyin": "xiān",
    "word": "先后",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "后",
    "pinyin": "hòu",
    "word": "后面",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "内",
    "pinyin": "nèi",
    "word": "内外",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "外",
    "pinyin": "wài",
    "word": "外面",
    "semester": "上册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 68,
    "lessonId": "g1a-25"
  },
  {
    "char": "对",
    "pinyin": "duì",
    "word": "对方",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "歌",
    "pinyin": "gē",
    "word": "唱歌",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "雨",
    "pinyin": "yǔ",
    "word": "下雨",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "风",
    "pinyin": "fēng",
    "word": "大风",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "虫",
    "pinyin": "chóng",
    "word": "小虫",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "清",
    "pinyin": "qīng",
    "word": "清水",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "绿",
    "pinyin": "lǜ",
    "word": "绿叶",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "桃",
    "pinyin": "táo",
    "word": "桃子",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "红",
    "pinyin": "hóng",
    "word": "红花",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 5 对韵歌",
    "page": 73,
    "lessonId": "g1a-26"
  },
  {
    "char": "力",
    "pinyin": "lì",
    "word": "力气",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "尖",
    "pinyin": "jiān",
    "word": "笔尖",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "尘",
    "pinyin": "chén",
    "word": "灰尘",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "众",
    "pinyin": "zhòng",
    "word": "众人",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "双",
    "pinyin": "shuāng",
    "word": "双手",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "林",
    "pinyin": "lín",
    "word": "森林",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "森",
    "pinyin": "sēn",
    "word": "森林",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "不",
    "pinyin": "bù",
    "word": "不是",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "条",
    "pinyin": "tiáo",
    "word": "面条",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "心",
    "pinyin": "xīn",
    "word": "爱心",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "金",
    "pinyin": "jīn",
    "word": "金色",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 6 日月明",
    "page": 74,
    "lessonId": "g1a-27"
  },
  {
    "char": "包",
    "pinyin": "bāo",
    "word": "书包",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "尺",
    "pinyin": "chǐ",
    "word": "尺子",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "作",
    "pinyin": "zuò",
    "word": "作业",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "业",
    "pinyin": "yè",
    "word": "作业",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "笔",
    "pinyin": "bǐ",
    "word": "铅笔",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "刀",
    "pinyin": "dāo",
    "word": "小刀",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "宝",
    "pinyin": "bǎo",
    "word": "宝贝",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "贝",
    "pinyin": "bèi",
    "word": "贝壳",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "少",
    "pinyin": "shǎo",
    "word": "多少",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "课",
    "pinyin": "kè",
    "word": "上课",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "早",
    "pinyin": "zǎo",
    "word": "早上",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 7 小书包",
    "page": 76,
    "lessonId": "g1a-28"
  },
  {
    "char": "升",
    "pinyin": "shēng",
    "word": "升起",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "国",
    "pinyin": "guó",
    "word": "祖国",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "旗",
    "pinyin": "qí",
    "word": "红旗",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "中",
    "pinyin": "zhōng",
    "word": "中国",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "们",
    "pinyin": "men",
    "word": "我们",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "声",
    "pinyin": "shēng",
    "word": "声音",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "起",
    "pinyin": "qǐ",
    "word": "起立",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "多",
    "pinyin": "duō",
    "word": "多少",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "么",
    "pinyin": "me",
    "word": "什么",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "向",
    "pinyin": "xiàng",
    "word": "方向",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "立",
    "pinyin": "lì",
    "word": "立正",
    "semester": "上册",
    "unit": 6,
    "lesson": "识字 8 升国旗",
    "page": 78,
    "lessonId": "g1a-29"
  },
  {
    "char": "老",
    "pinyin": "lǎo",
    "word": "老师",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "师",
    "pinyin": "shī",
    "word": "老师",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "工",
    "pinyin": "gōng",
    "word": "工人",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "厂",
    "pinyin": "chǎng",
    "word": "工厂",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "医",
    "pinyin": "yī",
    "word": "医生",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "院",
    "pinyin": "yuàn",
    "word": "医院",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "生",
    "pinyin": "shēng",
    "word": "学生",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "门",
    "pinyin": "mén",
    "word": "大门",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "卫",
    "pinyin": "wèi",
    "word": "门卫",
    "semester": "上册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 80,
    "lessonId": "g1a-30"
  },
  {
    "char": "船",
    "pinyin": "chuán",
    "word": "小船",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "弯",
    "pinyin": "wān",
    "word": "弯曲",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "儿",
    "pinyin": "ér",
    "word": "儿童",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "两",
    "pinyin": "liǎng",
    "word": "两人",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "头",
    "pinyin": "tóu",
    "word": "头发",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "在",
    "pinyin": "zài",
    "word": "正在",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "里",
    "pinyin": "lǐ",
    "word": "里面",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "看",
    "pinyin": "kàn",
    "word": "看见",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "见",
    "pinyin": "jiàn",
    "word": "见面",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "闪",
    "pinyin": "shǎn",
    "word": "闪光",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 5 小小的船",
    "page": 84,
    "lessonId": "g1a-31"
  },
  {
    "char": "影",
    "pinyin": "yǐng",
    "word": "影子",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "前",
    "pinyin": "qián",
    "word": "前面",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "常",
    "pinyin": "cháng",
    "word": "常常",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "黑",
    "pinyin": "hēi",
    "word": "黑色",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "狗",
    "pinyin": "gǒu",
    "word": "小狗",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "左",
    "pinyin": "zuǒ",
    "word": "左手",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "右",
    "pinyin": "yòu",
    "word": "右手",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "它",
    "pinyin": "tā",
    "word": "它们",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "好",
    "pinyin": "hǎo",
    "word": "你好",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "朋",
    "pinyin": "péng",
    "word": "朋友",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "友",
    "pinyin": "yǒu",
    "word": "朋友",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 6 影子",
    "page": 86,
    "lessonId": "g1a-32"
  },
  {
    "char": "件",
    "pinyin": "jiàn",
    "word": "一件",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "有",
    "pinyin": "yǒu",
    "word": "有人",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "和",
    "pinyin": "hé",
    "word": "和好",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "做",
    "pinyin": "zuò",
    "word": "做事",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "也",
    "pinyin": "yě",
    "word": "也是",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "办",
    "pinyin": "bàn",
    "word": "办法",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "到",
    "pinyin": "dào",
    "word": "到家",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "又",
    "pinyin": "yòu",
    "word": "又来",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "才",
    "pinyin": "cái",
    "word": "刚才",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "能",
    "pinyin": "néng",
    "word": "能够",
    "semester": "上册",
    "unit": 7,
    "lesson": "阅读 7 两件宝",
    "page": 88,
    "lessonId": "g1a-33"
  },
  {
    "char": "爷",
    "pinyin": "yé",
    "word": "爷爷",
    "semester": "上册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 90,
    "lessonId": "g1a-34"
  },
  {
    "char": "奶",
    "pinyin": "nǎi",
    "word": "奶奶",
    "semester": "上册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 90,
    "lessonId": "g1a-34"
  },
  {
    "char": "叔",
    "pinyin": "shū",
    "word": "叔叔",
    "semester": "上册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 90,
    "lessonId": "g1a-34"
  },
  {
    "char": "姐",
    "pinyin": "jiě",
    "word": "姐姐",
    "semester": "上册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 90,
    "lessonId": "g1a-34"
  },
  {
    "char": "妹",
    "pinyin": "mèi",
    "word": "妹妹",
    "semester": "上册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 90,
    "lessonId": "g1a-34"
  },
  {
    "char": "比",
    "pinyin": "bǐ",
    "word": "比赛",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "尾",
    "pinyin": "wěi",
    "word": "尾巴",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "巴",
    "pinyin": "bā",
    "word": "尾巴",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "谁",
    "pinyin": "shuí",
    "word": "是谁",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "长",
    "pinyin": "cháng",
    "word": "长短",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35",
    "otherReadings": [
      {
        "pinyin": "zhǎng",
        "word": "长大",
        "id": "g1a-37",
        "semester": "上册",
        "unit": 8,
        "lesson": "阅读 10 雨点儿",
        "page": 99
      }
    ]
  },
  {
    "char": "短",
    "pinyin": "duǎn",
    "word": "长短",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "把",
    "pinyin": "bǎ",
    "word": "把手",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "伞",
    "pinyin": "sǎn",
    "word": "雨伞",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "兔",
    "pinyin": "tù",
    "word": "白兔",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "最",
    "pinyin": "zuì",
    "word": "最好",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "公",
    "pinyin": "gōng",
    "word": "外公",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 8 比尾巴",
    "page": 95,
    "lessonId": "g1a-35"
  },
  {
    "char": "喝",
    "pinyin": "hē",
    "word": "喝水",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "只",
    "pinyin": "zhī",
    "word": "一只",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36",
    "otherReadings": [
      {
        "pinyin": "zhǐ",
        "word": "只有",
        "id": "g1b-11",
        "semester": "下册",
        "unit": 3,
        "lesson": "阅读 5 树和喜鹊",
        "page": 29
      }
    ]
  },
  {
    "char": "处",
    "pinyin": "chù",
    "word": "住处",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "找",
    "pinyin": "zhǎo",
    "word": "找到",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "许",
    "pinyin": "xǔ",
    "word": "许多",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "石",
    "pinyin": "shí",
    "word": "石头",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "出",
    "pinyin": "chū",
    "word": "出来",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "法",
    "pinyin": "fǎ",
    "word": "方法",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "放",
    "pinyin": "fàng",
    "word": "放下",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "进",
    "pinyin": "jìn",
    "word": "进去",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "高",
    "pinyin": "gāo",
    "word": "高山",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 9 乌鸦喝水",
    "page": 97,
    "lessonId": "g1a-36"
  },
  {
    "char": "点",
    "pinyin": "diǎn",
    "word": "点头",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "彩",
    "pinyin": "cǎi",
    "word": "彩色",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "半",
    "pinyin": "bàn",
    "word": "一半",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "空",
    "pinyin": "kōng",
    "word": "天空",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37",
    "otherReadings": [
      {
        "pinyin": "kòng",
        "word": "空地",
        "id": "g1b-26",
        "semester": "下册",
        "unit": 6,
        "lesson": "阅读 13 要下雨了",
        "page": 69
      }
    ]
  },
  {
    "char": "问",
    "pinyin": "wèn",
    "word": "问好",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "回",
    "pinyin": "huí",
    "word": "回家",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "答",
    "pinyin": "dá",
    "word": "回答",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "方",
    "pinyin": "fāng",
    "word": "方向",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "久",
    "pinyin": "jiǔ",
    "word": "永久",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "更",
    "pinyin": "gèng",
    "word": "更好",
    "semester": "上册",
    "unit": 8,
    "lesson": "阅读 10 雨点儿",
    "page": 99,
    "lessonId": "g1a-37"
  },
  {
    "char": "牛",
    "pinyin": "niú",
    "word": "水牛",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "羊",
    "pinyin": "yáng",
    "word": "山羊",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "爪",
    "pinyin": "zhuǎ",
    "word": "爪子",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "旦",
    "pinyin": "dàn",
    "word": "元旦",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "拼",
    "pinyin": "pīn",
    "word": "拼图",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "音",
    "pinyin": "yīn",
    "word": "声音",
    "semester": "上册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 101,
    "lessonId": "g1a-38"
  },
  {
    "char": "霜",
    "pinyin": "shuāng",
    "word": "霜花",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "吹",
    "pinyin": "chuī",
    "word": "吹风",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "落",
    "pinyin": "luò",
    "word": "落叶",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "降",
    "pinyin": "jiàng",
    "word": "下降",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "飘",
    "pinyin": "piāo",
    "word": "飘动",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "游",
    "pinyin": "yóu",
    "word": "游泳",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "池",
    "pinyin": "chí",
    "word": "水池",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "入",
    "pinyin": "rù",
    "word": "入口",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 1 春夏秋冬",
    "page": 2,
    "lessonId": "g1b-1"
  },
  {
    "char": "氏",
    "pinyin": "shì",
    "word": "姓氏",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "什",
    "pinyin": "shén",
    "word": "什么",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "李",
    "pinyin": "lǐ",
    "word": "李子",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "张",
    "pinyin": "zhāng",
    "word": "一张",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "弓",
    "pinyin": "gōng",
    "word": "弓箭",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "古",
    "pinyin": "gǔ",
    "word": "古代",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "胡",
    "pinyin": "hú",
    "word": "胡子",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "吴",
    "pinyin": "wú",
    "word": "姓吴",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "言",
    "pinyin": "yán",
    "word": "语言",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "孙",
    "pinyin": "sūn",
    "word": "孙子",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 2 姓氏歌",
    "page": 4,
    "lessonId": "g1b-2"
  },
  {
    "char": "河",
    "pinyin": "hé",
    "word": "河水",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "晴",
    "pinyin": "qíng",
    "word": "晴天",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "眼",
    "pinyin": "yǎn",
    "word": "眼睛",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "睛",
    "pinyin": "jīng",
    "word": "眼睛",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "保",
    "pinyin": "bǎo",
    "word": "保护",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "护",
    "pinyin": "hù",
    "word": "保护",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "苗",
    "pinyin": "miáo",
    "word": "禾苗",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "吃",
    "pinyin": "chī",
    "word": "吃饭",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "事",
    "pinyin": "shì",
    "word": "故事",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "情",
    "pinyin": "qíng",
    "word": "心情",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "请",
    "pinyin": "qǐng",
    "word": "请坐",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "让",
    "pinyin": "ràng",
    "word": "让座",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 3 小青蛙",
    "page": 6,
    "lessonId": "g1b-3"
  },
  {
    "char": "猜",
    "pinyin": "cāi",
    "word": "猜谜",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "边",
    "pinyin": "biān",
    "word": "身边",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "凉",
    "pinyin": "liáng",
    "word": "凉快",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "喜",
    "pinyin": "xǐ",
    "word": "喜欢",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "欢",
    "pinyin": "huān",
    "word": "欢笑",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "时",
    "pinyin": "shí",
    "word": "时间",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "怕",
    "pinyin": "pà",
    "word": "害怕",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "攻",
    "pinyin": "gōng",
    "word": "进攻",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "令",
    "pinyin": "lìng",
    "word": "命令",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "感",
    "pinyin": "gǎn",
    "word": "感谢",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "动",
    "pinyin": "dòng",
    "word": "动物",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "万",
    "pinyin": "wàn",
    "word": "万里",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "无",
    "pinyin": "wú",
    "word": "无声",
    "semester": "下册",
    "unit": 1,
    "lesson": "识字 4 猜字谜",
    "page": 8,
    "lessonId": "g1b-4"
  },
  {
    "char": "识",
    "pinyin": "shí",
    "word": "识字",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "组",
    "pinyin": "zǔ",
    "word": "小组",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "计",
    "pinyin": "jì",
    "word": "计算",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "算",
    "pinyin": "suàn",
    "word": "计算",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "减",
    "pinyin": "jiǎn",
    "word": "减法",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "式",
    "pinyin": "shì",
    "word": "方式",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "图",
    "pinyin": "tú",
    "word": "图画",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "形",
    "pinyin": "xíng",
    "word": "形状",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "卡",
    "pinyin": "kǎ",
    "word": "卡片",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "合",
    "pinyin": "hé",
    "word": "合力",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "唱",
    "pinyin": "chàng",
    "word": "唱歌",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "团",
    "pinyin": "tuán",
    "word": "团圆",
    "semester": "下册",
    "unit": 1,
    "lesson": "语文园地一",
    "page": 10,
    "lessonId": "g1b-5"
  },
  {
    "char": "热",
    "pinyin": "rè",
    "word": "热水",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "爱",
    "pinyin": "ài",
    "word": "爱心",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "共",
    "pinyin": "gòng",
    "word": "一共",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "产",
    "pinyin": "chǎn",
    "word": "生产",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "党",
    "pinyin": "dǎng",
    "word": "党员",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "太",
    "pinyin": "tài",
    "word": "太阳",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "阳",
    "pinyin": "yáng",
    "word": "太阳",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "光",
    "pinyin": "guāng",
    "word": "阳光",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "怀",
    "pinyin": "huái",
    "word": "怀抱",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "抱",
    "pinyin": "bào",
    "word": "拥抱",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "幸",
    "pinyin": "xìng",
    "word": "幸福",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "福",
    "pinyin": "fú",
    "word": "幸福",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "成",
    "pinyin": "chéng",
    "word": "成长",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 1 热爱中国共产党",
    "page": 16,
    "lessonId": "g1b-6"
  },
  {
    "char": "井",
    "pinyin": "jǐng",
    "word": "水井",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "城",
    "pinyin": "chéng",
    "word": "城市",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "村",
    "pinyin": "cūn",
    "word": "村子",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "毛",
    "pinyin": "máo",
    "word": "毛衣",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "主",
    "pinyin": "zhǔ",
    "word": "主人",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "席",
    "pinyin": "xí",
    "word": "主席",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "住",
    "pinyin": "zhù",
    "word": "住处",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "乡",
    "pinyin": "xiāng",
    "word": "家乡",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "亲",
    "pinyin": "qīn",
    "word": "亲人",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "战",
    "pinyin": "zhàn",
    "word": "战士",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "士",
    "pinyin": "shì",
    "word": "战士",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "想",
    "pinyin": "xiǎng",
    "word": "想念",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "念",
    "pinyin": "niàn",
    "word": "想念",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 2 吃水不忘挖井人",
    "page": 18,
    "lessonId": "g1b-7"
  },
  {
    "char": "告",
    "pinyin": "gào",
    "word": "告别",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "诉",
    "pinyin": "sù",
    "word": "告诉",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "走",
    "pinyin": "zǒu",
    "word": "走路",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "京",
    "pinyin": "jīng",
    "word": "北京",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "座",
    "pinyin": "zuò",
    "word": "座位",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "安",
    "pinyin": "ān",
    "word": "平安",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "广",
    "pinyin": "guǎng",
    "word": "广场",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "场",
    "pinyin": "chǎng",
    "word": "广场",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "非",
    "pinyin": "fēi",
    "word": "非常",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "宽",
    "pinyin": "kuān",
    "word": "宽大",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "丽",
    "pinyin": "lì",
    "word": "美丽",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "洁",
    "pinyin": "jié",
    "word": "清洁",
    "semester": "下册",
    "unit": 2,
    "lesson": "阅读 3 我多想去看看",
    "page": 20,
    "lessonId": "g1b-8"
  },
  {
    "char": "认",
    "pinyin": "rèn",
    "word": "认识",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "连",
    "pinyin": "lián",
    "word": "连线",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "选",
    "pinyin": "xuǎn",
    "word": "选出",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "圈",
    "pinyin": "quān",
    "word": "圆圈",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "涂",
    "pinyin": "tú",
    "word": "涂色",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "填",
    "pinyin": "tián",
    "word": "填写",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "试",
    "pinyin": "shì",
    "word": "试一试",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "练",
    "pinyin": "liàn",
    "word": "练习",
    "semester": "下册",
    "unit": 2,
    "lesson": "语文园地二",
    "page": 22,
    "lessonId": "g1b-9"
  },
  {
    "char": "玩",
    "pinyin": "wán",
    "word": "玩具",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "得",
    "pinyin": "de",
    "word": "跑得快",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10",
    "otherReadings": [
      {
        "pinyin": "děi",
        "word": "得去",
        "id": "g1b-12",
        "semester": "下册",
        "unit": 3,
        "lesson": "阅读 6 怎么都快乐",
        "page": 31
      }
    ]
  },
  {
    "char": "急",
    "pinyin": "jí",
    "word": "急忙",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "直",
    "pinyin": "zhí",
    "word": "直线",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "哭",
    "pinyin": "kū",
    "word": "哭声",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "跟",
    "pinyin": "gēn",
    "word": "跟着",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "忽",
    "pinyin": "hū",
    "word": "忽然",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "然",
    "pinyin": "rán",
    "word": "然后",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "听",
    "pinyin": "tīng",
    "word": "听见",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "喊",
    "pinyin": "hǎn",
    "word": "喊叫",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "快",
    "pinyin": "kuài",
    "word": "快乐",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "己",
    "pinyin": "jǐ",
    "word": "自己",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10"
  },
  {
    "char": "背",
    "pinyin": "bèi",
    "word": "后背",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 4 小公鸡和小鸭子",
    "page": 26,
    "lessonId": "g1b-10",
    "otherReadings": [
      {
        "pinyin": "bēi",
        "word": "背包",
        "id": "g1b-29",
        "semester": "下册",
        "unit": 7,
        "lesson": "阅读 15 一分钟",
        "page": 81
      }
    ]
  },
  {
    "char": "很",
    "pinyin": "hěn",
    "word": "很好",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "孤",
    "pinyin": "gū",
    "word": "孤单",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "单",
    "pinyin": "dān",
    "word": "单人",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "种",
    "pinyin": "zhòng",
    "word": "种树",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "每",
    "pinyin": "měi",
    "word": "每天",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "都",
    "pinyin": "dōu",
    "word": "都是",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "邻",
    "pinyin": "lín",
    "word": "邻居",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "居",
    "pinyin": "jū",
    "word": "居住",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "叫",
    "pinyin": "jiào",
    "word": "叫声",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "招",
    "pinyin": "zhāo",
    "word": "招手",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "呼",
    "pinyin": "hū",
    "word": "呼叫",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11"
  },
  {
    "char": "乐",
    "pinyin": "lè",
    "word": "快乐",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 5 树和喜鹊",
    "page": 29,
    "lessonId": "g1b-11",
    "otherReadings": [
      {
        "pinyin": "yuè",
        "word": "音乐",
        "id": "g1b-12",
        "semester": "下册",
        "unit": 3,
        "lesson": "阅读 6 怎么都快乐",
        "page": 31
      }
    ]
  },
  {
    "char": "怎",
    "pinyin": "zěn",
    "word": "怎么",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "独",
    "pinyin": "dú",
    "word": "独立",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "跳",
    "pinyin": "tiào",
    "word": "跳高",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "绳",
    "pinyin": "shéng",
    "word": "跳绳",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "当",
    "pinyin": "dāng",
    "word": "当时",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "还",
    "pinyin": "hái",
    "word": "还有",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "羽",
    "pinyin": "yǔ",
    "word": "羽毛",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "球",
    "pinyin": "qiú",
    "word": "皮球",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "劲",
    "pinyin": "jìn",
    "word": "有劲",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "轮",
    "pinyin": "lún",
    "word": "车轮",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "排",
    "pinyin": "pái",
    "word": "排队",
    "semester": "下册",
    "unit": 3,
    "lesson": "阅读 6 怎么都快乐",
    "page": 31,
    "lessonId": "g1b-12"
  },
  {
    "char": "母",
    "pinyin": "mǔ",
    "word": "母亲",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "页",
    "pinyin": "yè",
    "word": "书页",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "止",
    "pinyin": "zhǐ",
    "word": "停止",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "斤",
    "pinyin": "jīn",
    "word": "一斤",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "寸",
    "pinyin": "cùn",
    "word": "一寸",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "丁",
    "pinyin": "dīng",
    "word": "丁香",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "千",
    "pinyin": "qiān",
    "word": "千万",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "全",
    "pinyin": "quán",
    "word": "全家",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "元",
    "pinyin": "yuán",
    "word": "一元",
    "semester": "下册",
    "unit": 3,
    "lesson": "语文园地三",
    "page": 34,
    "lessonId": "g1b-13"
  },
  {
    "char": "静",
    "pinyin": "jìng",
    "word": "安静",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "思",
    "pinyin": "sī",
    "word": "思考",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "床",
    "pinyin": "chuáng",
    "word": "小床",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "疑",
    "pinyin": "yí",
    "word": "怀疑",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "举",
    "pinyin": "jǔ",
    "word": "举手",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "望",
    "pinyin": "wàng",
    "word": "希望",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "低",
    "pinyin": "dī",
    "word": "低头",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "故",
    "pinyin": "gù",
    "word": "故事",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 7 静夜思",
    "page": 39,
    "lessonId": "g1b-14"
  },
  {
    "char": "胆",
    "pinyin": "dǎn",
    "word": "胆子",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "敢",
    "pinyin": "gǎn",
    "word": "勇敢",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "勇",
    "pinyin": "yǒng",
    "word": "勇敢",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "讲",
    "pinyin": "jiǎng",
    "word": "讲话",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "窗",
    "pinyin": "chuāng",
    "word": "窗户",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "乱",
    "pinyin": "luàn",
    "word": "乱跑",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "拉",
    "pinyin": "lā",
    "word": "拉手",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "样",
    "pinyin": "yàng",
    "word": "一样",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "笑",
    "pinyin": "xiào",
    "word": "大笑",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "再",
    "pinyin": "zài",
    "word": "再见",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "睡",
    "pinyin": "shuì",
    "word": "睡觉",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "觉",
    "pinyin": "jiào",
    "word": "睡觉",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 8 夜色",
    "page": 40,
    "lessonId": "g1b-15"
  },
  {
    "char": "端",
    "pinyin": "duān",
    "word": "端午",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "粽",
    "pinyin": "zòng",
    "word": "粽子",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "节",
    "pinyin": "jié",
    "word": "节日",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "总",
    "pinyin": "zǒng",
    "word": "总共",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "煮",
    "pinyin": "zhǔ",
    "word": "煮饭",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "盼",
    "pinyin": "pàn",
    "word": "盼望",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "米",
    "pinyin": "mǐ",
    "word": "大米",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "枣",
    "pinyin": "zǎo",
    "word": "红枣",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "甜",
    "pinyin": "tián",
    "word": "香甜",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "分",
    "pinyin": "fēn",
    "word": "分开",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "鲜",
    "pinyin": "xiān",
    "word": "鲜花",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "肉",
    "pinyin": "ròu",
    "word": "牛肉",
    "semester": "下册",
    "unit": 4,
    "lesson": "阅读 9 端午粽",
    "page": 42,
    "lessonId": "g1b-16"
  },
  {
    "char": "册",
    "pinyin": "cè",
    "word": "书册",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "支",
    "pinyin": "zhī",
    "word": "一支",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "台",
    "pinyin": "tái",
    "word": "台灯",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "电",
    "pinyin": "diàn",
    "word": "闪电",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "视",
    "pinyin": "shì",
    "word": "电视",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "部",
    "pinyin": "bù",
    "word": "部分",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "机",
    "pinyin": "jī",
    "word": "飞机",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "衣",
    "pinyin": "yī",
    "word": "衣服",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "裤",
    "pinyin": "kù",
    "word": "裤子",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "被",
    "pinyin": "bèi",
    "word": "被子",
    "semester": "下册",
    "unit": 4,
    "lesson": "语文园地四",
    "page": 44,
    "lessonId": "g1b-17"
  },
  {
    "char": "物",
    "pinyin": "wù",
    "word": "动物",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "捉",
    "pinyin": "zhuō",
    "word": "捉虫",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "迷",
    "pinyin": "mí",
    "word": "迷路",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "藏",
    "pinyin": "cáng",
    "word": "藏起来",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "造",
    "pinyin": "zào",
    "word": "造句",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "蚂",
    "pinyin": "mǎ",
    "word": "蚂蚁",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "蚁",
    "pinyin": "yǐ",
    "word": "蚂蚁",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "运",
    "pinyin": "yùn",
    "word": "运动",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "食",
    "pinyin": "shí",
    "word": "食物",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "粮",
    "pinyin": "liáng",
    "word": "粮食",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "房",
    "pinyin": "fáng",
    "word": "房子",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "结",
    "pinyin": "jié",
    "word": "结网",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18",
    "otherReadings": [
      {
        "pinyin": "jiē",
        "word": "结果子",
        "id": "g1b-31",
        "semester": "下册",
        "unit": 7,
        "lesson": "阅读 17 小猴子下山",
        "page": 90
      }
    ]
  },
  {
    "char": "网",
    "pinyin": "wǎng",
    "word": "网子",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 5 动物儿歌",
    "page": 48,
    "lessonId": "g1b-18"
  },
  {
    "char": "圆",
    "pinyin": "yuán",
    "word": "圆形",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "严",
    "pinyin": "yán",
    "word": "严格",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "寒",
    "pinyin": "hán",
    "word": "寒风",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "酷",
    "pinyin": "kù",
    "word": "酷暑",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "暑",
    "pinyin": "shǔ",
    "word": "暑假",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "暖",
    "pinyin": "nuǎn",
    "word": "暖和",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "晨",
    "pinyin": "chén",
    "word": "早晨",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "细",
    "pinyin": "xì",
    "word": "细心",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "朝",
    "pinyin": "zhāo",
    "word": "朝阳",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "霞",
    "pinyin": "xiá",
    "word": "晚霞",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "夕",
    "pinyin": "xī",
    "word": "夕阳",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "杨",
    "pinyin": "yáng",
    "word": "杨树",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "香",
    "pinyin": "xiāng",
    "word": "花香",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 6 古对今",
    "page": 50,
    "lessonId": "g1b-19"
  },
  {
    "char": "操",
    "pinyin": "cāo",
    "word": "做操",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "拔",
    "pinyin": "bá",
    "word": "拔河",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "拍",
    "pinyin": "pāi",
    "word": "拍手",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "跑",
    "pinyin": "pǎo",
    "word": "跑步",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "踢",
    "pinyin": "tī",
    "word": "踢球",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "铃",
    "pinyin": "líng",
    "word": "铃声",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "真",
    "pinyin": "zhēn",
    "word": "认真",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "闹",
    "pinyin": "nào",
    "word": "热闹",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "丢",
    "pinyin": "diū",
    "word": "丢失",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "沙",
    "pinyin": "shā",
    "word": "沙子",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "身",
    "pinyin": "shēn",
    "word": "身体",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "体",
    "pinyin": "tǐ",
    "word": "身体",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 7 操场上",
    "page": 52,
    "lessonId": "g1b-20"
  },
  {
    "char": "之",
    "pinyin": "zhī",
    "word": "之前",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "初",
    "pinyin": "chū",
    "word": "初春",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "相",
    "pinyin": "xiāng",
    "word": "相互",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "近",
    "pinyin": "jìn",
    "word": "近处",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "习",
    "pinyin": "xí",
    "word": "学习",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "远",
    "pinyin": "yuǎn",
    "word": "远方",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "教",
    "pinyin": "jiào",
    "word": "教育",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "道",
    "pinyin": "dào",
    "word": "道路",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "专",
    "pinyin": "zhuān",
    "word": "专心",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "幼",
    "pinyin": "yòu",
    "word": "幼儿",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "玉",
    "pinyin": "yù",
    "word": "玉石",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "知",
    "pinyin": "zhī",
    "word": "知道",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "义",
    "pinyin": "yì",
    "word": "意义",
    "semester": "下册",
    "unit": 5,
    "lesson": "识字 8 人之初",
    "page": 54,
    "lessonId": "g1b-21"
  },
  {
    "char": "饭",
    "pinyin": "fàn",
    "word": "米饭",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "饱",
    "pinyin": "bǎo",
    "word": "吃饱",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "茶",
    "pinyin": "chá",
    "word": "茶水",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "泡",
    "pinyin": "pào",
    "word": "泡茶",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "轻",
    "pinyin": "qīng",
    "word": "轻轻",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "穿",
    "pinyin": "chuān",
    "word": "穿衣",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "袍",
    "pinyin": "páo",
    "word": "长袍",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "鞭",
    "pinyin": "biān",
    "word": "鞭炮",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "炮",
    "pinyin": "pào",
    "word": "鞭炮",
    "semester": "下册",
    "unit": 5,
    "lesson": "语文园地五",
    "page": 56,
    "lessonId": "g1b-22"
  },
  {
    "char": "诗",
    "pinyin": "shī",
    "word": "古诗",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "首",
    "pinyin": "shǒu",
    "word": "一首",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "偷",
    "pinyin": "tōu",
    "word": "小偷",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "浮",
    "pinyin": "fú",
    "word": "漂浮",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "萍",
    "pinyin": "píng",
    "word": "浮萍",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "泉",
    "pinyin": "quán",
    "word": "泉水",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "惜",
    "pinyin": "xī",
    "word": "爱惜",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "照",
    "pinyin": "zhào",
    "word": "照片",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "柔",
    "pinyin": "róu",
    "word": "柔软",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "荷",
    "pinyin": "hé",
    "word": "荷花",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "露",
    "pinyin": "lù",
    "word": "露水",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "角",
    "pinyin": "jiǎo",
    "word": "三角",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 10 古诗二首",
    "page": 61,
    "lessonId": "g1b-23"
  },
  {
    "char": "浪",
    "pinyin": "làng",
    "word": "浪花",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "迈",
    "pinyin": "mài",
    "word": "迈步",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "悄",
    "pinyin": "qiāo",
    "word": "悄悄",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "泪",
    "pinyin": "lèi",
    "word": "眼泪",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "次",
    "pinyin": "cì",
    "word": "一次",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "给",
    "pinyin": "gěi",
    "word": "给你",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "壳",
    "pinyin": "ké",
    "word": "贝壳",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "虾",
    "pinyin": "xiā",
    "word": "小虾",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "装",
    "pinyin": "zhuāng",
    "word": "装好",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "像",
    "pinyin": "xiàng",
    "word": "好像",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "淘",
    "pinyin": "táo",
    "word": "淘气",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "娃",
    "pinyin": "wá",
    "word": "娃娃",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 11 浪花",
    "page": 64,
    "lessonId": "g1b-24"
  },
  {
    "char": "珠",
    "pinyin": "zhū",
    "word": "珠子",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "摇",
    "pinyin": "yáo",
    "word": "摇头",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "篮",
    "pinyin": "lán",
    "word": "篮子",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "亮",
    "pinyin": "liàng",
    "word": "月亮",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "晶",
    "pinyin": "jīng",
    "word": "水晶",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "停",
    "pinyin": "tíng",
    "word": "停下",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "坪",
    "pinyin": "píng",
    "word": "草坪",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "展",
    "pinyin": "zhǎn",
    "word": "展开",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "透",
    "pinyin": "tòu",
    "word": "透明",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "翅",
    "pinyin": "chì",
    "word": "翅膀",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "膀",
    "pinyin": "bǎng",
    "word": "肩膀",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "朵",
    "pinyin": "duǒ",
    "word": "花朵",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 12 荷叶圆圆",
    "page": 66,
    "lessonId": "g1b-25"
  },
  {
    "char": "要",
    "pinyin": "yào",
    "word": "需要",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "腰",
    "pinyin": "yāo",
    "word": "弯腰",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "阴",
    "pinyin": "yīn",
    "word": "阴天",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "沉",
    "pinyin": "chén",
    "word": "下沉",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "呀",
    "pinyin": "ya",
    "word": "好呀",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26",
    "otherReadings": [
      {
        "pinyin": "yā",
        "word": "哎呀",
        "id": "g1b-30",
        "semester": "下册",
        "unit": 7,
        "lesson": "阅读 16 动物王国开大会",
        "page": 84
      }
    ]
  },
  {
    "char": "忙",
    "pinyin": "máng",
    "word": "帮忙",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "呢",
    "pinyin": "ne",
    "word": "你呢",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "吗",
    "pinyin": "ma",
    "word": "好吗",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "面",
    "pinyin": "miàn",
    "word": "面条",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "闷",
    "pinyin": "mēn",
    "word": "闷热",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "吧",
    "pinyin": "ba",
    "word": "好吧",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "消",
    "pinyin": "xiāo",
    "word": "消息",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "息",
    "pinyin": "xī",
    "word": "休息",
    "semester": "下册",
    "unit": 6,
    "lesson": "阅读 13 要下雨了",
    "page": 69,
    "lessonId": "g1b-26"
  },
  {
    "char": "棍",
    "pinyin": "gùn",
    "word": "木棍",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "豆",
    "pinyin": "dòu",
    "word": "豆子",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "汤",
    "pinyin": "tāng",
    "word": "米汤",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "蚊",
    "pinyin": "wén",
    "word": "蚊子",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "扇",
    "pinyin": "shàn",
    "word": "扇子",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "椅",
    "pinyin": "yǐ",
    "word": "椅子",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "牵",
    "pinyin": "qiān",
    "word": "牵手",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "织",
    "pinyin": "zhī",
    "word": "织布",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "斗",
    "pinyin": "dǒu",
    "word": "北斗",
    "semester": "下册",
    "unit": 6,
    "lesson": "语文园地六",
    "page": 73,
    "lessonId": "g1b-27"
  },
  {
    "char": "具",
    "pinyin": "jù",
    "word": "玩具",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "铅",
    "pinyin": "qiān",
    "word": "铅笔",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "新",
    "pinyin": "xīn",
    "word": "新年",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "平",
    "pinyin": "píng",
    "word": "平安",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "盒",
    "pinyin": "hé",
    "word": "盒子",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "些",
    "pinyin": "xiē",
    "word": "这些",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "此",
    "pinyin": "cǐ",
    "word": "此时",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "仔",
    "pinyin": "zǐ",
    "word": "仔细",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "检",
    "pinyin": "jiǎn",
    "word": "检查",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "查",
    "pinyin": "chá",
    "word": "检查",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "所",
    "pinyin": "suǒ",
    "word": "所以",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "伙",
    "pinyin": "huǒ",
    "word": "伙伴",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "伴",
    "pinyin": "bàn",
    "word": "伙伴",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 14 文具的家",
    "page": 78,
    "lessonId": "g1b-28"
  },
  {
    "char": "钟",
    "pinyin": "zhōng",
    "word": "时钟",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "迟",
    "pinyin": "chí",
    "word": "迟到",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "灯",
    "pinyin": "dēng",
    "word": "台灯",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "等",
    "pinyin": "děng",
    "word": "等待",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "啊",
    "pinyin": "a",
    "word": "啊呀",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "决",
    "pinyin": "jué",
    "word": "决定",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "定",
    "pinyin": "dìng",
    "word": "一定",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "已",
    "pinyin": "yǐ",
    "word": "已经",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "经",
    "pinyin": "jīng",
    "word": "已经",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "位",
    "pinyin": "wèi",
    "word": "座位",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "表",
    "pinyin": "biǎo",
    "word": "课表",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 15 一分钟",
    "page": 81,
    "lessonId": "g1b-29"
  },
  {
    "char": "虎",
    "pinyin": "hǔ",
    "word": "老虎",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "熊",
    "pinyin": "xióng",
    "word": "小熊",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "通",
    "pinyin": "tōng",
    "word": "通过",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "注",
    "pinyin": "zhù",
    "word": "注意",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "意",
    "pinyin": "yì",
    "word": "意思",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "遍",
    "pinyin": "biàn",
    "word": "一遍",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "百",
    "pinyin": "bǎi",
    "word": "百花",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "为",
    "pinyin": "wèi",
    "word": "为什么",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "因",
    "pinyin": "yīn",
    "word": "因为",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "舌",
    "pinyin": "shé",
    "word": "舌头",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "理",
    "pinyin": "lǐ",
    "word": "道理",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "忘",
    "pinyin": "wàng",
    "word": "忘记",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "第",
    "pinyin": "dì",
    "word": "第一",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 16 动物王国开大会",
    "page": 84,
    "lessonId": "g1b-30"
  },
  {
    "char": "猴",
    "pinyin": "hóu",
    "word": "猴子",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "块",
    "pinyin": "kuài",
    "word": "一块",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "兴",
    "pinyin": "xìng",
    "word": "高兴",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "掰",
    "pinyin": "bāi",
    "word": "掰开",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "扛",
    "pinyin": "káng",
    "word": "扛起",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "往",
    "pinyin": "wǎng",
    "word": "往来",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "棵",
    "pinyin": "kē",
    "word": "一棵",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "满",
    "pinyin": "mǎn",
    "word": "满足",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "扔",
    "pinyin": "rēng",
    "word": "扔掉",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "摘",
    "pinyin": "zhāi",
    "word": "摘花",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "捧",
    "pinyin": "pěng",
    "word": "捧起",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "追",
    "pinyin": "zhuī",
    "word": "追赶",
    "semester": "下册",
    "unit": 7,
    "lesson": "阅读 17 小猴子下山",
    "page": 90,
    "lessonId": "g1b-31"
  },
  {
    "char": "刷",
    "pinyin": "shuā",
    "word": "牙刷",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "梳",
    "pinyin": "shū",
    "word": "梳子",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "巾",
    "pinyin": "jīn",
    "word": "毛巾",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "皂",
    "pinyin": "zào",
    "word": "肥皂",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "洗",
    "pinyin": "xǐ",
    "word": "洗手",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "澡",
    "pinyin": "zǎo",
    "word": "洗澡",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "脸",
    "pinyin": "liǎn",
    "word": "笑脸",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "盆",
    "pinyin": "pén",
    "word": "脸盆",
    "semester": "下册",
    "unit": 7,
    "lesson": "语文园地七",
    "page": 93,
    "lessonId": "g1b-32"
  },
  {
    "char": "棉",
    "pinyin": "mián",
    "word": "棉花",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "姑",
    "pinyin": "gū",
    "word": "姑姑",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "娘",
    "pinyin": "niáng",
    "word": "姑娘",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "病",
    "pinyin": "bìng",
    "word": "生病",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "她",
    "pinyin": "tā",
    "word": "她们",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "治",
    "pinyin": "zhì",
    "word": "治病",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "燕",
    "pinyin": "yàn",
    "word": "燕子",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "帮",
    "pinyin": "bāng",
    "word": "帮忙",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "害",
    "pinyin": "hài",
    "word": "害怕",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "别",
    "pinyin": "bié",
    "word": "别人",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "干",
    "pinyin": "gàn",
    "word": "干净",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "惊",
    "pinyin": "jīng",
    "word": "惊奇",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "奇",
    "pinyin": "qí",
    "word": "奇怪",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 18 棉花姑娘",
    "page": 98,
    "lessonId": "g1b-33"
  },
  {
    "char": "咕",
    "pinyin": "gū",
    "word": "咕咚",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "咚",
    "pinyin": "dōng",
    "word": "咕咚",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "熟",
    "pinyin": "shú",
    "word": "成熟",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "掉",
    "pinyin": "diào",
    "word": "掉下",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "湖",
    "pinyin": "hú",
    "word": "湖水",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "吓",
    "pinyin": "xià",
    "word": "惊吓",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "啦",
    "pinyin": "la",
    "word": "好啦",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "鹿",
    "pinyin": "lù",
    "word": "小鹿",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "象",
    "pinyin": "xiàng",
    "word": "大象",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "野",
    "pinyin": "yě",
    "word": "野外",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "拦",
    "pinyin": "lán",
    "word": "拦住",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "哪",
    "pinyin": "nǎ",
    "word": "哪里",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34",
    "otherReadings": [
      {
        "pinyin": "na",
        "word": "真好哪",
        "id": "g1b-35",
        "semester": "下册",
        "unit": 8,
        "lesson": "阅读 20 小壁虎借尾巴",
        "page": 105
      }
    ]
  },
  {
    "char": "那",
    "pinyin": "nà",
    "word": "那里",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "领",
    "pinyin": "lǐng",
    "word": "带领",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 19 咕咚",
    "page": 102,
    "lessonId": "g1b-34"
  },
  {
    "char": "壁",
    "pinyin": "bì",
    "word": "墙壁",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "借",
    "pinyin": "jiè",
    "word": "借书",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "咬",
    "pinyin": "yǎo",
    "word": "咬住",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "难",
    "pinyin": "nán",
    "word": "困难",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "爬",
    "pinyin": "pá",
    "word": "爬山",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "您",
    "pinyin": "nín",
    "word": "您好",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "拨",
    "pinyin": "bō",
    "word": "拨水",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "赶",
    "pinyin": "gǎn",
    "word": "赶路",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "摆",
    "pinyin": "bǎi",
    "word": "摆手",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "过",
    "pinyin": "guò",
    "word": "过去",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "孩",
    "pinyin": "hái",
    "word": "孩子",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "转",
    "pinyin": "zhuǎn",
    "word": "转身",
    "semester": "下册",
    "unit": 8,
    "lesson": "阅读 20 小壁虎借尾巴",
    "page": 105,
    "lessonId": "g1b-35"
  },
  {
    "char": "吵",
    "pinyin": "chǎo",
    "word": "吵闹",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "现",
    "pinyin": "xiàn",
    "word": "现在",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "顶",
    "pinyin": "dǐng",
    "word": "头顶",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "胖",
    "pinyin": "pàng",
    "word": "胖瘦",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "票",
    "pinyin": "piào",
    "word": "车票",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "户",
    "pinyin": "hù",
    "word": "户口",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "交",
    "pinyin": "jiāo",
    "word": "交友",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  },
  {
    "char": "父",
    "pinyin": "fù",
    "word": "父亲",
    "semester": "下册",
    "unit": 8,
    "lesson": "语文园地八",
    "page": 109,
    "lessonId": "g1b-36"
  }
];
  chars.curriculum = {
  "id": "pep-g1-2024-2025",
  "name": "统编人教版一年级上下册",
  "edition": "现行修订版 · 上册2024秋 / 下册2025春",
  "semesters": [
    {
      "name": "上册",
      "count": 280
    },
    {
      "name": "下册",
      "count": 410
    }
  ],
  "lessons": [
    {
      "id": "g1a-1",
      "semester": "上册",
      "unit": 1,
      "lesson": "识字 1 天地人",
      "page": 8,
      "entries": [
        {
          "char": "天",
          "pinyin": "tiān",
          "new": true
        },
        {
          "char": "地",
          "pinyin": "dì",
          "new": true
        },
        {
          "char": "人",
          "pinyin": "rén",
          "new": true
        },
        {
          "char": "你",
          "pinyin": "nǐ",
          "new": true
        },
        {
          "char": "我",
          "pinyin": "wǒ",
          "new": true
        },
        {
          "char": "他",
          "pinyin": "tā",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-2",
      "semester": "上册",
      "unit": 1,
      "lesson": "识字 2 金木水火土",
      "page": 9,
      "entries": [
        {
          "char": "一",
          "pinyin": "yī",
          "new": true
        },
        {
          "char": "二",
          "pinyin": "èr",
          "new": true
        },
        {
          "char": "三",
          "pinyin": "sān",
          "new": true
        },
        {
          "char": "四",
          "pinyin": "sì",
          "new": true
        },
        {
          "char": "五",
          "pinyin": "wǔ",
          "new": true
        },
        {
          "char": "上",
          "pinyin": "shàng",
          "new": true
        },
        {
          "char": "下",
          "pinyin": "xià",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-3",
      "semester": "上册",
      "unit": 1,
      "lesson": "识字 3 口耳目手足",
      "page": 11,
      "entries": [
        {
          "char": "口",
          "pinyin": "kǒu",
          "new": true
        },
        {
          "char": "耳",
          "pinyin": "ěr",
          "new": true
        },
        {
          "char": "目",
          "pinyin": "mù",
          "new": true
        },
        {
          "char": "手",
          "pinyin": "shǒu",
          "new": true
        },
        {
          "char": "足",
          "pinyin": "zú",
          "new": true
        },
        {
          "char": "站",
          "pinyin": "zhàn",
          "new": true
        },
        {
          "char": "坐",
          "pinyin": "zuò",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-4",
      "semester": "上册",
      "unit": 1,
      "lesson": "识字 4 日月山川",
      "page": 13,
      "entries": [
        {
          "char": "日",
          "pinyin": "rì",
          "new": true
        },
        {
          "char": "月",
          "pinyin": "yuè",
          "new": true
        },
        {
          "char": "山",
          "pinyin": "shān",
          "new": true
        },
        {
          "char": "川",
          "pinyin": "chuān",
          "new": true
        },
        {
          "char": "水",
          "pinyin": "shuǐ",
          "new": true
        },
        {
          "char": "火",
          "pinyin": "huǒ",
          "new": true
        },
        {
          "char": "田",
          "pinyin": "tián",
          "new": true
        },
        {
          "char": "禾",
          "pinyin": "hé",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-5",
      "semester": "上册",
      "unit": 1,
      "lesson": "语文园地一",
      "page": 15,
      "entries": [
        {
          "char": "六",
          "pinyin": "liù",
          "new": true
        },
        {
          "char": "七",
          "pinyin": "qī",
          "new": true
        },
        {
          "char": "八",
          "pinyin": "bā",
          "new": true
        },
        {
          "char": "九",
          "pinyin": "jiǔ",
          "new": true
        },
        {
          "char": "十",
          "pinyin": "shí",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-6",
      "semester": "上册",
      "unit": 2,
      "lesson": "汉语拼音 3 b p m f",
      "page": 24,
      "entries": [
        {
          "char": "爸",
          "pinyin": "bà",
          "new": true
        },
        {
          "char": "妈",
          "pinyin": "mā",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-7",
      "semester": "上册",
      "unit": 2,
      "lesson": "汉语拼音 4 d t n l",
      "page": 26,
      "entries": [
        {
          "char": "大",
          "pinyin": "dà",
          "new": true
        },
        {
          "char": "马",
          "pinyin": "mǎ",
          "new": true
        },
        {
          "char": "路",
          "pinyin": "lù",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-8",
      "semester": "上册",
      "unit": 2,
      "lesson": "语文园地二",
      "page": 28,
      "entries": [
        {
          "char": "土",
          "pinyin": "tǔ",
          "new": true
        },
        {
          "char": "本",
          "pinyin": "běn",
          "new": true
        },
        {
          "char": "学",
          "pinyin": "xué",
          "new": true
        },
        {
          "char": "校",
          "pinyin": "xiào",
          "new": true
        },
        {
          "char": "班",
          "pinyin": "bān",
          "new": true
        },
        {
          "char": "级",
          "pinyin": "jí",
          "new": true
        },
        {
          "char": "姓",
          "pinyin": "xìng",
          "new": true
        },
        {
          "char": "名",
          "pinyin": "míng",
          "new": true
        },
        {
          "char": "王",
          "pinyin": "wáng",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-9",
      "semester": "上册",
      "unit": 3,
      "lesson": "汉语拼音 5 g k h",
      "page": 32,
      "entries": [
        {
          "char": "哥",
          "pinyin": "gē",
          "new": true
        },
        {
          "char": "弟",
          "pinyin": "dì",
          "new": true
        },
        {
          "char": "画",
          "pinyin": "huà",
          "new": true
        },
        {
          "char": "花",
          "pinyin": "huā",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-10",
      "semester": "上册",
      "unit": 3,
      "lesson": "汉语拼音 6 j q x",
      "page": 34,
      "entries": [
        {
          "char": "打",
          "pinyin": "dǎ",
          "new": true
        },
        {
          "char": "棋",
          "pinyin": "qí",
          "new": true
        },
        {
          "char": "积",
          "pinyin": "jī",
          "new": true
        },
        {
          "char": "木",
          "pinyin": "mù",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-11",
      "semester": "上册",
      "unit": 3,
      "lesson": "汉语拼音 7 z c s",
      "page": 36,
      "entries": [
        {
          "char": "字",
          "pinyin": "zì",
          "new": true
        },
        {
          "char": "词",
          "pinyin": "cí",
          "new": true
        },
        {
          "char": "句",
          "pinyin": "jù",
          "new": true
        },
        {
          "char": "子",
          "pinyin": "zǐ",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-12",
      "semester": "上册",
      "unit": 3,
      "lesson": "汉语拼音 8 zh ch sh r",
      "page": 38,
      "entries": [
        {
          "char": "桌",
          "pinyin": "zhuō",
          "new": true
        },
        {
          "char": "纸",
          "pinyin": "zhǐ",
          "new": true
        },
        {
          "char": "读",
          "pinyin": "dú",
          "new": true
        },
        {
          "char": "书",
          "pinyin": "shū",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-13",
      "semester": "上册",
      "unit": 3,
      "lesson": "汉语拼音 9 y w",
      "page": 40,
      "entries": [
        {
          "char": "鱼",
          "pinyin": "yú",
          "new": true
        },
        {
          "char": "鸭",
          "pinyin": "yā",
          "new": true
        },
        {
          "char": "乌",
          "pinyin": "wū",
          "new": true
        },
        {
          "char": "鸦",
          "pinyin": "yā",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-14",
      "semester": "上册",
      "unit": 3,
      "lesson": "语文园地三",
      "page": 42,
      "entries": [
        {
          "char": "午",
          "pinyin": "wǔ",
          "new": true
        },
        {
          "char": "星",
          "pinyin": "xīng",
          "new": true
        },
        {
          "char": "期",
          "pinyin": "qī",
          "new": true
        },
        {
          "char": "语",
          "pinyin": "yǔ",
          "new": true
        },
        {
          "char": "文",
          "pinyin": "wén",
          "new": true
        },
        {
          "char": "数",
          "pinyin": "shù",
          "new": true
        },
        {
          "char": "写",
          "pinyin": "xiě",
          "new": true
        },
        {
          "char": "会",
          "pinyin": "huì",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-15",
      "semester": "上册",
      "unit": 4,
      "lesson": "汉语拼音 10 ai ei ui",
      "page": 45,
      "entries": [
        {
          "char": "白",
          "pinyin": "bái",
          "new": true
        },
        {
          "char": "菜",
          "pinyin": "cài",
          "new": true
        },
        {
          "char": "西",
          "pinyin": "xī",
          "new": true
        },
        {
          "char": "瓜",
          "pinyin": "guā",
          "new": true
        },
        {
          "char": "果",
          "pinyin": "guǒ",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-16",
      "semester": "上册",
      "unit": 4,
      "lesson": "汉语拼音 11 ao ou iu",
      "page": 47,
      "entries": [
        {
          "char": "小",
          "pinyin": "xiǎo",
          "new": true
        },
        {
          "char": "桥",
          "pinyin": "qiáo",
          "new": true
        },
        {
          "char": "流",
          "pinyin": "liú",
          "new": true
        },
        {
          "char": "柳",
          "pinyin": "liǔ",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-17",
      "semester": "上册",
      "unit": 4,
      "lesson": "汉语拼音 12 ie üe er",
      "page": 49,
      "entries": [
        {
          "char": "开",
          "pinyin": "kāi",
          "new": true
        },
        {
          "char": "雪",
          "pinyin": "xuě",
          "new": true
        },
        {
          "char": "夜",
          "pinyin": "yè",
          "new": true
        },
        {
          "char": "色",
          "pinyin": "sè",
          "new": true
        },
        {
          "char": "美",
          "pinyin": "měi",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-18",
      "semester": "上册",
      "unit": 4,
      "lesson": "汉语拼音 13 an en in un ün",
      "page": 51,
      "entries": [
        {
          "char": "蓝",
          "pinyin": "lán",
          "new": true
        },
        {
          "char": "云",
          "pinyin": "yún",
          "new": true
        },
        {
          "char": "草",
          "pinyin": "cǎo",
          "new": true
        },
        {
          "char": "原",
          "pinyin": "yuán",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-19",
      "semester": "上册",
      "unit": 4,
      "lesson": "汉语拼音 14 ang eng ing ong",
      "page": 54,
      "entries": [
        {
          "char": "冰",
          "pinyin": "bīng",
          "new": true
        },
        {
          "char": "自",
          "pinyin": "zì",
          "new": true
        },
        {
          "char": "行",
          "pinyin": "xíng",
          "new": true
        },
        {
          "char": "车",
          "pinyin": "chē",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-20",
      "semester": "上册",
      "unit": 4,
      "lesson": "语文园地四",
      "page": 56,
      "entries": [
        {
          "char": "晚",
          "pinyin": "wǎn",
          "new": true
        },
        {
          "char": "昨",
          "pinyin": "zuó",
          "new": true
        },
        {
          "char": "今",
          "pinyin": "jīn",
          "new": true
        },
        {
          "char": "明",
          "pinyin": "míng",
          "new": true
        },
        {
          "char": "个",
          "pinyin": "gè",
          "new": true
        },
        {
          "char": "这",
          "pinyin": "zhè",
          "new": true
        },
        {
          "char": "去",
          "pinyin": "qù",
          "new": true
        },
        {
          "char": "年",
          "pinyin": "nián",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-21",
      "semester": "上册",
      "unit": 5,
      "lesson": "阅读 1 秋天",
      "page": 60,
      "entries": [
        {
          "char": "秋",
          "pinyin": "qiū",
          "new": true
        },
        {
          "char": "气",
          "pinyin": "qì",
          "new": true
        },
        {
          "char": "了",
          "pinyin": "le",
          "new": true
        },
        {
          "char": "树",
          "pinyin": "shù",
          "new": true
        },
        {
          "char": "叶",
          "pinyin": "yè",
          "new": true
        },
        {
          "char": "黄",
          "pinyin": "huáng",
          "new": true
        },
        {
          "char": "片",
          "pinyin": "piàn",
          "new": true
        },
        {
          "char": "从",
          "pinyin": "cóng",
          "new": true
        },
        {
          "char": "来",
          "pinyin": "lái",
          "new": true
        },
        {
          "char": "飞",
          "pinyin": "fēi",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-22",
      "semester": "上册",
      "unit": 5,
      "lesson": "阅读 2 江南",
      "page": 62,
      "entries": [
        {
          "char": "江",
          "pinyin": "jiāng",
          "new": true
        },
        {
          "char": "南",
          "pinyin": "nán",
          "new": true
        },
        {
          "char": "可",
          "pinyin": "kě",
          "new": true
        },
        {
          "char": "采",
          "pinyin": "cǎi",
          "new": true
        },
        {
          "char": "莲",
          "pinyin": "lián",
          "new": true
        },
        {
          "char": "戏",
          "pinyin": "xì",
          "new": true
        },
        {
          "char": "间",
          "pinyin": "jiān",
          "new": true
        },
        {
          "char": "东",
          "pinyin": "dōng",
          "new": true
        },
        {
          "char": "北",
          "pinyin": "běi",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-23",
      "semester": "上册",
      "unit": 5,
      "lesson": "阅读 3 雪地里的小画家",
      "page": 64,
      "entries": [
        {
          "char": "的",
          "pinyin": "de",
          "new": true
        },
        {
          "char": "家",
          "pinyin": "jiā",
          "new": true
        },
        {
          "char": "鸡",
          "pinyin": "jī",
          "new": true
        },
        {
          "char": "竹",
          "pinyin": "zhú",
          "new": true
        },
        {
          "char": "牙",
          "pinyin": "yá",
          "new": true
        },
        {
          "char": "用",
          "pinyin": "yòng",
          "new": true
        },
        {
          "char": "几",
          "pinyin": "jǐ",
          "new": true
        },
        {
          "char": "步",
          "pinyin": "bù",
          "new": true
        },
        {
          "char": "没",
          "pinyin": "méi",
          "new": true
        },
        {
          "char": "参",
          "pinyin": "cān",
          "new": true
        },
        {
          "char": "加",
          "pinyin": "jiā",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-24",
      "semester": "上册",
      "unit": 5,
      "lesson": "阅读 4 四季",
      "page": 66,
      "entries": [
        {
          "char": "鸟",
          "pinyin": "niǎo",
          "new": true
        },
        {
          "char": "说",
          "pinyin": "shuō",
          "new": true
        },
        {
          "char": "是",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "春",
          "pinyin": "chūn",
          "new": true
        },
        {
          "char": "青",
          "pinyin": "qīng",
          "new": true
        },
        {
          "char": "蛙",
          "pinyin": "wā",
          "new": true
        },
        {
          "char": "夏",
          "pinyin": "xià",
          "new": true
        },
        {
          "char": "着",
          "pinyin": "zhe",
          "new": true
        },
        {
          "char": "皮",
          "pinyin": "pí",
          "new": true
        },
        {
          "char": "地",
          "pinyin": "de",
          "new": false
        },
        {
          "char": "就",
          "pinyin": "jiù",
          "new": true
        },
        {
          "char": "冬",
          "pinyin": "dōng",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-25",
      "semester": "上册",
      "unit": 5,
      "lesson": "语文园地五",
      "page": 68,
      "entries": [
        {
          "char": "男",
          "pinyin": "nán",
          "new": true
        },
        {
          "char": "女",
          "pinyin": "nǚ",
          "new": true
        },
        {
          "char": "关",
          "pinyin": "guān",
          "new": true
        },
        {
          "char": "正",
          "pinyin": "zhèng",
          "new": true
        },
        {
          "char": "反",
          "pinyin": "fǎn",
          "new": true
        },
        {
          "char": "先",
          "pinyin": "xiān",
          "new": true
        },
        {
          "char": "后",
          "pinyin": "hòu",
          "new": true
        },
        {
          "char": "内",
          "pinyin": "nèi",
          "new": true
        },
        {
          "char": "外",
          "pinyin": "wài",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-26",
      "semester": "上册",
      "unit": 6,
      "lesson": "识字 5 对韵歌",
      "page": 73,
      "entries": [
        {
          "char": "对",
          "pinyin": "duì",
          "new": true
        },
        {
          "char": "歌",
          "pinyin": "gē",
          "new": true
        },
        {
          "char": "雨",
          "pinyin": "yǔ",
          "new": true
        },
        {
          "char": "风",
          "pinyin": "fēng",
          "new": true
        },
        {
          "char": "虫",
          "pinyin": "chóng",
          "new": true
        },
        {
          "char": "清",
          "pinyin": "qīng",
          "new": true
        },
        {
          "char": "绿",
          "pinyin": "lǜ",
          "new": true
        },
        {
          "char": "桃",
          "pinyin": "táo",
          "new": true
        },
        {
          "char": "红",
          "pinyin": "hóng",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-27",
      "semester": "上册",
      "unit": 6,
      "lesson": "识字 6 日月明",
      "page": 74,
      "entries": [
        {
          "char": "力",
          "pinyin": "lì",
          "new": true
        },
        {
          "char": "尖",
          "pinyin": "jiān",
          "new": true
        },
        {
          "char": "尘",
          "pinyin": "chén",
          "new": true
        },
        {
          "char": "众",
          "pinyin": "zhòng",
          "new": true
        },
        {
          "char": "双",
          "pinyin": "shuāng",
          "new": true
        },
        {
          "char": "林",
          "pinyin": "lín",
          "new": true
        },
        {
          "char": "森",
          "pinyin": "sēn",
          "new": true
        },
        {
          "char": "不",
          "pinyin": "bù",
          "new": true
        },
        {
          "char": "条",
          "pinyin": "tiáo",
          "new": true
        },
        {
          "char": "心",
          "pinyin": "xīn",
          "new": true
        },
        {
          "char": "金",
          "pinyin": "jīn",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-28",
      "semester": "上册",
      "unit": 6,
      "lesson": "识字 7 小书包",
      "page": 76,
      "entries": [
        {
          "char": "包",
          "pinyin": "bāo",
          "new": true
        },
        {
          "char": "尺",
          "pinyin": "chǐ",
          "new": true
        },
        {
          "char": "作",
          "pinyin": "zuò",
          "new": true
        },
        {
          "char": "业",
          "pinyin": "yè",
          "new": true
        },
        {
          "char": "笔",
          "pinyin": "bǐ",
          "new": true
        },
        {
          "char": "刀",
          "pinyin": "dāo",
          "new": true
        },
        {
          "char": "宝",
          "pinyin": "bǎo",
          "new": true
        },
        {
          "char": "贝",
          "pinyin": "bèi",
          "new": true
        },
        {
          "char": "少",
          "pinyin": "shǎo",
          "new": true
        },
        {
          "char": "课",
          "pinyin": "kè",
          "new": true
        },
        {
          "char": "早",
          "pinyin": "zǎo",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-29",
      "semester": "上册",
      "unit": 6,
      "lesson": "识字 8 升国旗",
      "page": 78,
      "entries": [
        {
          "char": "升",
          "pinyin": "shēng",
          "new": true
        },
        {
          "char": "国",
          "pinyin": "guó",
          "new": true
        },
        {
          "char": "旗",
          "pinyin": "qí",
          "new": true
        },
        {
          "char": "中",
          "pinyin": "zhōng",
          "new": true
        },
        {
          "char": "们",
          "pinyin": "men",
          "new": true
        },
        {
          "char": "声",
          "pinyin": "shēng",
          "new": true
        },
        {
          "char": "起",
          "pinyin": "qǐ",
          "new": true
        },
        {
          "char": "多",
          "pinyin": "duō",
          "new": true
        },
        {
          "char": "么",
          "pinyin": "me",
          "new": true
        },
        {
          "char": "向",
          "pinyin": "xiàng",
          "new": true
        },
        {
          "char": "立",
          "pinyin": "lì",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-30",
      "semester": "上册",
      "unit": 6,
      "lesson": "语文园地六",
      "page": 80,
      "entries": [
        {
          "char": "老",
          "pinyin": "lǎo",
          "new": true
        },
        {
          "char": "师",
          "pinyin": "shī",
          "new": true
        },
        {
          "char": "工",
          "pinyin": "gōng",
          "new": true
        },
        {
          "char": "厂",
          "pinyin": "chǎng",
          "new": true
        },
        {
          "char": "医",
          "pinyin": "yī",
          "new": true
        },
        {
          "char": "院",
          "pinyin": "yuàn",
          "new": true
        },
        {
          "char": "生",
          "pinyin": "shēng",
          "new": true
        },
        {
          "char": "门",
          "pinyin": "mén",
          "new": true
        },
        {
          "char": "卫",
          "pinyin": "wèi",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-31",
      "semester": "上册",
      "unit": 7,
      "lesson": "阅读 5 小小的船",
      "page": 84,
      "entries": [
        {
          "char": "船",
          "pinyin": "chuán",
          "new": true
        },
        {
          "char": "弯",
          "pinyin": "wān",
          "new": true
        },
        {
          "char": "儿",
          "pinyin": "ér",
          "new": true
        },
        {
          "char": "两",
          "pinyin": "liǎng",
          "new": true
        },
        {
          "char": "头",
          "pinyin": "tóu",
          "new": true
        },
        {
          "char": "在",
          "pinyin": "zài",
          "new": true
        },
        {
          "char": "里",
          "pinyin": "lǐ",
          "new": true
        },
        {
          "char": "看",
          "pinyin": "kàn",
          "new": true
        },
        {
          "char": "见",
          "pinyin": "jiàn",
          "new": true
        },
        {
          "char": "闪",
          "pinyin": "shǎn",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-32",
      "semester": "上册",
      "unit": 7,
      "lesson": "阅读 6 影子",
      "page": 86,
      "entries": [
        {
          "char": "影",
          "pinyin": "yǐng",
          "new": true
        },
        {
          "char": "前",
          "pinyin": "qián",
          "new": true
        },
        {
          "char": "常",
          "pinyin": "cháng",
          "new": true
        },
        {
          "char": "黑",
          "pinyin": "hēi",
          "new": true
        },
        {
          "char": "狗",
          "pinyin": "gǒu",
          "new": true
        },
        {
          "char": "左",
          "pinyin": "zuǒ",
          "new": true
        },
        {
          "char": "右",
          "pinyin": "yòu",
          "new": true
        },
        {
          "char": "它",
          "pinyin": "tā",
          "new": true
        },
        {
          "char": "好",
          "pinyin": "hǎo",
          "new": true
        },
        {
          "char": "朋",
          "pinyin": "péng",
          "new": true
        },
        {
          "char": "友",
          "pinyin": "yǒu",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-33",
      "semester": "上册",
      "unit": 7,
      "lesson": "阅读 7 两件宝",
      "page": 88,
      "entries": [
        {
          "char": "件",
          "pinyin": "jiàn",
          "new": true
        },
        {
          "char": "有",
          "pinyin": "yǒu",
          "new": true
        },
        {
          "char": "和",
          "pinyin": "hé",
          "new": true
        },
        {
          "char": "做",
          "pinyin": "zuò",
          "new": true
        },
        {
          "char": "也",
          "pinyin": "yě",
          "new": true
        },
        {
          "char": "办",
          "pinyin": "bàn",
          "new": true
        },
        {
          "char": "到",
          "pinyin": "dào",
          "new": true
        },
        {
          "char": "又",
          "pinyin": "yòu",
          "new": true
        },
        {
          "char": "才",
          "pinyin": "cái",
          "new": true
        },
        {
          "char": "能",
          "pinyin": "néng",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-34",
      "semester": "上册",
      "unit": 7,
      "lesson": "语文园地七",
      "page": 90,
      "entries": [
        {
          "char": "爷",
          "pinyin": "yé",
          "new": true
        },
        {
          "char": "奶",
          "pinyin": "nǎi",
          "new": true
        },
        {
          "char": "叔",
          "pinyin": "shū",
          "new": true
        },
        {
          "char": "姐",
          "pinyin": "jiě",
          "new": true
        },
        {
          "char": "妹",
          "pinyin": "mèi",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-35",
      "semester": "上册",
      "unit": 8,
      "lesson": "阅读 8 比尾巴",
      "page": 95,
      "entries": [
        {
          "char": "比",
          "pinyin": "bǐ",
          "new": true
        },
        {
          "char": "尾",
          "pinyin": "wěi",
          "new": true
        },
        {
          "char": "巴",
          "pinyin": "bā",
          "new": true
        },
        {
          "char": "谁",
          "pinyin": "shuí",
          "new": true
        },
        {
          "char": "长",
          "pinyin": "cháng",
          "new": true
        },
        {
          "char": "短",
          "pinyin": "duǎn",
          "new": true
        },
        {
          "char": "把",
          "pinyin": "bǎ",
          "new": true
        },
        {
          "char": "伞",
          "pinyin": "sǎn",
          "new": true
        },
        {
          "char": "兔",
          "pinyin": "tù",
          "new": true
        },
        {
          "char": "最",
          "pinyin": "zuì",
          "new": true
        },
        {
          "char": "公",
          "pinyin": "gōng",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-36",
      "semester": "上册",
      "unit": 8,
      "lesson": "阅读 9 乌鸦喝水",
      "page": 97,
      "entries": [
        {
          "char": "喝",
          "pinyin": "hē",
          "new": true
        },
        {
          "char": "只",
          "pinyin": "zhī",
          "new": true
        },
        {
          "char": "处",
          "pinyin": "chù",
          "new": true
        },
        {
          "char": "找",
          "pinyin": "zhǎo",
          "new": true
        },
        {
          "char": "着",
          "pinyin": "zháo",
          "new": false
        },
        {
          "char": "许",
          "pinyin": "xǔ",
          "new": true
        },
        {
          "char": "石",
          "pinyin": "shí",
          "new": true
        },
        {
          "char": "出",
          "pinyin": "chū",
          "new": true
        },
        {
          "char": "法",
          "pinyin": "fǎ",
          "new": true
        },
        {
          "char": "放",
          "pinyin": "fàng",
          "new": true
        },
        {
          "char": "进",
          "pinyin": "jìn",
          "new": true
        },
        {
          "char": "高",
          "pinyin": "gāo",
          "new": true
        }
      ]
    },
    {
      "id": "g1a-37",
      "semester": "上册",
      "unit": 8,
      "lesson": "阅读 10 雨点儿",
      "page": 99,
      "entries": [
        {
          "char": "点",
          "pinyin": "diǎn",
          "new": true
        },
        {
          "char": "数",
          "pinyin": "shǔ",
          "new": false
        },
        {
          "char": "彩",
          "pinyin": "cǎi",
          "new": true
        },
        {
          "char": "半",
          "pinyin": "bàn",
          "new": true
        },
        {
          "char": "空",
          "pinyin": "kōng",
          "new": true
        },
        {
          "char": "问",
          "pinyin": "wèn",
          "new": true
        },
        {
          "char": "回",
          "pinyin": "huí",
          "new": true
        },
        {
          "char": "答",
          "pinyin": "dá",
          "new": true
        },
        {
          "char": "方",
          "pinyin": "fāng",
          "new": true
        },
        {
          "char": "久",
          "pinyin": "jiǔ",
          "new": true
        },
        {
          "char": "更",
          "pinyin": "gèng",
          "new": true
        },
        {
          "char": "长",
          "pinyin": "zhǎng",
          "new": false
        }
      ]
    },
    {
      "id": "g1a-38",
      "semester": "上册",
      "unit": 8,
      "lesson": "语文园地八",
      "page": 101,
      "entries": [
        {
          "char": "牛",
          "pinyin": "niú",
          "new": true
        },
        {
          "char": "羊",
          "pinyin": "yáng",
          "new": true
        },
        {
          "char": "爪",
          "pinyin": "zhuǎ",
          "new": true
        },
        {
          "char": "旦",
          "pinyin": "dàn",
          "new": true
        },
        {
          "char": "拼",
          "pinyin": "pīn",
          "new": true
        },
        {
          "char": "音",
          "pinyin": "yīn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-1",
      "semester": "下册",
      "unit": 1,
      "lesson": "识字 1 春夏秋冬",
      "page": 2,
      "entries": [
        {
          "char": "霜",
          "pinyin": "shuāng",
          "new": true
        },
        {
          "char": "吹",
          "pinyin": "chuī",
          "new": true
        },
        {
          "char": "落",
          "pinyin": "luò",
          "new": true
        },
        {
          "char": "降",
          "pinyin": "jiàng",
          "new": true
        },
        {
          "char": "飘",
          "pinyin": "piāo",
          "new": true
        },
        {
          "char": "游",
          "pinyin": "yóu",
          "new": true
        },
        {
          "char": "池",
          "pinyin": "chí",
          "new": true
        },
        {
          "char": "入",
          "pinyin": "rù",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-2",
      "semester": "下册",
      "unit": 1,
      "lesson": "识字 2 姓氏歌",
      "page": 4,
      "entries": [
        {
          "char": "氏",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "什",
          "pinyin": "shén",
          "new": true
        },
        {
          "char": "李",
          "pinyin": "lǐ",
          "new": true
        },
        {
          "char": "张",
          "pinyin": "zhāng",
          "new": true
        },
        {
          "char": "弓",
          "pinyin": "gōng",
          "new": true
        },
        {
          "char": "古",
          "pinyin": "gǔ",
          "new": true
        },
        {
          "char": "胡",
          "pinyin": "hú",
          "new": true
        },
        {
          "char": "吴",
          "pinyin": "wú",
          "new": true
        },
        {
          "char": "言",
          "pinyin": "yán",
          "new": true
        },
        {
          "char": "孙",
          "pinyin": "sūn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-3",
      "semester": "下册",
      "unit": 1,
      "lesson": "识字 3 小青蛙",
      "page": 6,
      "entries": [
        {
          "char": "河",
          "pinyin": "hé",
          "new": true
        },
        {
          "char": "晴",
          "pinyin": "qíng",
          "new": true
        },
        {
          "char": "眼",
          "pinyin": "yǎn",
          "new": true
        },
        {
          "char": "睛",
          "pinyin": "jīng",
          "new": true
        },
        {
          "char": "保",
          "pinyin": "bǎo",
          "new": true
        },
        {
          "char": "护",
          "pinyin": "hù",
          "new": true
        },
        {
          "char": "苗",
          "pinyin": "miáo",
          "new": true
        },
        {
          "char": "吃",
          "pinyin": "chī",
          "new": true
        },
        {
          "char": "事",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "情",
          "pinyin": "qíng",
          "new": true
        },
        {
          "char": "请",
          "pinyin": "qǐng",
          "new": true
        },
        {
          "char": "让",
          "pinyin": "ràng",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-4",
      "semester": "下册",
      "unit": 1,
      "lesson": "识字 4 猜字谜",
      "page": 8,
      "entries": [
        {
          "char": "猜",
          "pinyin": "cāi",
          "new": true
        },
        {
          "char": "边",
          "pinyin": "biān",
          "new": true
        },
        {
          "char": "凉",
          "pinyin": "liáng",
          "new": true
        },
        {
          "char": "喜",
          "pinyin": "xǐ",
          "new": true
        },
        {
          "char": "欢",
          "pinyin": "huān",
          "new": true
        },
        {
          "char": "时",
          "pinyin": "shí",
          "new": true
        },
        {
          "char": "怕",
          "pinyin": "pà",
          "new": true
        },
        {
          "char": "攻",
          "pinyin": "gōng",
          "new": true
        },
        {
          "char": "令",
          "pinyin": "lìng",
          "new": true
        },
        {
          "char": "感",
          "pinyin": "gǎn",
          "new": true
        },
        {
          "char": "动",
          "pinyin": "dòng",
          "new": true
        },
        {
          "char": "万",
          "pinyin": "wàn",
          "new": true
        },
        {
          "char": "无",
          "pinyin": "wú",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-5",
      "semester": "下册",
      "unit": 1,
      "lesson": "语文园地一",
      "page": 10,
      "entries": [
        {
          "char": "识",
          "pinyin": "shí",
          "new": true
        },
        {
          "char": "组",
          "pinyin": "zǔ",
          "new": true
        },
        {
          "char": "计",
          "pinyin": "jì",
          "new": true
        },
        {
          "char": "算",
          "pinyin": "suàn",
          "new": true
        },
        {
          "char": "减",
          "pinyin": "jiǎn",
          "new": true
        },
        {
          "char": "式",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "图",
          "pinyin": "tú",
          "new": true
        },
        {
          "char": "形",
          "pinyin": "xíng",
          "new": true
        },
        {
          "char": "卡",
          "pinyin": "kǎ",
          "new": true
        },
        {
          "char": "合",
          "pinyin": "hé",
          "new": true
        },
        {
          "char": "唱",
          "pinyin": "chàng",
          "new": true
        },
        {
          "char": "团",
          "pinyin": "tuán",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-6",
      "semester": "下册",
      "unit": 2,
      "lesson": "阅读 1 热爱中国共产党",
      "page": 16,
      "entries": [
        {
          "char": "热",
          "pinyin": "rè",
          "new": true
        },
        {
          "char": "爱",
          "pinyin": "ài",
          "new": true
        },
        {
          "char": "共",
          "pinyin": "gòng",
          "new": true
        },
        {
          "char": "产",
          "pinyin": "chǎn",
          "new": true
        },
        {
          "char": "党",
          "pinyin": "dǎng",
          "new": true
        },
        {
          "char": "太",
          "pinyin": "tài",
          "new": true
        },
        {
          "char": "阳",
          "pinyin": "yáng",
          "new": true
        },
        {
          "char": "光",
          "pinyin": "guāng",
          "new": true
        },
        {
          "char": "怀",
          "pinyin": "huái",
          "new": true
        },
        {
          "char": "抱",
          "pinyin": "bào",
          "new": true
        },
        {
          "char": "幸",
          "pinyin": "xìng",
          "new": true
        },
        {
          "char": "福",
          "pinyin": "fú",
          "new": true
        },
        {
          "char": "成",
          "pinyin": "chéng",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-7",
      "semester": "下册",
      "unit": 2,
      "lesson": "阅读 2 吃水不忘挖井人",
      "page": 18,
      "entries": [
        {
          "char": "井",
          "pinyin": "jǐng",
          "new": true
        },
        {
          "char": "城",
          "pinyin": "chéng",
          "new": true
        },
        {
          "char": "村",
          "pinyin": "cūn",
          "new": true
        },
        {
          "char": "毛",
          "pinyin": "máo",
          "new": true
        },
        {
          "char": "主",
          "pinyin": "zhǔ",
          "new": true
        },
        {
          "char": "席",
          "pinyin": "xí",
          "new": true
        },
        {
          "char": "住",
          "pinyin": "zhù",
          "new": true
        },
        {
          "char": "乡",
          "pinyin": "xiāng",
          "new": true
        },
        {
          "char": "亲",
          "pinyin": "qīn",
          "new": true
        },
        {
          "char": "战",
          "pinyin": "zhàn",
          "new": true
        },
        {
          "char": "士",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "想",
          "pinyin": "xiǎng",
          "new": true
        },
        {
          "char": "念",
          "pinyin": "niàn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-8",
      "semester": "下册",
      "unit": 2,
      "lesson": "阅读 3 我多想去看看",
      "page": 20,
      "entries": [
        {
          "char": "告",
          "pinyin": "gào",
          "new": true
        },
        {
          "char": "诉",
          "pinyin": "sù",
          "new": true
        },
        {
          "char": "走",
          "pinyin": "zǒu",
          "new": true
        },
        {
          "char": "京",
          "pinyin": "jīng",
          "new": true
        },
        {
          "char": "座",
          "pinyin": "zuò",
          "new": true
        },
        {
          "char": "安",
          "pinyin": "ān",
          "new": true
        },
        {
          "char": "广",
          "pinyin": "guǎng",
          "new": true
        },
        {
          "char": "场",
          "pinyin": "chǎng",
          "new": true
        },
        {
          "char": "非",
          "pinyin": "fēi",
          "new": true
        },
        {
          "char": "宽",
          "pinyin": "kuān",
          "new": true
        },
        {
          "char": "丽",
          "pinyin": "lì",
          "new": true
        },
        {
          "char": "洁",
          "pinyin": "jié",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-9",
      "semester": "下册",
      "unit": 2,
      "lesson": "语文园地二",
      "page": 22,
      "entries": [
        {
          "char": "认",
          "pinyin": "rèn",
          "new": true
        },
        {
          "char": "连",
          "pinyin": "lián",
          "new": true
        },
        {
          "char": "选",
          "pinyin": "xuǎn",
          "new": true
        },
        {
          "char": "圈",
          "pinyin": "quān",
          "new": true
        },
        {
          "char": "涂",
          "pinyin": "tú",
          "new": true
        },
        {
          "char": "填",
          "pinyin": "tián",
          "new": true
        },
        {
          "char": "试",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "练",
          "pinyin": "liàn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-10",
      "semester": "下册",
      "unit": 3,
      "lesson": "阅读 4 小公鸡和小鸭子",
      "page": 26,
      "entries": [
        {
          "char": "玩",
          "pinyin": "wán",
          "new": true
        },
        {
          "char": "得",
          "pinyin": "de",
          "new": true
        },
        {
          "char": "急",
          "pinyin": "jí",
          "new": true
        },
        {
          "char": "直",
          "pinyin": "zhí",
          "new": true
        },
        {
          "char": "哭",
          "pinyin": "kū",
          "new": true
        },
        {
          "char": "跟",
          "pinyin": "gēn",
          "new": true
        },
        {
          "char": "忽",
          "pinyin": "hū",
          "new": true
        },
        {
          "char": "然",
          "pinyin": "rán",
          "new": true
        },
        {
          "char": "听",
          "pinyin": "tīng",
          "new": true
        },
        {
          "char": "喊",
          "pinyin": "hǎn",
          "new": true
        },
        {
          "char": "快",
          "pinyin": "kuài",
          "new": true
        },
        {
          "char": "己",
          "pinyin": "jǐ",
          "new": true
        },
        {
          "char": "背",
          "pinyin": "bèi",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-11",
      "semester": "下册",
      "unit": 3,
      "lesson": "阅读 5 树和喜鹊",
      "page": 29,
      "entries": [
        {
          "char": "只",
          "pinyin": "zhǐ",
          "new": false
        },
        {
          "char": "很",
          "pinyin": "hěn",
          "new": true
        },
        {
          "char": "孤",
          "pinyin": "gū",
          "new": true
        },
        {
          "char": "单",
          "pinyin": "dān",
          "new": true
        },
        {
          "char": "种",
          "pinyin": "zhòng",
          "new": true
        },
        {
          "char": "每",
          "pinyin": "měi",
          "new": true
        },
        {
          "char": "都",
          "pinyin": "dōu",
          "new": true
        },
        {
          "char": "邻",
          "pinyin": "lín",
          "new": true
        },
        {
          "char": "居",
          "pinyin": "jū",
          "new": true
        },
        {
          "char": "叫",
          "pinyin": "jiào",
          "new": true
        },
        {
          "char": "招",
          "pinyin": "zhāo",
          "new": true
        },
        {
          "char": "呼",
          "pinyin": "hū",
          "new": true
        },
        {
          "char": "乐",
          "pinyin": "lè",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-12",
      "semester": "下册",
      "unit": 3,
      "lesson": "阅读 6 怎么都快乐",
      "page": 31,
      "entries": [
        {
          "char": "怎",
          "pinyin": "zěn",
          "new": true
        },
        {
          "char": "独",
          "pinyin": "dú",
          "new": true
        },
        {
          "char": "跳",
          "pinyin": "tiào",
          "new": true
        },
        {
          "char": "绳",
          "pinyin": "shéng",
          "new": true
        },
        {
          "char": "当",
          "pinyin": "dāng",
          "new": true
        },
        {
          "char": "还",
          "pinyin": "hái",
          "new": true
        },
        {
          "char": "乐",
          "pinyin": "yuè",
          "new": false
        },
        {
          "char": "得",
          "pinyin": "děi",
          "new": false
        },
        {
          "char": "羽",
          "pinyin": "yǔ",
          "new": true
        },
        {
          "char": "球",
          "pinyin": "qiú",
          "new": true
        },
        {
          "char": "劲",
          "pinyin": "jìn",
          "new": true
        },
        {
          "char": "轮",
          "pinyin": "lún",
          "new": true
        },
        {
          "char": "排",
          "pinyin": "pái",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-13",
      "semester": "下册",
      "unit": 3,
      "lesson": "语文园地三",
      "page": 34,
      "entries": [
        {
          "char": "母",
          "pinyin": "mǔ",
          "new": true
        },
        {
          "char": "页",
          "pinyin": "yè",
          "new": true
        },
        {
          "char": "止",
          "pinyin": "zhǐ",
          "new": true
        },
        {
          "char": "斤",
          "pinyin": "jīn",
          "new": true
        },
        {
          "char": "寸",
          "pinyin": "cùn",
          "new": true
        },
        {
          "char": "丁",
          "pinyin": "dīng",
          "new": true
        },
        {
          "char": "千",
          "pinyin": "qiān",
          "new": true
        },
        {
          "char": "全",
          "pinyin": "quán",
          "new": true
        },
        {
          "char": "元",
          "pinyin": "yuán",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-14",
      "semester": "下册",
      "unit": 4,
      "lesson": "阅读 7 静夜思",
      "page": 39,
      "entries": [
        {
          "char": "静",
          "pinyin": "jìng",
          "new": true
        },
        {
          "char": "思",
          "pinyin": "sī",
          "new": true
        },
        {
          "char": "床",
          "pinyin": "chuáng",
          "new": true
        },
        {
          "char": "疑",
          "pinyin": "yí",
          "new": true
        },
        {
          "char": "举",
          "pinyin": "jǔ",
          "new": true
        },
        {
          "char": "望",
          "pinyin": "wàng",
          "new": true
        },
        {
          "char": "低",
          "pinyin": "dī",
          "new": true
        },
        {
          "char": "故",
          "pinyin": "gù",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-15",
      "semester": "下册",
      "unit": 4,
      "lesson": "阅读 8 夜色",
      "page": 40,
      "entries": [
        {
          "char": "胆",
          "pinyin": "dǎn",
          "new": true
        },
        {
          "char": "敢",
          "pinyin": "gǎn",
          "new": true
        },
        {
          "char": "勇",
          "pinyin": "yǒng",
          "new": true
        },
        {
          "char": "讲",
          "pinyin": "jiǎng",
          "new": true
        },
        {
          "char": "窗",
          "pinyin": "chuāng",
          "new": true
        },
        {
          "char": "乱",
          "pinyin": "luàn",
          "new": true
        },
        {
          "char": "拉",
          "pinyin": "lā",
          "new": true
        },
        {
          "char": "样",
          "pinyin": "yàng",
          "new": true
        },
        {
          "char": "笑",
          "pinyin": "xiào",
          "new": true
        },
        {
          "char": "再",
          "pinyin": "zài",
          "new": true
        },
        {
          "char": "睡",
          "pinyin": "shuì",
          "new": true
        },
        {
          "char": "觉",
          "pinyin": "jiào",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-16",
      "semester": "下册",
      "unit": 4,
      "lesson": "阅读 9 端午粽",
      "page": 42,
      "entries": [
        {
          "char": "端",
          "pinyin": "duān",
          "new": true
        },
        {
          "char": "粽",
          "pinyin": "zòng",
          "new": true
        },
        {
          "char": "节",
          "pinyin": "jié",
          "new": true
        },
        {
          "char": "总",
          "pinyin": "zǒng",
          "new": true
        },
        {
          "char": "煮",
          "pinyin": "zhǔ",
          "new": true
        },
        {
          "char": "盼",
          "pinyin": "pàn",
          "new": true
        },
        {
          "char": "米",
          "pinyin": "mǐ",
          "new": true
        },
        {
          "char": "枣",
          "pinyin": "zǎo",
          "new": true
        },
        {
          "char": "甜",
          "pinyin": "tián",
          "new": true
        },
        {
          "char": "分",
          "pinyin": "fēn",
          "new": true
        },
        {
          "char": "鲜",
          "pinyin": "xiān",
          "new": true
        },
        {
          "char": "肉",
          "pinyin": "ròu",
          "new": true
        },
        {
          "char": "了",
          "pinyin": "liǎo",
          "new": false
        }
      ]
    },
    {
      "id": "g1b-17",
      "semester": "下册",
      "unit": 4,
      "lesson": "语文园地四",
      "page": 44,
      "entries": [
        {
          "char": "册",
          "pinyin": "cè",
          "new": true
        },
        {
          "char": "支",
          "pinyin": "zhī",
          "new": true
        },
        {
          "char": "台",
          "pinyin": "tái",
          "new": true
        },
        {
          "char": "电",
          "pinyin": "diàn",
          "new": true
        },
        {
          "char": "视",
          "pinyin": "shì",
          "new": true
        },
        {
          "char": "部",
          "pinyin": "bù",
          "new": true
        },
        {
          "char": "机",
          "pinyin": "jī",
          "new": true
        },
        {
          "char": "衣",
          "pinyin": "yī",
          "new": true
        },
        {
          "char": "裤",
          "pinyin": "kù",
          "new": true
        },
        {
          "char": "被",
          "pinyin": "bèi",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-18",
      "semester": "下册",
      "unit": 5,
      "lesson": "识字 5 动物儿歌",
      "page": 48,
      "entries": [
        {
          "char": "物",
          "pinyin": "wù",
          "new": true
        },
        {
          "char": "捉",
          "pinyin": "zhuō",
          "new": true
        },
        {
          "char": "迷",
          "pinyin": "mí",
          "new": true
        },
        {
          "char": "藏",
          "pinyin": "cáng",
          "new": true
        },
        {
          "char": "造",
          "pinyin": "zào",
          "new": true
        },
        {
          "char": "蚂",
          "pinyin": "mǎ",
          "new": true
        },
        {
          "char": "蚁",
          "pinyin": "yǐ",
          "new": true
        },
        {
          "char": "运",
          "pinyin": "yùn",
          "new": true
        },
        {
          "char": "食",
          "pinyin": "shí",
          "new": true
        },
        {
          "char": "粮",
          "pinyin": "liáng",
          "new": true
        },
        {
          "char": "房",
          "pinyin": "fáng",
          "new": true
        },
        {
          "char": "结",
          "pinyin": "jié",
          "new": true
        },
        {
          "char": "网",
          "pinyin": "wǎng",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-19",
      "semester": "下册",
      "unit": 5,
      "lesson": "识字 6 古对今",
      "page": 50,
      "entries": [
        {
          "char": "圆",
          "pinyin": "yuán",
          "new": true
        },
        {
          "char": "严",
          "pinyin": "yán",
          "new": true
        },
        {
          "char": "寒",
          "pinyin": "hán",
          "new": true
        },
        {
          "char": "酷",
          "pinyin": "kù",
          "new": true
        },
        {
          "char": "暑",
          "pinyin": "shǔ",
          "new": true
        },
        {
          "char": "暖",
          "pinyin": "nuǎn",
          "new": true
        },
        {
          "char": "晨",
          "pinyin": "chén",
          "new": true
        },
        {
          "char": "细",
          "pinyin": "xì",
          "new": true
        },
        {
          "char": "朝",
          "pinyin": "zhāo",
          "new": true
        },
        {
          "char": "霞",
          "pinyin": "xiá",
          "new": true
        },
        {
          "char": "夕",
          "pinyin": "xī",
          "new": true
        },
        {
          "char": "杨",
          "pinyin": "yáng",
          "new": true
        },
        {
          "char": "香",
          "pinyin": "xiāng",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-20",
      "semester": "下册",
      "unit": 5,
      "lesson": "识字 7 操场上",
      "page": 52,
      "entries": [
        {
          "char": "操",
          "pinyin": "cāo",
          "new": true
        },
        {
          "char": "拔",
          "pinyin": "bá",
          "new": true
        },
        {
          "char": "拍",
          "pinyin": "pāi",
          "new": true
        },
        {
          "char": "跑",
          "pinyin": "pǎo",
          "new": true
        },
        {
          "char": "踢",
          "pinyin": "tī",
          "new": true
        },
        {
          "char": "铃",
          "pinyin": "líng",
          "new": true
        },
        {
          "char": "真",
          "pinyin": "zhēn",
          "new": true
        },
        {
          "char": "闹",
          "pinyin": "nào",
          "new": true
        },
        {
          "char": "丢",
          "pinyin": "diū",
          "new": true
        },
        {
          "char": "沙",
          "pinyin": "shā",
          "new": true
        },
        {
          "char": "身",
          "pinyin": "shēn",
          "new": true
        },
        {
          "char": "体",
          "pinyin": "tǐ",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-21",
      "semester": "下册",
      "unit": 5,
      "lesson": "识字 8 人之初",
      "page": 54,
      "entries": [
        {
          "char": "之",
          "pinyin": "zhī",
          "new": true
        },
        {
          "char": "初",
          "pinyin": "chū",
          "new": true
        },
        {
          "char": "相",
          "pinyin": "xiāng",
          "new": true
        },
        {
          "char": "近",
          "pinyin": "jìn",
          "new": true
        },
        {
          "char": "习",
          "pinyin": "xí",
          "new": true
        },
        {
          "char": "远",
          "pinyin": "yuǎn",
          "new": true
        },
        {
          "char": "教",
          "pinyin": "jiào",
          "new": true
        },
        {
          "char": "道",
          "pinyin": "dào",
          "new": true
        },
        {
          "char": "专",
          "pinyin": "zhuān",
          "new": true
        },
        {
          "char": "幼",
          "pinyin": "yòu",
          "new": true
        },
        {
          "char": "玉",
          "pinyin": "yù",
          "new": true
        },
        {
          "char": "知",
          "pinyin": "zhī",
          "new": true
        },
        {
          "char": "义",
          "pinyin": "yì",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-22",
      "semester": "下册",
      "unit": 5,
      "lesson": "语文园地五",
      "page": 56,
      "entries": [
        {
          "char": "饭",
          "pinyin": "fàn",
          "new": true
        },
        {
          "char": "饱",
          "pinyin": "bǎo",
          "new": true
        },
        {
          "char": "茶",
          "pinyin": "chá",
          "new": true
        },
        {
          "char": "泡",
          "pinyin": "pào",
          "new": true
        },
        {
          "char": "轻",
          "pinyin": "qīng",
          "new": true
        },
        {
          "char": "穿",
          "pinyin": "chuān",
          "new": true
        },
        {
          "char": "袍",
          "pinyin": "páo",
          "new": true
        },
        {
          "char": "鞭",
          "pinyin": "biān",
          "new": true
        },
        {
          "char": "炮",
          "pinyin": "pào",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-23",
      "semester": "下册",
      "unit": 6,
      "lesson": "阅读 10 古诗二首",
      "page": 61,
      "entries": [
        {
          "char": "诗",
          "pinyin": "shī",
          "new": true
        },
        {
          "char": "首",
          "pinyin": "shǒu",
          "new": true
        },
        {
          "char": "偷",
          "pinyin": "tōu",
          "new": true
        },
        {
          "char": "浮",
          "pinyin": "fú",
          "new": true
        },
        {
          "char": "萍",
          "pinyin": "píng",
          "new": true
        },
        {
          "char": "泉",
          "pinyin": "quán",
          "new": true
        },
        {
          "char": "惜",
          "pinyin": "xī",
          "new": true
        },
        {
          "char": "照",
          "pinyin": "zhào",
          "new": true
        },
        {
          "char": "柔",
          "pinyin": "róu",
          "new": true
        },
        {
          "char": "荷",
          "pinyin": "hé",
          "new": true
        },
        {
          "char": "露",
          "pinyin": "lù",
          "new": true
        },
        {
          "char": "角",
          "pinyin": "jiǎo",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-24",
      "semester": "下册",
      "unit": 6,
      "lesson": "阅读 11 浪花",
      "page": 64,
      "entries": [
        {
          "char": "浪",
          "pinyin": "làng",
          "new": true
        },
        {
          "char": "迈",
          "pinyin": "mài",
          "new": true
        },
        {
          "char": "悄",
          "pinyin": "qiāo",
          "new": true
        },
        {
          "char": "泪",
          "pinyin": "lèi",
          "new": true
        },
        {
          "char": "次",
          "pinyin": "cì",
          "new": true
        },
        {
          "char": "给",
          "pinyin": "gěi",
          "new": true
        },
        {
          "char": "壳",
          "pinyin": "ké",
          "new": true
        },
        {
          "char": "虾",
          "pinyin": "xiā",
          "new": true
        },
        {
          "char": "装",
          "pinyin": "zhuāng",
          "new": true
        },
        {
          "char": "像",
          "pinyin": "xiàng",
          "new": true
        },
        {
          "char": "淘",
          "pinyin": "táo",
          "new": true
        },
        {
          "char": "娃",
          "pinyin": "wá",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-25",
      "semester": "下册",
      "unit": 6,
      "lesson": "阅读 12 荷叶圆圆",
      "page": 66,
      "entries": [
        {
          "char": "珠",
          "pinyin": "zhū",
          "new": true
        },
        {
          "char": "摇",
          "pinyin": "yáo",
          "new": true
        },
        {
          "char": "篮",
          "pinyin": "lán",
          "new": true
        },
        {
          "char": "亮",
          "pinyin": "liàng",
          "new": true
        },
        {
          "char": "晶",
          "pinyin": "jīng",
          "new": true
        },
        {
          "char": "停",
          "pinyin": "tíng",
          "new": true
        },
        {
          "char": "坪",
          "pinyin": "píng",
          "new": true
        },
        {
          "char": "展",
          "pinyin": "zhǎn",
          "new": true
        },
        {
          "char": "透",
          "pinyin": "tòu",
          "new": true
        },
        {
          "char": "翅",
          "pinyin": "chì",
          "new": true
        },
        {
          "char": "膀",
          "pinyin": "bǎng",
          "new": true
        },
        {
          "char": "朵",
          "pinyin": "duǒ",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-26",
      "semester": "下册",
      "unit": 6,
      "lesson": "阅读 13 要下雨了",
      "page": 69,
      "entries": [
        {
          "char": "要",
          "pinyin": "yào",
          "new": true
        },
        {
          "char": "腰",
          "pinyin": "yāo",
          "new": true
        },
        {
          "char": "阴",
          "pinyin": "yīn",
          "new": true
        },
        {
          "char": "沉",
          "pinyin": "chén",
          "new": true
        },
        {
          "char": "呀",
          "pinyin": "ya",
          "new": true
        },
        {
          "char": "忙",
          "pinyin": "máng",
          "new": true
        },
        {
          "char": "呢",
          "pinyin": "ne",
          "new": true
        },
        {
          "char": "吗",
          "pinyin": "ma",
          "new": true
        },
        {
          "char": "面",
          "pinyin": "miàn",
          "new": true
        },
        {
          "char": "空",
          "pinyin": "kòng",
          "new": false
        },
        {
          "char": "闷",
          "pinyin": "mēn",
          "new": true
        },
        {
          "char": "吧",
          "pinyin": "ba",
          "new": true
        },
        {
          "char": "消",
          "pinyin": "xiāo",
          "new": true
        },
        {
          "char": "息",
          "pinyin": "xī",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-27",
      "semester": "下册",
      "unit": 6,
      "lesson": "语文园地六",
      "page": 73,
      "entries": [
        {
          "char": "棍",
          "pinyin": "gùn",
          "new": true
        },
        {
          "char": "豆",
          "pinyin": "dòu",
          "new": true
        },
        {
          "char": "汤",
          "pinyin": "tāng",
          "new": true
        },
        {
          "char": "蚊",
          "pinyin": "wén",
          "new": true
        },
        {
          "char": "扇",
          "pinyin": "shàn",
          "new": true
        },
        {
          "char": "椅",
          "pinyin": "yǐ",
          "new": true
        },
        {
          "char": "牵",
          "pinyin": "qiān",
          "new": true
        },
        {
          "char": "织",
          "pinyin": "zhī",
          "new": true
        },
        {
          "char": "斗",
          "pinyin": "dǒu",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-28",
      "semester": "下册",
      "unit": 7,
      "lesson": "阅读 14 文具的家",
      "page": 78,
      "entries": [
        {
          "char": "具",
          "pinyin": "jù",
          "new": true
        },
        {
          "char": "铅",
          "pinyin": "qiān",
          "new": true
        },
        {
          "char": "新",
          "pinyin": "xīn",
          "new": true
        },
        {
          "char": "平",
          "pinyin": "píng",
          "new": true
        },
        {
          "char": "盒",
          "pinyin": "hé",
          "new": true
        },
        {
          "char": "些",
          "pinyin": "xiē",
          "new": true
        },
        {
          "char": "此",
          "pinyin": "cǐ",
          "new": true
        },
        {
          "char": "仔",
          "pinyin": "zǐ",
          "new": true
        },
        {
          "char": "检",
          "pinyin": "jiǎn",
          "new": true
        },
        {
          "char": "查",
          "pinyin": "chá",
          "new": true
        },
        {
          "char": "所",
          "pinyin": "suǒ",
          "new": true
        },
        {
          "char": "伙",
          "pinyin": "huǒ",
          "new": true
        },
        {
          "char": "伴",
          "pinyin": "bàn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-29",
      "semester": "下册",
      "unit": 7,
      "lesson": "阅读 15 一分钟",
      "page": 81,
      "entries": [
        {
          "char": "钟",
          "pinyin": "zhōng",
          "new": true
        },
        {
          "char": "迟",
          "pinyin": "chí",
          "new": true
        },
        {
          "char": "背",
          "pinyin": "bēi",
          "new": false
        },
        {
          "char": "灯",
          "pinyin": "dēng",
          "new": true
        },
        {
          "char": "等",
          "pinyin": "děng",
          "new": true
        },
        {
          "char": "啊",
          "pinyin": "a",
          "new": true
        },
        {
          "char": "决",
          "pinyin": "jué",
          "new": true
        },
        {
          "char": "定",
          "pinyin": "dìng",
          "new": true
        },
        {
          "char": "已",
          "pinyin": "yǐ",
          "new": true
        },
        {
          "char": "经",
          "pinyin": "jīng",
          "new": true
        },
        {
          "char": "位",
          "pinyin": "wèi",
          "new": true
        },
        {
          "char": "表",
          "pinyin": "biǎo",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-30",
      "semester": "下册",
      "unit": 7,
      "lesson": "阅读 16 动物王国开大会",
      "page": 84,
      "entries": [
        {
          "char": "虎",
          "pinyin": "hǔ",
          "new": true
        },
        {
          "char": "熊",
          "pinyin": "xióng",
          "new": true
        },
        {
          "char": "通",
          "pinyin": "tōng",
          "new": true
        },
        {
          "char": "注",
          "pinyin": "zhù",
          "new": true
        },
        {
          "char": "意",
          "pinyin": "yì",
          "new": true
        },
        {
          "char": "遍",
          "pinyin": "biàn",
          "new": true
        },
        {
          "char": "百",
          "pinyin": "bǎi",
          "new": true
        },
        {
          "char": "为",
          "pinyin": "wèi",
          "new": true
        },
        {
          "char": "因",
          "pinyin": "yīn",
          "new": true
        },
        {
          "char": "舌",
          "pinyin": "shé",
          "new": true
        },
        {
          "char": "理",
          "pinyin": "lǐ",
          "new": true
        },
        {
          "char": "呀",
          "pinyin": "yā",
          "new": false
        },
        {
          "char": "忘",
          "pinyin": "wàng",
          "new": true
        },
        {
          "char": "第",
          "pinyin": "dì",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-31",
      "semester": "下册",
      "unit": 7,
      "lesson": "阅读 17 小猴子下山",
      "page": 90,
      "entries": [
        {
          "char": "猴",
          "pinyin": "hóu",
          "new": true
        },
        {
          "char": "块",
          "pinyin": "kuài",
          "new": true
        },
        {
          "char": "结",
          "pinyin": "jiē",
          "new": false
        },
        {
          "char": "兴",
          "pinyin": "xìng",
          "new": true
        },
        {
          "char": "掰",
          "pinyin": "bāi",
          "new": true
        },
        {
          "char": "扛",
          "pinyin": "káng",
          "new": true
        },
        {
          "char": "往",
          "pinyin": "wǎng",
          "new": true
        },
        {
          "char": "棵",
          "pinyin": "kē",
          "new": true
        },
        {
          "char": "满",
          "pinyin": "mǎn",
          "new": true
        },
        {
          "char": "扔",
          "pinyin": "rēng",
          "new": true
        },
        {
          "char": "摘",
          "pinyin": "zhāi",
          "new": true
        },
        {
          "char": "捧",
          "pinyin": "pěng",
          "new": true
        },
        {
          "char": "追",
          "pinyin": "zhuī",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-32",
      "semester": "下册",
      "unit": 7,
      "lesson": "语文园地七",
      "page": 93,
      "entries": [
        {
          "char": "刷",
          "pinyin": "shuā",
          "new": true
        },
        {
          "char": "梳",
          "pinyin": "shū",
          "new": true
        },
        {
          "char": "巾",
          "pinyin": "jīn",
          "new": true
        },
        {
          "char": "皂",
          "pinyin": "zào",
          "new": true
        },
        {
          "char": "洗",
          "pinyin": "xǐ",
          "new": true
        },
        {
          "char": "澡",
          "pinyin": "zǎo",
          "new": true
        },
        {
          "char": "脸",
          "pinyin": "liǎn",
          "new": true
        },
        {
          "char": "盆",
          "pinyin": "pén",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-33",
      "semester": "下册",
      "unit": 8,
      "lesson": "阅读 18 棉花姑娘",
      "page": 98,
      "entries": [
        {
          "char": "棉",
          "pinyin": "mián",
          "new": true
        },
        {
          "char": "姑",
          "pinyin": "gū",
          "new": true
        },
        {
          "char": "娘",
          "pinyin": "niáng",
          "new": true
        },
        {
          "char": "病",
          "pinyin": "bìng",
          "new": true
        },
        {
          "char": "她",
          "pinyin": "tā",
          "new": true
        },
        {
          "char": "治",
          "pinyin": "zhì",
          "new": true
        },
        {
          "char": "燕",
          "pinyin": "yàn",
          "new": true
        },
        {
          "char": "帮",
          "pinyin": "bāng",
          "new": true
        },
        {
          "char": "害",
          "pinyin": "hài",
          "new": true
        },
        {
          "char": "别",
          "pinyin": "bié",
          "new": true
        },
        {
          "char": "干",
          "pinyin": "gàn",
          "new": true
        },
        {
          "char": "惊",
          "pinyin": "jīng",
          "new": true
        },
        {
          "char": "奇",
          "pinyin": "qí",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-34",
      "semester": "下册",
      "unit": 8,
      "lesson": "阅读 19 咕咚",
      "page": 102,
      "entries": [
        {
          "char": "咕",
          "pinyin": "gū",
          "new": true
        },
        {
          "char": "咚",
          "pinyin": "dōng",
          "new": true
        },
        {
          "char": "熟",
          "pinyin": "shú",
          "new": true
        },
        {
          "char": "掉",
          "pinyin": "diào",
          "new": true
        },
        {
          "char": "湖",
          "pinyin": "hú",
          "new": true
        },
        {
          "char": "吓",
          "pinyin": "xià",
          "new": true
        },
        {
          "char": "啦",
          "pinyin": "la",
          "new": true
        },
        {
          "char": "鹿",
          "pinyin": "lù",
          "new": true
        },
        {
          "char": "象",
          "pinyin": "xiàng",
          "new": true
        },
        {
          "char": "野",
          "pinyin": "yě",
          "new": true
        },
        {
          "char": "拦",
          "pinyin": "lán",
          "new": true
        },
        {
          "char": "哪",
          "pinyin": "nǎ",
          "new": true
        },
        {
          "char": "那",
          "pinyin": "nà",
          "new": true
        },
        {
          "char": "领",
          "pinyin": "lǐng",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-35",
      "semester": "下册",
      "unit": 8,
      "lesson": "阅读 20 小壁虎借尾巴",
      "page": 105,
      "entries": [
        {
          "char": "壁",
          "pinyin": "bì",
          "new": true
        },
        {
          "char": "借",
          "pinyin": "jiè",
          "new": true
        },
        {
          "char": "咬",
          "pinyin": "yǎo",
          "new": true
        },
        {
          "char": "难",
          "pinyin": "nán",
          "new": true
        },
        {
          "char": "哪",
          "pinyin": "na",
          "new": false
        },
        {
          "char": "爬",
          "pinyin": "pá",
          "new": true
        },
        {
          "char": "您",
          "pinyin": "nín",
          "new": true
        },
        {
          "char": "拨",
          "pinyin": "bō",
          "new": true
        },
        {
          "char": "赶",
          "pinyin": "gǎn",
          "new": true
        },
        {
          "char": "摆",
          "pinyin": "bǎi",
          "new": true
        },
        {
          "char": "过",
          "pinyin": "guò",
          "new": true
        },
        {
          "char": "孩",
          "pinyin": "hái",
          "new": true
        },
        {
          "char": "转",
          "pinyin": "zhuǎn",
          "new": true
        }
      ]
    },
    {
      "id": "g1b-36",
      "semester": "下册",
      "unit": 8,
      "lesson": "语文园地八",
      "page": 109,
      "entries": [
        {
          "char": "吵",
          "pinyin": "chǎo",
          "new": true
        },
        {
          "char": "现",
          "pinyin": "xiàn",
          "new": true
        },
        {
          "char": "顶",
          "pinyin": "dǐng",
          "new": true
        },
        {
          "char": "胖",
          "pinyin": "pàng",
          "new": true
        },
        {
          "char": "票",
          "pinyin": "piào",
          "new": true
        },
        {
          "char": "户",
          "pinyin": "hù",
          "new": true
        },
        {
          "char": "交",
          "pinyin": "jiāo",
          "new": true
        },
        {
          "char": "父",
          "pinyin": "fù",
          "new": true
        }
      ]
    }
  ]
};
  if(typeof module!=='undefined') module.exports=chars; else root.Characters=chars;
})(typeof window!=='undefined'?window:globalThis);
