
import React from 'react';
import { ButterflyIcon } from './Hero';
import { MEETING_HOURS } from '../constants';
import { ImageGallery } from './ImageGallery';

export const AboutSection: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section id="about" className="py-12 sm:py-18 md:py-24 bg-white relative px-4 sm:px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10 hidden md:block" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10 hidden md:block" />
      <ButterflyIcon size={80} className="absolute top-1/2 left-1/4 animate-float opacity-10 -z-10 hidden md:block" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-5 sm:mb-8 text-[#C56B3E] leading-tight tracking-tighter">הפרק שעדיין לא נכתב</h2>
          <div className="h-2 sm:h-2.5 w-28 sm:w-40 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full mb-8 sm:mb-12 shadow-md" />
          
          <div className="grid gap-8 sm:gap-12 text-right max-w-4xl mx-auto">
            <div className="bg-[#FFF4EB]/70 p-5 sm:p-8 md:p-10 rounded-3xl sm:rounded-[3rem] border-r-[6px] sm:border-r-[10px] border-[#C56B3E] shadow-sm hover:shadow-md transition-shadow relative">
              <ButterflyIcon size={35} className="absolute -top-4 -left-4 animate-float opacity-30 text-[#C56B3E] -z-10 hidden md:block pointer-events-none" />
              <p className="text-lg sm:text-xl md:text-2xl text-gray-800 leading-relaxed font-bold">
                אמצע החיים מביא איתו לא מעט שינויים.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-[#2D5043] font-medium text-base sm:text-lg md:text-xl border-t border-[#C56B3E]/20 pt-4">
                <div className="flex items-center gap-2"><span className="text-[#C56B3E] text-lg shrink-0">✦</span> <span>הגוף משתנה.</span></div>
                <div className="flex items-center gap-2"><span className="text-[#C56B3E] text-lg shrink-0">✦</span> <span>הילדים גדלים ועוזבים את הקן.</span></div>
                <div className="flex items-center gap-2"><span className="text-[#C56B3E] text-lg shrink-0">✦</span> <span>ההורים מתבגרים.</span></div>
                <div className="flex items-center gap-2"><span className="text-[#C56B3E] text-lg shrink-0">✦</span> <span>התפקידים שליוו אותנו במשך שנים מקבלים צורה חדשה.</span></div>
              </div>
            </div>
            
            <div className="relative my-4 sm:my-8 group">
              <div className="absolute -inset-2 sm:-inset-6 bg-[#C56B3E]/10 rounded-3xl sm:rounded-[4rem] transform rotate-1 sm:rotate-2 group-hover:rotate-0 transition-transform duration-500 -z-10"></div>
              <div className="relative bg-gradient-to-br from-[#FFF4EB] to-[#FDEDE0] p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[3rem] md:rounded-[4rem] border-r-[8px] sm:border-r-[12px] md:border-r-[16px] border-[#2D5043] text-[#2D5043] shadow-xl">
                <p className="text-xl sm:text-2xl md:text-4xl font-black italic text-center">
                  בתוך כל אלה נפתח מרחב חדש
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-800 font-medium text-center mt-3 sm:mt-4 leading-relaxed max-w-2xl mx-auto">
                  מרחב לעצור ולשאול מה נכון לי עכשיו. להבין את השינויים שאני עוברת, לקבל ידע וכלים, לפגוש נשים שנמצאות בשלב דומה ולגלות מה עוד מחכה לי בפרק הבא.
                </p>
                <ButterflyIcon size={60} className="absolute -bottom-8 -right-8 animate-float opacity-30 text-[#2D5043] -z-10 hidden md:block pointer-events-none" />
              </div>
            </div>
            
            <div className="py-4 sm:py-10 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-tr from-[#C56B3E] to-[#E28A58] rounded-3xl sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://i.postimg.cc/WpysKVr6/17.jpg" 
                  alt="בין לבין - הפרק שעדיין לא נכתב" 
                  className="w-full h-auto rounded-2xl sm:rounded-[2.5rem] shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 md:mt-24">
          <div className="flex flex-col items-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#C56B3E] text-center tracking-tight">הרבה יותר מסדנה על גיל המעבר</h2>
            <div className="h-1.5 sm:h-2 w-20 sm:w-24 bg-[#C56B3E] mt-4 sm:mt-6 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16 space-y-5 sm:space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              ידע על גיל המעבר אפשר למצוא היום כמעט בכל מקום.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-[#2D5043] font-black leading-relaxed">
              אנחנו מאמינות שידע לבדו לא תמיד מספיק.
            </p>
            <div className="text-base sm:text-xl md:text-2xl text-gray-800 leading-relaxed font-medium bg-[#FFF4EB]/50 p-5 sm:p-8 rounded-3xl sm:rounded-[2.5rem] border border-[#C56B3E]/30 text-right space-y-4">
              <p>
                נשים באמצע החיים זקוקות ליותר ממידע. הן זקוקות למרחב בטוח שבו אפשר לעצור, לשאול, לשתף, לקבל כלים, לפגוש נשים שנמצאות בשלב דומה בחיים ולגלות כוחות שאולי חיכו זמן רב לרגע הנכון.
              </p>
              <p className="text-[#C56B3E] font-black text-xl sm:text-2xl border-t border-[#C56B3E]/20 pt-4 mt-4">
                מתוך האמונה הזו נולדה "אמצע החיים", סדנת הדגל של בין לבין.
              </p>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-[#2D5043] font-black italic leading-relaxed bg-[#2D5043]/5 p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] border-x-4 border-[#2D5043] shadow-inner">
              זו סדנה לצמיחה באמצע החיים. מעטפת מקצועית המשלבת ידע עדכני, שיח נשי, התבוננות אישית וכלים מעשיים.
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#C56B3E] font-black mt-4 sm:mt-6">
              אנחנו יוצרות מרחב שמאפשר לכל אישה לכתוב את הפרק הבא שלה מתוך בחירה, בהירות ואומץ.
            </p>
          </div>

          <div className="pb-6 sm:pb-8 md:pb-12 flex justify-center relative">
             <ButterflyIcon size={50} className="absolute top-16 right-10 md:right-40 animate-drift opacity-40 text-[#C56B3E] hidden md:block -z-10" />
             <ButterflyIcon size={60} className="absolute bottom-4 left-10 md:left-40 animate-float opacity-30 text-[#2D5043] hidden md:block -z-10" />
            <div className="w-full max-w-2xl bg-[#FFF4EB] rounded-3xl sm:rounded-[3.5rem] p-2 sm:p-3 shadow-2xl overflow-hidden border-2 border-[#C56B3E]/30">
              <ImageGallery />
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-16">
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
                     ימי רביעי (6.1.26 עד 10.2.26)
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
                     ימי רביעי: 6.1.26 - 10.2.26
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
