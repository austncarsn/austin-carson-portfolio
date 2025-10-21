import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { memo } from 'react';

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
  order,
}: ProjectCardProps) {
  return (
  <article className="group relative bg-surface border border-structure overflow-hidden transition-transform duration-300 hover:border-brand/30 hover:translate-y-[-3px] hover:shadow-none">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Left accent border - animates on hover */}
  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand transform scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
      
  {/* Top corner decorative element */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-brand opacity-[0.02] rounded-full blur-3xl transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-700" />

      <div className="relative p-8 md:p-12">
        {/* Numeric order badge */}
        
        {/* Header Section */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="flex-1">
            {/* Category & Year */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-['Satoshi'] text-[11px] tracking-[0.1em] uppercase text-brand font-semibold">
                {category}
              </span>
              <div className="w-[2px] h-[2px] bg-structure rounded-full" />
              <span className="font-['Satoshi'] text-[11px] tracking-[0.08em] uppercase text-text-muted font-medium">
                {year}
              </span>
            </div>

            {/* Title */}
            {role && (
              <div className="mb-2">
                <span className="font-['Satoshi'] text-[12px] text-text-muted">{role}</span>
              </div>
            )}

            <h3 className="font-['Satoshi'] text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.01em] text-text-primary mb-4 transition-all duration-500 group-hover:text-brand">
              {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
              <p className="font-['Satoshi'] text-[14px] leading-[1.6] text-text-muted max-w-[680px] mb-2">
                {subtitle}
              </p>
            )}

            {/* Description */}
            <p className="font-['Satoshi'] text-[16px] leading-[1.7] text-text-muted max-w-[680px]">
              {description}
            </p>
          </div>

          {/* Year Badge - Large */}
          <div className="hidden md:flex items-center justify-center w-20 h-20 border border-structure bg-paper transition-all duration-500 group-hover:border-brand group-hover:bg-white">
            <span className="font-['Satoshi'] text-[18px] font-medium text-text-primary tracking-tight">
              '{year.slice(-2)}
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="relative h-[1px] bg-structure my-8">
          <div className="absolute left-0 top-0 h-full bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" 
            style={{ width: '80px' }}
          />
        </div>

        {/* Action Buttons */}
  <div className="flex flex-wrap items-center gap-4">
          {id && (
            <Link
              to={`/project/${id}`}
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-['Satoshi'] font-semibold text-[14px] tracking-[0.02em] px-4 py-3 bg-dark text-white transition-all duration-300 hover:bg-brand hover:gap-3"
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
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-['Satoshi'] font-medium text-[14px] tracking-[0.02em] px-4 py-3 border border-structure text-text-muted transition-all duration-300 hover:border-brand hover:text-text-primary hover:bg-paper"
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
              className="group/btn inline-flex w-full md:w-auto justify-center items-center gap-2 font-['Satoshi'] font-medium text-[14px] tracking-[0.02em] px-4 py-3 border border-structure text-text-muted transition-all duration-300 hover:border-dark hover:text-text-primary hover:bg-white"
            >
              <Github className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              GITHUB
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line - expands on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </article>
  );
});