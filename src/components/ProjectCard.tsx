import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import React, { memo, useRef, useEffect, useState, KeyboardEvent } from 'react';
import { useInView } from '@/hooks/useInView';
import { Aspect } from './Aspect';

// --- Consolidated Components ---

// Originally from ProjectCardImage.tsx
function ProjectCardImage({ previewImage, title }: {
  previewImage?: string;
  title: string;
}) {
  if (!previewImage) return null;

  return (
    <Aspect ratio="4:3" objectFit="cover" className="absolute inset-0 z-0" rounded="none">
      <img
        src={previewImage}
        alt={`${title} preview`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-center"
        style={{ filter: 'saturate(1.1) contrast(1.08)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
    </Aspect>
  );
}

// Originally from ProjectCardMeta.tsx
function ProjectCardMeta({ category, year, role, title, subtitle, description }: {
  category: string;
  year: string;
  role?: string;
  title: string;
  subtitle?: string;
  description: string;
}) {
  return (
    <div className="flex-1 relative z-10">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <span className="font-satoshi font-semibold text-overline tracking-widest uppercase text-[#C9CED6]">
          {category}
        </span>
        <div className="w-[3px] h-[3px] rounded-full bg-white/30" />
        <span className="font-satoshi font-medium text-overline tracking-wide uppercase text-white/60">
          {year}
        </span>
      </div>

      {role && (
        <div className="mb-3">
          <span className="font-satoshi font-medium text-caption text-[#C9CED6] bg-white/5 px-2.5 py-1 rounded">{role}</span>
        </div>
      )}

      <h3 className="font-satoshi font-bold text-h3 leading-tight tracking-tight mb-3 sm:mb-4 text-[#E9EEF3]">
        {title}
      </h3>

      {subtitle && (
        <p className="font-satoshi font-medium text-body-sm leading-relaxed mb-3 text-white/80">
          {subtitle}
        </p>
      )}

      <p className="font-satoshi font-normal text-body-sm leading-relaxed text-white/70">
        {description}
      </p>
    </div>
  );
}

// Originally from ProjectCardActions.tsx
function ProjectCardActions({ id, liveUrl, githubUrl }: {
  id?: string;
  liveUrl?: string;
  githubUrl?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 z-10">
      {id && (
        <Link
          to={`/project/${id}`}
          onClick={(e) => e.stopPropagation()}
          className="group/btn inline-flex items-center justify-center gap-2 font-satoshi font-semibold text-body-sm tracking-wide px-6 py-3 bg-white text-[#0B0D0F] rounded-lg transition-all duration-base hover:bg-[#E9EEF3] hover:shadow-lg active:bg-white/90 md:hover:gap-2.5 touch-manipulation whitespace-nowrap"
          style={{ WebkitFontSmoothing: 'antialiased' }}
        >
          VIEW DETAILS
          <ArrowRight className="w-4 h-4 transition-transform duration-base md:group-hover/btn:translate-x-0.5" />
        </Link>
      )}
      {liveUrl && liveUrl !== '#' && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group/btn inline-flex items-center justify-center gap-2 font-satoshi font-semibold text-body-sm tracking-wide px-6 py-3 border-2 border-white/20 text-white bg-transparent rounded-lg transition-all duration-base hover:border-white/40 hover:bg-white/5 hover:shadow-md active:bg-white/10 touch-manipulation whitespace-nowrap"
          style={{ WebkitFontSmoothing: 'antialiased' }}
        >
          LIVE DEMO
          <ExternalLink className="w-4 h-4 transition-transform duration-base md:group-hover/btn:-translate-y-0.5 md:group-hover/btn:translate-x-0.5" />
        </a>
      )}
      {githubUrl && githubUrl !== '#' && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group/btn inline-flex items-center justify-center gap-2 font-satoshi font-semibold text-body-sm tracking-wide px-6 py-3 bg-white/10 text-white border border-white/10 rounded-lg transition-all duration-base hover:bg-white/15 hover:border-white/20 hover:shadow-md active:bg-white/20 touch-manipulation whitespace-nowrap"
          style={{ WebkitFontSmoothing: 'antialiased' }}
        >
          <Github className="w-4 h-4 transition-transform duration-base md:group-hover/btn:rotate-12" />
          GITHUB
        </a>
      )}
    </div>
  );
}

// --- Main ProjectCard Component ---

export interface ProjectCardProps {
  id?: string;
  title: string;
  category: string;
  year: string;
  role?: string;
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  subtitle?: string;
  order?: number;
  previewImage?: string;
}

export const ProjectCard = memo(function ProjectCard({
  id,
  title,
  category,
  year,
  role,
  description,
  subtitle,
  liveUrl,
  githubUrl,
  previewImage,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const flipButtonRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.3, rootMargin: '-50px 0px' });

  const rafRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [flipped, setFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [buttonTransform, setButtonTransform] = useState({ x: 0, y: 0 });

  // Detect mobile for touch optimizations
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function handleKeyToggle(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlipped(v => !v);
    } else if (e.key === 'Escape' && flipped) {
      e.preventDefault();
      setFlipped(false);
    }
  }

  function handleFlip(e: React.MouseEvent) {
    if (!flipped) {
      e.stopPropagation();
      setFlipped(true);
    }
  }

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const maxOffset = isMobile ? 8 : 18; // Reduced parallax on mobile for performance

    function update() {
      rafRef.current = null;
      if (!el) return;

      if (!isInView) {
        offsetRef.current = 0; // Reset to neutral position when out of view
        el.style.transform = `translate3d(0, ${offsetRef.current}px, 0)`;
        return;
      }

      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const vpCenter = window.innerHeight / 2;
      const distance = elCenter - vpCenter;
      const normalized = Math.max(-1, Math.min(1, distance / (window.innerHeight / 1.2)));
      const target = normalized * maxOffset;
      const prev = offsetRef.current || 0;
      const ease = 0.12;
      const next = prev + (target - prev) * ease;
      offsetRef.current = next;
      el.style.transform = `translate3d(0, ${next}px, 0)`;
    }

    function onScroll() {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isInView, isMobile]);

  // Magnetic button effect - reaches towards cursor
  useEffect(() => {
    if (!cardRef.current || !flipButtonRef.current || flipped || isMobile) return;

    const card = cardRef.current;
    const button = flipButtonRef.current;

    function handleMouseMove(e: MouseEvent) {
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // Magnetic effect radius (pixels)
      const magneticRadius = 150;

      if (distance < magneticRadius) {
        // Calculate magnetic pull strength (stronger when closer)
        const strength = Math.max(0, 1 - distance / magneticRadius);
        const maxPull = 12; // Maximum pixels to pull
        
        const pullX = (distanceX / distance) * strength * maxPull;
        const pullY = (distanceY / distance) * strength * maxPull;

        setButtonTransform({ x: pullX, y: pullY });
      } else {
        setButtonTransform({ x: 0, y: 0 });
      }
    }

    function handleMouseLeave() {
      setButtonTransform({ x: 0, y: 0 });
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [flipped, isMobile]);

  return (
    <article
      ref={cardRef}
      tabIndex={0}
      role={!flipped ? "button" : undefined}
      aria-expanded={flipped}
      aria-label={!flipped ? `Flip to view ${title} details` : undefined}
      onKeyDown={handleKeyToggle}
      onClick={handleFlip}
      className={`group relative overflow-hidden bg-[#1A1D21] text-white transition-all duration-slower ease-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${!flipped ? 'cursor-pointer' : ''}`}
      style={{ 
        willChange: 'transform, opacity', 
        opacity: isInView ? 1 : 0, 
        perspective: isMobile ? 1000 : 1200,
        touchAction: 'manipulation',
        borderRadius: isMobile ? '12px' : '20px',
        boxShadow: 'inset 0 10px 24px rgba(0,0,0,0.18), inset 0 -4px 12px rgba(255,255,255,0.10), 0 12px 28px rgba(0,0,0,0.16)',
        border: '1px solid rgba(255,255,255,0.06)',
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
      }}
      onMouseEnter={(e) => {
        if (!isMobile && e.currentTarget instanceof HTMLElement) {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
          e.currentTarget.style.boxShadow = 'inset 0 10px 24px rgba(0,0,0,0.18), inset 0 -4px 12px rgba(255,255,255,0.10), 0 12px 28px rgba(0,0,0,0.14)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile && e.currentTarget instanceof HTMLElement) {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = 'inset 0 10px 24px rgba(0,0,0,0.18), inset 0 -4px 12px rgba(255,255,255,0.10), 0 12px 28px rgba(0,0,0,0.16)';
        }
      }}
    >
      {/* 3D inner wrapper */}
      <div
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d', 
          transition: isMobile ? 'transform 600ms ease-out' : 'transform 700ms cubic-bezier(.2,.9,.3,1)', 
          transform: flipped ? 'rotateY(180deg)' : 'none' 
        }}
      >
        {/* Front: preview */}
        <div
          className="card-face front relative w-full bg-[#1A1D21] overflow-hidden cursor-pointer"
          style={{ 
            backfaceVisibility: 'hidden',
            minHeight: isMobile ? '280px' : '400px',
            aspectRatio: isMobile ? '4 / 3' : '16 / 10',
            borderRadius: isMobile ? '12px' : '20px',
          }}
        >
          <ProjectCardImage previewImage={previewImage} title={title} />

          {/* Project title overlay on front */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/75 to-transparent z-10">
            <h3 className="font-satoshi font-bold text-h2 md:text-h1 text-[#E9EEF3] mb-2 leading-tight tracking-tight">
              {title}
            </h3>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-[#C9CED6] text-caption font-satoshi font-medium uppercase tracking-wide">{category}</span>
              <span className="text-white/30 text-body-sm">•</span>
              <span className="text-white/60 text-caption font-satoshi font-normal">{year}</span>
            </div>
          </div>

          {/* Flip hint - Modern squircle button in bottom-right with magnetic effect */}
          <div 
            ref={flipButtonRef}
            className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 pointer-events-none z-20"
            style={{
              transform: `translate(${buttonTransform.x}px, ${buttonTransform.y}px)`,
              transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          >
            <button
              className="group/btn relative h-14 w-14 sm:h-16 sm:w-16 bg-white/20 backdrop-blur-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 pointer-events-auto active:scale-95 overflow-hidden"
              style={{
                borderRadius: '18px',
                clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.15), 0 12px 32px rgba(0,0,0,0.20), 0 0 0 1px rgba(255,255,255,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                  e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }
              }}
              aria-label="View project details"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(true);
              }}
            >
              {/* Inner glass shine */}
              <span 
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-90 group-hover/btn:opacity-100 transition-opacity"
              ></span>
              
              {/* Bottom edge highlight */}
              <span 
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white/20 to-transparent"
              ></span>
              
              {/* Sparkle/Star icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  width={isMobile ? "20" : "24"} 
                  height={isMobile ? "20" : "24"} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all duration-200 group-hover/btn:scale-110 group-hover/btn:rotate-12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Back: meta + actions */}
        <div
          className="card-face back absolute inset-0 bg-[#1A1D21] overflow-hidden"
          style={{ 
            transform: 'rotateY(180deg)', 
            backfaceVisibility: 'hidden',
            minHeight: isMobile ? '280px' : '400px',
            aspectRatio: isMobile ? '4 / 3' : '16 / 10',
            pointerEvents: flipped ? 'auto' : 'none',
            zIndex: flipped ? 10 : 1,
            borderRadius: isMobile ? '12px' : '20px',
            boxShadow: 'inset 0 10px 24px rgba(0,0,0,0.18), inset 0 -4px 12px rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
          aria-hidden={!flipped}
        >
          {/* Subtle grain texture */}
          <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-soft-light pointer-events-none" 
            style={{
              backgroundImage: 'radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 60%, #fff, transparent)',
              backgroundSize: '100px 100px',
            }}
          />
          
          <div className="relative h-full flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto touch-pan-y scroll-smooth px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 md:pt-10 pr-12 sm:pr-16">
              <ProjectCardMeta
                category={category}
                year={year}
                role={role}
                title={title}
                subtitle={subtitle}
                description={description}
              />
            </div>

            <div className="flex-shrink-0 px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10 pt-6 bg-gradient-to-t from-[#1A1D21] via-[#1A1D21]/95 to-transparent backdrop-blur-sm">
              <ProjectCardActions id={id} liveUrl={liveUrl} githubUrl={githubUrl} />
            </div>

            {/* Back to front button - modern shape in same position */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
              className="group/back absolute bottom-4 right-4 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 bg-white/20 backdrop-blur-xl transition-all duration-300 hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:scale-95 overflow-hidden"
              style={{
                borderRadius: '18px',
                clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
              }}
              aria-label="Back to preview"
            >
              {/* Inner glass shine */}
              <span 
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-90 group-hover/back:opacity-100 transition-opacity"
              ></span>
              
              {/* Bottom edge highlight */}
              <span 
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-white/20 to-transparent"
              ></span>
              
              {/* Rotating arrow icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width={isMobile ? "22" : "26"} 
                  height={isMobile ? "22" : "26"} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all group-hover/back:scale-110 group-hover/back:-rotate-180"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProjectCard;