import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

interface ProjectCardProps {
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
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the card is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const groupClasses = isInView ? 'group-active' : '';
  const hoverClasses = isInView ? 'border-brand/30 -translate-y-1' : '';
  const accentClasses = isInView ? 'scale-y-100' : 'scale-y-0';
  const cornerClasses = isInView ? 'translate-x-8 -translate-y-8' : 'translate-x-16 -translate-y-16';
  const titleClasses = isInView ? 'text-brand' : '';
  const yearBadgeClasses = isInView ? 'border-brand bg-white' : '';
  const dividerClasses = isInView ? 'scale-x-100' : 'scale-x-0';
  const bottomAccentClasses = isInView ? 'scale-x-100' : 'scale-x-0';

  return (
  <article ref={cardRef} className={`group relative bg-surface border border-structure overflow-hidden transition-all duration-500 ${hoverClasses}`} style={{ willChange: 'transform' }}>
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none project-card-grid" />
      
      {/* Left accent border - animates on scroll */}
  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-brand transform transition-transform duration-700 origin-top ${accentClasses}`} />
      
  {/* Top corner decorative element */}
  <div className={`absolute top-0 right-0 w-32 h-32 bg-brand opacity-[0.02] rounded-full blur-3xl transform transition-transform duration-700 ${cornerClasses}`} />

      <div className="relative p-6 md:p-12">
        {/* Responsive preview image: top on mobile, left on md+ */}
        {previewImage ? (
          <div className="mb-4 md:mb-0 md:mr-6 md:float-left md:w-48 md:h-48">
            <img src={previewImage} alt={`${title} preview`} className="w-full h-40 md:h-48 object-cover rounded-md shadow-sm" />
          </div>
        ) : null}
        
        {/* Numeric order badge */}
        
        {/* Header Section */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            {/* Category & Year */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-satoshi text-[11px] tracking-[0.1em] uppercase text-brand font-semibold">
                {category}
              </span>
              <div className="w-[2px] h-[2px] bg-structure rounded-full" />
              <span className="font-satoshi text-[11px] tracking-[0.08em] uppercase text-text-muted font-medium">
                {year}
              </span>
            </div>

            {/* Title */}
            {role && (
              <div className="mb-2">
                <span className="font-satoshi text-[12px] text-text-muted">{role}</span>
              </div>
            )}

            <h3 className={`font-satoshi text-h4 md:text-h3 lg:text-h2 leading-[1.2] tracking-[-0.01em] text-text-primary mb-4 transition-colors duration-500 ${titleClasses}`}>
              {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
              <p className="font-plex text-sm leading-[1.6] text-text-muted max-w-[680px] mb-2">
                {subtitle}
              </p>
            )}

            {/* Description */}
            <p className="font-plex text-base leading-[1.7] text-text-muted max-w-[680px]">
              {description}
            </p>
          </div>

          {/* Year Badge - Large */}
          <div className={`hidden md:flex items-center justify-center w-20 h-20 border border-structure bg-paper transition-all duration-500 ${yearBadgeClasses}`}>
            <span className="font-satoshi text-base font-medium text-text-primary tracking-tight">
              '{year.slice(-2)}
            </span>
          </div>
        </div>

  {/* Divider Line */}
        <div className="relative h-[1px] bg-structure my-8">
          <div className={`absolute left-0 top-0 h-full bg-brand transform transition-transform duration-700 origin-left ${dividerClasses}`} 
            style={{ width: '80px' }}
          />
        </div>

  {/* Action Buttons */}
  <div className="flex flex-wrap items-center gap-4">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-semibold text-[14px] tracking-[0.02em] px-4 py-3 bg-dark text-text-on-dark transition-colors duration-300 hover:bg-brand hover:gap-3"
              style={{ WebkitFontSmoothing: 'antialiased' }}
            >
              VIEW DETAILS
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          )}
          
          {liveUrl && liveUrl !== '#' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-medium text-[14px] tracking-[0.02em] px-4 py-3 border border-structure text-text-muted transition-colors duration-300 hover:border-brand hover:text-text-primary hover:bg-paper"
            >
              LIVE DEMO
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          )}

          {githubUrl && githubUrl !== '#' && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-medium text-[14px] tracking-[0.02em] px-4 py-3 border border-structure text-text-muted transition-colors duration-300 hover:border-dark hover:text-text-primary hover:bg-white"
            >
              <Github className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              GITHUB
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line - expands on scroll */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-brand transform transition-transform duration-700 origin-left ${bottomAccentClasses}`} />
    </article>
  );
});