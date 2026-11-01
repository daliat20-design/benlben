import React from 'react';
import { ButterflyIcon } from './Hero';

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
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-[#FFF9F4] via-white to-[#FFF4EB] px-4 sm:px-6 relative overflow-hidden">
      <ButterflyIcon size={200} className="absolute -top-10 -right-10 opacity-[0.03] text-[#C56B3E] animate-drift pointer-events-none select-none hidden md:block -z-10" />
      <ButterflyIcon size={150} className="absolute -bottom-10 -left-10 opacity-[0.03] text-[#2D5043] animate-float pointer-events-none select-none hidden md:block -z-10" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-14 md:mb-20 px-4">
          <div className="inline-block px-6 py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-4 tracking-tight border border-[#C56B3E]/30">
            המלצות
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 text-[#C56B3E] tracking-tight text-center">
            ממליצות עלינו באהבה
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full opacity-80"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-[#C56B3E] border-x border-b border-[#C56B3E]/10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[240px]"
            >
              <ButterflyIcon size={40} className="absolute -top-2 -right-2 opacity-15 text-[#C56B3E] animate-float" />
              <div className="mb-4">
                <svg className="w-8 h-8 text-[#C56B3E]/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                </svg>
              </div>
              <p className="text-xl text-gray-800 leading-relaxed font-medium italic text-right mb-6">
                "{item.text}"
              </p>
              <div className="mt-auto pt-4 text-left border-t border-[#C56B3E]/20">
                <span className="text-[#2D5043] font-black text-base">{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
