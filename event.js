/* ============ 历史星图 · 事件详情页 ============ */

function EventChain({
  chain,
  nav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 0,
      overflowX: "auto",
      paddingBottom: 6
    }
  }, chain.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => c.to && nav("event", c.to),
    disabled: !c.to && !c.cur,
    style: {
      flex: "none",
      width: 158,
      padding: "14px 14px",
      borderRadius: 12,
      textAlign: "left",
      cursor: c.to ? "pointer" : "default",
      background: c.cur ? "var(--gold-soft)" : "var(--card)",
      border: "1px solid " + (c.cur ? "var(--gold-line)" : "var(--line)"),
      transition: ".15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 12.5,
      color: c.cur ? "var(--gold)" : "var(--blue)",
      fontWeight: 700
    }
  }, c.y), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      margin: "5px 0 6px",
      fontFamily: "var(--font-serif)",
      color: c.cur ? "var(--gold-2)" : "var(--text)"
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-3)"
    }
  }, c.note)), i < chain.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      padding: "0 6px",
      color: "var(--text-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 18
  })))));
}
function MapPlaceholder({
  place
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 170,
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid var(--line)",
      background: "repeating-linear-gradient(135deg,rgba(74,144,226,.06) 0 10px,transparent 10px 20px),var(--bg-3)"
    }
  }, /*#__PURE__*/React.createElement(Starfield, {
    density: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--blue)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "location",
    size: 30
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "monospace",
      fontSize: 11,
      color: "var(--text-3)",
      letterSpacing: .5
    }
  }, "[ \u5386\u53F2\u5730\u56FE \xB7 V2 ]"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-2)"
    }
  }, place)));
}
function EventPage({
  id,
  nav
}) {
  const e = DB.events[id];
  const [tab, setTab] = useState("bg");
  const st = useStore();
  const fav = st.isFav(id);
  const [exp, setExp] = useState(false);
  const graphWrapRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTab("bg");
    if (DB.events[id]) Store.visit(id, "event");
  }, [id]);
  if (!e) return /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      padding: 60
    }
  }, "\u672A\u627E\u5230\u8BE5\u4E8B\u4EF6\u3002");
  const tabs = [{
    k: "bg",
    t: "背景摘要",
    v: e.bg
  }, {
    k: "process",
    t: "事件经过",
    v: e.process
  }, {
    k: "result",
    t: "结果影响",
    v: e.result
  }, {
    k: "controversy",
    t: "争议观点",
    v: e.controversy
  }];
  const cur = tabs.find(t => t.k === tab);
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
    onClick: () => nav("timeline")
  }, "\u4E8B\u4EF6"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, e.name))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "24px 28px",
      borderLeft: "4px solid var(--gold)",
      background: "linear-gradient(120deg,var(--card-2),var(--card))"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "event",
    size: 16
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 32,
      margin: 0,
      fontWeight: 700
    }
  }, e.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 17,
      color: "var(--gold)"
    }
  }, e.start, "\u2013", e.end), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn " + (fav ? "btn-gold" : "btn-ghost"),
    onClick: () => st.toggleFav(id, "event")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark",
    size: 16
  }), fav ? "已收藏" : "收藏"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => setExp(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 16
  }), "\u5BFC\u51FA"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: () => nav("ai", null, {
      q: `帮我写一篇关于「${e.name}」的短视频讲解脚本`
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16
  }), "AI \u811A\u672C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 14,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(DynTag, {
    id: e.dynasty,
    onClick: () => nav("dynasty", e.dynasty)
  }), /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "location",
    size: 13
  }), "\xA0", e.place), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      marginLeft: 6
    }
  }, e.short)))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u4E8B\u4EF6\u94FE \xB7 \u56E0\u679C\u8109\u7EDC",
    icon: "arrow",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, "\u70B9\u51FB\u524D\u540E\u4E8B\u4EF6\u8DF3\u8F6C")
  }, /*#__PURE__*/React.createElement(EventChain, {
    chain: e.chain,
    nav: nav
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
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
  }, /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("div", {
    className: "seg-ctl",
    style: {
      marginBottom: 18
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    className: tab === t.k ? "on" : "",
    onClick: () => setTab(t.k)
  }, t.t))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15.5,
      lineHeight: 1.95,
      color: "var(--text)",
      fontFamily: "var(--font-serif)",
      minHeight: 120
    }
  }, cur.v)), /*#__PURE__*/React.createElement(Panel, {
    title: "\u5173\u8054\u4EBA\u7269\u5173\u7CFB\u56FE\u8C31",
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
    height: 400,
    onNav: nav
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      position: "sticky",
      top: 76
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u53C2\u4E0E\u4EBA\u7269",
    icon: "person",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, e.persons.length, " \u4EBA")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, e.persons.map(pid => {
    const p = DB.persons[pid];
    return /*#__PURE__*/React.createElement("button", {
      key: pid,
      onClick: () => nav("person", pid),
      style: {
        display: "flex",
        gap: 11,
        alignItems: "center",
        padding: "8px",
        borderRadius: 10,
        textAlign: "left",
        transition: ".15s"
      },
      onMouseEnter: ev => ev.currentTarget.style.background = "var(--card-2)",
      onMouseLeave: ev => ev.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: 38,
      radius: 10
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
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, p.role[0])), /*#__PURE__*/React.createElement(Icon, {
      name: "chevR",
      size: 15,
      style: {
        color: "var(--text-3)"
      }
    }));
  }))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u53D1\u751F\u5730\u70B9",
    icon: "location"
  }, /*#__PURE__*/React.createElement(MapPlaceholder, {
    place: e.place
  })), /*#__PURE__*/React.createElement(Panel, {
    title: "\u53F2\u6599\u6765\u6E90",
    icon: "book"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11
    }
  }, e.sources.map((s, i) => /*#__PURE__*/React.createElement("div", {
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
  }, s.t))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50
    }
  }), exp && /*#__PURE__*/React.createElement(ExportModal, {
    entity: e,
    onClose: () => setExp(false),
    graphWrapRef: graphWrapRef
  }));
}
Object.assign(window, {
  EventPage
});