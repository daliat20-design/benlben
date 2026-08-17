
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingImportantInfo: React.FC = () => {
  return (
    <section id="marketing-info" className="pt-20 pb-20 bg-brand-cream/60 px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={300} className="absolute -top-20 -right-20 animate-drift opacity-[0.04] -z-10 hidden md:block" />
      <ButterflyIcon size={250} className="absolute -bottom-20 -left-20 animate-float opacity-[0.04] -z-10" />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-8 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-black mb-6 tracking-widest uppercase border border-brand-green/20">
            איך זה עובד?
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-6 text-brand-green tracking-tighter">חשוב לדעת</h2>
          <div className="h-2 w-32 bg-brand-orange mx-auto rounded-full shadow-sm"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-brand-beige">
            <h3 className="text-2xl font-black text-brand-green mb-4">תדירות המפגשים</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              המפגשים מתקיימים אחת לשבוע, בקביעות, כדי לאפשר רצף של למידה, העמקה וחיבור קבוצתי.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-brand-orange/20">
            <h3 className="text-2xl font-black text-brand-orange mb-4">ליווי צמוד</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              קבוצת וואטסאפ ייעודית תלווה את המשתתפות לאורך כל חודשי התוכנית, למתן מענה, שיתוף לינקים וחיבור בין המפגשים.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-brand-green/20">
            <h3 className="text-2xl font-black text-brand-green mb-4">קבלה לתוכנית</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              הצטרפות לתוכנית מותנית במילוי טופס הצטרפות מקיף. זאת כדי להתאים את קהל היעד ולדייק את התכנים עבור הקבוצה הנבנית.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
