import type { ReactNode } from 'react';
import React from 'react';
import FadeInSection from './FadeInSection';

interface SectionProps {
  id?: string;
  bgClass?: string;
  className?: string;
  children?: ReactNode;
  noContainer?: boolean;
  ptClass?: string;
  // Optional label props — when provided, a label will render above the section content
  labelNumber?: string;
  labelTitle?: string;
  labelDelay?: number;
  labelClassName?: string;
}

/**
 * Generic section wrapper to centralize vertical rhythm, borders and background handling.
 * Keeps an internal max-width container by default but can be opted out with `noContainer`.
 */
export default function Section({
  id,
  bgClass = 'bg-paper',
  className = '',
  children,
  noContainer = false,
  ptClass = '',
  labelNumber,
  labelTitle,
  labelDelay = 0,
  labelClassName = '',
}: SectionProps): React.JSX.Element {
  // Centralized spacing rhythm — professional vertical rhythm with generous breathing room
  // Responsive padding scales: mobile → tablet → desktop → wide screens
  // Ensures perfect layout at all viewport sizes
  const baseSpacing = 'px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16 lg:py-28 xl:px-20 xl:py-32 2xl:px-24 2xl:py-36';

  return (
  <section id={id} className={`relative w-full overflow-hidden ${bgClass || 'bg-paper'} ${ptClass || baseSpacing} ${className}`} style={{ scrollMarginTop: '4rem' }}>
      {noContainer ? (
        children
      ) : (
        <div className="relative z-10 mx-auto w-full max-w-[1400px] 2xl:max-w-[1600px]">
          {/* Optional section label rendered here when props provided */}
          {labelNumber && labelTitle ? (
            <FadeInSection delay={labelDelay}>
              <div className="mb-12 sm:mb-14 md:mb-16">
                <div className={`flex items-center gap-3 sm:gap-4 ${labelClassName}`}>
                  <span className="font-satoshi font-bold text-xs sm:text-sm tracking-[0.2em] uppercase text-token-muted" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {labelNumber}
                  </span>
                  <div className="flex-1 h-[1px] border-token ml-2 sm:ml-3" style={{ width: '20px', minWidth: '20px', flexGrow: 0 }} />
                  <span className="font-satoshi font-bold text-xs sm:text-sm tracking-[0.15em] uppercase text-text-secondary">
                    {labelTitle}
                  </span>
                  <div className="flex-1 h-[1px] border-token ml-2 sm:ml-3" style={{ width: '20px', minWidth: '20px', flexGrow: 0 }} />
                </div>
              </div>
            </FadeInSection>
          ) : null}

          {children}
        </div>
      )}
    </section>
  );
}
