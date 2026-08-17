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
    <section id="testimonials" className="py-24 bg-brand-cream px-6 relative overflow-hidden">
      <ButterflyIcon size={200} className="absolute -top-10 -right-10 opacity-5 animate-drift" />
      <ButterflyIcon size={150} className="absolute -bottom-10 -left-10 opacity-5 animate-float" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-black mb-4 tracking-tight border border-brand-orange/20">
            המלצות
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 text-brand-green tracking-tight text-center">
            ציפור לחשה לנו שמספרות עלינו ש...
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border-t-8 border-brand-green relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between min-h-[240px]"
            >
              <ButterflyIcon size={40} className="absolute -top-2 -right-2 opacity-10 animate-float" />
              <div className="mb-4">
                <svg className="w-8 h-8 text-brand-orange/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z" />
                </svg>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed font-medium italic text-right mb-6">
                "{item.text}"
              </p>
              <div className="mt-auto pt-4 text-left border-t border-brand-beige/40">
                <span className="text-brand-green font-black text-base">{item.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
