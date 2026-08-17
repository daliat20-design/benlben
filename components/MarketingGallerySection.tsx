
import React from 'react';
import { ButterflyIcon } from './ButterflyIcon';

export const MarketingGallerySection: React.FC = () => {
  // Placeholder images for the gallery - these are thematic and high quality
  const galleryImages = [
    { src: 'https://i.postimg.cc/zXNcsDYk/header-jpg.png', alt: 'מפגש סדנא בכפר סבא' },
    { src: 'https://picsum.photos/seed/workshop1/800/600', alt: 'למידה משותפת' },
    { src: 'https://picsum.photos/seed/workshop2/800/600', alt: 'רגעים של חיבור' },
    { src: 'https://picsum.photos/seed/workshop3/800/600', alt: 'יצירה ושיח' },
    { src: 'https://picsum.photos/seed/workshop4/800/600', alt: 'אווירה קבוצתית' },
    { src: 'https://picsum.photos/seed/workshop5/800/600', alt: 'צמיחה אישית' },
  ];

  return (
    <section id="marketing-gallery" className="py-24 bg-brand-cream/30 px-6 relative overflow-hidden">
      <ButterflyIcon size={200} className="absolute top-10 -left-10 opacity-5 animate-drift" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-7xl font-black text-brand-green mb-6 tracking-tighter">רגעים מהסדנא בכפר סבא</h2>
          <div className="h-2 w-32 bg-brand-orange mx-auto rounded-full"></div>
          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
            הצצה לאווירה המיוחדת, לחיבורים שנרקמו וללמידה המשמעותית שהתרחשה במפגשים שלנו.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-[2rem] shadow-xl aspect-video md:aspect-square bg-white border-4 border-white hover:border-brand-orange transition-all duration-500 cursor-pointer"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-white font-black text-xl md:text-2xl tracking-tight">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-brand-orange font-black text-xl italic">
            נשמח לראות אותך איתנו במחזור הבא
          </p>
        </div>
      </div>
    </section>
  );
};
