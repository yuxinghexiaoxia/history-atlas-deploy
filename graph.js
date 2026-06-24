/* ============ 历史星图 · 可交互关系图谱（力导向） ============ */
/* 人物=圆形 事件=矩形 地点=菱形；金色中心节点；关系线按类型着色 */

function buildGraph(centerId, depth) {
  const nodes = {},
    links = [];
  const linkSeen = new Set();
  function addNode(id, layer) {
    const o = DB.get(id);
    if (!o) return;
    if (!nodes[id]) nodes[id] = {
      id,
      type: o.type,
      name: o.name,
      layer,
      obj: o
    };else nodes[id].layer = Math.min(nodes[id].layer, layer);
  }
  function addLink(a, b, type, label, desc) {
    const k = [a, b].sort().join("|") + "|" + type;
    if (linkSeen.has(k) || a === b) return;
    linkSeen.add(k);
    links.push({
      source: a,
      target: b,
      type,
      label,
      desc
    });
  }
  function expand(id, layer) {
    const o = DB.get(id);
    if (!o) return;
    if (o.type === "person") {
      (o.relations || []).forEach(r => {
        if (!DB.get(r.to)) return;
        addNode(r.to, layer + 1);
        addLink(id, r.to, r.type, r.label, r.desc);
      });
      (o.events || []).forEach(ev => {
        if (!DB.events[ev]) return;
        addNode(ev, layer + 1);
        addLink(id, ev, "PARTICIPATED_IN", "参与", DB.events[ev].name);
      });
    } else if (o.type === "event") {
      (o.persons || []).forEach(pid => {
        if (!DB.persons[pid]) return;
        addNode(pid, layer + 1);
        addLink(pid, id, "PARTICIPATED_IN", "参与", o.name);
      });
      (o.related || []).forEach(rid => {
        if (!DB.events[rid]) return;
        addNode(rid, layer + 1);
        addLink(id, rid, "CAUSES", "关联", rid);
      });
    }
  }
  addNode(centerId, 0);
  for (let d = 0; d < depth; d++) {
    const frontier = Object.values(nodes).filter(n => n.layer === d).map(n => n.id);
    frontier.forEach(id => expand(id, d));
  }
  return {
    nodes: Object.values(nodes),
    links
  };
}
function KnowledgeGraph({
  centerId,
  height = 540,
  expandable = true,
  onNav,
  showHeader = true
}) {
  const wrapRef = useRef(null);
  const [depth, setDepth] = useState(1);
  const [W, setW] = useState(900);
  const H = height;
  const [, force] = useState(0);
  const sim = useRef({
    nodes: [],
    links: [],
    nmap: {},
    alpha: 0,
    raf: 0
  });
  const drag = useRef(null);
  const [tip, setTip] = useState(null);
  const [relFilter, setRelFilter] = useState(null);

  // measure width
  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(es => {
      for (const e of es) setW(e.contentRect.width);
    });
    ro.observe(wrapRef.current);
    setW(wrapRef.current.clientWidth);
    return () => ro.disconnect();
  }, []);

  // (re)build graph on center/depth change
  useEffect(() => {
    const g = buildGraph(centerId, depth);
    const cx = W / 2,
      cy = H / 2;
    const nmap = {};
    g.nodes.forEach((n, i) => {
      const prev = sim.current.nmap[n.id];
      if (prev) {
        n.x = prev.x;
        n.y = prev.y;
        n.vx = prev.vx;
        n.vy = prev.vy;
      } else if (n.layer === 0) {
        n.x = cx;
        n.y = cy;
        n.vx = 0;
        n.vy = 0;
      } else {
        const sameLayer = g.nodes.filter(m => m.layer === n.layer);
        const idx = sameLayer.indexOf(n);
        const cnt = sameLayer.length;
        const r = n.layer === 1 ? Math.min(W, H) * 0.28 : Math.min(W, H) * 0.44;
        const ang = idx / cnt * Math.PI * 2 - Math.PI / 2;
        n.x = cx + Math.cos(ang) * r;
        n.y = cy + Math.sin(ang) * r;
        n.vx = 0;
        n.vy = 0;
      }
      n.fx = n.layer === 0 ? cx : null;
      n.fy = n.layer === 0 ? cy : null;
      nmap[n.id] = n;
    });
    sim.current.nodes = g.nodes;
    sim.current.links = g.links;
    sim.current.nmap = nmap;
    sim.current.alpha = 1;
    runSim();
    return () => cancelAnimationFrame(sim.current.raf);
    // eslint-disable-next-line
  }, [centerId, depth, W, H]);
  function runSim() {
    cancelAnimationFrame(sim.current.raf);
    const step = () => {
      const S = sim.current;
      const {
        nodes,
        links,
        nmap
      } = S;
      const cx = W / 2,
        cy = H / 2;
      const REP = W * 9.5;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x,
            dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = Math.random() - .5;
            dy = Math.random() - .5;
            d2 = dx * dx + dy * dy + 1;
          }
          const d = Math.sqrt(d2);
          const f = REP / d2;
          const fx = dx / d * f,
            fy = dy / d * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
      }
      const LEN = n => n ? n.layer === 1 ? Math.min(W, H) * 0.30 : 120 : 120;
      links.forEach(l => {
        const a = nmap[l.source],
          b = nmap[l.target];
        if (!a || !b) return;
        let dx = b.x - a.x,
          dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = Math.max(LEN(a), LEN(b));
        const k = 0.04 * (d - target);
        const fx = dx / d * k,
          fy = dy / d * k;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      });
      nodes.forEach(n => {
        n.vx += (cx - n.x) * 0.012;
        n.vy += (cy - n.y) * 0.012;
      });
      const a = S.alpha;
      nodes.forEach(n => {
        if (n.fx != null) {
          n.x = n.fx;
          n.y = n.fy;
          n.vx = 0;
          n.vy = 0;
          return;
        }
        n.vx *= 0.80;
        n.vy *= 0.80;
        n.x += n.vx * a * 0.6;
        n.y += n.vy * a * 0.6;
        const m = 44;
        n.x = Math.max(m, Math.min(W - m, n.x));
        n.y = Math.max(m, Math.min(H - m, n.y));
      });
      S.alpha *= 0.97;
      force(v => v + 1);
      if (S.alpha > 0.012 || drag.current) S.raf = requestAnimationFrame(step);
    };
    sim.current.raf = requestAnimationFrame(step);
  }
  function toSvg(e) {
    const rect = wrapRef.current.getBoundingClientRect();
    const sx = W / rect.width,
      sy = H / rect.height;
    return {
      x: (e.clientX - rect.left) * sx,
      y: (e.clientY - rect.top) * sy
    };
  }
  function onDown(e, n) {
    e.stopPropagation();
    drag.current = n;
    sim.current.alpha = Math.max(sim.current.alpha, 0.5);
    const p = toSvg(e);
    n.fx = p.x;
    n.fy = p.y;
    runSim();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }
  function onMove(e) {
    if (!drag.current) return;
    const p = toSvg(e);
    drag.current.fx = p.x;
    drag.current.fy = p.y;
    setTip(t => t ? {
      ...t,
      x: e.clientX,
      y: e.clientY
    } : t);
  }
  function onUp() {
    if (drag.current && drag.current.layer !== 0) {
      drag.current.fx = null;
      drag.current.fy = null;
    }
    drag.current = null;
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    sim.current.alpha = Math.max(sim.current.alpha, 0.25);
    runSim();
  }
  const {
    nodes,
    links,
    nmap
  } = sim.current;
  const dimmed = relFilter ? new Set() : null;
  function nodeR(n) {
    return n.layer === 0 ? 27 : n.type === "event" ? 0 : 19;
  }
  return /*#__PURE__*/React.createElement("div", null, showHeader && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 13,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(RelationLegend, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, expandable && /*#__PURE__*/React.createElement("div", {
    className: "seg-ctl"
  }, /*#__PURE__*/React.createElement("button", {
    className: depth === 1 ? "on" : "",
    onClick: () => setDepth(1)
  }, "\u4E00\u5C42\u5173\u7CFB"), /*#__PURE__*/React.createElement("button", {
    className: depth === 2 ? "on" : "",
    onClick: () => setDepth(2)
  }, "\u4E8C\u5C42\u5C55\u5F00")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => rebuild()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 14
  }), "\u91CD\u65B0\u5E03\u5C40"))), /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      position: "relative",
      width: "100%",
      height: H,
      background: "radial-gradient(circle at 50% 45%,rgba(74,144,226,.06),transparent 60%),var(--bg-3)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    style: {
      display: "block",
      cursor: drag.current ? "grabbing" : "default"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: W / 2,
    cy: H / 2,
    r: Math.min(W, H) * 0.30,
    fill: "none",
    stroke: "rgba(212,175,55,.10)",
    strokeWidth: "1"
  }), depth === 2 && /*#__PURE__*/React.createElement("circle", {
    cx: W / 2,
    cy: H / 2,
    r: Math.min(W, H) * 0.44,
    fill: "none",
    stroke: "rgba(255,255,255,.05)",
    strokeWidth: "1"
  }), links.map((l, i) => {
    const a = nmap[l.source],
      b = nmap[l.target];
    if (!a || !b) return null;
    const m = DB.relMeta[l.type] || {
      color: "var(--text-3)",
      w: 2,
      dash: ""
    };
    const on = !relFilter || l.type === relFilter || relFilter === "TEACHER_OF" && l.type === "STUDENT_OF";
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      stroke: m.color,
      strokeWidth: m.w,
      strokeDasharray: m.dash,
      strokeLinecap: "round",
      opacity: on ? 0.7 : 0.08
    });
  }), nodes.map(n => {
    const center = n.layer === 0;
    const r = nodeR(n);
    const col = center ? "var(--gold)" : n.type === "event" ? "var(--blue)" : n.type === "location" ? "var(--rel-colleague)" : "#cdd5e3";
    const isHover = tip && tip.node && tip.node.id === n.id;
    return /*#__PURE__*/React.createElement("g", {
      key: n.id,
      transform: `translate(${n.x},${n.y})`,
      style: {
        cursor: "pointer"
      },
      onPointerDown: e => onDown(e, n),
      onPointerEnter: e => setTip({
        node: n,
        x: e.clientX,
        y: e.clientY
      }),
      onPointerLeave: () => {
        if (!drag.current) setTip(null);
      },
      onClick: e => {
        if (drag.current) return;
        onNav && onNav(n.type === "event" ? "event" : n.type === "person" ? "person" : null, n.id);
      }
    }, center && /*#__PURE__*/React.createElement("circle", {
      r: r + 9,
      fill: "none",
      stroke: "var(--gold)",
      strokeWidth: "1.2",
      opacity: ".35"
    }), isHover && /*#__PURE__*/React.createElement("circle", {
      r: r + 7,
      fill: "none",
      stroke: col,
      strokeWidth: "1.4",
      opacity: ".6"
    }), n.type === "event" ? /*#__PURE__*/React.createElement("rect", {
      x: -30,
      y: -17,
      width: 60,
      height: 34,
      rx: 6,
      fill: "var(--card-2)",
      stroke: col,
      strokeWidth: center ? 2.4 : 2
    }) : n.type === "location" ? /*#__PURE__*/React.createElement("rect", {
      x: -15,
      y: -15,
      width: 30,
      height: 30,
      transform: "rotate(45)",
      rx: 4,
      fill: "var(--card-2)",
      stroke: col,
      strokeWidth: 2
    }) : /*#__PURE__*/React.createElement("circle", {
      r: r,
      fill: center ? "rgba(212,175,55,.18)" : "var(--card-2)",
      stroke: col,
      strokeWidth: center ? 2.6 : 2
    }), /*#__PURE__*/React.createElement("text", {
      textAnchor: "middle",
      dy: n.type === "event" ? 5 : 5,
      style: {
        fontFamily: "var(--font-serif)",
        fontWeight: center ? 700 : 600,
        fontSize: center ? 15 : n.type === "event" ? 12.5 : 12.5,
        fill: center ? "var(--gold)" : "var(--text)",
        pointerEvents: "none",
        paintOrder: "stroke",
        stroke: "var(--bg-3)",
        strokeWidth: n.type === "event" ? 0 : 3
      }
    }, n.type === "event" ? n.name.length > 5 ? n.name.slice(0, 4) + "…" : n.name : n.name));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 14,
      bottom: 12,
      fontSize: 12,
      color: "var(--text-3)",
      display: "flex",
      gap: 14,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u62D6\u62FD\u79FB\u52A8\u8282\u70B9"), /*#__PURE__*/React.createElement("span", null, "\u60AC\u505C\u770B\u6458\u8981"), /*#__PURE__*/React.createElement("span", null, "\u70B9\u51FB\u8FDB\u5165\u8BE6\u60C5\u9875"))), tip && /*#__PURE__*/React.createElement("div", {
    className: "g-tip show",
    style: {
      left: Math.min(tip.x + 16, window.innerWidth - 280),
      top: tip.y + 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 5
    }
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: tip.node.type,
    size: 11
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 14.5,
      fontFamily: "var(--font-serif)"
    }
  }, tip.node.name), tip.node.layer === 0 && /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      height: 18,
      fontSize: 10,
      background: "var(--gold-soft)",
      color: "var(--gold)"
    }
  }, "\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-2)",
      lineHeight: 1.55
    }
  }, tip.node.obj.short || tip.node.obj.desc || ""), tip.node.obj.born && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-3)",
      marginTop: 5,
      fontFamily: "var(--font-num)"
    }
  }, tip.node.obj.born, "\u2013", tip.node.obj.died)));
  function rebuild() {
    sim.current.nmap = {};
    const g = buildGraph(centerId, depth);
    const cx = W / 2,
      cy = H / 2;
    const nmap = {};
    g.nodes.forEach(n => {
      if (n.layer === 0) {
        n.x = cx;
        n.y = cy;
      } else {
        const sl = g.nodes.filter(m => m.layer === n.layer);
        const idx = sl.indexOf(n);
        const r = n.layer === 1 ? Math.min(W, H) * 0.28 : Math.min(W, H) * 0.44;
        const ang = idx / sl.length * Math.PI * 2 - Math.PI / 2;
        n.x = cx + Math.cos(ang) * r;
        n.y = cy + Math.sin(ang) * r;
      }
      n.vx = 0;
      n.vy = 0;
      n.fx = n.layer === 0 ? cx : null;
      n.fy = n.layer === 0 ? cy : null;
      nmap[n.id] = n;
    });
    sim.current.nodes = g.nodes;
    sim.current.links = g.links;
    sim.current.nmap = nmap;
    sim.current.alpha = 1;
    runSim();
  }
}
Object.assign(window, {
  KnowledgeGraph,
  buildGraph
});