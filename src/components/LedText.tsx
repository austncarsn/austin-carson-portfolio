import { memo, useMemo } from 'react';
import type { JSX } from 'react';

type LedTextProps = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delayStep?: number;
  startDelay?: number;
};

/**
 * LedText Component
 * Renders text with animated LED-style letter reveal effect
 * Each character animates in sequence with customizable delay
 */
function LedText({ 
  text, 
  as: Tag = 'h1', 
  className = '', 
  delayStep = 60,
  startDelay = 0 
}: LedTextProps): JSX.Element {
  
  // Memoize the letter array to prevent recreation on re-renders
  const letters = useMemo(() => 
    Array.from(text).map((char, index) => ({
      id: `${index}-${char.charCodeAt(0)}`,
      char,
      delay: startDelay + (index * delayStep)
    })), 
    [text, delayStep, startDelay]
  );

  return (
    <Tag 
      className={`led-text leading-none tracking-tight ${className}`} 
      aria-label={text}
      role="heading"
      aria-level={Tag === 'h1' ? 1 : Tag === 'h2' ? 2 : undefined}
    >
      {letters.map(({ id, char, delay }) => (
        <span
          key={id}
          className="led-letter inline-block"
          style={{ 
            animationDelay: `${delay}ms`,
            // Preserve whitespace for better text rendering
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {/* Screen reader only text for accessibility */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

export default memo(LedText, (prevProps, nextProps) => 
  prevProps.text === nextProps.text && 
  prevProps.className === nextProps.className &&
  prevProps.delayStep === nextProps.delayStep &&
  prevProps.startDelay === nextProps.startDelay
);