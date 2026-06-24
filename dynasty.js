/* ============ 历史星图 · 朝代详情页 ============ */

/* 皇帝序列 — 横向时间带 */
function EmperorRail({
  list,
  nav
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 0,
      overflowX: "auto",
      paddingBottom: 8
    }
  }, list.map((m, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => m.pid && nav("person", m.pid),
    disabled: !m.pid,
    style: {
      flex: "none",
      width: 150,
      padding: "14px 14px",
      borderRadius: 12,
      textAlign: "left",
      cursor: m.pid ? "pointer" : "default",
      background: m.peak ? "var(--gold-soft)" : "var(--card)",
      border: "1px solid " + (m.peak ? "var(--gold-line)" : "var(--line)"),
      transition: ".15s"
    },
    onMouseEnter: e => {
      if (m.pid) e.currentTarget.style.borderColor = "var(--gold-line)";
    },
    onMouseLeave: e => {
      if (m.pid && !m.peak) e.currentTarget.style.borderColor = "var(--line)";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 12,
      color: m.peak ? "var(--gold)" : "var(--blue)",
      fontWeight: 700
    }
  }, m.reign), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15.5,
      fontWeight: 700,
      margin: "5px 0 2px",
      fontFamily: "var(--font-serif)",
      color: m.peak ? "var(--gold-2)" : "var(--text)"
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--gold)",
      fontFamily: "var(--font-serif)",
      marginBottom: 6
    }
  }, m.era), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-3)",
      lineHeight: 1.5
    }
  }, m.note), m.pid && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--blue)",
      marginTop: 7,
      display: "flex",
      alignItems: "center",
      gap: 3
    }
  }, "\u8D44\u6599\u9875", /*#__PURE__*/React.createElement(Icon, {
    name: "chevR",
    size: 12
  }))), i < list.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      padding: "0 5px",
      color: "var(--text-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 16
  })))));
}
function BuildingNote({
  title,
  nav
}) {
  return /*#__PURE__*/React.createElement(Panel, null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "34px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-3)",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    size: 34
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 8px",
      fontSize: 20,
      fontFamily: "var(--font-serif)"
    }
  }, title, "\u8D44\u6599\u6B63\u5728\u5EFA\u8BBE\u4E2D"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto 20px",
      fontSize: 14,
      color: "var(--text-2)",
      maxWidth: 440,
      lineHeight: 1.7
    }
  }, "\u5386\u53F2\u661F\u56FE V1 \u4F18\u5148\u5EFA\u8BBE ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold)"
    }
  }, "\u660E \xB7 \u6E05 \xB7 \u6C11\u56FD"), " \u4E09\u4E2A\u9AD8\u9700\u6C42\u65F6\u671F\uFF0C\u5176\u4F59\u671D\u4EE3\u7684\u4EBA\u7269\u3001\u4E8B\u4EF6\u4E0E\u56FE\u8C31\u5C06\u9646\u7EED\u4E0A\u7EBF\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: () => nav("dynasty", "qing")
  }, "\u5148\u770B\u6E05\u671D ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => nav("timeline")
  }, "\u5386\u53F2\u65F6\u95F4\u7EBF"))));
}
function DynastyPage({
  id,
  nav
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const band = DB.dynasties.find(d => d.id === id);
  const d = DB.dynastyInfo[id];
  const name = d ? d.full : band ? band.name + "朝" : "该朝代";
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
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-2)"
    }
  }, "\u671D\u4EE3"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text)"
    }
  }, name))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      position: "relative",
      overflow: "hidden",
      padding: "30px 32px",
      borderLeft: "4px solid var(--gold)",
      background: "linear-gradient(120deg,var(--card-2),var(--card))"
    }
  }, /*#__PURE__*/React.createElement(Starfield, {
    density: 34
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 10
    }
  }, d ? d.en : "DYNASTY"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 44,
      margin: 0,
      fontWeight: 700,
      lineHeight: 1
    }
  }, name), d && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 20,
      color: "var(--gold)"
    }
  }, d.span), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: () => nav("timeline")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16
  }), "\u65F6\u95F4\u7EBF"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-gold",
    onClick: () => nav("ai", null, {
      q: `帮我梳理${name}的历史脉络，并推荐几个公众号选题`
    })
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 16
  }), "AI \u68B3\u7406\u8109\u7EDC"))), d && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "16px 0 0",
      fontSize: 15,
      color: "var(--text-2)",
      lineHeight: 1.85,
      fontFamily: "var(--font-serif)",
      maxWidth: 880
    }
  }, d.summary), d && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 26,
      marginTop: 20,
      flexWrap: "wrap"
    }
  }, d.stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 24,
      fontWeight: 700,
      color: "var(--gold)",
      lineHeight: 1
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      marginTop: 4
    }
  }, s.k))), [["立国", d.founded], ["都城", d.capital], ["终结", d.ended]].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: "f" + i,
    style: {
      maxWidth: 220
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text)"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)",
      marginTop: 4
    }
  }, k))))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(DynastyBand, {
    current: id,
    onPick: did => nav("dynasty", did)
  })), !d ? /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(BuildingNote, {
    title: name,
    nav: nav
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u7687\u5E1D\u5E8F\u5217",
    icon: "clock",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, d.emperors.length, " \u5E1D \xB7 \u91D1\u8272\u4E3A\u76DB\u4E16\u4E4B\u4E3B\uFF0C\u53EF\u70B9\u51FB\u8FDB\u5165\u8D44\u6599\u9875")
  }, /*#__PURE__*/React.createElement(EmperorRail, {
    list: d.emperors,
    nav: nav
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap-wide",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 332px",
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
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "\u5236\u5EA6\u4E0E\u6587\u5316",
    icon: "book"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 13
    }
  }, d.institutions.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "14px 16px",
      borderRadius: 12,
      background: "var(--bg-2)",
      border: "1px solid var(--line)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 700,
      fontFamily: "var(--font-serif)",
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--gold)",
      flex: "none"
    }
  }), it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      lineHeight: 1.65
    }
  }, it.desc))))), /*#__PURE__*/React.createElement(Panel, {
    title: "\u7586\u57DF\u53D8\u5316",
    icon: "location"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tl-line"
  }, d.territory.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "tl-item" + (t.to ? " key" : "")
  }, /*#__PURE__*/React.createElement("span", {
    className: "tl-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tl-yr"
  }, t.y), /*#__PURE__*/React.createElement("div", {
    className: "tl-txt",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, t.t, t.to && /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: () => nav("event", t.to)
  }, "\u67E5\u770B\u4E8B\u4EF6 ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 12
  })))))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      marginTop: 14
    },
    onClick: () => nav("map")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "location",
    size: 13
  }), "\u5728\u5386\u53F2\u5730\u56FE\u4E2D\u67E5\u770B")), /*#__PURE__*/React.createElement(Panel, {
    title: "\u91CD\u8981\u6218\u4E89",
    icon: "event",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, d.wars.length, " \u573A")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, d.wars.map((w, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => w.to && nav("event", w.to),
    disabled: !w.to,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 12px",
      borderRadius: 10,
      textAlign: "left",
      cursor: w.to ? "pointer" : "default",
      transition: ".15s"
    },
    onMouseEnter: e => {
      if (w.to) e.currentTarget.style.background = "var(--card-2)";
    },
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 13,
      color: "var(--gold)",
      width: 96,
      flex: "none"
    }
  }, w.y), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      fontFamily: "var(--font-serif)",
      width: 150,
      flex: "none"
    }
  }, w.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      flex: 1
    }
  }, w.result), w.to ? /*#__PURE__*/React.createElement(Icon, {
    name: "chevR",
    size: 15,
    style: {
      color: "var(--text-3)"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    className: "tag tag-role",
    style: {
      flex: "none"
    }
  }, "\u6982\u8FF0")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      position: "sticky",
      top: 76
    }
  }, d.keyPersons.length > 0 ? /*#__PURE__*/React.createElement(Panel, {
    title: "\u91CD\u8981\u4EBA\u7269",
    icon: "person",
    right: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-3)"
      }
    }, d.keyPersons.length, " \u4F4D")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, d.keyPersons.map(pid => {
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
      onMouseEnter: e => e.currentTarget.style.background = "var(--card-2)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
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
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      marginTop: 10,
      width: "100%"
    },
    onClick: () => nav("graph", d.keyPersons[0])
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "network",
    size: 13
  }), "\u5173\u7CFB\u56FE\u8C31")) : /*#__PURE__*/React.createElement(Panel, {
    title: "\u91CD\u8981\u4EBA\u7269",
    icon: "person"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.7,
      padding: "4px 0 6px"
    }
  }, "\u8BE5\u671D\u4EE3\u4EBA\u7269\u8D44\u6599\u9010\u6B65\u4E0A\u7EBF\u4E2D\u3002\u53EF\u5148\u6D4F\u89C8\u5DF2\u5EFA\u6210\u7684\u6E05\u671D\u4EBA\u7269\u56FE\u8C31\u3002"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      width: "100%"
    },
    onClick: () => nav("dynasty", "qing")
  }, "\u67E5\u770B\u6E05\u671D\u4EBA\u7269 ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 13
  }))), d.keyEvents.length > 0 ? /*#__PURE__*/React.createElement(Panel, {
    title: "\u91CD\u8981\u4E8B\u4EF6",
    icon: "event"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 13
    }
  }, d.keyEvents.map(eid => /*#__PURE__*/React.createElement(EventCard, {
    key: eid,
    id: eid,
    nav: nav,
    compact: true
  })))) : /*#__PURE__*/React.createElement(Panel, {
    title: "\u91CD\u8981\u4E8B\u4EF6",
    icon: "event"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--text-2)",
      lineHeight: 1.7,
      padding: "4px 0"
    }
  }, "\u4E8B\u4EF6\u5E93\u6B63\u5728\u8865\u5145\u4E2D\u3002"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 50
    }
  }));
}
Object.assign(window, {
  DynastyPage
});