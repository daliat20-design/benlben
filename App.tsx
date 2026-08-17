import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Recipes from './pages/Recipes';
import LandingPage from './pages/LandingPage';
import PartTwo from './pages/PartTwo';
import MarketingPage from './pages/MarketingPage';
import MwmPage from './pages/MwmPage';

const InternalNav: React.FC = () => {
  const location = useLocation();
  
  // Do not show internal nav bar on the standalone MWM landing page
  if (location.pathname === '/mwm' || location.pathname === '/ky-mwm') {
    return null;
  }
  
  const baseUrl = "https://ais-pre-jttptouynfsjqnrg3kuoj3-29867443297.europe-west1.run.app";
  const [showLinks, setShowLinks] = React.useState(false);

  const links = [
    { name: 'דף נחיתה שיווקי', path: '#/', full: `${baseUrl}/#/` },
    { name: 'בין לבין כיצ"י MWM', path: '#/mwm', full: `${baseUrl}/#/mwm` },
    { name: 'ספר המתכונים', path: '#/recipes', full: `${baseUrl}/#/recipes` },
    { name: 'דף נחיתה מקורי', path: '#/landing', full: `${baseUrl}/#/landing` },
    { name: 'דף נחיתה חלק ב', path: '#/part2', full: `${baseUrl}/#/part2` },
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

const AppContent: React.FC = () => {
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname.includes('-dev-') || window.location.hostname.includes('localhost'));

  return (
    <>
      {isDevelopment && <InternalNav />}
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/mwm" element={<MwmPage />} />
        <Route path="/ky-mwm" element={<MwmPage />} />
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
