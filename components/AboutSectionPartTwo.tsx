
import React from 'react';
import { ButterflyIcon } from './Hero';
import { MEETING_HOURS } from '../constants';
import editedImage17 from '../src/assets/images/edited_image_17_1784558633881.jpg';
import { ImageGallery } from './ImageGallery';

export const AboutSectionPartTwo: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10" />
      <ButterflyIcon size={80} className="absolute top-1/2 left-1/4 animate-float opacity-10 -z-10" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-brand-green leading-tight tracking-tighter">את שואלת - למה עכשיו?</h2>
          <div className="h-2.5 w-40 bg-brand-orange mx-auto rounded-full mb-12 shadow-md" />
          
          <div className="grid gap-12 text-right max-w-4xl mx-auto">
            <div className="bg-brand-beige/30 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-beige shadow-sm hover:shadow-md transition-shadow relative">
              <ButterflyIcon size={35} className="absolute -top-4 -left-4 animate-float opacity-60 -z-10" />
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                כי הגוף מאותת על שינויים הורמונליים, פיזיים ורגשיים ואיתם מגיעות שאלות חדשות. הילדים גדלו, חלקם עזבו את הקן. ההורים מתבגרים, וזקוקים לנו יותר מתמיד
              </p>
            </div>
            
            <div className="relative my-8 group">
              <div className="absolute -inset-6 bg-brand-orange/10 rounded-[4rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500 -z-10"></div>
              <div className="relative bg-gradient-to-br from-brand-orange/20 to-brand-beige p-8 md:p-12 rounded-[3rem] md:rounded-[4rem] border-r-[12px] md:border-r-[16px] border-brand-green text-brand-green shadow-xl">
                <p className="text-2xl md:text-4xl font-black italic">
                  <strong className="text-brand-orange" style={{ fontWeight: 900 }}>ואנחנו?</strong> אנחנו נמצאות בדיוק שם – בין לבין. בין מה שהיינו כל השנים, לבין מה שאנחנו יכולות להיות
                </p>
                <ButterflyIcon size={60} className="absolute -bottom-8 -right-8 animate-float opacity-90 -z-10" />
              </div>
            </div>
            
            <div className="py-10 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-tr from-brand-green to-brand-lightGreen rounded-[3rem] p-3 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={editedImage17} 
                  alt="בין לבין - את שואלת" 
                  className="w-full h-auto rounded-[2.5rem] shadow-lg object-cover"
                />
              </div>
            </div>

            <div className="bg-brand-green/5 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-lightGreen shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                זהו שלב בחיים שבו משהו משתחרר ולעיתים מתערער. זו הזדמנות נדירה: להתבונן פנימה, לגדול, לפרוח וליצור עבור עצמנו פרק חדש, עמוק ומלהיב יותר
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-24">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-brand-green text-center tracking-tight">למידה אחרת</h2>
            <div className="h-2 w-24 bg-brand-orange mt-6 rounded-full"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-16 space-y-8">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              ידע על גיל המעבר זמין היום בכל מקום, עם זאת, ידע לבדו לא תמיד מספיק.
            </p>
            <p className="text-xl md:text-2xl text-brand-green font-bold leading-relaxed">
              "בין לבין" עוסקת בגיל המעבר ממבט רחב ומתייחסת לשינויים - בגוף, במשפחה, בקשרים, בזהות ובבחירות.
            </p>
            <p className="text-xl md:text-2xl text-brand-orange font-black italic leading-relaxed bg-brand-orange/5 p-6 rounded-[2rem] border-x-4 border-brand-orange shadow-inner">
              זו לא רק העשרה, אלא מעטפת נשית מקצועית, המאפשרת לנוע בתוך השינוי מתוך הבנה, חיבור ובהירות.
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
            <div className="bg-brand-cream p-8 md:p-10 rounded-[2.5rem] border-r-8 border-brand-orange shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                בכל מפגש נעסוק בנושא רלוונטי לגיל המעבר, נחבר אותו לערכים מלווים ולרגע של השראה מתוך המקורות - כמצפן המזמין למידה, שיחה וחיבור אישי
              </p>
            </div>

            {/* טבלת מועדים מעוצבת וברורה - מענה לבקשת המשתמש */}
            <div id="meeting-dates" className="mt-12 bg-brand-beige/20 p-6 md:p-10 rounded-[3rem] border border-brand-beige text-center">
              <h3 className="text-xl md:text-2xl font-black text-brand-green mb-6">מועדי המפגשים (ימי רביעי):</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                 <div className="bg-brand-orange text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md" dir="ltr">
                   {MEETING_HOURS}
                 </div>
                 <div className="bg-brand-green text-white px-8 py-2 rounded-full font-bold text-lg md:text-xl shadow-md flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>א.ת כפר סבא (רח' התע״ש)</span>
                 </div>
              </div>

              <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                {/* Part B Only */}
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

              <p className="text-xs md:text-sm text-gray-500 mt-8 italic opacity-80">* המפגש השני (בחלק ב') יתקיים ביום ראשון</p>
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
