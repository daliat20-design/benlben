import React from 'react';
import { ButterflyIcon } from './Hero';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export const ImportantInfo: React.FC<{ hideDates?: boolean }> = () => {
  return (
    <section
      id="important-info"
      className="pt-12 sm:pt-14 pb-12 sm:pb-16 bg-[#C8DDD1] border-b-2 border-[#2D5043]/25 px-4 md:px-6 relative overflow-hidden text-right"
      dir="rtl"
    >
      <ButterflyIcon
        size={260}
        className="absolute -top-20 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] -z-10 hidden md:block"
      />
      <ButterflyIcon
        size={220}
        className="absolute -bottom-20 -left-20 animate-float opacity-[0.03] text-[#2D5043] -z-10 hidden md:block"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Heading - Concise & Clear it refers to the Upcoming Winter Cycle */}
        <div className="text-center mb-8 sm:mb-12 space-y-3">
          <div className="inline-block px-5 sm:px-6 py-1.5 bg-[#C56B3E] text-white rounded-full text-xs sm:text-sm font-black tracking-wide shadow-xs">
            פרטים טכניים • המחזור הקרוב
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C56B3E] tracking-tight">
            מועדי ופרטי המחזור הקרוב
          </h2>
          <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full shadow-xs"></div>
        </div>

        {/* Concise Unified Card with Zero Duplication */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-9 md:p-11 shadow-[0_20px_50px_rgba(45,80,67,0.16)] border-2 border-[#2D5043]/30 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Dates */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#F4EAD7] rounded-2xl border-r-[6px] border-[#C56B3E]">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#93542B] mb-0.5">
                  מחזור חורף הקרוב
                </div>
                <p className="text-base sm:text-lg md:text-xl font-black text-[#2D5043]">
                  ימי רביעי | <span dir="ltr">6.1.27</span> עד <span dir="ltr">10.2.27</span>
                </p>
              </div>
            </div>

            {/* Hours & Format */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#F4EAD7] rounded-2xl border-r-[6px] border-[#2D5043]">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#2D5043] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#2D5043]/80 mb-0.5">
                  מבנה ושעות
                </div>
                <p className="text-base sm:text-lg md:text-xl font-bold text-[#2D5043]">
                  6 מפגשים, אחת לשבוע |{' '}
                  <span dir="ltr" className="font-black text-[#C56B3E]">
                    19:00-22:00
                  </span>
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#DCECE3] rounded-2xl border-r-[6px] border-[#2D5043]">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#2D5043] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#2D5043]/80 mb-0.5">
                  למי זה מתאים?
                </div>
                <p className="text-base sm:text-lg md:text-xl font-black text-[#2D5043]">
                  נשים בגילאי <span dir="ltr">45-60</span>
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3.5 p-4 sm:p-5 bg-[#DCECE3] rounded-2xl border-r-[6px] border-[#C56B3E]">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#93542B] mb-0.5">
                  מיקום
                </div>
                <p className="text-base sm:text-lg md:text-xl font-black text-[#2D5043]">
                  אזור התעשייה כפר סבא
                </p>
                <p className="text-xs sm:text-sm text-gray-600 italic mt-1">
                  כתובת מדויקת ופרטי הגעה יישלחו למשתתפות לפני פתיחת הסדנה.
                </p>
              </div>
            </div>
          </div>

          {/* Single Bottom Note (Zero Repetition) */}
          <div className="bg-[#B85D19] p-5 sm:p-6 rounded-2xl border-b-4 border-[#93542B] text-center sm:text-right mt-2">
            <p className="text-white font-medium text-sm sm:text-base md:text-lg leading-relaxed">
              <strong className="font-black">חשוב לדעת:</strong> מספר המקומות מוגבל כדי לאפשר שיח קבוצתי אינטימי ומקרב. הרכב המרצות והדגשים עשויים להשתנות בהתאם לאופי הקבוצה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
