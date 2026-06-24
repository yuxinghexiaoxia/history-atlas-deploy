/* ============ 历史星图 · 个人中心 ============ */

function StatPill({
  n,
  label,
  icon
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 11,
      background: "var(--gold-soft)",
      color: "var(--gold)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 21,
      fontWeight: 700,
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      marginTop: 3
    }
  }, label)));
}
function PlanCard({
  plan,
  current,
  onPick
}) {
  const isCur = current === plan.id;
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "relative",
      padding: "22px 22px 24px",
      border: "1px solid " + (plan.highlight ? "var(--gold-line)" : "var(--line)"),
      background: plan.highlight ? "linear-gradient(165deg,var(--card-2),var(--card))" : "var(--card)"
    }
  }, plan.highlight && /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      position: "absolute",
      top: -11,
      left: 22,
      background: "linear-gradient(180deg,var(--gold-2),var(--gold))",
      color: "#1a1304"
    }
  }, "\u63A8\u8350"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4
    }
  }, plan.id !== "free" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 17
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 700
    }
  }, plan.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-2)",
      marginBottom: 14
    }
  }, plan.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 3,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 30,
      fontWeight: 700,
      color: "var(--gold)"
    }
  }, plan.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-3)"
    }
  }, plan.per)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 9,
      marginBottom: 18
    }
  }, plan.feats.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 9,
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: plan.highlight ? "var(--gold)" : "var(--blue)",
      flex: "none",
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  })), f))), isCur ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      width: "100%"
    },
    disabled: true
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  }), "\u5F53\u524D\u65B9\u6848") : /*#__PURE__*/React.createElement("button", {
    className: "btn " + (plan.highlight || plan.id !== "free" ? "btn-gold" : "btn-ghost"),
    style: {
      width: "100%"
    },
    onClick: () => onPick(plan.id)
  }, plan.id === "free" ? "降为免费" : "升级" + plan.name));
}
function FavList({
  favorites,
  nav
}) {
  if (!favorites.length) return /*#__PURE__*/React.createElement(Empty, {
    icon: "bookmark",
    text: "\u8FD8\u6CA1\u6709\u6536\u85CF\u3002\u6D4F\u89C8\u4EBA\u7269\u6216\u4E8B\u4EF6\uFF0C\u70B9\u51FB\u6536\u85CF\u5373\u53EF\u5728\u6B64\u67E5\u770B\u3002",
    cta: "\u53BB\u9996\u9875\u63A2\u7D22",
    onCta: () => nav("home")
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    }
  }, favorites.map(f => f.type === "event" ? /*#__PURE__*/React.createElement(EventCard, {
    key: f.id,
    id: f.id,
    nav: nav
  }) : /*#__PURE__*/React.createElement(PersonCard, {
    key: f.id,
    id: f.id,
    nav: nav
  })));
}
function HistoryList({
  history,
  nav,
  onClear
}) {
  if (!history.length) return /*#__PURE__*/React.createElement(Empty, {
    icon: "clock",
    text: "\u6682\u65E0\u6D4F\u89C8\u8BB0\u5F55\u3002"
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: onClear
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }), "\u6E05\u7A7A\u5386\u53F2")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 6
    }
  }, history.map((h, i) => {
    const o = DB.get(h.id);
    if (!o) return null;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => nav(h.type === "event" ? "event" : "person", h.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "12px 14px",
        width: "100%",
        textAlign: "left",
        borderRadius: 10,
        transition: ".15s",
        borderBottom: i < history.length - 1 ? "1px solid var(--line)" : "none"
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--card-2)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement(NodeGlyph, {
      type: o.type,
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14.5,
        fontWeight: 600
      }
    }, o.name), /*#__PURE__*/React.createElement("span", {
      className: "tag tag-role"
    }, o.type === "event" ? "事件" : "人物"), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: "auto",
        fontSize: 12.5,
        color: "var(--text-3)",
        fontFamily: "var(--font-num)"
      }
    }, fromNow(h.at)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevR",
      size: 15,
      style: {
        color: "var(--text-3)"
      }
    }));
  })));
}
function ExportList({
  exports,
  nav
}) {
  if (!exports.length) return /*#__PURE__*/React.createElement(Empty, {
    icon: "export",
    text: "\u8FD8\u6CA1\u6709\u5BFC\u51FA\u8BB0\u5F55\u3002\u5728\u4EBA\u7269\u6216\u4E8B\u4EF6\u9875\u70B9\u51FB\u300C\u5BFC\u51FA\u7D20\u6750\u300D\u5373\u53EF\u751F\u6210\u3002"
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 6
    }
  }, exports.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      padding: "13px 14px",
      borderBottom: i < exports.length - 1 ? "1px solid var(--line)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "doc",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600
    }
  }, x.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      fontFamily: "var(--font-num)"
    }
  }, fromNow(x.at))), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      cursor: "default"
    }
  }, x.format), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => nav(x.type === "event" ? "event" : "person", x.id)
  }, "\u67E5\u770B ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 12
  })))));
}
function Empty({
  icon,
  text,
  cta,
  onCta
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "44px 22px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-3)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 30
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: "var(--text-2)",
      margin: "0 auto 16px",
      maxWidth: 360,
      lineHeight: 1.7
    }
  }, text), cta && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold btn-sm",
    onClick: onCta
  }, cta));
}
function AccountPage({
  nav,
  onAuth
}) {
  const st = useStore();
  const s = st.get();
  const [tab, setTab] = useState("fav");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const user = s.user;
  const plan = window.PLANS.find(p => p.id === (user ? user.plan : "free")) || window.PLANS[0];
  const aiQuota = {
    free: 5,
    pro: 50,
    creator: "∞"
  }[plan.id];
  const aiUsed = {
    free: 3,
    pro: 17,
    creator: 128
  }[plan.id];
  const tabs = [{
    k: "fav",
    t: "我的收藏",
    n: s.favorites.length,
    ic: "bookmark"
  }, {
    k: "history",
    t: "浏览历史",
    n: s.history.length,
    ic: "clock"
  }, {
    k: "export",
    t: "导出记录",
    n: s.exports.length,
    ic: "export"
  }, {
    k: "member",
    t: "会员中心",
    n: null,
    ic: "crown"
  }];
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
  }, "\u4E2A\u4EBA\u4E2D\u5FC3")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "26px 30px",
      border: "1px solid var(--gold-line)",
      background: "linear-gradient(120deg,var(--card-2),var(--card))"
    }
  }, /*#__PURE__*/React.createElement(Starfield, {
    density: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: user ? user.name : "游",
    size: 72,
    radius: 20
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 25,
      margin: 0,
      fontWeight: 700
    }
  }, user ? user.name : "游客"), /*#__PURE__*/React.createElement("span", {
    className: "tag",
    style: {
      background: plan.id === "free" ? "rgba(255,255,255,.06)" : "var(--gold-soft)",
      color: plan.id === "free" ? "var(--text-2)" : "var(--gold)",
      border: "1px solid " + (plan.id === "free" ? "var(--line)" : "var(--gold-line)")
    }
  }, plan.id !== "free" && /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 13
  }), plan.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      marginTop: 5
    }
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, user.email, " \xB7 \u52A0\u5165\u4E8E ", new Date(user.since).toLocaleDateString("zh-CN")) : "登录后即可云端同步收藏、浏览历史与创作记录")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, user ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => setTab("member")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "crown",
    size: 16
  }), "\u4F1A\u5458\u4E2D\u5FC3"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => st.logout()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 16
  }), "\u9000\u51FA")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: onAuth
  }, "\u767B\u5F55 / \u6CE8\u518C"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      gap: 34,
      marginTop: 22,
      flexWrap: "wrap",
      paddingTop: 20,
      borderTop: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement(StatPill, {
    n: s.favorites.length,
    label: "\u6536\u85CF",
    icon: "bookmark"
  }), /*#__PURE__*/React.createElement(StatPill, {
    n: s.history.length,
    label: "\u6D4F\u89C8",
    icon: "clock"
  }), /*#__PURE__*/React.createElement(StatPill, {
    n: s.exports.length,
    label: "\u5BFC\u51FA",
    icon: "export"
  }), /*#__PURE__*/React.createElement(StatPill, {
    n: `${aiUsed}/${aiQuota}`,
    label: "\u672C\u6708 AI \u63D0\u95EE",
    icon: "sparkle"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "230px 1fr",
      gap: 24,
      marginTop: 22,
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
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.k,
    onClick: () => setTab(t.k),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      padding: "11px 13px",
      borderRadius: 10,
      textAlign: "left",
      transition: ".15s",
      background: tab === t.k ? "var(--gold-soft)" : "transparent",
      color: tab === t.k ? "var(--gold)" : "var(--text-2)",
      border: "1px solid " + (tab === t.k ? "var(--gold-line)" : "transparent"),
      fontWeight: tab === t.k ? 700 : 500
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.ic,
    size: 17
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, t.t), t.n != null && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 12.5,
      fontFamily: "var(--font-num)",
      color: tab === t.k ? "var(--gold)" : "var(--text-3)"
    }
  }, t.n)))), /*#__PURE__*/React.createElement("div", null, tab === "fav" && /*#__PURE__*/React.createElement(FavList, {
    favorites: s.favorites,
    nav: nav
  }), tab === "history" && /*#__PURE__*/React.createElement(HistoryList, {
    history: s.history,
    nav: nav,
    onClear: () => st.clearHistory()
  }), tab === "export" && /*#__PURE__*/React.createElement(ExportList, {
    exports: s.exports,
    nav: nav
  }), tab === "member" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dlabel"
  }, "\u4F1A\u5458\u65B9\u6848 \xB7 \u5F53\u524D\u4E3A ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, plan.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 16,
      marginTop: 4
    }
  }, window.PLANS.map(p => /*#__PURE__*/React.createElement(PlanCard, {
    key: p.id,
    plan: p,
    current: plan.id,
    onPick: pid => {
      if (!user) {
        onAuth();
        return;
      }
      st.upgrade(pid);
    }
  }))), !user && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-3)",
      marginTop: 16,
      textAlign: "center"
    }
  }, "\u5347\u7EA7\u524D\u8BF7\u5148 ", /*#__PURE__*/React.createElement("a", {
    style: {
      color: "var(--gold)",
      cursor: "pointer"
    },
    onClick: onAuth
  }, "\u767B\u5F55"), "\u3002")))));
}
Object.assign(window, {
  AccountPage
});