
import React from 'react';
import { SESSIONS_PART_B_ONLY, MEETING_HOURS } from '../constants';
import { Session } from '../types';
import { ButterflyIcon } from './Hero';

const SessionCard: React.FC<{ session: Session; accentColor: string; dotColor: string; isPartB?: boolean }> = ({ session, accentColor, dotColor, isPartB }) => {
  const bgShade = 'bg-brand-orange/5';
  const borderShade = 'border-brand-orange/20';
  const textShade = 'text-brand-orange';
  const thickBorderColor = 'bg-brand-orange';

  return (
    <div className="relative pl-0 md:pl-12 pb-16 md:pb-20 group animate-fade-in last:pb-0">
      <div className={`absolute right-0 top-0 h-full w-1.5 ${accentColor} opacity-20 hidden md:block -mr-[3px] rounded-full`} />
      <div className={`absolute right-[-18px] top-6 w-9 h-9 ${dotColor} rounded-full border-4 border-white shadow-xl transition-transform group-hover:scale-125 z-10 hidden md:block`} />
      
      <div className={`${thickBorderColor} p-1 md:p-1.5 rounded-[2.8rem] md:rounded-[3.8rem] shadow-xl`}>
        <div className={`bg-white p-6 sm:p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] border-2 ${borderShade} transition-all hover:shadow-2xl hover:border-brand-orange/30 md:group-hover:-translate-x-4 relative overflow-hidden text-right flex flex-col`}>
          
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
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border-b-4 shadow-xl transition-all bg-brand-orange border-brand-orange/40 text-white`}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span className="text-2xl md:text-4xl font-black tracking-tighter">{session.date}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 px-4 py-2 bg-brand-beige/50 rounded-full text-brand-green font-bold text-xs md:text-base border border-brand-beige">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span dir="ltr">{MEETING_HOURS}</span>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl md:text-5xl font-black text-brand-green mb-3 leading-tight tracking-tight">
              {session.title}
            </h3>
            <p className={`text-xl md:text-3xl font-bold text-brand-orange`}>
              {session.subtitle}
            </p>
          </div>

          <div className="space-y-6 mb-10">
            {session.lecturers.map((lecturer, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className={`p-6 md:p-8 bg-brand-orange/5 rounded-[2rem] border-r-[10px] md:border-r-[16px] border-brand-orange flex items-start md:items-center gap-5 md:gap-8 shadow-sm`}>
                  <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-brand-orange flex items-center justify-center text-white font-black text-xl md:text-3xl overflow-hidden shadow-xl flex-shrink-0`}>
                    {lecturer.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-2xl md:text-3xl font-black uppercase tracking-widest mb-1 text-brand-green`}>מרצה:</p>
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

          {session.description && (
            <div className="mt-4 p-8 bg-brand-orange/5 rounded-[2.5rem] border-r-4 border-brand-orange italic shadow-inner">
              <p className="text-brand-green leading-relaxed font-bold text-lg md:text-2xl">
                {session.description}
              </p>
            </div>
          )}

          <ButterflyIcon size={40} className={`absolute -bottom-2 -left-2 opacity-10 animate-float text-brand-orange`} />
        </div>
      </div>
    </div>
  );
};

export const ProgramStructurePartTwo: React.FC = () => {
  return (
    <section id="sessions" className="pt-24 pb-24 bg-brand-beige/20 px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={280} className="absolute top-0 -right-20 animate-drift opacity-[0.03] -z-10" />
      <ButterflyIcon size={240} className="absolute bottom-0 -left-10 animate-float opacity-[0.03] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-5xl md:text-8xl font-black mb-8 text-brand-green tracking-tighter">מבנה המפגשים - חלק ב'</h2>
          <p className="text-2xl md:text-4xl font-bold text-brand-orange">צמיחה, חיבור ומשמעות</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-brand-beige hidden md:block -mr-[3px] rounded-full" />
          
          <div className="space-y-0">
            {SESSIONS_PART_B_ONLY.map((s) => (
              <SessionCard key={s.id} session={s} accentColor="bg-brand-orange" dotColor="bg-brand-orange" isPartB />
            ))}
          </div>
            
          <div className="pt-20 md:pt-24 flex justify-center">
            <a 
              href="https://forms.gle/2ogpiqdcKk233KFc8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto bg-brand-orange text-white px-10 md:px-20 py-6 md:py-8 rounded-full text-2xl md:text-4xl font-black hover:bg-brand-green transition-all shadow-2xl transform hover:-translate-y-2 border-b-8 border-brand-orange/40 text-center"
            >
              להרשמה לחלק ב' לחצי כאן
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
