import React, { useState } from 'react';
import { TEAM } from '../constants';
import { ButterflyIcon } from './Hero';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-brand-beige/40 px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      {/* Decorative Background Butterfly - Section Level */}
      <ButterflyIcon size={160} className="absolute bottom-10 right-10 animate-float opacity-5 hidden md:block pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12 md:mb-20 px-4">
          <div className="inline-block px-6 py-2 bg-brand-green/10 text-brand-green rounded-full text-xs sm:text-sm font-black mb-4 tracking-tight border border-brand-green/20">
            מובילות הדרך
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-brand-green text-center tracking-tight leading-tight mb-4 drop-shadow-xs">
            הצוות שמאחורי הקלעים
          </h2>
          <div className="h-2 w-32 bg-brand-orange mx-auto rounded-full shadow-inner" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col text-right p-6 sm:p-8 md:p-10 bg-white rounded-3xl sm:rounded-[3rem] shadow-[0_15px_45px_rgba(84,99,79,0.08)] border-t-8 border-brand-green hover:border-brand-orange transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden"
            >
              {/* Member Photo */}
              {member.image && (
                <div className="relative mb-6 overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-md aspect-[4/3] bg-brand-beige/60">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-brand-green mb-2 group-hover:text-brand-orange transition-colors duration-300">
                  {member.name}
                </h3>
                
                <div className="inline-block self-start px-4 py-1.5 bg-brand-beige rounded-full text-brand-green font-black text-xs sm:text-sm mb-4 border border-brand-green/10 shadow-2xs">
                  {member.role}
                </div>

                <div className="w-16 h-1 bg-brand-orange mb-5 rounded-full group-hover:w-full transition-all duration-700 ease-in-out"></div>
                
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg md:text-xl font-medium opacity-90">
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
