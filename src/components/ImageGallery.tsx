import { useRef, useState, useEffect, memo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { AccentRow } from './AccentRow';
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
          {/* Decorative perforated section below gallery description - perfectly centered and responsive */}
          <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
            <div className="flex items-center justify-center py-4 sm:py-5 md:py-6">
              <AccentRow tone="graphite" gap={44} studSize={24} showFade={true} />
            </div>
          </div>
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

        {/* Scrollable Container - Inset Recessed Treatment */}
        <div
          className="relative"
          style={{
            backgroundColor: 'hsl(30, 20%, 93.5%)',
            borderRadius: '16px',
            padding: '8px',
            boxShadow: `
              inset 0 2px 12px rgba(0, 0, 0, 0.13),
              inset 0 -1px 8px rgba(255, 255, 255, 0.10)
            `,
          }}
        >
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
              scrollSnapType: 'none',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '12px',
            }}
          >
            <div className="flex gap-0">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0"
              >
                <div className={`relative overflow-hidden bg-canvas ${image.frameClass ?? ''}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    draggable="false"
                    className="h-[400px] md:h-[500px] lg:h-[600px] w-auto object-contain select-none block"
                    style={{ userSelect: 'none' }}
                  />
                </div>
              </div>
            ))}
          </div>
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
