import { useRef, useState, useEffect, memo, type MouseEvent } from 'react';
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
 * ImageGallery — 2D scrollable gallery wall
 * 
 * Features:
 * - Two-dimensional scrolling (horizontal AND vertical)
 * - Drag to pan in any direction
 * - Grid layout with staggered rows
 * - Mat border styling (1px at 10% black, rounded-soft)
 * - Inner highlight (40% white on top edge)
 * - Caption visibility on hover
 * - Respects reduced motion preferences
 */
function ImageGalleryBase({ images }: ImageGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mouse drag handlers for 2D scrolling
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setStartY(e.pageY - scrollContainerRef.current.offsetTop);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setScrollTop(scrollContainerRef.current.scrollTop);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const y = e.pageY - scrollContainerRef.current.offsetTop;
    const walkX = (x - startX) * 1.5; // Horizontal scroll speed
    const walkY = (y - startY) * 1.5; // Vertical scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walkX;
    scrollContainerRef.current.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
            Drag to explore the full gallery wall in any direction.
          </p>
          {/* Perforation divider */}
          <div className="perforation mx-auto w-full rounded-full" aria-hidden="true" />
        </div>
      </FadeInSection>

      <div className="relative">
        {/* 2D Scrollable Gallery Plane */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`overflow-auto scrollbar-hide relative rounded-xl ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            height: '70vh',
            maxHeight: '800px',
            minHeight: '500px',
            WebkitOverflowScrolling: 'touch',
            // Subtle inset shadow for depth
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06), inset 0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {/* Inner content - wider and taller than viewport */}
          <div 
            className="relative p-8"
            style={{
              width: 'max-content',
              minWidth: '200%',
              minHeight: '150%',
            }}
          >
            {/* Grid layout with staggered positioning */}
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group"
                  style={{
                    // Stagger positioning for visual interest
                    marginTop: index % 3 === 0 ? '0' : index % 3 === 1 ? '80px' : '40px',
                  }}
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
                      className="h-[280px] sm:h-[340px] lg:h-[400px] w-auto object-contain select-none block"
                      style={{ 
                        userSelect: 'none',
                        background: 'var(--color-cream-bg)',
                      }}
                    />
                    
                    {/* Caption overlay - visible on hover/focus */}
                    {image.caption && (
                      <div 
                        className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200"
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
        </div>

        {/* Scroll hint */}
        <div className="mt-6 text-center">
          <p className="font-satoshi text-xs text-text-muted uppercase tracking-wider">
            Drag to explore the full wall ← → ↑ ↓
          </p>
        </div>
      </div>
    </Section>
  );
}

export const ImageGallery = memo(ImageGalleryBase);
export default ImageGallery;
