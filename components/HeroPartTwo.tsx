
import React from 'react';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';
import { ButterflyIcon } from './Hero';

export const HeroPartTwo: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 px-6 overflow-hidden bg-brand-cream">
      <ButterflyIcon size={220} className="absolute -top-10 -left-20 opacity-10 animate-float" />
      <ButterflyIcon size={140} className="absolute top-1/4 right-0 opacity-10 animate-drift" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        <div className="flex-1 text-center md:text-right">
          

          <div className="inline-block bg-brand-orange text-white px-6 py-2 rounded-full text-sm font-black mb-8 tracking-widest uppercase shadow-lg border-b-4 border-brand-orange/30">
            החלק הראשון היה הצלחה אדירה!
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-brand-green leading-tight mb-6 tracking-tighter drop-shadow-sm">
            בין לבין - חלק ב'
          </h1>

          <div className="mb-8 flex justify-center md:justify-start">
            <div className="w-32 h-32 md:w-44 md:h-44 rounded-full shadow-2xl p-2 border-4 border-brand-beige flex items-center justify-center overflow-hidden animate-float relative bg-transparent">
              <img 
                src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
                alt="לוגו בין לבין" 
                className="w-full h-full object-cover rounded-full"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
          
          <p className="text-2xl md:text-4xl font-bold text-brand-orange mb-4 drop-shadow-sm">
            מזמינות אותך להצטרף ל-4 מפגשים של גילוי וצמיחה <br />
            <span className="text-brand-lightGreen font-light italic">ללמוד. להבין. לשתף.</span>
          </p>

          <div className="w-32 h-2 bg-brand-orange mb-12 mx-auto md:mr-0 rounded-full shadow-inner"></div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl leading-relaxed mb-12 font-medium bg-white/30 backdrop-blur-sm p-6 rounded-3xl border border-white/40">
            לאור ההצלחה הגדולה של החלק הראשון, אנחנו פותחות את הדלת לנשים חדשות להצטרף אלינו לחלק השני והמרגש של התוכנית.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a 
              href="https://forms.gle/2ogpiqdcKk233KFc8"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-brand-orange text-white px-10 py-5 rounded-full text-xl font-black shadow-xl hover:bg-brand-green transition-all transform hover:-translate-y-1 text-center"
            >
              להרשמה לחלק ב'
            </a>
            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent("היי, אשמח לקבל פרטים על הצטרפות לחלק ב' של תוכנית בין לבין")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white text-brand-green border-2 border-brand-green/20 px-10 py-5 rounded-full text-xl font-black shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              שאלי אותנו
            </a>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative z-10 p-6 bg-white shadow-[0_50px_100px_-20px_rgba(84,99,79,0.3)] rounded-[3rem] transform rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden">
            <div className="overflow-hidden rounded-[2rem] aspect-[4/3] shadow-inner">
              <img 
                src="https://i.postimg.cc/zXNcsDYk/header-jpg.png" 
                alt="בין לבין - חלק ב'" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
