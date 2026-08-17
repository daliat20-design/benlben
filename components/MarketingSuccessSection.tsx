
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingSuccessSection: React.FC = () => {
  return (
    <section id="marketing-success" className="py-24 bg-brand-cream/40 px-6 relative overflow-hidden">
      <ButterflyIcon size={400} className="absolute -bottom-20 -right-20 animate-float opacity-[0.03] -z-10" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="bg-white p-10 md:p-20 rounded-[4rem] border-4 border-brand-beige shadow-[0_50px_100px_-20px_rgba(84,99,79,0.1)] text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-4 bg-brand-orange"></div>
           <ButterflyIcon size={200} className="absolute -top-10 -right-10 opacity-5 -z-10" />
           
           <h3 className="text-4xl md:text-7xl font-black text-brand-green mb-10 tracking-tighter">סיפור של הצלחה</h3>
           
           <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-black max-w-4xl mx-auto mb-10 shadow-sm bg-brand-beige/10 p-8 rounded-[2rem]">
             התוכנית במתכונת זו כבר התקיימה בהצלחה רבה בכפר סבא עבור נשות אזור השרון והפכה לקהילה תומכת וצומחת. המשתתפות מעידות על שינוי משמעותי בתפיסת הגיל ועל קבלת כלים יקרי ערך לחיים.
           </p>
           
           <div className="text-brand-orange font-black text-2xl md:text-4xl animate-pulse tracking-tight">
             ראו מה אומרות עלינו נשים שהשתתפו 👇
           </div>
        </div>
      </div>
    </section>
  );
};
