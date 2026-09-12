import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MWM_CONTACTS, MARKETING_CONTACTS } from '../constants';
import { MessageCircle, Share2, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const WhatsAppShare: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isMwm = location.pathname === '/mwm' || 
                location.pathname === '/ky-mwm' || 
                location.pathname === '/mwm-form' || 
                location.pathname === '/form';

  const contacts = isMwm ? MWM_CONTACTS : MARKETING_CONTACTS;
  const headerTitle = isMwm ? 'לשיחה עם מובילות MWM כיצ"י' : 'לשיחה עם מובילות "בין לבין"';
  const headerSubtitle = isMwm ? 'בחרי למי לפנות או שתפי חברה' : 'דלית ואלסי כאן לכל שאלה והתייעצות';

  const shareText = encodeURIComponent(
    isMwm
      ? "היי, מצאתי תוכנית מדהימה לנשים באמצע החיים בשם 'בין לבין' בכוכב יאיר צור יגאל. שווה לך להציץ בדף התוכנית:\n" +
        (typeof window !== 'undefined' ? window.location.href : 'https://beinlevein.co.il/#/mwm')
      : "היי, מצאתי סדנה לנשים שנקראת 'אמצע החיים', מבית 'בין לבין | תוכניות וריטריטים לנשים'. נראה לי ששווה לך להציץ.\n" +
        (typeof window !== 'undefined' ? window.location.href : 'https://beinlevein.co.il/#/marketing')
  );
  const shareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <div className="fixed bottom-6 left-6 z-[120] font-sans" dir="rtl">
      {/* Floating Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="absolute bottom-20 left-0 w-84 bg-white rounded-3xl shadow-2xl border-2 border-brand-orange/30 p-5 space-y-4 text-right"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-brand-beige pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-brand-green text-base leading-tight">
                    {headerTitle}
                  </h4>
                  <p className="text-[11px] font-bold text-gray-500">{headerSubtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                aria-label="סגור"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Contact Options */}
            <div className="space-y-2.5">
              <p className="text-xs font-black text-brand-orange">
                ✦ שיחה ישירה בוואטסאפ:
              </p>

              {contacts.map((contact) => (
                <a
                  key={contact.rawPhone}
                  href={`https://wa.me/${contact.internationalPhone}?text=${contact.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-brand-cream/50 hover:bg-[#25D366] text-gray-800 hover:text-white border border-brand-beige hover:border-[#25D366] transition-all group shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white group-hover:bg-white/20 flex items-center justify-center text-[#25D366] group-hover:text-white transition-colors shadow-xs">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-brand-green group-hover:text-white transition-colors">
                        {contact.name}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-black bg-white group-hover:bg-white/20 text-brand-green group-hover:text-white px-2.5 py-1 rounded-full transition-colors shadow-xs">
                    פנייה ←
                  </span>
                </a>
              ))}
            </div>

            {/* Share Option */}
            <div className="pt-2 border-t border-brand-beige">
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-brand-green/10 hover:bg-brand-green text-brand-green hover:text-white font-bold text-xs transition-all border border-brand-green/20 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{isMwm ? "שתפי חברה בתוכנית בוואטסאפ" : "שתפי חברה בסדנה"}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-pulse-ring"></div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 cursor-pointer border-2 border-white/80"
          aria-label="דברי איתנו"
          title="דברי איתנו"
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          )}
        </button>

        {/* Tooltip on hover when closed */}
        {!isOpen && (
          <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-brand-green text-white text-xs font-bold py-2 px-3.5 rounded-xl pointer-events-none shadow-xl border border-brand-lightGreen/30">
            דברי איתנו
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppShare;
