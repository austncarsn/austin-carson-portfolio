/* ==========================================================================
   FadeInSection — Scroll-triggered fade/slide wrapper
   ========================================================================== */

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: FadeDirection;
  className?: string;
}

const TRANSITION_DURATION_MS = 800;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';
const OFFSET_PX = 30;

const TRANSFORM_MAP: Record<FadeDirection, string> = {
  up: `translateY(${OFFSET_PX}px)`,
  down: `translateY(-${OFFSET_PX}px)`,
  left: `translateX(${OFFSET_PX}px)`,
  right: `translateX(-${OFFSET_PX}px)`,
  none: 'translateY(0)',
};

function FadeInSectionComponent({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}: FadeInSectionProps): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // If the user prefers reduced motion, show content immediately.
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const style = useMemo<CSSProperties>(() => {
    const shouldAnimate = !prefersReducedMotion;
    const visible = isVisible || !shouldAnimate;

    if (!shouldAnimate) {
      return {
        opacity: 1,
        transform: 'translate(0)',
        transition: 'none',
        willChange: 'auto',
      };
    }

    return {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0)' : TRANSFORM_MAP[direction],
      transition: `opacity ${TRANSITION_DURATION_MS}ms ${EASING} ${delay}ms, transform ${TRANSITION_DURATION_MS}ms ${EASING} ${delay}ms`,
      willChange: !visible ? 'opacity, transform' : 'auto',
    };
  }, [delay, direction, isVisible, prefersReducedMotion]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export default memo(FadeInSectionComponent);
