import React, { useState } from 'react';
import { SPEAKERS } from '../constants';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

export const SpeakersGrid: React.FC<{ customSubtitle?: string; bgClassName?: string }> = ({
  customSubtitle,
  bgClassName = 'bg-white',
}) => {
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState<number>(0);
  const [expandedBios, setExpandedBios] = useState<Record<number, boolean>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextSpeaker = () => setActiveSpeakerIdx((prev) => (prev + 1) % SPEAKERS.length);
  const prevSpeaker = () => setActiveSpeakerIdx((prev) => (prev === 0 ? SPEAKERS.length - 1 : prev - 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 45) nextSpeaker();
    if (diff < -45) prevSpeaker();
    setTouchStart(null);
  };

  const toggleSpeakerBio = (idx: number) => {
    setExpandedBios((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const currentSpeaker = SPEAKERS[activeSpeakerIdx];
  const isCurrentBioExpanded = !!expandedBios[activeSpeakerIdx];
  const cleanCurrentBio = currentSpeaker ? currentSpeaker.bio.replace(/<[^>]+>/g, '') : '';
  const isCurrentBioLong = cleanCurrentBio.length > 150;

  return (
    <section id="speakers" className={`pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 ${bgClassName} px-4 sm:px-6 relative overflow-hidden text-right`} dir="rtl">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-beige/20 to-transparent pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative">
        {/* כותרת נבחרת מרצות הבית */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto space-y-3">
          <div className="inline-block px-5 sm:px-6 py-1.5 sm:py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-2 tracking-tight border border-[#C56B3E]/30">
            נבחרת מרצות הבית של בין לבין
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C56B3E] tracking-tight">
            נבחרת מרצות הבית
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-base sm:text-lg md:text-xl font-bold leading-relaxed">
            {customSubtitle || 'צוות המומחיות ומרצות הבית שלנו מלווה את הסדנאות בידע, ניסיון וכלים לדרך. הרכב המרצות בכל מחזור נקבע ומתעדכן בהתאם לתכני המחזור, לזמינות ולצרכי הקבוצה.'}
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto mt-4 rounded-full opacity-80"></div>
        </div>

        {/* חלון גלריה ממוקד (Focused Gallery Window) למרצות עם דפדוף ימינה/שמאלה */}
        {currentSpeaker && (
          <div className="max-w-4xl mx-auto">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
              className="bg-gradient-to-b from-[#FFFDF9] via-white to-white rounded-3xl sm:rounded-[2.8rem] p-5 sm:p-8 md:p-10 border-2 border-[#C56B3E]/30 shadow-xl relative select-none animate-in fade-in duration-300"
            >
              {/* סרגל ניווט עליון בתוך החלון */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <span className="text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full bg-[#C56B3E]/10 text-[#C56B3E] border border-[#C56B3E]/20">
                  מרצה {activeSpeakerIdx + 1} מתוך {SPEAKERS.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSpeaker}
                    aria-label="למרצה הקודמת"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#C56B3E] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSpeaker}
                    aria-label="למרצה הבאה"
                    className="w-10 h-10 rounded-full bg-white hover:bg-[#C56B3E] text-slate-700 hover:text-white border border-slate-200 shadow-2xs flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              </div>

              {/* כרטיס המרצה - 2 טורים במסכים רחבים, טור אחד בנייד */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* עמודת תמונה */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="w-full max-w-[260px] aspect-[4/4.2] rounded-3xl overflow-hidden bg-[#FFF4EB] border-2 border-white shadow-md">
                    {currentSpeaker.image ? (
                      <img
                        src={currentSpeaker.image}
                        alt={currentSpeaker.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: currentSpeaker.imagePosition || 'top' }}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl font-black text-[#C56B3E]">
                        {currentSpeaker.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* תגיות נושאי מומחיות */}
                  {currentSpeaker.topics && currentSpeaker.topics.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3 max-w-[260px]">
                      {currentSpeaker.topics.map((topic, i) => (
                        <span key={i} className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFF4EB] text-[#93542B] border border-[#C56B3E]/20">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* עמודת פרטי המרצה */}
                <div className="md:col-span-7 space-y-3 text-right">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {currentSpeaker.name}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-[#C56B3E] mt-1 leading-snug">
                      {currentSpeaker.title}
                    </p>
                  </div>

                  <div className="h-0.5 w-14 bg-[#C56B3E]/30 rounded-full my-2"></div>

                  <p className={`text-sm sm:text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line ${isCurrentBioExpanded ? '' : 'line-clamp-4'}`}>
                    {cleanCurrentBio}
                  </p>

                  {isCurrentBioLong && (
                    <button
                      type="button"
                      onClick={() => toggleSpeakerBio(activeSpeakerIdx)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C56B3E]/10 hover:bg-[#C56B3E]/20 text-[#C56B3E] text-xs sm:text-sm font-black transition-all cursor-pointer mt-1"
                    >
                      <span>{isCurrentBioExpanded ? 'הסתר מידע נוסף' : 'קראי עוד על המרצה...'}</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isCurrentBioExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* רמז החלקה למובייל */}
              <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-slate-400 font-bold mt-5 pt-3 border-t border-slate-100">
                <ChevronRight className="w-3.5 h-3.5 text-[#C56B3E]" />
                <span>החליקי ימינה או שמאלה למעבר בין המרצות</span>
                <ChevronLeft className="w-3.5 h-3.5 text-[#C56B3E]" />
              </div>

              {/* מחוון נקודות ניווט */}
              <div className="flex items-center justify-center gap-2 pt-5 mt-4 border-t border-slate-100">
                {SPEAKERS.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveSpeakerIdx(dotIdx)}
                    aria-label={`עבור למרצה ${dotIdx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSpeakerIdx === dotIdx ? 'w-8 bg-[#C56B3E]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
