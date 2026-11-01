import React, { useState } from 'react';
import { TEAM } from '../constants';
import { ButterflyIcon } from './Hero';

export const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-gradient-to-b from-[#FFF4EB]/50 via-[#FFF9F4] to-[#FFF4EB]/50 px-4 sm:px-6 relative overflow-hidden text-right" dir="rtl">
      {/* Decorative Background Butterfly - Section Level */}
      <ButterflyIcon size={160} className="absolute bottom-10 right-10 animate-float opacity-[0.04] text-[#C56B3E] hidden md:block pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12 md:mb-20 px-4">
          <div className="inline-block px-6 py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-4 tracking-tight border border-[#C56B3E]/30">
            מובילות הדרך
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#C56B3E] text-center tracking-tight leading-tight mb-4 drop-shadow-xs">
            הצוות שמאחורי הקלעים
          </h2>
          <div className="h-2 w-32 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto rounded-full shadow-inner" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-4xl mx-auto">
          {TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col text-right p-6 sm:p-8 md:p-10 bg-white rounded-3xl sm:rounded-[3rem] shadow-[0_15px_45px_rgba(197,107,62,0.08)] border-t-8 border-[#C56B3E] hover:border-[#2D5043] transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden border-x border-b border-[#C56B3E]/10"
            >
              {/* Member Photo */}
              {member.image && (
                <div className="relative mb-6 overflow-hidden rounded-2xl sm:rounded-[2rem] shadow-md aspect-[4/3.2] sm:aspect-[4/3] max-h-72 sm:max-h-80 bg-[#FFF4EB]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: member.imagePosition || 'center 12%' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <div className="relative z-10 flex-1 flex flex-col">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2D5043] mb-2 group-hover:text-[#C56B3E] transition-colors duration-300">
                  {member.name}
                </h3>
                
                <div className="inline-block self-start px-4 py-1.5 bg-[#FFF4EB] rounded-full text-[#93542B] font-black text-xs sm:text-sm mb-4 border border-[#C56B3E]/20 shadow-2xs">
                  {member.role}
                </div>

                <div className="w-16 h-1 bg-[#C56B3E] mb-5 rounded-full group-hover:w-full transition-all duration-700 ease-in-out"></div>
                
                <p className="text-gray-800 leading-relaxed text-base sm:text-lg md:text-xl font-medium opacity-90">
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
