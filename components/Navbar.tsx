import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';

export const Navbar: React.FC<{ hideLinks?: boolean }> = ({ hideLinks = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMarketingPage = location.pathname === '/' || location.pathname === '/marketing';
  const isPartTwoPage = location.pathname === '/part2';
  const isRecipesPage = location.pathname === '/recipes';
  const isOriginalLanding = location.pathname === '/landing';
  const isMwmPage = location.pathname === '/mwm' || location.pathname === '/ky-mwm';

  const navLinks = (hideLinks || isMwmPage || isMarketingPage) ? [] : [
    { name: 'דף נחיתה', to: '/' },
    { name: 'ספר המתכונים', to: '/recipes' },
    { name: 'חלק ב\'', to: '/part2' },
  ];

  const sectionLinks = [];
  if (isMwmPage) {
    sectionLinks.push(
      { name: 'על התוכנית', href: '#about' },
      { name: 'מתכונת ומועדים', href: '#program-format' },
      { name: 'טעימה מהתכנים', href: '#sessions' },
      { name: 'על המרצות', href: '#program-speakers' },
      { name: 'הצוות', href: '#team' },
      { name: 'המלצות', href: '#testimonials' },
    );
  } else if (isMarketingPage) {
    sectionLinks.push(
      { name: 'על התוכנית', href: '#marketing-about' },
      { name: 'עיקרי התוכנית', href: '#program-highlights' },
      { name: 'סיפור הצלחה', href: '#marketing-success' },
    );
  } else if (isPartTwoPage) {
    sectionLinks.push(
      { name: 'על התוכנית', href: '#about' },
      { name: 'מבנה המפגשים', href: '#sessions' },
      { name: 'המלצות', href: '#testimonials' },
      { name: 'הצוות', href: '#team' },
    );
  } else if (isOriginalLanding) {
    sectionLinks.push(
      { name: 'על התוכנית', href: '#about' },
      { name: 'מבנה המפגשים', href: '#sessions' },
      { name: 'המרצות', href: '#speakers' },
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass-card border-b border-brand-beige bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to={isMwmPage ? "/mwm" : "/"} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center overflow-hidden rounded-full shadow-sm border border-brand-beige/50 bg-white">
             <img 
               src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
               alt="בין לבין לוגו" 
               className="w-full h-full object-cover"
               style={{ mixBlendMode: 'multiply' }}
             />
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-black tracking-tight text-brand-green leading-tight">בין לבין</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 text-brand-green">
          {/* Main Route Links */}
          {navLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.to} 
                  className="text-sm font-bold bg-brand-beige/20 px-3 py-1.5 rounded-full hover:bg-brand-beige/40 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Section Links */}
          {sectionLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {sectionLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-bold hover:text-brand-orange transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-3 mr-4">
            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-brand-green border-2 border-brand-green/20 px-4 py-2 rounded-full text-sm font-bold hover:border-brand-orange hover:text-brand-orange transition-all shadow-sm"
            >
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              צרי קשר
            </a>
          </div>
        </div>

        {/* Desktop Mini Nav / Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-2">
           <a 
            href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white border border-brand-green/20 rounded-full text-[#25D366] shadow-sm"
            aria-label="צרי קשר בוואטסאפ"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
          <button 
            className="p-2 text-brand-green focus:outline-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-brand-beige shadow-xl animate-fade-in overflow-hidden z-40">
          <div className="flex flex-col p-6 gap-4 text-brand-green font-semibold text-right">
            {/* Main Page Links */}
            {navLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.to} 
                    className="py-3 border-b border-brand-beige text-brand-orange font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Section Links */}
            {sectionLinks.length > 0 && (
              <div className="flex flex-col gap-2">
                {sectionLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="py-3 border-b border-brand-beige/50 last:border-none font-bold text-brand-green hover:text-brand-orange"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
            
            <div className="flex flex-col gap-3 pt-4">
              <a 
                href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-brand-green text-white py-4 rounded-2xl font-black shadow-md hover:bg-brand-orange transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>צרי קשר בוואטסאפ</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
