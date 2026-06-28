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
});/* ============================================================
   新版历史地图（迁移自 history-map.html 的 viewer 模块）
   - 主题数据 / 投影 helpers / 战斗动画 helpers
   ============================================================ */

const HAS_BORDER = [[134,48.3],[131,47.7],[130.7,44.0],[128,42.7],[124.4,40.0],[121.6,38.9],[122.1,37.4],[120.3,36.0],[119.2,34.6],[120.9,32.0],[121.9,30.9],[121.6,29.5],[120.7,28.0],[119.3,26.0],[118.1,24.5],[116.7,23.3],[114.2,22.3],[110.4,21.2],[109.5,21.0],[108.0,21.5],[106.7,22.0],[103.9,22.5],[101.8,21.2],[99.2,22.1],[97.5,23.9],[97.7,25.6],[98.7,25.8],[98.0,27.5],[98.7,28.2],[96.4,29.0],[91.7,27.9],[88.8,27.3],[85.2,28.3],[81.4,30.4],[79.0,32.5],[78.2,35.5],[74.9,37.0],[75.0,38.6],[73.5,39.4],[74.9,40.6],[76.5,40.3],[80.2,42.2],[80.3,44.9],[82.6,45.1],[85.0,47.0],[87.3,49.2],[90.0,47.9],[91.0,46.0],[96.4,42.7],[100.0,42.7],[105.0,41.8],[109.5,42.5],[111.5,43.5],[114.5,45.4],[119.9,46.9],[117.8,49.6],[120.0,52.0],[122.4,53.5],[125.3,53.4],[127.5,50.2],[130.7,48.9],[134,48.3]];
const HAS_YANGTZE = [[97,33],[100,29.5],[102,29.2],[104.6,28.8],[106.5,29.6],[108.5,30.7],[111.3,30.7],[114.3,30.6],[116.0,29.7],[117.3,31.3],[118.8,32.06],[120.5,31.9],[121.5,31.4]];
const HAS_YELLOW = [[96,35],[100,36],[103.8,36.06],[106.0,37.5],[106.3,38.8],[107.5,40.3],[109.5,41.2],[111.3,40.5],[111.5,39],[110.6,37.5],[110.5,35.6],[111.2,34.8],[113.6,34.8],[116,35.3],[117,36.6],[118.9,37.8]];
const HAS_W = 1000, HAS_H = 720, HAS_PAD = 50;

function hasGeo() {
  if (hasGeo._g) return hasGeo._g;
  const xs = [], ys = [];
  for (const [lng, lat] of HAS_BORDER) { xs.push(lng * Math.PI / 180); ys.push(Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))); }
  const minx = Math.min(...xs), maxx = Math.max(...xs), miny = Math.min(...ys), maxy = Math.max(...ys);
  const s = Math.min((HAS_W - 2 * HAS_PAD) / (maxx - minx), (HAS_H - 2 * HAS_PAD) / (maxy - miny));
  const ox = (HAS_W - (maxx - minx) * s) / 2, oy = (HAS_H - (maxy - miny) * s) / 2;
  hasGeo._g = { minx, maxy, s, ox, oy };
  return hasGeo._g;
}
function hasProj(lng, lat) {
  const g = hasGeo();
  const mx = lng * Math.PI / 180, my = Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
  return [g.ox + (mx - g.minx) * g.s, g.oy + (g.maxy - my) * g.s];
}
function hasPolyPath(pts) {
  return 'M' + pts.map(p => { const [x, y] = hasProj(p[0], p[1]); return x.toFixed(1) + ',' + y.toFixed(1); }).join(' L');
}
function hasNodeColor(t) {
  return ({ '都城': '#d6b33f', '城镇': '#5aa2f2', '战役': '#e9855b', '关隘': '#67c7b7', '港口': '#5aa2f2' })[t] || '#5aa2f2';
}

// 战斗动画效果（迁移自 history-map.html）
function hasArrowChevron(a, b, t, size, color, key, op) {
  const px = a[0] + (b[0] - a[0]) * t, py = a[1] + (b[1] - a[1]) * t;
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  return React.createElement('path', {
    key, transform: 'translate(' + px.toFixed(1) + ',' + py.toFixed(1) + ') rotate(' + ang.toFixed(1) + ')',
    d: 'M' + (-size) + ',' + (-size * 0.72) + ' L' + (size * 0.55) + ',0 L' + (-size) + ',' + (size * 0.72),
    fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round',
    opacity: op == null ? 0.92 : op, style: { pointerEvents: 'none' }
  });
}
function hasEnemyMarker(x, y, key, op, foe) {
  const col = '#e75f5f';
  return React.createElement('g', {
    key, transform: 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')', opacity: op, style: { pointerEvents: 'none' }
  },
    React.createElement('circle', { r: 13, fill: 'none', stroke: col, strokeWidth: 1.3, strokeDasharray: '3 4', opacity: 0.85, style: { transformOrigin: 'center', animation: 'hasSpin 9s linear infinite' } }),
    React.createElement('g', { transform: 'translate(11,-12)', style: { transformOrigin: 'center', animation: 'hasFoePulse 1.6s ease-in-out infinite' } },
      React.createElement('path', { d: 'M0,9 L0,-9 L8,-6 L0,-3', fill: col, stroke: '#070b17', strokeWidth: 0.8 }),
      foe ? React.createElement('text', { x: 4, y: 20, fontSize: 10, fontWeight: 700, textAnchor: 'middle', fill: col, stroke: '#070b17', strokeWidth: 2.6, paintOrder: 'stroke' }, foe) : null
    )
  );
}
function hasFallenMarker(x, y, key, kind) {
  const col = kind === 'fall' ? '#e75f5f' : '#7f8a9c';
  return React.createElement('g', {
    key, transform: 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')', opacity: 0.55, style: { pointerEvents: 'none' }
  },
    React.createElement('circle', { r: 10, fill: 'none', stroke: col, strokeWidth: 1, strokeDasharray: '2 3' }),
    React.createElement('path', { d: 'M-3.4,-3.4 L3.4,3.4 M3.4,-3.4 L-3.4,3.4', stroke: col, strokeWidth: 1.6, strokeLinecap: 'round' })
  );
}
function hasClashBurst(x, y, key, lt, kind, foe) {
  const e = [];
  const col = kind === 'fall' ? '#e75f5f' : (kind === 'capture' ? '#f0a23a' : '#f0cf6a');
  const r1 = 8 + lt * 42, r2 = 8 + Math.max(0, lt - 0.2) * 50;
  e.push(React.createElement('circle', { key: key + 'r1', cx: x, cy: y, r: r1, fill: 'none', stroke: col, strokeWidth: 2.6 * (1 - lt) + 0.4, opacity: (1 - lt) * 0.9 }));
  if (lt > 0.2) e.push(React.createElement('circle', { key: key + 'r2', cx: x, cy: y, r: r2, fill: 'none', stroke: col, strokeWidth: 1.8 * (1 - lt), opacity: (1 - lt) * 0.5 }));
  const fop = Math.max(0, 1 - lt * 2.1);
  if (fop > 0) {
    e.push(React.createElement('circle', { key: key + 'fl', cx: x, cy: y, r: 6 + lt * 6, fill: col, opacity: fop * 0.5, filter: 'url(#hasGlow)' }));
    const k = 9, rr = 11 + lt * 24; let dp = '';
    for (let s = 0; s < k; s++) { const ang = (s / k) * Math.PI * 2 + (kind === 'fall' ? 0 : 0.35); dp += 'M' + (x + Math.cos(ang) * 4).toFixed(1) + ',' + (y + Math.sin(ang) * 4).toFixed(1) + ' L' + (x + Math.cos(ang) * rr).toFixed(1) + ',' + (y + Math.sin(ang) * rr).toFixed(1) + ' '; }
    e.push(React.createElement('path', { key: key + 'sp', d: dp, stroke: col, strokeWidth: 1.5 * (1 - lt) + 0.3, opacity: fop * 0.75, strokeLinecap: 'round' }));
  }
  if (foe && lt < 0.9) {
    const txt = kind === 'fall' ? (foe + ' 攻陷') : ('克 ' + foe);
    e.push(React.createElement('text', { key: key + 'tx', x: x, y: y - r1 - 7, fontSize: 12.5, fontWeight: 700, textAnchor: 'middle', fill: col, stroke: '#070b17', strokeWidth: 3.2, paintOrder: 'stroke', opacity: 1 - lt, style: { pointerEvents: 'none' } }, txt));
  }
  return e;
}
function hasBattleFx(r, prog) {
  const n = r.nodes.length; if (n < 2) return [];
  const W = 0.13, out = [];
  r.nodes.forEach((nd, idx) => {
    if (nd.type !== '战役' && !nd.fx) return;
    const fx = nd.fx || 'attack';
    const p_i = idx / (n - 1);
    const [x, y] = hasProj(nd.lng, nd.lat);
    if (prog < p_i - 0.0005) {
      if (fx === 'capture') out.push(hasEnemyMarker(x, y, 'em' + idx, 1, nd.foe));
      return;
    }
    const lt = (prog - p_i) / W;
    if (lt <= 1) {
      const b = hasClashBurst(x, y, 'cb' + idx, Math.max(0, lt), fx, nd.foe);
      for (const el of b) out.push(el);
      if (fx === 'capture') out.push(hasEnemyMarker(x, y, 'em' + idx, Math.max(0, 1 - lt * 1.3), nd.foe));
    } else {
      if (fx === 'capture') out.push(hasFallenMarker(x, y, 'fm' + idx, 'capture'));
      else if (fx === 'fall') out.push(hasFallenMarker(x, y, 'fm' + idx, 'fall'));
    }
  });
  return out;
}

// 历史地图主题数据（迁移自 history-map.html）
let HAS_THEMES = [
  {
    id: 'qing', name: '晚清重大历史路线', period: '约 1851–1895', type: '战争推进 / 政治事件', accuracy: '混合',
    sources: ['数据来源：人工整理（HAS）', '地名坐标：CHGIS v6', '参考：《清史稿》《太平天国史》'],
    routes: [
      {
        id: 'taiping', name: '太平军进军', color: '#d6b33f', accuracy: '精确', dist: '约 2300 km', type: '战争推进', year0: 1851, year1: 1864,
        summary: '1851 年金田起义，太平军自广西北出，循湘江、长江东下，1853 年定都南京（天京），至 1864 年天京陷落。',
        nodes: [
          { name: '金田', modern: '广西桂平', lng: 110.08, lat: 23.39, year: 1851, event: '金田起义', type: '城镇', accuracy: '精确', desc: '洪秀全于金田村起义，建号太平天国。', source: '人工整理 / 待补史料' },
          { name: '永安', modern: '广西蒙山', lng: 110.52, lat: 24.20, year: 1851, event: '永安建制', type: '城镇', accuracy: '精确', fx: 'capture', foe: '清军', desc: '攻占永安，分封诸王，初建制度。', source: '人工整理' },
          { name: '全州', modern: '广西全州', lng: 111.07, lat: 25.93, year: 1852, event: '全州之战', type: '战役', accuracy: '精确', fx: 'attack', desc: '北出广西，南王冯云山于此中炮身亡。', source: '人工整理' },
          { name: '武昌', modern: '湖北武汉', lng: 114.31, lat: 30.52, year: 1852, event: '攻克武昌', type: '城镇', accuracy: '精确', fx: 'capture', foe: '清军', desc: '太平军首克省城武昌，声势大振。', source: '人工整理' },
          { name: '南京 / 天京', modern: '江苏南京', lng: 118.80, lat: 32.06, year: 1853, event: '定都天京', type: '都城', accuracy: '精确', fx: 'capture', foe: '清军', desc: '攻克江宁，改称天京，定为太平天国都城。', source: '人工整理' },
          { name: '扬州', modern: '江苏扬州', lng: 119.41, lat: 32.39, year: 1853, event: '北伐东征', type: '城镇', accuracy: '推定', desc: '分兵北伐与西征，控扼长江下游。', source: '人工整理 / 待补' },
          { name: '安庆', modern: '安徽安庆', lng: 117.05, lat: 30.51, year: 1861, event: '安庆失守', type: '战役', accuracy: '精确', fx: 'fall', foe: '湘军', desc: '湘军攻陷安庆，天京上游屏障尽失。', source: '人工整理' },
          { name: '天京陷落', modern: '江苏南京', lng: 118.80, lat: 32.06, year: 1864, event: '天京陷落', type: '战役', accuracy: '精确', fx: 'fall', foe: '湘军', desc: '湘军破城，太平天国运动失败。', source: '人工整理' },
        ]
      },
      {
        id: 'zuo', name: '左宗棠西征', color: '#67c7b7', accuracy: '精确', dist: '约 2600 km', type: '战争推进', year0: 1875, year1: 1878,
        summary: '1875 年左宗棠任钦差大臣督办新疆军务，以"缓进急战、先北后南"方略，于 1878 年收复除伊犁外的新疆全境。',
        nodes: [
          { name: '兰州', modern: '甘肃兰州', lng: 103.83, lat: 36.06, year: 1875, event: '督师西征', type: '都城', accuracy: '精确', desc: '左宗棠驻兰州筹划西征，整军筹饷。', source: '人工整理' },
          { name: '肃州', modern: '甘肃酒泉', lng: 98.49, lat: 39.74, year: 1876, event: '出嘉峪关', type: '关隘', accuracy: '精确', desc: '大军出关，粮台前移。', source: '人工整理' },
          { name: '哈密', modern: '新疆哈密', lng: 93.51, lat: 42.83, year: 1876, event: '进兵哈密', type: '城镇', accuracy: '精确', desc: '屯田积谷，作为西进基地。', source: '人工整理' },
          { name: '迪化', modern: '新疆乌鲁木齐', lng: 87.62, lat: 43.82, year: 1876, event: '收复北疆', type: '战役', accuracy: '精确', fx: 'capture', foe: '阿古柏军', desc: '刘锦棠克迪化，北疆底定。', source: '人工整理' },
          { name: '吐鲁番', modern: '新疆吐鲁番', lng: 89.18, lat: 42.95, year: 1877, event: '南下天山', type: '关隘', accuracy: '精确', desc: '越天山取吐鲁番，打开南疆门户。', source: '人工整理' },
          { name: '喀什噶尔', modern: '新疆喀什', lng: 75.99, lat: 39.47, year: 1878, event: '收复南疆', type: '都城', accuracy: '精确', fx: 'capture', foe: '阿古柏军', desc: '克复喀什噶尔，新疆全境收复。', source: '人工整理' },
        ]
      },
      {
        id: 'yingfa', name: '英法联军北上', color: '#e9855b', accuracy: '推定', dist: '海路 + 陆路', type: '战争推进', year0: 1857, year1: 1860,
        summary: '第二次鸦片战争期间，英法联军自香港集结北上，1860 年攻陷大沽、占天津、八里桥败清军后入北京，焚掠圆明园。',
        nodes: [
          { name: '香港', modern: '香港', lng: 114.17, lat: 22.30, year: 1857, event: '联军集结', type: '港口', accuracy: '精确', desc: '英法舰队于香港集结，发动战争。', source: '人工整理' },
          { name: '大沽口', modern: '天津滨海', lng: 117.70, lat: 38.98, year: 1860, event: '大沽口之战', type: '战役', accuracy: '精确', fx: 'capture', foe: '清军炮台', desc: '联军炮击大沽炮台，强行登陆。', source: '人工整理' },
          { name: '天津', modern: '天津', lng: 117.20, lat: 39.13, year: 1860, event: '进占天津', type: '城镇', accuracy: '精确', fx: 'capture', foe: '清军', desc: '联军占领天津，谈判破裂。', source: '人工整理' },
          { name: '通州', modern: '北京通州', lng: 116.66, lat: 39.91, year: 1860, event: '八里桥之战', type: '战役', accuracy: '精确', fx: 'capture', foe: '清军', desc: '僧格林沁部于八里桥惨败。', source: '人工整理' },
          { name: '北京', modern: '北京', lng: 116.40, lat: 39.90, year: 1860, event: '火烧圆明园', type: '都城', accuracy: '精确', fx: 'capture', foe: '清廷', desc: '联军入京，焚掠圆明园。', source: '人工整理' },
        ]
      },
    ]
  },
  {
    id: 'xuanzang', name: '玄奘西行路线', period: '629–645', type: '人物行迹', accuracy: '推定',
    sources: ['数据来源：人工整理（HAS）', '史料：《大唐西域记》', '地名坐标：CHGIS / 推定'],
    routes: [
      {
        id: 'xz', name: '玄奘西行', color: '#d6b33f', accuracy: '推定', dist: '约 5000 km', type: '人物行迹', year0: 629, year1: 630,
        summary: '贞观初年玄奘违禁出关西行求法，经河西走廊、伊吾、高昌，越天山凌山至碎叶，再南下中亚、印度，往返十七年。',
        nodes: [
          { name: '长安', modern: '陕西西安', lng: 108.94, lat: 34.34, year: 629, event: '西出长安', type: '都城', accuracy: '精确', desc: '玄奘违禁出关，开始西行求法之旅。', source: '《大唐西域记》' },
          { name: '秦州', modern: '甘肃天水', lng: 105.72, lat: 34.58, year: 629, event: '夜行秦州', type: '城镇', accuracy: '推定', desc: '昼伏夜行，避开关防。', source: '推定' },
          { name: '凉州', modern: '甘肃武威', lng: 102.63, lat: 37.93, year: 629, event: '凉州讲经', type: '城镇', accuracy: '精确', desc: '于凉州开讲，声名渐起，旋遭驱逐。', source: '《大唐西域记》' },
          { name: '瓜州', modern: '甘肃瓜州', lng: 95.78, lat: 40.52, year: 629, event: '偷渡玉门', type: '关隘', accuracy: '推定', desc: '夜渡葫芦河，过玉门关，入莫贺延碛。', source: '推定' },
          { name: '伊吾', modern: '新疆哈密', lng: 93.51, lat: 42.83, year: 630, event: '伊吾停留', type: '城镇', accuracy: '推定', desc: '穿越大沙漠后抵伊吾。', source: '推定' },
          { name: '高昌', modern: '新疆吐鲁番', lng: 89.18, lat: 42.95, year: 630, event: '结盟高昌', type: '城镇', accuracy: '精确', desc: '高昌王麴文泰结为兄弟，资助西行。', source: '《大唐西域记》' },
          { name: '焉耆', modern: '新疆焉耆', lng: 86.57, lat: 42.06, year: 630, event: '过焉耆', type: '城镇', accuracy: '推定', desc: '经阿耆尼国。', source: '推定' },
          { name: '龟兹', modern: '新疆库车', lng: 82.96, lat: 41.72, year: 630, event: '龟兹论辩', type: '城镇', accuracy: '精确', desc: '于龟兹与高僧木叉毱多论辩。', source: '《大唐西域记》' },
          { name: '凌山', modern: '天山木扎尔特', lng: 79.40, lat: 42.10, year: 630, event: '越凌山', type: '关隘', accuracy: '示意', desc: '翻越天山凌山雪岭，徒侣冻殁十之三四。', source: '示意' },
          { name: '碎叶城', modern: '今吉尔吉斯', lng: 75.20, lat: 42.80, year: 630, event: '谒可汗', type: '城镇', accuracy: '推定', desc: '于碎叶谒西突厥统叶护可汗。', source: '推定' },
        ]
      },
    ]
  },
  {
    id: 'silk', name: '丝绸之路 · 东段', period: '汉 – 唐', type: '商贸交通', accuracy: '示意',
    sources: ['数据来源：人工整理（HAS）', '地名坐标：CHGIS', '底图：CartoDB（示意）'],
    routes: [
      {
        id: 'silk1', name: '丝路东段（南道）', color: '#67c7b7', accuracy: '示意', dist: '约 3500 km', type: '商贸交通', year0: 0, year1: 0,
        summary: '自长安出发，沿河西走廊经武威、张掖、酒泉至敦煌，分南北二道；南道经楼兰、于阗、莎车至疏勒出葱岭。',
        nodes: [
          { name: '长安', modern: '陕西西安', lng: 108.94, lat: 34.34, event: '丝路起点', type: '都城', accuracy: '精确', desc: '丝绸之路东端起点。', source: '人工整理' },
          { name: '武威', modern: '甘肃武威', lng: 102.63, lat: 37.93, event: '凉州', type: '城镇', accuracy: '精确', desc: '河西重镇。', source: '人工整理' },
          { name: '张掖', modern: '甘肃张掖', lng: 100.45, lat: 38.93, event: '甘州', type: '城镇', accuracy: '精确', desc: '河西走廊咽喉。', source: '人工整理' },
          { name: '酒泉', modern: '甘肃酒泉', lng: 98.49, lat: 39.74, event: '肃州', type: '城镇', accuracy: '精确', desc: '河西四郡之一。', source: '人工整理' },
          { name: '敦煌', modern: '甘肃敦煌', lng: 94.66, lat: 40.14, event: '分道处', type: '关隘', accuracy: '精确', desc: '出阳关、玉门关，分南北二道。', source: '人工整理' },
          { name: '楼兰', modern: '罗布泊畔', lng: 89.80, lat: 40.50, event: '楼兰古城', type: '城镇', accuracy: '推定', desc: '罗布泊畔古城，后湮没于流沙。', source: '推定' },
          { name: '于阗', modern: '新疆和田', lng: 79.92, lat: 37.11, event: '南道重镇', type: '城镇', accuracy: '精确', desc: '美玉之乡，佛教重镇。', source: '人工整理' },
          { name: '莎车', modern: '新疆莎车', lng: 77.24, lat: 38.41, event: '莎车', type: '城镇', accuracy: '精确', desc: '南道西端绿洲。', source: '人工整理' },
          { name: '疏勒', modern: '新疆喀什', lng: 75.99, lat: 39.47, event: '出葱岭', type: '关隘', accuracy: '精确', desc: '南北道交汇，西出葱岭。', source: '人工整理' },
        ]
      },
    ]
  },
];

// ============================================================
// 从 data.js (DB.events) 动态生成"早期中国"主题
// 接收已加载的 window.DB + placeId→坐标映射，返回合并后的主题数组
// ============================================================
function buildDataDbThemes() {
  if (typeof window === 'undefined' || !window.DB || !window.DB.events) return [];
  const events = Object.values(window.DB.events);
  if (!events.length) return [];

  // 按朝代分组
  const byDynasty = {};
  events.forEach(e => {
    const d = e.dynasty || 'unknown';
    if (!byDynasty[d]) byDynasty[d] = [];
    byDynasty[d].push(e);
  });

  // 朝代显示名
  const dynastyNames = {
    shanggu: '上古传说', xia: '夏', shang: '商', zhou: '周',
    qin: '秦', han: '汉', sanguo: '三国', weijin: '魏晋',
    sm: '南北朝', sui: '隋', tang: '唐', song: '宋',
    liao: '辽', jin: '金', yuan: '元', ming: '明', qing: '清',
  };

  // 颜色按朝代分配
  const dynColor = {
    shanggu: '#b388e0', xia: '#b388e0', shang: '#b388e0', zhou: '#b388e0',
    qin: '#e9855b', han: '#5aa2f2',
    san: '#7fc79c', jin: '#7fc79c', sm: '#7fc79c',
    sui: '#f0cf6a', tang: '#f0cf6a',
    song: '#d6b33f',
    liao: '#aeb8c8', jin2: '#aeb8c8', yuan: '#aeb8c8', ming: '#aeb8c8', qing: '#aeb8c8',
  };

  const resolveCoord = (typeof window !== 'undefined' && window.resolvePlaceCoords)
    ? window.resolvePlaceCoords
    : (id) => [108.94, 34.34];

  const themes = [];
  Object.keys(byDynasty).forEach(dyn => {
    const list = byDynasty[dyn];
    // 过滤掉没有 placeId 或坐标的
    const valid = list.filter(e => e.placeId && resolveCoord(e.placeId));
    if (!valid.length) return;

    // 按起始年份排序
    valid.sort((a, b) => (a.start || 0) - (b.start || 0));

    // 单路线（不分多条），每条事件作为节点
    const nodes = valid.slice(0, 20).map(e => {  // 最多20个节点，避免太多
      const [lng, lat] = resolveCoord(e.placeId);
      return {
        name: e.name,
        modern: e.place || '',
        lng, lat,
        year: e.start || null,
        event: e.short || '',
        type: '城镇',
        accuracy: '示意',
        desc: e.bg ? e.bg + ' / ' + (e.process || '') : (e.short || ''),
        source: (e.sources || []).map(s => s.t).join('、') || '《二十四史》'
      };
    });

    themes.push({
      id: 'data_' + dyn,
      name: (dynastyNames[dyn] || dyn) + ' · 史记载录',
      period: nodes.length > 0 && nodes[0].year
        ? (nodes[0].year < 0 ? '前' + Math.abs(nodes[0].year) : String(nodes[0].year))
          + ' – ' + (nodes[nodes.length - 1].year < 0 ? '前' + Math.abs(nodes[nodes.length - 1].year) : String(nodes[nodes.length - 1].year))
        : dyn,
      type: '二十四史',
      accuracy: '示意',
      sources: ['数据来源：HAS 二十四史同步', '地名坐标：内置 placeId → 坐标映射', '参考：《史记》《汉书》等'],
      routes: [{
        id: dyn + '_events',
        name: (dynastyNames[dyn] || dyn) + '重大事件',
        color: dynColor[dyn] || '#d6b33f',
        accuracy: '示意',
        dist: '由事件序列自动生成',
        type: '重大事件',
        year0: nodes[0] ? nodes[0].year : 0,
        year1: nodes[nodes.length - 1] ? nodes[nodes.length - 1].year : 0,
        summary: '从 HAS 二十四史数据集动态生成的' + (dynastyNames[dyn] || dyn) + '朝代重大事件，按时间排序，共 ' + nodes.length + ' 个节点。点击节点可查看事件详情与背景。',
        nodes
      }]
    });
  });
  return themes;
}

// 提供统一的 getAllThemes() 入口
function getAllThemes() {
  const extra = buildDataDbThemes();
  return HAS_THEMES.concat(extra);
}

// 搜索建议中的人物
const HAS_PEOPLE = [
  { name: '洪秀全', sub: '太平天国 · 金田起义', themeId: 'qing', routeId: 'taiping', idx: 0 },
  { name: '冯云山', sub: '太平天国南王 · 全州', themeId: 'qing', routeId: 'taiping', idx: 2 },
  { name: '左宗棠', sub: '晚清名臣 · 督师西征', themeId: 'qing', routeId: 'zuo', idx: 0 },
  { name: '刘锦棠', sub: '克迪化 · 复南疆', themeId: 'qing', routeId: 'zuo', idx: 3 },
  { name: '僧格林沁', sub: '八里桥之战', themeId: 'qing', routeId: 'yingfa', idx: 3 },
  { name: '玄奘', sub: '西行求法十七年', themeId: 'xuanzang', routeId: 'xz', idx: 0 },
  { name: '麴文泰', sub: '高昌王 · 资助西行', themeId: 'xuanzang', routeId: 'xz', idx: 5 },
];

function hasAllEvents() {
  const out = [];
  HAS_THEMES.forEach(th => {
    th.routes.forEach(r => {
      r.nodes.forEach((nd, idx) => {
        out.push({
          year: nd.year || null, name: nd.name, modern: nd.modern, event: nd.event, type: nd.type,
          accuracy: nd.accuracy, desc: nd.desc, themeId: th.id, themeName: th.name,
          routeId: r.id, routeName: r.name, color: r.color, idx
        });
      });
    });
  });
  return out;
}/* ============================================================
   子组件：地图 SVG 画布
   ============================================================ */
function HasMapCanvas(props) {
  const { state, setState, themes, onSelectRoute, onSelectNode, onCanvasClick, panningHandlers } = props;
  const S = state;
  const sel = (S.selectedRouteId && themes.find(t => t.id === S.themeId).routes.find(r => r.id === S.selectedRouteId)) || null;
  const playProg = S.playT;
  const els = [];

  // defs
  els.push(React.createElement('defs', { key: 'defs' },
    React.createElement('filter', { id: 'hasGlow', x: '-60%', y: '-60%', width: '220%', height: '220%' },
      React.createElement('feGaussianBlur', { stdDeviation: '3.4', result: 'b' }),
      React.createElement('feMerge', null, React.createElement('feMergeNode', { in: 'b' }), React.createElement('feMergeNode', { in: 'SourceGraphic' }))),
    React.createElement('radialGradient', { id: 'hasSeaGrad', cx: '45%', cy: '38%', r: '75%' },
      React.createElement('stop', { offset: '0%', stopColor: '#0c1428' }),
      React.createElement('stop', { offset: '100%', stopColor: '#070b17' })),
    React.createElement('radialGradient', { id: 'hasLandGrad', cx: '42%', cy: '40%', r: '70%' },
      React.createElement('stop', { offset: '0%', stopColor: '#16213a' }),
      React.createElement('stop', { offset: '100%', stopColor: '#0f1729' })),
    React.createElement('radialGradient', { id: 'hasScanGrad', cx: '45%', cy: '40%', r: '75%' },
      React.createElement('stop', { offset: '0%', stopColor: '#3a3424' }),
      React.createElement('stop', { offset: '100%', stopColor: '#241f15' }))
  ));

  const bm = S.basemap;
  const seaFill = bm === 'scan' ? 'url(#hasScanGrad)' : (bm === 'none' ? '#070b17' : 'url(#hasSeaGrad)');
  els.push(React.createElement('rect', { key: 'sea', x: 0, y: 0, width: HAS_W, height: HAS_H, fill: seaFill }));

  // 经纬网
  if (S.layers.grid && bm !== 'none') {
    const grid = [];
    for (let lng = 75; lng <= 135; lng += 10) { const a = hasProj(lng, 15), b = hasProj(lng, 55); grid.push(React.createElement('line', { key: 'gx' + lng, x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: 'rgba(148,163,184,1)', strokeWidth: 0.5 })); }
    for (let lat = 20; lat <= 55; lat += 10) { const a = hasProj(70, lat), b = hasProj(138, lat); grid.push(React.createElement('line', { key: 'gy' + lat, x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: 'rgba(148,163,184,1)', strokeWidth: 0.5 })); }
    els.push(React.createElement('g', { key: 'grid', opacity: (S.layerOpacity.grid / 100) * (bm === 'scan' ? 0.5 : 0.5) }, grid));
  }

  // 陆地
  const landStroke = bm === 'scan' ? '#7a6a3e' : 'rgba(120,140,170,0.55)';
  const landFill = bm === 'scan' ? '#2b2517' : (bm === 'none' ? '#0c1322' : 'url(#hasLandGrad)');
  els.push(React.createElement('path', { key: 'land', d: hasPolyPath(HAS_BORDER) + 'Z', fill: landFill, stroke: landStroke, strokeWidth: 1.4, strokeLinejoin: 'round' }));

  // 河流
  if (S.layers.rivers) {
    const rc = bm === 'scan' ? '#6f86a0' : '#3d5f86';
    els.push(React.createElement('g', { key: 'rivers', opacity: S.layerOpacity.rivers / 100, fill: 'none', stroke: rc, strokeWidth: 1.6, strokeLinejoin: 'round', strokeLinecap: 'round' },
      React.createElement('path', { d: hasPolyPath(HAS_YANGTZE) }),
      React.createElement('path', { d: hasPolyPath(HAS_YELLOW) })));
  }

  // 路线
  const list = themes.find(t => t.id === S.themeId).routes;
  if (S.layers.routes) {
    const rgs = [];
    for (const r of list) {
      if (S.hidden[r.id]) continue;
      const isSel = sel && sel.id === r.id;
      const dim = sel && !isSel;
      const dash = (r.accuracy === '推定' || r.accuracy === '示意');
      let d, opacity;
      if (isSel && (S.playing || playProg < 1)) {
        // 进行中的动画
        const n = r.nodes.length, segc = n - 1, ex = playProg * segc;
        let seg = Math.min(Math.floor(ex), segc - 1); if (seg < 0) seg = 0; const frac = ex - seg;
        const pts = r.nodes.slice(0, seg + 1).map(nd => hasProj(nd.lng, nd.lat));
        const a = hasProj(r.nodes[seg].lng, r.nodes[seg].lat), b = hasProj(r.nodes[seg + 1].lng, r.nodes[seg + 1].lat);
        const hx = a[0] + (b[0] - a[0]) * frac, hy = a[1] + (b[1] - a[1]) * frac; pts.push([hx, hy]);
        d = 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L'); opacity = 1;
        const hang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        rgs.push(React.createElement('g', { key: 'hd' + r.id, transform: 'translate(' + hx.toFixed(1) + ',' + hy.toFixed(1) + ')' },
          React.createElement('circle', { r: 6, fill: 'none', stroke: '#fff', strokeWidth: 1.5, opacity: 0.6, style: { transformOrigin: 'center', animation: 'hasPing 1.3s ease-out infinite' } }),
          React.createElement('g', { transform: 'rotate(' + hang.toFixed(1) + ')' },
            React.createElement('circle', { r: 5, fill: '#fff', filter: 'url(#hasGlow)' }),
            React.createElement('path', { d: 'M-1,-3.6 L6.5,0 L-1,3.6 Z', fill: r.color, stroke: '#fff', strokeWidth: 1 }))));
      } else {
        d = hasPolyPath(r.nodes.map(nd => [nd.lng, nd.lat])); opacity = dim ? 0.22 : 1;
      }
      rgs.push(React.createElement('path', {
        key: 'rt' + r.id, d, fill: 'none', stroke: r.color, strokeWidth: isSel ? 3.6 : 2.4,
        strokeLinejoin: 'round', strokeLinecap: 'round', opacity: opacity * (S.layerOpacity.routes / 100),
        strokeDasharray: dash ? '7 5' : 'none', filter: isSel ? 'url(#hasGlow)' : 'none',
        style: { cursor: 'pointer', transition: 'opacity .25s' }, onClick: () => onSelectRoute(r.id)
      }));
      if (isSel) {
        const segc = r.nodes.length - 1, animating = (S.playing || playProg < 1);
        let dSeg = segc, dFrac = 1;
        if (animating) { const ex = playProg * segc; dSeg = Math.floor(ex); dFrac = ex - dSeg; }
        for (let i = 0; i < segc; i++) {
          let show = true;
          if (animating) { if (i < dSeg) show = true; else if (i === dSeg) show = dFrac > 0.5; else show = false; }
          if (!show) continue;
          const a = hasProj(r.nodes[i].lng, r.nodes[i].lat), b = hasProj(r.nodes[i + 1].lng, r.nodes[i + 1].lat);
          rgs.push(hasArrowChevron(a, b, 0.55, 5, '#fff', 'av' + r.id + i, 0.9));
        }
      }
    }
    els.push(React.createElement('g', { key: 'routes' }, rgs));
  }

  // 节点
  if (S.layers.places) {
    const ng = [];
    for (const r of list) {
      if (S.hidden[r.id]) continue;
      const isSel = sel && sel.id === r.id;
      const dim = sel && !isSel;
      const reached = (isSel && (S.playing || playProg < 1))
        ? Math.min(Math.round(playProg * (r.nodes.length - 1)), r.nodes.length - 1)
        : r.nodes.length - 1;
      r.nodes.forEach((nd, idx) => {
        const [x, y] = hasProj(nd.lng, nd.lat);
        const future = isSel && idx > reached;
        const col = hasNodeColor(nd.type);
        const selected = S.selectedNode && S.selectedNode.routeId === r.id && S.selectedNode.idx === idx;
        const baseOp = dim ? 0.3 : (future ? 0.32 : 1);
        const sym = [];
        if (nd.type === '都城') {
          sym.push(React.createElement('circle', { key: 'halo', r: 12, fill: col, opacity: 0.16 }));
          sym.push(React.createElement('circle', { key: 'ring', r: 7, fill: 'none', stroke: col, strokeWidth: 1.6 }));
          sym.push(React.createElement('circle', { key: 'c', r: 4, fill: col }));
        } else if (nd.type === '战役') {
          sym.push(React.createElement('rect', { key: 'd', x: -5, y: -5, width: 10, height: 10, fill: col, transform: 'rotate(45)' }));
        } else if (nd.type === '港口') {
          sym.push(React.createElement('circle', { key: 'r', r: 6, fill: 'none', stroke: col, strokeWidth: 2 }));
          sym.push(React.createElement('circle', { key: 'c', r: 2, fill: col }));
        } else if (nd.type === '关隘') {
          sym.push(React.createElement('rect', { key: 'r', x: -5, y: -5, width: 10, height: 10, rx: 1.5, fill: 'none', stroke: col, strokeWidth: 2 }));
        } else {
          sym.push(React.createElement('circle', { key: 'c', r: 4, fill: col }));
        }
        if (nd.accuracy === '推定' || nd.accuracy === '示意') sym.push(React.createElement('circle', { key: 'q', r: 9, fill: 'none', stroke: col, strokeWidth: 1, strokeDasharray: '2 2', opacity: 0.7 }));
        if (selected) sym.push(React.createElement('circle', { key: 'sel', r: 13, fill: 'none', stroke: '#fff', strokeWidth: 1.6, opacity: 0.9 }));
        const label = (S.layers.labels && !dim)
          ? React.createElement('text', { key: 't', x: 9, y: 4, fontSize: 12, fontWeight: 600, fill: '#eef2f8', stroke: '#070b17', strokeWidth: 3, paintOrder: 'stroke', style: { pointerEvents: 'none' } }, nd.name)
          : null;
        const grp = React.createElement('g', {
          transform: 'translate(' + x + ',' + y + ')', opacity: baseOp, style: { cursor: 'pointer', transition: 'opacity .2s' },
          onClick: (e) => { e.stopPropagation && e.stopPropagation(); onSelectNode(r.id, idx); },
          onMouseEnter: () => setState({ hover: { x, y, name: nd.name, sub: (nd.modern || '') + (nd.year ? (' · ' + nd.year) : '') } }),
          onMouseLeave: () => setState({ hover: null })
        }, ...sym, label);
        ng.push(React.createElement('g', { key: 'n' + r.id + idx }, grp));
      });
    }
    els.push(React.createElement('g', { key: 'nodes', opacity: S.layerOpacity.places / 100 }, ng));
  }

  // 战斗特效
  if (sel && S.layers.routes && (S.playing || playProg < 1)) {
    const bfx = hasBattleFx(sel, playProg);
    if (bfx.length) els.push(React.createElement('g', { key: 'battlefx' }, bfx));
  }

  const scale = S.zoom;
  const cx = HAS_W / 2, cy = HAS_H / 2;
  const pan = S.pan || { x: 0, y: 0 };
  return React.createElement('svg', {
    viewBox: '0 0 ' + HAS_W + ' ' + HAS_H, width: '100%', height: '100%',
    style: { display: 'block', position: 'absolute', inset: 0, cursor: panningHandlers.isPanning ? 'grabbing' : 'grab' },
    onMouseDown: panningHandlers.onStart,
    onClick: onCanvasClick
  },
    React.createElement('g', { transform: 'translate(' + pan.x + ',' + pan.y + ') translate(' + cx + ',' + cy + ') scale(' + scale + ') translate(' + (-cx) + ',' + (-cy) + ')' }, els));
}

/* ============================================================
   子组件：节点详情抽屉
   ============================================================ */
function HasNodeDrawer(props) {
  const { route, node, onClose, onJumpRoute, onJumpNode } = props;
  if (!route || !node) return null;
  const accColor = { '精确': '#7fc79c', '推定': '#f2c94c', '示意': '#9aa6b8' };
  const accBg = { '精确': 'rgba(127,199,156,.14)', '推定': 'rgba(242,201,76,.14)', '示意': 'rgba(148,163,184,.14)' };
  const row = (label, val, vc) => React.createElement('div', { style: { display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' } },
    React.createElement('span', { style: { flex: 'none', width: 64, fontSize: 12, color: '#6f7b8f' } }, label),
    React.createElement('span', { style: { flex: 1, fontSize: 13, color: vc || '#eef2f8', lineHeight: 1.5 } }, val));
  return React.createElement('aside', { className: 'has-drawer' },
    React.createElement('div', { className: 'hd' },
      React.createElement('div', { className: 'icon' }, '📍'),
      React.createElement('div', { className: 'meta' },
        React.createElement('div', { className: 'kind' }, '节点详情'),
        React.createElement('div', { className: 'title' }, node.name),
        React.createElement('div', { className: 'sub' }, route.name)),
      React.createElement('span', { className: 'close', onClick: onClose }, '×')),
    React.createElement('div', { className: 'body' },
      React.createElement('div', { className: 'badges' },
        React.createElement('span', { className: 'badge', style: { color: '#d6b33f', background: 'rgba(214,179,63,.14)' } }, node.type),
        React.createElement('span', { className: 'badge', style: { color: accColor[node.accuracy], background: accBg[node.accuracy] } }, '精度：' + node.accuracy)),
      row('现代位置', node.modern),
      node.year ? row('时间', String(node.year) + ' 年') : null,
      row('类型', node.type),
      row('所属路线', React.createElement('span', { style: { color: route.color, fontWeight: 600, cursor: 'pointer' }, onClick: () => onJumpRoute(route.id) }, route.name)),
      React.createElement('div', { className: 'sec' }, '事件说明'),
      React.createElement('div', { className: 'desc' }, node.desc || node.event),
      React.createElement('div', { className: 'sec' }, '来源'),
      React.createElement('div', { className: 'src' }, node.source),
      React.createElement('div', { className: 'btns' },
        React.createElement('button', null, '🔗 复制地点链接'),
        React.createElement('button', null, '⏰ 在时间线中定位'),
        React.createElement('button', null, '👥 相关人物 / 事件'),
        React.createElement('button', null, '⚑ 报错 / 反馈')))
  );
}

/* ============================================================
   子组件：路线详情抽屉
   ============================================================ */
function HasRouteDrawer(props) {
  const { route, onClose, onJumpNode } = props;
  if (!route) return null;
  const accColor = { '精确': '#7fc79c', '推定': '#f2c94c', '示意': '#9aa6b8' };
  const accBg = { '精确': 'rgba(127,199,156,.14)', '推定': 'rgba(242,201,76,.14)', '示意': 'rgba(148,163,184,.14)' };
  const row = (label, val, vc) => React.createElement('div', { style: { display: 'flex', gap: 12, padding: '9px 0', borderBottom: '1px solid rgba(148,163,184,0.1)' } },
    React.createElement('span', { style: { flex: 'none', width: 64, fontSize: 12, color: '#6f7b8f' } }, label),
    React.createElement('span', { style: { flex: 1, fontSize: 13, color: vc || '#eef2f8', lineHeight: 1.5 } }, val));
  return React.createElement('aside', { className: 'has-drawer' },
    React.createElement('div', { className: 'hd' },
      React.createElement('div', { className: 'icon' }, '🛤️'),
      React.createElement('div', { className: 'meta' },
        React.createElement('div', { className: 'kind' }, '路线详情'),
        React.createElement('div', { className: 'title' }, route.name),
        React.createElement('div', { className: 'sub' }, (route.year0 || '—') + ' – ' + (route.year1 || '—'))),
      React.createElement('span', { className: 'close', onClick: onClose }, '×')),
    React.createElement('div', { className: 'body' },
      React.createElement('div', { className: 'badges' },
        React.createElement('span', { className: 'badge', style: { color: '#d6b33f', background: 'rgba(214,179,63,.14)' } }, route.type),
        React.createElement('span', { className: 'badge', style: { color: accColor[route.accuracy], background: accBg[route.accuracy] } }, '精度：' + route.accuracy)),
      row('起止年份', (route.year0 || '—') + ' – ' + (route.year1 || '—')),
      row('节点数', route.nodes.length + ' 个'),
      row('估算距离', route.dist),
      React.createElement('div', { className: 'sec' }, '路线说明'),
      React.createElement('div', { className: 'desc' }, route.summary),
      React.createElement('div', { className: 'sec' }, '节点列表'),
      React.createElement('div', { className: 'nd-list' },
        route.nodes.map((nd, idx) => React.createElement('div', {
          key: idx, className: 'nd',
          onClick: () => onJumpNode(route.id, idx)
        },
          React.createElement('span', { className: 'idx' }, String(idx + 1).padStart(2, '0')),
          React.createElement('div', { className: 'info' },
            React.createElement('div', { className: 'name' }, nd.name),
            React.createElement('div', { className: 'sub' }, nd.modern + (nd.year ? (' · ' + nd.year) : ''))),
          React.createElement('span', { className: 'acc', style: { color: accColor[nd.accuracy] } }, nd.accuracy))))
  ));
}/* ============================================================
   主组件：NewMapPage（迁移自 history-map.html 的 viewer 模块）
   ============================================================ */
function NewMapPage(props) {
  const { nav } = props;
  // 合并静态 HAS_THEMES + 从 data.js 动态生成的主题
  const themes = React.useMemo(() => getAllThemes(), []);
  const [themeId, setThemeId] = React.useState('qing');
  const [selectedRouteId, setSelectedRouteId] = React.useState(null);
  const [selectedNode, setSelectedNode] = React.useState(null);  // {routeId, idx}
  const [drawerType, setDrawerType] = React.useState(null);      // 'node' | 'route'
  const [layers, setLayers] = React.useState({ routes: true, places: true, rivers: true, territory: false, labels: true, grid: true });
  const [layerOpacity, setLayerOpacity] = React.useState({ routes: 100, places: 100, rivers: 60, territory: 45, labels: 100, grid: 35 });
  const [basemap, setBasemap] = React.useState('dark');
  const [basemapOpen, setBasemapOpen] = React.useState(false);
  const [accuracyOpen, setAccuracyOpen] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [playT, setPlayT] = React.useState(1);
  const [speed, setSpeed] = React.useState(1);
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [hover, setHover] = React.useState(null);  // {x, y, name, sub}
  const [hidden, setHidden] = React.useState({});  // {[routeId]: boolean}
  const [searchVal, setSearchVal] = React.useState('');
  const [searchOpen, setSearchOpen] = React.useState(false);

  const rafRef = React.useRef(null);
  const panRef = React.useRef({ panning: false, px: 0, py: 0, p0x: 0, p0y: 0, k: 1 });

  // 当前主题 / 路线
  const th = themes.find(t => t.id === themeId) || themes[0];
  const sel = (selectedRouteId && th.routes.find(r => r.id === selectedRouteId)) || null;

  // 把所有 state 合并到一个对象，便于传给子组件
  const state = {
    themeId, selectedRouteId, selectedNode, drawerType,
    layers, layerOpacity, basemap, basemapOpen, accuracyOpen,
    playing, playT, speed, zoom, pan, hover, hidden
  };
  const setState = (patch) => {
    if ('themeId' in patch) setThemeId(patch.themeId);
    if ('selectedRouteId' in patch) setSelectedRouteId(patch.selectedRouteId);
    if ('selectedNode' in patch) setSelectedNode(patch.selectedNode);
    if ('drawerType' in patch) setDrawerType(patch.drawerType);
    if ('layers' in patch) setLayers(patch.layers);
    if ('layerOpacity' in patch) setLayerOpacity(patch.layerOpacity);
    if ('basemap' in patch) setBasemap(patch.basemap);
    if ('basemapOpen' in patch) setBasemapOpen(patch.basemapOpen);
    if ('accuracyOpen' in patch) setAccuracyOpen(patch.accuracyOpen);
    if ('playing' in patch) setPlaying(patch.playing);
    if ('playT' in patch) setPlayT(patch.playT);
    if ('speed' in patch) setSpeed(patch.speed);
    if ('zoom' in patch) setZoom(patch.zoom);
    if ('pan' in patch) setPan(patch.pan);
    if ('hover' in patch) setHover(patch.hover);
    if ('hidden' in patch) setHidden(patch.hidden);
  };

  // ----- 主题切换 -----
  const selectTheme = (id) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setThemeId(id); setSelectedRouteId(null); setSelectedNode(null);
    setDrawerType(null); setHidden({}); setPlaying(false); setPlayT(1);
  };

  // ----- 路线选择 -----
  const selectRoute = (id) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    const same = selectedRouteId === id;
    setSelectedRouteId(same ? null : id);
    setPlayT(1); setPlaying(false);
    setDrawerType(same ? null : 'route');
    setSelectedNode(null);
  };

  // ----- 路线显隐切换 -----
  const toggleRoute = (id) => {
    const hd = { ...hidden }; hd[id] = !hd[id]; setHidden(hd);
  };

  // ----- 清除选择 -----
  const clearSelection = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setSelectedRouteId(null); setDrawerType(null); setSelectedNode(null);
    setPlaying(false); setPlayT(1);
  };

  // ----- 节点选择 -----
  const selectNode = (routeId, idx) => {
    setSelectedRouteId(routeId);
    setSelectedNode({ routeId, idx });
    setDrawerType('node');
    setPlayT(1); setPlaying(false);
  };

  const closeDrawer = () => { setDrawerType(null); setSelectedNode(null); };

  // ----- 跳转到指定路线/节点（外部触发，如搜索） -----
  const gotoMapRoute = (tid, rid) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setThemeId(tid); setSelectedRouteId(rid); setSelectedNode(null);
    setDrawerType('route'); setPlaying(false); setPlayT(1); setHidden({});
  };
  const gotoMapNode = (tid, rid, idx) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setThemeId(tid); setSelectedRouteId(rid); setSelectedNode({ routeId: rid, idx });
    setDrawerType('node'); setPlaying(false); setPlayT(1); setHidden({});
  };

  // ----- 图层切换 -----
  const toggleLayer = (k) => {
    const ly = { ...layers }; ly[k] = !ly[k]; setLayers(ly);
  };
  const setLayerOp = (k, v) => {
    const lo = { ...layerOpacity }; lo[k] = +v; setLayerOpacity(lo);
  };

  // ----- 底图切换 -----
  const selectBasemap = (k) => { setBasemap(k); setBasemapOpen(false); };

  // ----- 缩放/平移 -----
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const zoomIn = () => setZoom(z => Math.min(2.4, z * 1.2));
  const zoomOut = () => setZoom(z => Math.max(0.6, z / 1.2));

  const onPanStart = (e) => {
    panRef.current.panning = true;
    panRef.current.px = e.clientX;
    panRef.current.py = e.clientY;
    panRef.current.p0x = pan.x;
    panRef.current.p0y = pan.y;
    const wrap = e.currentTarget && e.currentTarget.parentElement;
    panRef.current.k = wrap ? (HAS_W / wrap.clientWidth) : 1;
    window.addEventListener('mousemove', onPanMove);
    window.addEventListener('mouseup', onPanEnd);
  };
  const onPanMove = (e) => {
    if (!panRef.current.panning) return;
    const k = panRef.current.k || 1;
    setPan({
      x: panRef.current.p0x + (e.clientX - panRef.current.px) * k,
      y: panRef.current.p0y + (e.clientY - panRef.current.py) * k
    });
  };
  const onPanEnd = () => {
    panRef.current.panning = false;
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('mouseup', onPanEnd);
  };
  React.useEffect(() => () => {
    window.removeEventListener('mousemove', onPanMove);
    window.removeEventListener('mouseup', onPanEnd);
  }, []);

  // ----- 播放 -----
  const reachedIdx = (r, t) => Math.min(Math.round(t * (r.nodes.length - 1)), r.nodes.length - 1);
  const togglePlay = () => {
    if (!sel) return;
    if (playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setPlaying(false);
      return;
    }
    let t = playT; if (t >= 1) t = 0;
    const start = performance.now();
    const t0 = t;
    setPlaying(true); setPlayT(t); setSelectedNode(null); setDrawerType(null);
    const tick = () => {
      const dur = 6500 / speed;
      const now = performance.now();
      let cur = t0 + (now - start) / dur;
      if (cur >= 1) { setPlayT(1); setPlaying(false); rafRef.current = null; return; }
      setPlayT(cur);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };
  React.useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const seekTimeline = (e) => {
    if (!sel) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    let t = (e.clientX - rect.left) / rect.width;
    t = Math.max(0, Math.min(1, t));
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setPlayT(t); setPlaying(false);
  };

  // ----- 画布点击（关闭底图菜单） -----
  const onCanvasClick = () => { if (basemapOpen) setBasemapOpen(false); };

  // ----- 搜索建议 -----
  const searchGroups = (() => {
    const q = searchVal.trim().toLowerCase();
    const groups = [];
    const ths = themes.filter(t => !q || t.name.toLowerCase().includes(q)).slice(0, 4)
      .map(t => ({ label: t.name, sub: t.period + ' · ' + t.type, color: '#67c7b7', kind: '专题', act: () => selectTheme(t.id) }));
    if (ths.length) groups.push({ head: '专题', items: ths });
    const rt = [];
    themes.forEach(t => t.routes.forEach(r => {
      if (!q || r.name.toLowerCase().includes(q)) rt.push({
        label: r.name, sub: t.name + (r.year0 ? (' · ' + r.year0 + (r.year1 && r.year1 !== r.year0 ? ('–' + r.year1) : '')) : ''),
        color: r.color, kind: '路线', act: () => gotoMapRoute(t.id, r.id)
      });
    }));
    if (rt.length) groups.push({ head: '路线', items: rt.slice(0, 5) });
    const pp = HAS_PEOPLE.filter(p => !q || p.name.toLowerCase().includes(q) || p.sub.toLowerCase().includes(q))
      .map(p => ({ label: p.name, sub: p.sub, color: '#d6b33f', kind: '人物', act: () => gotoMapNode(p.themeId, p.routeId, p.idx) }));
    if (pp.length) groups.push({ head: '人物', items: pp.slice(0, 6) });
    const isNum = /^\d{1,4}$/.test(q);
    const seen = {};
    const pl = hasAllEvents().filter(ev => {
      if (!q) return false;
      if (isNum) return ev.year != null && String(ev.year).includes(q);
      return ev.name.toLowerCase().includes(q) || (ev.modern || '').toLowerCase().includes(q) || (ev.event || '').toLowerCase().includes(q);
    }).filter(ev => { const k = ev.themeId + ev.routeId + ev.idx; if (seen[k]) return false; seen[k] = 1; return true; })
      .map(ev => ({
        label: ev.name + (ev.year ? (' · ' + ev.year) : ''),
        sub: ev.modern + ' · ' + ev.event + ' — ' + ev.routeName,
        color: hasNodeColor(ev.type), kind: ev.type,
        act: () => gotoMapNode(ev.themeId, ev.routeId, ev.idx)
      }));
    if (pl.length) groups.push({ head: isNum ? '年份 / 事件' : '地名 / 事件', items: pl.slice(0, 8) });
    return groups;
  })();

  // ----- 渲染主结构 -----
  // 顶部
  const topbar = React.createElement('header', { className: 'has-topbar' },
    React.createElement('div', { className: 'brand', onClick: () => nav && nav('home') },
      React.createElement('div', { className: 'brand-mark' }, '★'),
      React.createElement('span', { className: 'brand-name' }, '历史星图'),
      React.createElement('span', { className: 'brand-tag' }, 'History Atlas Studio')),
    React.createElement('nav', { className: 'topnav' },
      React.createElement('span', { onClick: () => nav && nav('home') }, '首页'),
      React.createElement('span', { onClick: () => nav && nav('timeline') }, '时间线'),
      React.createElement('span', { onClick: () => nav && nav('graph') }, '关系图谱'),
      React.createElement('span', { className: 'active' }, '历史地图'),
      React.createElement('span', { onClick: () => nav && nav('ai') }, 'AI 助手')),
    React.createElement('div', { style: { flex: 1 } }),
    React.createElement('div', { style: { position: 'relative', width: 220 } },
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 7, padding: '0 10px', height: 34, background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 9, color: 'var(--text-muted)' }
      },
        React.createElement('span', null, '🔍'),
        React.createElement('input', {
          value: searchVal, placeholder: '搜地名 / 人物 / 年份',
          style: { flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: 12.5, fontFamily: 'inherit' },
          onChange: (e) => { setSearchVal(e.target.value); setSearchOpen(true); },
          onFocus: () => setSearchOpen(true),
          onBlur: () => setTimeout(() => setSearchOpen(false), 150)
        }),
      ),
        searchVal ? React.createElement('span', { style: { cursor: 'pointer', fontSize: 16, lineHeight: 1, color: 'var(--text-muted)' }, onMouseDown: () => { setSearchVal(''); setSearchOpen(true); } }, '×') : null,
      searchOpen && searchGroups.length ? React.createElement('div', {
        style: { position: 'absolute', top: 42, left: 0, width: 300, maxHeight: 420, overflowY: 'auto', background: '#0b1120', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 12, boxShadow: '0 18px 50px rgba(0,0,0,0.55)', zIndex: 60, padding: '4px 0', animation: 'hasPop .14s ease' }
      },
        searchGroups.map((g, gi) => React.createElement(React.Fragment, { key: gi },
          React.createElement('div', { style: { fontSize: 10, color: '#6f7b8f', textTransform: 'uppercase', letterSpacing: 1, padding: '9px 13px 4px', fontWeight: 600 } }, g.head),
          g.items.map((it, ii) => React.createElement('div', {
            key: gi + '_' + ii,
            onMouseDown: (e) => { e.preventDefault && e.preventDefault(); it.act(); setSearchOpen(false); setSearchVal(''); },
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 13px', cursor: 'pointer', transition: 'background .12s' },
            onMouseEnter: (e) => e.currentTarget.style.background = 'rgba(148,163,184,0.08)',
            onMouseLeave: (e) => e.currentTarget.style.background = 'transparent'
          },
            React.createElement('span', { style: { width: 7, height: 7, borderRadius: '50%', flex: 'none', background: it.color } }),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 13, color: '#eef2f8', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, it.label),
              React.createElement('div', { style: { fontSize: 11, color: '#8794a8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, it.sub)),
            React.createElement('span', { style: { fontSize: 10, color: '#6f7b8f', flex: 'none', border: '1px solid rgba(148,163,184,0.18)', borderRadius: 5, padding: '1px 6px' } }, it.kind)))
        ))) : null
  ));

  // 面包屑 + 主题信息
  const breadcrumb = React.createElement('div', { className: 'has-breadcrumb' },
    React.createElement('div', { className: 'crumb' },
      React.createElement('a', { onClick: () => nav && nav('home'), style: { cursor: 'pointer' } }, '首页'),
      React.createElement('span', { className: 'sep' }, '/'),
      React.createElement('span', null, '历史地图'),
      React.createElement('span', { className: 'sep' }, '/'),
      React.createElement('span', { style: { color: '#aeb8c8' } }, th.name)),
    React.createElement('div', { className: 'meta-row' },
      React.createElement('h1', null, th.name),
      React.createElement('span', { className: 'period' }, '时间范围 ' + th.period),
      React.createElement('span', { className: 'type' }, th.type),
      React.createElement('span', { className: 'acc-badge', onClick: () => setAccuracyOpen(!accuracyOpen) },
        React.createElement('span', { className: 'dot' }), '精度：' + th.accuracy))
  );

  // 左侧栏：主题切换 + 路线 + 图层 + 图例 + 数据来源
  const accColor = { '精确': '#7fc79c', '推定': '#f2c94c', '示意': '#9aa6b8' };
  const accBgConst = { '精确': 'rgba(127,199,156,.14)', '推定': 'rgba(242,201,76,.14)', '示意': 'rgba(148,163,184,.14)' };
  const aside = React.createElement('aside', { className: 'has-aside' },
    React.createElement('div', { className: 'has-theme-tabs' },
      React.createElement('div', { className: 'has-section-hd' }, '地图专题'),
      themes.map(t => React.createElement('button', {
        key: t.id, className: themeId === t.id ? 'on' : '',
        onClick: () => selectTheme(t.id)
      },
        React.createElement('span', { className: 'name' }, t.name),
        React.createElement('span', { className: 'meta' }, t.period + ' · ' + t.routes.length + ' 条路线')))),
    React.createElement('div', { className: 'has-section-div' }),
    React.createElement('div', { className: 'has-route-list' },
      React.createElement('div', { className: 'hd' },
        React.createElement('span', { className: 'title' }, '路线'),
        React.createElement('button', { className: 'clear', onClick: clearSelection }, '显示全部')),
      React.createElement('div', { className: 'items' },
        th.routes.map(r => {
          const isSel = selectedRouteId === r.id;
          const showTag = r.accuracy === '推定' || r.accuracy === '示意';
          return React.createElement('div', {
            key: r.id, className: 'item' + (isSel ? ' on' : ''),
            onClick: () => selectRoute(r.id)
          },
            React.createElement('div', { className: 'row' },
              React.createElement('span', { className: 'bar', style: { background: r.color } }),
              React.createElement('div', { className: 'label' },
                React.createElement('div', { className: 'name' },
                  React.createElement('span', null, r.name),
                  showTag ? React.createElement('span', { style: { fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 10, color: accColor[r.accuracy], background: accBgConst[r.accuracy] } }, r.accuracy) : null),
                React.createElement('div', { className: 'sub' }, (r.year0 ? (r.year0 + (r.year1 && r.year1 !== r.year0 ? ('–' + r.year1) : '')) : '商贸路线') + ' · ' + r.nodes.length + ' 点')),
              React.createElement('input', {
                type: 'checkbox', className: 'chk', checked: !hidden[r.id],
                onClick: (e) => { e.stopPropagation(); toggleRoute(r.id); },
                onChange: () => {}
              })),
            React.createElement('div', { className: 'path' }, r.nodes.map(n => n.name).slice(0, 5).join(' → ') + (r.nodes.length > 5 ? ' …' : '')));
        }))),
    React.createElement('div', { className: 'has-section-div' }),
    React.createElement('div', { className: 'has-layers' },
      React.createElement('div', { className: 'has-section-hd' }, '图层'),
      [['routes', '路线'], ['places', '地点'], ['rivers', '水系'], ['territory', '疆域'], ['labels', '史料标注'], ['grid', '经纬网']].map(([k, label]) => {
        const on = layers[k];
        return React.createElement('div', { key: k, className: 'row' },
          React.createElement('div', { className: 'toggle' + (on ? ' on' : ''), onClick: () => toggleLayer(k) },
            React.createElement('div', { className: 'knob' })),
          React.createElement('span', { className: 'label' }, label),
          React.createElement('input', { type: 'range', min: 0, max: 100, value: layerOpacity[k], onChange: (e) => setLayerOp(k, e.target.value) }));
      })),
    React.createElement('div', { className: 'has-section-div' }),
    React.createElement('div', { className: 'has-legend' },
      React.createElement('div', { className: 'has-section-hd' }, '图例'),
      React.createElement('div', { className: 'grid' },
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 12, height: 12, borderRadius: '50%', background: 'rgba(214,179,63,0.18)', border: '2px solid #d6b33f' } }), '都城'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 10, height: 10, borderRadius: '50%', background: '#5aa2f2' } }), '普通地点'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 10, height: 10, background: '#e9855b', transform: 'rotate(45deg)' } }), '战役'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 10, height: 10, border: '2px solid #67c7b7', borderRadius: 2 } }), '关隘'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 12, height: 12, borderRadius: '50%', border: '2px solid #5aa2f2' } }), '港口'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 22, height: 0, borderTop: '2.5px solid #d6b33f' } }), '精确路线'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 22, height: 0, borderTop: '2.5px dashed #d6b33f' } }), '推定路线'),
        React.createElement('div', { className: 'item' }, React.createElement('span', { style: { width: 12, height: 12, borderRadius: '50%', border: '1.4px dashed #e75f5f' } }), '敌军据点')
      )),
    React.createElement('div', { className: 'has-section-div' }),
    React.createElement('div', { className: 'has-sources' },
      React.createElement('div', { className: 'has-section-hd' }, '数据来源'),
      (th.sources || []).map((s, i) => React.createElement('div', { key: i, className: 'item' }, s)))
  );

  // 主画布
  const panningHandlers = { isPanning: panRef.current.panning, onStart: onPanStart };
  const canvas = React.createElement(HasMapCanvas, {
    state: state, setState: setState,
    themes: themes,
    onSelectRoute: selectRoute,
    onSelectNode: selectNode,
    onCanvasClick: onCanvasClick,
    panningHandlers: panningHandlers
  });

  // 控制按钮
  const ctrls = React.createElement('div', { className: 'has-map-ctl' },
    React.createElement('button', { title: '重置视角', onClick: resetView }, '⌖'),
    React.createElement('button', { title: '导出 / 分享地图', onClick: () => alert('导出功能开发中…') }, '↑'));

  // 底图选择
  const basemapDef = [
    { k: 'dark', label: '深色现代底图', desc: 'CartoDB Dark · 默认', sw: '#0f1729' },
    { k: 'scan', label: '晚清扫描底图', desc: 'David Rumsey · 配准', sw: '#2b2517' },
    { k: 'none', label: '无底图示意', desc: '纯路线叙事模式', sw: '#070b17' }
  ];
  const basemapLabel = { dark: '深色', scan: '历史扫描', none: '无底图' }[basemap];
  const basemapPanel = React.createElement('div', { className: 'has-basemap-pick' },
    React.createElement('button', { className: 'trigger', onClick: () => setBasemapOpen(!basemapOpen) },
      React.createElement('span', null, '🗺️'),
      React.createElement('span', null, '底图：' + basemapLabel)),
    basemapOpen ? React.createElement('div', { className: 'menu' },
      basemapDef.map(b => React.createElement('div', {
        key: b.k, className: 'opt' + (basemap === b.k ? ' on' : ''),
        onClick: () => selectBasemap(b.k)
      },
        React.createElement('span', { className: 'swatch', style: { background: b.sw } }),
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 13, fontWeight: 600, color: '#eef2f8' } }, b.label),
          React.createElement('div', { style: { fontSize: 11, color: '#8794a8' } }, b.desc)))
      )) : null);

  // 缩放
  const zoomPanel = React.createElement('div', { className: 'has-zoom' },
    React.createElement('button', { onClick: zoomIn }, '+'),
    React.createElement('button', { onClick: zoomOut }, '−'));

  // 时间线播放条
  let tlStart = '—', tlEnd = '—', tlCurrent = '—', tlEvent = '选择一条路线后即可播放', tlTicks = [], progressPct = '0%';
  if (sel) {
    const n = sel.nodes.length; const idx = reachedIdx(sel, playT);
    tlStart = sel.year0 ? String(sel.year0) : '起';
    tlEnd = sel.year1 ? String(sel.year1) : '止';
    const cn = sel.nodes[idx];
    tlCurrent = cn.year ? String(cn.year) : ('第 ' + (idx + 1) + ' 站');
    tlEvent = cn.name + ' · ' + cn.event;
    progressPct = (playT * 100).toFixed(1) + '%';
    tlTicks = sel.nodes.map((nd, i) => ({ pos: (n > 1 ? (i / (n - 1) * 100) : 0).toFixed(1) + '%' }));
  }
  const speedOptions = [1, 2, 5];
  const timelineBar = React.createElement('div', { className: 'has-timeline-bar' },
    React.createElement('button', { className: 'play', disabled: !sel, onClick: togglePlay },
      playing ? React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' },
        React.createElement('rect', { x: 6, y: 5, width: 4, height: 14, rx: 1 }),
        React.createElement('rect', { x: 14, y: 5, width: 4, height: 14, rx: 1 }))
        : React.createElement('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'currentColor' },
          React.createElement('path', { d: 'M7 5l12 7-12 7z' }))),
    React.createElement('div', { className: 'tl', onClick: seekTimeline },
      React.createElement('div', { className: 'fill', style: { width: progressPct } }),
      tlTicks.map((t, i) => React.createElement('div', { key: i, className: 'tick', style: { left: t.pos } }))),
    React.createElement('div', { className: 'info' },
      React.createElement('div', { className: 'yr' }, tlStart + ' – ' + tlEnd + ' · ' + tlCurrent),
      React.createElement('div', { className: 'ev' }, tlEvent)),
    React.createElement('div', { className: 'speed' },
      speedOptions.map(sp => React.createElement('button', {
        key: sp, className: speed === sp ? 'on' : '',
        onClick: () => setSpeed(sp)
      }, sp + 'x'))));

  // 精度说明面板
  const accuracyPanel = accuracyOpen ? React.createElement('div', { className: 'has-accuracy-panel' },
    React.createElement('div', { className: 'hd' },
      React.createElement('b', null, '精度等级说明'),
      React.createElement('span', { className: 'close', onClick: () => setAccuracyOpen(false) }, '×')),
    React.createElement('p', null, React.createElement('b', { style: { color: '#7fc79c' } }, '精确'), '：地点有原始史料或现代考古坐标直接引证。'),
    React.createElement('p', null, React.createElement('b', { style: { color: '#f2c94c' } }, '推定'), '：基于史料记载与历史地名考证推定的位置，可能与现代地名略有偏差。'),
    React.createElement('p', null, React.createElement('b', { style: { color: '#9aa6b8' } }, '示意'), '：仅作路线示意，具体地点待考。'),
    React.createElement('p', { style: { marginTop: 10, color: '#6f7b8f' } }, '地图精度等级源自 HAS 数据规范，与史源等级正相关。')) : null;

  // Hover 提示
  const hoverEl = hover ? React.createElement('div', {
    className: 'has-hover',
    style: {
      left: (hover.x / HAS_W * 100) + '%',
      top: (hover.y / HAS_H * 100) + '%'
    }
  },
    React.createElement('div', { className: 'n' }, hover.name),
    React.createElement('div', { className: 's' }, hover.sub)) : null;

  // 抽屉（节点 / 路线）
  let drawerEl = null;
  if (drawerType === 'node' && selectedNode) {
    const r = th.routes.find(x => x.id === selectedNode.routeId);
    const nd = r && r.nodes[selectedNode.idx];
    if (r && nd) {
      drawerEl = React.createElement(HasNodeDrawer, {
        route: r, node: nd,
        onClose: closeDrawer,
        onJumpRoute: (rid) => selectRoute(rid),
        onJumpNode: (rid, idx) => selectNode(rid, idx)
      });
    }
  } else if (drawerType === 'route' && sel) {
    drawerEl = React.createElement(HasRouteDrawer, {
      route: sel,
      onClose: closeDrawer,
      onJumpNode: (rid, idx) => selectNode(rid, idx)
    });
  }

  // 主结构
  return React.createElement('div', { className: 'has-map-shell fade-up' },
    topbar,
    React.createElement('div', { className: 'has-body' },
      breadcrumb,
      React.createElement('div', { className: 'has-main' },
        aside,
        React.createElement('div', { className: 'has-canvas-wrap' },
          canvas,
          ctrls,
          basemapPanel,
          zoomPanel,
          accuracyPanel,
          timelineBar,
          hoverEl),
        drawerEl))
  );
}

// 暴露给 app.js
Object.assign(window, { NewMapPage, HAS_THEMES });