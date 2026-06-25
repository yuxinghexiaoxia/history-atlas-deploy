/* ============ 历史星图 · API Client ============ */
const API_BASE = (window.__API_BASE || 'https://certification-devoted-carries-rapidly.trycloudflare.com') + '/api';

const API = {
  base: API_BASE,

  async request(path, opts = {}) {
    const url = API_BASE + path;
    const token = localStorage.getItem('lsxt_token');
    const headers = {
      'Content-Type': 'application/json',
      ...opts.headers,
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    try {
      const res = await fetch(url, { ...opts, headers });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      return res.json();
    } catch (e) {
      console.warn('API error:', e.message);
      throw e;
    }
  },

  get(path) { return API.request(path, { method: 'GET' }); },
  post(path, body) { return API.request(path, { method: 'POST', body: JSON.stringify(body) }); },
  del(path) { return API.request(path, { method: 'DELETE' }); },

  // Persons
  persons: () => API.get('/persons'),
  person: (id) => API.get(`/persons/${id}`),
  personRelations: (id) => API.get(`/persons/${id}/relations`),
  personEvents: (id) => API.get(`/persons/${id}/events`),
  personSimilar: (id, limit = 5) => API.get(`/persons/${id}/similar?limit=${limit}`),

  // Events
  events: () => API.get('/events'),
  event: (id) => API.get(`/events/${id}`),
  eventPersons: (id) => API.get(`/events/${id}/persons`),

  // Dynasties
  dynasties: () => API.get('/dynasties'),
  dynasty: (id) => API.get(`/dynasties/${id}`),

  // Timeline
  timeline: (params) => API.get('/timeline?' + new URLSearchParams(params).toString()),

  // Search
  search: (q) => API.get('/search?q=' + encodeURIComponent(q)),

  // Graph
  graph: (id, depth = 1) => API.get(`/graphs/${id}?depth=${depth}`),

  // Auth
  register: (email, password, name) => API.post('/auth/register', { email, password, name }),
  login: (email, password) => API.post('/auth/login', { email, password }),
  me: () => API.get('/auth/me'),

  // Users
  favorites: () => API.get('/users/favorites'),
  addFavorite: (entityType, entityId) => API.post('/users/favorites', { entityType, entityId }),
  removeFavorite: (entityType, entityId) => API.del(`/users/favorites/${entityType}/${entityId}`),
  history: () => API.get('/users/history'),
  addHistory: (entityType, entityId) => API.post('/users/history', { entityType, entityId }),
  exports: () => API.get('/users/exports'),
};

window.API = API;
