
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingAboutSection: React.FC = () => {
  return (
    <section id="marketing-about" className="py-16 md:py-24 bg-white relative px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10" />
      
      <div className="max-w-5xl mx-auto relative text-right">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-brand-green leading-tight tracking-tighter">בין הניסיון להתחדשות</h2>
          <div className="h-2.5 w-40 bg-brand-orange mx-auto rounded-full mb-12 shadow-md" />
          
          <div className="grid gap-12 text-right max-w-4xl mx-auto">
            <div className="bg-brand-beige/30 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-beige shadow-sm hover:shadow-md transition-shadow relative">
              <ButterflyIcon size={35} className="absolute -top-4 -left-4 animate-float opacity-60 -z-10" />
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                תוכנית ייחודית המשלבת ידע מקצועי, שיח קבוצתי וחיבור אישי. התוכנית מתייחסת לגיל המעבר כמכלול שלם ויוצרת תהליך מתמשך התורם לרווחה האישית, מחזק תחושת שייכות ומייצר השפעה חיובית על האקלים הארגוני.
              </p>
            </div>

            <div className="bg-brand-green/5 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-lightGreen shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl md:text-3xl font-black text-brand-green mb-6 leading-tight">נשים רבות בארגון נמצאות בתקופה של מעבר</h3>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                הגוף משתנה, התפקידים בבית משתנים והאנרגיות הפנימיות משנות כיוון.
                דווקא בשלב הזה, יש חשיבות ליצירת מרחב שמאפשר לעצור, לדייק, ללמוד ולהתחזק. מרחב שנותן מקום אישי ומרענן.
              </p>
            </div>

            <div className="bg-brand-orange/5 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-orange shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl md:text-3xl font-black text-brand-orange mb-6 leading-tight">הערך לארגון</h3>
              <ul className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium space-y-3">
                <li className="flex items-center gap-3 justify-end">חיזוק תחושת מחוברות ושייכות <span className="w-2 h-2 bg-brand-orange rounded-full"></span></li>
                <li className="flex items-center gap-3 justify-end">תמיכה בנשים בשלב קריטי בקריירה ובחיים <span className="w-2 h-2 bg-brand-orange rounded-full"></span></li>
                <li className="flex items-center gap-3 justify-end">הפחתת שחיקה והגברת רווחה <span className="w-2 h-2 bg-brand-orange rounded-full"></span></li>
                <li className="flex items-center gap-3 justify-end">יצירת שיח פתוח ואנושי בתוך הארגון <span className="w-2 h-2 bg-brand-orange rounded-full"></span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
