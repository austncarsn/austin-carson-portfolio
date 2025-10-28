import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { ProjectCardProps } from './ProjectCard';

/* ------------------- Helpers ------------------- */

const useReducedMotion = () => usePrefersReducedMotion();

/* ------------------- FloatingDot ------------------- */

export const FloatingDot = memo(function FloatingDot({
  top,
  left,
  size = 4,
  delay = 0,
  className = '',
}: {
  top: string;
  left: string;
  size?: number;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`absolute rounded-full bg-brand opacity-20 floating-dot ${className}`}
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        animation: reduced ? 'none' : `float 6s ease-in-out infinite ${delay}s`,
        willChange: 'transform',
      }}
    />
  );
});

/* ------------------- CornerAccent ------------------- */

const cornerPositions = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
};

export const CornerAccent = memo(function CornerAccent({
  position = 'top-left',
  size = 80,
  className = '',
}: {
  position?: keyof typeof cornerPositions;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`absolute ${cornerPositions[position]} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <path
          d="M0 0 L80 0 L80 2 L2 2 L2 80 L0 80 Z"
          fill="var(--brand)"
          opacity="0.15"
        />
      </svg>
    </div>
  );
});

/* ------------------- LineAccent ------------------- */

export const LineAccent = memo(function LineAccent({
  orientation = 'horizontal',
  width = '100%',
  height = '2px',
  className = '',
}: {
  orientation?: 'horizontal' | 'vertical';
  width?: string;
  height?: string;
  className?: string;
}) {
  const style = {
    width: orientation === 'horizontal' ? width : height,
    height: orientation === 'horizontal' ? height : width,
    transform: orientation === 'vertical' ? 'rotate(90deg)' : undefined,
  };

  return (
    <div
      className={`bg-gradient-to-r from-transparent via-var(--brand) to-transparent opacity-20 ${className}`}
      style={style}
    />
  );
});

/* ------------------- CircleBlur ------------------- */

export const CircleBlur = memo(function CircleBlur({
  size = 200,
  color = 'var(--brand)',
  opacity = 0.03,
  blur = 'blur-3xl',
  className = '',
}: {
  size?: number;
  color?: string;
  opacity?: number;
  blur?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full ${blur} pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity,
      }}
    />
  );
});
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { memo, useRef, useState } from 'react';

import { useInView } from '@/hooks/useInView';

/* ------------------- Styles that handle the border ------------------- */

const cardBase = `
  group relative bg-paper border border-slate-700/50 rounded-md overflow-hidden
  transition-all duration-700 hover:border-[var(--brand-hover)]
`;

// glow layer intentionally disabled to remove mouse-tracking flashlight effect
const glowLayer = `absolute inset-0 opacity-0 pointer-events-none rounded-md transition-opacity duration-300`;

const leftAccent = `
  absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand to-accent
  transition-all duration-700 origin-top
`;

const bottomAccent = `
  absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-l from-brand via-accent to-transparent
  transition-all duration-700 origin-right
`;

/* ------------------- Main component ------------------- */

export const ProjectCard = memo(function ProjectCard(props: ProjectCardProps) {
  const { id, title, category, year, role, description, subtitle, liveUrl, githubUrl, previewImage } = props;
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { threshold: 0.3, rootMargin: '-50px 0px' });
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    willChange: 'transform, opacity',
    transform: isInView
      ? 'translate3d(0, 0, 0) scale(1)'
      : 'translate3d(0, 60px, 0) scale(0.95)',
    opacity: isInView ? 1 : 0,
  } as React.CSSProperties;

  return (
    <article
      ref={cardRef}
      className={cardBase}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* dynamic glow removed */}

      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none project-card-grid" />

      {/* Left accent border – pseudo‑element */}
      <div
        className={leftAccent}
        style={{ transform: isInView ? 'scaleY(1)' : 'scaleY(0)' }}
      />

      {/* Top corner decorative element (unchanged) */}
      <div
        className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-brand-400 to-accent-400 opacity-[0.025] rounded-full blur-3xl transition-all duration-700"
        style={{
          transform: isInView ? 'translate(2rem, -2rem)' : 'translate(4rem, -4rem)',
        }}
      />

      {/* Card content – unchanged for brevity */}
      <div className="relative p-10 md:p-16">
        {/* … (same image, header, description, buttons) … */}
      </div>

      {/* Bottom accent line – pseudo‑element */}
      <div
        className={bottomAccent}
        style={{
          transform: isInView ? 'scaleX(1)' : 'scaleX(0)',
        }}
      />
    </article>
  );
});