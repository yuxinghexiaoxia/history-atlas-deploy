/* ============ 历史星图 · 时间线页 ============ */
function TimelinePage({
  nav
}) {
  const [mode, setMode] = useState("year"); // year | dynasty | compare
  const [filter, setFilter] = useState("all"); // all | event | person | war
  const [personFilter, setPersonFilter] = useState("");
  const [open, setOpen] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const filters = [{
    k: "all",
    t: "全部"
  }, {
    k: "event",
    t: "事件"
  }, {
    k: "war",
    t: "战争"
  }, {
    k: "person",
    t: "人物"
  }];
  const personOptions = React.useMemo(() => Object.values(DB.persons).sort((a, b) => a.born - b.born), []);
  const items = React.useMemo(() => {
    let list = DB.timeline;
    if (filter !== "all") list = list.filter(it => it.type === filter);
    if (personFilter) {
      list = list.filter(it => {
        if (it.pr === personFilter) return true;
        if (it.ev) {
          const ev = DB.events[it.ev];
          return ev && ev.persons && ev.persons.includes(personFilter);
        }
        return false;
      });
    }
    return list;
  }, [filter, personFilter]);

  // compare mode: pick a busy year
  const compareYears = [1861, 1864, 1894, 1895].map(y => ({
    y,
    items: DB.timeline.filter(t => t.y === y && (!personFilter || t.pr === personFilter || t.ev && DB.events[t.ev] && DB.events[t.ev].persons && DB.events[t.ev].persons.includes(personFilter)))
  }));
  function nodeColor(it) {
    return it.key ? "var(--gold)" : it.type === "war" ? "var(--src-d)" : "var(--blue)";
  }
  const dynastyRanges = React.useMemo(() => {
    const ranges = [];
    const fmtYear = (y) => y < 0 ? "前" + Math.abs(y) : String(y);
    Object.values(DB.dynastyInfo || {}).forEach(d => {
      if (!d.span) return;
      const parts = d.span.split('–');
      if (parts.length !== 2) return;
      const parseYear = (s) => {
        s = s.trim();
        if (s.startsWith('前')) return -parseInt(s.slice(1), 10);
        return parseInt(s, 10);
      };
      const start = parseYear(parts[0]);
      const end = parseYear(parts[1]);
      ranges.push({
        id: d.id,
        name: d.name,
        full: d.full || d.name,
        start,
        end,
        startStr: fmtYear(start),
        endStr: fmtYear(end)
      });
    });
    return ranges.sort((a, b) => a.start - b.start);
  }, []);
  function getDynastyByYear(year) {
    for (const d of dynastyRanges) {
      if (year >= d.start && year <= d.end) return d;
    }
    return null;
  }
  function goItem(it) {
    if (it.ev) nav("event", it.ev);else if (it.pr) nav("person", it.pr);
  }
  function exportTimelineImage() {
    const W = 900,
      padX = 80,
      padY = 60,
      itemH = 110,
      spineX = 100;
    const H = padY * 2 + items.length * itemH;
    const canvas = document.createElement("canvas");
    canvas.width = W * 2;
    canvas.height = H * 2;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(2, 2);

    // bg
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#111827");
    bg.addColorStop(1, "#0B1020");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // title
    ctx.fillStyle = "#e8c75a";
    ctx.font = '700 32px "Noto Serif SC",serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("晚清时间长河", padX, 28);
    ctx.fillStyle = "#9CA3AF";
    ctx.font = '16px "Spectral",serif';
    ctx.fillText(`1840 – 1901 · 共 ${items.length} 个节点`, padX, 68);

    // spine
    ctx.strokeStyle = "rgba(212,175,55,.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(spineX, padY + 50);
    ctx.lineTo(spineX, H - padY);
    ctx.stroke();
    items.forEach((it, i) => {
      const y = padY + 50 + i * itemH;
      const color = it.key ? "#D4AF37" : it.type === "war" ? "#e0795a" : "#4A90E2";
      // dot
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(spineX, y, 8, 0, Math.PI * 2);
      ctx.fill();
      if (it.key) {
        ctx.strokeStyle = "rgba(212,175,55,.25)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(spineX, y, 16, 0, Math.PI * 2);
        ctx.stroke();
      }
      // year
      ctx.fillStyle = color;
      ctx.font = '700 20px "Spectral",serif';
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(String(it.y), spineX - 18, y);
      // card
      ctx.fillStyle = "rgba(17,32,51,.92)";
      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 1;
      roundRect(ctx, spineX + 26, y - 36, W - spineX - padX - 26, 72, 12);
      ctx.fill();
      ctx.stroke();
      // title
      ctx.fillStyle = "#EAEAEA";
      ctx.font = '600 17px "Noto Sans SC",sans-serif';
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(it.t, spineX + 42, y - 24);
      // desc
      ctx.fillStyle = "#9CA3AF";
      ctx.font = '14px "Noto Sans SC",sans-serif';
      ctx.textBaseline = "top";
      const lines = wrapText(ctx, it.s, W - spineX - padX - 60, 14);
      lines.slice(0, 2).forEach((l, j) => ctx.fillText(l, spineX + 42, y + 2 + j * 20));
      // type tag
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fillRect(spineX + 42, y + 28, 40, 18);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = '11px "Noto Sans SC",sans-serif';
      ctx.textBaseline = "middle";
      ctx.fillText({
        event: "事件",
        war: "战争",
        person: "人物"
      }[it.type], spineX + 62, y + 37);
    });

    // watermark
    ctx.fillStyle = "rgba(255,255,255,.12)";
    ctx.font = '13px "Noto Sans SC",sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("历史星图 History Atlas", padX, H - 28);
    downloadCanvas(canvas, `晚清时间长河_${items.length}节点.png`);
    recordExport({
      id: "timeline_qing",
      type: "timeline",
      name: "晚清时间长河"
    }, "时间线配图");
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up wrap",
    style: {
      padding: "18px 28px 56px",
      maxWidth: 980
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
  }, "\u65F6\u95F4\u7EBF")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 28,
      margin: 0,
      fontWeight: 700
    }
  }, "\u665A\u6E05\u65F6\u95F4\u957F\u6CB3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-2)"
    }
  }, "1840 \u2013 1901 \xB7 \u5171 ", DB.timeline.length, " \u4E2A\u5386\u53F2\u8282\u70B9"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    style: {
      marginLeft: "auto"
    },
    onClick: exportTimelineImage
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "export",
    size: 14
  }), "\u5BFC\u51FA\u516C\u4F17\u53F7\u914D\u56FE")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      gap: 18,
      flexWrap: "wrap",
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-ctl"
  }, /*#__PURE__*/React.createElement("button", {
    className: mode === "year" ? "on" : "",
    onClick: () => setMode("year")
  }, "\u5E74\u8868\u6A21\u5F0F"), /*#__PURE__*/React.createElement("button", {
    className: mode === "dynasty" ? "on" : "",
    onClick: () => setMode("dynasty")
  }, "\u671D\u4EE3\u6A21\u5F0F"), /*#__PURE__*/React.createElement("button", {
    className: mode === "compare" ? "on" : "",
    onClick: () => setMode("compare")
  }, "\u540C\u5E74\u5BF9\u6BD4")), mode !== "compare" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 24,
      background: "var(--line)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, filters.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.k,
    className: "chip" + (filter === f.k ? " on" : ""),
    onClick: () => setFilter(f.k)
  }, f.t))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 24,
      background: "var(--line)"
    }
  }), /*#__PURE__*/React.createElement("select", {
    value: personFilter,
    onChange: e => setPersonFilter(e.target.value),
    style: {
      height: 34,
      padding: "0 10px",
      borderRadius: 9,
      background: "var(--bg)",
      border: "1px solid var(--line-2)",
      color: "var(--text)",
      fontSize: 13.5,
      outline: "none"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u7B5B\u9009\u4EBA\u7269\uFF08\u5168\u90E8\uFF09"), personOptions.map(p => /*#__PURE__*/React.createElement("option", {
    key: p.id,
    value: p.id
  }, p.name, "\uFF08", p.born, "\u2013", p.died, "\uFF09")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 14,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rl"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--gold)",
      display: "inline-block"
    }
  }), "\u91CD\u8981\u4E8B\u4EF6"), /*#__PURE__*/React.createElement("span", {
    className: "rl"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "var(--blue)",
      display: "inline-block"
    }
  }), "\u4E00\u822C\u4E8B\u4EF6"))), mode === "compare" ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "dlabel"
  }, "\u540C\u4E00\u5E74\u4EFD \xB7 \u4E0D\u540C\u5730\u533A/\u9886\u57DF\u5E76\u5217\u53D1\u751F\u7684\u4E8B"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: 16
    }
  }, compareYears.map(cy => cy.items.length > 0 && /*#__PURE__*/React.createElement("div", {
    key: cy.y,
    className: "card",
    style: {
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-num)",
      fontSize: 30,
      fontWeight: 700,
      color: "var(--gold)",
      lineHeight: 1
    }
  }, cy.y), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--line)",
      margin: "14px 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 13
    }
  }, cy.items.map((it, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => goItem(it),
    style: {
      display: "flex",
      gap: 11,
      textAlign: "left",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "50%",
      background: nodeColor(it),
      marginTop: 6,
      flex: "none"
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      display: "block"
    }
  }, it.t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: "var(--text-3)"
    }
  }, it.s))))))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      paddingLeft: mode === "dynasty" ? 96 : 64
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: mode === "dynasty" ? 92 : 60,
      top: 8,
      bottom: 8,
      width: 2,
      background: "linear-gradient(var(--gold-line),var(--line))"
    }
  }), mode === "dynasty" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      fontFamily: "var(--font-serif)",
      writingMode: "vertical-rl",
      fontSize: 22,
      color: "var(--gold)",
      fontWeight: 700,
      letterSpacing: 6,
      paddingTop: 20
    }
  }, "\u6E05 \xB7 \u665A\u6E05"), items.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 36,
      textAlign: "center",
      color: "var(--text-2)"
    }
  }, "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u65E0\u65F6\u95F4\u7EBF\u8282\u70B9\u3002"), items.map((it, i) => {
    const color = nodeColor(it);
    const dynasty = getDynastyByYear(it.y);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "relative",
        paddingBottom: 20
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(open === i ? null : i),
      style: {
        position: "absolute",
        left: mode === "dynasty" ? -43 : -11,
        top: 4,
        width: it.key ? 20 : 15,
        height: it.key ? 20 : 15,
        borderRadius: "50%",
        background: it.key ? color : "var(--bg)",
        border: "2.5px solid " + color,
        boxShadow: it.key ? "0 0 0 5px " + (it.type === "war" ? "rgba(224,121,90,.16)" : "var(--gold-soft)") : "none",
        cursor: "pointer",
        transform: "translateX(-50%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "card card-hover",
      onClick: () => setOpen(open === i ? null : i),
      style: {
        padding: "13px 17px",
        cursor: "pointer",
        borderColor: open === i ? "var(--gold-line)" : "var(--line)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-num)",
        fontSize: 18,
        fontWeight: 700,
        color: color,
        width: 46,
        flex: "none"
      }
    }, it.y), dynasty && /*#__PURE__*/React.createElement("span", {
      title: dynasty.full + " (" + dynasty.startStr + " – " + dynasty.endStr + ")",
      style: {
        fontSize: 11,
        color: "var(--text-3)",
        background: "rgba(212,175,55,0.1)",
        border: "1px solid rgba(212,175,55,0.2)",
        borderRadius: 4,
        padding: "1px 6px",
        cursor: "help",
        whiteSpace: "nowrap",
        flex: "none"
      }
    }, dynasty.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15.5,
        fontWeight: 600,
        fontFamily: "var(--font-serif)",
        flex: 1
      }
    }, it.t), /*#__PURE__*/React.createElement("span", {
      className: "tag tag-role"
    }, {
      event: "事件",
      war: "战争",
      person: "人物"
    }[it.type]), (it.ev || it.pr) && /*#__PURE__*/React.createElement(Icon, {
      name: "chevR",
      size: 16,
      style: {
        color: "var(--text-3)",
        transform: open === i ? "rotate(90deg)" : "none",
        transition: ".2s"
      }
    })), open === i && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        paddingTop: 12,
        borderTop: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 14,
        color: "var(--text-2)",
        lineHeight: 1.7,
        flex: 1
      }
    }, it.s), it.ev && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-gold btn-sm",
      onClick: e => {
        e.stopPropagation();
        nav("event", it.ev);
      }
    }, "\u8FDB\u5165\u4E8B\u4EF6\u9875 ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 13
    })), it.pr && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-gold btn-sm",
      onClick: e => {
        e.stopPropagation();
        nav("person", it.pr);
      }
    }, "\u8FDB\u5165\u4EBA\u7269\u9875 ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 13
    })))));
  })));
}
Object.assign(window, {
  TimelinePage
});