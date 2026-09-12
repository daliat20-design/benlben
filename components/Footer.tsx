import React from 'react';
import { ButterflyIcon } from './Hero';
import { MARKETING_CONTACTS } from '../constants';
import { Share2, MessageCircle } from 'lucide-react';

interface FooterProps {
  onOpenTerms?: (e: React.MouseEvent) => void;
  onOpenPrivacy?: (e: React.MouseEvent) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  const shareWhatsAppText = encodeURIComponent(
    "היי, מצאתי סדנה לנשים שנקראת 'אמצע החיים', מבית 'בין לבין | תוכניות וריטריטים לנשים'. נראה לי ששווה לך להציץ.\n" +
    (typeof window !== 'undefined' ? window.location.href : 'https://beinlevein.co.il/#/marketing')
  );
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${shareWhatsAppText}`;

  return (
    <footer id="footer-contact" className="bg-brand-cream/80 pt-16 pb-12 px-4 md:px-6 relative overflow-hidden border-t border-brand-beige text-center">
      {/* Decorative External Background Elements */}
      <ButterflyIcon size={300} className="absolute -top-20 -right-20 animate-drift opacity-[0.03] hidden md:block" />
      <ButterflyIcon size={200} className="absolute bottom-20 -left-10 animate-float opacity-[0.03]" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8">
        {/* Call to Action Container */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border-2 border-brand-beige w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <h4 className="text-2xl md:text-3xl font-black text-brand-green mb-3">מעוניינת לכתוב את הפרק הבא שלך?</h4>
          <p className="text-gray-600 font-medium text-base md:text-lg mb-6 leading-relaxed">
            דלית ואלסי מזמינות אותך לשיחה אישית, לשמוע פרטים נוספים ולקבל מענה לכל שאלה.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {MARKETING_CONTACTS.map((contact) => (
                <a
                  key={contact.rawPhone}
                  href={`https://wa.me/${contact.internationalPhone}?text=${contact.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-brand-green hover:bg-brand-orange text-white px-5 py-3.5 rounded-full text-base font-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                >
                  <MessageCircle className="w-5 h-5 text-white fill-current shrink-0" />
                  <span>שיחה עם {contact.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <a 
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-[#25D366]/15 hover:bg-[#25D366] text-brand-green hover:text-white border-2 border-[#25D366]/40 px-8 py-3.5 rounded-full text-base font-black transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 items-center justify-center gap-3 w-full sm:w-auto group"
            >
              <Share2 className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
              <span>שתפי חברה בסדנת אמצע החיים</span>
            </a>
          </div>
        </div>

        {/* Branding & Footer Bottom */}
        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          <p className="text-sm md:text-base text-gray-500 font-medium">
            © {new Date().getFullYear()} בין לבין. כל הזכויות שמורות.
          </p>
          <div className="flex gap-6 justify-center text-sm md:text-base text-brand-green/70 font-bold">
            {onOpenTerms && (
              <button 
                onClick={onOpenTerms}
                className="hover:text-brand-orange hover:underline transition-all cursor-pointer"
              >
                תקנון התוכנית
              </button>
            )}
            {onOpenPrivacy && (
              <button 
                onClick={onOpenPrivacy}
                className="hover:text-brand-orange hover:underline transition-all cursor-pointer"
              >
                מדיניות פרטיות
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
