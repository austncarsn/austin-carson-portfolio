import { useEffect, useState } from 'react';

/** Returns true when the page has been scrolled beyond `triggerPx` (default 64). */
export function useCompactHeader(triggerPx = 64): boolean {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = (): void => setCompact(window.scrollY > triggerPx);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [triggerPx]);
  return compact;
}
