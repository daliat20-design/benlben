
import React from 'react';
import { ButterflyIcon } from './Hero';
import { MEETING_HOURS } from '../constants';

export const ImportantInfoPartTwo: React.FC = () => {
  return (
    <section id="important-info" className="pt-12 pb-12 bg-brand-cream/60 px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={300} className="absolute -top-20 -right-20 animate-drift opacity-[0.04] -z-10" />
      <ButterflyIcon size={250} className="absolute -bottom-20 -left-20 animate-float opacity-[0.04] -z-10" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-8 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-black mb-6 tracking-widest uppercase border border-brand-green/20">
            פרטים טכניים - חלק ב'
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-brand-green tracking-tighter">חשוב לדעת</h2>
          <div className="h-2 w-32 bg-brand-orange mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div className="relative group h-full">
            <div className="relative bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(84,99,79,0.08)] border-2 border-brand-beige group-hover:border-brand-green/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-green text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-brand-green mb-6 md:mb-8">מועדי המפגשים</h3>
              
              <div className="space-y-4 md:space-y-6 text-gray-700 font-medium leading-relaxed flex-1">
                <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-brand-beige/30 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-brand-green shadow-sm">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-brand-green animate-pulse flex-shrink-0"></div>
                  <p className="text-xl md:text-2xl"><span className="font-black text-brand-green">מתי מתחילים?</span> 15.4.26</p>
                </div>

                <div className="flex items-start md:items-center gap-3 md:gap-5 p-4 md:p-6 bg-brand-orange/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-brand-orange shadow-sm">
                   <svg className="w-6 h-6 md:w-8 md:h-8 text-brand-orange mt-1 md:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   <div className="flex wrap items-center gap-x-2">
                     <span className="font-black text-brand-orange text-xl md:text-2xl">שעות:</span>
                     <span className="text-xl md:text-2xl text-gray-700 font-bold" dir="ltr">{MEETING_HOURS}</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-brand-green/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-brand-green shadow-sm">
                   <svg className="w-6 h-6 md:w-8 md:h-8 text-brand-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                   <p className="text-xl md:text-2xl"><span className="font-black text-brand-green">מיקום:</span> א.ת כפר סבא (רח' התע״ש)</p>
                </div>

                <div className="mt-auto pt-4 md:pt-6">
                  <div className="bg-red-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-b-[6px] md:border-b-[8px] border-red-800 shadow-[0_15px_30px_rgba(220,38,38,0.2)] transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    <p className="text-white font-black text-lg md:text-2xl leading-tight">
                      שימי לב: המפגשים מתקיימים בימי רביעי, למעט מפגש מס׳ 2 (19.4.26).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group h-full">
            <div className="relative bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(217,140,69,0.08)] border-2 border-brand-beige group-hover:border-brand-orange/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-orange text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-brand-green mb-6 md:mb-8">קהל יעד ומיקום</h3>
              
              <div className="space-y-6 md:space-y-10 text-gray-700 font-medium text-lg md:text-xl leading-relaxed flex-1">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-brand-orange/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-brand-orange shadow-sm">
                    <div>
                      <p className="text-[10px] md:text-xs font-black text-brand-orange uppercase tracking-widest mb-1">טווח גילאים מומלץ</p>
                      <p className="text-2xl md:text-3xl font-black text-brand-green" dir="ltr">45-65</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-brand-green/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-brand-green shadow-sm">
                    <div>
                      <p className="text-[10px] md:text-xs font-black text-brand-green uppercase tracking-widest mb-1">מיקום</p>
                      <p className="text-2xl md:text-3xl font-black text-brand-green">א.ת כפר סבא (רח' התע״ש)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-beige/40 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] italic border-2 border-brand-beige shadow-inner">
                  <p className="text-gray-500 font-bold text-base md:text-lg leading-relaxed">
                    המיקום המדויק ופרטי ההגעה המלאים יישלחו אישית לכל משתתפת בתוכנית לפני מועד הפתיחה.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
