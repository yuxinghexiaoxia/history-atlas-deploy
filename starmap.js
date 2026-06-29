/* ============ 历史星图 · 沉浸式星图 Hero（Canvas 动效） ============ */
/* 星空视差 + 流星 + 星云辉光 + 会发光、脉冲流动的人物星座 */

const FALLBACK_FIGURES = [{
  id: "zengguofan",
  kind: "person",
  x: 50,
  y: 14,
  big: true
}, {
  id: "zuozongtang",
  kind: "person",
  x: 19,
  y: 27
}, {
  id: "lihongzhang",
  kind: "person",
  x: 81,
  y: 27
}, {
  id: "hongxiuquan",
  kind: "person",
  x: 13,
  y: 60
}, {
  id: "cixi",
  kind: "person",
  x: 87,
  y: 57
}, {
  id: "taiping",
  kind: "event",
  x: 31,
  y: 85
}, {
  id: "yangwu",
  kind: "event",
  x: 70,
  y: 85
}];
const FALLBACK_EDGES = [[0, 1], [0, 2], [0, 5], [0, 6], [1, 4], [1, 6], [1, 5], [3, 5], [2, 6], [1, 2]];
function StarmapHero({
  nav
}) {
  const smFigures = React.useMemo(function() {
    if (!DB.persons || Object.keys(DB.persons).length === 0) {
      return FALLBACK_FIGURES;
    }
    var persons = Object.values(DB.persons).filter(function(p) { return p.born && p.died; }).slice(0, 30);
    return persons.map(function(p, i) {
      return {
        id: p.id,
        kind: "person",
        x: (i * 37 + 15) % 100,
        y: ((i * 53 + 10) % 80) + 10,
        big: i < 3
      };
    });
  }, []);
  const smEdges = React.useMemo(function() {
    if (!DB.persons || Object.keys(DB.persons).length === 0) {
      return FALLBACK_EDGES;
    }
    var edges = [];
    var n = smFigures.length;
    for (var i = 0; i < n; i++) {
      edges.push([i, (i + 1) % n]);
      if (i < 3) {
        edges.push([i, (i + 3) % n]);
        edges.push([i, (i + 5) % n]);
      }
    }
    return edges;
  }, [smFigures]);
  const wrapRef = useRef(null),
    canvasRef = useRef(null);
  const nodeEls = useRef({});
  const state = useRef({
    stars: [],
    shoot: [],
    mx: .5,
    my: .5,
    t0: performance.now(),
    raf: 0,
    W: 0,
    H: 0,
    dpr: 1
  });
  useEffect(() => {
    const wrap = wrapRef.current,
      cv = canvasRef.current,
      ctx = cv.getContext("2d");
    const S = state.current;
    function resize() {
      const r = wrap.getBoundingClientRect();
      S.W = r.width;
      S.H = r.height;
      S.dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = S.W * S.dpr;
      cv.height = S.H * S.dpr;
      ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
      // build stars (3 depth layers)
      const n = Math.round(S.W * S.H / 5200);
      S.stars = [];
      for (let i = 0; i < n; i++) {
        const layer = Math.random();
        S.stars.push({
          x: Math.random() * S.W,
          y: Math.random() * S.H,
          r: layer > 0.92 ? Math.random() * 1.4 + 1.2 : Math.random() * 1.0 + 0.35,
          a: Math.random() * 0.5 + 0.25,
          ph: Math.random() * 6.28,
          sp: Math.random() * 1.6 + 0.4,
          depth: 0.3 + layer * 1.2,
          gold: Math.random() > 0.86
        });
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    function nodePx(f) {
      // gentle float keeps constellation alive
      const t = performance.now() - S.t0;
      const fx = Math.sin(t * 0.0006 + f.x) * 5,
        fy = Math.cos(t * 0.0005 + f.y) * 5;
      return {
        x: f.x / 100 * S.W + fx,
        y: f.y / 100 * S.H + fy
      };
    }
    function spawnShoot() {
      const fromTop = Math.random() > .5;
      const x = Math.random() * S.W,
        y = Math.random() * S.H * 0.5;
      const ang = (Math.random() * 0.5 + 0.15) * Math.PI; // down-right
      S.shoot.push({
        x,
        y,
        vx: Math.cos(ang) * -9 - 4,
        vy: Math.sin(ang) * 7 + 3,
        life: 0,
        max: Math.random() * 40 + 40
      });
    }
    const drawProg = {
      v: 0
    };
    function frame() {
      const t = performance.now() - S.t0;
      drawProg.v = Math.min(1, t / 1600);
      ctx.clearRect(0, 0, S.W, S.H);
      // nebula glow
      const g1 = ctx.createRadialGradient(S.W * 0.74, S.H * 0.3, 0, S.W * 0.74, S.H * 0.3, S.W * 0.42);
      g1.addColorStop(0, "rgba(74,144,226,0.10)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, S.W, S.H);
      const g2 = ctx.createRadialGradient(S.W * 0.26, S.H * 0.78, 0, S.W * 0.26, S.H * 0.78, S.W * 0.4);
      g2.addColorStop(0, "rgba(212,175,55,0.08)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, S.W, S.H);

      // parallax offset
      const ox = S.mx - 0.5,
        oy = S.my - 0.5;
      // stars
      for (const s of S.stars) {
        const px = s.x + ox * 22 * s.depth,
          py = s.y + oy * 22 * s.depth;
        const tw = s.a + Math.sin(t * 0.001 * s.sp + s.ph) * 0.35;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, tw));
        ctx.fillStyle = s.gold ? "#e8c75a" : "#dfe7ff";
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, 6.2832);
        ctx.fill();
        if (s.r > 1.2) {
          ctx.globalAlpha *= 0.4;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 2.4, 0, 6.2832);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // node positions
      const P = smFigures.map(nodePx);
      // sync DOM node float transforms
      smFigures.forEach((f, i) => {
        const el = nodeEls.current[f.id];
        if (el) {
          const baseX = f.x / 100 * S.W,
            baseY = f.y / 100 * S.H;
          el.style.transform = `translate(-50%,-50%) translate(${P[i].x - baseX + ox * 30 * 1.3}px,${P[i].y - baseY + oy * 30 * 1.3}px)`;
        }
      });
      const cox = ox * 30 * 1.3,
        coy = oy * 30 * 1.3; // constellation parallax (match dom)

      // edges
      smEdges.forEach((e, k) => {
        const a = P[e[0]],
          b = P[e[1]];
        const ax = a.x + cox,
          ay = a.y + coy,
          bx = b.x + cox,
          by = b.y + coy;
        const prog = Math.max(0, Math.min(1, drawProg.v * 1.2 - k * 0.04));
        const ex = ax + (bx - ax) * prog,
          ey = ay + (by - ay) * prog;
        // base line
        ctx.strokeStyle = "rgba(212,175,55,0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        if (prog >= 1) {
          // travelling pulse
          const pp = (t * 0.00018 + k * 0.13) % 1;
          const gx = ax + (bx - ax) * pp,
            gy = ay + (by - ay) * pp;
          const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, 7);
          grd.addColorStop(0, "rgba(255,240,200,0.95)");
          grd.addColorStop(1, "transparent");
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(gx, gy, 7, 0, 6.2832);
          ctx.fill();
        }
      });

      // node halos on canvas (behind dom dot)
      P.forEach((p, i) => {
        const f = smFigures[i];
        const px = p.x + cox,
          py = p.y + coy;
        const gold = f.kind === "person";
        const col = f.big ? "212,175,55" : gold ? "205,213,227" : "74,144,226";
        const rr = f.big ? 34 : 22;
        const pulse = 0.6 + Math.sin(t * 0.0015 + i) * 0.4;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, rr);
        grd.addColorStop(0, `rgba(${col},${0.42 * pulse})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(px, py, rr, 0, 6.2832);
        ctx.fill();
      });

      // shooting stars
      if (Math.random() < 0.012 && S.shoot.length < 3) spawnShoot();
      for (let i = S.shoot.length - 1; i >= 0; i--) {
        const sh = S.shoot[i];
        sh.life++;
        sh.x += sh.vx;
        sh.y += sh.vy;
        const lf = 1 - sh.life / sh.max;
        if (lf <= 0 || sh.x < -50 || sh.y > S.H + 50) {
          S.shoot.splice(i, 1);
          continue;
        }
        const tx = sh.x - sh.vx * 5,
          ty = sh.y - sh.vy * 5;
        const grd = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grd.addColorStop(0, `rgba(255,250,235,${0.9 * lf})`);
        grd.addColorStop(1, "transparent");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      S.raf = requestAnimationFrame(frame);
    }
    S.raf = requestAnimationFrame(frame);
    function onMove(e) {
      const r = wrap.getBoundingClientRect();
      S.mx = (e.clientX - r.left) / r.width;
      S.my = (e.clientY - r.top) / r.height;
    }
    function onLeave() {
      S.mx = 0.5;
      S.my = 0.5;
    }
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(S.raf);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "smhero",
    ref: wrapRef,
    style: {
      minHeight: 640
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "smhero-vignette"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sm-constellation"
  }, smFigures.map(f => {
    const o = DB.get(f.id);
    if (!o) return null;
    const gold = f.kind === "person";
    const coreCol = f.big ? "#D4AF37" : gold ? "#dfe7ff" : "#4A90E2";
    const yr = o.born ? `${o.born}–${o.died}` : `${o.start}–${o.end}`;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      className: "cnode" + (f.big ? " big" : ""),
      ref: el => nodeEls.current[f.id] = el,
      style: {
        left: f.x + "%",
        top: f.y + "%"
      },
      onClick: () => nav(f.kind === "event" ? "event" : "person", f.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "ckind"
    }, gold ? "人物" : "事件"), /*#__PURE__*/React.createElement("span", {
      className: "halo",
      style: {
        background: `radial-gradient(circle,${gold ? "rgba(212,175,55,.4)" : "rgba(74,144,226,.4)"},transparent 70%)`
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "core",
      style: {
        background: coreCol,
        color: coreCol,
        boxShadow: `0 0 12px 2px ${coreCol}`,
        borderRadius: f.kind === "event" ? "3px" : "50%",
        animation: "nodePulse 3.2s ease-in-out infinite"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "clabel"
    }, o.name), /*#__PURE__*/React.createElement("span", {
      className: "cyr"
    }, yr));
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      zIndex: 3,
      maxWidth: 780,
      margin: "0 auto",
      minHeight: 640,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "60px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 18
    }
  }, "History Atlas \xB7 \u5386\u53F2\u661F\u56FE"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 52,
      lineHeight: 1.25,
      margin: "0 0 16px",
      fontWeight: 700
    }
  }, "\u6BCF\u4E00\u4E2A\u4EBA\u7269\uFF0C\u90FD\u662F", /*#__PURE__*/React.createElement("br", null), "\u5386\u53F2\u661F\u7A7A\u91CC\u7684", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, "\u4E00\u9897\u661F")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16.5,
      color: "var(--text-2)",
      margin: "0 0 30px",
      maxWidth: 520
    }
  }, "\u4E8C\u5341\u56DB\u53F2\u3001\u5B9E\u5F55\u3001\u5730\u65B9\u5FD7\u3001\u73B0\u4EE3\u7814\u7A76\u2014\u2014\u7ED3\u6784\u5316\u4E3A\u4E00\u5F20\u53EF\u63A2\u7D22\u7684\u5173\u7CFB\u661F\u56FE\u3002", /*#__PURE__*/React.createElement("br", null), "\u60AC\u505C\u70B9\u4EAE\u7FA4\u661F\uFF0C\u70B9\u51FB\u8FDB\u5165\u4EFB\u610F\u4EBA\u7269\u4E0E\u4E8B\u4EF6\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 600
    }
  }, /*#__PURE__*/React.createElement(SearchBox, {
    nav: nav,
    big: true
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 18,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
      fontSize: 12,
      color: "var(--text-3)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 5,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u5411\u4E0B\u63A2\u7D22\u671D\u4EE3\u957F\u6CB3\u4E0E\u70ED\u95E8\u6761\u76EE"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRight: "1.5px solid var(--text-3)",
      borderBottom: "1.5px solid var(--text-3)",
      transform: "rotate(45deg)",
      animation: "twinkle 2s infinite"
    }
  })));
}
Object.assign(window, {
  StarmapHero
});