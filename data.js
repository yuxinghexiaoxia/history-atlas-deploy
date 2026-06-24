/* ============ 历史星图 · 晚清数据集 ============ */
/* 真实历史人物/事件/关系，用于原型演示。来源等级 A原始史料 B权威整理 C通俗资料 D待校验 */
window.DB = (function(){

const persons = {
  zengguofan:{
    id:"zengguofan", type:"person", name:"曾国藩", alias:"曾涤生 · 文正",
    born:1811, died:1872, dynasty:"qing", role:["晚清重臣","湘军创立者","理学家"],
    short:"晚清政治家、军事家、理学家，湘军的创立者与统帅，洋务运动的早期推动者。",
    intro:"曾国藩，初名子城，字伯涵，号涤生。湖南长沙府湘乡人。道光十八年进士。太平天国运动兴起后，他在湖南募练湘军，历经十余年终于攻陷天京，被清廷倚为柱石。晚年倡导洋务，主张「师夷长技以自强」，奠定了近代中国自强运动的基调。其家书与日记影响后世极深，被誉为「立德立功立言」三不朽之人。",
    achievements:["编练湘军，平定太平天国","创办安庆内军械所，开洋务之先","保举李鸿章、左宗棠等一代名臣","《曾国藩家书》传世，影响近代士风"],
    controversy:"处理天津教案时对外妥协，时人讥为「曾国贼」；镇压太平天国手段酷烈，有「曾剃头」之称。功过评价至今两极。",
    quote:"物来顺应，未来不迎，当时不杂，既过不恋。",
    quoteSrc:"《曾国藩家书》",
    works:["《曾国藩家书》","《曾文正公全集》","《冰鉴》(传)"],
    sources:[{t:"《清史稿·曾国藩传》",lv:"A"},{t:"《曾文正公全集》",lv:"A"},{t:"《曾国藩传》(萧一山)",lv:"B"}],
    life:[
      {y:1811,key:false,t:"生于湖南湘乡",s:"农家出身，自幼苦读"},
      {y:1838,key:true,t:"中进士，入翰林院",s:"自此踏入仕途，十年七迁"},
      {y:1853,key:true,t:"奉旨办团练，创立湘军",s:"太平军北上，受命在湖南募兵"},
      {y:1860,key:true,t:"任两江总督",s:"统筹东南战局，节制四省军务"},
      {y:1864,key:true,t:"攻陷天京，平定太平天国",s:"湘军入南京，封一等毅勇侯"},
      {y:1865,key:false,t:"督办洋务，筹建江南制造总局",s:"与李鸿章共倡自强"},
      {y:1870,key:true,t:"处理天津教案",s:"对外交涉招致舆论非议"},
      {y:1872,key:true,t:"病逝于两江总督任上",s:"谥号文正，配享太庙"},
    ],
    relations:[
      {to:"lihongzhang",type:"TEACHER_OF",label:"门生",desc:"李鸿章入曾幕，受其举荐与栽培，后自成淮军体系。"},
      {to:"zuozongtang",type:"COLLEAGUE_OF",label:"同僚",desc:"同为湘系重臣，平定太平天国时并肩，后因战略分歧渐生龃龉。"},
      {to:"xianfeng",type:"SERVE_AS",label:"事君",desc:"咸丰帝在位时受命办团练。"},
      {to:"tongzhi",type:"SERVE_AS",label:"事君",desc:"同治朝官至武英殿大学士、两江总督。"},
      {to:"hongxiuquan",type:"RIVAL_OF",label:"敌对",desc:"湘军与太平天国为生死大敌，曾国藩为剿灭洪秀全政权的主帅。"},
    ],
    events:["taiping","yangwu","tianjinjiaoan"],
    locations:["xiangxiang","nanjing","anqing","tianjin"],
  },
  lihongzhang:{
    id:"lihongzhang", type:"person", name:"李鸿章", alias:"李少荃 · 文忠",
    born:1823, died:1901, dynasty:"qing", role:["晚清重臣","淮军创立者","外交家"],
    short:"晚清重臣，淮军与北洋水师的缔造者，洋务运动的核心人物，晚清外交的主要操盘者。",
    intro:"李鸿章，字渐甫，号少荃，安徽合肥人。早年入曾国藩幕府，后奉命组建淮军，与湘军并称。一生历办洋务、创北洋水师、设江南制造与轮船招商，是晚清自强运动的旗帜性人物。然甲午一败，北洋尽墨，又屡签不平等条约，毁誉随之而来。梁启超称其「为时势所造之英雄」。",
    achievements:["创建淮军与北洋水师","兴办江南制造总局、轮船招商局、开平煤矿","主持晚清主要外交交涉","推动近代工业与电报、铁路"],
    controversy:"签订《马关条约》《辛丑条约》，背负卖国骂名；北洋水师覆没，治军与用人备受指摘。",
    quote:"丈夫只手把吴钩，意气高于百尺楼。",
    quoteSrc:"《入都》",
    works:["《李文忠公全集》","《李鸿章奏稿》"],
    sources:[{t:"《清史稿·李鸿章传》",lv:"A"},{t:"《李文忠公全集》",lv:"A"},{t:"《李鸿章传》(梁启超)",lv:"B"}],
    life:[
      {y:1823,key:false,t:"生于安徽合肥",s:"书香门第"},
      {y:1847,key:false,t:"中进士",s:"与曾国藩有师生之谊"},
      {y:1862,key:true,t:"组建淮军，驰援上海",s:"以淮军立足东南"},
      {y:1870,key:true,t:"任直隶总督兼北洋大臣",s:"掌晚清外交与北洋军政二十余年"},
      {y:1888,key:true,t:"北洋水师正式成军",s:"亚洲一时之雄"},
      {y:1895,key:true,t:"签订《马关条约》",s:"甲午战败，割地赔款"},
      {y:1901,key:true,t:"签订《辛丑条约》后病逝",s:"谥文忠"},
    ],
    relations:[
      {to:"zengguofan",type:"STUDENT_OF",label:"业师",desc:"出曾国藩门下，幕府历练，得其举荐独当一面。"},
      {to:"zuozongtang",type:"RIVAL_OF",label:"政争",desc:"海防与塞防之争，二人主张相左，朝堂角力。"},
      {to:"cixi",type:"SERVE_AS",label:"事主",desc:"深得慈禧倚重，为晚清柱石之臣。"},
      {to:"taiping",type:"PARTICIPATED_IN",label:"参与",desc:"率淮军参与镇压太平天国。"},
    ],
    events:["taiping","yangwu","jiawu"],
    locations:["hefei","nanjing","tianjin"],
  },
  zuozongtang:{
    id:"zuozongtang", type:"person", name:"左宗棠", alias:"左季高 · 文襄",
    born:1812, died:1885, dynasty:"qing", role:["晚清重臣","收复新疆","洋务派"],
    short:"晚清军政重臣，湘军名将，以抬棺西征、收复新疆而名垂史册，洋务运动的实干家。",
    intro:"左宗棠，字季高，湖南湘阴人。少负奇才，自比诸葛。太平天国时入湘军，屡建战功。后以钦差大臣督办新疆军务，抬棺出关，平定阿古柏，收复新疆，奏请设立行省。又创福州船政局，为近代海军与工业奠基。其刚直自负，与李鸿章在海防塞防上针锋相对。",
    achievements:["收复新疆，奏设新疆行省","创办福州船政局与兰州制造局","平定陕甘回乱","主张塞防，力保西北版图"],
    controversy:"性情刚愎，与同僚多有龃龉；西征耗费巨大，举债借款引发争议。",
    quote:"身无半亩，心忧天下；读破万卷，神交古人。",
    quoteSrc:"自题联",
    works:["《左文襄公全集》"],
    sources:[{t:"《清史稿·左宗棠传》",lv:"A"},{t:"《左文襄公全集》",lv:"A"}],
    life:[
      {y:1812,key:false,t:"生于湖南湘阴",s:"耕读之家"},
      {y:1852,key:true,t:"入湖南幕府，崭露头角",s:"佐理军务，名重一时"},
      {y:1866,key:true,t:"创办福州船政局",s:"开近代海军工业先河"},
      {y:1875,key:true,t:"受命督办新疆军务",s:"抬棺西征，以示死志"},
      {y:1878,key:true,t:"收复新疆全境",s:"平定阿古柏，逐俄逼退"},
      {y:1885,key:true,t:"病逝于福州",s:"谥文襄"},
    ],
    relations:[
      {to:"zengguofan",type:"COLLEAGUE_OF",label:"同僚",desc:"同属湘系，早年合作平定太平天国，后渐疏远。"},
      {to:"lihongzhang",type:"RIVAL_OF",label:"政争",desc:"海防塞防之争的对立两极。"},
      {to:"taiping",type:"PARTICIPATED_IN",label:"参与",desc:"统楚军参与镇压太平天国。"},
    ],
    events:["taiping","yangwu"],
    locations:["xiangyin"],
  },
  hongxiuquan:{
    id:"hongxiuquan", type:"person", name:"洪秀全", alias:"天王",
    born:1814, died:1864, dynasty:"qing", role:["太平天国天王","拜上帝会创立者"],
    short:"太平天国运动的领袖，自称天王，建立与清廷对峙的太平天国政权，撼动晚清统治根基。",
    intro:"洪秀全，广东花县人。屡试不第后创立「拜上帝会」，融合基督教义与反清思想。1851年金田起义，建号太平天国，自称天王。1853年定都南京，改称天京，与清廷分庭抗礼十余年。后期内讧（天京事变）削弱政权，终在湘军围攻下败亡。",
    achievements:["发动金田起义，建立太平天国","颁布《天朝田亩制度》","定都天京，撼动清朝半壁江山"],
    controversy:"政教合一、定都后渐趋腐化；天京事变自相残杀，运动评价历来争议巨大。",
    quote:"天下多男人，尽是兄弟之辈；天下多女子，尽是姊妹之群。",
    quoteSrc:"《原道醒世训》",
    works:["《天朝田亩制度》","《原道救世歌》"],
    sources:[{t:"《清史稿》",lv:"A"},{t:"《太平天国史》(罗尔纲)",lv:"B"},{t:"《李秀成自述》",lv:"A"}],
    life:[
      {y:1814,key:false,t:"生于广东花县",s:"耕读之家，屡试不第"},
      {y:1843,key:false,t:"创立拜上帝会",s:"传播教义，聚众两广"},
      {y:1851,key:true,t:"金田起义，建号太平天国",s:"自称天王"},
      {y:1853,key:true,t:"定都南京，改称天京",s:"与清廷南北对峙"},
      {y:1856,key:true,t:"天京事变",s:"内讧自残，元气大伤"},
      {y:1864,key:true,t:"病逝，天京旋陷",s:"运动失败"},
    ],
    relations:[
      {to:"zengguofan",type:"RIVAL_OF",label:"敌对",desc:"与湘军主帅曾国藩为生死大敌。"},
      {to:"taiping",type:"LED",label:"领导",desc:"太平天国运动的最高领袖。"},
    ],
    events:["taiping"],
    locations:["nanjing"],
  },
  cixi:{
    id:"cixi", type:"person", name:"慈禧太后", alias:"叶赫那拉氏 · 老佛爷",
    born:1835, died:1908, dynasty:"qing", role:["晚清实际统治者","皇太后"],
    short:"晚清同治、光绪两朝实际最高统治者，垂帘听政近半世纪，深刻影响晚清政局走向。",
    intro:"慈禧，叶赫那拉氏。咸丰帝妃，同治帝生母。咸丰崩后，联合恭亲王发动辛酉政变，开始垂帘听政。其后近五十年间，同治、光绪两朝大政皆出其手。支持洋务以图自强，又在戊戌、庚子之间反复，晚清的兴衰荣辱与其密不可分。",
    achievements:["发动辛酉政变，掌握朝政","支持洋务运动自强","主持同光新政"],
    controversy:"挪用海军经费修园、戊戌政变、纵容义和团酿成庚子国难，是晚清衰亡的关键人物，评价极具争议。",
    quote:"量中华之物力，结与国之欢心。",
    quoteSrc:"《辛丑条约》善后上谕（传）",
    works:[],
    sources:[{t:"《清史稿·后妃传》",lv:"A"},{t:"《慈禧外纪》",lv:"C"}],
    life:[
      {y:1835,key:false,t:"生于官宦之家",s:"满洲镶蓝旗"},
      {y:1861,key:true,t:"辛酉政变，垂帘听政",s:"联合恭亲王诛肃顺等"},
      {y:1875,key:true,t:"立光绪帝，再度听政",s:"同治崩，掌大政"},
      {y:1898,key:true,t:"戊戌政变，囚光绪",s:"废新政"},
      {y:1908,key:true,t:"病逝于仪鸾殿",s:"次日光绪先一日崩"},
    ],
    relations:[
      {to:"lihongzhang",type:"SERVE_AS",label:"倚重",desc:"以李鸿章为外交与军政柱石。"},
      {to:"xianfeng",type:"SPOUSE_OF",label:"配偶",desc:"咸丰帝懿贵妃。"},
    ],
    events:["yangwu"],
    locations:["beijing"],
  },
  xianfeng:{
    id:"xianfeng", type:"person", name:"咸丰帝", alias:"爱新觉罗·奕詝",
    born:1831, died:1861, dynasty:"qing", role:["清朝皇帝"],
    short:"清朝第九位皇帝，在位期间内有太平天国、外有英法联军，是清朝由盛转衰的关键君主。",
    intro:"咸丰帝奕詝，道光帝第四子。在位十一年，内有太平天国席卷半壁，外有第二次鸦片战争、英法联军火烧圆明园。被迫北狩热河，忧惧而崩，遗命八大臣辅政，旋为慈禧、恭亲王所推翻。",
    achievements:["起用汉臣办团练，倚湘军平乱"],
    controversy:"《北京条约》割地赔款，国势日蹙；逃避热河，颇受后世非议。",
    quote:"",
    quoteSrc:"",
    works:[],
    sources:[{t:"《清史稿·文宗本纪》",lv:"A"}],
    life:[
      {y:1831,key:false,t:"生于北京",s:"道光帝四子"},
      {y:1850,key:true,t:"即皇帝位",s:"次年太平天国起"},
      {y:1860,key:true,t:"英法联军入京，北狩热河",s:"圆明园被焚"},
      {y:1861,key:true,t:"崩于热河",s:"遗命顾命八大臣"},
    ],
    relations:[
      {to:"zengguofan",type:"SERVE_AS",label:"君臣",desc:"命曾国藩办团练御太平军。"},
      {to:"cixi",type:"SPOUSE_OF",label:"配偶",desc:"懿贵妃即后来的慈禧。"},
    ],
    events:["taiping"],
    locations:["beijing"],
  },
  tongzhi:{
    id:"tongzhi", type:"person", name:"同治帝", alias:"爱新觉罗·载淳",
    born:1856, died:1875, dynasty:"qing", role:["清朝皇帝"],
    short:"清朝第十位皇帝，咸丰帝独子，在位期间为「同治中兴」，洋务渐兴，然英年早逝。",
    intro:"同治帝载淳，咸丰帝独子，六岁即位，两宫太后垂帘。其朝平定太平天国、捻军，洋务初兴，史称「同治中兴」。亲政未久即病逝，年仅十九。",
    achievements:["在位期间平定太平天国与捻军","洋务运动起步，号称中兴"],
    controversy:"实权操于两宫与恭亲王，亲政短暂，死因有天花、染疾等多说。",
    quote:"",
    quoteSrc:"",
    works:[],
    sources:[{t:"《清史稿·穆宗本纪》",lv:"A"}],
    life:[
      {y:1856,key:false,t:"生于北京",s:"咸丰帝独子"},
      {y:1861,key:true,t:"即位，两宫垂帘",s:"年号同治"},
      {y:1864,key:true,t:"平定太平天国",s:"同治中兴"},
      {y:1875,key:true,t:"崩",s:"年仅十九"},
    ],
    relations:[
      {to:"zengguofan",type:"SERVE_AS",label:"君臣",desc:"同治朝曾国藩为两江总督、大学士。"},
    ],
    events:["taiping","yangwu"],
    locations:["beijing"],
  },
};

const events = {
  taiping:{
    id:"taiping", type:"event", name:"太平天国运动", dynasty:"qing",
    start:1851, end:1864, place:"广西金田 → 南京（天京）", placeId:"nanjing",
    short:"19世纪中叶席卷中国南方的大规模农民战争，太平天国与清廷对峙十余年，深刻改变晚清格局。",
    bg:"清廷腐败、土地兼并、鸦片战争后赋税加重，加之两广天灾频仍，民不聊生。洪秀全借「拜上帝会」聚众，反清情绪一触即发。",
    process:"1851年金田起义，太平军一路北上，1853年攻克南京定为天京。其后西征、北伐并举，势力鼎盛。然1856年天京事变内讧，元气大伤。清廷倚湘军、淮军合围，1864年天京陷落，运动失败。",
    result:"运动历时十四年，波及十八省，死伤数千万。清廷依赖地方团练平乱，汉族督抚势力崛起，中央集权松动，为日后军阀割据埋下伏笔，也直接催生了洋务运动。",
    controversy:"是「农民革命」还是「邪教之乱」？其政教合一、定都腐化与天京内讧，使历史评价长期两极分化。",
    chain:[
      {id:"jintian",name:"金田起义",y:1851,note:"前因 · 起事"},
      {id:"self",name:"太平天国运动",y:"1851-64",note:"本事件",cur:true},
      {id:"tianjingshibian",name:"天京事变",y:1856,note:"转折 · 内讧"},
      {id:"yangwu2",name:"洋务运动",y:1861,note:"后果 · 自强",to:"yangwu"},
    ],
    persons:["hongxiuquan","zengguofan","lihongzhang","zuozongtang"],
    related:["yangwu","jiawu"],
    sources:[{t:"《清史稿》",lv:"A"},{t:"《李秀成自述》",lv:"A"},{t:"《太平天国史》(罗尔纲)",lv:"B"}],
  },
  yangwu:{
    id:"yangwu", type:"event", name:"洋务运动", dynasty:"qing",
    start:1861, end:1895, place:"全国（沪、宁、津、闽）", placeId:"nanjing",
    short:"清廷为图自强、求富而推行的近代化自强运动，「师夷长技以制夷」，开启中国工业化先声。",
    bg:"两次鸦片战争与太平天国的冲击，使清廷上下意识到「数千年未有之变局」。以恭亲王、曾国藩、李鸿章、左宗棠为代表的开明派主张学习西方技术。",
    process:"前期以「自强」为口号，兴办军事工业，如江南制造总局、福州船政局；后期转向「求富」，创办轮船招商局、开平煤矿、电报与铁路，并组建北洋水师。",
    result:"客观上引进了近代工业、教育与军事，培养了一批技术与外交人才。但甲午一战北洋尽墨，宣告以「中体西用」为纲的洋务运动未能挽救清朝命运。",
    controversy:"「中学为体，西学为用」是否注定失败？洋务的成败评价，关乎对近代化路径的根本反思。",
    chain:[
      {id:"taiping2",name:"太平天国运动",y:"1851-64",note:"前因",to:"taiping"},
      {id:"self",name:"洋务运动",y:"1861-95",note:"本事件",cur:true},
      {id:"jiawu2",name:"甲午战争",y:1894,note:"后果 · 受挫",to:"jiawu"},
    ],
    persons:["zengguofan","lihongzhang","zuozongtang","cixi"],
    related:["taiping","jiawu"],
    sources:[{t:"《筹办夷务始末》",lv:"A"},{t:"《清史稿》",lv:"A"}],
  },
  jiawu:{
    id:"jiawu", type:"event", name:"甲午战争", dynasty:"qing",
    start:1894, end:1895, place:"黄海 · 辽东 · 威海卫", placeId:"tianjin",
    short:"1894-95年中日之间的战争，北洋水师全军覆没，清廷战败签订《马关条约》，洋务自强幻象破灭。",
    bg:"日本明治维新后国力骤增，觊觎朝鲜与中国。朝鲜东学党起义成为导火索，中日争夺朝鲜控制权，战端遂开。",
    process:"陆战清军节节败退，海战中北洋水师于黄海重创、威海卫被困。1895年北洋水师全军覆没，清廷求和。",
    result:"签订《马关条约》，割让台湾、澎湖、辽东，赔款两亿两白银。洋务运动的自强成果毁于一旦，列强掀起瓜分狂潮，民族危机空前加深。",
    controversy:"败因在制度还是在人？李鸿章与北洋的责任，至今聚讼纷纭。",
    chain:[
      {id:"yangwu3",name:"洋务运动",y:"1861-95",note:"前因",to:"yangwu"},
      {id:"self",name:"甲午战争",y:"1894-95",note:"本事件",cur:true},
      {id:"maguan",name:"《马关条约》",y:1895,note:"后果 · 割地赔款"},
    ],
    persons:["lihongzhang","cixi"],
    related:["yangwu"],
    sources:[{t:"《清史稿》",lv:"A"},{t:"《李文忠公全集》",lv:"A"},{t:"《甲午战争史》(戚其章)",lv:"B"}],
  },
  tianjinjiaoan:{
    id:"tianjinjiaoan", type:"event", name:"天津教案", dynasty:"qing",
    start:1870, end:1870, place:"天津", placeId:"tianjin",
    short:"1870年天津民众与天主教会冲突酿成的外交事件，曾国藩奉命查办，对外妥协招致非议。",
    bg:"民间传言教堂拐骗幼童、挖眼剖心，民教积怨已深，终于爆发大规模冲突。",
    process:"民众焚毁教堂、杀死外国传教士与领事。列强陈兵示威，清廷命曾国藩查办。曾权衡国力，主张息事宁人，处死、流放多名百姓并赔款道歉。",
    result:"事件以对外妥协告终，曾国藩声望大损，被讥为「曾国贼」，不久调任两江、由李鸿章接手直隶。",
    controversy:"是「忍辱负重」还是「丧权辱国」？曾国藩的处置成为评价其晚节的关键。",
    chain:[
      {id:"self",name:"天津教案",y:1870,note:"本事件",cur:true},
    ],
    persons:["zengguofan","lihongzhang"],
    related:["yangwu"],
    sources:[{t:"《清史稿》",lv:"A"},{t:"《曾文正公全集》",lv:"A"}],
  },
};

const locations = {
  nanjing:{id:"nanjing",type:"location",name:"南京（天京）",desc:"太平天国都城，两江总督驻地。"},
  beijing:{id:"beijing",type:"location",name:"北京",desc:"清朝京师。"},
  tianjin:{id:"tianjin",type:"location",name:"天津",desc:"直隶总督北洋大臣驻地，通商口岸。"},
  anqing:{id:"anqing",type:"location",name:"安庆",desc:"安庆内军械所所在，洋务起点。"},
  xiangxiang:{id:"xiangxiang",type:"location",name:"湘乡",desc:"曾国藩故里，湘军兵源地。"},
  xiangyin:{id:"xiangyin",type:"location",name:"湘阴",desc:"左宗棠故里。"},
  hefei:{id:"hefei",type:"location",name:"合肥",desc:"李鸿章故里，淮军根基。"},
};

// 朝代时间带
const dynasties = [
  {id:"xia",name:"夏",yr:"前2070"},
  {id:"shang",name:"商",yr:"前1600"},
  {id:"zhou",name:"周",yr:"前1046"},
  {id:"qin",name:"秦",yr:"前221"},
  {id:"han",name:"汉",yr:"前202"},
  {id:"sanguo",name:"三国",yr:"220"},
  {id:"jin",name:"晋",yr:"266"},
  {id:"nanbei",name:"南北朝",yr:"420"},
  {id:"sui",name:"隋",yr:"581"},
  {id:"tang",name:"唐",yr:"618"},
  {id:"song",name:"宋",yr:"960"},
  {id:"yuan",name:"元",yr:"1271"},
  {id:"ming",name:"明",yr:"1368"},
  {id:"qing",name:"清",yr:"1636"},
];

// 时间线条目（晚清）
const timeline = [
  {y:1840,key:true,type:"war",t:"第一次鸦片战争",s:"中英战端开，近代史发端",ev:null,md:"06-01"},
  {y:1851,key:true,type:"event",t:"金田起义 · 太平天国建号",s:"洪秀全起事，撼动清廷",ev:"taiping",md:"01-11"},
  {y:1853,key:false,type:"event",t:"太平军定都天京",s:"南北对峙之局成",ev:"taiping"},
  {y:1853,key:false,type:"person",t:"曾国藩奉旨办团练",s:"湘军初创",pr:"zengguofan"},
  {y:1856,key:true,type:"event",t:"天京事变",s:"太平天国由盛转衰",ev:"taiping"},
  {y:1860,key:false,type:"war",t:"英法联军入北京 · 火烧圆明园",s:"咸丰北狩热河",ev:null},
  {y:1861,key:true,type:"event",t:"辛酉政变 · 慈禧垂帘",s:"洋务运动同年发端",ev:"yangwu"},
  {y:1862,key:false,type:"person",t:"李鸿章组建淮军",s:"驰援上海",pr:"lihongzhang"},
  {y:1864,key:true,type:"event",t:"湘军攻陷天京",s:"太平天国覆灭",ev:"taiping",md:"07-19"},
  {y:1866,key:false,type:"event",t:"左宗棠创福州船政局",s:"近代海军工业起步",ev:"yangwu"},
  {y:1870,key:false,type:"event",t:"天津教案",s:"曾国藩查办，舆论哗然",ev:"tianjinjiaoan"},
  {y:1872,key:false,type:"person",t:"曾国藩病逝",s:"谥文正",pr:"zengguofan"},
  {y:1875,key:false,type:"person",t:"左宗棠督办新疆军务",s:"抬棺西征",pr:"zuozongtang"},
  {y:1888,key:true,type:"event",t:"北洋水师成军",s:"亚洲一时之雄",ev:"yangwu"},
  {y:1894,key:true,type:"war",t:"甲午战争爆发",s:"中日海陆并战",ev:"jiawu",md:"07-25"},
  {y:1895,key:true,type:"event",t:"《马关条约》签订",s:"洋务自强幻灭",ev:"jiawu",md:"04-17"},
  {y:1898,key:false,type:"event",t:"戊戌变法与政变",s:"百日维新失败",ev:null},
  {y:1901,key:true,type:"person",t:"李鸿章签《辛丑条约》后病逝",s:"一代权臣落幕",pr:"lihongzhang",md:"11-07"},
];

// 热门
const hotPersons = ["zengguofan","lihongzhang","zuozongtang","hongxiuquan","cixi","tongzhi"];
const hotEvents = ["taiping","yangwu","jiawu","tianjinjiaoan"];

// 关系类型展示
const relMeta = {
  TEACHER_OF:{label:"师生",color:"var(--rel-teacher)",w:3,dash:""},
  STUDENT_OF:{label:"师生",color:"var(--rel-teacher)",w:3,dash:""},
  COLLEAGUE_OF:{label:"同僚",color:"var(--rel-colleague)",w:2.5,dash:""},
  RIVAL_OF:{label:"敌对/政争",color:"var(--rel-rival)",w:2.5,dash:"6 5"},
  SERVE_AS:{label:"君臣",color:"var(--rel-serve)",w:2,dash:""},
  SPOUSE_OF:{label:"亲属",color:"var(--rel-kin)",w:2.5,dash:""},
  PARTICIPATED_IN:{label:"参与事件",color:"var(--rel-event)",w:2,dash:"2 5"},
  LED:{label:"领导",color:"var(--rel-event)",w:3,dash:""},
};

// ============ 朝代详情 ============
const dynastyInfo = {
  qing:{
    id:"qing", name:"清", full:"清朝", en:"QING DYNASTY", status:"full",
    span:"1636 – 1912", founded:"后金 1616 · 改清 1636 · 入关 1644", ended:"1912 宣统退位",
    capital:"盛京（沈阳）→ 北京",
    summary:"清朝是中国历史上最后一个大一统封建王朝。满洲爱新觉罗氏崛起东北，入关定鼎，前期开疆拓土奠定近代版图，康雍乾三朝号称盛世；中后期内忧外患交织，鸦片战争后逐步沦为半殖民地半封建社会，终在辛亥革命的浪潮中覆灭。",
    stats:[{k:"国祚",v:"276 年"},{k:"皇帝",v:"12 位"},{k:"疆域峰值",v:"约 1316 万 km²"},{k:"终结",v:"1912 辛亥"}],
    emperors:[
      {name:"努尔哈赤",era:"天命",reign:"1616–1626",note:"建后金，统一女真"},
      {name:"皇太极",era:"天聪·崇德",reign:"1626–1643",note:"改国号为清"},
      {name:"顺治帝",era:"顺治",reign:"1644–1661",note:"入关定鼎北京"},
      {name:"康熙帝",era:"康熙",reign:"1661–1722",note:"平三藩·收台湾·拒沙俄",peak:true},
      {name:"雍正帝",era:"雍正",reign:"1722–1735",note:"设军机处·摊丁入亩"},
      {name:"乾隆帝",era:"乾隆",reign:"1735–1796",note:"十全武功·盛世顶点",peak:true},
      {name:"嘉庆帝",era:"嘉庆",reign:"1796–1820",note:"诛和珅·白莲教起"},
      {name:"道光帝",era:"道光",reign:"1820–1850",note:"鸦片战争·由盛转衰"},
      {name:"咸丰帝",era:"咸丰",reign:"1850–1861",note:"太平天国·英法联军",pid:"xianfeng"},
      {name:"同治帝",era:"同治",reign:"1861–1875",note:"两宫垂帘·同治中兴",pid:"tongzhi"},
      {name:"光绪帝",era:"光绪",reign:"1875–1908",note:"戊戌变法·囚于瀛台"},
      {name:"宣统帝",era:"宣统",reign:"1908–1912",note:"末代皇帝·清亡"},
    ],
    institutions:[
      {name:"军机处",desc:"雍正设立，皇权高度集中之巅，逐渐取代议政王大臣会议。"},
      {name:"八旗制度",desc:"军政合一的满洲根本制度，旗人世袭，晚清渐趋腐化。"},
      {name:"科举与文字狱",desc:"沿用八股取士笼络士人，又以文字狱钳制思想。"},
      {name:"理藩院与边疆",desc:"以盟旗、驻藏大臣、伊犁将军治理蒙藏回疆，奠定多民族版图。"},
      {name:"闭关与十三行",desc:"广州一口通商，行商垄断对外贸易，埋下近代冲突伏笔。"},
      {name:"考据学·四库全书",desc:"乾嘉学派盛行训诂考据，《四库全书》集传统典籍之大成。"},
    ],
    territory:[
      {y:"1644",t:"清军入关，定都北京"},
      {y:"1683",t:"施琅收台湾，设台湾府"},
      {y:"1689",t:"《尼布楚条约》划定中俄东段边界"},
      {y:"1759",t:"平定准回，统一新疆，疆域臻于鼎盛"},
      {y:"1842",t:"《南京条约》割香港岛，国门洞开"},
      {y:"1895",t:"《马关条约》割台湾、澎湖与辽东",to:"jiawu"},
    ],
    wars:[
      {name:"平定三藩",y:"1673–1681",result:"巩固南方统治"},
      {name:"雅克萨之战",y:"1685–1688",result:"遏制沙俄东扩"},
      {name:"平定准噶尔",y:"1690–1757",result:"统一西北"},
      {name:"第一次鸦片战争",y:"1840–1842",result:"战败·近代史开端"},
      {name:"太平天国运动",y:"1851–1864",result:"湘淮崛起·险动国本",to:"taiping"},
      {name:"甲午战争",y:"1894–1895",result:"北洋覆没·洋务破产",to:"jiawu"},
    ],
    keyPersons:["zengguofan","lihongzhang","zuozongtang","cixi","hongxiuquan"],
    keyEvents:["taiping","yangwu","jiawu","tianjinjiaoan"],
  },
  ming:{
    id:"ming", name:"明", full:"明朝", en:"MING DYNASTY", status:"partial",
    span:"1368 – 1644", founded:"1368 朱元璋称帝", ended:"1644 崇祯自缢煤山",
    capital:"应天（南京）→ 顺天（北京）",
    summary:"明朝由朱元璋推翻元朝建立，是汉族重建大一统的王朝。永乐年间国力鼎盛，郑和下西洋、营建北京、修《永乐大典》；中后期宦官专权、党争与边患不断，终在内有农民起义、外有后金的双重打击下覆亡。",
    stats:[{k:"国祚",v:"276 年"},{k:"皇帝",v:"16 位"},{k:"都城",v:"南京→北京"},{k:"终结",v:"1644 甲申"}],
    emperors:[
      {name:"明太祖",era:"洪武",reign:"1368–1398",note:"驱元立明·废丞相"},
      {name:"明成祖",era:"永乐",reign:"1402–1424",note:"迁都北京·郑和下西洋",peak:true},
      {name:"明英宗",era:"正统·天顺",reign:"1435–1464",note:"土木堡之变被俘"},
      {name:"明世宗",era:"嘉靖",reign:"1521–1567",note:"大礼议·东南倭患"},
      {name:"明神宗",era:"万历",reign:"1572–1620",note:"万历三大征·怠政"},
      {name:"明思宗",era:"崇祯",reign:"1627–1644",note:"内忧外患·煤山殉国"},
    ],
    institutions:[
      {name:"废丞相设内阁",desc:"朱元璋废中书省与丞相，皇权空前集中，后以内阁辅政。"},
      {name:"厂卫制度",desc:"锦衣卫与东西厂特务统治，监察百官、钳制朝野。"},
      {name:"八股取士",desc:"科举定于八股程式，士人思想趋于僵化。"},
      {name:"卫所与海禁",desc:"卫所军制与片板不许下海的海禁，晚明渐趋松弛。"},
    ],
    territory:[
      {y:"1368",t:"定都应天，北伐驱元"},
      {y:"1421",t:"永乐迁都北京，天子守国门"},
      {y:"1449",t:"土木堡之变，北疆告急"},
      {y:"1644",t:"李自成入北京，清军入关"},
    ],
    wars:[
      {name:"靖难之役",y:"1399–1402",result:"成祖夺位"},
      {name:"土木堡之变",y:"1449",result:"英宗被俘·国势顿挫"},
      {name:"万历朝鲜之役",y:"1592–1598",result:"援朝抗倭获胜"},
      {name:"明清松锦之战",y:"1640–1642",result:"明军主力尽丧"},
    ],
    keyPersons:[],
    keyEvents:[],
  },
};

// ============ 历史地图（晚清示意） ============
const mapData = {
  caption:"晚清地理示意 · 约 1851–1895",
  markers:[
    {id:"beijing",name:"北京",x:67,y:36,type:"capital",note:"清朝京师，紫禁城所在",loc:"beijing"},
    {id:"rehe",name:"热河",x:72,y:31,type:"city",note:"咸丰北狩，承德避暑山庄"},
    {id:"tianjin",name:"天津",x:69,y:40,type:"city",note:"直隶总督北洋大臣驻地",loc:"tianjin",ev:"tianjinjiaoan"},
    {id:"weihai",name:"威海卫",x:79,y:46,type:"battle",note:"北洋水师覆灭之地",ev:"jiawu"},
    {id:"nanjing",name:"南京·天京",x:74,y:58,type:"tianjing",note:"太平天国都城，两江总督驻地",loc:"nanjing",ev:"taiping"},
    {id:"shanghai",name:"上海",x:78,y:59,type:"city",note:"淮军立足·通商巨埠",pid:"lihongzhang"},
    {id:"anqing",name:"安庆",x:71,y:61,type:"city",note:"安庆内军械所·洋务起点",loc:"anqing",ev:"yangwu"},
    {id:"hefei",name:"合肥",x:71,y:59,type:"home",note:"李鸿章故里·淮军根基",pid:"lihongzhang"},
    {id:"wuchang",name:"武昌",x:64,y:62,type:"battle",note:"太平军西征要冲"},
    {id:"xiangxiang",name:"湘乡",x:61,y:69,type:"home",note:"曾国藩故里·湘军兵源",pid:"zengguofan"},
    {id:"jintian",name:"金田",x:56,y:82,type:"battle",note:"金田起义·太平天国发端",ev:"taiping"},
    {id:"fuzhou",name:"福州",x:74,y:73,type:"city",note:"福州船政局",pid:"zuozongtang",ev:"yangwu"},
    {id:"lanzhou",name:"兰州",x:46,y:48,type:"city",note:"左宗棠西征大本营",pid:"zuozongtang"},
    {id:"hami",name:"哈密",x:30,y:30,type:"city",note:"西征入疆门户"},
    {id:"urumqi",name:"乌鲁木齐",x:22,y:27,type:"battle",note:"收复新疆要地",pid:"zuozongtang"},
    {id:"kashi",name:"喀什",x:6,y:40,type:"battle",note:"平定阿古柏",pid:"zuozongtang"},
  ],
  routes:[
    {id:"taiping",name:"太平军进军",color:"var(--gold)",dash:"",pts:["jintian","wuchang","nanjing"],note:"1851 金田 → 1853 定都天京"},
    {id:"xizheng",name:"左宗棠西征",color:"var(--rel-colleague)",dash:"",pts:["lanzhou","hami","urumqi","kashi"],note:"1875–1878 抬棺出关，收复新疆"},
    {id:"yingfa",name:"英法联军北上",color:"var(--rel-rival)",dash:"6 5",pts:["tianjin","beijing","rehe"],note:"1860 入京焚园，咸丰北狩热河"},
  ],
  markerTypes:[
    {k:"capital",label:"京师",color:"var(--gold)"},
    {k:"tianjing",label:"对峙都城",color:"var(--gold-2)"},
    {k:"city",label:"重镇/驻地",color:"var(--blue)"},
    {k:"battle",label:"战事要地",color:"var(--rel-rival)"},
    {k:"home",label:"名臣故里",color:"var(--rel-colleague)"},
  ],
};

// ============ 人物详述 · 传记分节 / 史料原文 / 历代评价 ============
const personDetail = {
  zengguofan:{
    bio:[
      {h:"家世与早年",body:"曾国藩出身湖南湘乡一个普通的耕读之家，祖父曾玉屏治家严谨，父曾麟书为乡塾师。他自幼资质并不出众，却以「尚拙」自勉，苦读不辍。道光十八年（1838）二十八岁中进士，自此踏入仕途。"},
      {h:"京宦十年 · 理学修身",body:"入翰林院后，师事理学名臣唐鉴、倭仁，研习程朱之学，立志做「圣贤」。十年七迁，官至礼部侍郎。其间以日记苦修身心，每日检点过失，奠定了一生「主敬」「有恒」的修养功夫。"},
      {h:"墨绖出山 · 创立湘军",body:"咸丰二年丁母忧在籍，适太平军席卷湖南。他临危受命办团练，痛感绿营不堪用，遂仿戚继光成法，以同乡、师生、亲族为骨干，「选士人领山农」，编练出一支以「诚」与「礼」相维系的湘军。"},
      {h:"艰苦剿平太平天国",body:"自靖港之败到九江、安庆、天京，十余年苦战，几度濒于绝境，曾投水自尽未遂。终以「结硬寨、打呆仗」的稳进战法，于同治三年（1864）合围攻陷天京，封一等毅勇侯，成为清廷倚为柱石的中兴名臣。"},
      {h:"倡导洋务 · 自强求富",body:"战后他与李鸿章、左宗棠等同倡「自强」，创办安庆内军械所、江南制造总局，奏派幼童留学美国，主张「师夷智以造炮制船」，为近代中国工业与新式教育奠下先声。"},
      {h:"天津教案与身后",body:"同治九年办理天津教案，权衡国力主张息事宁人，对外赔款道歉，声望大损，被讥为「曾国贼」。次年调任两江，同治十一年病逝任上，谥文正，配享太庙。其家书、日记影响近世士风极深。"},
    ],
    classics:[
      {src:"《清史稿·曾国藩传》",lv:"A",text:"国藩为人威重，美须髯，目三角有棱。每对客，注视移时不语，见者悚然，退则记其优劣，无或爽者。",note:"正史对其相貌威仪与识人之明的记载。"},
      {src:"《曾国藩家书·致诸弟》",lv:"A",text:"勤字功夫，第一贵早起，第二贵有恒。",note:"家书中反复申说的治学治家之道。"},
      {src:"《曾国藩家书》",lv:"A",text:"家俭则兴，人勤则健；能勤能俭，永不贫贱。",note:"曾氏家训的核心，影响后世家风甚巨。"},
      {src:"《求阙斋日记》",lv:"A",text:"物来顺应，未来不迎，当时不杂，既过不恋。",note:"自我修养的座右铭，见其涵养功夫。"},
    ],
    appraisals:[
      {who:"梁启超",era:"清末民初",src:"《曾文正公嘉言钞》序",text:"曾文正者，岂惟近代，盖有史以来不一二睹之大人也已。"},
      {who:"毛泽东",era:"近代",src:"致黎锦熙书（1917）",text:"愚于近人，独服曾文正。"},
      {who:"章太炎",era:"清末民初",src:"评议",text:"曾国藩者，誉之则为圣相，谳之则为元凶。"},
    ],
    worksDetail:[
      {name:"《曾国藩家书》",desc:"约一千五百封家书，论修身、治学、治家、为政，平实恳切，被奉为后世家训典范。"},
      {name:"《曾文正公全集》",desc:"奏稿、批牍、文集、诗集、日记之总汇，是研究晚清政军史的一手史料。"},
      {name:"《冰鉴》（传）",desc:"相传为曾氏论识人观相之书，真伪尚有争议，标注为待校验。"},
    ],
  },
  lihongzhang:{
    bio:[
      {h:"入幕与组建淮军",body:"李鸿章出安徽合肥书香门第，二十五岁中进士，入曾国藩幕府历练。咸丰十一年奉命回乡募勇，仿湘军成法编成淮军，驰援上海，借洋枪洋炮立足东南，渐成与湘军并立的劲旅。"},
      {h:"直隶总督与北洋",body:"同治九年起任直隶总督兼北洋大臣，主持外交与北洋军政二十余年，是晚清实际的「外交总长」与洋务领袖，朝野倚为干城。"},
      {h:"兴办洋务实业",body:"创江南制造总局、轮船招商局、开平煤矿、天津电报、唐胥铁路，筹建北洋水师。光绪十四年（1888）北洋海军正式成军，号称亚洲第一。"},
      {h:"甲午败局与晚年",body:"甲午一战，北洋水师覆没于黄海、威海，自强成果毁于一旦。其后赴日签《马关条约》，遇刺仍忍辱议和；庚子之后再出，签《辛丑条约》后呕血而逝，谥文忠。"},
    ],
    classics:[
      {src:"《李鸿章奏稿》",lv:"A",text:"今日之天下，乃三千余年一大变局也。",note:"对时局的著名判断，是其洋务自强思想的前提。"},
      {src:"《李文忠公全集》",lv:"A",text:"处今日喜谈洋务，乃圣之时。",note:"主张顺应时势、学习西方以图自强。"},
      {src:"吴永《庚子西狩丛谈》",lv:"B",text:"我办了一辈子的事，练兵也，海军也，都是纸糊的老虎。",note:"晚年自况，道尽洋务困局的无奈。"},
    ],
    appraisals:[
      {who:"梁启超",era:"清末民初",src:"《李鸿章传》",text:"吾敬李鸿章之才，吾惜李鸿章之识，吾悲李鸿章之遇。"},
      {who:"伊藤博文",era:"近代",src:"世评",text:"大清帝国中唯一有能耐可和世界列强一争长短之人。"},
      {who:"慈禧太后",era:"晚清",src:"世评",text:"再造玄黄之人。"},
    ],
  },
  zuozongtang:{
    bio:[
      {h:"早年蹭蹬 · 自比诸葛",body:"左宗棠湖南湘阴人，少负奇才，自比诸葛亮，却三试礼部不第，遂绝意科场，专研舆地、兵法、农学。林则徐曾与之湘江夜话，以西北边务相托，引为忘年之交。"},
      {h:"入幕崭露头角",body:"太平天国起，先后入湖南巡抚幕，运筹军务，名重一时。后自统楚军，转战浙闽，以军功擢升闽浙总督，成为湘系重镇。"},
      {h:"创办福州船政",body:"同治五年创福州船政局，设船政学堂，开近代海军工业与海军教育之先河，旋调任陕甘总督，西向用兵。"},
      {h:"抬棺西征 · 收复新疆",body:"新疆为阿古柏所据，沙俄又强占伊犁。左宗棠力主「塞防」，与李鸿章「海防」之议针锋相对。光绪元年受命督办新疆军务，年逾花甲抬棺出关，以示死志；先北后南，数年间次第收复天山南北，逼俄归还伊犁，奏请设立新疆行省，功在千秋。"},
    ],
    classics:[
      {src:"自题联",lv:"B",text:"身无半亩，心忧天下；读破万卷，神交古人。",note:"少年时自勉之联，可见其胸襟抱负。"},
      {src:"《左文襄公全集·书牍》",lv:"A",text:"苟利国家，不求富贵。",note:"一生行事的真实写照。"},
      {src:"世传左宗棠联",lv:"C",text:"穷困潦倒之时，不被人欺；飞黄腾达之日，不被人捧。",note:"流传甚广，多见于通俗读物，标注为待校验。"},
    ],
    appraisals:[
      {who:"林则徐",era:"晚清",src:"湘江夜话（世传）",text:"将来御外侮者或有人，西定新疆，舍君莫属。"},
      {who:"现代史评",era:"当代",src:"综述",text:"抬棺西征、收复新疆，为中国保住约六分之一的疆土，左宗棠之功足以不朽。"},
    ],
  },
  hongxiuquan:{
    bio:[
      {h:"屡试不第 · 创拜上帝会",body:"洪秀全广东花县人，四次乡试落第，大病中得异梦，又读基督教布道小册《劝世良言》，遂创「拜上帝会」，宣讲独一真神，聚众于两广山区。"},
      {h:"金田起义 · 建号天国",body:"道光三十年冬会众于广西金田团营，次年正月起义，建号「太平天国」，洪秀全称天王，封五王，颁军律，势如破竹北上。"},
      {h:"定都天京",body:"咸丰三年（1853）攻克江宁，定为天京，颁《天朝田亩制度》，行圣库、男女别营之制，与清廷南北对峙十余年。"},
      {h:"天京事变与败亡",body:"定都后诸王争权，咸丰六年酿成「天京事变」，杨秀清、韦昌辉等相继被杀，石达开负气出走，元气大伤。此后虽有李秀成、陈玉成苦撑，终难挽颓势；同治三年洪秀全病逝，天京旋陷，运动失败。"},
    ],
    classics:[
      {src:"《天朝田亩制度》",lv:"A",text:"有田同耕，有饭同食，有衣同穿，有钱同使，无处不均匀，无人不饱暖。",note:"太平天国的土地与社会理想纲领。"},
      {src:"洪秀全《原道醒世训》",lv:"A",text:"天下多男人，尽是兄弟之辈；天下多女子，尽是姊妹之群。",note:"拜上帝会平等观念的表达。"},
    ],
    appraisals:[
      {who:"现代史评 · 肯定",era:"当代",src:"综述",text:"中国近代史上规模最大的农民战争，沉重打击了清王朝的统治与外国侵略势力。"},
      {who:"现代史评 · 局限",era:"当代",src:"综述",text:"政教合一、定都后迅速腐化，天京内讧自相残杀，其历史局限同样深刻。"},
    ],
  },
  cixi:{
    bio:[
      {h:"入宫与辛酉政变",body:"叶赫那拉氏，咸丰帝懿贵妃，生同治帝。咸丰崩于热河，她联合恭亲王奕訢发动辛酉政变，诛顾命八大臣，开始「垂帘听政」。"},
      {h:"同治中兴",body:"倚重恭亲王与曾、左、李等汉臣，平定太平天国、捻军，支持洋务自强，史称「同治中兴」，然大权始终操于两宫与议政王之手。"},
      {h:"戊戌政变",body:"光绪亲政后推行维新变法，慈禧发动戊戌政变，囚光绪于瀛台，杀「六君子」，废除新政，重掌大权。"},
      {h:"庚子国难与身后",body:"纵容义和团、对列强宣战，招致八国联军入京，仓皇西狩，回銮后签《辛丑条约》。光绪三十四年（1908）病逝，次日光绪先一日崩，清室元气大伤，三年而亡。"},
    ],
    classics:[
      {src:"《辛丑条约》善后上谕（传）",lv:"C",text:"量中华之物力，结与国之欢心。",note:"广为流传，常被引为其外交取向的写照，文本尚有考辨。"},
    ],
    appraisals:[
      {who:"现代史评 · 治术",era:"当代",src:"综述",text:"善权术、平满汉，垂帘近半世纪而权位不坠，政治手腕不可谓不高。"},
      {who:"现代史评 · 误国",era:"当代",src:"综述",text:"挪用海军经费、戊戌政变、庚子之乱，三事尤为后世所诟病，晚清衰亡与其难脱干系。"},
    ],
  },
  xianfeng:{
    bio:[
      {h:"临危即位",body:"道光帝第四子奕詝，1850年即位，次年金田起义爆发，内忧骤起。"},
      {h:"内外交困",body:"在位十一年，内有太平天国席卷半壁，外有第二次鸦片战争，国势日蹙。"},
      {h:"北狩与托孤",body:"1860年英法联军入京、火烧圆明园，咸丰北逃热河，次年忧惧而崩，遗命顾命八大臣辅佐幼主。"},
    ],
    classics:[
      {src:"《清史稿·文宗本纪》",lv:"A",text:"文宗遭阳九之运，躬明夷之会，外强要盟，内孽竞作，奄忽一纪，遂无一日之安。",note:"正史论赞，概括其生不逢时的一生。"},
    ],
    appraisals:[
      {who:"现代史评",era:"当代",src:"综述",text:"重用汉臣、倚湘军平乱有识人之明，然逃避热河、签订城下之盟，难辞其咎。"},
    ],
  },
  tongzhi:{
    bio:[
      {h:"冲龄即位",body:"咸丰帝独子载淳，六岁登基，两宫太后垂帘，恭亲王辅政。"},
      {h:"同治中兴",body:"其朝平定太平天国与捻军，洋务初兴，号称「同治中兴」，然实权不在己手。"},
      {h:"短促亲政",body:"亲政未久即病逝，年仅十九，死因有天花、染疾诸说。"},
    ],
    classics:[
      {src:"《清史稿·穆宗本纪》",lv:"A",text:"穆宗冲龄即阼，母后垂帘。",note:"正史对两宫听政之局的记载。"},
    ],
    appraisals:[
      {who:"现代史评",era:"当代",src:"综述",text:"「同治中兴」名为帝号，实赖恭亲王与中兴名臣；帝本人在位短促，建树有限。"},
    ],
  },
};
Object.keys(personDetail).forEach(k=>{ if(persons[k]) persons[k].detail=personDetail[k]; });

function get(id){return persons[id]||events[id]||locations[id]||null;}

/* 相似人物推荐（前端版）：基于朝代、身份标签、共同事件、关系网络重叠度 */
function getSimilarPersons(id, limit=5){
  const p=persons[id]; if(!p) return [];
  const scores=Object.values(persons).filter(o=>o.id!==id).map(o=>{
    let s=0, reasons=[];
    if(o.dynasty===p.dynasty){ s+=15; reasons.push("同一朝代"); }
    const roleOverlap=p.role.filter(r=>o.role.some(or=>or.includes(r.slice(0,2))||r.includes(or.slice(0,2))));
    if(roleOverlap.length){ s+=roleOverlap.length*12; reasons.push(`同为${roleOverlap.join("、")}`); }
    const commonEvents=(p.events||[]).filter(e=>(o.events||[]).includes(e));
    if(commonEvents.length){ s+=commonEvents.length*18; reasons.push(`共同参与 ${commonEvents.map(e=>events[e]?.name||e).join("、")}`); }
    const rels=new Set((p.relations||[]).map(r=>r.to));
    const oRels=new Set((o.relations||[]).map(r=>r.to));
    const commonRels=[...rels].filter(x=>oRels.has(x));
    if(commonRels.length){ s+=commonRels.length*10; reasons.push("关系网有交集"); }
    if(Math.abs((o.born+o.died)/2-(p.born+p.died)/2)<30){ s+=8; reasons.push("活跃年代相近"); }
    return {person:o, score:s, reasons};
  });
  return scores.filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit);
}

/* 今日历史：优先匹配月日，否则返回重要事件 */
function getTodayHistory(){
  const now=new Date();
  const mm=String(now.getMonth()+1).padStart(2,"0");
  const dd=String(now.getDate()).padStart(2,"0");
  const today=`${mm}-${dd}`;
  const matched=timeline.filter(it=>it.md===today);
  if(matched.length) return matched;
  // fallback: 按日期偏移选几个重要节点，保证每天都有内容
  const keyItems=timeline.filter(it=>it.key);
  const idx=(now.getDate()+now.getMonth()*31) % keyItems.length;
  return [keyItems[idx], keyItems[(idx+1)%keyItems.length]].filter(Boolean);
}

/* 人物相关地点对象列表 */
function getPersonLocations(pid){
  const p=persons[pid]; if(!p) return [];
  return (p.locations||[]).map(lid=>locations[lid]).filter(Boolean);
}

return {persons,events,locations,dynasties,dynastyInfo,mapData,timeline,hotPersons,hotEvents,relMeta,get,getSimilarPersons,getTodayHistory,getPersonLocations};
})();
