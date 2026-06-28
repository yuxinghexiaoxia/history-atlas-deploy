/* ============ 历史星图 · DB Loader ============ */
/* 尝试从后端 API 加载数据，转换为前端格式，失败时保留本地数据 */

(function() {
  const fallbackDB = window.DB;

  function transformPerson(p) {
    // 如果 fallback 里有这条 person，保留附属字段（relations/locations/events/sources）
    const fb = fallbackDB && fallbackDB.persons ? (fallbackDB.persons[p.id] || {}) : {};
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
      sources: fb.sources || [],
      life: (p.lifeEvents || []).map(e => ({ y: e.y, key: e.key || false, t: e.t, s: e.s || '' })),
      relations: fb.relations || [],
      events: fb.events || [],
      locations: fb.locations || [],
    };
  }

  function transformEvent(e) {
    const start = e.startYear ?? e.start;
    const end = e.endYear ?? e.end;
    // 如果 fallback 里有这条 event，保留附属字段（sources/chain/related/persons）
    const fb = fallbackDB && fallbackDB.events ? (fallbackDB.events[e.id] || {}) : {};
    return {
      id: e.id,
      type: 'event',
      name: e.name,
      dynasty: e.dynastyId || '',
      // 同时输出 start/end 和 startYear/endYear，兼容前端两种命名
      start,
      end,
      startYear: start,
      endYear: end,
      place: e.place || '',
      short: e.shortIntro || '',
      // 同时输出 bg/background，兼容前端两种命名
      bg: e.background || e.bg || '',
      background: e.background || e.bg || '',
      process: e.process || '',
      result: e.result || '',
      controversy: e.controversy || '',
      chain: fb.chain || e.chain || [],
      persons: fb.persons || [],
      related: e.relatedEventIds || fb.related || [],
      sources: fb.sources || [],
    };
  }

  function transformDynasty(d) {
    return {
      id: d.id,
      name: d.name,
      // 同时输出 full/fullName 和 en/englishName，兼容前端两种命名
      full: d.fullName || d.full || d.name,
      fullName: d.fullName || d.full || d.name,
      en: d.englishName || d.en || '',
      englishName: d.englishName || d.en || '',
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

      // dynasty 详细信息 dict（key=id），供 DynastyPage 用 DB.dynastyInfo[id]
      const dynastiesInfoDict = {};
      dynastiesList.forEach(d => { dynastiesInfoDict[d.id] = transformDynasty(d); });

      // 如果 API 返回空（fallback），使用 data.js 的本地数据，确保二级页面有内容
      const personsFinal = Object.keys(persons).length ? persons : (fallbackDB.persons || {});
      const eventsFinal = Object.keys(events).length ? events : (fallbackDB.events || {});
      const locations = fallbackDB.locations || {};
      const mapData = fallbackDB.mapData || [];
      // 简版 dynasties (array) 来自 fallback，供 home.js DynastyBand 用 .map 渲染朝代按钮
      const dynasties = fallbackDB.dynasties || [];
      const timeline = fallbackDB.timeline || [];

      const hotPersons = Object.keys(personsFinal).slice(0, 8);
      const hotEvents = Object.keys(eventsFinal).slice(0, 8);

      window.DB = {
        persons: personsFinal,
        events: eventsFinal,
        locations, dynasties,
        // 优先用 API 转换后的完整信息，回退到 data.js 的 dynastyInfo
        dynastyInfo: Object.keys(dynastiesInfoDict).length
          ? dynastiesInfoDict
          : (fallbackDB.dynastyInfo || {}),
        mapData, timeline, hotPersons, hotEvents,
        relMeta: fallbackDB.relMeta || {},
        get: (type, id) => {
          if (type === 'person') return personsFinal[id];
          if (type === 'event') return eventsFinal[id];
          if (type === 'dynasty') return dynastiesFinal[id];
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
