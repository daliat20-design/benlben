
import React from 'react';
import { ButterflyIcon } from './Hero';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';

export const PricingSection: React.FC<{ hidePrices?: boolean }> = ({ hidePrices }) => {
  return (
    <section id="pricing" className="pt-16 md:pt-24 pb-16 md:pb-16 bg-brand-cream px-4 md:px-6 relative overflow-hidden text-right">
      {/* Background Decor - Brand Butterflies */}
      <ButterflyIcon size={350} className="absolute -top-40 md:-top-20 -right-20 animate-drift opacity-5 hidden md:block" />
      <ButterflyIcon size={120} className="absolute -top-12 -right-8 animate-drift opacity-5 md:hidden" />
      <ButterflyIcon size={180} className="absolute bottom-0 -left-10 animate-float opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24 px-2">
          <div className="bg-brand-orange text-white px-6 py-1.5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest inline-block mb-6 shadow-lg">הצטרפי אלינו</div>
          <h2 className="text-5xl md:text-8xl font-black mb-6 text-brand-green tracking-tighter">השקיעי בעצמך</h2>
          <p className="text-brand-lightGreen text-xl md:text-3xl font-black italic">ניתן להירשם לתוכנית המלאה או לאחד מהחלקים</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-stretch mb-20 md:mb-32 pt-10">
          {/* Main Plan - Redesigned to be "Bright & Eye-catching" */}
          <div className="relative group flex flex-col w-full max-w-full">
            {/* Recommended Badge - Enlarged as requested */}
            <div className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 z-30 bg-brand-orange text-white text-lg md:text-3xl font-black px-12 md:px-16 py-4 md:py-6 rounded-full shadow-[0_15px_30px_rgba(217,140,69,0.4)] border-4 border-white tracking-widest uppercase whitespace-nowrap transform hover:scale-105 transition-transform duration-300">
              מומלץ ביותר!
            </div>

            <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4.5rem] shadow-[0_40px_80px_-15px_rgba(84,99,79,0.12)] border-t-[12px] md:border-t-[20px] border-brand-green border-x-2 border-b-2 border-brand-beige relative flex flex-col h-full overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-brand-orange/30">
              
              <div className="mb-10 text-center md:text-right">
                <h3 className="text-3xl md:text-5xl font-black mb-3 text-brand-green leading-none">התוכנית המלאה</h3>
                <p className="text-brand-lightGreen font-black text-sm md:text-xl tracking-wide uppercase opacity-90">8 מפגשים של צמיחה וחיבור</p>
              </div>
              
              {!hidePrices ? (
                <div className="mb-10 p-6 md:p-10 bg-brand-green/5 rounded-[2rem] md:rounded-[3rem] border-2 border-brand-green/10 relative shadow-inner flex flex-col items-center md:items-start overflow-hidden">
                  <div className="absolute -bottom-4 -left-4 opacity-5 rotate-12">
                     <ButterflyIcon size={100} />
                  </div>
                  <div className="flex items-baseline gap-3 md:gap-4 mb-2 relative z-10 flex-wrap justify-center md:justify-start">
                    <span className="text-6xl md:text-9xl font-black text-brand-green">₪640</span>
                    <span className="text-brand-lightGreen font-black text-lg md:text-2xl">לתוכנית</span>
                  </div>
                  <div className="bg-brand-orange text-white px-5 py-1.5 rounded-full inline-block relative z-10">
                    <p className="font-black text-lg md:text-2xl">רק ₪80 למפגש</p>
                  </div>
                </div>
              ) : (
                <div className="mb-10 p-6 md:p-10 bg-brand-green/5 rounded-[2rem] md:rounded-[3rem] border-2 border-brand-green/10 relative shadow-inner flex flex-col items-center md:items-start overflow-hidden">
                  <div className="absolute -bottom-4 -left-4 opacity-5 rotate-12">
                     <ButterflyIcon size={100} />
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 mb-2 relative z-10 flex-wrap justify-center md:justify-start">
                    <span className="text-3xl md:text-5xl font-black text-brand-green leading-tight text-center md:text-right">8 מפגשים חווייתיים</span>
                  </div>
                  <p className="text-brand-lightGreen font-black text-lg md:text-xl relative z-10 mt-2 text-center md:text-right">
                    סדרה מקיפה של למידה קבוצתית, שיח, חיבור אישי ורגעים של השראה.
                  </p>
                </div>
              )}

              {/* Friend Promotion card */}
              <div className="mb-12 p-6 md:p-8 bg-brand-orange/5 rounded-[2rem] border-r-[10px] border-brand-orange shadow-md transform -rotate-1 group-hover:rotate-0 transition-transform duration-500 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg>
                  </div>
                  {hidePrices ? (
                    <p className="text-xl md:text-2xl font-black text-brand-green leading-tight">
                      חברה מביאה חברה: <span className="text-brand-orange">מומלץ להירשם יחד</span> לחוויה משותפת ומחברת
                    </p>
                  ) : (
                    <p className="text-xl md:text-2xl font-black text-brand-green leading-tight">
                      חברה מביאה חברה: <span className="text-brand-orange">560 ש"ח</span> לכל אחת
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-auto h-12 flex items-center justify-center md:justify-start">
                 <div className="w-16 h-1 bg-brand-beige/50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Partial Plan */}
          <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4.5rem] shadow-xl border-2 border-brand-beige flex flex-col group hover:border-brand-orange transition-all duration-500 w-full max-w-full relative">
            <div className="absolute inset-0 overflow-hidden rounded-[3rem] md:rounded-[4.5rem] pointer-events-none">
               <ButterflyIcon size={40} className="absolute bottom-2 left-2 opacity-10 group-hover:opacity-30 transition-opacity animate-float md:hidden" />
               <ButterflyIcon size={55} className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-30 transition-opacity animate-float hidden md:block" />
            </div>
            
            <div className="mb-10">
              <h3 className="text-3xl md:text-5xl font-black mb-3 text-brand-green leading-none">תוכנית חלקית</h3>
              <p className="text-gray-400 font-bold text-sm md:text-xl tracking-wide uppercase">4 מפגשים (חלק א' או ב')</p>
            </div>
            
            {!hidePrices ? (
              <div className="mb-10 p-8 md:p-12 bg-brand-beige/30 rounded-[2rem] md:rounded-[3rem] border-2 border-brand-beige shadow-inner h-full flex flex-col justify-center items-center md:items-start">
                <div className="flex items-baseline gap-3 md:gap-4 mb-2 flex-wrap justify-center md:justify-start">
                  <span className="text-5xl md:text-8xl font-black text-brand-orange">₪360</span>
                  <span className="text-gray-500 font-bold text-lg md:text-2xl">לחלק</span>
                </div>
              </div>
            ) : (
              <div className="mb-10 p-8 md:p-12 bg-brand-beige/30 rounded-[2rem] md:rounded-[3rem] border-2 border-brand-beige shadow-inner h-full flex flex-col justify-center items-center md:items-start text-center md:text-right">
                <p className="text-2xl md:text-3xl font-black text-brand-orange leading-snug">
                  רישום מותאם אישית
                </p>
                <p className="text-gray-600 font-bold text-lg md:text-xl mt-3 leading-relaxed">
                  ניתן להירשם לחלק א' או חלק ב' בנפרד, בהתאם לנושאים שמעניינים ומדויקים לך ביותר.
                </p>
              </div>
            )}

            <div className="mt-auto h-12 flex items-center justify-center md:justify-start">
               <div className="w-16 h-1 bg-brand-beige/50 rounded-full"></div>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-8">

          <div className="flex flex-col items-center gap-4">
            <p className="text-brand-green font-black text-xl md:text-2xl">יש לך שאלות? רוצה לשוחח ולקבל פרטים?</p>
            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-green border-2 border-brand-green/30 px-10 py-4 rounded-full text-lg md:text-xl font-black hover:bg-brand-orange hover:text-white hover:border-transparent transition-all shadow-md flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 text-[#25D366] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              שלחי לנו הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
