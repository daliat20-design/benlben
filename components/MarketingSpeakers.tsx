import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingSpeakers: React.FC = () => {
  return (
    <section id="program-speakers" className="py-24 bg-white relative px-4 md:px-6 overflow-hidden">
      {/* Decorative background butterflies (hidden on mobile to prevent overlaps) */}
      <ButterflyIcon size={350} className="absolute -top-20 -left-20 animate-drift opacity-[0.03] -z-10 hidden md:block" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block px-5 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-xs md:text-sm font-black mb-4 tracking-tight border border-brand-orange/20">
            מעטפת של ידע ורגישות
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-green tracking-tight mb-4">על המרצות בתוכנית</h2>
          <div className="h-1.5 w-24 bg-brand-orange rounded-full"></div>
        </div>

        {/* Highlight content box */}
        <div className="bg-gradient-to-br from-brand-cream to-white p-8 md:p-14 rounded-[3rem] border border-brand-beige shadow-xl relative overflow-hidden">
          {/* Subtle watermark butterfly inside card */}
          <ButterflyIcon size={200} className="absolute bottom-[-50px] right-[-50px] opacity-[0.04] text-brand-green hidden md:block pointer-events-none" />

          <p className="text-xl md:text-3xl text-gray-800 leading-relaxed font-black text-right mb-8">
            צוות המרצות של “בין לבין” נבחר בקפידה בהתאם לאופי הקבוצה, למטרות התוכנית ולנושאים המרכזיים של כל מחזור.
          </p>
          
          <p className="text-lg md:text-2xl text-gray-600 leading-relaxed font-medium text-right mb-10">
            המטרה היא ליצור שילוב מדויק בין ידע מקצועי, שפה נגישה, רגישות אנושית וכלים מעשיים.
          </p>

        </div>


      </div>
    </section>
  );
};
