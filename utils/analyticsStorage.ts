import {
  collection,
  doc,
  setDoc,
  addDoc,
  increment,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export type TrackedPageKey =
  | 'home'
  | 'midlife-workshop'
  | 'ahead-of-you'
  | 'soul-training'
  | 'midlife-movement'
  | 'flowtrips'
  | 'up-to-180'
  | 'the-tent'
  | 'highlights'
  | 'midlife-mini'
  | 'home-landing'
  | 'mwm'
  | 'recipes';

export interface TrackedPageMeta {
  key: TrackedPageKey;
  title: string;
  subtitle: string;
  routePath: string;
  isPrimary?: boolean;
  accentColor: string;
}

export const TRACKED_PAGES: TrackedPageMeta[] = [
  {
    key: 'home',
    title: 'אתר הבית הראשי',
    subtitle: 'בין לבין | מרחבים לנשים',
    routePath: '/',
    isPrimary: true,
    accentColor: '#54634f',
  },
  {
    key: 'midlife-workshop',
    title: 'דף נחיתה: אמצע החיים',
    subtitle: 'הסדנה המלאה (45–60)',
    routePath: '/midlife-workshop',
    isPrimary: true,
    accentColor: '#C56B3E',
  },
  {
    key: 'ahead-of-you',
    title: 'דף נחיתה: עוד לפנייך',
    subtitle: 'גילאי 60+',
    routePath: '/p/ahead-of-you',
    isPrimary: true,
    accentColor: '#b23a5f',
  },
  {
    key: 'soul-training',
    title: 'אימון לנשמה (רעות)',
    subtitle: 'אמצע החיים × מכון הכושר',
    routePath: '/reut',
    accentColor: '#0E7490',
  },
  {
    key: 'midlife-movement',
    title: 'עד 180°: מרעיון לתנועה',
    subtitle: 'המסע המלא',
    routePath: '/midlife-movement',
    accentColor: '#204C8E',
  },
  {
    key: 'flowtrips',
    title: 'FLOWTRIPS וריטריטים',
    subtitle: 'מסעות ונופש נשי',
    routePath: '/p/flowtrips',
    accentColor: '#0284c7',
  },
  {
    key: 'up-to-180',
    title: 'מיני-דף: עד 180°',
    subtitle: 'סקירה מהירה',
    routePath: '/p/up-to-180',
    accentColor: '#2563eb',
  },
  {
    key: 'the-tent',
    title: 'האוהל',
    subtitle: 'מפגשי ערב וקהילה',
    routePath: '/p/the-tent',
    accentColor: '#7c3aed',
  },
  {
    key: 'highlights',
    title: 'היילייטס',
    subtitle: 'הרצאות ומפגשים ממוקדים',
    routePath: '/p/highlights',
    accentColor: '#d97706',
  },
  {
    key: 'midlife-mini',
    title: 'מיני-דף: אמצע החיים',
    subtitle: 'כרטיס מידע מקוצר',
    routePath: '/p/midlife',
    accentColor: '#ea580c',
  },
  {
    key: 'home-landing',
    title: 'דף התוכניות (קודם)',
    subtitle: 'ריכוז כל התוכניות',
    routePath: '/home-landing',
    accentColor: '#65a30d',
  },
  {
    key: 'mwm',
    title: 'בין לבין כיצ"י (MWM)',
    subtitle: 'כוכב יאיר צור יגאל',
    routePath: '/mwm',
    accentColor: '#059669',
  },
  {
    key: 'recipes',
    title: 'ספר המתכונים',
    subtitle: 'מתכוני הקהילה',
    routePath: '/recipes',
    accentColor: '#d98c45',
  },
];

export interface PageStatDoc {
  id: string;
  kind: 'live_summary' | 'live_daily';
  pageKey: TrackedPageKey;
  date?: string;
  totalVisits: number;
  uniqueVisits: number;
  lastVisitAt: string;
}

export interface PageVisitLog {
  id: string;
  pageKey: TrackedPageKey;
  visitedAt: string;
  isUnique: boolean;
  deviceType: 'mobile' | 'desktop';
}

export interface PageStatsSummary {
  key: TrackedPageKey;
  meta: TrackedPageMeta;
  totalVisits: number;
  uniqueVisits: number;
  todayVisits: number;
  lastVisitAt: string | null;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function logFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
    },
    operationType,
    path,
  };
  console.warn('Firestore PageStats Error:', JSON.stringify(errInfo));
}

export function getTodayDateString(): string {
  // Use Israel local date so "היום" matches Israeli calendar day
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Jerusalem',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    return parts; // YYYY-MM-DD
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

/**
 * Resolves the current router pathname (+ optional host/hash context) to a TrackedPageKey,
 * or returns null for internal admin/response/form-admin pages that shouldn't be tracked.
 */
export function resolveTrackedPageKey(pathname: string): TrackedPageKey | null {
  const p = (pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';

  // Skip internal admin / responses / management routes
  if (
    p.startsWith('/responses') ||
    p.startsWith('/inquiries') ||
    p.startsWith('/admin') ||
    p.startsWith('/mwm-responses') ||
    p.startsWith('/ky-responses') ||
    p.startsWith('/mini-admin') ||
    p.startsWith('/mini-hub') ||
    p === '/mini'
  ) {
    return null;
  }

  // Check special intent fallbacks matching App.tsx routing
  if (p.includes('recipe') || p.includes('cookbook') || p.includes('matkonim') || p.includes('מתכונ')) {
    return 'recipes';
  }
  if (p.includes('reut') || p.includes('soul')) {
    return 'soul-training';
  }

  // Dedicated landing pages
  if (p === '/midlife-workshop' || p === '/midlife-full' || p === '/workshop' || p === '/marketing' || p === '/midlife-landing' || p === '/part2') {
    return 'midlife-workshop';
  }
  if (p === '/p/ahead-of-you' || p === '/ahead-of-you') {
    return 'ahead-of-you';
  }
  if (p === '/midlife-movement' || p === '/movement' || p === '/motion') {
    return 'midlife-movement';
  }
  if (p === '/p/flowtrips' || p === '/flowtrips' || p === '/p/flow-trips' || p === '/flow-trips') {
    return 'flowtrips';
  }
  if (p === '/p/up-to-180' || p === '/up-to-180') {
    return 'up-to-180';
  }
  if (p === '/p/the-tent' || p === '/the-tent') {
    return 'the-tent';
  }
  if (p === '/p/highlights' || p === '/highlights') {
    return 'highlights';
  }
  if (p === '/p/midlife' || p === '/midlife') {
    return 'midlife-mini';
  }
  if (
    p === '/home-landing' ||
    p === '/brand-landing' ||
    p === '/women-programs' ||
    p === '/all-programs' ||
    p === '/programs' ||
    p === '/brand' ||
    p === '/hub' ||
    p === '/landing'
  ) {
    return 'home-landing';
  }
  if (p === '/mwm' || p === '/ky-mwm' || p === '/mwm-form' || p === '/form') {
    return 'mwm';
  }

  // Root / Home routes
  if (p === '/' || p === '/home' || p === '/site' || p === '/website' || p === '/index.html') {
    const isBenLvenMwmHost =
      typeof window !== 'undefined' &&
      window.location.hostname.toLowerCase().includes('ben-lven-mwm');
    return isBenLvenMwmHost ? 'midlife-workshop' : 'home';
  }

  // FallbackRoute renders MainWebsite (or LandingPage on ben-lven-mwm)
  const isBenLvenMwmHost =
    typeof window !== 'undefined' &&
    window.location.hostname.toLowerCase().includes('ben-lven-mwm');
  return isBenLvenMwmHost ? 'midlife-workshop' : 'home';
}

const RECENT_MEMORY_CACHE: Record<string, number> = {};
const RECENT_UNIQUE_FALLBACK: Record<string, boolean> = {};
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes per page per session to avoid double-counting back/forth navigation

export function isWorkspaceEnvironment(): boolean {
  if (typeof window === 'undefined') return false;
  const host = (window.location.hostname || '').toLowerCase();
  return host.includes('ais-dev') || host.includes('localhost') || host.includes('127.0.0.1');
}

export async function trackPageVisit(pathname: string): Promise<void> {
  if (typeof window === 'undefined') return;

  // Never count visits from the AI Studio editing/workspace environment
  if (isWorkspaceEnvironment()) return;

  const pageKey = resolveTrackedPageKey(pathname);
  if (!pageKey) return;

  const now = Date.now();
  const sessionKey = `bein_levein_pv_ts_${pageKey}`;

  // Check in-memory and sessionStorage cooldown
  if (RECENT_MEMORY_CACHE[pageKey] && now - RECENT_MEMORY_CACHE[pageKey] < COOLDOWN_MS) {
    return;
  }
  try {
    const lastTs = Number(sessionStorage.getItem(sessionKey) || '0');
    if (lastTs && now - lastTs < COOLDOWN_MS) {
      RECENT_MEMORY_CACHE[pageKey] = lastTs;
      return;
    }
    RECENT_MEMORY_CACHE[pageKey] = now;
    sessionStorage.setItem(sessionKey, String(now));
  } catch {
    RECENT_MEMORY_CACHE[pageKey] = now;
  }

  const today = getTodayDateString();
  const nowIso = new Date().toISOString();

  // Check unique visitor per page (all-time in browser localStorage, with safe fallback)
  let isUniqueAllTime = false;
  const uniqueKey = `bein_levein_pv_uniq_${pageKey}`;
  try {
    if (!localStorage.getItem(uniqueKey)) {
      isUniqueAllTime = true;
      localStorage.setItem(uniqueKey, nowIso);
    }
  } catch {
    if (!RECENT_UNIQUE_FALLBACK[pageKey]) {
      isUniqueAllTime = true;
      RECENT_UNIQUE_FALLBACK[pageKey] = true;
    }
  }

  // Check unique visitor per page for today
  let isUniqueToday = false;
  const uniqueDayKey = `bein_levein_pv_uniq_${pageKey}_${today}`;
  try {
    if (!localStorage.getItem(uniqueDayKey)) {
      isUniqueToday = true;
      localStorage.setItem(uniqueDayKey, nowIso);
    }
  } catch {
    const dayFallbackKey = `${pageKey}_${today}`;
    if (!RECENT_UNIQUE_FALLBACK[dayFallbackKey]) {
      isUniqueToday = true;
      RECENT_UNIQUE_FALLBACK[dayFallbackKey] = true;
    }
  }

  const summaryDocId = `live_summary__${pageKey}`;
  const dailyDocId = `live_daily__${pageKey}__${today}`;
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
  const deviceType: 'mobile' | 'desktop' = isMobile ? 'mobile' : 'desktop';

  try {
    await Promise.all([
      setDoc(
        doc(db, 'page_stats', summaryDocId),
        {
          kind: 'live_summary',
          pageKey,
          totalVisits: increment(1),
          uniqueVisits: increment(isUniqueAllTime ? 1 : 0),
          lastVisitAt: nowIso,
        },
        { merge: true }
      ),
      setDoc(
        doc(db, 'page_stats', dailyDocId),
        {
          kind: 'live_daily',
          pageKey,
          date: today,
          totalVisits: increment(1),
          uniqueVisits: increment(isUniqueToday ? 1 : 0),
          lastVisitAt: nowIso,
        },
        { merge: true }
      ),
      addDoc(collection(db, 'page_visit_logs'), {
        pageKey,
        visitedAt: nowIso,
        isUnique: isUniqueAllTime,
        deviceType,
      }),
    ]);
  } catch (err) {
    logFirestoreError(err, OperationType.WRITE, `page_stats/${summaryDocId}`);
  }
}

export function subscribeToPageStats(
  onUpdate: (stats: PageStatsSummary[]) => void
): () => void {
  const summaryMap = new Map<TrackedPageKey, PageStatDoc>();
  const todayMap = new Map<TrackedPageKey, PageStatDoc>();

  const emit = () => {
    const list: PageStatsSummary[] = TRACKED_PAGES.map((meta) => {
      const s = summaryMap.get(meta.key);
      const d = todayMap.get(meta.key);
      return {
        key: meta.key,
        meta,
        totalVisits: s?.totalVisits ?? 0,
        uniqueVisits: s?.uniqueVisits ?? 0,
        todayVisits: d?.totalVisits ?? 0,
        lastVisitAt: s?.lastVisitAt ?? null,
      };
    });
    onUpdate(list);
  };

  // Emit initial zero-state immediately so UI renders without waiting
  emit();

  let unsubSummary = () => {};
  let unsubToday = () => {};

  try {
    const qSummary = query(collection(db, 'page_stats'), where('kind', '==', 'live_summary'));
    unsubSummary = onSnapshot(
      qSummary,
      (snapshot) => {
        summaryMap.clear();
        snapshot.forEach((d) => {
          const data = d.data() as Omit<PageStatDoc, 'id'>;
          if (data.pageKey) {
            summaryMap.set(data.pageKey, { id: d.id, ...data });
          }
        });
        emit();
      },
      (err) => {
        logFirestoreError(err, OperationType.GET, 'page_stats (live_summary)');
      }
    );

    const today = getTodayDateString();
    const qToday = query(collection(db, 'page_stats'), where('date', '==', today));
    unsubToday = onSnapshot(
      qToday,
      (snapshot) => {
        todayMap.clear();
        snapshot.forEach((d) => {
          const data = d.data() as Omit<PageStatDoc, 'id'>;
          if (data.kind === 'live_daily' && data.pageKey) {
            todayMap.set(data.pageKey, { id: d.id, ...data });
          }
        });
        emit();
      },
      (err) => {
        logFirestoreError(err, OperationType.GET, 'page_stats (live_daily)');
      }
    );
  } catch (err) {
    logFirestoreError(err, OperationType.GET, 'page_stats');
  }

  return () => {
    try {
      unsubSummary();
    } catch {}
    try {
      unsubToday();
    } catch {}
  };
}

export function subscribeToRecentVisitLogs(
  onUpdate: (logs: PageVisitLog[]) => void,
  maxItems = 60
): () => void {
  let unsub = () => {};
  try {
    const qLogs = query(
      collection(db, 'page_visit_logs'),
      orderBy('visitedAt', 'desc'),
      limit(maxItems)
    );
    unsub = onSnapshot(
      qLogs,
      (snapshot) => {
        const items: PageVisitLog[] = [];
        snapshot.forEach((d) => {
          const data = d.data() as Omit<PageVisitLog, 'id'>;
          if (data.pageKey && data.visitedAt) {
            items.push({ id: d.id, ...data });
          }
        });
        onUpdate(items);
      },
      (err) => {
        logFirestoreError(err, OperationType.GET, 'page_visit_logs');
      }
    );
  } catch (err) {
    logFirestoreError(err, OperationType.GET, 'page_visit_logs');
  }

  return () => {
    try {
      unsub();
    } catch {}
  };
}
