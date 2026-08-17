
import React from 'react';
import { ButterflyIcon } from './Hero';
import { CONTACT_PHONE, WHATSAPP_MESSAGE } from '../constants';

export const PricingSectionPartTwo: React.FC = () => {
  return (
    <section id="pricing" className="pt-16 md:pt-24 pb-16 md:pb-16 bg-brand-cream px-4 md:px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={350} className="absolute -top-40 md:-top-20 -right-20 animate-drift opacity-5 hidden md:block" />
      <ButterflyIcon size={180} className="absolute bottom-0 -left-10 animate-float opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24 px-2">
          <div className="bg-brand-orange text-white px-6 py-1.5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest inline-block mb-6 shadow-lg">הצטרפי אלינו לחלק ב'</div>
          <h2 className="text-5xl md:text-8xl font-black mb-6 text-brand-green tracking-tighter">השקיעי בעצמך</h2>
          <p className="text-brand-lightGreen text-xl md:text-3xl font-black italic">עלות התוכנית - חלק ב' בלבד</p>
        </div>

        <div className="flex justify-center mb-20 md:mb-32 pt-10">
          <div className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[4.5rem] shadow-[0_40px_80px_-15px_rgba(84,99,79,0.12)] border-t-[12px] md:border-t-[20px] border-brand-orange border-x-2 border-b-2 border-brand-beige relative flex flex-col items-center overflow-hidden transition-all duration-500 hover:shadow-2xl max-w-2xl w-full">
            
            <div className="mb-10 text-center">
              <h3 className="text-3xl md:text-5xl font-black mb-3 text-brand-green leading-none">תוכנית חלק ב'</h3>
              <p className="text-brand-lightGreen font-black text-sm md:text-xl tracking-wide uppercase opacity-90">4 מפגשים של גילוי וצמיחה</p>
            </div>
            
            <div className="mb-10 p-8 md:p-12 bg-brand-orange/5 rounded-[2rem] md:rounded-[3rem] border-2 border-brand-orange/10 relative shadow-inner flex flex-col items-center overflow-hidden w-full">
              <div className="absolute -bottom-4 -left-4 opacity-5 rotate-12">
                 <ButterflyIcon size={100} />
              </div>
              <div className="flex items-baseline gap-3 md:gap-4 mb-2 relative z-10 flex-wrap justify-center">
                <span className="text-6xl md:text-9xl font-black text-brand-orange">₪360</span>
                <span className="text-brand-lightGreen font-black text-lg md:text-2xl">לתוכנית</span>
              </div>
              <div className="bg-brand-green text-white px-5 py-1.5 rounded-full inline-block relative z-10">
                <p className="font-black text-lg md:text-2xl">רק ₪90 למפגש</p>
              </div>
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-8">
          <a 
            href="https://forms.gle/2ogpiqdcKk233KFc8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-orange text-white px-12 md:px-24 py-6 md:py-8 rounded-full text-xl md:text-4xl font-black hover:bg-brand-green transition-all shadow-2xl transform hover:-translate-y-2 border-b-8 border-brand-orange/40 text-center flex items-center gap-4"
          >
            <span>לחצי כאן להרשמה לחלק ב'</span>
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
          </a>

          <div className="flex flex-col items-center gap-4">
            <p className="text-brand-green font-black text-xl md:text-2xl">יש לך שאלות? רוצה לשוחח ולקבל פרטים?</p>
            <a 
              href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent("היי, אשמח לקבל פרטים על הצטרפות לחלק ב' של תוכנית בין לבין")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-brand-green border-2 border-brand-green/30 px-10 py-4 rounded-full text-lg md:text-xl font-black hover:bg-brand-orange hover:text-white hover:border-transparent transition-all shadow-md flex items-center gap-3 group"
            >
              <svg className="w-6 h-6 text-[#25D366] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              שלחי לנו הודעה בוואטסאפ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
