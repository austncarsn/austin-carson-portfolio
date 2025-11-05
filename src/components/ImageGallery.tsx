import { useRef, useState, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Section from './Section';
import FadeInSection from './FadeInSection';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

/**
 * ImageGallery — Horizontal scrolling gallery with drag interaction
 * 
 * Features:
 * - Smooth horizontal scroll with snap points
 * - Mouse drag to scroll
 * - Navigation arrows
 * - Responsive image sizing
 * - Respects reduced motion preferences
 */
function ImageGalleryBase({ images }: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Update scroll button visibility
  const updateScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      container.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Navigation scroll
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <Section
      id="gallery"
      border="bottom"
      bgClass="bg-canvas"
      labelNumber="03"
      labelTitle="GALLERY"
      labelDelay={0}
      className="relative"
    >
      <FadeInSection delay={100} direction="up">
        <div className="mb-12">
          <h2 className="font-satoshi font-bold text-h3 md:text-h2 text-text-primary mb-4">
            Visual Exploration
          </h2>
          <p className="font-satoshi text-body-lg text-text-muted max-w-2xl">
            A curated collection showcasing design work, UI experiments, and creative projects.
          </p>
        </div>
      </FadeInSection>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-structure/20 shadow-lg transition-all duration-200 ${
            canScrollLeft
              ? 'opacity-100 hover:bg-white hover:scale-110 cursor-pointer'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-text-primary" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm border border-structure/20 shadow-lg transition-all duration-200 ${
            canScrollRight
              ? 'opacity-100 hover:bg-white hover:scale-110 cursor-pointer'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-text-primary" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`overflow-x-auto overflow-y-hidden scrollbar-hide ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollSnapType: prefersReducedMotion ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex gap-6 pb-4">
            {images.map((image, index) => (
              <FadeInSection key={index} delay={200 + index * 50} direction="up">
                <div
                  className="flex-shrink-0 group"
                  style={{
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always',
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-structure/20 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:border-structure/40">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      draggable="false"
                      className="w-[320px] h-[400px] md:w-[380px] md:h-[480px] lg:w-[420px] lg:h-[520px] object-cover select-none transition-transform duration-500 group-hover:scale-105"
                      style={{ userSelect: 'none' }}
                    />
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="font-satoshi text-sm text-white font-medium">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-6 text-center">
          <p className="font-satoshi text-xs text-text-muted uppercase tracking-wider">
            Drag or use arrows to explore
          </p>
        </div>
      </div>
    </Section>
  );
}

export const ImageGallery = memo(ImageGalleryBase);
export default ImageGallery;
