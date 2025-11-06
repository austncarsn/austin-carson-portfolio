
import React, { useRef, useState, useEffect } from 'react';
import { AccentStud } from './AccentStud';

interface AccentRowProps {
  tone?: 'black' | 'graphite' | 'gold';
  gap?: number;
  studSize?: number;
  showFade?: boolean;
}

export function AccentRow({ 
  tone = 'black', 
  gap = 48, 
  studSize = 28,
  showFade = false 
}: AccentRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [studCount, setStudCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function updateLayout() {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Adjust gap and size for mobile
      const actualGap = mobile ? gap * 0.7 : gap;
      const actualSize = mobile ? studSize * 0.8 : studSize;
      
      setStudCount(Math.ceil((width + actualGap) / (actualSize + actualGap)) + 2);
    }
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [gap, studSize]);

  const rowCount = 3;
  const actualGap = isMobile ? gap * 0.7 : gap;
  const actualSize = isMobile ? studSize * 0.8 : studSize;
  const rowGap = actualGap * 0.6;
  const totalHeight = (actualSize * rowCount) + (rowGap * (rowCount - 1)) + actualSize * 0.5;
  const fadeWidth = actualSize + actualGap;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ 
        height: totalHeight,
        margin: '0 auto',
        maxWidth: '100%'
      }}
      aria-hidden="true"
    >
      <div className="relative w-full" style={{ height: totalHeight }}>
        {Array.from({ length: rowCount }).map((_, rowIndex) => {
          const offset = rowIndex % 2 === 1 ? (actualSize + actualGap) / 2 : 0;
          return (
            <div
              key={rowIndex}
              className="flex items-center absolute w-full justify-center"
              style={{
                top: rowIndex * (actualSize + rowGap),
                gap: `${actualGap}px`,
                left: '50%',
                transform: `translateX(calc(-50% - ${offset}px))`,
              }}
            >
              {Array.from({ length: studCount }).map((_, i) => (
                <AccentStud key={`${rowIndex}-${i}`} tone={tone} size={actualSize} />
              ))}
            </div>
          );
        })}

        {showFade && (
          <>
            <div
              className="absolute left-0 top-0 pointer-events-none z-10"
              style={{
                width: `${fadeWidth * 1.5}px`,
                height: totalHeight,
                background: 'linear-gradient(to right, var(--background, #FFF9F0), transparent)',
              }}
            />
            <div
              className="absolute right-0 top-0 pointer-events-none z-10"
              style={{
                width: `${fadeWidth * 1.5}px`,
                height: totalHeight,
                background: 'linear-gradient(to left, var(--background, #FFF9F0), transparent)',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
