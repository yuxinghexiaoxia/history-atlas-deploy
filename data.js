/* ============ 历史星图 · 数据集 ============ */
/* 数据来源：二十四史人物与事件。来源等级 A原始史料 B权威整理 C通俗资料 D待校验 */
window.DB = (function(){

const persons = {
  "qin_shihuang": {
    "id": "qin_shihuang",
    "type": "person",
    "name": "秦始皇",
    "alias": "嬴政",
    "born": -259,
    "died": -210,
    "dynasty": "qin",
    "role": [
      "秦朝开国皇帝",
      "政治家"
    ],
    "short": "中国历史上第一位皇帝，统一六国，建立中央集权制度。",
    "intro": "秦始皇嬴政，秦庄襄王之子。前246年即位，前230—前221年先后灭韩、赵、魏、楚、燕、齐六国，完成统一大业。自称「始皇帝」，推行郡县制、书同文、车同轨、统一度量衡，修筑长城与驰道。晚年求仙问道，焚书坑儒，滥用民力。前210年东巡途中病逝于沙丘。",
    "achievements": [
      "统一六国，建立中国历史上第一个大一统王朝",
      "推行郡县制，废除分封",
      "书同文、车同轨、统一度量衡",
      "修筑万里长城",
      "开凿灵渠，沟通长江与珠江水系"
    ],
    "controversy": "焚书坑儒钳制思想，严刑峻法、滥用民力导致民怨沸腾；死后三年秦亡。历史上评价两极，但统一之功不可磨灭。",
    "quote": "朕为始皇帝，后世以计数，二世、三世至于万世，传之无穷。",
    "quoteSrc": "《史记·秦始皇本纪》",
    "works": [
      "《秦始皇诏书》"
    ],
    "sources": [
      {
        "t": "《史记·秦始皇本纪》",
        "lv": "A"
      },
      {
        "t": "《史记·李斯列传》",
        "lv": "A"
      },
      {
        "t": "《战国策》",
        "lv": "A"
      }
    ],
    "life": [
      {
        "y": -259,
        "key": false,
        "t": "生于邯郸",
        "s": "秦质子之子"
      },
      {
        "y": -246,
        "key": true,
        "t": "即位秦王",
        "s": "时年13岁"
      },
      {
        "y": -238,
        "key": true,
        "t": "亲政，平定嫪毐之乱",
        "s": "罢吕不韦，独揽大权"
      },
      {
        "y": -230,
        "key": true,
        "t": "开始灭六国之战",
        "s": "先灭韩"
      },
      {
        "y": -221,
        "key": true,
        "t": "统一六国，称皇帝",
        "s": "建立秦朝"
      },
      {
        "y": -214,
        "key": false,
        "t": "派蒙恬北击匈奴，筑长城",
        "s": "连接旧长城"
      },
      {
        "y": -213,
        "key": false,
        "t": "焚书",
        "s": "除秦记、医药、卜筮、种树之书外皆焚"
      },
      {
        "y": -212,
        "key": false,
        "t": "坑儒",
        "s": "方士求仙不成，迁怒儒生"
      },
      {
        "y": -210,
        "key": true,
        "t": "病逝于沙丘",
        "s": "赵高、李斯矫诏立胡亥"
      }
    ],
    "relations": [
      {
        "to": "li_si",
        "type": "SERVE_AS",
        "label": "君臣",
        "desc": "以李斯为丞相"
      },
      {
        "to": "meng_tian",
        "type": "SERVE_AS",
        "label": "君臣",
        "desc": "以蒙恬为大将，北击匈奴"
      }
    ],
    "events": [
      "unification"
    ],
    "locations": [
      "xianyang",
      "linzi",
      "handan"
    ]
  },
  "li_si": {
    "id": "li_si",
    "type": "person",
    "name": "李斯",
    "alias": "字通古",
    "born": -284,
    "died": -208,
    "dynasty": "qin",
    "role": [
      "秦朝丞相",
      "法家代表人物"
    ],
    "short": "秦朝丞相，法家代表人物，助秦始皇统一六国，推行郡县制。",
    "intro": "李斯，楚上蔡人。初为郡小吏，后从荀卿学帝王之术。入秦后，先为吕不韦舍人，后说秦王嬴政并六国，被任为客卿。秦统一后，李斯为丞相，主张郡县制，反对分封，主持统一文字、度量衡。秦始皇死后，与赵高合谋矫诏立胡亥。后为赵高所忌，腰斩于咸阳，夷三族。",
    "achievements": [
      "助秦始皇统一六国",
      "主张推行郡县制",
      "主持统一文字（小篆）",
      "统一度量衡",
      "制定秦律"
    ],
    "controversy": "与赵高合谋矫诏，沙丘之变的主谋之一；后被赵高陷害，下场凄惨。",
    "quote": "泰山不让土壤，故能成其大；河海不择细流，故能就其深。",
    "quoteSrc": "《谏逐客书》",
    "works": [
      "《谏逐客书》"
    ],
    "sources": [
      {
        "t": "《史记·李斯列传》",
        "lv": "A"
      },
      {
        "t": "《史记·秦始皇本纪》",
        "lv": "A"
      }
    ],
    "life": [
      {
        "y": -284,
        "key": false,
        "t": "生于楚上蔡",
        "s": "平民出身"
      },
      {
        "y": -247,
        "key": false,
        "t": "入秦为吕不韦舍人",
        "s": "初见秦王"
      },
      {
        "y": -237,
        "key": true,
        "t": "上《谏逐客书》",
        "s": "使秦王收回逐客令"
      },
      {
        "y": -221,
        "key": true,
        "t": "秦统一，任丞相",
        "s": "主持统一制度"
      },
      {
        "y": -210,
        "key": true,
        "t": "沙丘之变，矫诏立胡亥",
        "s": "与赵高合谋"
      },
      {
        "y": -208,
        "key": true,
        "t": "被赵高陷害，腰斩",
        "s": "夷三族"
      }
    ],
    "relations": [
      {
        "to": "qin_shihuang",
        "type": "SERVE_AS",
        "label": "君臣",
        "desc": "为秦始皇丞相"
      },
      {
        "to": "meng_tian",
        "type": "COLLEAGUE_OF",
        "label": "同僚",
        "desc": "同为秦之重臣"
      }
    ],
    "events": [
      "unification"
    ],
    "locations": [
      "xianyang"
    ]
  },
  "meng_tian": {
    "id": "meng_tian",
    "type": "person",
    "name": "蒙恬",
    "alias": "",
    "born": -259,
    "died": -210,
    "dynasty": "qin",
    "role": [
      "秦朝名将",
      "军事家"
    ],
    "short": "秦朝名将，北击匈奴，修筑长城，主持修建秦直道。",
    "intro": "蒙恬，祖籍齐国，蒙骜之孙，蒙武之子。少学狱法，后为秦始皇重要将领。前215年，奉命率三十万大军北击匈奴，收复河南地，修筑长城，连接秦、赵、燕旧长城。又主持修建秦直道，从咸阳直达九原。秦始皇死后，被赵高、李斯矫诏赐死，吞药自杀。",
    "achievements": [
      "北击匈奴，收复河南地",
      "主持修筑万里长城",
      "修建秦直道",
      "开发河套地区"
    ],
    "controversy": "被赵高诬陷谋反，含冤而死。",
    "quote": "自吾先人，及至子孙，积功信于秦三世矣。",
    "quoteSrc": "《史记·蒙恬列传》",
    "works": [],
    "sources": [
      {
        "t": "《史记·蒙恬列传》",
        "lv": "A"
      }
    ],
    "life": [
      {
        "y": -259,
        "key": false,
        "t": "生于秦",
        "s": "将门世家"
      },
      {
        "y": -221,
        "key": true,
        "t": "拜为将军",
        "s": "攻破齐国"
      },
      {
        "y": -215,
        "key": true,
        "t": "北击匈奴",
        "s": "率三十万大军"
      },
      {
        "y": -214,
        "key": true,
        "t": "修筑长城",
        "s": "连接秦赵燕旧长城"
      },
      {
        "y": -210,
        "key": true,
        "t": "被赐死",
        "s": "赵高矫诏"
      }
    ],
    "relations": [
      {
        "to": "qin_shihuang",
        "type": "SERVE_AS",
        "label": "君臣",
        "desc": "为秦始皇大将"
      },
      {
        "to": "li_si",
        "type": "COLLEAGUE_OF",
        "label": "同僚",
        "desc": "同为秦之重臣"
      }
    ],
    "events": [
      "unification"
    ],
    "locations": [
      "xianyang"
    ]
  }
};

const events = {
  "unification": {
    "id": "unification",
    "type": "event",
    "name": "秦灭六国统一天下",
    "dynasty": "qin",
    "start": -230,
    "end": -221,
    "place": "中国（韩赵魏楚燕齐）",
    "placeId": "xianyang",
    "short": "秦始皇嬴政先后灭韩、赵、魏、楚、燕、齐六国，建立中国历史上第一个大一统王朝。",
    "bg": "战国末期，七雄并立。秦国经商鞅变法后国力日强，远交近攻，蚕食六国。前230年，秦王嬴政开始统一战争。",
    "process": "前230年灭韩；前228年灭赵；前225年灭魏；前223年灭楚；前222年灭燕；前221年灭齐。历时十年，六国皆亡。",
    "result": "秦统一中国，建立中央集权的郡县制国家，推行书同文、车同轨、统一度量衡。中国进入大一统时代，奠定此后两千年的政治格局。",
    "controversy": "统一过程中战争惨烈，六国贵族与民众抵抗激烈；统一后的暴政与苛法也是秦速亡的原因之一。",
    "chain": [
      {
        "id": "warring_states",
        "name": "战国纷争",
        "y": -475,
        "note": "前因·百年纷争"
      },
      {
        "id": "self",
        "name": "秦灭六国",
        "y": -221,
        "note": "本事件",
        "cur": true
      },
      {
        "id": "qin_collapse",
        "name": "秦朝覆亡",
        "y": -207,
        "note": "后果·二世而亡"
      }
    ],
    "persons": [
      "qin_shihuang",
      "li_si",
      "meng_tian"
    ],
    "related": [],
    "sources": [
      {
        "t": "《史记·秦始皇本纪》",
        "lv": "A"
      },
      {
        "t": "《史记·六国年表》",
        "lv": "A"
      }
    ]
  }
};

const locations = {
  "xianyang": {
    "id": "xianyang",
    "type": "location",
    "name": "咸阳",
    "desc": "秦朝都城，今陕西省咸阳市。"
  },
  "linzi": {
    "id": "linzi",
    "type": "location",
    "name": "临淄",
    "desc": "齐国都城，今山东省淄博市。"
  },
  "handan": {
    "id": "handan",
    "type": "location",
    "name": "邯郸",
    "desc": "赵国都城，今河北省邯郸市。"
  }
};

const dynasties = [
  {
    "id": "xia",
    "name": "夏",
    "yr": "前2070"
  },
  {
    "id": "shang",
    "name": "商",
    "yr": "前1600"
  },
  {
    "id": "zhou",
    "name": "周",
    "yr": "前1046"
  },
  {
    "id": "qin",
    "name": "秦",
    "yr": "前221"
  },
  {
    "id": "han",
    "name": "汉",
    "yr": "前202"
  },
  {
    "id": "sanguo",
    "name": "三国",
    "yr": "220"
  },
  {
    "id": "jin",
    "name": "晋",
    "yr": "266"
  },
  {
    "id": "nanbei",
    "name": "南北朝",
    "yr": "420"
  },
  {
    "id": "sui",
    "name": "隋",
    "yr": "581"
  },
  {
    "id": "tang",
    "name": "唐",
    "yr": "618"
  },
  {
    "id": "song",
    "name": "宋",
    "yr": "960"
  },
  {
    "id": "yuan",
    "name": "元",
    "yr": "1271"
  },
  {
    "id": "ming",
    "name": "明",
    "yr": "1368"
  },
  {
    "id": "qing",
    "name": "清",
    "yr": "1636"
  }
];

const timeline = [
  {
    "y": -284,
    "key": false,
    "type": "person",
    "t": "生于楚上蔡",
    "s": "平民出身",
    "pr": "li_si",
    "md": null
  },
  {
    "y": -259,
    "key": false,
    "type": "person",
    "t": "生于邯郸",
    "s": "秦质子之子",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -259,
    "key": false,
    "type": "person",
    "t": "生于秦",
    "s": "将门世家",
    "pr": "meng_tian",
    "md": null
  },
  {
    "y": -247,
    "key": false,
    "type": "person",
    "t": "入秦为吕不韦舍人",
    "s": "初见秦王",
    "pr": "li_si",
    "md": null
  },
  {
    "y": -246,
    "key": true,
    "type": "person",
    "t": "即位秦王",
    "s": "时年13岁",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -238,
    "key": true,
    "type": "person",
    "t": "亲政，平定嫪毐之乱",
    "s": "罢吕不韦，独揽大权",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -237,
    "key": true,
    "type": "person",
    "t": "上《谏逐客书》",
    "s": "使秦王收回逐客令",
    "pr": "li_si",
    "md": null
  },
  {
    "y": -230,
    "key": true,
    "type": "person",
    "t": "开始灭六国之战",
    "s": "先灭韩",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -230,
    "key": true,
    "type": "event",
    "t": "秦灭六国统一天下",
    "s": "秦始皇嬴政先后灭韩、赵、魏、楚、燕、齐六国，建立中国历史上第一个大一统王朝。",
    "ev": "unification",
    "md": null
  },
  {
    "y": -221,
    "key": true,
    "type": "person",
    "t": "统一六国，称皇帝",
    "s": "建立秦朝",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -221,
    "key": true,
    "type": "person",
    "t": "秦统一，任丞相",
    "s": "主持统一制度",
    "pr": "li_si",
    "md": null
  },
  {
    "y": -221,
    "key": true,
    "type": "person",
    "t": "拜为将军",
    "s": "攻破齐国",
    "pr": "meng_tian",
    "md": null
  },
  {
    "y": -215,
    "key": true,
    "type": "person",
    "t": "北击匈奴",
    "s": "率三十万大军",
    "pr": "meng_tian",
    "md": null
  },
  {
    "y": -214,
    "key": false,
    "type": "person",
    "t": "派蒙恬北击匈奴，筑长城",
    "s": "连接旧长城",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -214,
    "key": true,
    "type": "person",
    "t": "修筑长城",
    "s": "连接秦赵燕旧长城",
    "pr": "meng_tian",
    "md": null
  },
  {
    "y": -213,
    "key": false,
    "type": "person",
    "t": "焚书",
    "s": "除秦记、医药、卜筮、种树之书外皆焚",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -212,
    "key": false,
    "type": "person",
    "t": "坑儒",
    "s": "方士求仙不成，迁怒儒生",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -210,
    "key": true,
    "type": "person",
    "t": "病逝于沙丘",
    "s": "赵高、李斯矫诏立胡亥",
    "pr": "qin_shihuang",
    "md": null
  },
  {
    "y": -210,
    "key": true,
    "type": "person",
    "t": "沙丘之变，矫诏立胡亥",
    "s": "与赵高合谋",
    "pr": "li_si",
    "md": null
  },
  {
    "y": -210,
    "key": true,
    "type": "person",
    "t": "被赐死",
    "s": "赵高矫诏",
    "pr": "meng_tian",
    "md": null
  },
  {
    "y": -208,
    "key": true,
    "type": "person",
    "t": "被赵高陷害，腰斩",
    "s": "夷三族",
    "pr": "li_si",
    "md": null
  }
];

const hotPersons = [
  "qin_shihuang",
  "li_si",
  "meng_tian"
];
const hotEvents = [
  "unification"
];

const relMeta = {};

const dynastyInfo = {
  "xia": {
    "id": "xia",
    "name": "夏",
    "full": "夏朝",
    "en": "XIA DYNASTY",
    "status": "partial",
    "span": "前2070 – 前1600",
    "founded": "禹传子启",
    "ended": "前1600 商汤灭夏",
    "capital": "阳城、斟鄩",
    "summary": "中国历史上第一个世袭制王朝，由禹传子启而建立，标志着禅让制向世袭制的转变。",
    "stats": [
      {
        "k": "国祚",
        "v": "约470年"
      },
      {
        "k": "君主",
        "v": "17位"
      },
      {
        "k": "终结",
        "v": "前1600 商汤灭夏"
      }
    ]
  },
  "shang": {
    "id": "shang",
    "name": "商",
    "full": "商朝",
    "en": "SHANG DYNASTY",
    "status": "partial",
    "span": "前1600 – 前1046",
    "founded": "商汤灭夏",
    "ended": "前1046 武王伐纣",
    "capital": "亳、殷",
    "summary": "中国历史上第一个有文字（甲骨文）可考的王朝。青铜文明高度发达，殷墟发掘证实了商朝的存在。",
    "stats": [
      {
        "k": "国祚",
        "v": "约554年"
      },
      {
        "k": "君主",
        "v": "30位"
      },
      {
        "k": "终结",
        "v": "前1046 武王伐纣"
      }
    ]
  },
  "zhou": {
    "id": "zhou",
    "name": "周",
    "full": "周朝",
    "en": "ZHOU DYNASTY",
    "status": "partial",
    "span": "前1046 – 前256",
    "founded": "武王伐纣",
    "ended": "前256 秦灭东周",
    "capital": "镐京 → 洛邑",
    "summary": "中国历史上最长的王朝，分西周与东周（春秋、战国）。礼乐制度与分封制奠定中华文明的根基。",
    "stats": [
      {
        "k": "国祚",
        "v": "790年"
      },
      {
        "k": "君主",
        "v": "37位"
      },
      {
        "k": "终结",
        "v": "前256 秦灭东周"
      }
    ]
  },
  "qin": {
    "id": "qin",
    "name": "秦",
    "full": "秦朝",
    "en": "QIN DYNASTY",
    "status": "full",
    "span": "前221 – 前207",
    "founded": "前221 秦始皇统一六国",
    "ended": "前207 秦亡",
    "capital": "咸阳",
    "summary": "中国历史上第一个大一统中央集权王朝。秦始皇统一六国，推行郡县制、书同文、车同轨，但暴政导致速亡。",
    "stats": [
      {
        "k": "国祚",
        "v": "14年"
      },
      {
        "k": "皇帝",
        "v": "2位"
      },
      {
        "k": "终结",
        "v": "前207 秦亡"
      }
    ]
  },
  "han": {
    "id": "han",
    "name": "汉",
    "full": "汉朝",
    "en": "HAN DYNASTY",
    "status": "partial",
    "span": "前202 – 220",
    "founded": "前202 刘邦称帝",
    "ended": "220 曹丕篡汉",
    "capital": "长安 → 洛阳",
    "summary": "分为西汉与东汉，国祚四百余年。汉武帝独尊儒术、开疆拓土，奠定汉民族的文化认同。",
    "stats": [
      {
        "k": "国祚",
        "v": "422年"
      },
      {
        "k": "皇帝",
        "v": "29位"
      },
      {
        "k": "终结",
        "v": "220 曹丕篡汉"
      }
    ]
  },
  "sanguo": {
    "id": "sanguo",
    "name": "三国",
    "full": "三国",
    "en": "THREE KINGDOMS",
    "status": "partial",
    "span": "220 – 280",
    "founded": "220 曹丕篡汉",
    "ended": "280 晋灭吴",
    "capital": "洛阳/成都/建业",
    "summary": "魏、蜀、吴三国鼎立时期，是中国历史上政治军事谋略的巅峰时代。",
    "stats": [
      {
        "k": "国祚",
        "v": "60年"
      },
      {
        "k": "终结",
        "v": "280 晋灭吴"
      }
    ]
  },
  "jin": {
    "id": "jin",
    "name": "晋",
    "full": "晋朝",
    "en": "JIN DYNASTY",
    "status": "partial",
    "span": "266 – 420",
    "founded": "266 司马炎称帝",
    "ended": "420 刘裕篡晋",
    "capital": "洛阳 → 建康",
    "summary": "分为西晋与东晋。西晋短暂统一，八王之乱后五胡乱华；东晋偏安江南，士族门阀政治。",
    "stats": [
      {
        "k": "国祚",
        "v": "154年"
      },
      {
        "k": "终结",
        "v": "420 刘裕篡晋"
      }
    ]
  },
  "nanbei": {
    "id": "nanbei",
    "name": "南北朝",
    "full": "南北朝",
    "en": "SOUTHERN & NORTHERN DYNASTIES",
    "status": "partial",
    "span": "420 – 589",
    "founded": "420 刘裕建宋",
    "ended": "589 隋灭陈",
    "capital": "建康/洛阳/平城",
    "summary": "南北对峙的大分裂时期。南朝宋齐梁陈，北朝北魏、东魏、西魏、北齐、北周。佛教兴盛，民族融合。",
    "stats": [
      {
        "k": "国祚",
        "v": "169年"
      },
      {
        "k": "终结",
        "v": "589 隋灭陈"
      }
    ]
  },
  "sui": {
    "id": "sui",
    "name": "隋",
    "full": "隋朝",
    "en": "SUI DYNASTY",
    "status": "partial",
    "span": "581 – 618",
    "founded": "581 杨坚篡周",
    "ended": "618 隋亡",
    "capital": "大兴（长安）",
    "summary": "短暂而重要的统一王朝。隋炀帝开凿大运河、创立科举制，但滥用民力导致速亡。",
    "stats": [
      {
        "k": "国祚",
        "v": "37年"
      },
      {
        "k": "皇帝",
        "v": "3位"
      },
      {
        "k": "终结",
        "v": "618 隋亡"
      }
    ]
  },
  "tang": {
    "id": "tang",
    "name": "唐",
    "full": "唐朝",
    "en": "TANG DYNASTY",
    "status": "partial",
    "span": "618 – 907",
    "founded": "618 李渊称帝",
    "ended": "907 朱温篡唐",
    "capital": "长安",
    "summary": "中国封建社会的鼎盛时期。贞观之治、开元盛世，诗歌、艺术、对外交流达到顶峰。安史之乱后由盛转衰。",
    "stats": [
      {
        "k": "国祚",
        "v": "289年"
      },
      {
        "k": "皇帝",
        "v": "21位"
      },
      {
        "k": "终结",
        "v": "907 朱温篡唐"
      }
    ]
  },
  "song": {
    "id": "song",
    "name": "宋",
    "full": "宋朝",
    "en": "SONG DYNASTY",
    "status": "partial",
    "span": "960 – 1279",
    "founded": "960 赵匡胤陈桥兵变",
    "ended": "1279 崖山海战",
    "capital": "开封 → 临安",
    "summary": "分为北宋与南宋。经济文化极度繁荣，但军事积弱。与辽、金、西夏长期对峙。",
    "stats": [
      {
        "k": "国祚",
        "v": "319年"
      },
      {
        "k": "皇帝",
        "v": "18位"
      },
      {
        "k": "终结",
        "v": "1279 崖山海战"
      }
    ]
  },
  "yuan": {
    "id": "yuan",
    "name": "元",
    "full": "元朝",
    "en": "YUAN DYNASTY",
    "status": "partial",
    "span": "1271 – 1368",
    "founded": "1271 忽必烈定国号",
    "ended": "1368 明军北伐",
    "capital": "大都（北京）",
    "summary": "蒙古族建立的大一统王朝，疆域空前辽阔。行省制度开创后世行政区划格局。",
    "stats": [
      {
        "k": "国祚",
        "v": "97年"
      },
      {
        "k": "皇帝",
        "v": "11位"
      },
      {
        "k": "终结",
        "v": "1368 明军北伐"
      }
    ]
  },
  "ming": {
    "id": "ming",
    "name": "明",
    "full": "明朝",
    "en": "MING DYNASTY",
    "status": "partial",
    "span": "1368 – 1644",
    "founded": "1368 朱元璋称帝",
    "ended": "1644 崇祯自缢",
    "capital": "南京 → 北京",
    "summary": "汉族重建的大一统王朝。郑和下西洋、永乐大典、内阁制度。中后期宦官专权、党争与边患不断。",
    "stats": [
      {
        "k": "国祚",
        "v": "276年"
      },
      {
        "k": "皇帝",
        "v": "16位"
      },
      {
        "k": "终结",
        "v": "1644 甲申"
      }
    ]
  },
  "qing": {
    "id": "qing",
    "name": "清",
    "full": "清朝",
    "en": "QING DYNASTY",
    "status": "full",
    "span": "1636 – 1912",
    "founded": "后金1616·改清1636·入关1644",
    "ended": "1912 宣统退位",
    "capital": "盛京→北京",
    "summary": "中国历史上最后一个大一统封建王朝。满洲爱新觉罗氏崛起东北，入关定鼎，前期开疆拓土；中后期内忧外患，终在辛亥革命中覆灭。",
    "stats": [
      {
        "k": "国祚",
        "v": "276年"
      },
      {
        "k": "皇帝",
        "v": "12位"
      },
      {
        "k": "终结",
        "v": "1912 辛亥"
      }
    ]
  }
};

return { persons, events, locations, dynasties, timeline, hotPersons, hotEvents, relMeta, dynastyInfo };
})();
