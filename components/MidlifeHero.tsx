import React from 'react';
import { ExternalLink, ArrowDown } from 'lucide-react';
import { ButterflyIcon } from './Hero';

export const MidlifeHero: React.FC = () => {
  const scrollToNextContent = () => {
    const target =
      document.getElementById('about') ||
      document.getElementById('gallery-section') ||
      document.getElementById('sessions');
    if (target) {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-18 md:pb-22 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#F5EBD6] via-[#EFE0C3] to-[#E7D3AE] border-b-2 border-[#2D5043]/20"
      dir="rtl"
    >
      {/* Background Decor Butterfly - kept subtle on desktop */}
      <ButterflyIcon
        size={260}
        className="absolute -bottom-16 -left-20 opacity-[0.04] text-[#C56B3E] animate-float hidden lg:block pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10 md:gap-14 relative z-10">
        <div className="flex-1 text-center md:text-right w-full">
          {/* Logo + Main Title Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5 sm:gap-6 mb-5 sm:mb-7">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-[0_12px_40px_rgba(197,107,62,0.2)] p-2 border-4 border-[#C56B3E]/30 flex items-center justify-center overflow-hidden animate-float relative bg-white shrink-0">
              <img
                src="/logos/midlife.webp"
                alt="לוגו סדנת אמצע החיים"
                className="w-full h-full object-contain rounded-full"
                loading="eager"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/logos/midlife.png') {
                    target.src = '/logos/midlife.png';
                  } else {
                    target.src = '/logos/brand-main.webp';
                  }
                }}
              />
            </div>

            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#C56B3E] leading-[1.06] tracking-tighter drop-shadow-xs">
                אמצע החיים
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D5043] tracking-tight">
                סדנה לנשים בגיל המעבר
              </h2>
              <div className="text-sm sm:text-base md:text-lg font-black text-[#93542B] tracking-tight pt-0.5">
                נשים בגילאי{' '}
                <span dir="ltr" className="inline-block font-sans">
                  45–60
                </span>
              </div>
            </div>
          </div>

          {/* Blinking Winter Cycle Tab - Links down to details */}
          <div className="mb-6 sm:mb-8 flex justify-center md:justify-start">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('important-info');
                if (el) {
                  const yOffset = -80;
                  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#FFF4EB] border-2 border-[#C56B3E] text-[#C56B3E] shadow-md animate-notice-blink cursor-pointer hover:bg-[#FFE6D1]/70 transition-colors"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C56B3E] animate-ping shrink-0" />
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight">
                מחזור חורף בקרוב • פרטים מטה
              </span>
            </button>
          </div>

          {/* Opening Narrative: Updated Question-First Editorial Flow + UCL Research + Workshop Intro */}
          <div className="max-w-2xl mx-auto md:mx-0 mb-8 space-y-6 text-right">
            {/* 1. Opening Question & Editorial Context */}
            <div className="space-y-4 px-1.5 sm:px-2">
              <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-black text-[#2D5043] leading-snug">
                תגידי, היית אומרת שאת יודעת מספיק על גיל המעבר?
              </h3>
              <div className="space-y-4 text-lg sm:text-xl text-gray-800 leading-[1.8] font-normal">
                <p>
                  הרי היום כבר מדברים על גיל המעבר הרבה יותר. יש כתבות, פודקאסטים ואינסוף מידע ברשת.
                </p>
                <p>
                  אבל גם כשיש כל כך הרבה מידע, לא תמיד ברור מה ממנו קשור אלייך. האם השינוי בשינה, במצב הרוח, בריכוז? מה כדאי לבדוק? מה אפשר לעשות אחרת? והאם בכלל את כבר שם?
                </p>
              </div>
            </div>

            {/* 2. 22% Research Spotlight & 91.9% Transition Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C56B3E]/40 shadow-[0_18px_45px_rgba(45,80,67,0.12)] space-y-5 text-center">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#2D5043] leading-relaxed">
                מחקר בהובלת חוקרים מאוניברסיטת UCL בלונדון, שפורסם בשנת <span dir="ltr">2025</span>, מצא ש...
              </p>

              <div className="flex flex-col items-center gap-3">
                <div className="inline-block bg-[#F3E8D2] px-7 py-3.5 rounded-2xl border-2 border-[#B9803B]/50 shadow-2xs">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#C56B3E] tracking-tight leading-none">
                    רק כ־<span dir="ltr" className="inline-block">22%</span>
                  </span>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#2D5043] leading-snug max-w-xl mx-auto">
                  מהמשתתפות במחקר הרגישו שיש להן ידע טוב על גיל המעבר.{' '}
                  <strong className="font-black text-[#C56B3E]">מפתיע, נכון?</strong>
                </p>
              </div>

              <div className="pt-4 border-t border-[#C56B3E]/20 space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl font-black text-[#2D5043] leading-relaxed">
                  באותו מחקר,{' '}
                  <span className="text-2xl sm:text-3xl font-black text-[#C56B3E] mx-0.5" dir="ltr">
                    91.9%
                  </span>{' '}
                  מהמשתתפות חשבו שיש צורך בתוכנית שמשלבת ידע ותמיכה סביב גיל המעבר.
                </p>

                <div className="text-center">
                  <p className="inline-block bg-[#C56B3E] px-6 py-2.5 rounded-2xl border-b-4 border-[#93542B] text-xl sm:text-2xl font-black text-white leading-snug shadow-sm">
                    אז אנחנו יצרנו אחת כזאת!
                  </p>
                </div>
              </div>
            </div>

            {/* 3. ״אמצע החיים״ של בין לבין Intro Card + Research Source Link */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#2D5043]/30 shadow-md space-y-3.5 text-right">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#2D5043]">
                ״אמצע החיים״ של בין לבין
              </h3>
              <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-normal">
                סדנה בת 6 מפגשים לנשים סביב גיל המעבר, שמשלבת{' '}
                <strong className="font-black text-[#C56B3E]">ידע מקצועי</strong>,{' '}
                <strong className="font-black text-[#C56B3E]">כלים מעשיים</strong> ו
                <strong className="font-black text-[#C56B3E]">מרחב נשי</strong>{' '}
                לשיחה פתוחה, לשיתוף ולהקשבה.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                מקום להבין טוב יותר את השינויים, לקבל תשובות מנשות מקצוע, לשמוע נשים שנמצאות בתקופה דומה ולגלות אפשרויות שאולי עוד לא חשבת עליהן.
              </p>
              <div className="pt-2">
                <a
                  href="https://www.ucl.ac.uk/news/2025/oct/call-nationwide-menopause-education-programme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2D5043]/85 hover:text-[#C56B3E] underline underline-offset-4 transition-colors"
                >
                  <span>לקריאת המחקר באתר אוניברסיטת UCL</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Primary CTA Button - Scrolls down to continue reading */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              type="button"
              onClick={scrollToNextContent}
              className="w-full sm:w-auto bg-gradient-to-r from-[#C56B3E] to-[#B85D19] text-white hover:from-[#B85D19] hover:to-[#93542B] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black shadow-[0_12px_30px_rgba(197,107,62,0.35)] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2.5 border-b-4 border-[#93542B] cursor-pointer"
            >
              <span>מעניין אותי לשמוע עוד</span>
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preserved Large Group Photo */}
        <div className="flex-1 relative w-full max-w-lg md:max-w-none mx-auto md:sticky md:top-28">
          <div className="relative z-10 p-2.5 sm:p-5 md:p-6 bg-white shadow-[0_20px_50px_-10px_rgba(197,107,62,0.2)] md:shadow-[0_50px_100px_-20px_rgba(197,107,62,0.25)] rounded-3xl sm:rounded-[3rem] transform md:rotate-3 md:hover:rotate-0 transition-transform duration-700 overflow-hidden border-2 border-[#C56B3E]/20">
            <div className="overflow-hidden rounded-2xl sm:rounded-[2rem] aspect-[4/3] shadow-inner">
              <img
                src="https://i.postimg.cc/LsC6W6cG/Chat-GPT-Image-Sep-9-2026-09-44-51-AM.png"
                alt="אמצע החיים - סדנאת הדגל של בין לבין"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
