import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: 'https://i.postimg.cc/xCC3XM6R/d1eb9c15-b336-4bf3-9cb0-d7400712e8c1.jpg',
    alt: 'מפגש נשי אינטימי – יוצרות חיבור, שיח וקרבה',
  },
  {
    src: 'https://i.postimg.cc/8zS3jXMk/fd1e841d-049f-48a3-a8ca-c76337f4b653.jpg',
    alt: 'סדנת כתיבה – לתת ביטוי לקול הפנימי בכתב',
  },
  {
    src: 'https://i.postimg.cc/N0tNjyh0/525a7ebb-7c86-4e7b-af5e-b420962adb68.jpg',
    alt: 'יוצרות חזון – שלוש משתתפות מציגות את דפי היצירה שלהן',
  },
  {
    src: 'https://i.postimg.cc/TYjHbqRg/b084b620-c6fb-4fc2-a02f-e0d055e497af.jpg',
    alt: 'חיבור פנימי – הזדמנות לעצור, לנשום ולהתחדש',
  },
  {
    src: 'https://i.postimg.cc/wvyFWDDY/84f2391c-518c-48b6-9dca-008dddc665e0.jpg',
    alt: 'יצירה והשראה – ביטוי עצמי וצמיחה משותפת',
  },
];

export const ImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % GALLERY_IMAGES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  };

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // changes image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full group">
      {/* Main Image Viewport */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] bg-brand-cream shadow-inner cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={currentIndex}
            src={GALLERY_IMAGES[currentIndex].src}
            alt={GALLERY_IMAGES[currentIndex].alt}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Gradient overlay for title/caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 pt-12 flex flex-col justify-end text-right pointer-events-none">
          <p className="text-white font-black text-lg md:text-xl leading-tight drop-shadow-md">
            {GALLERY_IMAGES[currentIndex].alt}
          </p>
          <p className="text-white/80 text-xs md:text-sm font-bold mt-1">
            תמונה {currentIndex + 1} מתוך {GALLERY_IMAGES.length}
          </p>
        </div>

        {/* Lightbox Trigger Icon overlay */}
        <div className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={18} />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-brand-green p-3 rounded-full shadow-lg border border-brand-beige/50 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center opacity-0 group-hover:opacity-100 md:opacity-100 focus:opacity-100"
        aria-label="התמונה הקודמת"
      >
        <ChevronLeft size={24} className="stroke-[3]" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-brand-green p-3 rounded-full shadow-lg border border-brand-beige/50 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center opacity-0 group-hover:opacity-100 md:opacity-100 focus:opacity-100"
        aria-label="התמונה הבאה"
      >
        <ChevronRight size={24} className="stroke-[3]" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4 relative z-10">
        {GALLERY_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 bg-brand-orange' 
                : 'w-2.5 bg-brand-green/30 hover:bg-brand-green/50'
            }`}
            aria-label={`עבור לתמונה ${index + 1}`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-brand-orange p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <X size={28} />
            </button>

            {/* Lightbox Image Container */}
            <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_IMAGES[currentIndex].src}
                alt={GALLERY_IMAGES[currentIndex].alt}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />

              {/* Lightbox Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Lightbox Caption */}
            <div className="mt-6 text-center max-w-2xl px-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-white text-xl md:text-2xl font-black">{GALLERY_IMAGES[currentIndex].alt}</p>
              <p className="text-white/60 text-sm mt-2">תמונה {currentIndex + 1} מתוך {GALLERY_IMAGES.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
