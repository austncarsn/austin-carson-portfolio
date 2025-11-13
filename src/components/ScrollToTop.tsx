/* ==========================================================================
   Scroll To Top — Route Change Handler
   Automatically scrolls to top on navigation
   ========================================================================== */

import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Resets scroll position when navigating between routes while respecting motion preferences.
 */
export function ScrollToTop(): ReactElement | null {
  const { pathname } = useLocation();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [pathname, prefersReducedMotion]);

  return null;
}
