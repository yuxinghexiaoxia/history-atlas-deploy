/* ============ 历史星图 · DB Loader (CDN 版) ============ */
/* 从 jsDelivr CDN 加载拆分后的 JSON 数据，支持按需加载朝代详情 */

(function () {
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/yuxinghexiaoxia/history-atlas-deploy@main';
  const CACHE_VERSION = 'v=28';
  const detailCache = {}; // 已加载的朝代完整数据缓存

  async function loadJSON(path) {
    const url = CDN_BASE + path + '?' + CACHE_VERSION;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load ' + path + ': ' + res.status);
    return res.json();
  }

  // 初始化：加载索引 + 公共数据
  async function init() {
    try {
      const [index, eventsData, locationsData, dynastiesData, relMetaData] = await Promise.all([
        loadJSON('/index.json'),
        loadJSON('/data/events.json').catch(() => ({ events: {} })),
        loadJSON('/data/locations.json').catch(() => ({ locations: {} })),
        loadJSON('/data/dynasties.json').catch(() => ({ dynasties: [], dynastyInfo: {} })),
        loadJSON('/data/relMeta.json').catch(() => ({ relMeta: {} })),
      ]);

      // 设置全局 DB
      window.DB = {
        persons: index.persons || {},
        events: eventsData.events || {},
        locations: locationsData.locations || {},
        dynasties: dynastiesData.dynasties || [],
        dynastyInfo: dynastiesData.dynastyInfo || {},
        relMeta: relMetaData.relMeta || {},
        timeline: [],
        hotPersons: Object.keys(index.persons || {}).slice(0, 8),
        hotEvents: Object.keys(eventsData.events || {}).slice(0, 8),

        get: function (type, id) {
          if (id === undefined) { id = type; type = 'person'; }
          if (type === 'person') return this.persons[id];
          if (type === 'event') return this.events[id];
          if (type === 'dynasty') return this.dynastyInfo[id];
          return null;
        },

        getSimilarPersons: function () { return []; },
        getTodayHistory: function () { return []; },
        getPersonLocations: function () { return []; },

        // 异步加载单个人物完整详情
        loadPerson: async function (id) {
          const p = this.persons[id];
          if (!p) return null;
          // 已有完整数据（有 intro 字段）直接返回
          if (p.intro && p.achievements) return p;

          const dynasty = p.dynasty;
          if (!dynasty) return p;

          // 加载朝代详情
          if (!detailCache[dynasty]) {
            try {
              const data = await loadJSON('/data/dynasty-' + dynasty + '.json');
              detailCache[dynasty] = data.persons || {};
              // 合并完整数据到 DB.persons
              Object.assign(this.persons, detailCache[dynasty]);
            } catch (e) {
              console.warn('Failed to load dynasty detail:', dynasty, e.message);
            }
          }
          return this.persons[id] || p;
        },

        // 异步加载单个人物详情（兼容旧代码别名）
        loadPersonDetail: async function (id) {
          return this.loadPerson(id);
        },

        // 异步加载事件详情（事件通常已完整）
        loadEvent: async function (id) {
          return this.events[id] || null;
        },
      };

      console.log('DB loaded from CDN:', Object.keys(window.DB.persons).length, 'persons indexed');
      window.dispatchEvent(new Event('db-ready'));
    } catch (e) {
      console.error('DB init failed:', e.message);
      // 降级：设置空 DB 避免崩溃
      window.DB = {
        persons: {}, events: {}, locations: {}, dynasties: [],
        dynastyInfo: {}, relMeta: {}, timeline: [],
        hotPersons: [], hotEvents: [],
        get: function () { return null; },
        getSimilarPersons: function () { return []; },
        getTodayHistory: function () { return []; },
        getPersonLocations: function () { return []; },
        loadPerson: async function (id) { return null; },
        loadEvent: async function (id) { return null; },
      };
      window.dispatchEvent(new Event('db-ready'));
    }
  }

  // 立即启动加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
