/* ============ 历史星图 · 轻量全局状态（localStorage 持久化） ============ */
(function () {
  const KEY = "lsxt_store_v1";
  const now = Date.now();
  const seed = {
    user: null,
    favorites: [{
      id: "zengguofan",
      type: "person",
      at: now - 2 * 864e5
    }, {
      id: "taiping",
      type: "event",
      at: now - 1 * 864e5
    }, {
      id: "zuozongtang",
      type: "person",
      at: now - 6 * 36e5
    }],
    history: [{
      id: "zengguofan",
      type: "person",
      at: now - 30 * 6e4
    }, {
      id: "taiping",
      type: "event",
      at: now - 95 * 6e4
    }, {
      id: "lihongzhang",
      type: "person",
      at: now - 3 * 36e5
    }, {
      id: "jiawu",
      type: "event",
      at: now - 5 * 36e5
    }, {
      id: "cixi",
      type: "person",
      at: now - 1 * 864e5
    }],
    exports: [{
      id: "zengguofan",
      type: "person",
      name: "曾国藩",
      format: "Markdown",
      at: now - 40 * 6e4
    }, {
      id: "taiping",
      type: "event",
      name: "太平天国运动",
      format: "公众号图文",
      at: now - 2 * 36e5
    }]
  };
  let state;
  try {
    state = Object.assign({}, seed, JSON.parse(localStorage.getItem(KEY)) || {});
  } catch (e) {
    state = seed;
  }
  const listeners = new Set();
  function commit(next) {
    state = next;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
    listeners.forEach(l => l());
  }
  const Store = {
    get: () => state,
    sub(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    isFav(id) {
      return state.favorites.some(f => f.id === id);
    },
    toggleFav(id, type) {
      const has = Store.isFav(id);
      commit({
        ...state,
        favorites: has ? state.favorites.filter(f => f.id !== id) : [{
          id,
          type,
          at: Date.now()
        }, ...state.favorites]
      });
      return !has;
    },
    visit(id, type) {
      commit({
        ...state,
        history: [{
          id,
          type,
          at: Date.now()
        }, ...state.history.filter(h => h.id !== id)].slice(0, 40)
      });
    },
    addExport(rec) {
      commit({
        ...state,
        exports: [{
          ...rec,
          at: Date.now()
        }, ...state.exports].slice(0, 40)
      });
    },
    clearHistory() {
      commit({
        ...state,
        history: []
      });
    },
    login(user) {
      commit({
        ...state,
        user: {
          plan: "free",
          since: Date.now(),
          ...user
        }
      });
    },
    logout() {
      commit({
        ...state,
        user: null
      });
    },
    upgrade(plan) {
      commit({
        ...state,
        user: {
          ...(state.user || {
            name: "创作者",
            email: ""
          }),
          plan
        }
      });
    }
  };
  function useStore() {
    const [, set] = React.useState(0);
    React.useEffect(() => Store.sub(() => set(v => v + 1)), []);
    return Store;
  }
  window.Store = Store;
  window.useStore = useStore;

  // 相对时间
  window.fromNow = function (ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return "刚刚";
    if (s < 3600) return Math.floor(s / 60) + " 分钟前";
    if (s < 86400) return Math.floor(s / 3600) + " 小时前";
    const d = Math.floor(s / 86400);
    if (d < 30) return d + " 天前";
    return new Date(ts).toLocaleDateString("zh-CN");
  };
  // 会员方案
  window.PLANS = [{
    id: "free",
    name: "免费账号",
    price: "¥0",
    per: "",
    tagline: "浏览与基础检索",
    feats: ["全站浏览与搜索", "收藏与浏览历史", "每日 5 次 AI 提问"]
  }, {
    id: "pro",
    name: "专业会员",
    price: "¥29",
    per: "/月",
    tagline: "面向学习者",
    feats: ["高级搜索与筛选", "资料导出 Markdown / Word", "每日 50 次 AI 提问", "无广告"]
  }, {
    id: "creator",
    name: "创作者会员",
    price: "¥69",
    per: "/月",
    tagline: "面向内容创作者",
    highlight: true,
    feats: ["公众号选题与文章大纲", "关系图谱 / 时间线导出", "素材包批量导出", "无限 AI 提问", "优先新功能"]
  }];
})();