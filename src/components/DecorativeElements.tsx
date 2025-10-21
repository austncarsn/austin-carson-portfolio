/* ==========================================================================
   Decorative Elements — Optimized geometric shapes
   ========================================================================== */

import { memo } from 'react';

export const FloatingDot = memo(function FloatingDot({ 
  top, 
  left, 
  size = 4, 
  delay = 0,
  className = '' 
}: { 
  top: string; 
  left: string; 
  size?: number; 
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full bg-brand opacity-20 ${className}`}
      style={{
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        animation: `float 6s ease-in-out infinite ${delay}s`,
        willChange: 'transform'
      }}
    />
  );
});

export const CornerAccent = memo(function CornerAccent({ 
  position = 'top-left',
  size = 80,
  className = ''
}: { 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}) {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${className}`}>
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

export const LineAccent = memo(function LineAccent({ 
  orientation = 'horizontal',
  width = '100%',
  height = '2px',
  className = ''
}: {
  orientation?: 'horizontal' | 'vertical';
  width?: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-r from-transparent via-var(--brand) to-transparent opacity-20 ${className}`}
      style={{
        width: orientation === 'horizontal' ? width : height,
        height: orientation === 'horizontal' ? height : width,
        transform: orientation === 'vertical' ? 'rotate(90deg)' : 'none'
      }}
    />
  );
});

export const CircleBlur = memo(function CircleBlur({ 
  size = 200,
  color = 'var(--brand)',
  opacity = 0.03,
  blur = 'blur-3xl',
  className = ''
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
        opacity
      }}
    />
  );
});