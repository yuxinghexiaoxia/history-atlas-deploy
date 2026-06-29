/* ============ 历史星图 · 人物详情页 ============ */

function InfoRow({
  k,
  v
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      padding: "9px 0",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 58,
      flex: "none",
      fontSize: 13,
      color: "var(--text-3)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text)"
    }
  }, v));
}
function Panel({
  title,
  icon,
  children,
  right,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "card",
    style: {
      padding: "20px 22px",
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 15
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 700
    }
  }, title), right && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, right)), children);
}
function buildMarkdown(entity) {
  const isP = entity.type === "person";
  const dd = isP ? entity.detail || {} : {};
  const detailMd = isP ? (dd.bio && dd.bio.length ? `\n\n## 生平详述\n${dd.bio.map(s => `### ${s.h}\n${s.body}`).join("\n\n")}` : "") + (dd.classics && dd.classics.length ? `\n\n## 史料原文\n${dd.classics.map(c => `> ${c.text}\n——《${c.src}》[${c.lv}]${c.note ? `\n释义：${c.note}` : ""}`).join("\n\n")}` : "") + (dd.appraisals && dd.appraisals.length ? `\n\n## 历代评价\n${dd.appraisals.map(a => `- ${a.who}（${a.era}）：「${a.text}」`).join("\n")}` : "") : "";
  return isP ? `# ${entity.name}（${entity.born}–${entity.died}）\n> ${entity.role.join(" · ")}\n\n## 生平简介\n${entity.intro}\n\n## 关键成就\n${entity.achievements.map(a => "- " + a).join("\n")}${detailMd}\n\n## 生平年表\n${entity.life.map(l => `- ${l.y} ${l.t}：${l.s}`).join("\n")}\n\n## 人物关系\n${entity.relations.map(r => `- 【${DB.relMeta[r.type]?.label || r.label}】${DB.get(r.to)?.name || r.to}：${r.desc}`).join("\n")}\n\n## 争议评价\n${entity.controversy}\n\n## 史料来源\n${entity.sources.map(s => `- [${s.lv}] ${s.t}`).join("\n")}` : `# ${entity.name}（${entity.start}–${entity.end}）\n> ${entity.place}\n\n## 背景\n${entity.bg}\n\n## 经过\n${entity.process}\n\n## 结果影响\n${entity.result}\n\n## 参与人物\n${entity.persons.map(p => "- " + DB.persons[p].name).join("\n")}\n\n## 史料来源\n${entity.sources.map(s => `- [${s.lv}] ${s.t}`).join("\n")}`;
}
function ExportModal({
  entity,
  onClose,
  graphCanvasRef
}) {
  const [fmt, setFmt] = useState("Markdown");
  const [copied, setCopied] = useState(false);
  const md = React.useMemo(() => buildMarkdown(entity), [entity]);
  const formats = ["Markdown", "Word", "公众号图文", "图谱 PNG"];
  function doExport() {
    const safeName = entity.name.replace(/[\\/:*?"<>|]/g, "_");
    if (fmt === "Markdown") {
      navigator.clipboard && navigator.clipboard.writeText(md);
      recordExport(entity, "Markdown");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } else if (fmt === "Word") {
      exportWord(entity, md);
      recordExport(entity, "Word");
    } else if (fmt === "公众号图文") {
      const canvas = generateEntityCard(entity, {
        width: 900
      });
      downloadCanvas(canvas, `${safeName}_公众号配图.png`);
      recordExport(entity, "公众号图文");
    } else if (fmt === "图谱 PNG") {
      const svg = graphWrapRef && graphWrapRef.current && graphWrapRef.current.querySelector("svg");
      if (svg) {
        exportSvgAsPng(svg, `${safeName}_关系图谱.png`).then(() => recordExport(entity, "图谱 PNG"));
      } else {
        alert("当前页面没有可导出的图谱，请进入「关系图谱」全屏页导出。");
      }
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      background: "rgba(5,8,16,.7)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      width: 680,
      maxWidth: "100%",
      maxHeight: "86vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--gold-line)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "18px 22px",
      borderBottom: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 19
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17
    }
  }, "\u5BFC\u51FA\u7D20\u6750\u5305 \xB7 ", entity.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold btn-sm",
    onClick: doExport
  }, fmt === "Markdown" ? copied ? "已复制" : "复制 Markdown" : "导出 " + fmt), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "12px 22px",
      borderBottom: "1px solid var(--line)",
      flexWrap: "wrap"
    }
  }, formats.map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip" + (fmt === f ? " on" : ""),
    onClick: () => setFmt(f)
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "18px 22px"
    }
  }, fmt === "Markdown" && /*#__PURE__*/React.createElement("pre", {
    style: {
      margin: 0,
      fontSize: 13,
      lineHeight: 1.7,
      color: "var(--text-2)",
      fontFamily: "var(--font-num)",
      whiteSpace: "pre-wrap"
    }
  }, md), fmt === "Word" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, "\u70B9\u51FB\u300C\u5BFC\u51FA Word\u300D\u5C06\u751F\u6210 .doc \u6587\u4EF6\uFF0C\u5305\u542B\u5F53\u524D\u4EBA\u7269/\u4E8B\u4EF6\u7684\u5B8C\u6574 Markdown \u5185\u5BB9\u3002"), fmt === "公众号图文" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      marginBottom: 14
    }
  }, "\u5C06\u751F\u6210 900\xD7? \u7684\u4FE1\u606F\u957F\u56FE\uFF0C\u9002\u5408\u516C\u4F17\u53F7\u5C01\u9762\u6216\u6B63\u6587\u914D\u56FE\u3002"), /*#__PURE__*/React.createElement(EntityCardPreview, {
    entity: entity
  })), fmt === "图谱 PNG" && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, "\u5C06\u5BFC\u51FA\u5F53\u524D\u5173\u7CFB\u56FE\u8C31\u4E3A PNG \u56FE\u7247\u3002", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontSize: 13
    }
  }, "\u63D0\u793A\uFF1A\u5728\u4EBA\u7269\u9875\u6216\u5173\u7CFB\u56FE\u8C31\u9875\u70B9\u51FB\u5BFC\u51FA\u65F6\uFF0C\u4F1A\u6355\u83B7\u5F53\u524D\u56FE\u8C31 Canvas\u3002")))));
}
function EntityCardPreview({
  entity
}) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = generateEntityCard(entity, {
      width: 900
    });
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.borderRadius = "12px";
    ref.current.innerHTML = "";
    ref.current.appendChild(canvas);
  }, [entity]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      maxWidth: "100%",
      border: "1px solid var(--line)",
      borderRadius: "12px",
      overflow: "hidden"
    }
  });
}
function ClassicCard({
  c
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "18px 20px 18px 22px",
      borderRadius: 12,
      background: "var(--card-2)",
      border: "1px solid var(--line)",
      borderLeft: "3px solid var(--gold)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 10,
      right: 16,
      color: "var(--gold-line)",
      fontFamily: "var(--font-serif)",
      fontSize: 40,
      lineHeight: 1,
      userSelect: "none"
    }
  }, "\u201D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 14px",
      fontFamily: "var(--font-serif)",
      fontSize: 17,
      lineHeight: 1.95,
      color: "var(--text)",
      paddingRight: 26
    }
  }, c.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SourceTag, {
    lv: c.lv
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--gold-2)",
      fontFamily: "var(--font-serif)"
    }
  }, c.src)), c.note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "11px 0 0",
      fontSize: 12.5,
      color: "var(--text-3)",
      lineHeight: 1.65
    }
  }, "\u91CA\u4E49 \xB7 ", c.note));
}
function PersonDossier({
  person,
  nav
}) {
  const d = person.detail || {};
  const tabs = [{
    k: "overview",
    t: "综述"
  }, d.bio && d.bio.length ? {
    k: "bio",
    t: "生平详述"
  } : null, d.classics && d.classics.length ? {
    k: "classics",
    t: "史料原文",
    n: d.classics.length
  } : null, d.appraisals && d.appraisals.length ? {
    k: "appraisals",
    t: "历代评价",
    n: d.appraisals.length
  } : null, {
    k: "works",
    t: "著作"
  }].filter(Boolean);
  const [tab, setTab] = useState("overview");
  return /*#__PURE__*/React.createElement("section", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      padding: "6px 8px",
      borderBottom: "1px solid var(--line)",
      background: "linear-gradient(180deg,var(--card-2),var(--card))",
      overflowX: "auto"
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    onClick: () => setTab(t.k),
    style: {
      position: "relative",
      padding: "11px 16px",
      fontSize: 14.5,
      fontWeight: tab === t.k ? 700 : 500,
      whiteSpace: "nowrap",
      color: tab === t.k ? "var(--gold-2)" : "var(--text-2)",
      background: "none",
      transition: ".15s"
    }
  }, t.t, t.n ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: "var(--text-3)",
      marginLeft: 5,
      fontFamily: "var(--font-num)"
    }
  }, t.n) : null, tab === t.k && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 14,
      right: 14,
      bottom: -7,
      height: 2.5,
      background: "var(--gold)",
      borderRadius: 2
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px"
    }
  }, tab === "overview" && /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15.5,
      lineHeight: 1.9,
      color: "var(--text)",
      fontFamily: "var(--font-serif)"
    }
  }, person.intro), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "15px 18px",
      borderLeft: "3px solid var(--gold)",
      background: "var(--gold-soft)",
      borderRadius: "0 10px 10px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 16,
      color: "var(--gold-2)",
      lineHeight: 1.7
    }
  }, "\u300C", person.quote, "\u300D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      marginTop: 7
    }
  }, "\u2014\u2014 ", person.quoteSrc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontSize: 15,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zhi",
    size: 16,
    style: {
      color: "var(--gold)"
    }
  }), "\u5173\u952E\u6210\u5C31"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, person.achievements.map((a, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      fontSize: 14,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontFamily: "var(--font-num)",
      fontWeight: 700,
      flex: "none"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)"
    }
  }, a))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 12px",
      fontSize: 15,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "quote",
    size: 16,
    style: {
      color: "var(--gold)"
    }
  }), "\u4E89\u8BAE\u8BC4\u4EF7"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.8,
      color: "var(--text-2)"
    }
  }, person.controversy)))), tab === "bio" && /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, d.bio.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 16,
      paddingBottom: i === d.bio.length - 1 ? 0 : 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--gold)",
      boxShadow: "0 0 8px var(--gold)",
      marginTop: 6
    }
  }), i !== d.bio.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      width: 1.5,
      background: "var(--gold-line)",
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 2
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "0 0 7px",
      fontSize: 16,
      fontWeight: 700,
      fontFamily: "var(--font-serif)",
      color: "var(--gold-2)"
    }
  }, s.h), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.85,
      color: "var(--text-2)"
    }
  }, s.body))))), tab === "classics" && /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      lineHeight: 1.6,
      marginBottom: 2
    }
  }, "\u539F\u6587\u5F15\u81EA\u6B63\u53F2\u3001\u6587\u96C6\u3001\u5BB6\u4E66\u7B49\uFF0C\u5E76\u6807\u6CE8\u53EF\u4FE1\u7B49\u7EA7\u3002"), d.classics.map((c, i) => /*#__PURE__*/React.createElement(ClassicCard, {
    key: i,
    c: c
  }))), tab === "appraisals" && /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, d.appraisals.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "15px 18px",
      borderRadius: 12,
      background: "var(--card-2)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 9,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      fontFamily: "var(--font-serif)"
    }
  }, a.who), /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, a.era), a.src && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      marginLeft: "auto"
    }
  }, a.src)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.85,
      color: "var(--text)",
      fontFamily: "var(--font-serif)"
    }
  }, "\u300C", a.text, "\u300D")))), tab === "works" && /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, (d.worksDetail && d.worksDetail.length ? d.worksDetail : person.works.map(w => ({
    name: w,
    desc: ""
  }))).map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 14,
      alignItems: "flex-start",
      padding: "14px 16px",
      borderRadius: 11,
      background: "var(--card-2)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      flex: "none",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      fontFamily: "var(--font-serif)"
    }
  }, w.name), w.desc && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, w.desc)))))));
}
function PersonPage({
  id,
  nav
}) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const st = useStore();
  const fav = st.isFav(id);
  const [exp, setExp] = useState(false);
  const graphWrapRef = useRef(null);
  useEffect(() => {
    async function load() {
      setLoading(true);
      const p = await DB.loadPerson(id);
      setPerson(p);
      if (p) Store.visit(id, "person");
      setLoading(false);
      window.scrollTo(0, 0);
    }
    load();
  }, [id]);
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      padding: 60
    }
  }, "\u6B63\u5728\u52A0\u8F7D\u4EBA\u7269\u6570\u636E\u2026");
  if (!person) return /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      padding: 60
    }
  }, "\u672A\u627E\u5230\u8BE5\u4EBA\u7269\u3002");
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("home")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("graph", id)
  }, "\u4EBA\u7269"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, person.name))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "26px 28px",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(120deg,var(--card-2),var(--card))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: .5
    }
  }, /*#__PURE__*/React.createElement(Starfield, {
    density: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 22,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: person.name,
    size: 92,
    radius: 18
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 34,
      margin: 0,
      fontWeight: 700
    }
  }, person.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 17,
      color: "var(--gold)"
    }
  }, person.born, "\u2013", person.died), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-2)"
    }
  }, person.alias)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DynTag, {
    id: person.dynasty,
    onClick: () => nav("dynasty", person.dynasty)
  }), person.role.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "tag tag-role"
  }, r)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn " + (fav ? "btn-gold" : "btn-ghost"),
    onClick: () => st.toggleFav(id, "person")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark",
    size: 16,
    style: fav ? {
      fill: "#1a1304"
    } : {}
  }), fav ? "已收藏" : "收藏"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => setExp(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 16
  }), "\u5BFC\u51FA\u7D20\u6750"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: () => nav("ai", null, {
      q: `帮我写一篇关于${person.name}的公众号文章选题与大纲`
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16
  }), "AI \u5199\u4F5C"))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: "grid",
      gridTemplateColumns: "288px 1fr 300px",
      gap: 20,
      marginTop: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u57FA\u7840\u4FE1\u606F",
    icon: "person"
  }, /*#__PURE__*/React.createElement(InfoRow, {
    k: "\u5B57\u53F7",
    v: person.alias
  }), /*#__PURE__*/React.createElement(InfoRow, {
    k: "\u751F\u5352",
    v: `${person.born} – ${person.died}（享年 ${person.died - person.born}）`
  }), /*#__PURE__*/React.createElement(InfoRow, {
    k: "\u671D\u4EE3",
    v: (DB.dynastyInfo[person.dynasty] ? DB.dynastyInfo[person.dynasty].full : person.dynasty) || "\u672A\u77E5"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    k: "\u8EAB\u4EFD",
    v: person.role.join("、")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      padding: "12px 0 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 58,
      flex: "none",
      fontSize: 13,
      color: "var(--text-3)"
    }
  }, "\u8457\u4F5C"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, person.works.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "chip",
    style: {
      fontFamily: "var(--font-serif)"
    }
  }, w))))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u751F\u5E73\u5E74\u8868",
    icon: "clock",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, person.life.length, " \u4E2A\u8282\u70B9")
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-line"
  }, person.life.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tl-item" + (l.key ? " key" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tl-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tl-yr"
  }, l.y), /*#__PURE__*/React.createElement("div", {
    className: "tl-txt"
  }, l.t), /*#__PURE__*/React.createElement("div", {
    className: "tl-sub"
  }, l.s))))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u76F8\u5173\u5730\u70B9",
    icon: "location",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, DB.getPersonLocations(id).length, " \u5904")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, DB.getPersonLocations(id).map((loc, i) => {
    const marker = (DB.mapData && DB.mapData.markers) ? Object.values(DB.mapData.markers).find(m => m.loc === loc.id) : null;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "card card-hover",
      style: {
        padding: 12,
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        gap: 11
      },
      onClick: () => nav("map")
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--blue)",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "location",
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        fontFamily: "var(--font-serif)",
        display: "block"
      }
    }, loc.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: "var(--text-2)",
        lineHeight: 1.5
      }
    }, loc.desc)), marker && /*#__PURE__*/React.createElement("span", {
      className: "tag tag-role"
    }, "\u5730\u56FE"));
  }), DB.getPersonLocations(id).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, "\u6682\u65E0\u5730\u70B9\u5173\u8054\u3002")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(PersonDossier, {
    person: person,
    nav: nav
  }), /*#__PURE__*/React.createElement(Panel, {
    title: "\u4EBA\u7269\u5173\u7CFB\u56FE\u8C31",
    icon: "network",
    right: /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: () => nav("graph", id)
    }, "\u5168\u5C4F\u63A2\u7D22 ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 13
    }))
  }, /*#__PURE__*/React.createElement("div", {
    ref: graphWrapRef
  }, /*#__PURE__*/React.createElement(KnowledgeGraph, {
    centerId: id,
    height: 420,
    onNav: nav
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u53C2\u4E0E\u4E8B\u4EF6",
    icon: "event",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, person.events.length, " \u9879")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 13
    }
  }, person.events.map(ev => /*#__PURE__*/React.createElement(EventCard, {
    key: ev,
    id: ev,
    nav: nav,
    compact: true
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      position: "sticky",
      top: 76
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u5173\u7CFB\u6458\u8981",
    icon: "network"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, person.relations.map((r, i) => {
    const t = DB.get(r.to);
    const m = DB.relMeta[r.type] || {};
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => nav(t.type === "event" ? "event" : "person", r.to),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "10px 10px",
        borderRadius: 10,
        textAlign: "left",
        transition: ".15s"
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--card-2)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: m.color,
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        display: "block"
      }
    }, t ? t.name : r.to), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, m.label || r.label)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevR",
      size: 15,
      style: {
        color: "var(--text-3)"
      }
    }));
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u76F8\u4F3C\u4EBA\u7269",
    icon: "person",
    right: /*#__PURE__*/React.createElement("span", {
      className: "tag tag-role"
    }, "AI \u63A8\u8350")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, DB.getSimilarPersons(id, 4).map(({
    person,
    reasons
  }) => /*#__PURE__*/React.createElement("button", {
    key: person.id,
    onClick: () => nav("person", person.id),
    style: {
      display: "flex",
      gap: 11,
      alignItems: "center",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: person.name,
    size: 38,
    radius: 10
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      display: "block"
    }
  }, person.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)"
    }
  }, reasons.slice(0, 2).join(" · "))))), DB.getSimilarPersons(id, 4).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, "\u6682\u65E0\u8DB3\u591F\u6570\u636E\u751F\u6210\u76F8\u4F3C\u63A8\u8350\u3002"))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u53F2\u6599\u6765\u6E90",
    icon: "book"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, person.sources.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(SourceTag, {
    lv: s.lv
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      fontFamily: "var(--font-serif)"
    }
  }, s.t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 13,
      borderTop: "1px solid var(--line)",
      fontSize: 11.5,
      color: "var(--text-3)",
      lineHeight: 1.6
    }
  }, "\u6BCF\u6761\u53F2\u5B9E\u7ED1\u5B9A\u6765\u6E90\u4E0E\u53EF\u4FE1\u7B49\u7EA7\u3002", /*#__PURE__*/React.createElement("br", null), "A \u539F\u59CB\u53F2\u6599 \xB7 B \u6743\u5A01\u6574\u7406 \xB7 C \u901A\u4FD7\u8D44\u6599 \xB7 D \u5F85\u6821\u9A8C")))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50
    }
  }), exp && /*#__PURE__*/React.createElement(ExportModal, {
    entity: person,
    onClose: () => setExp(false),
    graphWrapRef: graphWrapRef
  }));
}
Object.assign(window, {
  PersonPage,
  Panel,
  ExportModal,
  InfoRow
});