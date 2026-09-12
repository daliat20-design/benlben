import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONTACT_PHONE, WHATSAPP_MESSAGE, MARKETING_CONTACTS, MWM_CONTACTS } from '../constants';
import { FileText, Share2 } from 'lucide-react';
import { WhatsAppContactModal } from './mwm/WhatsAppContactModal';

export const Navbar: React.FC<{ hideLinks?: boolean }> = ({ hideLinks = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const location = useLocation();
  const isMarketingPage = location.pathname === '/' || location.pathname === '/marketing';
  const isPartTwoPage = location.pathname === '/part2';
  const isRecipesPage = location.pathname === '/recipes';
  const isOriginalLanding = location.pathname === '/landing';
  const isMwmPage = location.pathname === '/mwm' || location.pathname === '/ky-mwm';
  const isMwmFormPage = location.pathname === '/mwm-form' || location.pathname === '/form';

  const shareWhatsAppText = encodeURIComponent(
    isMwmPage || isMwmFormPage
      ? "היי, מצאתי תוכנית מדהימה לנשים באמצע החיים בשם 'בין לבין' בכוכב יאיר צור יגאל. שווה לך להציץ בדף התוכנית:\n" +
        (typeof window !== 'undefined' ? window.location.href : 'https://beinlevein.co.il/#/mwm')
      : "היי, מצאתי סדנה לנשים שנקראת 'אמצע החיים', מבית 'בין לבין | תוכניות וריטריטים לנשים'. נראה לי ששווה לך להציץ.\n" +
        (typeof window !== 'undefined' ? window.location.href : 'https://beinlevein.co.il/#/marketing')
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareWhatsAppText}`;

  const navLinks = (hideLinks || isMwmPage || isMwmFormPage || isMarketingPage) ? [] : [
    { name: 'דף נחיתה', to: '/' },
    { name: 'ספר המתכונים', to: '/recipes' },
    { name: 'חלק ב\'', to: '/part2' },
  ];

  const sectionLinks: { name: string; href?: string; to?: string; isButton?: boolean }[] = [];
  if (isMwmPage) {
    sectionLinks.push(
      { name: 'על התוכנית', href: '#about' },
      { name: 'מתכונת ומועדים', href: '#program-format' },
      { name: 'טעימה מהתכנים', href: '#sessions' },
      { name: 'על המרצות', href: '#program-speakers' },
      { name: 'עלות', href: '#pricing' },
      { name: 'צוות התוכנית', href: '#team' },
      { name: 'המלצות', href: '#testimonials' },
      { name: 'טופס "נעים להכיר"', to: '/mwm-form', isButton: true },
    );
  } else if (isMwmFormPage) {
    sectionLinks.push(
      { name: 'חזרה לתוכנית המלאה', to: '/mwm' },
    );
  } else if (isMarketingPage) {
    sectionLinks.push(
      { name: 'על הסדנה', href: '#about' },
      { name: 'עיקרי הסדנה', href: '#program-structure' },
      { name: 'סיפור הצלחה', href: '#testimonials' },
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

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWhatsAppModalOpen(true);
    setIsMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, href?: string) => {
    if (!href) return;
    e.preventDefault();
    setIsMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -85; // 80px navbar + padding
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full glass-card border-b border-brand-beige bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={isMwmPage || isMwmFormPage ? "/mwm" : "/"} className="flex items-center gap-2 group">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                  alt="בין לבין לוגו" 
                  className="w-full h-full object-cover"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <div className="flex flex-col text-right">
                {isMwmPage || isMwmFormPage ? (
                  <>
                    <span className="text-2xl font-black text-brand-green tracking-tight">בין לבין</span>
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest -mt-1">
                      כוכב יאיר - צור יגאל
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl sm:text-2xl font-black text-brand-green tracking-tight">בין לבין</span>
                    <span className="text-brand-orange font-light text-lg sm:text-xl leading-none">|</span>
                    <span className="text-xs sm:text-sm font-bold text-brand-orange tracking-tight whitespace-nowrap">תוכניות וריטריטים לנשים</span>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 text-brand-green font-medium">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.to} 
                className="text-sm font-bold hover:text-brand-orange transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Section Links */}
            {sectionLinks.length > 0 && (
              <div className="flex items-center gap-6 border-r border-brand-beige/80 pr-6 mr-2">
                {sectionLinks.map((link) => {
                  if (link.to) {
                    return (
                      <Link 
                        key={link.name} 
                        to={link.to} 
                        className={link.isButton 
                          ? "text-sm font-black bg-brand-orange hover:bg-brand-green text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 border-b-2 border-brand-orange/40"
                          : "text-sm font-bold hover:text-brand-orange transition-colors"
                        }
                      >
                        {link.isButton && <FileText className="w-4 h-4" />}
                        <span>{link.name}</span>
                      </Link>
                    );
                  }
                  return (
                    <button 
                      key={link.name} 
                      type="button"
                      onClick={(e) => scrollToSection(e, link.href)}
                      className="text-sm font-bold hover:text-brand-orange transition-colors cursor-pointer text-brand-green"
                    >
                      {link.name}
                    </button>
                  );
                })}
              </div>
            )}
            
            <div className="flex items-center gap-3 mr-4">
              {/* WhatsApp Share Button */}
              <a 
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366]/10 text-brand-green border-2 border-[#25D366]/30 hover:border-[#25D366] px-4 py-2 rounded-full text-sm font-black hover:bg-[#25D366] hover:text-white transition-all shadow-sm group cursor-pointer"
                title={isMwmPage || isMwmFormPage ? "שתפי חברה בתוכנית בוואטסאפ" : "שתפי חברה בסדנה בוואטסאפ"}
              >
                <Share2 className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
                <span>{isMwmPage || isMwmFormPage ? "שתפי חברה בתוכנית" : "שתפי חברה בסדנה"}</span>
              </a>

              {/* Contact Button */}
              <button 
                type="button"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 bg-white text-brand-green border-2 border-brand-green/20 px-4 py-2 rounded-full text-sm font-bold hover:border-[#25D366] hover:text-[#25D366] transition-all shadow-sm cursor-pointer"
                title="דברי איתנו"
                aria-label="דברי איתנו"
              >
                <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span>דברי איתנו</span>
              </button>
            </div>
          </div>

          {/* Desktop Mini Nav / Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-full text-[#25D366] shadow-sm cursor-pointer"
              aria-label={isMwmPage || isMwmFormPage ? "שתפי חברה בתוכנית בוואטסאפ" : "שתפי חברה בסדנה בוואטסאפ"}
              title={isMwmPage || isMwmFormPage ? "שתפי חברה בתוכנית" : "שתפי חברה בסדנה"}
            >
              <Share2 className="w-5 h-5 text-[#25D366]" />
            </a>
            <button 
              type="button"
              onClick={handleWhatsAppClick}
              className="p-2 bg-white border border-brand-green/20 rounded-full text-[#25D366] shadow-sm cursor-pointer"
              aria-label="דברי איתנו"
              title="דברי איתנו"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
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
                  {sectionLinks.map((link) => {
                    if (link.to) {
                      return (
                        <Link 
                          key={link.name} 
                          to={link.to} 
                          className={link.isButton 
                            ? "py-3 px-4 rounded-xl bg-brand-orange text-white text-center font-black my-1 flex items-center justify-center gap-2 shadow-sm"
                            : "py-3 border-b border-brand-beige/50 last:border-none font-bold text-brand-green hover:text-brand-orange"
                          }
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.isButton && <FileText className="w-4 h-4" />}
                          <span>{link.name}</span>
                        </Link>
                      );
                    }
                    return (
                      <button 
                        key={link.name} 
                        type="button"
                        onClick={(e) => scrollToSection(e, link.href)}
                        className="py-3.5 border-b border-brand-beige/50 last:border-none font-bold text-brand-green hover:text-brand-orange text-right w-full transition-colors cursor-pointer text-base"
                      >
                        {link.name}
                      </button>
                    );
                  })}
                </div>
              )}
              
              <div className="flex flex-col gap-3 pt-4">
                {/* Share with friend in mobile menu */}
                <a 
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-[#25D366]/10 hover:bg-[#25D366] text-brand-green hover:text-white py-3.5 px-4 rounded-2xl font-black text-sm border border-[#25D366]/30 transition-all shadow-sm group cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Share2 className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                  <span>{isMwmPage || isMwmFormPage ? "שתפי חברה בתוכנית" : "שתפי חברה בסדנה"}</span>
                </a>

                {/* Contact Button */}
                <button 
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-black shadow-md hover:bg-brand-green transition-all cursor-pointer w-full"
                  title="דברי איתנו"
                >
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span>דברי איתנו</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Reusable WhatsApp Contact Modal */}
      <WhatsAppContactModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
        contacts={isMwmPage || isMwmFormPage ? MWM_CONTACTS : MARKETING_CONTACTS}
        title={isMwmPage || isMwmFormPage ? 'לשיחה עם מובילות MWM כיצ"י' : 'לשיחה עם מובילות "בין לבין"'}
        subtitle={isMwmPage || isMwmFormPage ? 'מוזמנת לפנות ישירות בוואטסאפ לכל שאלה או התלבטות:' : 'דלית ואלסי כאן לכל שאלה, התייעצות והתאמה אישית:'}
        footerNote={isMwmPage || isMwmFormPage ? 'צוות "בין לבין" • כוכב יאיר - צור יגאל' : 'צוות "בין לבין" • סדנאות וריטרטים אמצע החיים'}
      />
    </>
  );
};

export default Navbar;
