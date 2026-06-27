/* ============ 历史星图 · DB Loader ============ */
/* 尝试从后端 API 加载数据，转换为前端格式，失败时保留本地数据 */

(function() {
  const fallbackDB = window.DB;

  function transformPerson(p) {
    return {
      id: p.id,
      type: 'person',
      name: p.name,
      alias: p.alias || '',
      born: p.born,
      died: p.died,
      dynasty: p.dynastyId || '',
      role: p.roles || [],
      short: p.shortIntro || '',
      intro: p.fullIntro || '',
      achievements: p.achievements || [],
      controversy: p.controversy || '',
      quote: p.quote || '',
      quoteSrc: p.quoteSource || '',
      works: p.works || [],
      sources: [],
      life: (p.lifeEvents || []).map(e => ({ y: e.y, key: e.key || false, t: e.t, s: e.s || '' })),
      relations: [],
      events: [],
      locations: [],
    };
  }

  function transformEvent(e) {
    return {
      id: e.id,
      type: 'event',
      name: e.name,
      dynasty: e.dynastyId || '',
      startYear: e.startYear,
      endYear: e.endYear,
      place: e.place || '',
      short: e.shortIntro || '',
      background: e.background || '',
      process: e.process || '',
      result: e.result || '',
      controversy: e.controversy || '',
      chain: e.chain || [],
      persons: [],
      related: e.relatedEventIds || [],
    };
  }

  function transformDynasty(d) {
    return {
      id: d.id,
      name: d.name,
      fullName: d.fullName || d.name,
      englishName: d.englishName || '',
      span: d.span || '',
      founded: d.founded || '',
      capital: d.capital || '',
      ended: d.ended || '',
      summary: d.summary || '',
      stats: d.stats || [],
      status: d.status || 'partial',
    };
  }

  async function loadFromAPI() {
    if (!window.API) return false;
    try {
      const [personsList, eventsList, dynastiesList] = await Promise.all([
        window.API.persons().catch(() => []),
        window.API.events().catch(() => []),
        window.API.dynasties().catch(() => []),
      ]);

      const persons = {};
      personsList.forEach(p => { persons[p.id] = transformPerson(p); });

      const events = {};
      eventsList.forEach(e => { events[e.id] = transformEvent(e); });

      const dynasties = {};
      dynastiesList.forEach(d => { dynasties[d.id] = transformDynasty(d); });

      const locations = fallbackDB.locations || {};
      const mapData = fallbackDB.mapData || [];
      const timeline = fallbackDB.timeline || [];

      const hotPersons = Object.values(persons).slice(0, 8);
      const hotEvents = Object.values(events).slice(0, 8);

      window.DB = {
        persons, events, locations, dynasties,
        dynastyInfo: dynasties,
        mapData, timeline, hotPersons, hotEvents,
        relMeta: fallbackDB.relMeta || {},
        get: (type, id) => {
          if (type === 'person') return persons[id];
          if (type === 'event') return events[id];
          if (type === 'dynasty') return dynasties[id];
          return null;
        },
        getSimilarPersons: fallbackDB.getSimilarPersons,
        getTodayHistory: fallbackDB.getTodayHistory,
        getPersonLocations: fallbackDB.getPersonLocations,
      };

      console.log('DB loaded from API:', personsList.length, 'persons,', eventsList.length, 'events');
      return true;
    } catch (e) {
      console.warn('API load failed, using fallback:', e.message);
      ensureDBMethods();
      return false;
    }
  }

  // 确保 DB 拥有所有前端必需的方法（即使 API 加载失败）
  function ensureDBMethods() {
    const db = window.DB || fallbackDB;
    if (!db.get) {
      db.get = (type, id) => {
        if (type === 'person') return db.persons[id];
        if (type === 'event') return db.events[id];
        if (type === 'dynasty') return db.dynasties[id];
        return null;
      };
    }
    if (!db.getSimilarPersons) db.getSimilarPersons = () => [];
    if (!db.getTodayHistory) db.getTodayHistory = () => [];
    if (!db.getPersonLocations) db.getPersonLocations = () => [];
    window.DB = db;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { loadFromAPI(); });
  } else {
    loadFromAPI();
  }
})();
