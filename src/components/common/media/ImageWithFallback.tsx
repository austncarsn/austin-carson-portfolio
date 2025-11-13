import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** loading attribute for the native img element — 'lazy' | 'eager' */
  loading?: 'lazy' | 'eager';
}

export function ImageWithFallback({ src, alt, className = '', loading = 'lazy' }: ImageWithFallbackProps): React.ReactElement {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (error) {
    return (
      <div className={`${className} bg-neutral-200 flex items-center justify-center`}>
        <span className="text-neutral-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} bg-neutral-200 animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={className}
        onError={() => setError(true)}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
}
