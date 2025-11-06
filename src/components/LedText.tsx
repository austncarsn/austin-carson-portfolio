import React, { memo } from 'react';

type LedTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  delayStep?: number; // ms between letters
};

function LedText({ text, as: Tag = 'h1', className = '', delayStep = 60 }: LedTextProps) {
  const letters = Array.from(text);

  return (
    <Tag className={`leading-none tracking-tight ${className}`} aria-label={text}>
      {letters.map((ch, i) => (
        <span
          key={`led-${i}-${ch}`}
          className="led-letter inline-block"
          style={{ animationDelay: `${i * delayStep}ms` }}
          aria-hidden={false}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  );
}

export default memo(LedText);
