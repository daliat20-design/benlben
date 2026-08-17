
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingProgramStructure: React.FC = () => {
  return (
    <section id="program-highlights" className="pt-10 md:pt-24 pb-24 px-6 bg-white relative overflow-hidden text-right">
      <ButterflyIcon size={400} className="absolute -bottom-40 -left-40 opacity-[0.03] animate-float" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black text-brand-green mb-6 tracking-tighter">ידע, שיח ותהליך</h2>
          <div className="h-2 w-48 bg-brand-orange mx-auto rounded-full mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium mb-6">
            יש היום שפע של ידע על גיל המעבר, מכל כיוון ובכל פורמט. <br />
             אבל ידע לבד לא תמיד מספיק.
          </p>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
            התוכנית “בין לבין” מחברת בין תחומי החיים השונים שנפגשים בשלב הזה, ומביאה אותם לתוך תהליך אחד שלם. 
            זה לא רק מה לומדים, אלא איך עוברים את זה יחד. בכל מפגש נפתח נושא אחר, ונוצר מרחב שבו הידע פוגש שיח, השיתוף פוגש הקשבה, והחוויה האישית מקבלת מקום אמיתי.
          </p>
        </div>

        <div className="bg-brand-beige/20 p-8 md:p-16 rounded-[4rem] mb-20 text-right">
          <h3 className="text-3xl md:text-5xl font-black text-brand-green mb-8">עיקרי התוכנית</h3>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            סדרת המפגשים משלבת הרצאות מקצועיות, מעגלי שיח וכלים להתבוננות אישית, ויוצרת מרחב שמחבר בין ידע לחוויה. 
            בכל מפגש נעסוק בנושא רלוונטי לעולם התוכן של גיל המעבר, נחבר אותו לערכים מלווים ונאפשר מקום ללמידה, שיחה וחיבור אישי. 
            <br /><br />
            <span className="text-brand-orange font-bold">בין הנושאים:</span> בריאות ותסמינים, תזונה ואורח חיים, זוגיות וקשרים, זהות והגשמה, והורות משתנה והקן המתרוקן.
          </p>
        </div>
      </div>
    </section>
  );
};
