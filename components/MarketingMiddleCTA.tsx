
import React from 'react';
import { CONTACT_PHONE } from '../constants';

export const MarketingMiddleCTA: React.FC = () => {
  return (
    <section id="marketing-middle-cta" className="py-20 bg-brand-orange">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
          רוצה לשמוע עוד על התוכנית? <br className="hidden md:block" />
          אנחנו כאן לכל שאלה.
        </h2>
        <a 
          href={`https://wa.me/${CONTACT_PHONE}?text=היי, אשמח לקבל פרטים על תוכנית בין לבין`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-brand-orange px-12 py-5 rounded-full text-2xl font-black shadow-2xl hover:bg-brand-green hover:text-white transition-all transform hover:-translate-y-1"
        >
          לפרטים נוספים
        </a>
      </div>
    </section>
  );
};
