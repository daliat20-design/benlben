
import React from 'react';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingHero: React.FC = () => {
  return (
    <section id="top" className="relative pt-16 pb-24 px-6 overflow-hidden bg-brand-cream">
      {/* Background Decor Butterflies */}
      <ButterflyIcon size={220} className="absolute -top-10 -left-20 opacity-10 animate-float" />
      <ButterflyIcon size={140} className="absolute top-1/4 right-0 opacity-10 animate-drift hidden lg:block" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center md:text-right">
          <div className="mb-10 flex flex-col md:flex-row justify-center md:justify-start items-center gap-8">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full shadow-2xl p-2 border-4 border-brand-beige flex items-center justify-center overflow-hidden animate-float relative bg-white/50 backdrop-blur-sm">
              <img 
                src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                alt="לוגו בין לבין" 
                className="w-full h-full object-cover rounded-full"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-9xl font-black text-brand-green leading-none mb-6 tracking-tighter drop-shadow-sm">
            בין לבין
          </h1>
          
          <p className="text-2xl md:text-4xl font-bold text-brand-orange mb-4 drop-shadow-sm">
            תוכנית לנשים באמצע החיים <br />
            <span className="text-brand-lightGreen font-light italic">ללמוד. להבין. לשתף.</span>
          </p>

          <div className="mb-8 inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-1.5 rounded-full border border-brand-orange/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
            <span className="text-lg font-black tracking-tight flex items-center gap-1">
              קהל יעד מומלץ: <span dir="ltr">45-65</span>
            </span>
          </div>
          
          <div className="w-32 h-2 bg-brand-orange mb-12 mx-auto md:mr-0 rounded-full shadow-inner"></div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed font-medium bg-white/30 backdrop-blur-sm p-6 rounded-3xl border border-white/40">
            תוכנית ייחודית המעניקה מעטפת מקצועית וקהילתית לנשים בפרק החיים המרתק של "אמצע הדרך". 
            אנחנו כאן כדי לדבר על הכל, ללמוד יחד וליצור חיבורים חדשים.
          </p>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative z-10 p-6 bg-white shadow-[0_50px_100px_-20px_rgba(84,99,79,0.3)] rounded-[3rem] transform rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden">
            <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-inner">
              <img 
                src="https://i.postimg.cc/zXNcsDYk/header-jpg.png" 
                alt="בין לבין - תוכנית לנשים באמצע החיים" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
