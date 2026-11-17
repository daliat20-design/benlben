import React, { useState } from 'react';
import { SESSIONS_PART_A, SESSIONS_PART_B, MEETING_HOURS } from '../constants';
import { Session } from '../types';
import { ButterflyIcon } from './Hero';
import { ChevronRight, ChevronLeft, Clock, Sparkles } from 'lucide-react';

export const ProgramStructure: React.FC<{ hideDates?: boolean }> = () => {
  // All 4 sessions restored for Part A and Part B, with the note that 3 take place per cycle
  const partASessions: Session[] = SESSIONS_PART_A;
  const partBSessions: Session[] = SESSIONS_PART_B;

  const [activePartAIdx, setActivePartAIdx] = useState<number>(0);
  const [activePartBIdx, setActivePartBIdx] = useState<number>(0);

  const [touchStartA, setTouchStartA] = useState<number | null>(null);
  const [touchStartB, setTouchStartB] = useState<number | null>(null);

  const nextPartA = () => setActivePartAIdx((prev) => (prev + 1) % partASessions.length);
  const prevPartA = () => setActivePartAIdx((prev) => (prev === 0 ? partASessions.length - 1 : prev - 1));

  const nextPartB = () => setActivePartBIdx((prev) => (prev + 1) % partBSessions.length);
  const prevPartB = () => setActivePartBIdx((prev) => (prev === 0 ? partBSessions.length - 1 : prev - 1));

  const handleTouchStartA = (e: React.TouchEvent) => setTouchStartA(e.touches[0].clientX);
  const handleTouchEndA = (e: React.TouchEvent) => {
    if (touchStartA === null) return;
    const diff = touchStartA - e.changedTouches[0].clientX;
    if (diff > 45) nextPartA();
    if (diff < -45) prevPartA();
    setTouchStartA(null);
  };

  const handleTouchStartB = (e: React.TouchEvent) => setTouchStartB(e.touches[0].clientX);
  const handleTouchEndB = (e: React.TouchEvent) => {
    if (touchStartB === null) return;
    const diff = touchStartB - e.changedTouches[0].clientX;
    if (diff > 45) nextPartB();
    if (diff < -45) prevPartB();
    setTouchStartB(null);
  };

  const currentSessionA = partASessions[activePartAIdx];
  const currentSessionB = partBSessions[activePartBIdx];

  return (
    <section id="sessions" className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 bg-gradient-to-b from-[#FFF9F4] via-[#FFF4EB]/30 to-[#FFF9F4] px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      <ButterflyIcon size={280} className="absolute top-0 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] -z-10 hidden md:block" />
      <ButterflyIcon size={240} className="absolute bottom-0 -left-10 animate-float opacity-[0.03] text-[#2D5043] -z-10 hidden md:block" />

      <div className="max-w-5xl mx-auto">
        
        {/* הערה מרכזית לפני פירוט המפגשים */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 bg-white rounded-full border-2 border-[#C56B3E]/40 shadow-sm text-center">
            <Sparkles className="w-4 h-4 text-[#C56B3E] shrink-0" />
            <p className="text-xs sm:text-base md:text-lg font-black text-[#2D5043]">
              בכל מחזור נבחרים 3 מפגשים מתוך מאגר הנושאים של שני החלקים.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* חלק א': 4 המפגשים בחלון גלריה ממוקד לגלילה לצדדים */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-20">
          
          {/* כותרת מודגשת לפני חלון גלריה חלק א' */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-[#2D5043]/10 rounded-3xl sm:rounded-full border-b-4 border-[#2D5043] shadow-md backdrop-blur-xs">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D5043] tracking-tight">
                חלק א': התכנסות וחקירה פנימית
              </h3>
            </div>
          </div>

          {/* חלון גלריה ממוקד (Focused Window Gallery) חלק א' */}
          {currentSessionA && (
            <div className="max-w-4xl mx-auto">
              <div
                onTouchStart={handleTouchStartA}
                onTouchEnd={handleTouchEndA}
                style={{ touchAction: 'pan-y' }}
                className="bg-white rounded-3xl sm:rounded-[2.8rem] p-5 sm:p-8 md:p-10 border-2 border-[#2D5043]/30 shadow-xl relative select-none animate-in fade-in duration-300"
              >
                {/* סרגל ניווט עליון בתוך החלון */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#2D5043]/15">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full bg-[#2D5043] text-white shadow-xs">
                      מפגש {activePartAIdx + 1} מתוך {partASessions.length} • חלק א׳
                    </span>
                    {currentSessionA.value && (
                      <span className="text-xs sm:text-sm font-black px-3 py-1.5 rounded-full bg-[#2D5043]/10 text-[#2D5043] border border-[#2D5043]/20">
                        ערך מוביל: {currentSessionA.value}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#FFF4EB] rounded-full text-[#93542B] font-bold text-xs border border-[#C56B3E]/20">
                      <Clock className="w-3.5 h-3.5 text-[#C56B3E]" />
                      <span dir="ltr">{MEETING_HOURS}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={prevPartA}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#2D5043] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                        title="למפגש הקודם"
                        aria-label="למפגש הקודם"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextPartA}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#2D5043] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                        title="למפגש הבא"
                        aria-label="למפגש הבא"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* תוכן המפגש */}
                <div className="space-y-5 text-right">
                  <div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D5043] tracking-tight leading-snug">
                      {currentSessionA.title}
                    </h4>
                    <p className="text-base sm:text-xl font-bold text-[#3A5A40] mt-1.5">
                      {currentSessionA.subtitle}
                    </p>
                  </div>

                  {/* הזוויות המקצועיות */}
                  <div className="space-y-3">
                    {currentSessionA.lecturers.map((lecturer, idx) => (
                      <div key={idx} className="bg-[#2D5043]/5 rounded-2xl p-4 sm:p-6 border-r-[6px] border-[#2D5043] shadow-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-lg bg-[#2D5043] text-white flex items-center justify-center text-xs font-black">
                            ✦
                          </span>
                          <span className="text-xs sm:text-sm font-black text-[#C56B3E] uppercase tracking-wider">
                            הזווית המקצועית:
                          </span>
                        </div>
                        <p className="text-base sm:text-xl font-black text-[#2D5043] leading-snug mb-1">
                          {lecturer.name}
                        </p>
                        {lecturer.description && (
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mt-2">
                            {lecturer.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* תיאור נוסף אם קיים */}
                  {currentSessionA.description && (
                    <div className="p-4 sm:p-5 bg-[#FFF4EB] rounded-2xl border-r-4 border-[#C56B3E] text-slate-700 text-sm sm:text-base leading-relaxed font-medium italic">
                      {currentSessionA.description}
                    </div>
                  )}
                </div>

                {/* רמז החלקה למובייל */}
                <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-slate-400 font-bold mt-5 pt-3 border-t border-slate-100">
                  <ChevronRight className="w-3.5 h-3.5 text-[#2D5043]" />
                  <span>החליקי ימינה או שמאלה למעבר בין 4 המפגשים</span>
                  <ChevronLeft className="w-3.5 h-3.5 text-[#2D5043]" />
                </div>

                {/* מחוון נקודות ניווט */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  {partASessions.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActivePartAIdx(dotIdx)}
                      aria-label={`עבור למפגש ${dotIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activePartAIdx === dotIdx ? 'w-8 bg-[#2D5043]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* מפריד מעוצב בין שני החלקים */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#C56B3E]/30 to-transparent my-10 sm:my-14 rounded-full max-w-xl mx-auto"></div>

        {/* ============================================================== */}
        {/* חלק ב': 4 המפגשים בחלון גלריה ממוקד לגלילה לצדדים */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-20">
          
          {/* כותרת מודגשת לפני חלון גלריה חלק ב' */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block px-6 sm:px-10 py-3 sm:py-4 bg-[#C56B3E]/10 rounded-3xl sm:rounded-full border-b-4 border-[#C56B3E] shadow-md backdrop-blur-xs">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C56B3E] tracking-tight">
                חלק ב': צמיחה, חיבור ומשמעות
              </h3>
            </div>
          </div>

          {/* חלון גלריה ממוקד (Focused Window Gallery) חלק ב' */}
          {currentSessionB && (
            <div className="max-w-4xl mx-auto">
              <div
                onTouchStart={handleTouchStartB}
                onTouchEnd={handleTouchEndB}
                style={{ touchAction: 'pan-y' }}
                className="bg-white rounded-3xl sm:rounded-[2.8rem] p-5 sm:p-8 md:p-10 border-2 border-[#C56B3E]/30 shadow-xl relative select-none animate-in fade-in duration-300"
              >
                {/* סרגל ניווט עליון בתוך החלון */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#C56B3E]/15">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full bg-[#C56B3E] text-white shadow-xs">
                      מפגש {activePartBIdx + 1} מתוך {partBSessions.length} • חלק ב׳
                    </span>
                    {currentSessionB.value && (
                      <span className="text-xs sm:text-sm font-black px-3 py-1.5 rounded-full bg-[#C56B3E]/10 text-[#C56B3E] border border-[#C56B3E]/20">
                        ערך מוביל: {currentSessionB.value}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-[#FFF4EB] rounded-full text-[#93542B] font-bold text-xs border border-[#C56B3E]/20">
                      <Clock className="w-3.5 h-3.5 text-[#C56B3E]" />
                      <span dir="ltr">{MEETING_HOURS}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={prevPartB}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#C56B3E] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                        title="למפגש הקודם"
                        aria-label="למפגש הקודם"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextPartB}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-50 hover:bg-[#C56B3E] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                        title="למפגש הבא"
                        aria-label="למפגש הבא"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* תוכן המפגש */}
                <div className="space-y-5 text-right">
                  <div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C56B3E] tracking-tight leading-snug">
                      {currentSessionB.title}
                    </h4>
                    <p className="text-base sm:text-xl font-bold text-[#93542B] mt-1.5">
                      {currentSessionB.subtitle}
                    </p>
                  </div>

                  {/* הזוויות המקצועיות */}
                  <div className="space-y-3">
                    {currentSessionB.lecturers.map((lecturer, idx) => (
                      <div key={idx} className="bg-[#FFF4EB] rounded-2xl p-4 sm:p-6 border-r-[6px] border-[#C56B3E] shadow-xs">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-lg bg-[#C56B3E] text-white flex items-center justify-center text-xs font-black">
                            ✦
                          </span>
                          <span className="text-xs sm:text-sm font-black text-[#2D5043] uppercase tracking-wider">
                            הזווית המקצועית:
                          </span>
                        </div>
                        <p className="text-base sm:text-xl font-black text-[#C56B3E] leading-snug mb-1">
                          {lecturer.name}
                        </p>
                        {lecturer.description && (
                          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mt-2">
                            {lecturer.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* תיאור נוסף אם קיים */}
                  {currentSessionB.description && (
                    <div className="p-4 sm:p-5 bg-[#FFF4EB] rounded-2xl border-r-4 border-[#C56B3E] text-slate-700 text-sm sm:text-base leading-relaxed font-medium italic">
                      {currentSessionB.description}
                    </div>
                  )}
                </div>

                {/* רמז החלקה למובייל */}
                <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-slate-400 font-bold mt-5 pt-3 border-t border-slate-100">
                  <ChevronRight className="w-3.5 h-3.5 text-[#C56B3E]" />
                  <span>החליקי ימינה או שמאלה למעבר בין 4 המפגשים</span>
                  <ChevronLeft className="w-3.5 h-3.5 text-[#C56B3E]" />
                </div>

                {/* מחוון נקודות ניווט */}
                <div className="flex items-center justify-center gap-2 mt-5">
                  {partBSessions.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActivePartBIdx(dotIdx)}
                      aria-label={`עבור למפגש ${dotIdx + 1}`}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activePartBIdx === dotIdx ? 'w-8 bg-[#C56B3E]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* הערת גמישות / חשוב לדעת */}
        <div className="bg-gradient-to-r from-[#FFF4EB] via-[#FFE6D1] to-[#FFF4EB] p-5 sm:p-8 rounded-3xl border-2 border-[#C56B3E] shadow-lg text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C56B3E] text-white text-xs sm:text-sm font-black mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>חשוב לדעת ✦</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#2D5043] leading-relaxed">
            <span className="text-[#C56B3E] underline decoration-2 underline-offset-4 font-black">שימי לב:</span> רשימת הנושאים שלעיל מייצגת את מניפת התכנים האפשריים של הסדנה. בכל מחזור מתקיימים 6 מפגשים המחולקים ל-3 מפגשים בכל חלק, והנושאים והדגשים מותאמים לכל קבוצה ועשויים להתעדכן בהתאם לצורכי המשתתפות.
          </p>
        </div>

      </div>
    </section>
  );
};
