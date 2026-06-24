/* ============ 历史星图 · 登录 / 注册弹窗 ============ */
function AuthModal({
  onClose,
  nav
}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const st = useStore();
  const isReg = mode === "register";
  async function submit(e) {
    e && e.preventDefault();
    setErr("");
    setLoading(true);
    const em = email.trim() || "creator@history.atlas";
    const pw = pwd.trim() || "password";
    const nm = isReg ? name.trim() || "历史创作者" : em.split("@")[0] || "历史创作者";
    try {
      if (!window.API) throw new Error("API未加载");
      let res;
      if (isReg) {
        res = await window.API.register(em, pw, nm);
      } else {
        res = await window.API.login(em, pw);
      }
      if (res && res.token) {
        localStorage.setItem("lsxt_token", res.token);
        st.login({
          name: res.user.name || nm,
          email: res.user.email || em,
          plan: res.user.plan || "free"
        });
        onClose();
        nav && nav("account");
      } else {
        setErr("登录失败，请检查邮箱和密码");
      }
    } catch (e) {
      setErr(e.message || "网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }
  function demo() {
    st.login({
      name: "林墨白",
      email: "mobai@history.atlas",
      plan: "creator",
      since: Date.now() - 86400e3 * 128
    });
    onClose();
    nav && nav("account");
  }
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 120,
      background: "rgba(6,8,15,.72)",
      backdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    className: "card fade-up",
    style: {
      position: "relative",
      overflow: "hidden",
      width: 430,
      maxWidth: "100%",
      border: "1px solid var(--gold-line)",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement(Starfield, {
    density: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: "30px 32px 28px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 16,
      right: 16,
      color: "var(--text-3)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46
    }
  }, /*#__PURE__*/React.createElement(LogoMark, {
    size: 46
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: 21,
      fontWeight: 700
    }
  }, isReg ? "加入历史星图" : "欢迎回到历史星图"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-2)",
      marginTop: 4
    }
  }, isReg ? "注册后即可收藏、导出与使用 AI 创作" : "登录以同步你的收藏、历史与创作"))), /*#__PURE__*/React.createElement("div", {
    className: "seg-ctl",
    style: {
      display: "flex",
      width: "100%",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: !isReg ? "on" : "",
    style: {
      flex: 1
    },
    onClick: () => {
      setMode("login");
      setErr("");
    }
  }, "\u767B\u5F55"), /*#__PURE__*/React.createElement("button", {
    className: isReg ? "on" : "",
    style: {
      flex: 1
    },
    onClick: () => {
      setMode("register");
      setErr("");
    }
  }, "\u6CE8\u518C")), err && /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#e74c3c",
      fontSize: 13,
      padding: "8px 12px",
      background: "rgba(231,76,60,.08)",
      borderRadius: 8,
      marginBottom: 12
    }
  }, err), /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, isReg && /*#__PURE__*/React.createElement(Field, {
    icon: "person",
    placeholder: "\u6635\u79F0",
    value: name,
    onChange: setName
  }), /*#__PURE__*/React.createElement(Field, {
    icon: "mail",
    placeholder: "\u90AE\u7BB1",
    type: "email",
    value: email,
    onChange: setEmail
  }), /*#__PURE__*/React.createElement(Field, {
    icon: "lock",
    placeholder: "\u5BC6\u7801",
    type: "password",
    value: pwd,
    onChange: setPwd
  }), !isReg && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      fontSize: 12.5,
      color: "var(--text-3)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      cursor: "pointer"
    },
    onClick: e => e.preventDefault()
  }, "\u5FD8\u8BB0\u5BC6\u7801\uFF1F")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-gold",
    style: {
      height: 44,
      marginTop: 4
    },
    disabled: loading
  }, loading ? "处理中…" : isReg ? "注册并进入" : "登录")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "18px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--line)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)"
    }
  }, "\u6216"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: "var(--line)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: demo,
    className: "btn btn-ghost",
    style: {
      width: "100%",
      height: 42
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 15,
    style: {
      color: "var(--gold)"
    }
  }), "\u4F53\u9A8C\u521B\u4F5C\u8005\u4F1A\u5458\uFF08\u6F14\u793A\u8D26\u53F7\uFF09"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: "var(--text-3)",
      textAlign: "center",
      marginTop: 16,
      lineHeight: 1.6
    }
  }, "\u767B\u5F55\u5373\u8868\u793A\u540C\u610F\u300A\u7528\u6237\u534F\u8BAE\u300B\u4E0E\u300A\u9690\u79C1\u653F\u7B56\u300B", /*#__PURE__*/React.createElement("br", null), "API \u6A21\u5F0F\u5DF2\u542F\u7528 \xB7 \u6570\u636E\u5C06\u6301\u4E45\u5316\u5230\u670D\u52A1\u5668"))));
}
function Field({
  icon,
  placeholder,
  type = "text",
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 11,
      height: 46,
      padding: "0 15px",
      background: "var(--bg)",
      border: "1px solid var(--line-2)",
      borderRadius: 11,
      transition: ".15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-3)",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  })), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      background: "none",
      border: "none",
      outline: "none",
      color: "var(--text)",
      fontSize: 14.5
    }
  }));
}
Object.assign(window, {
  AuthModal
});