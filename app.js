/* ============ 历史星图 · 应用外壳 + 路由 ============ */
function TopNav({
  route,
  nav,
  onAuth
}) {
  const links = [{
    p: "home",
    t: "首页"
  }, {
    p: "timeline",
    t: "时间线"
  }, {
    p: "graph",
    t: "关系图谱"
  }, {
    p: "map",
    t: "历史地图"
  }, {
    p: "ai",
    t: "AI 助手"
  }];
  const st = useStore();
  const user = st.get().user;
  const [menu, setMenu] = useState(false);
  const mref = useRef(null);
  const [q, setQ] = useState("");
  const [apiRes, setApiRes] = useState([]);
  const [searching, setSearching] = useState(false);
  const pool = React.useMemo(() => {
    const arr = [];
    Object.values(DB.persons).forEach(p => arr.push({
      id: p.id,
      kind: "person",
      name: p.name,
      alias: p.alias
    }));
    Object.values(DB.events).forEach(e => arr.push({
      id: e.id,
      kind: "event",
      name: e.name,
      alias: ""
    }));
    return arr;
  }, []);
  const res = q.trim() ? pool.filter(x => (x.name + x.alias).includes(q.trim())).slice(0, 5) : [];
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      if (mref.current && !mref.current.contains(e.target)) setMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // API search debounce
  useEffect(() => {
    if (!q.trim() || !window.API) {
      setApiRes([]);
      return;
    }
    const timer = setTimeout(() => {
      setSearching(true);
      window.API.search(q.trim()).then(data => {
        const items = [];
        if (data.persons) data.persons.forEach(p => items.push({
          id: p.id,
          kind: "person",
          name: p.name,
          alias: p.alias || ""
        }));
        if (data.events) data.events.forEach(e => items.push({
          id: e.id,
          kind: "event",
          name: e.name,
          alias: ""
        }));
        if (data.dynasties) data.dynasties.forEach(d => items.push({
          id: d.id,
          kind: "dynasty",
          name: d.name,
          alias: ""
        }));
        setApiRes(items.slice(0, 5));
        setSearching(false);
      }).catch(() => {
        setApiRes([]);
        setSearching(false);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [q]);
  const displayRes = apiRes.length > 0 ? apiRes : res;
  return /*#__PURE__*/React.createElement("nav", {
    className: "topnav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    onClick: () => nav("home")
  }, /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement(LogoMark, null)), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, "\u5386\u53F2\u661F\u56FE", /*#__PURE__*/React.createElement("span", {
    className: "en"
  }, "HISTORY ATLAS"))), /*#__PURE__*/React.createElement("div", {
    className: "navlinks"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.p,
    className: route.page === l.p ? "active" : "",
    onClick: () => nav(l.p, l.p === "graph" ? "zengguofan" : null)
  }, l.t))), /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "nav-search",
    style: {
      position: "relative"
    },
    onClick: () => setOpen(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16,
    style: {
      color: "var(--gold)"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => {
      setQ(e.target.value);
      setOpen(true);
    },
    placeholder: "\u641C\u7D22\u4EBA\u7269 / \u4E8B\u4EF6 / \u5E74\u4EFD\u2026",
    onKeyDown: e => {
      if (e.key === "Enter") {
        const v = q.trim();
        if (v) {
          nav("search", null, {
            q: v
          });
          setQ("");
          setOpen(false);
        }
      }
    }
  }), /*#__PURE__*/React.createElement("kbd", null, "\u2318K"), open && displayRes.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      left: 0,
      right: 0,
      padding: 6,
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--gold-line)",
      zIndex: 80
    }
  }, searching && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px",
      fontSize: 12,
      color: "var(--text-3)"
    }
  }, "\u641C\u7D22\u4E2D\u2026"), displayRes.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.kind + r.id,
    onMouseDown: () => {
      nav(r.kind === "event" ? "event" : r.kind === "dynasty" ? "dynasty" : "person", r.id);
      setQ("");
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 11px",
      borderRadius: 9,
      cursor: "pointer"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--gold-soft)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement(NodeGlyph, {
    type: r.kind,
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      marginLeft: "auto"
    }
  }, r.kind === "person" ? "人物" : r.kind === "event" ? "事件" : "朝代"))), /*#__PURE__*/React.createElement("button", {
    onMouseDown: () => {
      const v = q.trim();
      if (v) {
        nav("search", null, {
          q: v
        });
        setQ("");
        setOpen(false);
      }
    },
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 11px",
      borderTop: "1px solid var(--line)",
      marginTop: 4,
      fontSize: 13,
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 13
  }), "\u67E5\u770B\u5168\u90E8\u7ED3\u679C", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--text-3)"
    }
  }, "\u21B5")))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => nav("ai")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 15
  }), "AI \u9009\u9898"), user ? /*#__PURE__*/React.createElement("div", {
    ref: mref,
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMenu(m => !m),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "4px 10px 4px 4px",
      borderRadius: 10,
      border: "1px solid var(--line-2)",
      background: "rgba(255,255,255,.02)"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: user.name,
    size: 28,
    radius: 8
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      maxWidth: 80,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, user.name), user.plan !== "free" && /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 14,
    style: {
      color: "var(--gold)"
    }
  })), menu && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      width: 200,
      padding: 6,
      boxShadow: "var(--shadow-lg)",
      border: "1px solid var(--gold-line)",
      zIndex: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "9px 11px 11px",
      borderBottom: "1px solid var(--line)",
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-3)"
    }
  }, user.email)), [["person", "个人中心", () => nav("account")], ["crown", "会员中心", () => nav("account")], ["logout", "退出登录", () => st.logout()]].map(([ic, t, fn], i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => {
      setMenu(false);
      fn();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      padding: "9px 11px",
      borderRadius: 8,
      fontSize: 13.5,
      color: "var(--text)",
      textAlign: "left"
    },
    onMouseEnter: e => e.currentTarget.style.background = "var(--gold-soft)",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16,
    style: {
      color: "var(--text-2)"
    }
  }), t)))) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold btn-sm",
    onClick: onAuth
  }, "\u767B\u5F55")));
}
function App() {
  const [route, setRoute] = useState({
    page: "home",
    id: null,
    params: {}
  });
  const [authOpen, setAuthOpen] = useState(false);
  const nav = useCallback((page, id = null, params = {}) => {
    setRoute({
      page,
      id,
      params
    });
    window.scrollTo(0, 0);
  }, []);
  let view;
  switch (route.page) {
    case "person":
      view = /*#__PURE__*/React.createElement(PersonPage, {
        id: route.id,
        nav: nav
      });
      break;
    case "event":
      view = /*#__PURE__*/React.createElement(EventPage, {
        id: route.id,
        nav: nav
      });
      break;
    case "dynasty":
      view = /*#__PURE__*/React.createElement(DynastyPage, {
        id: route.id,
        nav: nav
      });
      break;
    case "search":
      view = /*#__PURE__*/React.createElement(SearchPage, {
        query: route.params.q,
        nav: nav
      });
      break;
    case "map":
      view = /*#__PURE__*/React.createElement(NewMapPage, {
        nav: nav
      });
      break;
    case "account":
      view = /*#__PURE__*/React.createElement(AccountPage, {
        nav: nav,
        onAuth: () => setAuthOpen(true)
      });
      break;
    case "graph":
      view = /*#__PURE__*/React.createElement(GraphPage, {
        id: route.id,
        nav: nav
      });
      break;
    case "timeline":
      view = /*#__PURE__*/React.createElement(TimelinePage, {
        nav: nav
      });
      break;
    case "ai":
      view = /*#__PURE__*/React.createElement(AIPage, {
        nav: nav,
        query: route.params.q
      });
      break;
    default:
      view = /*#__PURE__*/React.createElement(Home, {
        nav: nav
      });
  }
  const isMap = route.page === 'map';
  return /*#__PURE__*/React.createElement("div", {
    className: "app-shell"
  }, !isMap && /*#__PURE__*/React.createElement(TopNav, {
    route: route,
    nav: nav,
    onAuth: () => setAuthOpen(true)
  }), /*#__PURE__*/React.createElement("div", {
    className: isMap ? "page page-full" : "page",
    key: route.page + (route.id || "") + (route.params.q || "")
  }, view), authOpen && !isMap && /*#__PURE__*/React.createElement(AuthModal, {
    onClose: () => setAuthOpen(false),
    nav: nav
  }));
}
const _rootEl = document.getElementById("root");

function mountApp() {
  if (ReactDOM.createRoot) {
    ReactDOM.createRoot(_rootEl).render(/*#__PURE__*/React.createElement(App, null));
  } else {
    ReactDOM.render(/*#__PURE__*/React.createElement(App, null), _rootEl);
  }
}

if (window.DB && Object.keys(window.DB.persons || {}).length > 0) {
  mountApp();
} else {
  window.addEventListener('db-ready', mountApp, { once: true });
}