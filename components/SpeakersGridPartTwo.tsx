
import React, { useState } from 'react';
import { SPEAKERS } from '../constants';
import { Speaker } from '../types';

export const SpeakersGridPartTwo: React.FC = () => {
  // Filter speakers to only include those for Part B
  const partBSpeakers = SPEAKERS.filter(speaker => 
    ["גולדי אברהם ושרית אברהם עשור", "סימה ביטון קצביץ", "טליה גולן", "אלסי זיסלמן"].includes(speaker.name)
  );

  return (
    <section id="speakers" className="pt-16 pb-12 bg-white px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-brand-beige/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-brand-orange/10 text-brand-orange rounded-full text-sm font-black mb-4 tracking-tight border border-brand-orange/20">
            על המרצות של חלק ב'
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-brand-green tracking-tighter text-center">צוות המומחיות</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-xl md:text-2xl font-bold leading-relaxed text-center">
            צוות המומחיות שלנו מלווה את חלקו השני של "בין לבין" בידע, ניסיון וכלים לדרך
          </p>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto mt-8 rounded-full opacity-50"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-y-12">
          {partBSpeakers.map((speaker, idx) => (
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
      className={`group flex flex-col bg-white rounded-[3rem] p-5 md:p-6 transition-all duration-500 shadow-sm border border-brand-beige/50 text-right cursor-pointer h-full ${
        isExpanded ? 'shadow-2xl border-brand-green/30' : 'hover:shadow-[0_20px_50px_rgba(84,99,79,0.12)] hover:border-brand-green/20'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative mb-6 overflow-hidden rounded-[2.5rem] shadow-md aspect-[4/5] bg-brand-beige">
        {!imgError ? (
          <img 
            src={speaker.image} 
            alt={speaker.name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${!isExpanded && 'group-hover:scale-110'}`}
            style={{ objectPosition: speaker.imagePosition || 'center' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-green font-bold text-4xl">
            {speaker.name.charAt(0)}
          </div>
        )}
        
        <div className="absolute bottom-3 right-3 left-3 flex flex-wrap gap-1">
          {speaker.topics.slice(0, 2).map((t: string, i: number) => (
            <span key={i} className="text-[10px] bg-white/90 backdrop-blur-sm text-brand-green font-black px-2.5 py-1 rounded-full shadow-sm">
              {t}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex-1 flex flex-col w-full">
        <h3 className={`text-2xl md:text-3xl font-black mb-1 transition-colors ${isExpanded ? 'text-brand-orange' : 'text-brand-green group-hover:text-brand-orange'}`}>
          {speaker.name}
        </h3>
        <p className="text-brand-lightGreen text-sm md:text-base font-bold mb-4 leading-tight min-h-[2.5rem] flex items-center">
          {speaker.title}
        </p>

        <div className="h-px w-12 bg-brand-orange/30 mb-6"></div>
        
        <div className="relative w-full">
          <p 
            className={`text-gray-600 text-sm md:text-base leading-relaxed transition-all duration-500 font-medium ${isExpanded ? '' : 'line-clamp-3'}`}
            dangerouslySetInnerHTML={{ __html: speaker.bio }}
          />
          
          <div className="mt-6 flex flex-col items-start">
             <button 
              className={`text-sm font-black flex items-center gap-2 transition-colors ${isExpanded ? 'text-brand-orange' : 'text-brand-green hover:text-brand-orange'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <span>{isExpanded ? 'סגירה' : 'קראי עוד'}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-brand-orange text-white rotate-180' : 'bg-brand-beige text-brand-green'}`}>
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
