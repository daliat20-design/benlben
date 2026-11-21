import React, { useState } from 'react';
import { MIDLIFE_TOPIC_POOL } from '../constants';
import { ButterflyIcon } from './Hero';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const TOPIC_THEMES = [
  {
    // 1. גיל המעבר והשינויים בגוף — טרה-קוטה חמה
    pillActive: 'bg-[#C56B3E] text-white border-[#C56B3E]',
    pillInactive: 'bg-[#F8ECE0] text-[#934B24] border-[#C56B3E]/40 hover:border-[#C56B3E]',
    dotColor: 'bg-[#C56B3E]',
    cardBorder: 'border-[#C56B3E]/55 border-t-[10px] border-t-[#C56B3E]',
    badgeBg: 'bg-[#C56B3E] text-white',
    valueBg: 'bg-[#F8ECE0] text-[#934B24] border-[#C56B3E]/35',
    titleText: 'text-[#C56B3E]',
    boxBg: 'bg-[#F9EFE5] border-r-[8px] border-[#C56B3E]',
    arrowHover: 'hover:bg-[#C56B3E] text-[#934B24] border-[#C56B3E]/35',
    closingText: 'text-[#C56B3E]',
  },
  {
    // 2. יחסים במשפחה המשתנה — ירוק יער עמוק
    pillActive: 'bg-[#2D5043] text-white border-[#2D5043]',
    pillInactive: 'bg-[#E3EFE8] text-[#2D5043] border-[#2D5043]/35 hover:border-[#2D5043]',
    dotColor: 'bg-[#2D5043]',
    cardBorder: 'border-[#2D5043]/55 border-t-[10px] border-t-[#2D5043]',
    badgeBg: 'bg-[#2D5043] text-white',
    valueBg: 'bg-[#E3EFE8] text-[#2D5043] border-[#2D5043]/35',
    titleText: 'text-[#2D5043]',
    boxBg: 'bg-[#E7F2EB] border-r-[8px] border-[#2D5043]',
    arrowHover: 'hover:bg-[#2D5043] text-[#2D5043] border-[#2D5043]/35',
    closingText: 'text-[#2D5043]',
  },
  {
    // 3. זוגיות באמצע החיים — שזיף בורגונדי עמוק
    pillActive: 'bg-[#7D3248] text-white border-[#7D3248]',
    pillInactive: 'bg-[#F3E5E9] text-[#6B283C] border-[#7D3248]/35 hover:border-[#7D3248]',
    dotColor: 'bg-[#7D3248]',
    cardBorder: 'border-[#7D3248]/55 border-t-[10px] border-t-[#7D3248]',
    badgeBg: 'bg-[#7D3248] text-white',
    valueBg: 'bg-[#F3E5E9] text-[#6B283C] border-[#7D3248]/35',
    titleText: 'text-[#7D3248]',
    boxBg: 'bg-[#F6EAEE] border-r-[8px] border-[#7D3248]',
    arrowHover: 'hover:bg-[#7D3248] text-[#6B283C] border-[#7D3248]/35',
    closingText: 'text-[#7D3248]',
  },
  {
    // 4. תזונה ואורח חיים — ירוק זית עשיר
    pillActive: 'bg-[#4B6B38] text-white border-[#4B6B38]',
    pillInactive: 'bg-[#E8F0E2] text-[#3B572B] border-[#4B6B38]/35 hover:border-[#4B6B38]',
    dotColor: 'bg-[#4B6B38]',
    cardBorder: 'border-[#4B6B38]/55 border-t-[10px] border-t-[#4B6B38]',
    badgeBg: 'bg-[#4B6B38] text-white',
    valueBg: 'bg-[#E8F0E2] text-[#3B572B] border-[#4B6B38]/35',
    titleText: 'text-[#4B6B38]',
    boxBg: 'bg-[#EDF4E8] border-r-[8px] border-[#4B6B38]',
    arrowHover: 'hover:bg-[#4B6B38] text-[#3B572B] border-[#4B6B38]/35',
    closingText: 'text-[#4B6B38]',
  },
  {
    // 5. נשימה ואיכות חיים — טורקיז צפחה בוטני
    pillActive: 'bg-[#265D68] text-white border-[#265D68]',
    pillInactive: 'bg-[#E1EFF2] text-[#1F4E57] border-[#265D68]/35 hover:border-[#265D68]',
    dotColor: 'bg-[#265D68]',
    cardBorder: 'border-[#265D68]/55 border-t-[10px] border-t-[#265D68]',
    badgeBg: 'bg-[#265D68] text-white',
    valueBg: 'bg-[#E1EFF2] text-[#1F4E57] border-[#265D68]/35',
    titleText: 'text-[#265D68]',
    boxBg: 'bg-[#E6F2F5] border-r-[8px] border-[#265D68]',
    arrowHover: 'hover:bg-[#265D68] text-[#1F4E57] border-[#265D68]/35',
    closingText: 'text-[#265D68]',
  },
  {
    // 6. קריירה ותעסוקה — ארד ענבר מוזהב
    pillActive: 'bg-[#945D1D] text-white border-[#945D1D]',
    pillInactive: 'bg-[#F5EBD8] text-[#7A4B14] border-[#945D1D]/35 hover:border-[#945D1D]',
    dotColor: 'bg-[#945D1D]',
    cardBorder: 'border-[#945D1D]/55 border-t-[10px] border-t-[#945D1D]',
    badgeBg: 'bg-[#945D1D] text-white',
    valueBg: 'bg-[#F5EBD8] text-[#7A4B14] border-[#945D1D]/35',
    titleText: 'text-[#945D1D]',
    boxBg: 'bg-[#F8F0E0] border-r-[8px] border-[#945D1D]',
    arrowHover: 'hover:bg-[#945D1D] text-[#7A4B14] border-[#945D1D]/35',
    closingText: 'text-[#945D1D]',
  },
  {
    // 7. בחירה והתפתחות אישית — כחול אינדיגו רגוע
    pillActive: 'bg-[#3C4F7A] text-white border-[#3C4F7A]',
    pillInactive: 'bg-[#E6EAF4] text-[#2F3F63] border-[#3C4F7A]/35 hover:border-[#3C4F7A]',
    dotColor: 'bg-[#3C4F7A]',
    cardBorder: 'border-[#3C4F7A]/55 border-t-[10px] border-t-[#3C4F7A]',
    badgeBg: 'bg-[#3C4F7A] text-white',
    valueBg: 'bg-[#E6EAF4] text-[#2F3F63] border-[#3C4F7A]/35',
    titleText: 'text-[#3C4F7A]',
    boxBg: 'bg-[#ECEFF7] border-r-[8px] border-[#3C4F7A]',
    arrowHover: 'hover:bg-[#3C4F7A] text-[#2F3F63] border-[#3C4F7A]/35',
    closingText: 'text-[#3C4F7A]',
  },
];

export const MidlifeTopicsPool: React.FC = () => {
  const topics = MIDLIFE_TOPIC_POOL;
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextTopic = () => setActiveIdx((prev) => (prev + 1) % topics.length);
  const prevTopic = () => setActiveIdx((prev) => (prev === 0 ? topics.length - 1 : prev - 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 45) nextTopic();
    if (diff < -45) prevTopic();
    setTouchStart(null);
  };

  const currentTopic = topics[activeIdx];
  const theme = TOPIC_THEMES[activeIdx % TOPIC_THEMES.length];

  return (
    <section
      id="sessions"
      className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 bg-white border-b border-[#C56B3E]/15 px-4 sm:px-6 relative overflow-hidden text-right scroll-mt-20"
      dir="rtl"
    >
      <ButterflyIcon
        size={260}
        className="absolute top-0 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] -z-10 hidden md:block"
      />
      <ButterflyIcon
        size={220}
        className="absolute bottom-0 -left-10 animate-float opacity-[0.03] text-[#2D5043] -z-10 hidden md:block"
      />

      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-7 sm:mb-9 space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C56B3E] tracking-tight">
            על מה נדבר?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-medium text-[#2D5043] max-w-3xl mx-auto leading-relaxed">
            מניפת הנושאים שלנו כוללת שבעה תחומים. בכל סדנה בת שישה מפגשים נבחר שישה מתוכם, נושא אחר לכל מפגש, בשילוב כלים מעולם ה-NLP ובהתאם לצרכים ולתחומי העניין של הקבוצה.
          </p>
          <p className="text-sm sm:text-base font-black text-[#93542B] max-w-xl mx-auto">
            גללי לצדדים, לחצי על נושא או השתמשי בחצים לקריאת הפירוט המלא.
          </p>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full opacity-80"></div>
        </div>

        {/* 7 Topic Selector Pills - Distinct Color per Topic */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div
            className="flex sm:flex-wrap items-center sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {topics.map((topic, idx) => {
              const isActive = idx === activeIdx;
              const pillTheme = TOPIC_THEMES[idx % TOPIC_THEMES.length];
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`flex-none inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer border-2 whitespace-nowrap ${
                    isActive
                      ? `${pillTheme.pillActive} shadow-lg scale-[1.03]`
                      : pillTheme.pillInactive
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isActive ? 'bg-white' : pillTheme.dotColor
                    }`}
                  />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Topic Detail Card (Distinct Theme per Topic) */}
        {currentTopic && (
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
              className={`bg-white rounded-3xl sm:rounded-[2.8rem] p-5 sm:p-8 md:p-10 border-2 ${theme.cardBorder} shadow-2xl relative select-none transition-colors duration-300`}
            >
              {/* Top Bar Inside Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200/80">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs sm:text-sm font-black px-3.5 py-1.5 rounded-full transition-colors ${theme.badgeBg}`}>
                    נושא מתוך המאגר
                  </span>
                  {currentTopic.value && (
                    <span className={`text-xs sm:text-sm font-black px-3 py-1.5 rounded-full border transition-colors ${theme.valueBg}`}>
                      ערך מוביל: {currentTopic.value}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevTopic}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:text-white border shadow-2xs flex items-center justify-center transition-all cursor-pointer ${theme.arrowHover}`}
                    title="לנושא הקודם"
                    aria-label="לנושא הקודם"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextTopic}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:text-white border shadow-2xs flex items-center justify-center transition-all cursor-pointer ${theme.arrowHover}`}
                    title="לנושא הבא"
                    aria-label="לנושא הבא"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Topic Title & Description */}
              <div className="space-y-5 text-right">
                <div>
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug transition-colors ${theme.titleText}`}>
                    {currentTopic.title}
                  </h3>
                  {currentTopic.subtitle && (
                    <p className="text-base sm:text-xl font-bold text-[#2D5043] mt-1.5">
                      {currentTopic.subtitle}
                    </p>
                  )}
                </div>

                {currentTopic.description ? (
                  <div className={`p-5 sm:p-6 rounded-2xl text-slate-800 text-base sm:text-lg leading-relaxed font-normal shadow-xs transition-colors ${theme.boxBg}`}>
                    {currentTopic.description}
                  </div>
                ) : (
                  (currentTopic.introParagraphs || currentTopic.bullets) && (
                    <div className={`p-5 sm:p-6 rounded-2xl text-slate-800 text-base sm:text-lg leading-relaxed font-normal shadow-xs space-y-3 transition-colors ${theme.boxBg}`}>
                      {currentTopic.introParagraphs?.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                      {currentTopic.bulletsTitle && (
                        <div className="bg-white/95 rounded-2xl p-4 space-y-2 border border-slate-200/80">
                          <p className={`font-bold ${theme.titleText}`}>{currentTopic.bulletsTitle}</p>
                          <ul className="space-y-1.5 pr-4 list-disc">
                            {currentTopic.bullets?.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {currentTopic.closingParagraphs?.map((para, cIdx) => (
                        <p
                          key={cIdx}
                          className={
                            cIdx === (currentTopic.closingParagraphs?.length || 0) - 1
                              ? `font-black ${theme.closingText}`
                              : ''
                          }
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>

              {/* Mobile Swipe Hint */}
              <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-slate-500 font-bold mt-5 pt-3 border-t border-slate-100">
                <ChevronRight className={`w-3.5 h-3.5 ${theme.titleText}`} />
                <span>החליקי או לחצי על כותרת למעבר בין הנושאים</span>
                <ChevronLeft className={`w-3.5 h-3.5 ${theme.titleText}`} />
              </div>

              {/* Dots Indicator */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {topics.map((topic, dotIdx) => {
                  const dotTheme = TOPIC_THEMES[dotIdx % TOPIC_THEMES.length];
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setActiveIdx(dotIdx)}
                      aria-label={topic.title}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        activeIdx === dotIdx
                          ? `w-8 ${dotTheme.dotColor}`
                          : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
