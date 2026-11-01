
import React, { useState } from 'react';
import { SPEAKERS } from '../constants';
import { Speaker } from '../types';

export const SpeakersGrid: React.FC = () => {
  return (
    <section id="speakers" className="pt-14 pb-12 bg-white px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-beige/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="inline-block px-6 py-2 bg-[#C56B3E]/10 text-[#C56B3E] rounded-full text-xs sm:text-sm font-black mb-4 tracking-tight border border-[#C56B3E]/30">
            על המרצות שלנו
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 text-[#C56B3E] tracking-tight text-center">צוות המומחיות</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-center">
            צוות המומחיות שלנו מלווה את "בין לבין" בידע, ניסיון וכלים לדרך
          </p>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#C56B3E] to-[#E28A58] mx-auto mt-6 rounded-full opacity-80"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {SPEAKERS.map((speaker, idx) => (
            <SpeakerCard key={idx} speaker={speaker} />
          ))}
        </div>


      </div>
    </section>
  );
};

const SpeakerCard: React.FC<{ speaker: Speaker }> = ({ speaker }) => {
  const [imgError, setImgError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`group flex flex-col bg-white rounded-[3rem] p-5 md:p-6 transition-all duration-500 shadow-sm border border-[#C56B3E]/20 text-right cursor-pointer h-full ${
        isExpanded ? 'shadow-2xl border-[#C56B3E]' : 'hover:shadow-[0_20px_50px_rgba(197,107,62,0.12)] hover:border-[#C56B3E]/40'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Rectangular Image Container */}
      <div className="relative mb-6 overflow-hidden rounded-[2.5rem] shadow-md aspect-[4/5] bg-[#FFF4EB]">
        {!imgError ? (
          <img 
            src={speaker.image} 
            alt={speaker.name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${!isExpanded && 'group-hover:scale-110'}`}
            style={{ objectPosition: speaker.imagePosition || 'center' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#2D5043] font-bold text-4xl">
            {speaker.name.charAt(0)}
          </div>
        )}
        
        {/* Topics overlay */}
        <div className="absolute bottom-3 right-3 left-3 flex flex-wrap gap-1">
          {speaker.topics.slice(0, 2).map((t: string, i: number) => (
            <span key={i} className="text-[10px] bg-white/95 backdrop-blur-sm text-[#2D5043] font-black px-2.5 py-1 rounded-full shadow-sm border border-[#C56B3E]/20">
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col w-full">
        <h3 className={`text-2xl md:text-3xl font-black mb-1 transition-colors ${isExpanded ? 'text-[#C56B3E]' : 'text-[#2D5043] group-hover:text-[#C56B3E]'}`}>
          {speaker.name}
        </h3>
        <p className="text-[#C56B3E] text-sm md:text-base font-bold mb-4 leading-tight min-h-[2.5rem] flex items-center">
          {speaker.title}
        </p>

        <div className="h-px w-12 bg-[#C56B3E]/30 mb-6"></div>
        
        <div className="relative w-full">
          <p 
            className={`text-gray-700 text-sm md:text-base leading-relaxed transition-all duration-500 font-medium ${isExpanded ? '' : 'line-clamp-3'}`}
            dangerouslySetInnerHTML={{ __html: speaker.bio }}
          />
          
          <div className="mt-6 flex flex-col items-start">
             <button 
              className={`text-sm font-black flex items-center gap-2 transition-colors ${isExpanded ? 'text-[#C56B3E]' : 'text-[#2D5043] hover:text-[#C56B3E]'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <span>{isExpanded ? 'סגירה' : 'קראי עוד'}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-[#C56B3E] text-white rotate-180' : 'bg-[#FFF4EB] text-[#C56B3E]'}`}>
                <svg 
                  className="w-3 h-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
