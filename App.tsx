import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Recipes from './pages/Recipes';
import LandingPage from './pages/LandingPage';
import PartTwo from './pages/PartTwo';
import MarketingPage from './pages/MarketingPage';
import MwmPage from './pages/MwmPage';
import MwmIntakeFormPage from './pages/MwmIntakeFormPage';
import MwmResponsesPage from './pages/MwmResponsesPage';
import InquiriesResponsesPage from './pages/InquiriesResponsesPage';
import MidlifeMiniPage from './pages/mini/MidlifeMiniPage';
import UpTo180MiniPage from './pages/mini/UpTo180MiniPage';
import HighlightsMiniPage from './pages/mini/HighlightsMiniPage';
import TheTentMiniPage from './pages/mini/TheTentMiniPage';
import AheadOfYouMiniPage from './pages/mini/AheadOfYouMiniPage';
import FlowTripsMiniPage from './pages/mini/FlowTripsMiniPage';
import MiniPagesManager from './pages/mini/MiniPagesManager';
import BrandLandingPage from './pages/BrandLandingPage';
import MainWebsite from './pages/MainWebsite';
import MidlifeMovementPage from './pages/MidlifeMovementPage';
import SoulTrainingPage from './pages/SoulTrainingPage';
import PasscodeProtected from './components/PasscodeProtected';

import { 
  Sparkles, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Layers,
  ArrowRight
} from 'lucide-react';

const FloatingReturnToWebsite: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on main website routes and on soul training landing page
  const isExcluded = 
    location.pathname === '/' || 
    location.pathname === '/home' || 
    location.pathname === '/site' || 
    location.pathname === '/website' ||
    location.pathname.includes('reut') ||
    location.pathname.includes('soul');

  if (isExcluded) {
    return null;
  }

  // Determine target section based on query params or previous navigation
  const searchParams = new URLSearchParams(location.search);
  const fromParam = searchParams.get('from');
  const targetSection = fromParam === 'testimonials' ? 'testimonials' : 'programs';
  const subtitle = targetSection === 'testimonials' ? 'לאזור ההמלצות' : 'לאזור התוכניות';

  const handleReturn = () => {
    navigate(`/?section=${targetSection}`);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9995] font-sans" dir="rtl">
      <button
        type="button"
        onClick={handleReturn}
        className="group flex items-center gap-2 sm:gap-2.5 bg-gradient-to-r from-[#2D5043] to-[#1E362D] hover:from-[#C56B3E] hover:to-[#A8582D] text-white px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-2xl border-2 border-white/90 text-xs sm:text-sm font-black transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        title="חזרה לאתר הבית של בין לבין"
        aria-label="חזרה לאתר הבית של בין לבין"
      >
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </span>
        <div className="flex flex-col text-right">
          <span className="leading-none text-xs sm:text-sm font-black">חזרה לאתר הבית</span>
          <span className="text-[10px] text-amber-200/90 font-medium mt-0.5">
            {subtitle}
          </span>
        </div>
      </button>
    </div>
  );
};

const InternalNav: React.FC = () => {
  const location = useLocation();
  const [showMiniDropdown, setShowMiniDropdown] = React.useState(false);

  // Check strictly if we are in the development workspace on computer
  const isWorkspaceEnv = typeof window !== 'undefined' && (
    window.location.hostname.includes('ais-dev') ||
    window.location.hostname.includes('localhost') ||
    window.location.hostname.includes('127.0.0.1')
  );

  // In the published page / preview / client link - DO NOT RENDER ANYTHING AT ALL!
  if (!isWorkspaceEnv) {
    return null;
  }

  const [isVisible, setIsVisible] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('beinlevein_workspace_nav_visible');
      if (saved !== null) return saved === 'true';
    }
    return true;
  });

  const toggleVisibility = () => {
    setIsVisible(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('beinlevein_workspace_nav_visible', String(next));
      }
      return next;
    });
  };

  const mainTabs = [
    { 
      id: 'main-website', 
      name: 'אתר הבית (ראשי)', 
      path: '/', 
      isFlagship: true,
      badge: 'האתר'
    },
    { 
      id: 'home-landing', 
      name: 'דף הבית נחיתה (קודם)', 
      path: '/home-landing' 
    },
    { 
      id: 'midlife-workshop', 
      name: 'סדנת אמצע החיים (דף הנחיתה)', 
      path: '/midlife-workshop', 
      badge: 'הדגל'
    },
    { 
      id: 'soul-training', 
      name: 'אמצע החיים ✦ אימון לנשמה (רעות)', 
      path: '/soul-training',
      isSoul: true,
      badge: 'חדש'
    },
    { 
      id: 'midlife-movement', 
      name: 'עד 180°: מרעיון לתנועה', 
      path: '/midlife-movement',
      isMovement: true
    },
    { 
      id: 'mwm', 
      name: 'בין לבין כיצ"י (MWM)', 
      path: '/mwm' 
    },
    { 
      id: 'mwm-form', 
      name: 'טופס "נעים להכיר" (למילוי)', 
      path: '/mwm-form' 
    },
    { 
      id: 'recipes', 
      name: 'ספר המתכונים', 
      path: '/recipes' 
    },
    { 
      id: 'responses', 
      name: 'מתעניינות בסדנה ופניות מהאתר', 
      path: '/responses?code=9672',
      isHighlight: true
    },
    { 
      id: 'mwm-responses', 
      name: 'תשובות שאלון כיצ"י', 
      path: '/mwm-responses?code=9672' 
    },
    { 
      id: 'mini-admin', 
      name: 'ניהול מיני-דפים', 
      path: '/mini-admin' 
    },
  ];

  const miniPages = [
    { name: 'אמצע החיים (מיני דף)', path: '/p/midlife' },
    { name: 'עוד לפנייך (60+)', path: '/p/ahead-of-you' },
    { name: 'עד 180°', path: '/p/up-to-180' },
    { name: 'FLOWTRIPS וריטריטים', path: '/p/flowtrips' },
    { name: 'האוהל', path: '/p/the-tent' },
    { name: 'היילייטס', path: '/p/highlights' },
  ];

  const currentPath = location.pathname;

  return (
    <>
      {/* If collapsed in workspace, show small floating pill to reopen */}
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 z-[9999] bg-[#2D5043] hover:bg-[#C56B3E] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-white/80 text-xs font-black flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
          title="פתח לשוניות ניווט בסביבת עבודה"
        >
          <Layers className="w-4 h-4 text-amber-300" />
          <span>לשוניות סביבת עבודה</span>
          <Eye className="w-3.5 h-3.5 text-white/80" />
        </button>
      )}

      {/* Main Workspace Navigation Bar - Only in Workspace */}
      {isVisible && (
        <aside aria-label="סרגל ניווט סביבת עבודה" className="sticky top-0 z-[9999] w-full bg-[#1e2f27] text-white border-b-2 border-[#C56B3E]/60 shadow-xl backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Right: Badge & Tabs */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5 pl-2 border-l border-white/20 ml-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-black tracking-wide text-amber-300 whitespace-nowrap">
                  סביבת עבודה:
                </span>
              </div>

              {/* Main Tabs */}
              <div className="flex items-center flex-wrap gap-1.5">
                {mainTabs.map((tab) => {
                  const isActive = currentPath === tab.path || 
                    (tab.id === 'main-website' && (currentPath === '' || currentPath === '/' || currentPath === '/home' || currentPath === '/site' || currentPath === '/website')) ||
                    (tab.id === 'home-landing' && (currentPath === '/home-landing' || currentPath === '/brand-landing' || currentPath === '/landing' || currentPath === '/all-programs' || currentPath === '/women-programs')) ||
                    (tab.id === 'midlife-workshop' && (currentPath === '/midlife-workshop' || currentPath === '/midlife-full' || currentPath === '/workshop')) ||
                    (tab.id === 'soul-training' && (currentPath === '/soul-training' || currentPath === '/reut' || currentPath === '/midlife-soul' || currentPath === '/soul')) ||
                    (tab.id === 'midlife-movement' && (currentPath === '/midlife-movement' || currentPath === '/movement' || currentPath === '/motion')) ||
                    (tab.id === 'responses' && (currentPath === '/responses' || currentPath === '/inquiries'));

                  return (
                    <NavLink
                      key={tab.id}
                      to={tab.path}
                      className={
                        tab.isFlagship
                          ? `px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                              isActive
                                ? 'bg-[#C56B3E] text-white ring-2 ring-amber-300 shadow-md font-black scale-105'
                                : 'bg-gradient-to-r from-[#C56B3E]/90 to-[#B85D19]/90 text-white hover:brightness-110 border border-amber-300/40'
                            }`
                          : tab.isSoul
                          ? `px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                              isActive
                                ? 'bg-[#0E7490] text-white ring-2 ring-cyan-300 shadow-md font-black scale-105'
                                : 'bg-[#0E7490]/85 text-white hover:bg-[#0E7490] border border-cyan-300/40'
                            }`
                          : tab.isMovement
                          ? `px-3 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                              isActive
                                ? 'bg-[#204C8E] text-white ring-2 ring-sky-300 shadow-md font-black scale-105'
                                : 'bg-[#204C8E]/85 text-white hover:bg-[#204C8E] border border-blue-300/40'
                            }`
                          : tab.isHighlight
                          ? `px-2.5 py-1 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                              isActive
                                ? 'bg-amber-400 text-gray-950 font-black shadow-md ring-2 ring-amber-300'
                                : 'bg-amber-400/20 text-amber-200 hover:bg-amber-400 hover:text-gray-950 border border-amber-400/30'
                            }`
                          : `px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isActive
                                ? 'bg-white text-[#1e2f27] shadow-sm font-black'
                                : 'bg-white/10 text-gray-200 hover:bg-white/25 hover:text-white border border-white/15'
                            }`
                      }
                    >
                      {tab.isFlagship && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                      <span>{tab.name}</span>
                    </NavLink>
                  );
                })}

                {/* Mini Pages Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowMiniDropdown(!showMiniDropdown)}
                    className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/10 hover:bg-white/25 text-gray-200 hover:text-white border border-white/15 flex items-center gap-1 cursor-pointer"
                  >
                    <span>עוד מיני-דפים</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showMiniDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showMiniDropdown && (
                    <div 
                      className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-2xl shadow-2xl border-2 border-brand-beige p-2 z-[10000] text-right animate-in fade-in"
                      onMouseLeave={() => setShowMiniDropdown(false)}
                    >
                      <div className="text-[10px] font-black text-gray-400 px-2 py-1 uppercase border-b border-gray-100 mb-1">
                        מיני-דפים עצמאיים:
                      </div>
                      {miniPages.map(page => (
                        <NavLink
                          key={page.path}
                          to={page.path}
                          onClick={() => setShowMiniDropdown(false)}
                          className={({ isActive }) =>
                            `block px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                              isActive 
                                ? 'bg-[#C56B3E] text-white font-black' 
                                : 'text-gray-700 hover:bg-gray-100 hover:text-[#C56B3E]'
                            }`
                          }
                        >
                          {page.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Left Actions: Minimize button only */}
            <div className="flex items-center gap-2 mr-auto">
              <button
                onClick={toggleVisibility}
                className="p-1 rounded-full hover:bg-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="מזער סרגל לשוניות"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </aside>
      )}
    </>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

const FallbackRoute: React.FC = () => {
  const location = useLocation();
  const currentPath = (location.pathname || '').toLowerCase();
  const currentSearch = (location.search || '').toLowerCase();
  const rawHash = (typeof window !== 'undefined' ? window.location.hash || '' : '').toLowerCase();
  const rawHref = (typeof window !== 'undefined' ? window.location.href || '' : '').toLowerCase();

  const isRecipeIntent = 
    currentPath.includes('recipe') || 
    currentPath.includes('מתכונ') || 
    currentPath.includes('cookbook') || 
    currentPath.includes('matkonim') || 
    currentSearch.includes('recipe') || 
    currentSearch.includes('מתכונ') || 
    rawHash.includes('recipe') || 
    rawHash.includes('מתכונ') || 
    rawHref.includes('recipe') || 
    rawHref.includes('מתכונ');

  if (isRecipeIntent) {
    return <Recipes />;
  }

  const isSoulIntent = 
    currentPath.includes('reut') || 
    currentPath.includes('soul') || 
    currentSearch.includes('reut') || 
    currentSearch.includes('soul') || 
    rawHash.includes('reut') || 
    rawHash.includes('soul') || 
    rawHref.includes('reut') || 
    rawHref.includes('soul');

  if (isSoulIntent) {
    return <SoulTrainingPage />;
  }

  const isBenLvenMwmHost = typeof window !== 'undefined' && 
    window.location.hostname.toLowerCase().includes('ben-lven-mwm');

  if (isBenLvenMwmHost) {
    return <LandingPage />;
  }

  return <MainWebsite />;
};

const RootPage: React.FC = () => {
  const isBenLvenMwmHost = typeof window !== 'undefined' && 
    window.location.hostname.toLowerCase().includes('ben-lven-mwm');

  if (isBenLvenMwmHost) {
    return <LandingPage />;
  }

  if (typeof window !== 'undefined') {
    const rawHref = (window.location.href || '').toLowerCase();
    const rawHash = (window.location.hash || '').toLowerCase();
    const rawSearch = (window.location.search || '').toLowerCase();
    const rawPath = (window.location.pathname || '').toLowerCase();

    const isSoulIntent = 
      rawHref.includes('reut') || 
      rawHref.includes('soul') || 
      rawHash.includes('reut') || 
      rawHash.includes('soul') || 
      rawPath.includes('reut') || 
      rawPath.includes('soul') || 
      rawSearch.includes('reut') || 
      rawSearch.includes('soul');

    if (isSoulIntent) {
      return <SoulTrainingPage />;
    }
  }

  return <MainWebsite />;
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const rawHref = (typeof window !== 'undefined' ? window.location.href || '' : '').toLowerCase();
    const rawHash = (typeof window !== 'undefined' ? window.location.hash || '' : '').toLowerCase();
    const rawPath = (typeof window !== 'undefined' ? window.location.pathname || '' : '').toLowerCase();
    const rawSearch = (typeof window !== 'undefined' ? window.location.search || '' : '').toLowerCase();

    const isRecipeIntent = 
      rawHref.includes('recipe') || 
      rawHref.includes('מתכונ') || 
      rawHref.includes('cookbook') || 
      rawHref.includes('matkonim') || 
      rawHash.includes('recipe') || 
      rawHash.includes('מתכונ') || 
      rawHash.includes('cookbook') || 
      rawHash.includes('matkonim') || 
      rawPath.includes('recipe') || 
      rawPath.includes('מתכונ') || 
      rawSearch.includes('recipe') || 
      rawSearch.includes('מתכונ');

    if (isRecipeIntent && location.pathname !== '/recipes') {
      navigate('/recipes', { replace: true });
      return;
    }

    const isSoulIntent = 
      rawHref.includes('reut') || 
      rawHref.includes('soul') || 
      rawHash.includes('reut') || 
      rawHash.includes('soul') || 
      rawPath.includes('reut') || 
      rawPath.includes('soul') || 
      rawSearch.includes('reut') || 
      rawSearch.includes('soul');

    if (isSoulIntent && !location.pathname.includes('reut') && !location.pathname.includes('soul')) {
      navigate('/reut', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <ScrollToTop />
      <InternalNav />
      <FloatingReturnToWebsite />
      <Routes>
        {/* אתר הבית החדש של בין לבין - בית נשי לתוכן, חוויה ומפגש */}
        <Route path="/" element={<RootPage />} />
        <Route path="/home" element={<MainWebsite />} />
        <Route path="/site" element={<MainWebsite />} />
        <Route path="/website" element={<MainWebsite />} />

        {/* דף הבית נחיתה - הדף הקודם שנשמר במלואו כפי שביקשה */}
        <Route path="/home-landing" element={<BrandLandingPage />} />
        <Route path="/brand-landing" element={<BrandLandingPage />} />
        <Route path="/women-programs" element={<BrandLandingPage />} />
        <Route path="/all-programs" element={<BrandLandingPage />} />
        <Route path="/programs" element={<BrandLandingPage />} />
        <Route path="/brand" element={<BrandLandingPage />} />
        <Route path="/hub" element={<BrandLandingPage />} />
        <Route path="/index.html" element={<RootPage />} />
        
        {/* Full Landing Page - סדנת אמצע החיים - סדנת הדגל של בין לבין */}
        <Route path="/midlife-workshop" element={<LandingPage />} />
        <Route path="/midlife-full" element={<LandingPage />} />
        <Route path="/workshop" element={<LandingPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/midlife-landing" element={<MarketingPage />} />
        
        {/* אמצע החיים: אימון לנשמה - דף נחיתה ייעודי בשיתוף מכון הכושר של רעות */}
        <Route path="/soul-training" element={<SoulTrainingPage />} />
        <Route path="/midlife-soul" element={<SoulTrainingPage />} />
        <Route path="/reut" element={<SoulTrainingPage />} />
        <Route path="/soul" element={<SoulTrainingPage />} />
        
        {/* אמצע החיים: מרעיון לתנועה - דף נחיתה עצמאי */}
        <Route path="/midlife-movement" element={<MidlifeMovementPage />} />
        <Route path="/movement" element={<MidlifeMovementPage />} />
        <Route path="/motion" element={<MidlifeMovementPage />} />
        
        {/* Independent Product Mini Landing Pages */}
        <Route path="/p/alchemy" element={<Navigate to="/women-programs" replace />} />
        <Route path="/alchemy" element={<Navigate to="/women-programs" replace />} />
        <Route path="/p/midlife" element={<MidlifeMiniPage />} />
        <Route path="/midlife" element={<MidlifeMiniPage />} />
        <Route path="/p/up-to-180" element={<UpTo180MiniPage />} />
        <Route path="/up-to-180" element={<UpTo180MiniPage />} />
        <Route path="/p/highlights" element={<HighlightsMiniPage />} />
        <Route path="/highlights" element={<HighlightsMiniPage />} />
        <Route path="/p/the-tent" element={<TheTentMiniPage />} />
        <Route path="/the-tent" element={<TheTentMiniPage />} />
        <Route path="/p/ahead-of-you" element={<AheadOfYouMiniPage />} />
        <Route path="/ahead-of-you" element={<AheadOfYouMiniPage />} />
        <Route path="/p/flowtrips" element={<FlowTripsMiniPage />} />
        <Route path="/flowtrips" element={<FlowTripsMiniPage />} />
        <Route path="/p/flow-trips" element={<FlowTripsMiniPage />} />
        <Route path="/flow-trips" element={<FlowTripsMiniPage />} />

        {/* Central Management Workspace (Internal Operational Hub Only) */}
        <Route path="/mini-admin" element={<MiniPagesManager />} />
        <Route path="/mini-hub" element={<MiniPagesManager />} />
        <Route path="/mini" element={<MiniPagesManager />} />

        {/* כוכב יאיר צור יגאל - כיצ"י MWM - פתוח וחופשי לכולם */}
        <Route path="/mwm" element={<MwmPage />} />
        <Route path="/ky-mwm" element={<MwmPage />} />
        <Route path="/mwm-form" element={<MwmIntakeFormPage />} />
        <Route path="/form" element={<MwmIntakeFormPage />} />
        <Route path="/mwm-responses" element={<MwmResponsesPage />} />
        <Route path="/ky-responses" element={<MwmResponsesPage />} />

        {/* בין לבין - פניות התעניינות מהאתר הראשי */}
        <Route path="/inquiries" element={<InquiriesResponsesPage />} />
        <Route path="/responses" element={<InquiriesResponsesPage />} />
        <Route path="/admin" element={<InquiriesResponsesPage />} />
        
        {/* בין לבין - ספר המתכונים - עצמאי לחלוטין וללא תלות בדף הנחיתה */}
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/*" element={<Recipes />} />
        <Route path="/recipe" element={<Recipes />} />
        <Route path="/recipe/*" element={<Recipes />} />
        <Route path="/cookbook" element={<Recipes />} />
        <Route path="/cookbook/*" element={<Recipes />} />
        <Route path="/book" element={<Recipes />} />
        <Route path="/matkonim" element={<Recipes />} />
        <Route path="/מתכונים" element={<Recipes />} />
        <Route path="/מתכונים/*" element={<Recipes />} />
        <Route path="/מתכון" element={<Recipes />} />
        <Route path="/ספר-מתכונים" element={<Recipes />} />

        <Route path="/landing" element={<BrandLandingPage />} />
        <Route path="/part2" element={<PartTwo />} />

        {/* Fallback route - if any recipe intent is detected, render Recipes, else FallbackRoute */}
        <Route path="*" element={<FallbackRoute />} />
      </Routes>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
