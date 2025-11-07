import { memo } from 'react';

interface RhythmBarProps {
  label?: string;
  className?: string;
}

/**
 * RhythmBar — Branded rhythm divider with dot pattern and edge fade
 * 
 * Features:
 * - 1px baseline with 8px dots every 32px at 18% opacity
 * - Edge fade gradient (0% opacity at edges, 64px fade zones)
 * - Optional uppercase label with left accent rule
 * - Responsive spacing and full-bleed layout
 */
function RhythmBarBase({ label = 'GALLERY', className = '' }: RhythmBarProps) {
  return (
    <div className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden ${className}`}>
      <div className="flex items-center justify-center py-8 sm:py-10 md:py-12">
        <div className="relative w-full max-w-[1400px] px-4">
          {/* Dot pattern baseline */}
          <div 
            className="relative h-[1px] w-full"
            style={{
              background: `repeating-linear-gradient(
                to right,
                transparent,
                transparent 12px,
                color-mix(in oklch, var(--color-ink) 18%, transparent) 12px,
                color-mix(in oklch, var(--color-ink) 18%, transparent) 20px
              )`,
              // Edge fade mask
              maskImage: 'linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 64px, black calc(100% - 64px), transparent 100%)',
            }}
          />

          {/* Label */}
          {label && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
              {/* Left accent rule */}
              <div 
                className="w-4 h-[1px]"
                style={{ background: 'var(--color-accent-mint)' }}
              />
              
              {/* Label text */}
              <span 
                className="text-sm uppercase font-medium"
                style={{
                  color: 'color-mix(in oklch, var(--color-ink) 62%, transparent)',
                  letterSpacing: '0.08em',
                  background: 'var(--color-cream-bg)',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
              >
                {label}
              </span>
              
              {/* Right accent rule */}
              <div 
                className="w-4 h-[1px]"
                style={{ background: 'var(--color-accent-mint)' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const RhythmBar = memo(RhythmBarBase);
export default RhythmBar;
