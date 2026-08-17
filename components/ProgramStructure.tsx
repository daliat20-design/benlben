
import React from 'react';
import { SESSIONS_PART_A, SESSIONS_PART_B, MEETING_HOURS } from '../constants';
import { Session } from '../types';
import { ButterflyIcon } from './Hero';

const SessionCard: React.FC<{ session: Session; accentColor: string; dotColor: string; isPartB?: boolean; hideDates?: boolean }> = ({ session, accentColor, dotColor, isPartB, hideDates }) => {
  const isSessionSix = session.id === 6;
  
  const bgShade = isPartB ? 'bg-brand-orange/5' : 'bg-brand-green/5';
  const borderShade = isPartB ? 'border-brand-orange/20' : 'border-brand-green/20';
  const textShade = isPartB ? 'text-brand-orange' : 'text-brand-green';
  const thickBorderColor = isPartB ? 'bg-brand-orange' : 'bg-brand-green';

  return (
    <div className="relative pl-0 md:pl-12 pb-16 md:pb-20 group animate-fade-in last:pb-0">
      {/* Timeline Line (Desktop Only) */}
      <div className={`absolute right-0 top-0 h-full w-1.5 ${accentColor} opacity-20 hidden md:block -mr-[3px] rounded-full`} />
      
      {/* Timeline Dot (Desktop Only) */}
      <div className={`absolute right-[-18px] top-6 w-9 h-9 ${dotColor} rounded-full border-4 border-white shadow-xl transition-transform group-hover:scale-125 z-10 hidden md:block`} />
      
      {/* Container Wrapper - Adds the thick outline for both Part A and Part B */}
      <div className={`${thickBorderColor} p-1 md:p-1.5 rounded-[2.8rem] md:rounded-[3.8rem] shadow-xl`}>
        <div className={`bg-white p-6 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] border-2 ${borderShade} transition-all hover:shadow-2xl hover:border-brand-orange/30 md:group-hover:-translate-x-4 relative overflow-hidden text-right flex flex-col`}>
          
          {/* Session Badge & Header */}
          <div className="flex flex-col gap-5 mb-8 border-b border-brand-beige pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`font-black ${textShade} bg-brand-cream px-5 py-2 rounded-full text-sm md:text-lg border-2 border-current shadow-sm`}>
                מפגש מס׳ {session.id}
              </div>
              {session.value && (
                <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full ${accentColor} text-white shadow-md`}>
                  ערך: {session.value}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2 items-start md:items-end">
              {!hideDates && (
                <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border-b-4 shadow-xl transition-all ${isSessionSix ? 'bg-red-600 border-red-800 text-white' : isPartB ? 'bg-brand-orange border-brand-orange/40 text-white' : 'bg-brand-green border-brand-green/40 text-white'}`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <span className="text-2xl md:text-4xl font-black tracking-tighter">{session.date}</span>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1 px-4 py-2 bg-brand-beige/50 rounded-full text-brand-green font-bold text-xs md:text-base border border-brand-beige">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span dir="ltr">{MEETING_HOURS}</span>
              </div>
            </div>
          </div>

          {/* Title Section */}
          <div className="mb-10">
            <h3 className="text-3xl md:text-5xl font-black text-brand-green mb-3 leading-tight tracking-tight">
              {session.title}
            </h3>
            <p className={`text-xl md:text-3xl font-bold ${isPartB ? 'text-brand-orange' : 'text-brand-lightGreen'}`}>
              {session.subtitle}
            </p>
          </div>

          {/* Lecturers Group - Visually Contained */}
          <div className="space-y-6 mb-10">
            {session.lecturers.map((lecturer, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className={`p-6 md:p-8 ${bgShade} rounded-[2rem] border-r-[10px] md:border-r-[16px] ${isPartB ? 'border-brand-orange' : 'border-brand-green'} flex items-start md:items-center gap-5 md:gap-8 shadow-sm`}>
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl ${accentColor} flex items-center justify-center text-white font-black text-xl md:text-3xl overflow-hidden shadow-xl flex-shrink-0`}>
                    {lecturer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-2xl md:text-3xl font-black uppercase tracking-widest mb-1 ${isPartB ? 'text-brand-green' : 'text-brand-orange'}`}>מרצה:</p>
                    <p className="text-xl md:text-3xl font-black text-brand-green leading-snug">
                      {lecturer.name}
                    </p>
                  </div>
                </div>
                {lecturer.description && (
                  <div className="px-6 py-5 bg-brand-cream/60 rounded-[1.8rem] border-r-4 border-brand-beige shadow-inner">
                     <p className="text-gray-700 leading-relaxed font-medium text-lg md:text-2xl">
                       {lecturer.description}
                     </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Description */}
          {session.description && (
            <div className="mt-4 p-8 bg-brand-orange/5 rounded-[2.5rem] border-r-4 border-brand-orange italic shadow-inner">
              <p className="text-brand-green leading-relaxed font-bold text-lg md:text-2xl">
                {session.description}
              </p>
            </div>
          )}

          {/* Floating Accent Butterfly */}
          <ButterflyIcon size={40} className={`absolute -bottom-2 -left-2 opacity-10 animate-float ${isPartB ? 'text-brand-orange' : 'text-brand-green'} hidden md:block`} />

          {/* Special Change Badge */}
          {isSessionSix && !hideDates && (
            <div className="absolute top-0 left-0 bg-red-600 text-white px-6 py-3 text-xs font-black uppercase rounded-br-3xl z-20 shadow-xl animate-pulse">
              שינוי יום!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProgramStructure: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section id="sessions" className="pt-24 pb-24 bg-brand-beige/20 px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={280} className="absolute top-0 -right-20 animate-drift opacity-[0.03] -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-0 -left-10 animate-float opacity-[0.03] -z-10 hidden md:block" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-5xl md:text-8xl font-black mb-8 text-brand-green tracking-tighter">מבנה המפגשים</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Connector Path (Desktop) */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-brand-beige hidden md:block -mr-[3px] rounded-full" />
          
          {/* Part A Content */}
          <div className="space-y-0">
            {/* Part A Header - Symmetrical spacing with sessions */}
            <div className="mb-16 md:mb-20 flex justify-center relative z-20">
              <div className="bg-brand-green/10 px-10 py-6 md:px-16 md:py-10 rounded-full border-b-8 border-brand-green shadow-xl backdrop-blur-sm">
                <h4 className="text-2xl md:text-5xl font-black text-brand-green text-center tracking-tight">חלק א': התכנסות וחקירה פנימית</h4>
              </div>
            </div>
            
            {SESSIONS_PART_A.map((s) => (
              <SessionCard key={s.id} session={s} accentColor="bg-brand-green" dotColor="bg-brand-green" hideDates={hideDates} />
            ))}
            
            {/* Passover Break Banner - Integrated with identical vertical spacing */}
            {!hideDates && (
              <div className="mt-0 mb-16 md:mb-20 bg-gradient-to-r from-brand-green to-brand-orange p-1.5 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative z-20 transform -rotate-1">
                <div className="bg-white p-10 md:p-16 rounded-[2.8rem] md:rounded-[3.8rem] text-center">
                  <div className="w-20 h-2 bg-brand-orange mx-auto mb-6 rounded-full opacity-30"></div>
                  <h4 className="text-4xl md:text-6xl font-black italic mb-4 text-brand-green tracking-tighter">פגרת פסח - חג שמח</h4>
                  <p className="text-brand-orange font-black text-2xl md:text-4xl font-black">חוזרות ב 15.4</p>
                  <div className="w-20 h-2 bg-brand-green mx-auto mt-8 rounded-full opacity-30"></div>
                </div>
              </div>
            )}

            {/* Part B Header - Symmetrical spacing matching Banner and Part A rhythm */}
            <div className="mt-0 mb-16 md:mb-20 flex justify-center relative z-20">
              <div className="bg-brand-orange/10 px-10 py-6 md:px-16 md:py-10 rounded-full border-b-8 border-brand-orange shadow-xl backdrop-blur-sm">
                <h4 className="text-2xl md:text-5xl font-black text-brand-orange text-center tracking-tight">חלק ב': צמיחה, חיבור ומשמעות</h4>
              </div>
            </div>
            
            {SESSIONS_PART_B.map((s: Session) => (
              <SessionCard key={s.id} session={s} accentColor="bg-brand-orange" dotColor="bg-brand-orange" isPartB hideDates={hideDates} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
