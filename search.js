/* ============ 历史星图 · 搜索结果页 ============ */

function buildSearchIndex(q) {
  const ql = (q || "").trim().toLowerCase();
  const isYear = /^-?\d{3,4}$/.test(ql);
  const y = isYear ? parseInt(ql, 10) : null;
  const hit = (...parts) => {
    if (!ql) return true;
    if (parts.join(" ").toLowerCase().includes(ql)) return true;
    return false;
  };
  const persons = Object.values(DB.persons).filter(p => hit(p.name, p.alias, p.short, p.intro, Array.isArray(p.role) ? p.role.join("") : (p.role || "")) || isYear && y >= p.born && y <= p.died);
  const events = Object.values(DB.events).filter(e => hit(e.name, e.short, e.place, e.bg) || isYear && y >= e.start && y <= e.end);
  const dynasties = Object.values(DB.dynastyInfo).filter(d => hit(d.name, d.full, d.en, d.summary) || isYear && new RegExp("\\d{3,4}").test(d.span));
  const locations = Object.values(DB.locations).filter(l => hit(l.name, l.desc));
  // 来源聚合
  const srcMap = {};
  [...persons, ...events].forEach(ent => {
    (ent.sources || []).forEach(s => {
      const k = s.t + s.lv;
      if (!srcMap[k]) srcMap[k] = {
        t: s.t,
        lv: s.lv,
        refs: []
      };
      srcMap[k].refs.push({
        id: ent.id,
        name: ent.name,
        type: ent.type
      });
    });
  });
  const sources = Object.values(srcMap);
  return {
    persons,
    events,
    dynasties,
    locations,
    sources,
    isYear,
    y
  };
}
function SrcRow({
  s,
  nav
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(SourceTag, {
    lv: s.lv,
    full: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontFamily: "var(--font-serif)",
      flex: 1
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      flexWrap: "wrap"
    }
  }, s.refs.map((r, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "chip",
    onClick: () => nav(r.type === "event" ? "event" : "person", r.id)
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: r.type,
    size: 11
  }), r.name))));
}
function DynResultCard({
  d,
  nav
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "card card-hover",
    style: {
      padding: 18,
      textAlign: "left",
      display: "flex",
      flexDirection: "column",
      gap: 9
    },
    onClick: () => nav("dynasty", d.id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 9,
      background: "var(--gold-soft)",
      border: "1px solid var(--gold-line)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--gold)",
      flex: "none"
    }
  }, d.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, d.full), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 12.5,
      color: "var(--gold)"
    }
  }, d.span))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.6,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, d.summary));
}
function LocResultRow({
  l,
  nav
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "card card-hover",
    style: {
      padding: "13px 16px",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 12
    },
    onClick: () => nav("map")
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "location",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      display: "block"
    }
  }, l.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-2)"
    }
  }, l.desc)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, "\u5730\u56FE", /*#__PURE__*/React.createElement(Icon, {
    name: "chevR",
    size: 13
  })));
}
function ResultBlock({
  label,
  count,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlabel"
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-3)",
      fontWeight: 400,
      fontFamily: "var(--font-num)"
    }
  }, count)), children);
}
function SearchPage({
  query,
  dynasty,
  nav
}) {
  const [q, setQ] = useState(query || "");
  const [cat, setCat] = useState("all");
  const [apiData, setApiData] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  useEffect(() => {
    setQ(query || "");
    setCat("all");
    setApiData(null);
    window.scrollTo(0, 0);
  }, [query]);

  // API search
  useEffect(() => {
    if (!q.trim() || !window.API) {
      setApiData(null);
      return;
    }
    setApiLoading(true);
    const timer = setTimeout(() => {
      window.API.search(q.trim()).then(data => {
        setApiData(data);
        setApiLoading(false);
      }).catch(() => {
        setApiData(null);
        setApiLoading(false);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);
  const R = React.useMemo(() => {
    let persons, events, dynasties, locations, sources, isYear, y;
    if (apiData) {
      persons = apiData.persons || [];
      events = apiData.events || [];
      dynasties = apiData.dynasties || [];
      locations = [];
      sources = [];
      isYear = apiData.isYear || false;
      y = apiData.y || null;
    } else {
      const res = buildSearchIndex(q);
      persons = res.persons;
      events = res.events;
      dynasties = res.dynasties;
      locations = res.locations;
      sources = res.sources;
      isYear = res.isYear;
      y = res.y;
    }
    // Apply dynasty filter if provided
    if (dynasty) {
      persons = persons.filter(p => p.dynasty === dynasty);
      events = events.filter(e => e.dynasty === dynasty);
    }
    return {
      persons,
      events,
      dynasties,
      locations,
      sources,
      isYear,
      y
    };
  }, [q, apiData, dynasty]);
  const total = R.persons.length + R.events.length + R.dynasties.length + R.locations.length;
  const cats = [{
    k: "all",
    t: "综合",
    n: total
  }, {
    k: "person",
    t: "人物",
    n: R.persons.length
  }, {
    k: "event",
    t: "事件",
    n: R.events.length
  }, {
    k: "dynasty",
    t: "朝代",
    n: R.dynasties.length
  }, {
    k: "location",
    t: "地点",
    n: R.locations.length
  }, {
    k: "source",
    t: "来源",
    n: R.sources.length
  }];
  const PersonGrid = ({
    list
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, list.map(p => /*#__PURE__*/React.createElement(PersonCard, {
    key: p.id,
    id: p.id,
    nav: nav
  })));
  const EventGrid = ({
    list
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, list.map(e => /*#__PURE__*/React.createElement(EventCard, {
    key: e.id,
    id: e.id,
    nav: nav
  })));
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up wrap-wide",
    style: {
      padding: "18px 28px 56px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb",
    style: {
      padding: "4px 0 14px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("home")
  }, "\u9996\u9875"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, "\u641C\u7D22")), /*#__PURE__*/React.createElement(SearchBox, {
    nav: nav,
    initial: q,
    onSubmit: v => setQ(v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      margin: "20px 0 4px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--text-2)"
    }
  }, "\u5173\u4E8E ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      fontWeight: 700,
      fontFamily: "var(--font-serif)"
    }
  }, "\u201C", q, "\u201D"), " \u627E\u5230 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)",
      fontWeight: 700
    }
  }, total), " \u6761\u7ED3\u679C"), apiLoading && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--gold)"
    }
  }, "\u641C\u7D22\u4E2D\u2026"), apiData && /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, "API \u6570\u636E"), R.isYear && /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 12
  }), "\xA0\u5E74\u4EFD\u68C0\u7D22 \xB7 ", R.y, " \u5E74")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "230px 1fr",
      gap: 24,
      marginTop: 20,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 76,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dlabel",
    style: {
      margin: "0 0 6px",
      fontSize: 12
    }
  }, "\u5206\u7C7B"), cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.k,
    onClick: () => setCat(c.k),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 13px",
      borderRadius: 10,
      textAlign: "left",
      transition: ".15s",
      background: cat === c.k ? "var(--gold-soft)" : "transparent",
      color: cat === c.k ? "var(--gold)" : "var(--text-2)",
      border: "1px solid " + (cat === c.k ? "var(--gold-line)" : "transparent"),
      fontWeight: cat === c.k ? 700 : 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, c.t), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 12.5,
      fontFamily: "var(--font-num)",
      color: cat === c.k ? "var(--gold)" : "var(--text-3)"
    }
  }, c.n))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 14,
      marginTop: 14,
      background: "linear-gradient(160deg,var(--card-2),var(--card))",
      border: "1px solid var(--gold-line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8,
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700
    }
  }, "\u8BA9 AI \u5E2E\u4F60\u627E")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-2)",
      lineHeight: 1.6,
      marginBottom: 11
    }
  }, "\u6CA1\u6709\u5408\u9002\u7ED3\u679C\uFF1F\u8BA9 AI \u57FA\u4E8E\u7AD9\u5185\u53F2\u6599\u4E3A\u4F60\u68B3\u7406\u9009\u9898\u3002"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold btn-sm",
    style: {
      width: "100%"
    },
    onClick: () => nav("ai", null, {
      q
    })
  }, "\u7528 AI \u68C0\u7D22 \u201C", q, "\u201D"))), /*#__PURE__*/React.createElement("div", null, total === 0 && cat !== "source" ? /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "46px 24px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-3)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 32
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "\u672A\u627E\u5230\u4E0E \u201C", q, "\u201D \u76F8\u5173\u7684\u7ED3\u679C"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      margin: "0 auto 18px",
      maxWidth: 380,
      lineHeight: 1.7
    }
  }, "\u8BD5\u8BD5\u4EBA\u7269\u540D\uFF08\u66FE\u56FD\u85E9\uFF09\u3001\u4E8B\u4EF6\uFF08\u592A\u5E73\u5929\u56FD\uFF09\u3001\u5E74\u4EFD\uFF081864\uFF09\uFF0C\u6216\u4EA4\u7ED9 AI \u52A9\u624B\u3002"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: () => nav("ai", null, {
      q
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 15
  }), "\u95EE AI \u5386\u53F2\u52A9\u624B")) : /*#__PURE__*/React.createElement(React.Fragment, null, cat === "all" && /*#__PURE__*/React.createElement(React.Fragment, null, R.persons.length > 0 && /*#__PURE__*/React.createElement(ResultBlock, {
    label: "\u4EBA\u7269",
    count: `${R.persons.length} 条`
  }, /*#__PURE__*/React.createElement(PersonGrid, {
    list: R.persons
  })), R.events.length > 0 && /*#__PURE__*/React.createElement(ResultBlock, {
    label: "\u4E8B\u4EF6",
    count: `${R.events.length} 条`
  }, /*#__PURE__*/React.createElement(EventGrid, {
    list: R.events
  })), R.dynasties.length > 0 && /*#__PURE__*/React.createElement(ResultBlock, {
    label: "\u671D\u4EE3",
    count: `${R.dynasties.length} 条`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, R.dynasties.map(d => /*#__PURE__*/React.createElement(DynResultCard, {
    key: d.id,
    d: d,
    nav: nav
  })))), R.locations.length > 0 && /*#__PURE__*/React.createElement(ResultBlock, {
    label: "\u5730\u70B9",
    count: `${R.locations.length} 条`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, R.locations.map(l => /*#__PURE__*/React.createElement(LocResultRow, {
    key: l.id,
    l: l,
    nav: nav
  }))))), cat === "person" && (R.persons.length ? /*#__PURE__*/React.createElement(PersonGrid, {
    list: R.persons
  }) : /*#__PURE__*/React.createElement(EmptyCat, null)), cat === "event" && (R.events.length ? /*#__PURE__*/React.createElement(EventGrid, {
    list: R.events
  }) : /*#__PURE__*/React.createElement(EmptyCat, null)), cat === "dynasty" && (R.dynasties.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, R.dynasties.map(d => /*#__PURE__*/React.createElement(DynResultCard, {
    key: d.id,
    d: d,
    nav: nav
  }))) : /*#__PURE__*/React.createElement(EmptyCat, null)), cat === "location" && (R.locations.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, R.locations.map(l => /*#__PURE__*/React.createElement(LocResultRow, {
    key: l.id,
    l: l,
    nav: nav
  }))) : /*#__PURE__*/React.createElement(EmptyCat, null)), cat === "source" && (R.sources.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      marginBottom: 2
    }
  }, "\u547D\u4E2D\u7ED3\u679C\u7ED1\u5B9A\u7684 ", R.sources.length, " \u6761\u53F2\u6599\u6765\u6E90 \xB7 \u6BCF\u6761\u5747\u6807\u6CE8\u53EF\u4FE1\u7B49\u7EA7"), R.sources.map((s, i) => /*#__PURE__*/React.createElement(SrcRow, {
    key: i,
    s: s,
    nav: nav
  }))) : /*#__PURE__*/React.createElement(EmptyCat, null))))));
}
function EmptyCat() {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "36px 20px",
      textAlign: "center",
      color: "var(--text-2)",
      fontSize: 14
    }
  }, "\u8BE5\u5206\u7C7B\u4E0B\u6682\u65E0\u5339\u914D\u7ED3\u679C\u3002");
}
Object.assign(window, {
  SearchPage
});