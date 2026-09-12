import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import Recipes from './pages/Recipes';
import LandingPage from './pages/LandingPage';
import PartTwo from './pages/PartTwo';
import MarketingPage from './pages/MarketingPage';
import MwmPage from './pages/MwmPage';
import MwmIntakeFormPage from './pages/MwmIntakeFormPage';
import MwmResponsesPage from './pages/MwmResponsesPage';
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
    location.pathname === '/admin' ||
    location.pathname === '/alchemy' ||
    location.pathname === '/women-programs' ||
    location.pathname === '/all-programs' ||
    location.pathname === '/programs' ||
    location.pathname === '/brand' ||
    location.pathname === '/hub' ||
    location.pathname.startsWith('/p/')
  ) {
    return null;
  }
  
  const baseUrl = "https://ais-pre-jttptouynfsjqnrg3kuoj3-29867443297.europe-west1.run.app";
  const [showLinks, setShowLinks] = React.useState(false);

  const links = [
    { name: 'דף נחיתה בין לבין - אמצע החיים', path: '#/', full: `${baseUrl}/#/` },
    { name: 'בין לבין תוכניות לנשים', path: '#/women-programs', full: `${baseUrl}/#/women-programs` },
    { name: 'ניהול מיני-דפים', path: '#/mini-admin', full: `${baseUrl}/#/mini-admin` },
    { name: 'בין לבין כיצ"י MWM', path: '#/mwm', full: `${baseUrl}/#/mwm` },
    { name: 'טופס נעים להכיר', path: '#/mwm-form', full: `${baseUrl}/#/mwm-form` },
    { name: 'ניהול תשובות (Admin)', path: '#/mwm-responses', full: `${baseUrl}/#/mwm-responses` },
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

const DevAdminBackPill: React.FC = () => {
  const location = useLocation();
  const isMiniPage = location.pathname.startsWith('/p/') || location.pathname === '/alchemy';
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname.includes('-dev-') || window.location.hostname.includes('localhost'));

  if (!isDevelopment || !isMiniPage) return null;

  return (
    <div className="fixed top-3 left-3 z-50 pointer-events-auto">
      <Link
        to="/mini-admin"
        className="inline-flex items-center gap-1.5 bg-slate-900/85 hover:bg-slate-900 text-white px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg backdrop-blur-sm transition-all border border-white/20 hover:scale-105"
      >
        <span>← חזרה לניהול מיני-דפים</span>
      </Link>
    </div>
  );
};

const AppContent: React.FC = () => {
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname.includes('-dev-') || window.location.hostname.includes('localhost'));

  return (
    <>
      {isDevelopment && <InternalNav />}
      <DevAdminBackPill />
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        
        {/* Central Master Brand Landing Page (All Products & Retreats) */}
        <Route path="/women-programs" element={<BrandLandingPage />} />
        <Route path="/all-programs" element={<BrandLandingPage />} />
        <Route path="/programs" element={<BrandLandingPage />} />
        <Route path="/brand" element={<BrandLandingPage />} />
        <Route path="/hub" element={<BrandLandingPage />} />
        
        {/* Independent Product Mini Landing Pages (Each standalone, no cross-navigation) */}
        <Route path="/p/alchemy" element={<AlchemyOfElementsPage />} />
        <Route path="/alchemy" element={<AlchemyOfElementsPage />} />
        <Route path="/p/midlife" element={<MidlifeMiniPage />} />
        <Route path="/p/up-to-180" element={<UpTo180MiniPage />} />
        <Route path="/p/highlights" element={<HighlightsMiniPage />} />
        <Route path="/p/the-tent" element={<TheTentMiniPage />} />
        <Route path="/p/ahead-of-you" element={<AheadOfYouMiniPage />} />

        {/* Central Management Workspace (Internal Operational Hub Only) */}
        <Route path="/mini-admin" element={<MiniPagesManager />} />
        <Route path="/mini-hub" element={<MiniPagesManager />} />
        <Route path="/mini" element={<MiniPagesManager />} />

        <Route path="/mwm" element={<MwmPage />} />
        <Route path="/ky-mwm" element={<MwmPage />} />
        <Route path="/mwm-form" element={<MwmIntakeFormPage />} />
        <Route path="/form" element={<MwmIntakeFormPage />} />
        <Route path="/mwm-responses" element={<MwmResponsesPage />} />
        <Route path="/responses" element={<MwmResponsesPage />} />
        <Route path="/admin" element={<MwmResponsesPage />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/part2" element={<PartTwo />} />
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
