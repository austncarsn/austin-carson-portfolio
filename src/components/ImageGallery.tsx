import { useRef, useState, useEffect, memo, type MouseEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import Section from './Section';
import FadeInSection from './FadeInSection';

interface ImageGalleryProps {
  images: ReadonlyArray<{
    readonly src: string;
    readonly alt: string;
    readonly caption?: string;
    readonly frameClass?: string;
  }>;
}

/**
 * ImageGallery — Horizontal scrolling gallery with mat borders
 * 
 * Features:
 * - Refined thumb heights (SM: 280px, MD: 340px, LG: 420px)
 * - Mat border styling (1px at 10% black, rounded-soft)
 * - Inner highlight (40% white on top edge)
 * - Native horizontal scroll with snap-x snap-mandatory
 * - Caption visibility on :focus-within only
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
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
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
      bgClass="bg-canvas"
      labelNumber="03"
      labelTitle="GALLERY"
      labelDelay={0}
      className="relative"
    >
      <FadeInSection delay={100} direction="up">
        <div className="mb-12 sm:mb-14 md:mb-16">
          <h2 className="font-satoshi font-bold text-h3 md:text-h2 text-text-primary mb-4">
            Visual Wall
          </h2>
          <p className="font-satoshi text-body-lg text-text-muted max-w-2xl mb-10 sm:mb-12">
            Explore the full gallery wall by scrolling horizontally.
          </p>
          {/* Perforation divider */}
          <div className="perforation mx-auto w-full rounded-full" aria-hidden="true" />
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

        {/* Horizontal Gallery Rail */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`overflow-x-auto overflow-y-hidden scrollbar-hide relative ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollSnapType: prefersReducedMotion ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex gap-6 px-1 py-1">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 scroll-snap-start group"
                tabIndex={0}
                role="img"
                aria-label={image.alt}
              >
                {/* Mat border frame */}
                <div 
                  className="relative overflow-hidden rounded-soft"
                  style={{
                    border: '1px solid color-mix(in oklch, black 10%, transparent)',
                    boxShadow: 'inset 0 1px 0 color-mix(in oklch, white 40%, transparent), 0 2px 8px color-mix(in oklch, black 8%, transparent)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    draggable="false"
                    className="h-[280px] sm:h-[340px] lg:h-[420px] w-auto object-contain select-none block"
                    style={{ 
                      userSelect: 'none',
                      background: 'var(--color-cream-bg)',
                    }}
                  />
                  
                  {/* Caption overlay - visible on focus-within only */}
                  {image.caption && (
                    <div 
                      className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200"
                      style={{
                        background: 'linear-gradient(to top, color-mix(in oklch, black 80%, transparent), transparent)',
                      }}
                    >
                      <p className="text-sm font-medium text-white">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-6 text-center">
          <p className="font-satoshi text-xs text-text-muted uppercase tracking-wider">
            Drag to explore the full wall
          </p>
        </div>
      </div>
    </Section>
  );
}

export const ImageGallery = memo(ImageGalleryBase);
export default ImageGallery;
