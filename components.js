/* ============ 历史星图 · 共享组件 ============ */
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

/* ---- icons (stroke, 24 viewbox) ---- */
const ICONS = {
  search: "M11 4a7 7 0 1 0 4.95 11.95L20 20M11 4a7 7 0 0 1 0 14",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20c0-3.3 3.1-6 7-6s7 2.7 7 6",
  event: "M4 7h16v13H4zM4 7l3-3h10l3 3M9 11h6M9 15h4",
  location: "M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  book: "M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V4ZM5 4v16",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  network: "M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 6.5l3 9M16.5 6.5l-3 9M8 6h8",
  bookmark: "M6 4h12v16l-6-4-6 4z",
  export: "M12 15V4m0 0L8 8m4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4",
  sparkle: "M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3ZM18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  arrowL: "M19 12H5m6 6-6-6 6-6",
  chevR: "M9 6l6 6-6 6",
  close: "M6 6l12 12M18 6 6 18",
  filter: "M4 5h16l-6 7v6l-4 2v-8z",
  layers: "M12 3l9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  quote: "M7 7h4v6H7zM7 13c0 2 1 3 3 3M13 7h4v6h-4zM13 13c0 2 1 3 3 3",
  zhi: "M12 4v16M6 8l6-4 6 4",
  doc: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  heart: "M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z",
  send: "M5 12 21 4l-6 16-3.5-6.5L5 12Z",
  check: "M5 12.5 10 17 19 7",
  crown: "M4 8l4 4 4-7 4 7 4-4-1.5 10h-13L4 8Z",
  logout: "M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 12h10m0 0-3-3m3 3-3 3",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  lock: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9H5z",
  trash: "M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13",
  star: "M12 3l2.7 6.3L21 10l-5 4.3L17.5 21 12 17.4 6.5 21 8 14.3 3 10l6.3-.7L12 3Z",
  gear: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 12l-1.5-1 1.2-2.2 1.8.4a6 6 0 0 1 1.6-1l.4-1.8h2.6l.4 1.8a6 6 0 0 1 1.6 1l1.8-.4 1.2 2.2L20 12l1.5 1-1.2 2.2-1.8-.4a6 6 0 0 1-1.6 1l-.4 1.8h-2.6l-.4-1.8a6 6 0 0 1-1.6-1l-1.8.4L2.5 13 4 12Z"
};
function Icon({
  name,
  size = 18,
  sw = 1.7,
  style,
  className
}) {
  return React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: sw,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
    className
  }, React.createElement("path", {
    d: ICONS[name]
  }));
}

/* ---- logo mark: small constellation ---- */
function LogoMark({
  size = 30
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 30 30",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "9",
    x2: "15",
    y2: "15",
    stroke: "var(--gold-line)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "24",
    y2: "8",
    stroke: "var(--gold-line)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "10",
    y2: "24",
    stroke: "var(--gold-line)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "15",
    x2: "23",
    y2: "22",
    stroke: "var(--gold-line)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "9",
    r: "1.8",
    fill: "var(--blue)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "8",
    r: "1.8",
    fill: "var(--blue)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "24",
    r: "1.8",
    fill: "var(--blue)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "23",
    cy: "22",
    r: "1.8",
    fill: "var(--blue)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "15",
    r: "3.4",
    fill: "var(--gold)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "15",
    r: "6",
    stroke: "var(--gold)",
    strokeWidth: "1",
    opacity: ".4"
  }));
}

/* ---- starfield bg ---- */
function Starfield({
  density = 70,
  zone
}) {
  const stars = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < density; i++) {
      const big = Math.random() > .85;
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: big ? Math.random() * 1.6 + 1.4 : Math.random() * 1.2 + .5,
        o: Math.random() * .5 + .2,
        d: Math.random() * 4 + 2,
        delay: Math.random() * 4,
        gold: Math.random() > .8
      });
    }
    return arr;
  }, [density]);
  return /*#__PURE__*/React.createElement("div", {
    className: "starfield"
  }, stars.map((st, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "star",
    style: {
      left: st.x + "%",
      top: st.y + "%",
      width: st.s + "px",
      height: st.s + "px",
      background: st.gold ? "var(--gold)" : "#fff",
      opacity: st.o,
      animation: `twinkle ${st.d}s ease-in-out ${st.delay}s infinite`
    }
  })));
}

/* ---- source / credibility tag ---- */
const SRC_LABEL = {
  A: "A 原始史料",
  B: "B 权威整理",
  C: "C 通俗资料",
  D: "D 待校验"
};
function SourceTag({
  lv,
  full
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "src-tag src-" + lv.toLowerCase()
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), full ? SRC_LABEL[lv] : lv);
}

/* ---- dynasty tag ---- */
function DynTag({
  id,
  onClick
}) {
  const d = DB.dynasties.find(x => x.id === id);
  return /*#__PURE__*/React.createElement("span", {
    className: "tag tag-dyn",
    onClick: onClick
  }, d ? d.name + "朝" : "清朝");
}

/* ---- avatar placeholder ---- */
function Avatar({
  name,
  size = 64,
  radius = 14
}) {
  const ch = name ? name[0] : "?";
  return /*#__PURE__*/React.createElement("div", {
    className: "avatar",
    style: {
      width: size,
      height: size,
      borderRadius: radius
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm",
    style: {
      fontSize: size * 0.42
    }
  }, ch));
}

/* ---- node glyph (for legends / inline) circle=person rect=event diamond=location ---- */
function NodeGlyph({
  type,
  size = 14,
  color
}) {
  const c = color || (type === "person" ? "var(--gold)" : type === "event" ? "var(--blue)" : "var(--rel-colleague)");
  if (type === "event") return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size * 0.78,
      background: c,
      borderRadius: 2
    }
  });
  if (type === "location") return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      background: c,
      transform: "rotate(45deg)",
      borderRadius: 2
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      background: c,
      borderRadius: "50%"
    }
  });
}

/* ---- person card ---- */
function PersonCard({
  id,
  nav,
  compact
}) {
  const p = DB.persons[id];
  if (!p) return null;
  const st = useStore();
  const fav = st.isFav(id);
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-hover",
    style: {
      padding: compact ? 14 : 17,
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      gap: 11
    },
    onClick: () => nav("person", id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 13,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: compact ? 46 : 54
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: compact ? 16 : 18,
      fontWeight: 700
    }
  }, p.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      fontFamily: "var(--font-num)"
    }
  }, p.born, "\u2013", p.died)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(DynTag, {
    id: p.dynasty,
    onClick: e => {
      e.stopPropagation();
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role"
  }, p.role[0]))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      padding: "5px 8px",
      color: fav ? "var(--gold)" : "var(--text-2)"
    },
    onClick: e => {
      e.stopPropagation();
      st.toggleFav(id, "person");
    },
    title: "\u6536\u85CF"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 15,
    sw: fav ? 0 : 1.7,
    style: fav ? {
      fill: "var(--gold)"
    } : {}
  }))), !compact && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.6,
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, p.short), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12,
      color: "var(--text-3)",
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "network",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, p.relations.length, " \u5173\u7CFB"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--line-2)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement(Icon, {
    name: "event",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, p.events.length, " \u4E8B\u4EF6")));
}

/* ---- event card ---- */
function EventCard({
  id,
  nav,
  compact
}) {
  const e = DB.events[id];
  if (!e) return null;
  const hot = e.controversy && (id === "taiping" || id === "jiawu");
  return /*#__PURE__*/React.createElement("div", {
    className: "card card-hover",
    style: {
      padding: compact ? 14 : 17,
      cursor: "pointer",
      position: "relative",
      borderLeft: "3px solid " + (hot ? "var(--gold)" : "var(--blue)")
    },
    onClick: () => nav("event", id)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: "event",
    size: 12
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: compact ? 15.5 : 17,
      fontWeight: 700,
      flex: 1
    }
  }, e.name), hot && /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      background: "var(--gold-soft)",
      color: "var(--gold)",
      height: 21
    }
  }, "\u4E89\u8BAE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 12.5,
      color: "var(--gold)",
      marginBottom: 8
    }
  }, e.start, e.end !== e.start ? `–${e.end}` : "", " \xB7 ", e.place), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.6,
      display: "-webkit-box",
      WebkitLineClamp: compact ? 2 : 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, e.short), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12,
      color: "var(--text-3)",
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "person",
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, e.persons.length, " \u4EBA\u7269"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--line-2)"
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, "\u4E8B\u4EF6\u94FE ", e.chain.length, " \u8282\u70B9")));
}

/* ---- relation legend ---- */
function RelationLegend() {
  const items = [{
    label: "师生",
    c: "var(--rel-teacher)"
  }, {
    label: "同僚",
    c: "var(--rel-colleague)"
  }, {
    label: "敌对/政争",
    c: "var(--rel-rival)",
    dash: true
  }, {
    label: "君臣",
    c: "var(--rel-serve)"
  }, {
    label: "亲属",
    c: "var(--rel-kin)"
  }, {
    label: "参与事件",
    c: "var(--rel-event)",
    dash: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px 18px"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    className: "rl",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "ln",
    style: {
      borderColor: it.c,
      borderTopStyle: it.dash ? "dashed" : "solid"
    }
  }), it.label)));
}
Object.assign(window, {
  Icon,
  LogoMark,
  Starfield,
  SourceTag,
  DynTag,
  Avatar,
  NodeGlyph,
  PersonCard,
  EventCard,
  RelationLegend,
  SRC_LABEL
});