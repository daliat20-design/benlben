
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  { id: 'top', name: 'התחלה' },
  { id: 'marketing-about', name: 'על התוכנית' },
  { id: 'program-highlights', name: 'עיקרי התוכנית' },
  { id: 'program-structure', name: 'מבנה המפגשים' },
  { id: 'marketing-middle-cta', name: 'בואי נדבר' },
  { id: 'marketing-speakers', name: 'המרצות' },
  { id: 'marketing-team', name: 'הצוות' },
  { id: 'marketing-success', name: 'סיפור הצלחה' },
  { id: 'marketing-info', name: 'חשוב לדעת' },
  { id: 'marketing-gallery', name: 'גלריה' },
  { id: 'testimonials', name: 'המלצות' },
  { id: 'marketing-contact', name: 'יצירת קשר' },
];

export const MarketingQuickNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('התחלה');

  const scrollToSection = (id: string, name: string) => {
    setIsOpen(false);
    setActiveTab(name);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Navbar + QuickNav height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'top' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-[80px] z-[40] w-full px-4 py-2 bg-brand-green/90 backdrop-blur-md border-b border-brand-green/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white font-black text-xs uppercase tracking-widest opacity-80">
          ניווט מהיר בדף
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-black flex items-center gap-3 shadow-lg hover:bg-brand-green transition-all"
          >
            <span>{activeTab}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <AnimatePresence>
            {isOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[-1]" 
                  onClick={() => setIsOpen(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 mt-3 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-brand-beige overflow-hidden py-3"
                >
                  <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id, section.name)}
                        className={`w-full text-right px-6 py-3 text-sm font-bold transition-colors border-b border-brand-beige/50 last:border-none hover:bg-brand-orange/5 hover:text-brand-orange ${
                          activeTab === section.name ? 'text-brand-orange bg-brand-orange/10' : 'text-brand-green'
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
