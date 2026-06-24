/* ============ 历史星图 · 历史地图页（晚清示意） ============ */

function MapMarker({
  m,
  active,
  dim,
  onClick
}) {
  const t = DB.mapData.markerTypes.find(x => x.k === m.type) || {};
  const big = m.type === "capital" || m.type === "tianjing";
  return /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick(m);
    },
    style: {
      position: "absolute",
      left: m.x + "%",
      top: m.y + "%",
      transform: "translate(-50%,-50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
      zIndex: active ? 6 : 3,
      opacity: dim ? 0.28 : 1,
      transition: "opacity .2s",
      background: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: big ? 16 : 12,
      height: big ? 16 : 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, (active || big) && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      width: big ? 30 : 24,
      height: big ? 30 : 24,
      borderRadius: "50%",
      border: "1px solid " + t.color,
      opacity: .5
    }
  }), m.type === "tianjing" ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 13,
      height: 13,
      background: t.color,
      transform: "rotate(45deg)",
      borderRadius: 2,
      boxShadow: "0 0 10px " + t.color
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: big ? 13 : 10,
      height: big ? 13 : 10,
      borderRadius: "50%",
      background: t.color,
      boxShadow: active ? "0 0 12px " + t.color : "0 0 6px rgba(0,0,0,.6)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: big ? 13.5 : 12,
      fontWeight: big ? 700 : 600,
      color: active ? "var(--gold-2)" : "var(--text)",
      whiteSpace: "nowrap",
      textShadow: "0 1px 8px #000,0 0 14px rgba(6,8,15,.95)"
    }
  }, m.name));
}
function MarkerPopover({
  m,
  nav,
  onClose
}) {
  const below = m.y < 26;
  const t = DB.mapData.markerTypes.find(x => x.k === m.type) || {};
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: "absolute",
      left: m.x + "%",
      top: m.y + "%",
      zIndex: 20,
      transform: `translate(-50%, ${below ? "22px" : "calc(-100% - 20px)"})`,
      width: 230
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "14px 16px",
      border: "1px solid var(--gold-line)",
      boxShadow: "var(--shadow-lg)",
      background: "var(--card-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: t.color,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15.5,
      fontWeight: 700,
      fontFamily: "var(--font-serif)"
    }
  }, m.name), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginLeft: "auto",
      color: "var(--text-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.65,
      marginBottom: m.pid || m.ev || m.loc ? 11 : 0
    }
  }, m.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 7
    }
  }, m.pid && /*#__PURE__*/React.createElement("button", {
    className: "chip",
    onClick: () => nav("person", m.pid)
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "person",
    size: 11
  }), DB.persons[m.pid].name), m.ev && /*#__PURE__*/React.createElement("button", {
    className: "chip",
    onClick: () => nav("event", m.ev)
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "event",
    size: 11
  }), DB.events[m.ev].name))));
}
function MapPage({
  nav
}) {
  const [route, setRoute] = useState(null); // null=全部
  const [sel, setSel] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    markers,
    routes,
    markerTypes,
    caption
  } = DB.mapData;
  const mById = id => markers.find(m => m.id === id);
  const activeRouteIds = route ? new Set((routes.find(r => r.id === route) || {
    pts: []
  }).pts) : null;
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
  }, "\u5386\u53F2\u5730\u56FE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      marginBottom: 18,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 8
    }
  }, "HISTORICAL MAP"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      margin: 0,
      fontWeight: 700
    }
  }, "\u5386\u53F2\u5730\u56FE \xB7 \u665A\u6E05")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      marginBottom: 3
    }
  }, caption, " \xB7 \u4EBA\u7269\u6545\u91CC\u3001\u4E8B\u4EF6\u5730\u70B9\u4E0E\u91CD\u5927\u8FDB\u519B\u8DEF\u7EBF")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "244px 1fr",
      gap: 22,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 76,
      display: "flex",
      flexDirection: "column",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u5386\u53F2\u8DEF\u7EBF",
    icon: "arrow"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "chip" + (route === null ? " on" : ""),
    style: {
      justifyContent: "flex-start"
    },
    onClick: () => {
      setRoute(null);
      setSel(null);
    }
  }, "\u5168\u90E8\u5730\u70B9"), routes.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    className: "chip" + (route === r.id ? " on" : ""),
    style: {
      justifyContent: "flex-start",
      gap: 9
    },
    onClick: () => {
      setRoute(route === r.id ? null : r.id);
      setSel(null);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 0,
      borderTop: "3px solid " + r.color,
      borderTopStyle: r.dash ? "dashed" : "solid",
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left"
    }
  }, r.name)))), route && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-2)",
      lineHeight: 1.6,
      marginTop: 12,
      paddingTop: 12,
      borderTop: "1px solid var(--line)"
    }
  }, (routes.find(r => r.id === route) || {}).note)), /*#__PURE__*/React.createElement(Panel, {
    title: "\u56FE\u4F8B",
    icon: "layers"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, markerTypes.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.k,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      color: "var(--text-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: t.k === "tianjing" ? 2 : "50%",
      background: t.color,
      transform: t.k === "tianjing" ? "rotate(45deg)" : "none",
      flex: "none"
    }
  }), t.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      lineHeight: 1.6,
      marginTop: 14,
      paddingTop: 12,
      borderTop: "1px solid var(--line)"
    }
  }, "\u70B9\u51FB\u5730\u70B9\u67E5\u770B\u8BE6\u60C5\u5E76\u8DF3\u8F6C\u3002", /*#__PURE__*/React.createElement("br", null), "\u5E95\u56FE\u53EF", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, "\u62D6\u5165\u771F\u5B9E\u5386\u53F2\u5730\u56FE"), "\uFF08\u665A\u6E05\u7586\u57DF\u56FE / \u73B0\u4EE3\u4E2D\u56FD\u8F6E\u5ED3\u56FE\u5747\u53EF\uFF09\uFF0C\u5730\u70B9\u4E0E\u8DEF\u7EBF\u5C06\u81EA\u52A8\u53E0\u52A0\u5176\u4E0A\u3002"))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setSel(null),
    style: {
      position: "relative",
      height: 600,
      borderRadius: 16,
      overflow: "hidden",
      border: "1px solid var(--line)",
      background: "radial-gradient(ellipse 70% 60% at 55% 50%,#0e1730,#070b16)"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "map-qing-base",
    fit: "cover",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      borderRadius: 0
    },
    placeholder: "\u62D6\u5165\u4E00\u5F20\u665A\u6E05 / \u4E2D\u56FD\u5386\u53F2\u5730\u56FE\u4F5C\u4E3A\u5E95\u56FE"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(ellipse 80% 70% at 50% 45%,rgba(7,11,22,.12),rgba(7,11,22,.58)),linear-gradient(to bottom,rgba(7,11,22,.42),transparent 20%,transparent 68%,rgba(7,11,22,.5))"
    }
  }), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none"
    }
  }, [10, 20, 30, 40, 50, 60, 70, 80, 90].map(p => /*#__PURE__*/React.createElement(React.Fragment, {
    key: p
  }, /*#__PURE__*/React.createElement("line", {
    x1: p,
    y1: "0",
    x2: p,
    y2: "100",
    stroke: "rgba(255,255,255,.045)",
    strokeWidth: "1",
    vectorEffect: "non-scaling-stroke"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: p,
    x2: "100",
    y2: p,
    stroke: "rgba(255,255,255,.045)",
    strokeWidth: "1",
    vectorEffect: "non-scaling-stroke"
  }))), routes.map(r => {
    const on = !route || route === r.id;
    const dd = r.pts.map((id, i) => {
      const m = mById(id);
      return (i ? "L" : "M") + m.x + " " + m.y;
    }).join(" ");
    return /*#__PURE__*/React.createElement("path", {
      key: r.id,
      d: dd,
      fill: "none",
      stroke: r.color,
      strokeWidth: route === r.id ? 3.5 : 2.5,
      strokeDasharray: r.dash || (route === r.id ? "7 6" : ""),
      strokeLinecap: "round",
      strokeLinejoin: "round",
      vectorEffect: "non-scaling-stroke",
      opacity: on ? route === r.id ? 1 : .62 : .12,
      style: route === r.id ? {
        animation: "dashflow 1.2s linear infinite"
      } : undefined
    });
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      color: "var(--text-3)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 18,
    style: {
      transform: "rotate(-90deg)",
      color: "var(--gold)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 12,
      color: "var(--gold)"
    }
  }, "\u5317")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 12,
      right: 16,
      fontFamily: "monospace",
      fontSize: 11,
      color: "var(--text-3)",
      letterSpacing: .5,
      pointerEvents: "none"
    }
  }, "[ \u62D6\u5165\u5386\u53F2\u5730\u56FE\u5E95\u56FE ]"), markers.map(m => /*#__PURE__*/React.createElement(MapMarker, {
    key: m.id,
    m: m,
    active: sel && sel.id === m.id,
    dim: activeRouteIds && !activeRouteIds.has(m.id),
    onClick: mk => setSel(sel && sel.id === mk.id ? null : mk)
  })), sel && /*#__PURE__*/React.createElement(MarkerPopover, {
    m: sel,
    nav: nav,
    onClose: () => setSel(null)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 30
    }
  }));
}
Object.assign(window, {
  MapPage
});