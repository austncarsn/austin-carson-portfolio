import { useEffect, useState } from "react";

/** Returns true when the page has been scrolled beyond `triggerPx` (default 64). */
export function useCompactHeader(triggerPx = 64) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > triggerPx);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [triggerPx]);
  return compact;
}
