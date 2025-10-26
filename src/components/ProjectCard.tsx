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
  <article ref={cardRef} className={`group relative bg-paper border border-structure rounded-md overflow-hidden transition-all duration-500 ${hoverClasses}`} style={{ willChange: 'transform' }}>
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none project-card-grid" />
      
      {/* Left accent border - animates on scroll */}
  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand to-accent transform transition-transform duration-700 origin-top ${accentClasses}`} />
      
  {/* Top corner decorative element */}
  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-400 to-accent-400 opacity-[0.025] rounded-full blur-3xl transform transition-transform duration-700 ${cornerClasses}`} />

      <div className="relative p-8 md:p-14">
        {/* Responsive preview image: top on mobile, left on md+ */}
        {previewImage ? (
          <div className="mb-6 md:mb-0 md:mr-8 md:float-left md:w-56 md:h-56">
            <img src={previewImage} alt={`${title} preview`} className="w-full h-44 md:h-56 object-cover rounded-sm border border-structure" />
          </div>
        ) : null}
        
        {/* Numeric order badge */}
        
        {/* Header Section */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            {/* Category & Year */}
            <div className="flex items-center gap-3 mb-5">
              <span className="font-satoshi text-xs tracking-wider uppercase text-brand font-semibold">
                {category}
              </span>
              <div className="w-[3px] h-[3px] bg-brand/40 rounded-full" />
              <span className="font-satoshi text-xs tracking-wide uppercase text-text-muted font-medium">
                {year}
              </span>
            </div>

            {/* Title */}
            {role && (
              <div className="mb-3">
                <span className="font-satoshi text-sm text-text-muted">{role}</span>
              </div>
            )}

            <h3 className={`font-satoshi text-h4 md:text-h3 lg:text-h2 leading-tight tracking-tight text-text-primary mb-5 transition-colors duration-500 ${titleClasses}`}>
              {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
              <p className="font-satoshi text-body-sm leading-relaxed text-text-secondary max-w-[680px] mb-3">
                {subtitle}
              </p>
            )}

            {/* Description */}
            <p className="font-satoshi text-base leading-relaxed text-text-muted max-w-[680px]">
              {description}
            </p>
          </div>

          {/* Year Badge - Large */}
          <div className={`hidden md:flex items-center justify-center w-24 h-24 rounded-sm border-2 border-structure bg-surface transition-all duration-500 ${yearBadgeClasses}`}>
            <span className="font-satoshi text-body-lg font-semibold text-text-primary tracking-tight">
              '{year.slice(-2)}
            </span>
          </div>
        </div>

  {/* Divider Line */}
        <div className="relative h-[2px] bg-structure/50 my-8 rounded-full">
          <div className={`absolute left-0 top-0 h-full bg-gradient-to-r from-brand via-accent to-transparent rounded-full transform transition-transform duration-700 origin-left ${dividerClasses}`} 
            style={{ width: '120px' }}
          />
        </div>

  {/* Action Buttons */}
  <div className="flex flex-wrap items-center gap-4">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-semibold text-sm tracking-wide px-6 py-3.5 bg-dark text-text-on-dark rounded-md transition-all duration-base hover:bg-brand hover:gap-3 hover:shadow-md"
              style={{ WebkitFontSmoothing: 'antialiased' }}
            >
              VIEW DETAILS
              <ArrowRight className="w-4 h-4 transition-transform duration-base group-hover/btn:translate-x-0.5" />
            </Link>
          )}
          
          {liveUrl && liveUrl !== '#' && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-medium text-sm tracking-wide px-6 py-3.5 border-2 border-structure text-text-muted rounded-md transition-all duration-base hover:border-brand hover:text-text-primary hover:bg-elevated hover:shadow-sm"
            >
              LIVE DEMO
              <ExternalLink className="w-3.5 h-3.5 transition-transform duration-base group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          )}

          {githubUrl && githubUrl !== '#' && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-satoshi font-medium text-sm tracking-wide px-6 py-3.5 border-2 border-structure text-text-muted rounded-md transition-all duration-base hover:border-dark hover:text-text-primary hover:bg-elevated hover:shadow-sm"
            >
              <Github className="w-4 h-4 transition-transform duration-base group-hover/btn:rotate-12" />
              GITHUB
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line - expands on scroll */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand via-accent to-transparent rounded-full transform transition-transform duration-700 origin-left ${bottomAccentClasses}`} />
    </article>
  );
});