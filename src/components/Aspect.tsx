import { type ReactNode, type CSSProperties } from 'react';

/**
 * Standard aspect ratio presets
 * Common ratios for modern web design and media
 */
export type AspectRatio = 
  | '1:1'      // Square (social media, avatars)
  | '3:2'      // Classic photography
  | '4:3'      // Traditional display
  | '16:9'     // HD video, modern displays
  | '21:9'     // Ultrawide, cinematic
  | '9:16'     // Vertical video (mobile, stories)
  | '4:5'      // Instagram portrait
  | '2:3';     // Portrait photography

/**
 * Object-fit options for image rendering
 */
export type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

/**
 * Focal point for image positioning (0-100 range)
 */
export interface FocalPoint {
  x: number; // Horizontal position (0 = left, 50 = center, 100 = right)
  y: number; // Vertical position (0 = top, 50 = center, 100 = bottom)
}

export interface AspectProps {
  /** Aspect ratio preset */
  ratio?: AspectRatio;
  /** Custom aspect ratio (e.g., '2.35:1' for anamorphic) */
  customRatio?: string;
  /** How the content should fit within the container */
  objectFit?: ObjectFit;
  /** Focal point for image positioning when using object-fit cover */
  focalPoint?: FocalPoint;
  /** Content to render inside aspect container */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Background color shown before image loads */
  background?: string;
  /** Whether to enable loading skeleton */
  showSkeleton?: boolean;
  /** Border radius token */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Map ratio presets to CSS padding-bottom percentages
 * padding-bottom percentage creates aspect ratio via padding-bottom trick
 */
const RATIO_MAP: Record<AspectRatio, string> = {
  '1:1': '100%',      // 1/1 = 1.0 = 100%
  '3:2': '66.666%',   // 2/3 = 0.6666... = 66.666%
  '4:3': '75%',       // 3/4 = 0.75 = 75%
  '16:9': '56.25%',   // 9/16 = 0.5625 = 56.25%
  '21:9': '42.857%',  // 9/21 = 0.4286 = 42.857%
  '9:16': '177.778%', // 16/9 = 1.7778 = 177.778%
  '4:5': '125%',      // 5/4 = 1.25 = 125%
  '2:3': '150%',      // 3/2 = 1.5 = 150%
};

/**
 * Calculate percentage from custom ratio string (e.g., '2.35:1')
 */
function calculateCustomRatio(ratio: string): string {
  const [width, height] = ratio.split(':').map(Number);
  if (!width || !height || isNaN(width) || isNaN(height)) {
    console.warn(`Invalid custom ratio: ${ratio}. Defaulting to 16:9.`);
    return RATIO_MAP['16:9'];
  }
  return `${(height / width) * 100}%`;
}

/**
 * Aspect - Standardized aspect ratio container for images and media
 * 
 * Features:
 * - Standard ratio presets (1:1, 16:9, etc.)
 * - Custom ratio support
 * - Focal point positioning
 * - Object-fit control
 * - Loading skeleton
 * - Responsive design
 * 
 * @example
 * ```tsx
 * // Simple square image
 * <Aspect ratio="1:1">
 *   <img src="/avatar.jpg" alt="Profile" />
 * </Aspect>
 * 
 * // 16:9 video with cover fit
 * <Aspect ratio="16:9" objectFit="cover">
 *   <video src="/hero.mp4" />
 * </Aspect>
 * 
 * // Custom ratio with focal point
 * <Aspect 
 *   customRatio="2.35:1" 
 *   focalPoint={{ x: 75, y: 30 }}
 *   objectFit="cover"
 * >
 *   <img src="/banner.jpg" alt="Banner" />
 * </Aspect>
 * ```
 */
export function Aspect({
  ratio = '16:9',
  customRatio,
  objectFit = 'cover',
  focalPoint,
  children,
  className = '',
  background = 'var(--color-bg-surface)',
  showSkeleton = false,
  rounded = 'md',
}: AspectProps): JSX.Element {
  // Calculate padding-bottom for aspect ratio
  const paddingBottom = customRatio 
    ? calculateCustomRatio(customRatio)
    : RATIO_MAP[ratio];

  // Generate object-position from focal point
  const objectPosition = focalPoint
    ? `${focalPoint.x}% ${focalPoint.y}%`
    : '50% 50%';

  // Rounded corner classes
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  // Container styles
  const containerStyle: CSSProperties = {
    paddingBottom,
    backgroundColor: background,
  };

  // Content styles applied to children
  const contentStyle: CSSProperties = {
    objectFit,
    objectPosition,
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${roundedClasses[rounded]} ${className}`}
      style={containerStyle}
    >
      {/* Loading skeleton */}
      {showSkeleton && (
        <div 
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Content wrapper - absolutely positioned to fill container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Clone children and apply styles */}
        {typeof children === 'object' && children !== null && 'type' in children ? (
          <div className="w-full h-full" style={contentStyle}>
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

/**
 * Pre-configured Aspect variants for common use cases
 */
export const AspectSquare = (props: Omit<AspectProps, 'ratio'>) => (
  <Aspect {...props} ratio="1:1" />
);

export const AspectVideo = (props: Omit<AspectProps, 'ratio'>) => (
  <Aspect {...props} ratio="16:9" />
);

export const AspectPortrait = (props: Omit<AspectProps, 'ratio'>) => (
  <Aspect {...props} ratio="4:5" />
);

export const AspectStory = (props: Omit<AspectProps, 'ratio'>) => (
  <Aspect {...props} ratio="9:16" />
);

export const AspectCinematic = (props: Omit<AspectProps, 'ratio'>) => (
  <Aspect {...props} ratio="21:9" />
);
