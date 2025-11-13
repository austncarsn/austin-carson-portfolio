import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({ src, alt, className = '' }: ImageWithFallbackProps): React.ReactElement {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div className={`${className} bg-neutral-200 flex items-center justify-center`}>
        <span className="text-neutral-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div className={`${className} bg-neutral-200 animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
}
