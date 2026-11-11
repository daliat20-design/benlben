import React, { useState } from 'react';
import { ButterflyIcon } from './Hero';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';
import { CheckCircle2, MessageCircle } from 'lucide-react';

interface PricingSectionProps {
  hidePrices?: boolean;
  onSelectPackage?: (packageName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ hidePrices, onSelectPackage }) => {

  const handleSelect = (pkgName: string) => {
    if (onSelectPackage) {
      onSelectPackage(pkgName);
    }
    const el = document.getElementById('interest') || document.getElementById('interest-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-white via-[#FFF9F4] to-[#FFF4EB] px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      {/* Background Decor - Brand Butterflies */}
      <ButterflyIcon size={320} className="absolute -top-20 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] hidden md:block pointer-events-none -z-10" />
      <ButterflyIcon size={240} className="absolute bottom-10 -left-10 animate-float opacity-[0.03] text-[#2D5043] hidden md:block pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20 px-2 sm:px-4">
          <div className="inline-block bg-[#C56B3E]/10 text-[#C56B3E] border border-[#C56B3E]/30 px-5 sm:px-6 py-1.5 sm:py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-wider mb-4 shadow-xs">
            השקעה בעצמך
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 text-[#C56B3E] tracking-tight">
            בחרי את המסלול שמתאים לך
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full"></div>
        </div>

        {/* 3 Pricing Cards Grid - Center Card is "באות יחד" (המחיר המשתלם ביותר) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-6 items-stretch mb-12 sm:mb-16">
          
          {/* חבילה 1: שלושה בתור התחלה */}
          <div className="bg-white p-6 sm:p-8 md:p-9 rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] shadow-lg border-2 border-[#C56B3E]/20 flex flex-col hover:border-[#C56B3E]/50 transition-all duration-300 relative group">
            <div className="mb-6">
              <span className="inline-block bg-[#FFF4EB] text-[#93542B] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 border border-[#C56B3E]/20">
                3 מפגשים לבחירה
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#2D5043] tracking-tight">
                שלושה בתור התחלה
              </h3>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-5 sm:p-6 bg-[#FFF4EB] rounded-2xl border border-[#C56B3E]/20 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-[#C56B3E]">₪510</span>
                <span className="text-gray-700 font-bold text-sm sm:text-base">למשתתפת</span>
              </div>
              <div className="inline-block bg-white text-[#C56B3E] border border-[#C56B3E]/30 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black mt-2 shadow-2xs">
                170 ₪ למפגש
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 text-gray-700 font-medium text-sm md:text-base leading-relaxed mb-5">
              <p>
                מתחילה בשלושה מפגשים, מכירה את החוויה ומחליטה מה מתאים לך.
              </p>
              <p className="font-bold text-[#2D5043]">
                חלק א&apos; או חלק ב&apos;, לבחירתך.
              </p>
            </div>

            {/* Continuation Offer Callout */}
            <div className="mb-7 p-4 rounded-2xl bg-[#FFF4EB]/80 border-r-4 border-[#C56B3E] text-xs sm:text-sm space-y-1">
              <p className="font-black text-[#93542B]">
                נרשמת לחלק א&apos; ורוצה להמשיך?
              </p>
              <p className="text-gray-800 font-bold">
                תוכלי להצטרף גם לחלק ב&apos; בתוספת של 390 ₪ בלבד.
              </p>
              <p className="text-gray-600 text-xs">
                ההמשך אפשרי באותו מחזור בלבד, בכפוף למקום פנוי.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect("שלושה בתור התחלה (3 מפגשים לבחירה)")}
              className="mt-auto w-full py-4 px-5 rounded-2xl bg-[#FFF9F4] hover:bg-[#C56B3E] hover:text-white text-[#C56B3E] font-black text-base border-2 border-[#C56B3E]/40 transition-all text-center cursor-pointer shadow-xs"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>

          {/* חבילה 2 (במרכז - מובלטת): באות יחד */}
          <div className="mt-5 lg:mt-0 bg-white p-6 sm:p-8 md:p-10 rounded-3xl sm:rounded-[2.8rem] md:rounded-[3.2rem] shadow-[0_20px_50px_rgba(197,107,62,0.18)] border-4 border-[#C56B3E] lg:scale-105 z-20 flex flex-col relative group transition-all duration-300 hover:border-[#B85D19]">
            {/* Top ribbon badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-[#C56B3E] via-[#B85D19] to-[#93542B] text-white font-black text-xs sm:text-sm md:text-base px-6 sm:px-8 py-2 rounded-full shadow-lg border-2 border-white tracking-wider whitespace-nowrap">
              המחיר המשתלם ביותר
            </div>

            <div className="mb-6 pt-2">
              <span className="inline-block bg-[#FFF4EB] text-[#93542B] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 border border-[#C56B3E]/30">
                6 מפגשים לכל אחת
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#C56B3E] tracking-tight">
                באות יחד
              </h3>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-6 sm:p-7 bg-gradient-to-b from-[#FFF4EB] to-[#FDEDE0] rounded-3xl border-2 border-[#C56B3E]/30 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-[#C56B3E] tracking-tight">
                  ₪810
                </span>
                <span className="text-[#93542B] font-black text-base md:text-lg">למשתתפת</span>
              </div>
              <div className="inline-block bg-[#C56B3E] text-white px-5 py-1.5 rounded-full text-sm sm:text-base font-black shadow-sm">
                135 ₪ למפגש
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-gray-800 font-bold text-base md:text-lg leading-relaxed mb-8">
              <p>
                נרשמות יחד לכל ששת המפגשים ונהנות מהחוויה המלאה
              </p>
              <p className="text-sm md:text-base text-[#93542B] bg-[#FFF4EB] p-3.5 rounded-2xl border border-[#C56B3E]/20">
                המחיר מותנה בהרשמה משותפת של שתי משתתפות.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect('באות יחד (6 מפגשים - הרשמה משותפת)')}
              className="mt-auto w-full py-4.5 px-6 rounded-full bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white font-black text-base sm:text-lg transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>

          {/* חבילה 3: החוויה המלאה */}
          <div className="bg-white p-6 sm:p-8 md:p-9 rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] shadow-lg border-2 border-[#2D5043]/30 flex flex-col hover:border-[#2D5043] transition-all duration-300 relative group">
            <div className="mb-6">
              <span className="inline-block bg-[#2D5043]/10 text-[#2D5043] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 border border-[#2D5043]/30">
                כל 6 המפגשים
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#2D5043] tracking-tight">
                החוויה המלאה
              </h3>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-5 sm:p-6 bg-[#2D5043]/5 rounded-2xl border-2 border-[#2D5043]/20 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-[#2D5043] tracking-tight">₪900</span>
                <span className="text-[#3A5A40] font-black text-sm sm:text-base">למשתתפת</span>
              </div>
              <div className="inline-block bg-[#2D5043] text-white px-4 py-1 rounded-full text-xs sm:text-sm font-black mt-2 shadow-2xs">
                150 ₪ למפגש
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-gray-700 font-medium text-sm md:text-base leading-relaxed mb-8">
              <p>
                בוחרת מראש בחוויה השלמה, מהמפגש הראשון ועד האחרון.
              </p>
              <p className="font-bold text-[#2D5043]">
                כולל חלק א&apos; וחלק ב&apos; של התוכנית.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect('החוויה המלאה - כל ששת המפגשים (6 מפגשים)')}
              className="mt-auto w-full py-4 px-5 rounded-2xl bg-[#2D5043] hover:bg-[#1E362C] text-white font-black text-base transition-all text-center cursor-pointer shadow-md hover:shadow-lg"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>

        </div>

        {/* Unified Section: אז מה את מקבלת ? */}
        <div className="bg-white rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] p-5 sm:p-10 md:p-12 border-2 border-[#C56B3E]/25 shadow-lg mb-10 sm:mb-14 max-w-5xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 space-y-2.5">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#C56B3E] tracking-tight">
              אז מה את מקבלת ?
            </h3>
            <div className="h-1 w-20 bg-[#C56B3E] mx-auto !mt-3 rounded-full opacity-70"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-right">
            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
              <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                <strong className="font-black text-[#2D5043]">תוכן מקצועי ואיכותי:</strong> מפגשים מעמיקים בני 3 שעות, עם הרצאות בהובלת נשות מקצוע מומחיות בתחומן.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
              <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                <strong className="font-black text-[#2D5043]">הנחיה וליווי אישי וקבוצתי:</strong> בהובלת מנחות התוכנית, לאורך המפגשים.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
              <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                <strong className="font-black text-[#2D5043]">הרבה מעבר להרצאות:</strong> התנסויות מעשיות, חומרי תוכן וערכות חווייתיות שנבחרו במיוחד לכל מפגש.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15">
              <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                <strong className="font-black text-[#2D5043]">חיבור גם בין המפגשים:</strong> קבוצת וואטסאפ ייעודית לשיתוף, העשרה והמשך הקשר.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FFF9F4] border border-[#C56B3E]/15 md:col-span-2">
              <CheckCircle2 className="w-6 h-6 text-[#C56B3E] shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                <strong className="font-black text-[#2D5043]">חוויה מוקפדת:</strong> אירוח, כיבוד קל, אווירה נעימה והזדמנות להכיר נשים חדשות.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Contact Bar */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-[#2D5043] font-black text-lg md:text-2xl">
            רוצה להתייעץ איתנו או לבדוק התאמה?
          </p>
          <a 
            href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#2D5043] border-2 border-[#2D5043]/30 px-8 py-3.5 rounded-full text-base md:text-lg font-black hover:bg-[#C56B3E] hover:text-white hover:border-transparent transition-all shadow-md flex items-center gap-3 cursor-pointer group"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
            <span>דברי איתנו ישירות בוואטסאפ</span>
          </a>
        </div>

      </div>
    </section>
  );
};
