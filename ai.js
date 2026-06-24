/* ============ 历史星图 · AI 创作助手（拟真演示） ============ */

const AI_TEMPLATES = [{
  ic: "sparkle",
  t: "公众号选题",
  q: "帮我找李鸿章相关的公众号选题"
}, {
  ic: "doc",
  t: "人物文章大纲",
  q: "帮我写一篇关于曾国藩的公众号文章大纲"
}, {
  ic: "event",
  t: "事件讲解脚本",
  q: "帮我写一篇关于「太平天国运动」的短视频讲解脚本"
}, {
  ic: "network",
  t: "相似人物",
  q: "和曾国藩类似的历史人物有哪些？"
}];

/* mocked answer generator */
function genAnswer(q) {
  const s = q;
  if (/选题|爆点|标题/.test(s)) {
    return {
      kind: "list",
      title: "为「李鸿章」生成的 5 个公众号选题",
      lead: "基于站内结构化资料，结合争议度与搜索热度，为你筛选了高潜力角度：",
      items: [{
        h: "① 签了那么多不平等条约，李鸿章到底冤不冤？",
        d: "切入甲午与《马关条约》，对比当时国力与决策空间。"
      }, {
        h: "② 一个人撑起晚清半个朝廷：北洋的崛起与崩塌",
        d: "以淮军—北洋水师—甲午为主线，讲制度性困境。"
      }, {
        h: "③ 师徒、政敌、同乡：李鸿章的关系网有多复杂",
        d: "用关系图谱串联曾国藩、左宗棠，做人物群像。"
      }, {
        h: "④ 「裱糊匠」的自白：洋务运动为什么救不了大清",
        d: "中体西用的根本局限，配江南制造、招商局案例。"
      }, {
        h: "⑤ 马关谈判桌上的李鸿章：挨了一枪之后",
        d: "细节叙事，强戏剧张力，适合短视频。"
      }],
      cites: [{
        lv: "A",
        t: "《清史稿·李鸿章传》"
      }, {
        lv: "B",
        t: "《李鸿章传》(梁启超)"
      }, {
        lv: "A",
        t: "《李文忠公全集》"
      }],
      links: [["person", "lihongzhang", "李鸿章"], ["event", "jiawu", "甲午战争"], ["event", "yangwu", "洋务运动"]]
    };
  }
  if (/大纲|文章|写一篇/.test(s) && /曾国藩/.test(s)) {
    return {
      kind: "outline",
      title: "《曾国藩：一个理学家如何打赢一场战争》· 文章大纲",
      lead: "建议 2500–3000 字，配人物年表与关系图谱配图。结构如下：",
      items: [{
        h: "导语 · 一封家书引出的人物",
        d: "用「物来顺应」的家书金句切入，立人设。"
      }, {
        h: "一、农家子弟的十年七迁",
        d: "科举—翰林—京官，铺陈底色。引《清史稿》。"
      }, {
        h: "二、临危受命：湘军是怎样炼成的",
        d: "团练制度创新、以儒治军，对比绿营。"
      }, {
        h: "三、十二年围剿：从靖港之败到攻陷天京",
        d: "关键战役与心态起伏，引日记。"
      }, {
        h: "四、功成之后的隐忧与洋务转身",
        d: "裁军自保、安庆内军械所，承上启下。"
      }, {
        h: "五、天津教案与「曾国贼」的骂名",
        d: "争议收尾，立体化评价。"
      }, {
        h: "结语 · 立德立功立言的三不朽",
        d: "回扣家书，升华。"
      }],
      cites: [{
        lv: "A",
        t: "《清史稿·曾国藩传》"
      }, {
        lv: "A",
        t: "《曾文正公全集》"
      }, {
        lv: "B",
        t: "《曾国藩传》(萧一山)"
      }],
      links: [["person", "zengguofan", "曾国藩"], ["event", "taiping", "太平天国运动"], ["event", "tianjinjiaoan", "天津教案"]]
    };
  }
  if (/脚本|视频|分镜/.test(s)) {
    return {
      kind: "outline",
      title: "短视频脚本 ·《14 年，半个中国：太平天国始末》",
      lead: "时长约 3 分钟，竖屏。分镜与旁白如下：",
      items: [{
        h: "0:00 开场钩子",
        d: "旁白：「一场起义，让大清差点亡国，也彻底改变了中国。」画面：天京城。"
      }, {
        h: "0:15 起因",
        d: "鸦片战争后民不聊生 + 洪秀全与拜上帝会。引金田起义。"
      }, {
        h: "0:50 鼎盛",
        d: "定都天京、南北对峙，配地图动效。"
      }, {
        h: "1:30 转折",
        d: "天京事变内讧，元气大伤。强情绪点。"
      }, {
        h: "2:10 终局",
        d: "湘军合围、1864 天京陷落。曾国藩登场。"
      }, {
        h: "2:40 影响与升华",
        d: "汉族督抚崛起、洋务运动发端。引出下集。"
      }],
      cites: [{
        lv: "A",
        t: "《李秀成自述》"
      }, {
        lv: "B",
        t: "《太平天国史》(罗尔纲)"
      }, {
        lv: "A",
        t: "《清史稿》"
      }],
      links: [["event", "taiping", "太平天国运动"], ["person", "hongxiuquan", "洪秀全"], ["person", "zengguofan", "曾国藩"]]
    };
  }
  if (/相似|类似|像/.test(s)) {
    return {
      kind: "list",
      title: "与「曾国藩」相似的历史人物",
      lead: "按朝代身份、事件参与、历史评价与图谱关系综合计算，并附相似理由：",
      items: [{
        h: "左宗棠 · 相似度 86%",
        d: "同为湘系名臣、洋务实干家，皆以军功立身、文襄文正并称。"
      }, {
        h: "李鸿章 · 相似度 82%",
        d: "门生关系，接棒洋务与外交，同处「数千年未有之变局」。"
      }, {
        h: "张居正（明）· 相似度 71%",
        d: "皆为力挽狂澜的改革型重臣，身后毁誉参半。"
      }],
      cites: [{
        lv: "B",
        t: "《清史稿》相似度算法（朝代+身份+事件+评价）"
      }],
      links: [["person", "zuozongtang", "左宗棠"], ["person", "lihongzhang", "李鸿章"]]
    };
  }
  if (/1864|一八六四/.test(s)) {
    return {
      kind: "list",
      title: "1864 年 · 这一年发生了什么",
      lead: "站内收录的 1864 年关键节点：",
      items: [{
        h: "湘军攻陷天京，太平天国覆灭",
        d: "曾国藩封一等毅勇侯；洪秀全已于同年病逝。"
      }, {
        h: "汉族督抚势力定型",
        d: "中央集权松动，为日后格局埋下伏笔。"
      }],
      cites: [{
        lv: "A",
        t: "《清史稿》"
      }, {
        lv: "A",
        t: "《李秀成自述》"
      }],
      links: [["event", "taiping", "太平天国运动"], ["person", "zengguofan", "曾国藩"]]
    };
  }
  // fallback — 资料不足提示（符合可信机制）
  return {
    kind: "insufficient",
    title: "站内资料暂不足以充分回答",
    lead: `关于「${s}」，当前知识库（晚清示范数据）尚未收录足够的结构化资料。AI 不会无来源扩写关键史实。`,
    items: [{
      h: "你可以尝试",
      d: "曾国藩 / 李鸿章 / 太平天国运动 / 洋务运动 / 甲午战争 等已收录条目。"
    }],
    cites: [],
    links: []
  };
}
function AnswerCard({
  a,
  nav
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 7,
      fontFamily: "var(--font-serif)"
    }
  }, a.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontSize: 14,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, a.lead), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: a.kind === "outline" ? 2 : 11
    }
  }, a.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: a.kind === "outline" ? {
      padding: "10px 0",
      borderBottom: i < a.items.length - 1 ? "1px solid var(--line)" : "none"
    } : {
      padding: "12px 14px",
      background: "var(--bg)",
      borderRadius: 10,
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      marginBottom: 3
    }
  }, it.h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.65
    }
  }, it.d)))), a.cites.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: "13px 15px",
      background: "var(--gold-soft)",
      borderRadius: 11,
      border: "1px solid var(--gold-line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      color: "var(--gold)",
      fontWeight: 700,
      marginBottom: 9
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 14
  }), "\u5F15\u7528\u7AD9\u5185\u53F2\u6599 \xB7 ", a.cites.length, " \u6761"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 9
    }
  }, a.cites.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(SourceTag, {
    lv: c.lv
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      fontFamily: "var(--font-serif)"
    }
  }, c.t))))), a.links && a.links.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9,
      marginTop: 14,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)"
    }
  }, "\u76F8\u5173\u6761\u76EE\uFF1A"), a.links.map(([k, id, t], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip",
    onClick: () => nav(k, id)
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: k,
    size: 11
  }), t)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      marginLeft: "auto"
    },
    onClick: () => {
      const md = `# ${a.title}\n\n${a.lead}\n\n${a.items.map(it => `## ${it.h}\n${it.d}`).join("\n\n")}\n\n## 引用站内史料\n${a.cites.map(c => `- [${c.lv}] ${c.t}`).join("\n")}`;
      downloadText(md, `${a.title.replace(/[\\/:*?"<>|]/g, "_")}.md`, "text/markdown");
      recordExport({
        id: "ai_" + Date.now(),
        type: "ai",
        name: a.title
      }, "Markdown");
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 13
  }), "\u5BFC\u51FA\u7D20\u6750\u5305")));
}
function AIPage({
  nav,
  query
}) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef(null);
  const sentRef = useRef(false);
  const send = useCallback(text => {
    const q = (text || "").trim();
    if (!q || busy) return;
    setInput("");
    setMsgs(m => [...m, {
      role: "user",
      text: q
    }]);
    setBusy(true);
    setTimeout(() => {
      setMsgs(m => [...m, {
        role: "ai",
        answer: genAnswer(q)
      }]);
      setBusy(false);
    }, 950);
  }, [busy]);
  useEffect(() => {
    if (query && !sentRef.current) {
      sentRef.current = true;
      setTimeout(() => send(query), 300);
    }
  }, [query, send]);
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [msgs, busy]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up wrap-wide",
    style: {
      padding: "18px 28px 0",
      height: "calc(100vh - 60px)",
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb",
    style: {
      padding: "4px 0 12px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("home")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, "AI \u521B\u4F5C\u52A9\u624B")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "230px 1fr",
      gap: 22,
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlabel",
    style: {
      margin: "0 0 2px"
    }
  }, "\u521B\u4F5C\u6A21\u677F"), AI_TEMPLATES.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "card card-hover",
    style: {
      padding: "13px 15px",
      display: "flex",
      alignItems: "center",
      gap: 11,
      textAlign: "left"
    },
    onClick: () => send(t.q)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.ic,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, t.t))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 14,
      marginTop: 6,
      fontSize: 12,
      color: "var(--text-3)",
      lineHeight: 1.7,
      background: "var(--bg-2)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 14,
    style: {
      color: "var(--gold)"
    }
  }), " \u6240\u6709\u56DE\u7B54\u5747\u57FA\u4E8E\u7AD9\u5185\u7ED3\u6784\u5316\u53F2\u6599\uFF0C\u5E76\u6807\u6CE8\u6765\u6E90\u4E0E\u53EF\u4FE1\u7B49\u7EA7\uFF1B\u8D44\u6599\u4E0D\u8DB3\u65F6\u4F1A\u5982\u5B9E\u63D0\u793A\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    style: {
      flex: 1,
      overflow: "auto",
      padding: "24px 26px",
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, msgs.length === 0 && !busy && /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "auto",
      textAlign: "center",
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--gold)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 40
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 22,
      margin: "0 0 8px"
    }
  }, "AI \u5386\u53F2\u521B\u4F5C\u52A9\u624B"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      lineHeight: 1.7,
      margin: "0 0 18px"
    }
  }, "\u627E\u9009\u9898\u3001\u5199\u5927\u7EB2\u3001\u751F\u6210\u8BB2\u89E3\u811A\u672C\u2014\u2014\u57FA\u4E8E\u665A\u6E05\u7ED3\u6784\u5316\u53F2\u6599\uFF0C\u6BCF\u6761\u56DE\u7B54\u90FD\u9644\u5F15\u7528\u6765\u6E90\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "chips",
    style: {
      justifyContent: "center"
    }
  }, AI_TEMPLATES.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip",
    onClick: () => send(t.q)
  }, t.t)))), msgs.map((m, i) => m.role === "user" ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: "flex-end",
      maxWidth: "78%",
      background: "var(--gold-soft)",
      border: "1px solid var(--gold-line)",
      borderRadius: "14px 14px 4px 14px",
      padding: "11px 16px",
      fontSize: 14.5
    }
  }, m.text) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 13,
      maxWidth: "92%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "var(--gold-soft)",
      color: "var(--gold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "18px 20px",
      background: "var(--bg-2)",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(AnswerCard, {
    a: m.answer,
    nav: nav
  })))), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "var(--gold-soft)",
      color: "var(--gold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "16px 20px",
      background: "var(--bg-2)",
      flex: 1,
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-3)",
      marginBottom: 10
    }
  }, "\u6B63\u5728\u68C0\u7D22\u7AD9\u5185\u53F2\u6599\u5E76\u751F\u6210\u2026"), /*#__PURE__*/React.createElement("div", {
    className: "skel",
    style: {
      height: 12,
      marginBottom: 8,
      width: "90%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "skel",
    style: {
      height: 12,
      marginBottom: 8,
      width: "75%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "skel",
    style: {
      height: 12,
      width: "60%"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--line)",
      padding: "14px 18px",
      display: "flex",
      gap: 10,
      background: "var(--card-2)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") send(input);
    },
    placeholder: "\u95EE\u70B9\u4EC0\u4E48\uFF0C\u6216\u7C98\u8D34\u4E00\u4E2A\u4EBA\u7269 / \u4E8B\u4EF6\u540D\u2026",
    style: {
      flex: 1,
      height: 46,
      padding: "0 16px",
      background: "var(--bg)",
      border: "1px solid var(--line-2)",
      borderRadius: 12,
      color: "var(--text)",
      fontSize: 14.5,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    style: {
      height: 46,
      padding: "0 22px"
    },
    disabled: busy,
    onClick: () => send(input)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 16
  }), "\u53D1\u9001")))));
}
Object.assign(window, {
  AIPage
});