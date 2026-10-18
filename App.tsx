import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import Recipes from './pages/Recipes';
import LandingPage from './pages/LandingPage';
import PartTwo from './pages/PartTwo';
import MarketingPage from './pages/MarketingPage';
import MwmPage from './pages/MwmPage';
import MwmIntakeFormPage from './pages/MwmIntakeFormPage';
import MwmResponsesPage from './pages/MwmResponsesPage';
import InquiriesResponsesPage from './pages/InquiriesResponsesPage';
import AlchemyOfElementsPage from './pages/mini/AlchemyOfElementsPage';
import MidlifeMiniPage from './pages/mini/MidlifeMiniPage';
import UpTo180MiniPage from './pages/mini/UpTo180MiniPage';
import HighlightsMiniPage from './pages/mini/HighlightsMiniPage';
import TheTentMiniPage from './pages/mini/TheTentMiniPage';
import AheadOfYouMiniPage from './pages/mini/AheadOfYouMiniPage';
import MiniPagesManager from './pages/mini/MiniPagesManager';
import BrandLandingPage from './pages/BrandLandingPage';

const InternalNav: React.FC = () => {
  const location = useLocation();
  
  // Do not show internal nav bar on standalone pages, intake forms, or any mini product landing pages
  if (
    location.pathname === '/mwm' || 
    location.pathname === '/ky-mwm' || 
    location.pathname === '/mwm-form' || 
    location.pathname === '/form' ||
    location.pathname === '/mwm-responses' ||
    location.pathname === '/responses' ||
    location.pathname === '/inquiries' ||
    location.pathname === '/admin' ||
    location.pathname.startsWith('/p/')
  ) {
    return null;
  }
  
  const baseUrl = "https://ais-pre-jttptouynfsjqnrg3kuoj3-29867443297.europe-west1.run.app";
  const [showLinks, setShowLinks] = React.useState(false);

  const links = [
    { name: 'דף הבית', path: '#/', full: `${baseUrl}/` },
    { name: 'פניות מהאתר (בין לבין)', path: '#/responses?code=9672', full: `${baseUrl}/#/responses?code=9672` },
    { name: 'שאלון נעים להכיר (כיצ"י)', path: '#/mwm-responses?code=9672', full: `${baseUrl}/#/mwm-responses?code=9672` },
    { name: 'טופס נעים להכיר (למילוי)', path: '#/mwm-form', full: `${baseUrl}/#/mwm-form` },
    { name: 'בין לבין כיצ"י MWM', path: '#/mwm', full: `${baseUrl}/#/mwm` },
    { name: 'ניהול מיני-דפים', path: '#/mini-admin', full: `${baseUrl}/#/mini-admin` },
    { name: 'ספר המתכונים', path: '#/recipes', full: `${baseUrl}/#/recipes` },
  ];

  return (
    <div className="w-full bg-brand-orange/10 border-b border-brand-orange/20 py-2 px-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="text-[10px] font-black text-brand-orange uppercase tracking-tighter shrink-0">סביבת פיתוח:</span>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path.replace('#', '')}
              className={({ isActive }) => 
                `px-3 py-1 rounded-full text-[11px] font-black transition-all ${
                  isActive 
                  ? 'bg-brand-orange text-white shadow-sm' 
                  : 'bg-white/50 text-brand-green border border-brand-beige hover:bg-white'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => setShowLinks(!showLinks)}
          className="text-[10px] font-bold text-brand-orange underline underline-offset-2 hover:text-brand-green transition-colors"
        >
          {showLinks ? 'הסתר לינקים' : 'הצג לינקים לפרסום'}
        </button>
        
        {showLinks && (
          <div className="flex gap-4 items-center">
             {links.map(link => (
               <div key={link.path} className="flex items-center gap-2">
                 <span className="text-[9px] font-bold text-gray-500">{link.name}:</span>
                 <code className="text-[9px] bg-white/80 px-2 py-0.5 rounded border border-brand-beige font-mono text-brand-green select-all">
                   {link.full}
                 </code>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
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

  return <BrandLandingPage />;
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
    }
  }, [location.pathname, navigate]);

  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname.includes('-dev-') || window.location.hostname.includes('localhost'));

  return (
    <>
      <ScrollToTop />
      {isDevelopment && <InternalNav />}
      <Routes>
        {/* Central Master Brand Landing Page (All Products & Retreats - מרחבים לנשים) */}
        <Route path="/" element={<BrandLandingPage />} />
        <Route path="/women-programs" element={<BrandLandingPage />} />
        <Route path="/all-programs" element={<BrandLandingPage />} />
        <Route path="/programs" element={<BrandLandingPage />} />
        <Route path="/brand" element={<BrandLandingPage />} />
        <Route path="/hub" element={<BrandLandingPage />} />
        <Route path="/index.html" element={<BrandLandingPage />} />
        
        {/* Full Landing Page - Midlife Workshop (סדנת הדגל אמצע החיים) */}
        <Route path="/midlife-workshop" element={<LandingPage />} />
        <Route path="/midlife-full" element={<LandingPage />} />
        <Route path="/workshop" element={<LandingPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/midlife-landing" element={<MarketingPage />} />
        
        {/* Independent Product Mini Landing Pages (Each standalone, no cross-navigation) */}
        <Route path="/p/alchemy" element={<AlchemyOfElementsPage />} />
        <Route path="/alchemy" element={<AlchemyOfElementsPage />} />
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

        {/* Central Management Workspace (Internal Operational Hub Only) */}
        <Route path="/mini-admin" element={<MiniPagesManager />} />
        <Route path="/mini-hub" element={<MiniPagesManager />} />
        <Route path="/mini" element={<MiniPagesManager />} />

        {/* כוכב יאיר - שאלון נעים להכיר */}
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

        {/* Fallback route - if any recipe intent is detected, render Recipes, else BrandLandingPage */}
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
