import React from 'react';
import { ButterflyIcon } from '../ButterflyIcon';
import { ImageGallery } from '../ImageGallery';

export const MwmAbout: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative px-6 overflow-hidden">
      {/* Decorative Brand Butterflies */}
      <ButterflyIcon size={220} className="absolute top-40 -right-20 animate-drift opacity-5 -z-10" />
      <ButterflyIcon size={130} className="absolute bottom-40 -left-10 animate-float opacity-5 -z-10" />
      <ButterflyIcon size={80} className="absolute top-1/2 left-1/4 animate-float opacity-10 -z-10" />
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-brand-green leading-tight tracking-tight">
            הרבה יותר מתוכנית על גיל המעבר
          </h2>
          <div className="h-2 w-28 bg-brand-orange mx-auto rounded-full mb-12 shadow-sm" />
          
          <div className="max-w-4xl mx-auto text-right space-y-8">
            <div className="bg-brand-beige/20 p-8 md:p-10 rounded-[3rem] border-r-[10px] border-brand-green shadow-sm relative space-y-4">
              <p className="text-xl md:text-2xl text-gray-800 font-bold leading-relaxed">
                היום אפשר למצוא מידע רב על גיל המעבר: בכתבות, הרצאות, בפודקאסטים ועוד.
              </p>
              <p className="text-xl md:text-2xl text-brand-green font-black leading-relaxed">
                אבל מידע לבדו כבר לא תמיד מספיק
              </p>
              <p className="text-lg md:text-xl text-gray-700 font-bold leading-relaxed pt-2">
                כי לצד השינויים בגוף עולות גם שאלות אחרות:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-brand-green font-bold text-lg pt-4 border-t border-brand-beige/50">
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> איך שומרים על עצמנו בתוך העשייה ?</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> איך מתמודדים עם הורים שמתבגרים וילדים שמתרחקים מהקן?</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> מה קורה לזוגיות ולאינטימיות?</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> מה אני רוצה מהשנים הבאות שלי?</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> האם העבודה והעשייה שלי עדיין מתאימות לי?</div>
                <div className="flex items-center gap-2"><span className="text-brand-orange">✦</span> איך מחזירים לגוף אנרגיה וכוח?</div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-2"><span className="text-brand-orange">✦</span> איך מקשיבים לעצמנו בתוך כל הרעש?</div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="py-6 flex justify-center">
              <div className="w-full max-w-2xl bg-gradient-to-tr from-brand-green to-brand-lightGreen rounded-[3rem] p-3 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://i.postimg.cc/WpysKVr6/17.jpg" 
                  alt="בין לבין - נשים באמצע החיים" 
                  className="w-full h-auto rounded-[2.5rem] shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Program Core Box */}
            <div className="bg-gradient-to-br from-brand-orange/15 to-brand-beige/30 p-8 md:p-12 rounded-[3rem] border-r-[12px] border-brand-orange shadow-lg space-y-6 text-right">
              <div>
                <p className="text-2xl md:text-3xl font-black text-brand-green mb-3">
                  זה המרחב של "בין לבין"
                </p>
                <p className="text-xl md:text-2xl text-gray-800 font-bold leading-relaxed">
                  שמונה מפגשים של ידע, שיח והתבוננות, שמחברים בין הנקודות.
                </p>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="pt-16 pb-8 flex justify-center relative">
            <ButterflyIcon size={50} className="absolute top-20 right-10 md:right-40 animate-drift opacity-60 hidden md:block -z-10" />
            <ButterflyIcon size={60} className="absolute bottom-4 left-10 md:left-40 animate-float opacity-50 hidden md:block -z-10" />
            <div className="w-full max-w-2xl bg-brand-orange/20 rounded-[3.5rem] p-3 shadow-2xl overflow-hidden border-2 border-brand-orange/30">
              <ImageGallery />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
