import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

export const GALLERY_PHOTO_URLS: string[] = [
  'https://i.postimg.cc/L6HXW70S/IS-0800.jpg',
  'https://i.postimg.cc/yYmV7Ttm/IS-0576.jpg',
  'https://i.postimg.cc/2yCzPbG1/IS-0777.jpg',
  'https://i.postimg.cc/sDDjmWvx/c4957b4d-b80f-4f63-b14c-195536a30300.jpg',
  'https://i.postimg.cc/JhJM0cdx/15.jpg',
  'https://i.postimg.cc/7hPkBvPR/4acbfe3e-1a38-4398-ba25-d7ddbfb36579.jpg',
  'https://i.postimg.cc/kX4CKdpK/IMG-3644.avif',
  'https://i.postimg.cc/jjzYtqL8/IS-0475.jpg',
  'https://i.postimg.cc/28Vp3718/IS-0348.jpg',
  'https://i.postimg.cc/C52Qb9R0/IS-0554.jpg',
  'https://i.postimg.cc/MpVFjPq8/IS-1230.jpg',
  'https://i.postimg.cc/rmnnL7C4/IS-1097.jpg',
  'https://i.postimg.cc/fT0H6239/IS-1115.jpg',
];

export const BrandGallerySlider: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const el = scrollContainerRef.current;
    const scrollAmount = 450;
    // In RTL, moving forward in the list scrolls towards negative or left
    const delta = direction === 'left' ? -scrollAmount : scrollAmount;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Mouse drag-to-scroll support
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="gallery" 
      className="py-12 sm:py-16 bg-[#fbf8f4] border-b border-brand-beige/80 relative overflow-hidden scroll-mt-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Frame / Window container for the single continuous scrollable gallery */}
        <div className="relative bg-white/70 backdrop-blur-xs rounded-3xl border-2 border-brand-orange/25 p-3 sm:p-5 shadow-[0_10px_30px_rgba(203,119,69,0.08)]">
          
          {/* Side navigation arrows embedded on the frame */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="גלול ימינה"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-brand-orange text-gray-800 hover:text-white shadow-lg border border-brand-orange/30 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={() => handleScroll('left')}
            aria-label="גלול שמאלה"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-brand-orange text-gray-800 hover:text-white shadow-lg border border-brand-orange/30 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer backdrop-blur-xs"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Continuous Filmstrip / Horizontal scroll track inside one single screen/frame */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex items-center gap-3 sm:gap-4 overflow-x-auto py-2 px-6 sm:px-12 scroll-smooth select-none cursor-grab active:cursor-grabbing no-scrollbar ${
              isDragging ? 'scroll-auto' : ''
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {GALLERY_PHOTO_URLS.map((url, index) => (
              <div
                key={index}
                onClick={() => setLightboxImg(url)}
                className="flex-none h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-black/5"
              >
                <img
                  src={url}
                  alt=""
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-auto object-cover block pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Gentle subtle scroll hint at the bottom */}
          <div className="text-center pt-3 pb-1 text-xs text-gray-500 font-medium select-none">
            גלילה לצדדים &bull; לחצי על תמונה להגדלה
          </div>
        </div>

      </div>

      {/* Lightbox when clicked to view clean image in full size */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-5 z-60 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all cursor-pointer"
            aria-label="סגור תמונה"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxImg}
            alt=""
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[88vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
