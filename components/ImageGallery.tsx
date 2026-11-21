import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    src: 'https://i.postimg.cc/xCC3XM6R/d1eb9c15-b336-4bf3-9cb0-d7400712e8c1.jpg',
    alt: 'טעימה מהסדנאות 1',
  },
  {
    src: 'https://i.postimg.cc/8zS3jXMk/fd1e841d-049f-48a3-a8ca-c76337f4b653.jpg',
    alt: 'טעימה מהסדנאות 2',
  },
  {
    src: 'https://i.postimg.cc/N0tNjyh0/525a7ebb-7c86-4e7b-af5e-b420962adb68.jpg',
    alt: 'טעימה מהסדנאות 3',
  },
  {
    src: 'https://i.postimg.cc/TYjHbqRg/b084b620-c6fb-4fc2-a02f-e0d055e497af.jpg',
    alt: 'טעימה מהסדנאות 4',
  },
  {
    src: 'https://i.postimg.cc/wvyFWDDY/84f2391c-518c-48b6-9dca-008dddc665e0.jpg',
    alt: 'טעימה מהסדנאות 5',
  },
];

export const ImageGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const hasDraggedRef = useRef(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    const scrollAmount = Math.max(300, el.clientWidth * 0.65);
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    if (Math.abs(walk) > 6) {
      hasDraggedRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleImageClick = (index: number) => {
    if (hasDraggedRef.current) return;
    setLightboxIndex(index);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length));
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) =>
      prev === null ? 0 : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % GALLERY_IMAGES.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? 0 : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="relative w-full group" dir="rtl">
      {/* Side Navigation Arrows */}
      <button
        type="button"
        onClick={() => handleScroll('right')}
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-green p-2.5 sm:p-3 rounded-full shadow-lg border border-brand-beige/60 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="גלול ימינה"
      >
        <ChevronRight size={24} className="stroke-[3]" />
      </button>

      <button
        type="button"
        onClick={() => handleScroll('left')}
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white text-brand-green p-2.5 sm:p-3 rounded-full shadow-lg border border-brand-beige/60 backdrop-blur-sm transition-all hover:scale-110 active:scale-95 flex items-center justify-center cursor-pointer"
        aria-label="גלול שמאלה"
      >
        <ChevronLeft size={24} className="stroke-[3]" />
      </button>

      {/* Manual Horizontal Scrollable Gallery Track (No Autoplay, No Text Overlays) */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex items-center gap-3 sm:gap-4 overflow-x-auto py-1 px-2 sm:px-3 select-none cursor-grab active:cursor-grabbing no-scrollbar ${
          isDragging ? 'scroll-auto' : 'scroll-smooth snap-x snap-mandatory'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageClick(index)}
            className="flex-none w-[84%] sm:w-[58%] md:w-[54%] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-cream shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer snap-center border border-[#C56B3E]/15"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              draggable={false}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal (Clean Image Only, No Text Overlay) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-brand-orange p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              aria-label="סגור תמונה"
            >
              <X size={28} />
            </button>

            <div
              className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                referrerPolicy="no-referrer"
              />

              <button
                type="button"
                onClick={prevLightbox}
                className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-4 rounded-full transition-all hover:scale-110 cursor-pointer"
                aria-label="התמונה הקודמת"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                type="button"
                onClick={nextLightbox}
                className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-4 rounded-full transition-all hover:scale-110 cursor-pointer"
                aria-label="התמונה הבאה"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
