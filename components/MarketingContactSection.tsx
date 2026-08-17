
import React from 'react';
import { CONTACT_PHONE } from '../constants';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingContactSection: React.FC = () => {
  return (
    <section id="marketing-contact" className="py-24 px-6 bg-brand-green relative overflow-hidden text-center">
      <ButterflyIcon size={400} className="absolute -top-20 -left-20 opacity-10 animate-drift text-white" />
      <ButterflyIcon size={300} className="absolute -bottom-20 -right-20 opacity-10 animate-float text-white" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl p-2 border-4 border-white/30 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-md">
            <img 
              src="https://i.postimg.cc/PrH50HRm/logo-jpg.webp" 
              alt="לוגו בין לבין" 
              className="w-full h-full object-cover rounded-full"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">בואי נדבר</h2>
        <p className="text-xl md:text-3xl text-white/90 font-bold mb-16 leading-relaxed">
          משהו בלב שלך אומר שזה הזמן הנכון? <br/>
          אנחנו כאן לכל שאלה, תיאום או סתם כדי להבין אם זה מתאים לך.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a 
            href={`https://wa.me/${CONTACT_PHONE}?text=היי, אשמח לקבל פרטים על תוכנית בין לבין`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-white text-brand-green px-12 py-6 rounded-full text-2xl font-black shadow-2xl hover:bg-brand-orange hover:text-white transition-all transform hover:-translate-y-2 flex items-center justify-center gap-3"
          >
            <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>דברי איתנו בוואטסאפ</span>
          </a>
        </div>
      </div>
    </section>
  );
};
