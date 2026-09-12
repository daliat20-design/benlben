
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKETING_CONTACTS } from '../constants';
import { ButterflyIcon } from './ButterflyIcon';
import { WhatsAppContactModal } from './mwm/WhatsAppContactModal';

export { ButterflyIcon };

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  return (
    <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden bg-brand-cream">
      {/* Background Decor Butterfly - positioned safely away from text, hidden on mobile */}
      <ButterflyIcon size={260} className="absolute -bottom-16 -left-20 opacity-[0.05] animate-float hidden lg:block pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
        <div className="flex-1 text-center md:text-right w-full">
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-5 sm:mb-6">
            <div className="inline-block bg-brand-green text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base md:text-lg font-black tracking-wide shadow-md border-b-4 border-brand-green/30">
              בין לבין | תוכניות וריטריטים לנשים
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-brand-green leading-none mb-3 sm:mb-4 tracking-tighter drop-shadow-sm">
            אמצע החיים
          </h1>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-orange mb-1 sm:mb-2 tracking-tight">
            סדנאת הדגל של בין לבין
          </div>

          <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-green/90 mb-5 sm:mb-6 tracking-normal">
            נשים בגילאי <span dir="ltr" className="inline-block">45-60</span>
          </div>

          <p className="text-base sm:text-lg md:text-2xl text-gray-700 font-bold leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0">
            מעטפת של ידע, שיח והתבוננות אישית לתקופה שבה הרבה דברים משתנים, והרבה דברים חדשים יכולים להתחיל.
          </p>

          {/* Logo Position: Below the Title */}
          <div className="mb-6 sm:mb-8 flex justify-center md:justify-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-2xl p-2 border-4 border-brand-beige flex items-center justify-center overflow-hidden animate-float relative bg-transparent">
              <img 
                src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                alt="לוגו בין לבין" 
                className="w-full h-full object-cover rounded-full"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          <div className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed mb-8 space-y-4 text-right bg-white/60 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-3xl border border-white/60 shadow-sm mx-auto md:mx-0">
            <p>
              לכל אחת מאיתנו יש סיפור שנכתב במשך שנים.
              פרקים של משפחה, קריירה, זוגיות, נתינה, הצלחות, התמודדויות ואינספור בחירות שעיצבו אותנו.
            </p>
            <p className="font-bold text-brand-green">
              אנחנו מאמינות שבכל אישה באמצע החיים מסתתר פרק שעדיין לא נכתב.
            </p>
            <p className="italic">
              לא מפני שחסר בה משהו. <br />
              מפני שיש בה עוד.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-brand-orange font-bold text-lg border-t border-brand-orange/10 pt-4 mt-4">
              <div>✦ עוד כוחות</div>
              <div>✦ עוד אומץ</div>
              <div>✦ עוד חלומות</div>
              <div>✦ עוד יכולות</div>
              <div className="col-span-2">✦ עוד השפעה</div>
            </div>
            <p className="font-bold text-brand-green border-t border-brand-green/10 pt-4 mt-4">
              אישה באמצע החיים לא צריכה לגלות את עצמה מחדש.
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-brand-orange tracking-tight leading-tight mt-3">
              היא פשוט צריכה לגלות מה עוד יש בה
            </p>
          </div>
          
          <div className="w-32 h-2 bg-brand-orange mb-12 mx-auto md:mr-0 rounded-full shadow-inner"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-brand-orange text-white hover:bg-brand-green px-12 py-5 rounded-full text-xl font-black shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-b-4 border-brand-orange/30 cursor-pointer"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>דברי איתנו</span>
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-lg md:max-w-none mx-auto">
          <div className="relative z-10 p-3 sm:p-5 md:p-6 bg-white shadow-[0_20px_50px_-10px_rgba(84,99,79,0.2)] md:shadow-[0_50px_100px_-20px_rgba(84,99,79,0.3)] rounded-[2.5rem] sm:rounded-[3rem] transform md:rotate-3 md:hover:rotate-0 transition-transform duration-700 overflow-hidden">
            <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-inner">
              <img 
                src="https://i.postimg.cc/LsC6W6cG/Chat-GPT-Image-Sep-9-2026-09-44-51-AM.png" 
                alt="אמצע החיים - סדנאת הדגל של בין לבין" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <WhatsAppContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contacts={MARKETING_CONTACTS}
        title='לשיחה עם מובילות "בין לבין"'
        subtitle="דלית ואלסי כאן לכל שאלה, התייעצות והתאמה אישית:"
        footerNote='צוות "בין לבין" • סדנאות וריטרטים אמצע החיים'
      />
    </section>
  );
};
