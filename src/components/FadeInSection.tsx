/* ==========================================================================
   Fade In Section — Optimized scroll-triggered animation wrapper
   ========================================================================== */

import type { ReactElement, ReactNode } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

const transformMap = {
  up: 'translateY(30px)',
  down: 'translateY(-30px)',
  left: 'translateX(30px)',
  right: 'translateX(-30px)',
  none: 'translateY(0)'
};

export default memo(function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}: FadeInSectionProps): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  const shouldAnimate = !prefersReducedMotion;
  const baseOpacity = shouldAnimate ? (isVisible ? 1 : 0) : 1;
  const baseTransform = shouldAnimate ? (isVisible ? 'translate(0)' : transformMap[direction]) : 'translate(0)';
  const transition = shouldAnimate
    ? `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
    : 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: baseOpacity,
        transform: baseTransform,
        transition,
        willChange: shouldAnimate && !isVisible ? 'opacity, transform' : 'auto'
      }}
    >
      {children}
    </div>
  );
});