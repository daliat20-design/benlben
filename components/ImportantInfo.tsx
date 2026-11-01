
import React from 'react';
import { ButterflyIcon } from './Hero';
import { MEETING_HOURS } from '../constants';

export const ImportantInfo: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section id="important-info" className="pt-12 pb-12 bg-gradient-to-b from-[#FFF9F4] to-[#FFF4EB] px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={300} className="absolute -top-20 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] -z-10" />
      <ButterflyIcon size={250} className="absolute -bottom-20 -left-20 animate-float opacity-[0.03] text-[#2D5043] -z-10" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-8 py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-sm font-black mb-6 tracking-widest uppercase border border-[#C56B3E]/30">
            פרטים טכניים
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-[#C56B3E] tracking-tighter">חשוב לדעת</h2>
          <div className="h-2 w-32 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14">
          <div className="relative group h-full">
            <div className="relative bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(197,107,62,0.08)] border-2 border-[#C56B3E]/20 group-hover:border-[#C56B3E]/40 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#2D5043] text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-[#2D5043] mb-6 md:mb-8">מועדי המפגשים</h3>
              
              <div className="space-y-4 md:space-y-6 text-gray-800 font-medium leading-relaxed flex-1">
                <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-[#FFF4EB] rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#C56B3E] shadow-sm">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#C56B3E] animate-pulse flex-shrink-0"></div>
                  <p className="text-xl md:text-2xl"><span className="font-black text-[#C56B3E]">מועד פתיחה:</span> תוכנית חורף ינואר/פברואר</p>
                </div>

                <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-[#2D5043]/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#2D5043] shadow-sm">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#2D5043] flex-shrink-0"></div>
                  <p className="text-xl md:text-2xl"><span className="font-black text-[#2D5043]">תדירות:</span> פעם בשבוע</p>
                </div>

                <div className="flex items-start md:items-center gap-3 md:gap-5 p-4 md:p-6 bg-[#FFF4EB] rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#C56B3E] shadow-sm">
                   <svg className="w-6 h-6 md:w-8 md:h-8 text-[#C56B3E] mt-1 md:mt-0 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                   <div className="flex flex-wrap items-center gap-x-2">
                     <span className="font-black text-[#C56B3E] text-xl md:text-2xl">שעות:</span>
                     <span className="text-xl md:text-2xl text-gray-800 font-bold" dir="ltr">{MEETING_HOURS}</span>
                   </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5 p-4 md:p-6 bg-[#2D5043]/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#2D5043] shadow-sm">
                   <svg className="w-6 h-6 md:w-8 md:h-8 text-[#2D5043] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                   <p className="text-xl md:text-2xl"><span className="font-black text-[#2D5043]">מיקום:</span> א.ת כפר סבא (רח' התע״ש)</p>
                </div>

                <div className="mt-auto pt-4 md:pt-6">
                  <div className="bg-[#B85D19] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-b-[6px] md:border-b-[8px] border-[#93542B] shadow-[0_15px_30px_rgba(184,93,25,0.25)] transform -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                    {hideDates ? (
                      <p className="text-white font-black text-lg md:text-2xl leading-tight">
                        שימי לב: מספר המקומות בכל מחזור מוגבל כדי לאפשר שיח קבוצתי אינטימי ומקרב.
                      </p>
                    ) : (
                      <p className="text-white font-black text-lg md:text-2xl leading-tight">
                        שימי לב: המפגשים מתקיימים בימי רביעי, למעט מפגש מס׳ 6 (19.4.26).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group h-full">
            <div className="relative bg-white p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_50px_rgba(197,107,62,0.08)] border-2 border-[#C56B3E]/20 group-hover:border-[#C56B3E]/40 transition-all duration-500 flex flex-col h-full overflow-hidden">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#C56B3E] text-white rounded-2xl md:rounded-3xl flex items-center justify-center mb-8 md:mb-10 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>

              <h3 className="text-2xl md:text-4xl font-black text-[#2D5043] mb-6 md:mb-8">גילאים ומיקום</h3>
              
              <div className="space-y-6 md:space-y-10 text-gray-800 font-medium text-lg md:text-xl leading-relaxed flex-1">
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-[#FFF4EB] rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#C56B3E] shadow-sm">
                    <div>
                      <p className="text-[10px] md:text-xs font-black text-[#C56B3E] uppercase tracking-widest mb-1">טווח גילאים מומלץ</p>
                      <p className="text-2xl md:text-3xl font-black text-[#2D5043]" dir="ltr">45-60</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-[#2D5043]/5 rounded-[1.5rem] md:rounded-[2rem] border-r-8 border-[#2D5043] shadow-sm">
                    <div>
                      <p className="text-[10px] md:text-xs font-black text-[#2D5043] uppercase tracking-widest mb-1">מיקום</p>
                      <p className="text-2xl md:text-3xl font-black text-[#2D5043]">א.ת כפר סבא (רח' התע״ש)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFF9F4] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] italic border-2 border-[#C56B3E]/20 shadow-inner">
                  <p className="text-gray-600 font-bold text-base md:text-lg leading-relaxed">
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
