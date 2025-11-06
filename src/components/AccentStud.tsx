import React from 'react';

interface AccentStudProps {
  tone?: 'black' | 'graphite' | 'gold';
  size?: number;
}

export function AccentStud({ tone = 'black', size = 28 }: AccentStudProps) {
  // Color mapping for stud tones with improved styling
  const colors: Record<string, string> = {
    black: 'bg-neutral-950',
    graphite: 'bg-neutral-700',
    gold: 'bg-yellow-400',
  };
  
  const shadowColors: Record<string, string> = {
    black: 'shadow-lg shadow-neutral-950/20',
    graphite: 'shadow-md shadow-neutral-700/15',
    gold: 'shadow-lg shadow-yellow-400/30',
  };

  return (
    <div
      className={`rounded-full flex-shrink-0 ${colors[tone]} ${shadowColors[tone]}`}
      style={{ 
        width: size, 
        height: size,
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.1)'
      }}
      aria-hidden
    />
  );
}
