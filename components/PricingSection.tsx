import React, { useState } from 'react';
import { ButterflyIcon } from './Hero';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';
import { Sparkles, Users, CheckCircle2, HeartHandshake, ArrowLeft, MessageCircle } from 'lucide-react';

export const PricingSection: React.FC<{ hidePrices?: boolean }> = ({ hidePrices }) => {
  // State for partial track selection tab: Part A or Part B
  const [selectedPart, setSelectedPart] = useState<'part1' | 'part2'>('part1');

  const scrollToInterestForm = () => {
    const el = document.getElementById('interest-form') || document.getElementById('interest');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6] px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      {/* Background Decor - Brand Butterflies */}
      <ButterflyIcon size={320} className="absolute -top-20 -right-20 animate-drift opacity-5 hidden md:block pointer-events-none -z-10" />
      <ButterflyIcon size={240} className="absolute bottom-10 -left-10 animate-float opacity-5 hidden md:block pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 px-4">
          <div className="inline-block bg-brand-orange/10 text-brand-orange border border-brand-orange/30 px-6 py-2 rounded-full font-black text-xs md:text-sm uppercase tracking-wider mb-4 shadow-xs">
            השקעה בעצמך
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 text-brand-green tracking-tight">
            מסלולי השתתפות ועלויות
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-bold max-w-2xl mx-auto leading-relaxed">
            בחרי את המסלול המתאים לך ביותר להצטרפות לסדנת אמצע החיים
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-6 items-stretch mb-16">
          
          {/* Card 1 (Right): 4 מפגשים לבחירה - בכרטיס פשוט יותר */}
          <div className="bg-white p-7 sm:p-9 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-lg border-2 border-brand-beige flex flex-col hover:border-brand-green/40 transition-all duration-300 relative group order-3 lg:order-1">
            <div className="mb-6">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-black px-4 py-1.5 rounded-full mb-3 border border-gray-200">
                4 מפגשים לבחירה
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-green mb-2 tracking-tight">
                בוחרת חלק מהתוכנית
              </h3>
              <p className="text-gray-600 font-medium text-sm md:text-base">
                חלק ראשון או חלק שני לבחירתך
              </p>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-5 sm:p-6 bg-brand-beige/30 rounded-2xl border border-brand-beige text-center">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-brand-green">₪680</span>
                <span className="text-gray-600 font-bold text-sm sm:text-base">למשתתפת</span>
              </div>
              <div className="inline-block bg-white text-brand-orange border border-brand-orange/30 px-3.5 py-1 rounded-full text-xs sm:text-sm font-black mt-2 shadow-2xs">
                170 ₪ למפגש
              </div>
            </div>

            {/* In-card choice between Part 1 and Part 2 (הבחירה בין החלק הראשון לשני בתוך אותו כרטיס) */}
            <div className="mb-6 bg-brand-cream p-4 rounded-2xl border border-brand-beige/80">
              <p className="text-xs font-black text-brand-green mb-2.5">
                הבחירה בתוך הכרטיס (חלק ראשון או שני):
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedPart('part1')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPart === 'part1'
                      ? 'bg-brand-green text-white border-brand-green shadow-xs'
                      : 'bg-white text-gray-700 border-brand-beige hover:border-brand-green/40'
                  }`}
                >
                  <span className="block font-black">חלק א'</span>
                  <span className="block text-[11px] opacity-90">התכנסות וחקירה</span>
                  <span className="block text-[10px] mt-0.5 opacity-80">(מפגשים 1–4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPart('part2')}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedPart === 'part2'
                      ? 'bg-brand-orange text-white border-brand-orange shadow-xs'
                      : 'bg-white text-gray-700 border-brand-beige hover:border-brand-orange/40'
                  }`}
                >
                  <span className="block font-black">חלק ב'</span>
                  <span className="block text-[11px] opacity-90">צמיחה ומשמעות</span>
                  <span className="block text-[10px] mt-0.5 opacity-80">(מפגשים 5–8)</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-500 text-center mt-2 font-medium">
                {selectedPart === 'part1' ? 'נבחר: חלק ראשון - התמקדות בתסמינים, גוף, משפחה וקבלת החלטות' : 'נבחר: חלק שני - התמקדות בדימוי גוף, קריירה, אינטימיות והודיה'}
              </p>
            </div>

            {/* What's included bullets */}
            <ul className="space-y-3 mb-8 text-sm md:text-base text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>4 מפגשים מעמיקים של 3 שעות כל אחד</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>הרצאות מומחיות וליווי אישי מנחה</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span>אירוח, כיבוד מפנק ודפי עבודה</span>
              </li>
            </ul>

            <button
              onClick={scrollToInterestForm}
              className="mt-auto w-full py-3.5 px-6 rounded-2xl bg-brand-cream hover:bg-brand-green hover:text-white text-brand-green font-black text-base border-2 border-brand-green/30 transition-all text-center cursor-pointer shadow-xs"
            >
              השאירי פרטים לחלק הנבחר
            </button>
          </div>

          {/* Card 2 (Center): המסלול המלא - במרכז, בכרטיס הגדול והבולט ביותר */}
          <div className="bg-white p-8 sm:p-10 md:p-12 rounded-[2.8rem] md:rounded-[3.5rem] shadow-2xl border-4 border-brand-orange/40 lg:scale-105 z-20 flex flex-col relative group transition-all duration-300 hover:border-brand-orange order-1 lg:order-2">
            {/* Top verbal badge: ״הבחירה שלנו״ */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-brand-orange to-amber-600 text-white font-black text-sm sm:text-base px-8 py-2 rounded-full shadow-lg border-2 border-white tracking-wider whitespace-nowrap">
              הבחירה שלנו
            </div>

            <div className="mb-6 pt-2">
              <span className="inline-block bg-brand-orange/15 text-brand-orange text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 border border-brand-orange/30">
                התוכנית המלאה: 8 מפגשים
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-green mb-2 tracking-tight">
                כל שמונת המפגשים
              </h3>
              <p className="text-gray-600 font-bold text-base md:text-lg">
                המסלול השלם של סדנת הדגל
              </p>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-6 sm:p-7 bg-brand-green/5 rounded-3xl border-2 border-brand-green/15 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl md:text-7xl font-black text-brand-green tracking-tight">
                  ₪1,200
                </span>
                <span className="text-brand-lightGreen font-black text-lg md:text-xl">למשתתפת</span>
              </div>
              <div className="inline-block bg-brand-orange text-white px-5 py-1.5 rounded-full text-base sm:text-lg font-black shadow-sm">
                150 ₪ למפגש
              </div>
              <p className="text-xs text-gray-500 font-bold mt-2">עבור כל 8 המפגשים בתוכנית</p>
            </div>

            {/* What's included bullets */}
            <ul className="space-y-3.5 mb-8 text-base md:text-lg text-gray-800 font-bold">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                <span>כל 8 המפגשים (24 שעות תוכן וחוויה מעצימה)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                <span>כל המרצות המומחיות מהשורה הראשונה</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                <span>ליווי מקצועי ואישי צמוד של מובילות התוכנית</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                <span>קבוצת ווטסאפ מלווה, כיבוד עשיר ומפנק וכלים לחיים</span>
              </li>
            </ul>

            <button
              onClick={scrollToInterestForm}
              className="mt-auto w-full py-4.5 px-8 rounded-full bg-gradient-to-r from-brand-orange to-amber-600 hover:from-brand-green hover:to-[#43523e] text-white font-black text-lg sm:text-xl transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              הבטיחי את מקומך בתוכנית המלאה
            </button>
          </div>

          {/* Card 3 (Left): המסלול עם חברה - ״באות יחד״ */}
          <div className="bg-white p-7 sm:p-9 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl border-2 border-emerald-300 hover:border-emerald-500 flex flex-col transition-all duration-300 relative group order-2 lg:order-3">
            {/* Verbal marker: ״המחיר המשתלם ביותר״ */}
            <div className="mb-4">
              <span className="inline-block bg-emerald-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full mb-3 shadow-sm tracking-wide">
                המחיר המשתלם ביותר
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-brand-green mb-2 tracking-tight">
                באות יחד
              </h3>
              <p className="text-emerald-800 font-bold text-sm sm:text-base">
                חברה מביאה חברה: 8 מפגשים לכל אחת
              </p>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-5 sm:p-6 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200 text-center">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-5xl sm:text-6xl font-black text-emerald-800">₪1,080</span>
                <span className="text-emerald-900 font-black text-base">למשתתפת</span>
              </div>
              <div className="inline-block bg-white text-emerald-800 border border-emerald-300 px-4 py-1 rounded-full text-sm font-black mt-1 shadow-2xs">
                135 ₪ למפגש
              </div>

              {/* Explicit emphasis requested: להדגיש שהמחיר הוא למשתתפת, בהרשמה משותפת */}
              <div className="mt-3 pt-3 border-t border-emerald-200/80 text-xs sm:text-sm font-black text-emerald-900 leading-snug bg-white/70 py-2 px-3 rounded-xl">
                בהרשמה משותפת של שתיים (המחיר הוא למשתתפת)
              </div>
            </div>

            {/* What's included bullets */}
            <ul className="space-y-3 mb-8 text-sm md:text-base text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>8 מפגשים מלאים לכל אחת מכן בתוכנית הדגל</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>חוויה משותפת, מחברת ומעצימה יחד</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>כל המרצות, התכנים, החומרים והאירוח המלא</span>
              </li>
            </ul>

            <button
              onClick={scrollToInterestForm}
              className="mt-auto w-full py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg text-center cursor-pointer"
            >
              הירשמו יחד במסלול המשתלם
            </button>
          </div>

        </div>

        {/* WhatsApp Contact Bar */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-brand-green font-black text-lg md:text-2xl">
            רוצה להתייעץ איתנו או לבדוק התאמה?
          </p>
          <a 
            href={`https://wa.me/${CONTACT_PHONE}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-brand-green border-2 border-brand-green/30 px-8 py-3.5 rounded-full text-base md:text-lg font-black hover:bg-brand-orange hover:text-white hover:border-transparent transition-all shadow-md flex items-center gap-3 cursor-pointer group"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
            <span>דברי איתנו ישירות בוואטסאפ</span>
          </a>
        </div>

      </div>
    </section>
  );
};
