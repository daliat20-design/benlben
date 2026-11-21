
import React from 'react';
import { ButterflyIcon } from './Hero';
import { ImageGallery } from './ImageGallery';

export const AboutSection: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative px-4 sm:px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10 hidden md:block" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10 hidden md:block" />
      <ButterflyIcon size={80} className="absolute top-1/2 left-1/4 animate-float opacity-10 -z-10 hidden md:block" />

      <div className="max-w-5xl mx-auto relative">
        <div className="pb-8 sm:pb-12 md:pb-14 flex flex-col items-center relative">
          <ButterflyIcon size={50} className="absolute top-16 right-10 md:right-40 animate-drift opacity-40 text-[#C56B3E] hidden md:block -z-10" />
          <ButterflyIcon size={60} className="absolute bottom-4 left-10 md:left-40 animate-float opacity-30 text-[#2D5043] hidden md:block -z-10" />

          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#C56B3E] text-center tracking-tight">
              טעימה מהסדנאות
            </h2>
            <div className="h-1.5 sm:h-2 w-20 sm:w-24 bg-[#C56B3E] mt-3 sm:mt-4 rounded-full"></div>
          </div>

          <div className="w-full max-w-4xl bg-[#FFF4EB] rounded-3xl sm:rounded-[3rem] p-3 sm:p-4 shadow-2xl overflow-hidden border-2 border-[#C56B3E]/30">
            <ImageGallery />
          </div>
        </div>

        <div id="about" className="mt-6 md:mt-10 scroll-mt-24">
          <div className="flex flex-col items-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#C56B3E] text-center tracking-tight">על הסדנה</h2>
            <div className="h-1.5 sm:h-2 w-20 sm:w-24 bg-[#C56B3E] mt-4 sm:mt-6 rounded-full"></div>
          </div>

          <div className="grid gap-6 sm:gap-8 max-w-4xl mx-auto text-right">

            {/* טבלת מועדים מעוצבת וברורה */}
            <div id="meeting-dates" className="mt-4 sm:mt-12 bg-[#FFF9F4] p-5 sm:p-6 md:p-10 rounded-3xl sm:rounded-[3rem] border border-[#C56B3E]/20 text-center">
              <h3 className="text-xl md:text-2xl font-black text-[#2D5043] mb-5 sm:mb-6">
                מתכונת המפגשים:
              </h3>
              
              {hideDates ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 flex-wrap">
                   <div className="w-full sm:w-auto bg-[#C56B3E] text-white px-6 sm:px-8 py-2.5 sm:py-2 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-md">
                     ימי רביעי (6.1.27 עד 10.2.27)
                   </div>
                   <div className="w-full sm:w-auto bg-[#2D5043] text-white px-6 sm:px-8 py-2.5 sm:py-2 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-md" dir="ltr">
                     19:00 - 22:00
                   </div>
                   <div className="w-full sm:w-auto bg-white text-[#93542B] px-6 sm:px-8 py-2.5 sm:py-2 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-sm border border-[#C56B3E]/30">
                     6 מפגשים (3 בכל חלק)
                   </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4">
                   <div className="w-full sm:w-auto bg-[#C56B3E] text-white px-6 sm:px-8 py-2.5 sm:py-2 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-md">
                     ימי רביעי: 6.1.27 - 10.2.27
                   </div>
                   <div className="w-full sm:w-auto bg-[#2D5043] text-white px-6 sm:px-8 py-2.5 sm:py-2 rounded-full font-bold text-base sm:text-lg md:text-xl shadow-md" dir="ltr">
                     19:00 - 22:00
                   </div>
                </div>
              )}

              {!hideDates ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto mt-6 sm:mt-8">
                    <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border-2 border-[#2D5043]/20 text-center">
                      <h4 className="text-[#2D5043] font-black text-xl mb-2">חלק א׳ – החלק הראשון</h4>
                      <p className="text-gray-700 font-bold text-base md:text-lg">3 מפגשים מעולמות ההתכנסות, הגוף, הבית והבחירה</p>
                    </div>
                    <div className="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border-2 border-[#C56B3E]/20 text-center">
                      <h4 className="text-[#C56B3E] font-black text-xl mb-2">חלק ב׳ – החלק השני</h4>
                      <p className="text-gray-700 font-bold text-base md:text-lg">3 מפגשים מעולמות הזהות, הקריירה, הזוגיות והמשמעות</p>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-gray-700 font-medium mt-6 max-w-2xl mx-auto">
                    ניתן להירשם לחלק הראשון, לחלק השני או לתוכנית כולה. התכנים והמרצות נבחרים בכל מחזור מתוך מניפת התכנים ונבחרת מרצות הבית שלנו, בהתאמה לאופי הקבוצה.
                  </p>
                </>
              ) : (
                <div className="text-base sm:text-lg md:text-xl text-gray-700 font-bold mt-5 sm:mt-6 leading-relaxed max-w-2xl mx-auto space-y-3.5 sm:space-y-4">
                  <p className="text-[#C56B3E] font-black">
                    ניתן להירשם לחלק הראשון, לחלק השני או לתוכנית כולה.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 sm:mt-8 flex flex-col items-center gap-6 sm:gap-8">
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-[#C56B3E] text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-lg border-b-4 border-[#93542B]">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-lg sm:text-2xl font-black tracking-tight">יוגש כיבוד קל</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
