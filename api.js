/* ============ 历史星图 · API Client (本地缓存版) ============ */
/* 不再调用远程 Render API，所有数据从 window.DB 获取 */

const API = {
  base: '',

  // 本地数据访问，不需要网络请求
  async request(path, opts) {
    return {};
  },

  get(path) { return this.request(path); },
  post(path, body) { return this.request(path); },
  del(path) { return this.request(path); },

  // Persons
  persons: () => Object.values(window.DB.persons || {}),
  person: async (id) => {
    if (!window.DB) return null;
    return window.DB.loadPerson(id);
  },
  personRelations: (id) => {
    const p = window.DB.persons[id];
    return p ? (p.relations || []) : [];
  },
  personEvents: (id) => {
    const p = window.DB.persons[id];
    return p ? (p.events || []) : [];
  },
  personSimilar: (id, limit) => {
    return [];
  },

  // Events
  events: () => Object.values(window.DB.events || {}),
  event: (id) => window.DB.events[id] || null,
  eventPersons: (id) => {
    const e = window.DB.events[id];
    return e ? (e.persons || []) : [];
  },

  // Dynasties
  dynasties: () => window.DB.dynasties || [],
  dynasty: (id) => window.DB.dynastyInfo[id] || null,

  // Timeline
  timeline: (params) => [],

  // Search - 本地扫描 DB.persons 和 DB.events
  search: (q) => {
    if (!q || !window.DB) return { persons: [], events: [], dynasties: [] };
    const qLower = q.toLowerCase().trim();
    const persons = [];
    const events = [];
    const dynasties = [];

    for (const p of Object.values(window.DB.persons || {})) {
      if ((p.name + (p.alias || '')).toLowerCase().includes(qLower)) {
        persons.push({ id: p.id, name: p.name, alias: p.alias || '' });
      }
    }
    for (const e of Object.values(window.DB.events || {})) {
      if ((e.name + (e.place || '')).toLowerCase().includes(qLower)) {
        events.push({ id: e.id, name: e.name });
      }
    }
    for (const d of (window.DB.dynasties || [])) {
      if (d.name && d.name.toLowerCase().includes(qLower)) {
        dynasties.push({ id: d.id, name: d.name });
      }
    }
    return { persons: persons.slice(0, 10), events: events.slice(0, 10), dynasties: dynasties.slice(0, 10) };
  },

  // Graph
  graph: (id, depth) => ({ nodes: [], edges: [] }),

  // Auth - 保留接口但不再调用远程
  register: (email, password, name) => Promise.resolve({ token: 'local', user: { id: '1', name, email, plan: 'free' } }),
  login: (email, password) => Promise.resolve({ token: 'local', user: { id: '1', name: email.split('@')[0], email, plan: 'free' } }),
  me: () => Promise.resolve(null),

  // Users - 本地模拟
  favorites: () => Promise.resolve([]),
  addFavorite: (entityType, entityId) => Promise.resolve({}),
  removeFavorite: (entityType, entityId) => Promise.resolve({}),
  history: () => Promise.resolve([]),
  addHistory: (entityType, entityId) => Promise.resolve({}),
  exports: () => Promise.resolve([]),
};

window.API = API;
