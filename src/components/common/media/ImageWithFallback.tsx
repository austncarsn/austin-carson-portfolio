import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** loading attribute for the native img element — 'lazy' | 'eager' */
  loading?: 'lazy' | 'eager';
}

/**
 * ImageWithFallback
 * - shows a pulsing placeholder while loading
 * - renders a <picture> with a derived .webp <source> when possible
 * - falls back to an error placeholder if the image fails to load
 *
 * Assumption: if a sibling WebP exists, it follows the same filename with a .webp extension
 * (e.g. image.png -> image.webp). If that's not true for some imports, the <source>
 * will point to a non-existent file and the browser will fall back to the <img> src.
 */
export function ImageWithFallback({ src, alt, className = '', loading = 'lazy' }: ImageWithFallbackProps): React.ReactElement {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Derive a .webp sibling URL for automatic WebP delivery when available.
  // Only replace common raster extensions; leave SVGs, data: URLs, and others untouched.
  const webpCandidate = /\.(png|jpe?g|gif)$/i.test(src) ? src.replace(/\.(png|jpe?g|gif)$/i, '.webp') : src;
  const hasWebpCandidate = webpCandidate !== src;

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

      <picture>
        {hasWebpCandidate && <source srcSet={webpCandidate} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={className}
          onError={() => setError(true)}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      </picture>
    </>
  );
}
