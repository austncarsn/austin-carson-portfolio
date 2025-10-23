import type { ReactNode } from 'react';
import React from 'react';
import FadeInSection from './FadeInSection';

interface SectionProps {
  id?: string;
  bgClass?: string;
  border?: 'none' | 'bottom' | 'top';
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
  border = 'bottom',
  className = '',
  children,
  noContainer = false,
  ptClass = '',
  labelNumber,
  labelTitle,
  labelDelay = 0,
  labelClassName = '',
}: SectionProps): React.JSX.Element {
  const borderClasses =
    border === 'bottom'
      ? 'border-b border-structure'
        : border === 'top'
        ? 'border-t border-text-muted'
      : '';

  // Centralized spacing rhythm — tweak here to affect all sections
  // Increased vertical padding so sections have more breathing room by default.
  const baseSpacing = 'px-6 py-16 sm:px-10 sm:py-18 md:py-20 lg:px-16 lg:py-24 xl:px-20';

  return (
  <section id={id} className={`relative w-full overflow-hidden ${borderClasses} ${bgClass || 'bg-paper'} ${ptClass || baseSpacing} ${className}`} style={{ scrollMarginTop: '4rem' }}>
      {noContainer ? (
        children
      ) : (
        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Optional section label rendered here when props provided */}
          {labelNumber && labelTitle ? (
            <FadeInSection delay={labelDelay}>
              <div className="mb-16">
                <div className={`flex items-center gap-3 ${labelClassName}`}>
                  <span className="font-satoshi text-[11px] uppercase tracking-[0.15em] text-text-muted opacity-60">
                    SECTION {labelNumber}
                  </span>
                  <span className="text-structure">—</span>
                  <span className="font-['Satoshi'] text-[11px] uppercase tracking-[0.15em] text-text-muted opacity-60">
                    {labelTitle}
                  </span>
                  <div className="flex-1 h-[1px] bg-brand ml-3" style={{ width: '24px', flexGrow: 0 }} />
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
