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
      // 兼容两种字段命名：API 可能用 dynastyId 或 dynasty
      dynasty: p.dynastyId || p.dynasty || fb.dynasty || '',
      // 兼容两种字段命名：API 可能用 roles 或 role
      role: p.roles || p.role || fb.role || [],
      short: p.shortIntro || p.short || fb.short || '',
      intro: p.fullIntro || p.intro || fb.intro || '',
      achievements: p.achievements || [],
      controversy: p.controversy || '',
      quote: p.quote || '',
      quoteSrc: p.quoteSource || p.quoteSrc || '',
      works: p.works || [],
      sources: fb.sources || [],
      // 兼容两种字段命名：API 可能用 lifeEvents 或 life
      life: (p.lifeEvents || p.life || []).map(e => ({ y: e.y, key: e.key || false, t: e.t, s: e.s || '' })),
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
      // 兼容两种字段命名：API 可能用 dynastyId 或 dynasty
      dynasty: e.dynastyId || e.dynasty || fb.dynasty || '',
      // 同时输出 start/end 和 startYear/endYear，兼容前端两种命名
      start,
      end,
      startYear: start,
      endYear: end,
      place: e.place || '',
      short: e.shortIntro || e.short || fb.short || '',
      // 同时输出 bg/background，兼容前端两种命名
      bg: e.background || e.bg || fb.bg || '',
      background: e.background || e.bg || fb.background || '',
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
    const fb = fallbackDB && fallbackDB.dynastyInfo ? (fallbackDB.dynastyInfo[d.id] || {}) : {};
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
      // 保留本地数据中的扩展字段（皇帝、制度、疆域、战争等）
      emperors: d.emperors || fb.emperors || [],
      institutions: d.institutions || fb.institutions || [],
      territory: d.territory || fb.territory || [],
      wars: d.wars || fb.wars || [],
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

      // 合并策略：API 数据覆盖本地数据中的同 ID 条目，本地独有的条目保留
      // 这样确保 data.js 新增的隋唐、五代十国等条目不会被 API 数据覆盖丢失
      const personsFinal = Object.keys(persons).length
        ? { ...(fallbackDB.persons || {}), ...persons }
        : (fallbackDB.persons || {});
      const eventsFinal = Object.keys(events).length
        ? { ...(fallbackDB.events || {}), ...events }
        : (fallbackDB.events || {});
      const locations = fallbackDB.locations || {};
      const mapData = fallbackDB.mapData || [];
      // 简版 dynasties (array) 来自 fallback，供 home.js DynastyBand 用 .map 渲染朝代按钮
      const dynasties = fallbackDB.dynasties || [];
      const timeline = fallbackDB.timeline || [];

      const hotPersons = Object.keys(personsFinal).slice(0, 8);
      const hotEvents = Object.keys(eventsFinal).slice(0, 8);

      // 合并 dynastyInfo：API 转换后的优先，fallback 中独有的字段保留
      const mergedDynastyInfo = { ...(fallbackDB.dynastyInfo || {}) };
      Object.keys(dynastiesInfoDict).forEach(did => {
        mergedDynastyInfo[did] = {
          ...(mergedDynastyInfo[did] || {}),
          ...dynastiesInfoDict[did],
        };
      });

      window.DB = {
        persons: personsFinal,
        events: eventsFinal,
        locations, dynasties,
        // 优先用合并后的 dynastyInfo，回退到 data.js 的本地 dynastyInfo
        dynastyInfo: Object.keys(mergedDynastyInfo).length
          ? mergedDynastyInfo
          : (fallbackDB.dynastyInfo || {}),
        mapData, timeline, hotPersons, hotEvents,
        relMeta: fallbackDB.relMeta || {},
        get: (type, id) => {
          if (type === 'person') return personsFinal[id];
          if (type === 'event') return eventsFinal[id];
          if (type === 'dynasty') return mergedDynastyInfo[id];
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
