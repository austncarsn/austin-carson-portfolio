import { useEffect, useState } from "react";

/**
 * useScrollDir - Detects scroll direction
 * @param threshold - Minimum scroll distance to trigger direction change (default: 8px)
 * @returns "up" | "down"
 */
export function useScrollDir(threshold = 8): "up" | "down" {
  const [dir, setDir] = useState<"up" | "down">("up");
  
  useEffect(() => {
    let last = window.scrollY;
    
    const onScroll = (): void => {
      const y = window.scrollY;
      if (Math.abs(y - last) > threshold) {
        setDir(y > last ? "down" : "up");
      }
      last = y;
    };
    
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [threshold]);
  
  return dir;
}
