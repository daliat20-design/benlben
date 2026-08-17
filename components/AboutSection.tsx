
import React from 'react';
import { ButterflyIcon } from './Hero';
import { MEETING_HOURS } from '../constants';
import { ImageGallery } from './ImageGallery';

export const AboutSection: React.FC<{ hideDates?: boolean }> = ({ hideDates }) => {
  return (
    <section id="about" className="py-24 bg-white relative px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10" />
      <ButterflyIcon size={80} className="absolute top-1/2 left-1/4 animate-float opacity-10 -z-10" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-brand-green leading-tight tracking-tighter">הפרק שעדיין לא נכתב</h2>
          <div className="h-2.5 w-40 bg-brand-orange mx-auto rounded-full mb-12 shadow-md" />
          
          <div className="grid gap-12 text-right max-w-4xl mx-auto">
            <div className="bg-brand-beige/30 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-beige shadow-sm hover:shadow-md transition-shadow relative">
              <ButterflyIcon size={35} className="absolute -top-4 -left-4 animate-float opacity-60 -z-10" />
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-bold">
                אמצע החיים מביא איתו לא מעט שינויים.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-brand-green font-medium text-lg md:text-xl border-t border-brand-beige/40 pt-4">
                <div className="flex items-center gap-2"><span className="text-brand-orange text-lg">✦</span> הגוף משתנה.</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange text-lg">✦</span> הילדים גדלים ועוזבים את הקן.</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange text-lg">✦</span> ההורים מתבגרים.</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange text-lg">✦</span> התפקידים שליוו אותנו במשך שנים מקבלים צורה חדשה.</div>
              </div>
            </div>
            
            <div className="relative my-8 group">
              <div className="absolute -inset-6 bg-brand-orange/10 rounded-[4rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500 -z-10"></div>
              <div className="relative bg-gradient-to-br from-brand-orange/20 to-brand-beige p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border-r-[12px] md:border-r-[16px] border-brand-green text-brand-green shadow-xl">
                <p className="text-2xl md:text-4xl font-black italic text-center">
                  בתוך כל אלה נפתח מרחב חדש
                </p>
                <ButterflyIcon size={60} className="absolute -bottom-8 -right-8 animate-float opacity-90 -z-10" />
              </div>
            </div>
            
            <div className="py-10 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-tr from-brand-green to-brand-lightGreen rounded-[3rem] p-3 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://i.postimg.cc/WpysKVr6/17.jpg" 
                  alt="בין לבין - הפרק שעדיין לא נכתב" 
                  className="w-full h-auto rounded-[2.5rem] shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-brand-green text-center tracking-tight">הרבה יותר מתוכנית על גיל המעבר</h2>
            <div className="h-2 w-24 bg-brand-orange mt-6 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16 space-y-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              ידע על גיל המעבר אפשר למצוא היום כמעט בכל מקום.
            </p>
            <p className="text-xl md:text-2xl text-brand-green font-bold leading-relaxed">
              אנחנו מאמינות שידע לבדו לא תמיד מספיק.
            </p>
            <div className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium bg-brand-beige/20 p-8 rounded-[2.5rem] border border-brand-beige/50 text-right space-y-4">
              <p>
                נשים באמצע החיים זקוקות ליותר ממידע. הן זקוקות למרחב בטוח שבו אפשר לעצור, לשאול, לשתף, לקבל כלים, לפגוש נשים שנמצאות בשלב דומה בחיים ולגלות כוחות שאולי חיכו זמן רב לרגע הנכון.
              </p>
              <p className="text-brand-orange font-black text-2xl border-t border-brand-orange/10 pt-4 mt-4">
                מתוך האמונה הזו נולדה "בין לבין".
              </p>
            </div>
            <p className="text-xl md:text-2xl text-brand-green font-black italic leading-relaxed bg-brand-green/5 p-6 rounded-[2rem] border-x-4 border-brand-green shadow-inner">
              זו תוכנית לצמיחה באמצע החיים. מעטפת מקצועית המשלבת ידע עדכני, שיח נשי, התבוננות אישית וכלים מעשיים.
            </p>
            <p className="text-2xl md:text-3xl text-brand-orange font-black mt-6">
              אנחנו יוצרות מרחב שמאפשר לכל אישה לכתוב את הפרק הבא שלה מתוך בחירה, בהירות ואומץ.
            </p>
          </div>

          <div className="pb-8 md:pb-12 flex justify-center relative">
             <ButterflyIcon size={50} className="absolute top-16 right-10 md:right-40 animate-drift opacity-60 hidden md:block -z-10" />
             <ButterflyIcon size={60} className="absolute bottom-4 left-10 md:left-40 animate-float opacity-50 hidden md:block -z-10" />
            <div className="w-full max-w-2xl bg-brand-orange/20 rounded-[3.5rem] p-3 shadow-2xl overflow-hidden border-2 border-brand-orange/30">
              <ImageGallery />
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-brand-green text-center tracking-tight">על התוכנית</h2>
            <div className="h-2 w-24 bg-brand-orange mt-6 rounded-full"></div>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto text-right">

            {/* טבלת מועדים מעוצבת וברורה - מענה לבקשת המשתמש */}
            <div id="meeting-dates" className="mt-12 bg-brand-beige/20 p-6 md:p-10 rounded-[3rem] border border-brand-beige text-center">
              <h3 className="text-xl md:text-2xl font-black text-brand-green mb-6">
                מתכונת המפגשים:
              </h3>
              
              {hideDates ? (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                   <div className="bg-brand-orange text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md">
                     פעם בשבוע
                   </div>
                   <div className="bg-brand-green text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md">
                     3 שעות מפגש
                   </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                   <div className="bg-brand-orange text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md" dir="ltr">
                     {MEETING_HOURS}
                   </div>
                   <div className="bg-brand-green text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span>א.ת כפר סבא (רח' התע״ש)</span>
                   </div>
                </div>
              )}

              {!hideDates ? (
                <>
                  <div className="flex flex-col gap-8 max-w-2xl mx-auto mt-8">
                    {/* Part A */}
                    <div className="space-y-4">
                      <h4 className="text-brand-green font-black text-xl border-b-2 border-brand-green/20 pb-2 inline-block px-4">חלק א'</h4>
                      <div className="grid grid-cols-4 gap-2 md:gap-4 text-brand-green font-bold text-base md:text-xl">
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-green transition-colors">25.2</div>
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-green transition-colors">4.3</div>
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-green transition-colors">11.3</div>
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-green transition-colors">18.3</div>
                      </div>
                    </div>

                    {/* Separator / Passover */}
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-brand-orange/30"></div></div>
                      <div className="relative flex justify-center">
                        <span className="bg-brand-orange/10 text-brand-orange px-6 py-1.5 rounded-full text-sm md:text-base font-black italic border border-brand-orange/20 shadow-sm">פגרת פסח</span>
                      </div>
                    </div>

                    {/* Part B */}
                    <div className="space-y-4">
                      <h4 className="text-brand-orange font-black text-xl border-b-2 border-brand-orange/20 pb-2 inline-block px-4">חלק ב'</h4>
                      <div className="grid grid-cols-4 gap-2 md:gap-4 text-brand-green font-bold text-base md:text-xl">
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-orange transition-colors">15.4</div>
                        <div className="bg-red-50 py-3 rounded-2xl shadow-sm border border-red-200 text-red-600 ring-2 ring-red-100 hover:bg-red-100 transition-colors">19.4*</div>
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-orange transition-colors">29.4</div>
                        <div className="bg-white py-3 rounded-2xl shadow-sm border border-brand-beige hover:border-brand-orange transition-colors">6.5</div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-500 mt-8 italic opacity-80">* המפגש השישי יתקיים ביום ראשון</p>
                </>
              ) : (
                <div className="text-lg md:text-xl text-gray-600 font-bold mt-6 leading-relaxed max-w-2xl mx-auto space-y-4">
                  <p>
                    התוכנית בנויה מ-8 מפגשים חווייתיים: 4 מפגשים של חלק א' ו-4 מפגשים של חלק ב'.
                  </p>
                  <p className="text-brand-orange font-black">
                    ניתן להירשם גם לאחד משני החלקים בנפרד, למרות שמומלץ להירשם לתוכנית המקיפה והכוללת.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col items-center gap-8">
              <div className="inline-flex items-center gap-4 bg-brand-green text-white px-10 py-4 rounded-full shadow-lg border-b-4 border-brand-green/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-2xl font-black tracking-tight">יוגש כיבוד קל</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
