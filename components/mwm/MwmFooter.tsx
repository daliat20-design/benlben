import React from 'react';
import { ButterflyIcon } from '../ButterflyIcon';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../../constants';

interface MwmFooterProps {
  onOpenTerms?: (e: React.MouseEvent) => void;
  onOpenPrivacy?: (e: React.MouseEvent) => void;
}

export const MwmFooter: React.FC<MwmFooterProps> = ({ onOpenTerms, onOpenPrivacy }) => {
  return (
    <footer id="mwm-contact-footer" className="bg-brand-cream/80 pt-20 pb-12 px-4 md:px-6 relative overflow-hidden border-t border-brand-beige text-center">
      {/* Decorative External Background Elements */}
      <ButterflyIcon size={300} className="absolute -top-20 -right-20 animate-drift opacity-[0.03] hidden md:block" />
      <ButterflyIcon size={200} className="absolute bottom-20 -left-10 animate-float opacity-[0.03]" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-10">
        {/* Call to Action Container */}
        <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border-2 border-brand-beige w-full max-w-2xl transform hover:scale-[1.01] transition-transform duration-300">
          <div className="w-14 h-14 bg-brand-orange text-white rounded-full flex items-center justify-center mx-auto mb-6 animate-float shadow-md">
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>

          <h3 className="text-3xl md:text-5xl font-black text-brand-green mb-3 tracking-tight">
            מרגישה שזה יכול להיות המקום שלך?
          </h3>
          <h4 className="text-2xl md:text-3xl font-extrabold text-brand-orange mb-6">
            נשמח להכיר ולהיפגש "בין לבין"
          </h4>

          <p className="text-gray-600 font-medium text-base md:text-lg mb-8 leading-relaxed bg-brand-cream/60 p-5 rounded-2xl border border-brand-beige/50 text-center">
            מילוי הטופס אינו הרשמה ואינו מחייב. הוא מאפשר לנו להכיר אותך קצת, להבין מה מעסיק אותך ולחזור אלייך עם כל הפרטים.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent('היי, אשמח לקבל קישור לטופס ההיכרות לתוכנית בין לבין כיצ"י MWM')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex bg-brand-orange hover:bg-brand-green text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 items-center justify-center gap-3 border-b-4 border-brand-orange/30"
            >
              <span>נעים להכיר | למילוי הטופס</span>
            </a>

            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex bg-brand-green hover:bg-brand-orange text-white px-8 py-4 rounded-full text-lg md:text-xl font-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>יש לך שאלה לפני? דברי איתנו בוואטסאפ</span>
            </a>
          </div>
        </div>

        {/* Branding & Footer Bottom */}
        <div className="flex flex-col items-center gap-4 mt-4 w-full">
          <p className="text-sm md:text-base text-gray-500 font-medium">
            © {new Date().getFullYear()} בין לבין - תוכנית לנשים באמצע החיים. כל הזכויות שמורות.
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
