import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** loading attribute for the native img element — 'lazy' | 'eager' */
  loading?: 'lazy' | 'eager';
  /** optional inline style applied to the <img> element (e.g. objectPosition) */
  imgStyle?: React.CSSProperties;
  /** optional fit hint: 'cover' | 'contain' | 'auto' (auto picks based on aspect) */
  fit?: 'cover' | 'contain' | 'auto';
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
export function ImageWithFallback({
  src,
  alt,
  className = '',
  loading = 'lazy',
  imgStyle,
  fit = 'auto',
}: ImageWithFallbackProps): React.ReactElement {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [computedStyle, setComputedStyle] = useState<React.CSSProperties | null>(null);

  // Derive a .webp sibling URL for automatic WebP delivery when available.
  // Only replace common raster extensions; leave SVGs, data: URLs, and others untouched.
  const webpCandidate = /\.(png|jpe?g|gif)$/i.test(src)
    ? src.replace(/\.(png|jpe?g|gif)$/i, '.webp')
    : src;
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
      {isLoading && <div className={`${className} bg-neutral-200 animate-pulse`} />}

      <picture>
        {hasWebpCandidate && <source srcSet={webpCandidate} type="image/webp" />}
        <img
          src={src}
          alt={alt}
          loading={loading}
          className={className}
          onError={() => setError(true)}
          onLoad={(e) => {
            try {
              const imgEl = e.currentTarget as HTMLImageElement;
              const w = imgEl.naturalWidth || imgEl.width;
              const h = imgEl.naturalHeight || imgEl.height;
              const aspect = w > 0 && h > 0 ? w / h : 1;

              // Decide default objectPosition based on aspect
              const defaultPos = aspect < 1 ? 'center top' : 'center center';

              // Decide objectFit: honor explicit fit prop, else auto-pick
              let objectFit: 'cover' | 'contain';
              if (fit === 'cover') objectFit = 'cover';
              else if (fit === 'contain') objectFit = 'contain';
              else {
                // auto: use contain for tall/square images, cover for wide images
                objectFit = aspect >= 1.15 ? 'cover' : 'contain';
              }

              setComputedStyle({
                ...(imgStyle || {}),
                objectPosition: (imgStyle && imgStyle.objectPosition) || defaultPos,
                objectFit,
              });
            } catch {
              setComputedStyle({
                ...(imgStyle || {}),
                objectFit: fit === 'cover' ? 'cover' : 'contain',
              });
            }
            setIsLoading(false);
          }}
          style={{
            ...(computedStyle || imgStyle || {}),
            display: isLoading ? 'none' : 'block',
          }}
        />
      </picture>
    </>
  );
}
