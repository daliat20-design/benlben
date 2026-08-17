import React from 'react';
import { Clock, MapPin, Coffee, AlertCircle, Sparkles } from 'lucide-react';
import { ButterflyIcon } from '../ButterflyIcon';

export const MwmDates: React.FC = () => {
  const allDates = [
    { num: 'מפגש 1', day: "יום ד'", date: '11.11.26', type: 'wednesday' },
    { num: 'מפגש 2', day: "יום א'", date: '15.11.26', type: 'sunday' },
    { num: 'מפגש 3', day: "יום א'", date: '22.11.26', type: 'sunday' },
    { num: 'מפגש 4', day: "יום א'", date: '29.11.26', type: 'sunday' },
    { num: 'מפגש 5', day: "יום א'", date: '13.12.26', note: 'באותו שבוע', type: 'sunday' },
    { num: 'מפגש 6', day: "יום ד'", date: '16.12.26', note: 'באותו שבוע', type: 'wednesday' },
    { num: 'מפגש 7', day: "יום א'", date: '20.12.26', type: 'sunday' },
    { num: 'מפגש 8', day: "יום א'", date: '27.12.26', type: 'sunday' },
  ];

  return (
    <section id="program-format" className="py-24 bg-brand-cream/50 relative px-6 overflow-hidden">
      {/* Decorative background butterflies */}
      <ButterflyIcon size={240} className="absolute -top-10 -right-10 animate-drift opacity-5 -z-10" />
      <ButterflyIcon size={180} className="absolute bottom-10 -left-10 animate-float opacity-5 -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-black mb-4 tracking-tight border border-brand-green/20">
            מידע ומועדים
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-brand-green tracking-tight mb-4">
            מתכונת התוכנית
          </h2>
          <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
        </div>

        {/* Highlight Format Features */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-brand-beige shadow-md flex items-start gap-4 text-right">
            <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-2xl shrink-0 mt-1">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-green mb-2">
                8 מפגשים המשלבים תוכן מקצועי, חוויה ושיתוף
              </h3>
              <p className="text-brand-orange font-bold text-base md:text-lg leading-relaxed">
                + מפגש בונוס בזום בנושא יפוי כח מתמשך שיועבר על ידי עו"ד מומחית בתחום
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border-2 border-brand-beige shadow-md flex items-start gap-4 text-right">
            <div className="p-3 bg-brand-green/10 text-brand-green rounded-2xl shrink-0 mt-1">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-brand-green mb-2">
                3 שעות בכל מפגש
              </h3>
              <p className="text-gray-600 font-medium text-base md:text-lg leading-relaxed">
                מרחב מעמיק המאפשר שיח פתוח, התבוננות אישית, למידה וכלים פרקטיים לחיים.
              </p>
            </div>
          </div>
        </div>

        {/* Dates Container */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-brand-beige shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-4xl font-black text-brand-green mb-3">
              התאריכים
            </h3>
            
            {/* Color Legend */}
            <div className="flex items-center justify-center gap-6 text-sm md:text-base font-black">
              <div className="inline-flex items-center gap-2 bg-brand-green/10 px-4 py-1.5 rounded-full text-brand-green border border-brand-green/20">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-green inline-block shadow-sm"></span>
                <span>ימי א'</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 px-4 py-1.5 rounded-full text-brand-orange border border-brand-orange/25">
                <span className="w-3.5 h-3.5 rounded-full bg-brand-orange inline-block shadow-sm"></span>
                <span>ימי ד'</span>
              </div>
            </div>
          </div>

          {/* First 4 meetings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {allDates.slice(0, 4).map((item, idx) => {
              const isSunday = item.type === 'sunday';
              return (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md text-center ${
                    isSunday 
                      ? 'bg-brand-green/5 border-brand-green/30 hover:border-brand-green hover:bg-brand-green/10' 
                      : 'bg-brand-orange/5 border-brand-orange/40 hover:border-brand-orange hover:bg-brand-orange/10'
                  }`}
                >
                  <span className={`text-xs font-black uppercase block mb-1 ${
                    isSunday ? 'text-brand-green' : 'text-brand-orange'
                  }`}>
                    {item.num}
                  </span>
                  <div className={`text-xl md:text-2xl font-black mb-1 ${
                    isSunday ? 'text-brand-green' : 'text-brand-orange'
                  }`}>
                    {item.date}
                  </div>
                  <div className={`inline-block text-xs md:text-sm font-black px-3 py-0.5 rounded-full ${
                    isSunday ? 'bg-brand-green text-white' : 'bg-brand-orange text-white'
                  }`}>
                    {item.day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hanukkah Holiday Separator */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-brand-orange/40"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-brand-orange text-white px-8 py-2 rounded-full text-base font-black shadow-md">
                פגרת חנוכה
              </span>
            </div>
          </div>

          {/* Notice for meetings 5 & 6 */}
          <div className="my-6 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-2xl p-4 flex items-center justify-center gap-3 text-brand-orange font-black text-base md:text-lg text-center">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <span>שימו לב !!! מפגש 5 ו-6 באותו השבוע</span>
          </div>

          {/* Last 4 meetings */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {allDates.slice(4).map((item, idx) => {
              const isSunday = item.type === 'sunday';
              return (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md text-center ${
                    isSunday 
                      ? 'bg-brand-green/5 border-brand-green/30 hover:border-brand-green hover:bg-brand-green/10' 
                      : 'bg-brand-orange/5 border-brand-orange/40 hover:border-brand-orange hover:bg-brand-orange/10'
                  }`}
                >
                  <span className={`text-xs font-black uppercase block mb-1 ${
                    isSunday ? 'text-brand-green' : 'text-brand-orange'
                  }`}>
                    {item.num}
                  </span>
                  <div className={`text-xl md:text-2xl font-black mb-1 ${
                    isSunday ? 'text-brand-green' : 'text-brand-orange'
                  }`}>
                    {item.date}
                  </div>
                  <div className={`inline-block text-xs md:text-sm font-black px-3 py-0.5 rounded-full ${
                    isSunday ? 'bg-brand-green text-white' : 'bg-brand-orange text-white'
                  }`}>
                    {item.day}
                  </div>
                  {item.note && (
                    <span className="block mt-2 text-[11px] font-black text-brand-orange bg-brand-orange/15 px-2 py-0.5 rounded-full">
                      {item.note}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Location & Refreshments Footer Badges */}
          <div className="pt-6 border-t border-brand-beige flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-full text-base md:text-lg font-bold shadow-md">
              <MapPin className="w-5 h-5 text-brand-orange" />
              <span>מיקום: כוכב יאיר צור יגאל – מיקום מדוייק יימסר בהמשך</span>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-white border-2 border-brand-orange text-brand-orange px-6 py-3 rounded-full text-base md:text-lg font-black shadow-sm">
              <Coffee className="w-5 h-5" />
              <span>יוגש כיבוד</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
