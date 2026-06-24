/* ============ 历史星图 · 星座式关系图谱（Canvas · 辉光/粒子流） ============ */
/* 沉浸式渲染：中心金星 + 辉光节点 + 沿关系线流动的光粒子。 */

const REL_GROUP = {
  TEACHER_OF: "teacher",
  STUDENT_OF: "teacher",
  COLLEAGUE_OF: "colleague",
  RIVAL_OF: "rival",
  SERVE_AS: "serve",
  SPOUSE_OF: "kin",
  PARTICIPATED_IN: "event",
  LED: "event",
  CAUSES: "event"
};
const GROUP_META = {
  teacher: {
    label: "师生",
    color: "#D4AF37",
    dash: false,
    w: 2.6
  },
  colleague: {
    label: "同僚",
    color: "#7cc4a8",
    dash: false,
    w: 2.3
  },
  rival: {
    label: "敌对/政争",
    color: "#e0795a",
    dash: true,
    w: 2.3
  },
  serve: {
    label: "君臣",
    color: "#a98be0",
    dash: false,
    w: 2
  },
  kin: {
    label: "亲属",
    color: "#e0a85a",
    dash: false,
    w: 2.3
  },
  event: {
    label: "参与/关联",
    color: "#4A90E2",
    dash: true,
    w: 2
  }
};
const NODE_COLOR = {
  person: "#dbe4f5",
  event: "#4A90E2",
  location: "#7cc4a8"
};
function ConstellationGraph({
  centerId,
  depth,
  relFilter,
  selectedId,
  onSelect,
  onRecenter,
  layoutKey,
  canvasRef
}) {
  const wrapRef = useRef(null),
    cvsRef = useRef(null);
  React.useImperativeHandle(canvasRef, () => cvsRef.current);
  const S = useRef({
    nodes: [],
    links: [],
    nmap: {},
    pos: {},
    alpha: 1,
    t: 0,
    w: 800,
    h: 600,
    dpr: 1,
    stars: [],
    neb: []
  });
  const drag = useRef(null),
    hover = useRef(null),
    down = useRef(null);
  const cb = useRef({});
  cb.current = {
    onSelect,
    onRecenter
  };
  const rf = useRef({
    relFilter,
    selectedId
  });
  rf.current = {
    relFilter,
    selectedId
  };

  // build / rebuild graph
  function rebuild() {
    const g = buildGraph(centerId, depth);
    const st = S.current,
      cx = st.w / 2,
      cy = st.h / 2;
    const deg = {};
    g.links.forEach(l => {
      deg[l.source] = (deg[l.source] || 0) + 1;
      deg[l.target] = (deg[l.target] || 0) + 1;
    });
    const nmap = {};
    const layers = {};
    g.nodes.forEach(n => {
      (layers[n.layer] = layers[n.layer] || []).push(n);
    });
    g.nodes.forEach(n => {
      const prev = st.pos[n.id];
      if (n.layer === 0) {
        n.x = cx;
        n.y = cy;
      } else if (prev) {
        n.x = prev.x;
        n.y = prev.y;
      } else {
        const sl = layers[n.layer];
        const idx = sl.indexOf(n);
        const r = (n.layer === 1 ? 0.30 : 0.46) * Math.min(st.w, st.h);
        const a = idx / sl.length * Math.PI * 2 - Math.PI / 2 + n.layer * 0.4;
        n.x = cx + Math.cos(a) * r;
        n.y = cy + Math.sin(a) * r;
      }
      n.vx = 0;
      n.vy = 0;
      n.deg = deg[n.id] || 1;
      n.fx = n.layer === 0 ? cx : null;
      n.fy = n.layer === 0 ? cy : null;
      nmap[n.id] = n;
    });
    st.nodes = g.nodes;
    st.links = g.links;
    st.nmap = nmap;
    st.alpha = 1;
  }

  // physics step
  function integrate() {
    const st = S.current;
    const {
      nodes,
      links,
      nmap,
      w,
      h
    } = st;
    const cx = w / 2,
      cy = h / 2;
    const REP = w * 9;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x,
          dy = a.y - b.y,
          d2 = dx * dx + dy * dy;
        if (d2 < 1) {
          dx = Math.random() - .5;
          dy = Math.random() - .5;
          d2 = dx * dx + dy * dy + 1;
        }
        const d = Math.sqrt(d2),
          f = REP / d2,
          fx = dx / d * f,
          fy = dy / d * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }
    links.forEach(l => {
      const a = nmap[l.source],
        b = nmap[l.target];
      if (!a || !b) return;
      let dx = b.x - a.x,
        dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const target = a.layer === 1 || b.layer === 1 ? Math.min(w, h) * 0.30 : 130;
      const k = 0.045 * (d - target),
        fx = dx / d * k,
        fy = dy / d * k;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    });
    nodes.forEach(n => {
      n.vx += (cx - n.x) * 0.011;
      n.vy += (cy - n.y) * 0.011;
    });
    const a = st.alpha;
    nodes.forEach(n => {
      if (n.fx != null) {
        n.x = n.fx;
        n.y = n.fy;
        n.vx = 0;
        n.vy = 0;
        return;
      }
      n.vx *= 0.82;
      n.vy *= 0.82;
      n.x += n.vx * a * 0.6;
      n.y += n.vy * a * 0.6;
      const m = 46;
      n.x = Math.max(m, Math.min(w - m, n.x));
      n.y = Math.max(m, Math.min(h - m, n.y));
    });
    st.alpha *= 0.975;
  }
  function nodeR(n) {
    return n.layer === 0 ? 30 : Math.min(13 + (n.deg || 1) * 2.2, 24);
  }
  function draw() {
    const st = S.current,
      c = cvsRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const {
      w,
      h,
      t,
      nodes,
      links,
      nmap
    } = st;
    const sel = rf.current.selectedId,
      flt = rf.current.relFilter,
      hv = hover.current && hover.current.id;
    ctx.clearRect(0, 0, w, h);
    // bg vignette
    let bg = ctx.createRadialGradient(w * 0.5, h * 0.46, 0, w * 0.5, h * 0.46, Math.max(w, h) * 0.72);
    bg.addColorStop(0, "#0e1731");
    bg.addColorStop(0.55, "#0a1124");
    bg.addColorStop(1, "#06080f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    // nebula drift
    ctx.globalCompositeOperation = "lighter";
    st.neb.forEach((nb, i) => {
      const nx = nb.x + Math.sin(t * 0.0004 + i) * 30,
        ny = nb.y + Math.cos(t * 0.0003 + i) * 24;
      const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, nb.r);
      g.addColorStop(0, nb.col);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });
    // stars
    st.stars.forEach(s => {
      const a = 0.18 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.002 * s.sp + s.ph));
      ctx.globalAlpha = a;
      ctx.fillStyle = s.g ? "#D4AF37" : "#fff";
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, 7);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    // orbit rings around center
    const cx = w / 2,
      cy = h / 2;
    ctx.strokeStyle = "rgba(212,175,55,.10)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(w, h) * 0.30, 0, 7);
    ctx.stroke();
    if (depth === 2) {
      ctx.strokeStyle = "rgba(255,255,255,.05)";
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.46, 0, 7);
      ctx.stroke();
    }

    // links
    links.forEach(l => {
      const a = nmap[l.source],
        b = nmap[l.target];
      if (!a || !b) return;
      const grp = REL_GROUP[l.type] || "event";
      const m = GROUP_META[grp];
      const touchSel = sel && (l.source === sel || l.target === sel);
      const touchHv = hv && (l.source === hv || l.target === hv);
      let alpha = 0.42;
      if (flt) alpha = flt === grp ? 0.95 : 0.06;else if (sel || hv) alpha = touchSel || touchHv ? 0.95 : 0.10;
      // base line
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = hexA(m.color, alpha);
      ctx.lineWidth = m.w;
      ctx.lineCap = "round";
      ctx.setLineDash(m.dash ? [6, 6] : []);
      ctx.lineDashOffset = 0;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.setLineDash([]);
      // flowing particles on highlighted (or all when idle & not filtered-out)
      const flow = flt ? flt === grp : sel || hv ? touchSel || touchHv : true;
      if (flow) {
        ctx.globalCompositeOperation = "lighter";
        const np = 2;
        const dx = b.x - a.x,
          dy = b.y - a.y;
        for (let k = 0; k < np; k++) {
          let ph = (t * 0.00022 + k / np + l.source.length * 0.13) % 1;
          const px = a.x + dx * ph,
            py = a.y + dy * ph;
          const rr = 2.3 * (touchSel || touchHv || flt ? 1.5 : 1);
          const g = ctx.createRadialGradient(px, py, 0, px, py, rr * 3.2);
          g.addColorStop(0, hexA(m.color, 0.95));
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(px, py, rr * 3.2, 0, 7);
          ctx.fill();
        }
      }
    });
    ctx.globalCompositeOperation = "source-over";

    // nodes
    nodes.forEach(n => {
      const center = n.layer === 0,
        r = nodeR(n);
      const col = center ? "#D4AF37" : NODE_COLOR[n.type] || "#dbe4f5";
      const isSel = sel === n.id,
        isHv = hv === n.id;
      let na = 1;
      if (flt) {
        const anyMatch = links.some(l => (l.source === n.id || l.target === n.id) && (REL_GROUP[l.type] || "event") === flt);
        na = center || anyMatch ? 1 : 0.22;
      } else if (sel || hv) {
        const near = n.id === (sel || hv) || links.some(l => (l.source === n.id || l.target === n.id) && (l.source === (sel || hv) || l.target === (sel || hv)));
        na = near ? 1 : 0.26;
      }
      // halo
      ctx.globalCompositeOperation = "lighter";
      const hr = r * (center ? 3.4 : 2.5) * (isSel || isHv ? 1.25 : 1);
      const hg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, hr);
      hg.addColorStop(0, hexA(col, (center ? 0.5 : 0.32) * na));
      hg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = hg;
      ctx.beginPath();
      ctx.arc(n.x, n.y, hr, 0, 7);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = na;
      if (center) {
        // pulsing rings
        for (let i = 0; i < 2; i++) {
          const pr = r + 10 + (t * 0.03 + i * 22) % 44;
          const pa = 0.5 * (1 - (t * 0.03 + i * 22) % 44 / 44);
          ctx.strokeStyle = hexA("#D4AF37", pa);
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pr, 0, 7);
          ctx.stroke();
        }
        ctx.strokeStyle = "rgba(212,175,55,.4)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 8, 0, 7);
        ctx.stroke();
      }
      // glyph
      ctx.lineWidth = center ? 2.8 : isSel ? 2.6 : 2;
      ctx.strokeStyle = col;
      ctx.fillStyle = center ? "rgba(212,175,55,.20)" : "#141d33";
      if (n.type === "event" && !center) {
        rrect(ctx, n.x - r, n.y - r * 0.82, r * 2, r * 1.64, 6);
        ctx.fill();
        ctx.stroke();
      } else if (n.type === "location") {
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(Math.PI / 4);
        rrect(ctx, -r * 0.8, -r * 0.8, r * 1.6, r * 1.6, 4);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, 7);
        ctx.fill();
        ctx.stroke();
      }
      if (isSel) {
        ctx.strokeStyle = hexA(col, 0.7);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 6, 0, 7);
        ctx.stroke();
      }
      // label
      const big = center || isSel || isHv;
      const fs = center ? 16 : big ? 14 : 12.5;
      ctx.font = `${center || isSel ? 700 : 600} ${fs}px "Noto Serif SC",serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const ly = n.y + r + (center ? 16 : 13);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(6,8,15,.92)";
      ctx.lineJoin = "round";
      ctx.strokeText(n.name, n.x, ly);
      ctx.fillStyle = center ? "#e8c75a" : big ? "#fff" : "#c7cedb";
      ctx.fillText(n.name, n.x, ly);
      if (big && n.obj) {
        const sub = n.obj.born ? `${n.obj.born}–${n.obj.died}` : n.obj.start ? `${n.obj.start}–${n.obj.end}` : "";
        if (sub) {
          ctx.font = '11px "Spectral",serif';
          ctx.lineWidth = 3.5;
          ctx.strokeStyle = "rgba(6,8,15,.9)";
          ctx.strokeText(sub, n.x, ly + 15);
          ctx.fillStyle = "#8b93a3";
          ctx.fillText(sub, n.x, ly + 15);
        }
      }
      ctx.globalAlpha = 1;
    });
  }
  function loop() {
    const st = S.current;
    st.t = performance.now();
    if (st.alpha > 0.012 || drag.current) integrate();
    draw();
    st.raf = requestAnimationFrame(loop);
  }

  // setup
  useEffect(() => {
    const st = S.current,
      c = cvsRef.current,
      wrap = wrapRef.current;
    function size() {
      const r = wrap.getBoundingClientRect();
      st.w = r.width;
      st.h = r.height;
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = st.w * st.dpr;
      c.height = st.h * st.dpr;
      c.style.width = st.w + "px";
      c.style.height = st.h + "px";
      c.getContext("2d").setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
    }
    size();
    st.stars = Array.from({
      length: 90
    }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + .4,
      sp: Math.random() * 1.5 + .5,
      ph: Math.random() * 7,
      g: Math.random() > .82
    }));
    st.neb = [{
      x: st.w * 0.32,
      y: st.h * 0.34,
      r: Math.min(st.w, st.h) * 0.5,
      col: "rgba(74,144,226,.10)"
    }, {
      x: st.w * 0.7,
      y: st.h * 0.62,
      r: Math.min(st.w, st.h) * 0.46,
      col: "rgba(212,175,55,.07)"
    }, {
      x: st.w * 0.5,
      y: st.h * 0.5,
      r: Math.min(st.w, st.h) * 0.4,
      col: "rgba(124,196,168,.05)"
    }];
    rebuild();
    const ro = new ResizeObserver(() => {
      size();
      st.neb[0].x = st.w * .32;
      st.neb[0].y = st.h * .34;
      st.neb[1].x = st.w * .7;
      st.neb[1].y = st.h * .62;
      const cx = st.w / 2,
        cy = st.h / 2;
      st.nodes.forEach(n => {
        if (n.fx != null) {
          n.fx = cx;
          n.fy = cy;
        }
      });
      st.alpha = Math.max(st.alpha, .4);
    });
    ro.observe(wrap);
    st.raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(st.raf);
      ro.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  // rebuild on center/depth/layout change
  useEffect(() => {
    // persist current positions before rebuild
    const st = S.current;
    st.nodes.forEach(n => {
      st.pos[n.id] = {
        x: n.x,
        y: n.y
      };
    });
    rebuild();
    st.alpha = 1;
    // eslint-disable-next-line
  }, [centerId, depth, layoutKey]);

  // pointer handlers
  function pos(e) {
    const r = cvsRef.current.getBoundingClientRect();
    return {
      x: e.clientX - r.left,
      y: e.clientY - r.top
    };
  }
  function pick(p) {
    const st = S.current;
    let best = null,
      bd = 1e9;
    st.nodes.forEach(n => {
      const r = nodeR(n) + 8;
      const d = Math.hypot(n.x - p.x, n.y - p.y);
      if (d < r && d < bd) {
        bd = d;
        best = n;
      }
    });
    return best;
  }
  function onMove(e) {
    const p = pos(e);
    if (drag.current) {
      drag.current.fx = p.x;
      drag.current.fy = p.y;
      S.current.alpha = Math.max(S.current.alpha, .35);
      if (down.current) {
        const d = Math.hypot(p.x - down.current.x, p.y - down.current.y);
        if (d > 4) down.current.moved = true;
      }
      return;
    }
    const n = pick(p);
    hover.current = n;
    cvsRef.current.style.cursor = n ? "pointer" : "default";
  }
  function onDown(e) {
    const p = pos(e);
    const n = pick(p);
    if (n) {
      drag.current = n;
      down.current = {
        x: p.x,
        y: p.y,
        moved: false,
        node: n
      };
      if (n.layer !== 0) {
        n.fx = p.x;
        n.fy = p.y;
      }
      S.current.alpha = Math.max(S.current.alpha, .5);
    } else {
      down.current = {
        x: p.x,
        y: p.y,
        moved: false,
        node: null
      };
    }
  }
  function onUp() {
    const d = down.current;
    if (d && !d.moved) {
      if (d.node) cb.current.onSelect && cb.current.onSelect(d.node.id);else cb.current.onSelect && cb.current.onSelect(null);
    }
    if (drag.current && drag.current.layer !== 0) {
      drag.current.fx = null;
      drag.current.fy = null;
    }
    drag.current = null;
    down.current = null;
  }
  function onDbl(e) {
    const n = pick(pos(e));
    if (n && n.layer !== 0) cb.current.onRecenter && cb.current.onRecenter(n.id);
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      position: "absolute",
      inset: 0
    },
    onPointerMove: onMove,
    onPointerDown: onDown,
    onPointerUp: onUp,
    onPointerLeave: () => {
      if (!drag.current) hover.current = null;
    },
    onDoubleClick: onDbl
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cvsRef,
    style: {
      display: "block",
      touchAction: "none"
    }
  }));
}

/* helpers */
function hexA(hex, a) {
  if (hex[0] !== "#") return hex;
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
Object.assign(window, {
  ConstellationGraph,
  GROUP_META,
  REL_GROUP
});