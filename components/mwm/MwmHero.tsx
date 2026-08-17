import React from 'react';
import { ButterflyIcon } from '../ButterflyIcon';

export const MwmHero: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 px-6 overflow-hidden bg-brand-cream">
      {/* Background Decor Butterflies */}
      <ButterflyIcon size={220} className="absolute -top-10 -left-20 opacity-10 animate-float hidden md:block" />
      <ButterflyIcon size={140} className="absolute top-1/4 right-0 opacity-10 animate-drift hidden md:block" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center md:text-right">
          
          {/* Badge: אמהות עם מהות כוכב יאיר צור יגאל מזמינות אתכן - צבעי כתום, צהוב, אדום */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
            <div className="inline-block bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 text-white px-6 py-2.5 rounded-full text-sm md:text-base font-black tracking-wide shadow-lg border-b-4 border-red-700/40">
              אמהות עם מהות כוכב יאיר צור יגאל מזמינות אתכן
            </div>
            <div className="inline-block bg-brand-orange/15 text-brand-orange border border-brand-orange/30 px-6 py-2.5 rounded-full text-sm font-black tracking-widest shadow-lg">
              קהל יעד: נשים בגילאי 45-65
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-brand-green leading-none mb-3 tracking-tighter drop-shadow-sm">
            בין לבין
          </h1>
          <p className="text-2xl md:text-4xl font-extrabold text-brand-orange mb-6">
            תוכנית לנשים באמצע החיים
          </p>

          {/* Logo Position */}
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-2xl p-2 border-4 border-brand-beige flex items-center justify-center overflow-hidden animate-float relative bg-transparent">
              <img 
                src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                alt="לוגו בין לבין" 
                className="w-full h-full object-cover rounded-full"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          {/* Main Card Content */}
          <div className="text-lg md:text-xl text-gray-700 max-w-2xl leading-relaxed mb-8 space-y-4 text-right bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/50 shadow-sm">
            <p className="font-bold text-xl md:text-2xl text-brand-green">
              תקופת אמצע החיים היא תקופה מעניינת ומאתגרת גם יחד.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 font-semibold border-y border-brand-beige/60 py-3 my-2">
              <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> הגוף משתנה</div>
              <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> הילדים צריכים אותנו אחרת</div>
              <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> ההורים מתבגרים</div>
              <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> הזוגיות משתנה</div>
              <div className="col-span-1 md:col-span-2 flex items-center gap-2"><span className="text-brand-orange">✦</span> גם בעבודה ובקריירה מתחילות לעלות תהיות</div>
            </div>

            <p className="text-brand-green font-bold">
              בתוך כל זה עולה לפעמים השאלה:
            </p>
            <p className="text-2xl md:text-3xl font-black text-brand-orange italic">
              ומה איתי בתוך כל זה?
            </p>
            <p>
              לכל אחת מאיתנו יש סיפור שנכתב במשך שנים.
            </p>
            <p>
              פרקים של משפחה, קריירה, זוגיות, נתינה, הצלחות, התמודדויות ואינספור בחירות שעיצבו אותנו.
            </p>
            <p className="font-bold text-brand-green border-t border-brand-green/10 pt-3">
              אנחנו מאמינות, שבכל אישה באמצע החיים יש פרק שעדיין לא נכתב
            </p>
            <p className="italic text-gray-600">
              לא מפני שחסר בה משהו. <br />
              <span className="font-black text-brand-orange not-italic text-xl">אלא כי יש בה עוד</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-brand-orange font-bold text-lg border-t border-brand-orange/10 pt-4 mt-4">
              <div>✦ עוד כוחות</div>
              <div>✦ עוד אומץ</div>
              <div>✦ עוד חלומות</div>
              <div>✦ עוד יכולות</div>
              <div className="col-span-2">✦ עוד השפעה</div>
            </div>
            <p className="font-bold text-brand-green border-t border-brand-green/10 pt-4 mt-4">
              אישה באמצע החיים לא צריכה לגלות את עצמה מחדש.
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-brand-orange tracking-tight leading-tight mt-3">
              לפעמים היא פשוט צריכה לגלות מה עוד יש בה
            </p>
          </div>
          
          <div className="w-32 h-2 bg-brand-orange mx-auto md:mr-0 rounded-full shadow-inner"></div>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative z-10 p-6 bg-white shadow-[0_50px_100px_-20px_rgba(84,99,79,0.3)] rounded-[3rem] transform rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden">
            <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-inner">
              <img 
                src="https://i.postimg.cc/9Q701MnD/f3194e77-4e89-4b03-a176-0e2ebcb3745e-(1).jpg" 
                alt="בין לבין - תוכנית לנשים באמצע החיים" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
