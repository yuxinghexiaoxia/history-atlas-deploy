/* ============ 历史星图 · 首页（3 方案） ============ */

/* ---- reusable search box with suggestions ---- */
function SearchBox({
  nav,
  big,
  autoFocus,
  initial = "",
  onSubmit
}) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    setQ(initial);
  }, [initial]);
  const pool = React.useMemo(() => {
    const arr = [];
    Object.values(DB.persons).forEach(p => arr.push({
      id: p.id,
      kind: "person",
      name: p.name,
      alias: p.alias,
      meta: `${p.born}–${p.died} · ${p.role[0]}`
    }));
    Object.values(DB.events).forEach(e => arr.push({
      id: e.id,
      kind: "event",
      name: e.name,
      alias: "",
      meta: `${e.start}–${e.end} · ${e.place}`
    }));
    return arr;
  }, []);
  const res = q.trim() ? pool.filter(x => (x.name + x.alias).toLowerCase().includes(q.trim().toLowerCase())).slice(0, 6) : [];
  function go(r) {
    if (!r) return;
    setOpen(false);
    setQ("");
    nav(r.kind === "event" ? "event" : "person", r.id);
  }
  function submit() {
    const v = q.trim();
    if (!v) return;
    setOpen(false);
    if (onSubmit) onSubmit(v);else nav("search", null, {
      q: v
    });
  }
  function onKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
      return;
    }
    if (!open || !res.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel(s => (s + 1) % res.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel(s => (s - 1 + res.length) % res.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const examples = ["曾国藩", "太平天国运动", "1864", "李鸿章与左宗棠"];
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      height: big ? 60 : 46,
      padding: big ? "0 8px 0 22px" : "0 6px 0 16px",
      background: "var(--card)",
      border: "1px solid " + (open ? "var(--gold-line)" : "var(--line-2)"),
      borderRadius: big ? 16 : 12,
      boxShadow: big ? "var(--shadow)" : "none",
      transition: ".15s"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: big ? 22 : 18,
    style: {
      color: "var(--gold)",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    autoFocus: autoFocus,
    onChange: e => {
      setQ(e.target.value);
      setOpen(true);
      setSel(0);
    },
    onFocus: () => setOpen(true),
    onKeyDown: onKey,
    placeholder: big ? "搜索人物 / 事件 / 朝代 / 年份…  例如：曾国藩" : "搜索人物、事件、年份…",
    style: {
      flex: 1,
      background: "none",
      border: "none",
      outline: "none",
      color: "var(--text)",
      fontSize: big ? 17 : 15
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    style: {
      height: big ? 44 : 34,
      padding: big ? "0 22px" : "0 14px"
    },
    onClick: submit
  }, "\u641C\u7D22")), big && !open && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginTop: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-3)"
    }
  }, "\u8BD5\u8BD5\uFF1A"), examples.map((ex, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip",
    onClick: () => {
      setQ(ex);
      setOpen(true);
    }
  }, ex))), open && res.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      left: 0,
      right: 0,
      zIndex: 50,
      padding: 7,
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--gold-line)"
    }
  }, res.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.kind + r.id,
    onMouseEnter: () => setSel(i),
    onClick: () => go(r),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      borderRadius: 10,
      cursor: "pointer",
      background: i === sel ? "var(--gold-soft)" : "transparent"
    }
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: r.kind,
    size: 13
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600
    }
  }, r.name, r.alias && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      fontWeight: 400,
      marginLeft: 8
    }
  }, r.alias)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-2)",
      fontFamily: "var(--font-num)"
    }
  }, r.meta)), /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, r.kind === "person" ? "人物" : "事件"))), /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    style: {
      width: "100%",
      padding: "9px 12px",
      fontSize: 12.5,
      color: "var(--gold)",
      borderTop: "1px solid var(--line)",
      marginTop: 4,
      display: "flex",
      alignItems: "center",
      gap: 8,
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 13
  }), "\u67E5\u770B \u201C", q.trim(), "\u201D \u7684\u5168\u90E8\u7ED3\u679C", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--text-3)"
    }
  }, "\u21B5"))));
}

/* ---- dynasty band ---- */
function DynastyBand({
  onPick,
  current = "qing"
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dlabel"
  }, "\u671D\u4EE3\u65F6\u95F4\u957F\u6CB3 \xB7 \u70B9\u51FB\u8FDB\u5165\u671D\u4EE3\u8BE6\u60C5"), /*#__PURE__*/React.createElement("div", {
    className: "dynband"
  }, DB.dynasties.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    className: "seg" + (d.id === current ? " on" : ""),
    onClick: () => onPick && onPick(d.id)
  }, d.name, /*#__PURE__*/React.createElement("span", {
    className: "yr"
  }, d.yr)))));
}

/* ---- quick entries ---- */
function QuickEntries({
  nav
}) {
  const items = [{
    ic: "clock",
    t: "时间线",
    s: "按年/朝代浏览",
    go: () => nav("timeline")
  }, {
    ic: "network",
    t: "人物关系",
    s: "图谱探索",
    go: () => nav("graph", "li_shimin")
  }, {
    ic: "event",
    t: "事件链",
    s: "因果脉络",
    go: () => nav("event", "taiping")
  }, {
    ic: "sparkle",
    t: "公众号素材",
    s: "AI 选题创作",
    go: () => nav("ai")
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 13
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "card card-hover",
    style: {
      padding: "16px 18px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 13
    },
    onClick: it.go
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 11,
      background: "var(--gold-soft)",
      color: "var(--gold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.ic,
    size: 20
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 15,
      fontWeight: 700
    }
  }, it.t), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: 12.5,
      color: "var(--text-2)"
    }
  }, it.s)))));
}

/* ---- AI prompt mini ---- */
function TodayHistory({
  nav
}) {
  const items = React.useMemo(() => DB.getTodayHistory(), []);
  function go(it) {
    if (it.ev) nav("event", it.ev);else if (it.pr) nav("person", it.pr);
  }
  const today = new Date();
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), "\u4ECA\u65E5\u5386\u53F2 \xB7 ", dateStr), /*#__PURE__*/React.createElement("a", {
    className: "more",
    onClick: () => nav("timeline")
  }, "\u65F6\u95F4\u7EBF \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14
    }
  }, items.map((it, i) => {
    const color = it.key ? "var(--gold)" : it.type === "war" ? "var(--src-d)" : "var(--blue)";
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      className: "card card-hover",
      style: {
        padding: 16,
        textAlign: "left"
      },
      onClick: () => go(it)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: color,
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-num)",
        fontSize: 18,
        fontWeight: 700,
        color: color
      }
    }, it.y), /*#__PURE__*/React.createElement("span", {
      className: "tag tag-role"
    }, {
      event: "事件",
      war: "战争",
      person: "人物"
    }[it.type])), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15.5,
        fontWeight: 700,
        fontFamily: "var(--font-serif)",
        marginBottom: 6
      }
    }, it.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-2)",
        lineHeight: 1.6
      }
    }, it.s));
  })));
}
function AIPromptCard({
  nav
}) {
  const [v, setV] = useState("");
  const tips = ["李鸿章相关的争议有哪些？", "1864 年发生了哪些大事？", "和曾国藩类似的人有谁？"];
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 20,
      background: "linear-gradient(160deg,var(--card-2),var(--card))",
      border: "1px solid var(--gold-line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 9,
      marginBottom: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 20
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700
    }
  }, "AI \u5386\u53F2\u52A9\u624B"), /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role",
    style: {
      marginLeft: "auto"
    }
  }, "\u5F15\u7528\u7AD9\u5185\u53F2\u6599")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: v,
    onChange: e => setV(e.target.value),
    placeholder: "\u95EE\u70B9\u4EC0\u4E48\uFF0C\u6216\u8BA9 AI \u5E2E\u4F60\u627E\u9009\u9898\u2026",
    onKeyDown: e => {
      if (e.key === "Enter") nav("ai", null, {
        q: v || tips[0]
      });
    },
    style: {
      flex: 1,
      height: 42,
      padding: "0 14px",
      background: "var(--bg)",
      border: "1px solid var(--line-2)",
      borderRadius: 10,
      color: "var(--text)",
      fontSize: 14,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    style: {
      height: 42
    },
    onClick: () => nav("ai", null, {
      q: v || tips[0]
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    size: 15
  }), "\u63D0\u95EE")), /*#__PURE__*/React.createElement("div", {
    className: "chips",
    style: {
      marginTop: 12
    }
  }, tips.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip",
    onClick: () => nav("ai", null, {
      q: t
    })
  }, t))));
}

/* ====================== 首页 · 星图沉浸 ====================== */
function Home({
  nav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up"
  }, /*#__PURE__*/React.createElement(StarmapHero, {
    nav: nav
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 44,
      padding: "52px 28px 64px"
    }
  }, /*#__PURE__*/React.createElement(DynastyBand, {
    onPick: id => nav("dynasty", id)
  }), /*#__PURE__*/React.createElement(QuickEntries, {
    nav: nav
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "person",
    size: 13
  }), "\u70ED\u95E8\u4EBA\u7269"), /*#__PURE__*/React.createElement("a", {
    className: "more",
    onClick: () => nav("graph", "li_shimin")
  }, "\u67E5\u770B\u5173\u7CFB\u56FE\u8C31 \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 14
    }
  }, DB.hotPersons.slice(0, 3).map(id => /*#__PURE__*/React.createElement(PersonCard, {
    key: id,
    id: id,
    nav: nav
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "event",
    size: 12
  }), "\u70ED\u95E8\u4E8B\u4EF6"), /*#__PURE__*/React.createElement("a", {
    className: "more",
    onClick: () => nav("timeline")
  }, "\u65F6\u95F4\u7EBF \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, DB.hotEvents.slice(0, 2).map(id => /*#__PURE__*/React.createElement(EventCard, {
    key: id,
    id: id,
    nav: nav,
    compact: true
  })))), /*#__PURE__*/React.createElement(TodayHistory, {
    nav: nav
  }), /*#__PURE__*/React.createElement(AIPromptCard, {
    nav: nav
  })));
}
Object.assign(window, {
  Home,
  SearchBox,
  DynastyBand,
  TodayHistory
});