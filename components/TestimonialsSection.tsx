import React, { useState } from 'react';
import { ButterflyIcon } from './Hero';
import { ChevronRight, ChevronLeft, Quote, Star, Heart } from 'lucide-react';

const testimonials = [
  {
    text: "לקחתי איתי את האהבה, מאור הפנים, החברויות החדשות, התכנים והידע, ובעיקר את הרצון להמשיך ולממש את היכולות שלי וליהנות מהדרך.",
    author: "ענבל ס'"
  },
  {
    text: "סדנה מושקעת, חווייתית ומוצלחת שהשאירה טעם של עוד. חברותא מעולה וצוות מדהים.",
    author: "איילת"
  },
  {
    text: "הסדנה הייתה מעשירה, מעניינת, מחברת ומלאת ידע. המרצות היו מעניינות ומחוברות לגיל ולמצב, והמנחות מקסימות.",
    author: "לימור"
  },
  {
    text: "למדתי שאני לא לבד בתהליך. פגשתי נשים מקסימות וחמות, חיכיתי בכל פעם למפגש הבא.",
    author: "ענת י'"
  },
  {
    text: "ההשקעה הורגשה בכל התחומים: המיקום, הכיבוד, הנושאים הרלוונטיים וההרצאות המצוינות.",
    author: "אנונימית"
  },
  {
    text: "תודה על האווירה המאפשרת, הנתינה האינסופית, המחשבה על הפרטים הקטנים, החיוך, החיבוק והתכנים המעניינים.",
    author: "ליטל א'"
  },
  {
    text: "התוכנית פתחה בי משהו. למדתי לסמוך, להרגיש את העוצמה הנשית ולחזק את הביטחון.",
    author: "אלונה ש'"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextTestimonial = () => setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 45) nextTestimonial();
    if (diff < -45) prevTestimonial();
    setTouchStart(null);
  };

  const currentTestimonial = testimonials[activeTestimonialIdx];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#FFF9F4] via-white to-[#FFF4EB] px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      <ButterflyIcon size={200} className="absolute -top-10 -right-10 opacity-[0.03] text-[#C56B3E] animate-drift pointer-events-none select-none hidden md:block -z-10" />
      <ButterflyIcon size={150} className="absolute -bottom-10 -left-10 opacity-[0.03] text-[#2D5043] animate-float pointer-events-none select-none hidden md:block -z-10" />

      <div className="max-w-5xl mx-auto relative">
        {/* כותרת מודגשת לפני חלון ההמלצות */}
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-5 py-1.5 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-1 border border-[#C56B3E]/30">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>המלצות • מילים מהלב</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#C56B3E] tracking-tight">
            ממליצות עלינו באהבה
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            רשמים וחוויות מהלב מתוך סדנת אמצע החיים של "בין לבין":
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto mt-3 rounded-full opacity-80"></div>
        </div>

        {/* חלון גלריה ממוקד (Focused Gallery Window) להמלצות */}
        {currentTestimonial && (
          <div className="max-w-3xl mx-auto">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'pan-y' }}
              className="bg-white rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-9 md:p-12 border-2 border-[#C56B3E]/25 shadow-xl text-right relative flex flex-col justify-between min-h-[260px] sm:min-h-[280px] select-none animate-in fade-in duration-300"
            >
              <ButterflyIcon size={46} className="absolute top-4 left-4 opacity-10 text-[#C56B3E] pointer-events-none" />

              {/* סרגל עליון בתוך החלון */}
              <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#FFF4EB] text-[#C56B3E] border border-[#C56B3E]/20">
                    המלצה {activeTestimonialIdx + 1} מתוך {testimonials.length}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* חיצי ניווט */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-[#FFF4EB] text-slate-600 hover:text-[#C56B3E] transition-colors cursor-pointer"
                    title="המלצה קודמת"
                    aria-label="המלצה קודמת"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-black text-slate-400 px-1">
                    {activeTestimonialIdx + 1}/{testimonials.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-[#FFF4EB] text-slate-600 hover:text-[#C56B3E] transition-colors cursor-pointer"
                    title="המלצה הבאה"
                    aria-label="המלצה הבאה"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* גוף הציטוט */}
              <div className="mb-6 space-y-3">
                <Quote className="w-7 h-7 text-[#C56B3E]/30 rotate-180" />
                <p className="text-lg sm:text-xl md:text-2xl text-slate-800 leading-relaxed font-medium italic">
                  "{currentTestimonial.text}"
                </p>
              </div>

              {/* פרטי הממליצה */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs sm:text-sm text-slate-400 font-bold">משתתפת בסדנה</span>
                <span className="text-base sm:text-xl font-black text-[#2D5043]">
                  {currentTestimonial.author}
                </span>
              </div>

              {/* רמז החלקה למובייל */}
              <div className="flex sm:hidden items-center justify-center gap-2 text-xs text-slate-400 font-bold mt-4 pt-3 border-t border-slate-100">
                <ChevronRight className="w-3.5 h-3.5 text-[#C56B3E]" />
                <span>החליקי ימינה או שמאלה למעבר בין ההמלצות</span>
                <ChevronLeft className="w-3.5 h-3.5 text-[#C56B3E]" />
              </div>

              {/* מחוון נקודות ניווט */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {testimonials.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setActiveTestimonialIdx(dotIdx)}
                    aria-label={`עבור להמלצה ${dotIdx + 1}`}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonialIdx === dotIdx ? 'w-8 bg-[#C56B3E]' : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
