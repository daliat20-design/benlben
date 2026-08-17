
import React from 'react';
import { TEAM } from '../constants';
import { ButterflyIcon } from './Hero';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="pt-12 pb-6 bg-brand-beige/40 px-6 relative overflow-hidden text-right">
      {/* Decorative Background Butterfly - Section Level */}
      <ButterflyIcon size={160} className="absolute bottom-10 right-10 animate-float opacity-5" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20 md:mb-24">
          <div className="inline-block px-8 py-2 bg-brand-green text-white rounded-full text-xs font-black mb-10 tracking-[0.2em] uppercase shadow-md">
            INSIDE OUT
          </div>
          <h2 className="text-5xl md:text-9xl font-black text-brand-green text-center tracking-tighter leading-none mb-12 drop-shadow-sm">
            הצוות שמאחורי הקלעים
          </h2>
          <div className="h-2.5 w-48 bg-brand-orange mx-auto rounded-full shadow-inner" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-14 max-w-4xl mx-auto">
          {TEAM.map((member, idx) => (
            <div key={idx} className="group relative flex flex-col text-right p-10 md:p-14 bg-white rounded-[3.5rem] shadow-[0_20px_60px_rgba(84,99,79,0.06)] border-t-8 border-brand-green hover:border-brand-orange transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 overflow-hidden">
              
              {/* Decorative elements were removed from here for a cleaner look */}
              
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-brand-green mb-3 group-hover:text-brand-orange transition-colors duration-500">{member.name}</h3>
                <div className="inline-block px-5 py-2 bg-brand-beige rounded-full text-brand-green font-black text-sm mb-8 border border-brand-green/10 shadow-sm">
                  {member.role}
                </div>
                <div className="w-16 h-1.5 bg-brand-orange mb-8 rounded-full group-hover:w-full transition-all duration-1000 ease-in-out"></div>
                <p className="text-gray-600 leading-relaxed text-xl font-medium opacity-90">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
