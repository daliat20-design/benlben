import React from 'react';
import { ButterflyIcon } from './Hero';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';
import { Check, MessageCircle } from 'lucide-react';

interface PricingSectionProps {
  hidePrices?: boolean;
  onSelectPackage?: (packageName: string) => void;
  includedTitle?: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPackage,
  includedTitle = 'אז מה את מקבלת ?',
}) => {
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
    <section
      id="pricing"
      className="py-12 sm:py-16 md:py-20 bg-white border-b border-[#C56B3E]/15 px-4 sm:px-6 relative overflow-hidden text-right"
      dir="rtl"
    >
      {/* Background Decor - Subtle Brand Butterflies */}
      <ButterflyIcon
        size={260}
        className="absolute -top-20 -right-20 animate-drift opacity-[0.03] text-[#C56B3E] hidden md:block pointer-events-none -z-10"
      />
      <ButterflyIcon
        size={200}
        className="absolute bottom-10 -left-10 animate-float opacity-[0.03] text-[#2D5043] hidden md:block pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <div className="inline-block bg-[#C56B3E] text-white px-4 py-1 rounded-full font-black text-xs sm:text-sm mb-3 shadow-xs">
            השקעה בעצמך
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-[#C56B3E] tracking-tight">
            בחרי את המסלול שמתאים לך
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full"></div>
          <p className="mt-5 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-bold text-[#2D5043] bg-[#F3EAD8] px-5 py-3 rounded-2xl border-2 border-[#2D5043]/25 leading-relaxed">
            המפגשים בסדנה מחולקים לשני חלקים (3 מפגשים בכל חלק). ניתן להירשם לסדנה המלאה (מומלץ!!) או לבחור להירשם לאחד משני החלקים.
          </p>
        </div>

        {/* 3 Visually Distinct Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-10 sm:mb-12">
          {/* מסלול 1: שלושה בתור התחלה (זהוב-ארד חמים עשיר) */}
          <div className="bg-[#F6E9D2] p-5 sm:p-6 rounded-3xl border-2 border-[#B9803B]/70 border-t-[8px] border-t-[#B9803B] flex flex-col hover:border-[#B9803B] transition-all shadow-md relative">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-black text-[#8C5A2B] bg-[#F3E6D0] px-3 py-1 rounded-full border border-[#B9803B]/30">
                מסלול 1 • טעימה
              </span>
              <span className="shrink-0 bg-white text-[#8C5A2B] text-xs font-black px-3 py-1 rounded-full border border-[#B9803B]/30">
                3 מפגשים לבחירה
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#73451B] tracking-tight mb-3">
              שלושה בתור התחלה
            </h3>

            <div className="mb-4 pb-4 border-b border-[#B9803B]/20 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#8C5A2B]">₪510</span>
                <span className="text-[#73451B]/80 font-bold text-xs sm:text-sm">למשתתפת</span>
              </div>
              <span className="text-xs sm:text-sm font-black text-white bg-[#B9803B] px-3 py-1 rounded-full">
                170 ₪ למפגש
              </span>
            </div>

            <div className="space-y-2.5 text-gray-700 text-sm sm:text-base leading-relaxed mb-5 flex-1">
              <p>
                מתחילה בשלושה מפגשים, מכירה את החוויה ומחליטה מה מתאים לך.{' '}
                <strong className="font-bold text-[#73451B]">חלק א&apos; או חלק ב&apos;, לבחירתך.</strong>
              </p>
              <p className="text-xs sm:text-sm text-gray-700 bg-white/95 p-3 rounded-xl border-r-4 border-[#B9803B] leading-relaxed shadow-2xs">
                <strong className="font-black text-[#8C5A2B] block mb-0.5">
                  נרשמת לחלק א&apos; ורוצה להמשיך?
                </strong>
                תוכלי להצטרף גם לחלק ב&apos; בתוספת של <strong>390 ₪</strong> בלבד (באותו מחזור בלבד, בכפוף למקום פנוי).
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect('שלושה בתור התחלה (3 מפגשים לבחירה)')}
              className="mt-auto w-full py-3 px-4 rounded-xl bg-[#9E682B] hover:bg-[#7D4F1E] text-white font-black text-sm sm:text-base transition-all text-center cursor-pointer shadow-sm"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>

          {/* מסלול 2 (מומלץ): באות יחד (שמנת חמה נקייה עם מסגרת והדגשות טרה-קוטה) */}
          <div className="mt-3 lg:mt-0 bg-[#FFFCF5] p-5 sm:p-6 rounded-3xl border-2 border-[#C56B3E] border-t-[8px] border-t-[#C56B3E] shadow-[0_18px_42px_rgba(197,107,62,0.22)] flex flex-col relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C56B3E] text-white font-black text-xs px-4 py-1 rounded-full shadow-md whitespace-nowrap">
              המחיר המשתלם ביותר
            </div>

            <div className="flex items-center justify-between gap-2 mb-3 pt-2">
              <span className="text-xs font-black text-white bg-[#C56B3E] px-3 py-1 rounded-full">
                מסלול 2 • יחד עם חברה
              </span>
              <span className="shrink-0 bg-white text-[#93542B] text-xs font-black px-3 py-1 rounded-full border border-[#C56B3E]/35">
                6 מפגשים לכל אחת
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#C56B3E] tracking-tight mb-3">
              באות יחד
            </h3>

            <div className="mb-4 pb-4 border-b border-[#C56B3E]/25 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#C56B3E]">₪810</span>
                <span className="text-[#93542B] font-bold text-xs sm:text-sm">למשתתפת</span>
              </div>
              <span className="text-xs sm:text-sm font-black bg-[#C56B3E] text-white px-3 py-1 rounded-full">
                135 ₪ למפגש
              </span>
            </div>

            <div className="space-y-2.5 text-gray-800 text-sm sm:text-base leading-relaxed mb-5 flex-1">
              <p className="font-bold">
                נרשמות יחד לכל ששת המפגשים ונהנות מהחוויה המלאה
              </p>
              <p className="text-xs sm:text-sm text-[#93542B] bg-white/95 p-3 rounded-xl border-r-4 border-[#C56B3E] font-medium shadow-2xs">
                המחיר מותנה בהרשמה משותפת של שתי משתתפות.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect('באות יחד (6 מפגשים - הרשמה משותפת)')}
              className="mt-auto w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C56B3E] to-[#B85D19] hover:from-[#B85D19] hover:to-[#93542B] text-white font-black text-sm sm:text-base transition-all shadow-md hover:shadow-lg cursor-pointer text-center"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>

          {/* מסלול 3: החוויה המלאה (ירוק מרווה עמוק ועשיר) */}
          <div className="bg-gradient-to-b from-[#CFE5D9] to-[#E2EFE8] p-5 sm:p-6 rounded-3xl border-2 border-[#2D5043]/75 border-t-[8px] border-t-[#2D5043] flex flex-col hover:border-[#2D5043] transition-all shadow-md relative">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-black text-white bg-[#2D5043] px-3 py-1 rounded-full">
                מסלול 3 • הסדנה המלאה
              </span>
              <span className="shrink-0 bg-white text-[#2D5043] text-xs font-black px-3 py-1 rounded-full border border-[#2D5043]/30">
                כל 6 המפגשים
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#2D5043] tracking-tight mb-3">
              החוויה המלאה
            </h3>

            <div className="mb-4 pb-4 border-b border-[#2D5043]/20 flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-black text-[#2D5043]">₪900</span>
                <span className="text-[#3A5A40] font-bold text-xs sm:text-sm">למשתתפת</span>
              </div>
              <span className="text-xs sm:text-sm font-black bg-[#2D5043] text-white px-3 py-1 rounded-full">
                150 ₪ למפגש
              </span>
            </div>

            <div className="space-y-2.5 text-gray-700 text-sm sm:text-base leading-relaxed mb-5 flex-1">
              <p>בוחרת מראש בחוויה השלמה, מהמפגש הראשון ועד האחרון.</p>
              <p className="text-xs sm:text-sm font-bold text-[#2D5043] bg-white/95 p-3 rounded-xl border-r-4 border-[#2D5043] shadow-2xs">
                כולל חלק א&apos; וחלק ב&apos; של התוכנית.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSelect('החוויה המלאה - כל ששת המפגשים (6 מפגשים)')}
              className="mt-auto w-full py-3 px-4 rounded-xl bg-[#2D5043] hover:bg-[#1E362C] text-white font-black text-sm sm:text-base transition-all text-center cursor-pointer shadow-sm"
            >
              לשריון מקומך וקבלת פרטים נוספים
            </button>
          </div>
        </div>

        {/* Concise Clean List: מה עוד את מקבלת */}
        <div className="bg-[#DCECE3] rounded-3xl p-5 sm:p-8 border-2 border-[#2D5043]/30 shadow-sm mb-8 sm:mb-10 max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#C56B3E] tracking-tight">
              {includedTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-right text-sm sm:text-base text-gray-800">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#C56B3E] stroke-[3] shrink-0 mt-1" />
              <p className="leading-relaxed">
                <strong className="font-black text-[#2D5043]">תוכן מקצועי ואיכותי:</strong> מפגשים מעמיקים בני 3 שעות, עם הרצאות בהובלת נשות מקצוע מומחיות בתחומן.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#C56B3E] stroke-[3] shrink-0 mt-1" />
              <p className="leading-relaxed">
                <strong className="font-black text-[#2D5043]">הנחיה וליווי אישי וקבוצתי:</strong> בהובלת מנחות התוכנית, לאורך המפגשים.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#C56B3E] stroke-[3] shrink-0 mt-1" />
              <p className="leading-relaxed">
                <strong className="font-black text-[#2D5043]">הרבה מעבר להרצאות:</strong> התנסויות מעשיות, חומרי תוכן וערכות חווייתיות שנבחרו במיוחד לכל מפגש.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#C56B3E] stroke-[3] shrink-0 mt-1" />
              <p className="leading-relaxed">
                <strong className="font-black text-[#2D5043]">חיבור גם בין המפגשים:</strong> קבוצת וואטסאפ ייעודית לשיתוף, העשרה והמשך הקשר.
              </p>
            </div>

            <div className="flex items-start gap-2.5 md:col-span-2">
              <Check className="w-4 h-4 text-[#C56B3E] stroke-[3] shrink-0 mt-1" />
              <p className="leading-relaxed">
                <strong className="font-black text-[#2D5043]">חוויה מוקפדת:</strong> אירוח, כיבוד קל, אווירה נעימה והזדמנות להכיר נשים חדשות.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Contact Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center">
          <p className="text-[#2D5043] font-black text-base sm:text-lg">
            רוצה להתייעץ איתנו או לבדוק התאמה?
          </p>
          <a
            href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#2D5043] border-2 border-[#2D5043]/30 px-6 py-2.5 rounded-full text-sm sm:text-base font-black hover:bg-[#C56B3E] hover:text-white hover:border-transparent transition-all shadow-xs flex items-center gap-2.5 cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors" />
            <span>דברי איתנו ישירות בוואטסאפ</span>
          </a>
        </div>
      </div>
    </section>
  );
};
