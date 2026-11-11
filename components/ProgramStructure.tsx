
import React from 'react';
import { SESSIONS_PART_A, SESSIONS_PART_B, MEETING_HOURS } from '../constants';
import { Session } from '../types';
import { ButterflyIcon } from './Hero';

const SessionCard: React.FC<{ session: Session; accentColor: string; dotColor: string; isPartB?: boolean; hideDates?: boolean }> = ({ session, accentColor, dotColor, isPartB, hideDates }) => {
  const bgShade = isPartB ? 'bg-[#FFF4EB]' : 'bg-[#2D5043]/5';
  const borderShade = isPartB ? 'border-[#C56B3E]/30' : 'border-[#2D5043]/20';
  const textShade = isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]';
  const thickBorderColor = isPartB ? 'bg-[#C56B3E]' : 'bg-[#2D5043]';

  return (
    <div className="relative pl-0 md:pl-12 pb-8 sm:pb-12 md:pb-16 group animate-fade-in last:pb-0">
      {/* Timeline Line (Desktop Only) */}
      <div className={`absolute right-0 top-0 h-full w-1.5 ${accentColor} opacity-20 hidden md:block -mr-[3px] rounded-full`} />
      
      {/* Timeline Dot (Desktop Only) */}
      <div className={`absolute right-[-18px] top-6 w-9 h-9 ${dotColor} rounded-full border-4 border-white shadow-xl transition-transform group-hover:scale-125 z-10 hidden md:block`} />
      
      {/* Container Wrapper - Adds the thick outline for both Part A and Part B */}
      <div className={`${thickBorderColor} p-1 md:p-1.5 rounded-3xl sm:rounded-[2.8rem] md:rounded-[3.8rem] shadow-xl`}>
        <div className={`bg-white p-5 sm:p-8 md:p-12 rounded-[1.35rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_15px_50px_-10px_rgba(197,107,62,0.08)] border-2 ${borderShade} transition-all hover:shadow-2xl hover:border-[#C56B3E]/40 md:group-hover:-translate-x-4 relative overflow-hidden text-right flex flex-col`}>
          
          {/* Topic Badge & Header (Without Session Numbers) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-5 sm:mb-8 border-b border-[#C56B3E]/20 pb-4 sm:pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`font-black ${textShade} bg-[#FFF9F4] px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-lg border-2 border-current shadow-sm`}>
                {isPartB ? 'חלק ב׳ • צמיחה ומשמעות' : 'חלק א׳ • התכנסות וחקירה'}
              </div>
              {session.value && (
                <div className={`text-xs md:text-sm font-black tracking-wide px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full ${accentColor} text-white shadow-md`}>
                  ערך מוביל: {session.value}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#FFF4EB] rounded-full text-[#93542B] font-bold text-xs md:text-base border border-[#C56B3E]/20">
              <svg className="w-4 h-4 text-[#C56B3E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span dir="ltr">{MEETING_HOURS}</span>
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-5 sm:mb-8">
            <h3 className={`text-2xl sm:text-3xl md:text-5xl font-black mb-2 sm:mb-3 leading-tight tracking-tight ${isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]'}`}>
              {session.title}
            </h3>
            <p className={`text-lg sm:text-xl md:text-3xl font-bold ${isPartB ? 'text-[#93542B]' : 'text-[#3A5A40]'}`}>
              {session.subtitle}
            </p>
          </div>

          {/* Professional Domain Group (Without committing to specific speaker name) */}
          <div className="space-y-4 sm:space-y-6 mb-3 sm:mb-4">
            {session.lecturers.map((lecturer, idx) => (
              <div key={idx} className="flex flex-col gap-3 sm:gap-4">
                <div className={`p-4 sm:p-6 md:p-8 ${bgShade} rounded-2xl sm:rounded-[2rem] border-r-[6px] sm:border-r-[10px] md:border-r-[16px] ${isPartB ? 'border-[#C56B3E]' : 'border-[#2D5043]'} flex items-start md:items-center gap-3.5 sm:gap-5 md:gap-8 shadow-sm`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl ${accentColor} flex items-center justify-center text-white font-black text-base sm:text-xl md:text-2xl overflow-hidden shadow-lg flex-shrink-0`}>
                    ✦
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs sm:text-sm md:text-lg font-black tracking-wide mb-1 ${isPartB ? 'text-[#2D5043]' : 'text-[#C56B3E]'}`}>הזווית המקצועית:</p>
                    <p className={`text-lg sm:text-xl md:text-3xl font-black leading-snug ${isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]'}`}>
                      {lecturer.name}
                    </p>
                  </div>
                </div>
                {lecturer.description && (
                  <div className="px-4 sm:px-6 py-4 sm:py-5 bg-[#FFF9F4] rounded-2xl sm:rounded-[1.8rem] border-r-4 border-[#C56B3E]/30 shadow-inner">
                     <p className="text-gray-800 leading-relaxed font-medium text-base sm:text-lg md:text-2xl">
                       {lecturer.description}
                     </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Description */}
          {session.description && (
            <div className="mt-3 sm:mt-4 p-5 sm:p-8 bg-[#FFF4EB] rounded-2xl sm:rounded-[2.5rem] border-r-4 border-[#C56B3E] italic shadow-inner">
              <p className="text-[#2D5043] leading-relaxed font-bold text-base sm:text-lg md:text-2xl">
                {session.description}
              </p>
            </div>
          )}

          {/* Floating Accent Butterfly */}
          <ButterflyIcon size={40} className={`absolute -bottom-2 -left-2 opacity-15 animate-float ${isPartB ? 'text-[#C56B3E]' : 'text-[#2D5043]'} hidden md:block`} />
        </div>
      </div>
    </div>
  );
};

export const ProgramStructure: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section id="sessions" className="pt-12 sm:pt-18 md:pt-24 pb-12 sm:pb-18 md:pb-24 bg-gradient-to-b from-[#FFF9F4] via-[#FFF4EB]/30 to-[#FFF9F4] px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={280} className="absolute top-0 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-0 -left-10 animate-float opacity-[0.03] text-[#2D5043] -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Connector Path (Desktop) */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#C56B3E]/20 hidden md:block -mr-[3px] rounded-full" />
          
          {/* Part A Content */}
          <div className="space-y-0">
            {/* Part A Header */}
            <div className="mb-8 sm:mb-14 md:mb-18 flex flex-col items-center relative z-20">
              <div className="bg-[#2D5043]/10 px-6 sm:px-10 py-4 sm:py-6 md:px-16 md:py-9 rounded-3xl sm:rounded-full border-b-4 sm:border-b-8 border-[#2D5043] shadow-xl backdrop-blur-sm w-full sm:w-auto">
                <h4 className="text-xl sm:text-2xl md:text-5xl font-black text-[#2D5043] text-center tracking-tight">חלק א': התכנסות וחקירה פנימית</h4>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-lg font-black text-[#2D5043] bg-white px-4 sm:px-5 py-1.5 rounded-full border border-[#2D5043]/20 shadow-xs text-center">
                מתוך נושאי חלק א׳ מתקיימים 3 מפגשים בכל מחזור
              </p>
            </div>
            
            {SESSIONS_PART_A.map((s) => (
              <SessionCard key={s.id} session={s} accentColor="bg-[#2D5043]" dotColor="bg-[#2D5043]" hideDates={hideDates} />
            ))}
            
            {/* Divider */}
            <div className="mt-6 sm:mt-8 mb-10 sm:mb-16 md:mb-20 h-1 bg-gradient-to-r from-[#2D5043]/20 via-[#C56B3E]/40 to-[#2D5043]/20 rounded-full relative z-20" />

            {/* Part B Header */}
            <div className="mt-0 mb-8 sm:mb-14 md:mb-18 flex flex-col items-center relative z-20">
              <div className="bg-[#C56B3E]/10 px-6 sm:px-10 py-4 sm:py-6 md:px-16 md:py-9 rounded-3xl sm:rounded-full border-b-4 sm:border-b-8 border-[#C56B3E] shadow-xl backdrop-blur-sm w-full sm:w-auto">
                <h4 className="text-xl sm:text-2xl md:text-5xl font-black text-[#C56B3E] text-center tracking-tight">חלק ב': צמיחה, חיבור ומשמעות</h4>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-lg font-black text-[#C56B3E] bg-white px-4 sm:px-5 py-1.5 rounded-full border border-[#C56B3E]/20 shadow-xs text-center">
                מתוך נושאי חלק ב׳ מתקיימים 3 מפגשים בכל מחזור
              </p>
            </div>
            
            {SESSIONS_PART_B.map((s: Session) => (
              <SessionCard key={s.id} session={s} accentColor="bg-[#C56B3E]" dotColor="bg-[#C56B3E]" isPartB hideDates={hideDates} />
            ))}
          </div>

          {/* Bottom Flexibility Note - Highlighted & Gently Blinking */}
          <div className="mt-10 sm:mt-14 bg-gradient-to-r from-[#FFF4EB] via-[#FFE6D1] to-[#FFF4EB] p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.2rem] border-2 border-[#C56B3E] shadow-xl text-center animate-notice-blink">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C56B3E] text-white text-xs md:text-sm font-black mb-3 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-200 animate-ping"></span>
              <span>חשוב לדעת ✦</span>
            </div>
            <p className="text-base sm:text-lg md:text-2xl font-black text-[#2D5043] leading-relaxed">
              <span className="text-[#C56B3E] underline decoration-2 underline-offset-4">שימי לב:</span> רשימת הנושאים שלעיל מייצגת את מניפת התכנים האפשריים של הסדנה. בכל מחזור מתקיימים 6 מפגשים המחולקים ל-3 מפגשים בכל חלק, והנושאים והדגשים מותאמים לכל קבוצה ועשויים להשתנות ממחזור למחזור.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
