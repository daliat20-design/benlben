
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingSpeakersSection: React.FC = () => {
  return (
    <section id="marketing-speakers" className="py-24 bg-white relative px-6 overflow-hidden">
      <ButterflyIcon size={300} className="absolute -top-20 -left-20 animate-drift opacity-[0.03] -z-10" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-7xl font-black text-brand-green tracking-tight mb-8">המרצות שלנו</h2>
          <div className="h-2 w-32 bg-brand-orange mb-12 rounded-full"></div>
          
          <div className="bg-brand-cream/30 p-8 md:p-14 rounded-[3rem] border-2 border-brand-beige shadow-xl max-w-4xl">
            <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-medium mb-8">
              התוכנית מארחת נשות מקצוע מומחיות בתחומן המביאות ידע מקצועי וניסיון מהשטח. 
            </p>
            <p className="text-xl md:text-3xl text-brand-green leading-relaxed font-bold">
              בין המרצות תוכלו לפגוש מומחיות המנגישות את נושא גיל המעבר על כל גווניו – מהבנת התסמינים והשינויים הפיזיולוגיים והרגשיים, ועד לכלים מעשיים להתמודדות וצמיחה בשלב חיים זה.
            </p>
            <p className="mt-8 text-lg md:text-xl text-gray-500 italic">
              נשות המקצוע שלנו נבחרות בקפידה כדי להעניק לכן את המעטפת המקצועית והעדכנית ביותר.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
