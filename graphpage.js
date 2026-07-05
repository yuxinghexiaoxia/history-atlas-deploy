/* ============ 历史星图 · 关系图谱页（星座沉浸版） ============ */
function GraphPage({
  id,
  nav
}) {
  const [center, setCenter] = useState(id || "li_shimin");
  const [selected, setSelected] = useState(id || "li_shimin");
  const [depth, setDepth] = useState(1);
  const [relFilter, setRelFilter] = useState(null);
  const [layoutKey, setLayoutKey] = useState(0);
  const graphCvsRef = useRef(null);
  useEffect(() => {
    if (id) {
      setCenter(id);
      setSelected(id);
    }
    window.scrollTo(0, 0);
  }, [id]);
  const recenter = cid => {
    setCenter(cid);
    setSelected(cid);
  };
  const node = DB.get(selected) || DB.get(center);
  const isCenter = selected === center;
  const personIds = Object.keys(DB.persons),
    eventIds = Object.keys(DB.events);
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up wrap-wide",
    style: {
      padding: "18px 28px 30px"
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
  }, "\u5173\u7CFB\u56FE\u8C31")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      marginBottom: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 8
    }
  }, "RELATIONSHIP CONSTELLATION"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 27,
      margin: 0,
      fontWeight: 700
    }
  }, "\u5173\u7CFB\u661F\u56FE")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      marginBottom: 3
    }
  }, "\u4EE5 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, DB.get(center).name), " \u4E3A\u4E2D\u5FC3 \xB7 \u53CC\u51FB\u4EFB\u610F\u661F\u70B9\u91CD\u7EC4\u661F\u56FE \xB7 \u62D6\u62FD\u6F2B\u6E38"), /*#__PURE__*/React.createElement("div", {
    className: "seg-ctl",
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: depth === 1 ? "on" : "",
    onClick: () => setDepth(1)
  }, "\u4E00\u5C42\u5173\u7CFB"), /*#__PURE__*/React.createElement("button", {
    className: depth === 2 ? "on" : "",
    onClick: () => setDepth(2)
  }, "\u4E8C\u5C42\u5C55\u5F00"), /*#__PURE__*/React.createElement("button", {
    className: depth === 3 ? "on" : "",
    onClick: () => setDepth(3)
  }, "\u4E09\u5C42\u5C55\u5F00")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => setLayoutKey(k => k + 1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 14
  }), "\u91CD\u65B0\u5E03\u5C40"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => {
      const cvs = graphCvsRef.current;
      if (!cvs) return;
      downloadCanvas(cvs, `${(DB.get(center) || {}).name || "关系图谱"}_关系星图.png`);
      recordExport({
        id: center,
        type: "graph",
        name: (DB.get(center) || {}).name || "关系图谱"
      }, "图谱 PNG");
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 14
  }), "\u5BFC\u51FA PNG")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 332px",
      gap: 20,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "calc(100vh - 200px)",
      minHeight: 560,
      borderRadius: 18,
      overflow: "hidden",
      border: "1px solid var(--gold-line)",
      boxShadow: "var(--shadow)"
    }
  }, /*#__PURE__*/React.createElement(ConstellationGraph, {
    centerId: center,
    depth: depth,
    relFilter: relFilter,
    selectedId: selected,
    onSelect: sid => setSelected(sid || center),
    onRecenter: recenter,
    layoutKey: layoutKey,
    canvasRef: graphCvsRef
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      top: 14,
      display: "flex",
      flexDirection: "column",
      gap: 6,
      background: "rgba(8,12,24,.55)",
      backdropFilter: "blur(8px)",
      border: "1px solid var(--line)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-3)",
      letterSpacing: 1,
      marginBottom: 2
    }
  }, "\u5173\u7CFB\u7B5B\u9009"), Object.entries(GROUP_META).map(([k, m]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => setRelFilter(relFilter === k ? null : k),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontSize: 12.5,
      color: relFilter && relFilter !== k ? "var(--text-3)" : "var(--text)",
      opacity: relFilter && relFilter !== k ? .5 : 1,
      transition: ".15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 0,
      borderTop: "3px solid " + m.color,
      borderTopStyle: m.dash ? "dashed" : "solid",
      flex: "none",
      borderRadius: 2
    }
  }), m.label)), relFilter && /*#__PURE__*/React.createElement("button", {
    onClick: () => setRelFilter(null),
    style: {
      fontSize: 11.5,
      color: "var(--gold)",
      marginTop: 3,
      textAlign: "left"
    }
  }, "\u6E05\u9664\u7B5B\u9009 \u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 14,
      bottom: 12,
      fontSize: 11.5,
      color: "var(--text-3)",
      display: "flex",
      gap: 14,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u5355\u51FB\u67E5\u770B"), /*#__PURE__*/React.createElement("span", null, "\u53CC\u51FB\u8BBE\u4E3A\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("span", null, "\u62D6\u62FD\u79FB\u52A8"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 13,
      alignItems: "flex-start"
    }
  }, node.type === "person" ? /*#__PURE__*/React.createElement(Avatar, {
    name: node.name,
    size: 52,
    radius: 13
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 13,
      background: "var(--card-2)",
      border: "1px solid var(--line)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: node.type,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 19,
      fontWeight: 700,
      fontFamily: "var(--font-serif)"
    }
  }, node.name), isCenter && /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      background: "var(--gold-soft)",
      color: "var(--gold)",
      border: "1px solid var(--gold-line)"
    }
  }, "\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      fontFamily: "var(--font-num)",
      marginTop: 3
    }
  }, node.born ? `${node.born}–${node.died}` : node.start ? `${node.start}–${node.end} · ${node.place}` : ""))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "13px 0 0",
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.7
    }
  }, node.short), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold btn-sm",
    style: {
      flex: 1
    },
    disabled: isCenter,
    onClick: () => recenter(selected)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "network",
    size: 14
  }), isCenter ? "已是中心" : "设为中心"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      flex: 1
    },
    onClick: () => nav(node.type === "event" ? "event" : "person", node.id)
  }, "\u8FDB\u5165\u8BE6\u60C5 ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 13
  })))), /*#__PURE__*/React.createElement(Panel, {
    title: node.type === "person" ? "关系网络" : "参与人物",
    icon: "network",
    style: {
      flex: 1,
      overflow: "auto"
    },
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, "\u70B9\u51FB\u6F2B\u6E38")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, node.type === "person" ? (node.relations || []).map((r, i) => {
    const t = DB.get(r.to);
    if (!t) return null;
    const m = DB.relMeta[r.type] || {};
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setSelected(r.to),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "9px 9px",
        borderRadius: 10,
        textAlign: "left",
        transition: ".15s",
        background: selected === r.to ? "var(--gold-soft)" : "transparent"
      },
      onMouseEnter: e => {
        if (selected !== r.to) e.currentTarget.style.background = "var(--card-2)";
      },
      onMouseLeave: e => {
        if (selected !== r.to) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: t.type === "event" ? 2 : "50%",
        background: m.color || "var(--text-3)",
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
    }, t.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        color: "var(--text-3)"
      }
    }, r.label, " \xB7 ", t.type === "event" ? "事件" : "人物")), /*#__PURE__*/React.createElement("span", {
      className: "tag",
      style: {
        height: 20,
        fontSize: 11,
        background: "rgba(255,255,255,.04)",
        color: m.color
      }
    }, m.label));
  }) : (node.persons || []).map((pid, i) => {
    const p = DB.persons[pid];
    if (!p) return null;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setSelected(pid),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "8px",
        borderRadius: 10,
        textAlign: "left",
        transition: ".15s",
        background: selected === pid ? "var(--gold-soft)" : "transparent"
      },
      onMouseEnter: e => {
        if (selected !== pid) e.currentTarget.style.background = "var(--card-2)";
      },
      onMouseLeave: e => {
        if (selected !== pid) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: 34,
      radius: 9
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
        fontSize: 11.5,
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
    title: "\u5207\u6362\u4E2D\u5FC3\u8282\u70B9",
    icon: "layers",
    style: {
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-3)",
      marginBottom: 8
    }
  }, "\u4EBA\u7269"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, personIds.map(pid => /*#__PURE__*/React.createElement("button", {
    key: pid,
    className: "chip" + (center === pid ? " on" : ""),
    onClick: () => recenter(pid)
  }, DB.persons[pid].name))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-3)",
      margin: "13px 0 8px"
    }
  }, "\u4E8B\u4EF6"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, eventIds.map(eid => /*#__PURE__*/React.createElement("button", {
    key: eid,
    className: "chip" + (center === eid ? " on" : ""),
    onClick: () => recenter(eid)
  }, DB.events[eid].name)))))));
}
Object.assign(window, {
  GraphPage
});