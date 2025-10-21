import { useState, useEffect, useCallback, useMemo, memo } from 'react';

interface TypewriterTextProps {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  lineDelay?: number;
  initialDelay?: number;
  /** Natural variation in typing speed (0-1, where 0.3 = 30% variation) */
  speedVariation?: number;
}

export default memo(function TypewriterText({ 
  lines, 
  className = '',
  typingSpeed = 20,
  lineDelay = 300,
  initialDelay = 10,
  speedVariation = 0.20
}: TypewriterTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Handle initial delay
  useEffect(() => {
    if (initialDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, initialDelay);

      return () => clearTimeout(startTimer);
    } else {
      setHasStarted(true);
    }
  }, [initialDelay]);

  // Memoize the update function to avoid recreating it
  const updateDisplayedLine = useCallback((lineIndex: number, text: string) => {
    setDisplayedLines(prev => {
      const newLines = [...prev];
      newLines[lineIndex] = text;
      return newLines;
    });
  }, []);

  // Calculate natural typing delay with variation
  const getTypingDelay = useCallback((char: string, nextChar?: string) => {
    let delay = typingSpeed;
    
    // Add natural variation (randomness in human typing)
    const variation = (Math.random() - 0.5) * 2 * speedVariation;
    delay *= (1 + variation);
    
    // Longer pauses after punctuation (more realistic)
    if (char === '.' || char === '!' || char === '?') {
      delay += typingSpeed * 3; // Pause after sentence
    } else if (char === ',' || char === ';' || char === ':') {
      delay += typingSpeed * 1.5; // Shorter pause after comma
    } else if (char === ' ' && (nextChar === ' ' || !nextChar)) {
      delay += typingSpeed * 0.5; // Slight pause at end of word
    }
    
    // Faster typing for common character pairs
    if (nextChar) {
      const pair = char + nextChar;
      const fastPairs = ['th', 'he', 'in', 'er', 'an', 'ed', 'nd', 'to', 'en', 'ty', 'or'];
      if (fastPairs.includes(pair.toLowerCase())) {
        delay *= 0.7; // Type common pairs faster
      }
    }
    
    return Math.max(15, delay); // Minimum 15ms, maximum natural speed
  }, [typingSpeed, speedVariation]);

  // Smooth cursor blinking
  useEffect(() => {
    if (isComplete) {
      setCursorVisible(false);
      return;
    }

    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530); // Slightly irregular blink (more natural)

    return () => clearInterval(interval);
  }, [isComplete]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];

    // Handle empty lines (paragraph breaks)
    if (currentLine.length === 0) {
      updateDisplayedLine(currentLineIndex, '');
      
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay * 0.6); // Natural pause between paragraphs

      return () => clearTimeout(timer);
    }

    // Type characters with natural variation
    if (currentCharIndex < currentLine.length) {
      const currentChar = currentLine[currentCharIndex];
      const nextChar = currentLine[currentCharIndex + 1];
      const delay = getTypingDelay(currentChar, nextChar);

      const timer = setTimeout(() => {
        updateDisplayedLine(currentLineIndex, currentLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Move to next line with natural pause
      const lastChar = currentLine[currentLine.length - 1];
      const isEndOfSentence = ['.', '!', '?'].includes(lastChar);
      const delay = isEndOfSentence ? lineDelay * 1.5 : lineDelay;

      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [hasStarted, currentLineIndex, currentCharIndex, lines, lineDelay, updateDisplayedLine, getTypingDelay]);

  // Memoize the rendered output with smooth cursor
  const renderedLines = useMemo(() => {
    return displayedLines.map((line, index) => (
      <div key={index} className="min-h-[1.5em]">
        {line || '\u00A0'}
        {index === currentLineIndex && !isComplete && (
          <span 
            className={`inline-block w-[2px] h-[1.1em] bg-brand ml-[2px] align-text-bottom transition-opacity duration-100 ${
              cursorVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />
        )}
      </div>
    ));
  }, [displayedLines, currentLineIndex, isComplete, cursorVisible]);

  return (
    <div className={className} role="status" aria-live="polite" aria-atomic="false">
      {renderedLines}
    </div>
  );
});
