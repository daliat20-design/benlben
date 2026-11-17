
import React, { useState } from 'react';
import { MARKETING_CONTACTS } from '../constants';
import { ButterflyIcon } from './ButterflyIcon';
import { WhatsAppContactModal } from './mwm/WhatsAppContactModal';

export { ButterflyIcon };

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative pt-8 sm:pt-14 md:pt-16 pb-12 sm:pb-20 md:pb-24 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#FFF9F4] via-[#FFF4EB] to-[#FDEDE0]">
      {/* Background Decor Butterfly - positioned safely away from text, hidden on mobile */}
      <ButterflyIcon size={260} className="absolute -bottom-16 -left-20 opacity-[0.04] text-[#C56B3E] animate-float hidden lg:block pointer-events-none -z-10" />

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

            <div className="space-y-1">
              <div className="text-sm sm:text-base font-black text-[#2D5043] tracking-tight">
                סדנת הדגל של בין לבין • נשים בגילאי <span dir="ltr" className="inline-block font-sans text-[#93542B]">45-60</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#C56B3E] leading-[1.08] tracking-tighter drop-shadow-xs">
                סדנת אמצע החיים
              </h1>
            </div>
          </div>

          {/* Dates & Hours Badge */}
          <div className="inline-flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white/95 rounded-2xl sm:rounded-full border-2 border-[#C56B3E]/40 shadow-sm mb-6 sm:mb-8 text-right">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C56B3E] text-white text-xs sm:text-sm font-black">
              <span>✦ המחזור הקרוב</span>
            </span>
            <span className="text-sm sm:text-base md:text-lg font-black text-[#2D5043]">
              ימי רביעי: <span dir="ltr">6.1.27</span> עד <span dir="ltr">10.2.27</span>
            </span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-sm sm:text-base md:text-lg font-black text-[#C56B3E]" dir="ltr">
              19:00 - 22:00
            </span>
          </div>

          {/* Section 1 Narrative: אמצע החיים. מי הכין אותנו לזה? */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-3xl border border-[#C56B3E]/25 shadow-[0_12px_40px_rgba(197,107,62,0.08)] text-right max-w-2xl mx-auto md:mx-0 mb-8 space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C56B3E] tracking-tight leading-snug">
              אמצע החיים. מי הכין אותנו לזה?
            </h2>

            <div className="space-y-4 text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
              <p>
                פעם, לפני שהתקשרת לחברה בשלוש בלילה, היית צריכה סיבה ממש טובה.
              </p>
              <p>
                היום מספיק לראות שהיא מחוברת.
              </p>

              {/* Late-night chat dialogue */}
              <div className="my-4 p-4 sm:p-5 rounded-2xl bg-[#FFF4EB]/80 border-r-4 border-[#C56B3E] space-y-2.5 text-[#2D5043] font-bold">
                <p>&quot;גם את ערה?&quot;</p>
                <p>&quot;כן. כבר הספקתי לעשות בראש סדר בארונות, לשקול להחליף עבודה ולהיזכר שאין חלב.&quot;</p>
              </div>

              <p>
                בבוקר, כמובן, את כבר לא ממש זוכרת בשביל מה פתחת את המקרר.
              </p>

              <p className="font-black text-[#2D5043] pt-2 border-t border-[#C56B3E]/15">
                יש משהו מפתיע באמצע החיים.
              </p>

              <p>
                אנחנו מגיעות עם כל כך הרבה ניסיון, ידע ותובנות שצברנו בדרך. ובכל זאת, דווקא עכשיו מתעוררות לא מעט שאלות חדשות.
              </p>

              <p>
                חלקן קשורות לגוף ולשינויים שלא תמיד הכינו אותנו אליהם. אחרות קשורות לזוגיות, למשפחה, למערכות היחסים ולמה שאנחנו רוצות מעצמנו ומהחיים.
              </p>

              <p>
                ואנחנו, כמו נשים שיודעות להסתדר, מתחילות לחפש תשובות.
              </p>

              <p>
                גוגל, צ&apos;ט, פודקאסטים, שיחות עם חברות. לפעמים גם שואלות &quot;בשביל חברה&quot;.
              </p>

              <p className="font-bold text-[#93542B] pt-1">
                רק שהתשובות לא תמיד מתחברות, ולפעמים כל תשובה מביאה איתה עוד שלוש שאלות.
              </p>
            </div>
          </div>

          <div className="w-28 sm:w-32 h-2 sm:h-2.5 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mb-8 sm:mb-10 mx-auto md:mr-0 rounded-full shadow-inner"></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-[#C56B3E] to-[#B85D19] text-white hover:from-[#B85D19] hover:to-[#93542B] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-black shadow-[0_12px_30px_rgba(197,107,62,0.35)] hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 border-b-4 border-[#93542B] cursor-pointer"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>דברי איתנו</span>
            </button>
          </div>
        </div>

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

      <WhatsAppContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contacts={MARKETING_CONTACTS}
        title='לשיחה עם מובילות "בין לבין"'
        subtitle="דלית ואלסי כאן לכל שאלה, התייעצות והתאמה אישית:"
        footerNote='צוות "בין לבין" • סדנאות וריטרטים אמצע החיים'
      />
    </section>
  );
};
