import React from 'react';
import { ButterflyIcon } from '../ButterflyIcon';

export const MwmTeam: React.FC = () => {
  const teamMembers = [
    {
      name: 'דלית כורה',
      role: 'הוגה ומובילת התוכניות',
      paragraphs: [
        'מתמחה בהובלת פרויקטים, בפיתוח תוכניות ובתרגום רעיונות לתהליכים יישומיים, מדויקים וברורים. לאורך השנים צברה ניסיון בהובלת קהילות נשים, בפיתוח תוכן ובהפקת תוכניות ואירועים, מתוך היכרות עמוקה עם הדרך שבה תוכן, שיח וחוויה מתחברים לתהליך שלם.',
        'ב"בין לבין" דלית מחזיקה את התמונה הגדולה ואת הפרטים הקטנים, ומובילה את התוכניות משלב הרעיון, דרך הפיתוח והדיוק ועד למימוש.'
      ]
    },
    {
      name: 'אלסי זיסלמן',
      role: 'מנחה ומרצה, טריינרית NLP',
      paragraphs: [
        'מלווה תהליכים אישיים וקבוצתיים של שינוי, התבוננות וקבלת החלטות. בעלת ניסיון בהנחיית קבוצות ובעבודה עם נשים, ומביאה לתוכניות כלים מעולם ה־NLP לצד יכולת להוביל שיח שמאפשר להתבונן, לדייק ולנוע קדימה.',
        'ב"בין לבין" אלסי מובילה את תהליכי ההתבוננות והשיח, ומסייעת לנשים לתרגם תובנות לבחירות ולצעדים מעשיים.'
      ]
    }
  ];

  return (
    <section id="team" className="py-24 bg-brand-beige/30 px-6 relative overflow-hidden text-right">
      <ButterflyIcon size={160} className="absolute bottom-10 right-10 animate-float opacity-5" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block px-6 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-black mb-4 tracking-tight border border-brand-green/20">
            הובלה והנחיה
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-green text-center tracking-tight mb-4">
            הצוות שמאחורי התוכנית
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col text-right p-8 md:p-12 bg-white rounded-[3rem] shadow-xl border-t-8 border-brand-green hover:border-brand-orange transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <h3 className="text-3xl font-black text-brand-green mb-3 group-hover:text-brand-orange transition-colors duration-300">
                  {member.name}
                </h3>
                <div className="inline-block self-start px-5 py-2 bg-brand-beige/50 rounded-full text-brand-green font-black text-sm mb-6 border border-brand-green/10 shadow-sm">
                  {member.role}
                </div>
                <div className="w-16 h-1.5 bg-brand-orange mb-6 rounded-full group-hover:w-full transition-all duration-700 ease-in-out"></div>
                <div className="space-y-4 text-gray-700 leading-relaxed text-base md:text-lg font-medium">
                  {member.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
