# Aspect Component Documentation

## Overview

The `Aspect` component provides a standardized, production-ready solution for maintaining aspect ratios across images, videos, and other media. It eliminates layout shift, supports focal point positioning, and includes common ratio presets used in modern web design.

## Features

✅ **Standard Ratio Presets** - 8 common ratios (1:1, 16:9, 4:3, etc.)  
✅ **Custom Ratios** - Support for any ratio (e.g., 2.35:1 for anamorphic)  
✅ **Focal Point Control** - Position images precisely within the frame  
✅ **Object-Fit Options** - cover, contain, fill, none, scale-down  
✅ **Loading Skeleton** - Built-in animated placeholder  
✅ **Zero Layout Shift** - Reserves space before content loads  
✅ **Accessible** - Proper ARIA attributes and semantic HTML  
✅ **TypeScript** - Full type safety with interfaces

## Aspect Ratio Presets

| Ratio | Usage | Common Applications |
|-------|-------|---------------------|
| `1:1` | Square | Social media posts, avatars, product thumbnails |
| `3:2` | Classic | Traditional photography, DSLR sensors |
| `4:3` | Standard | Older displays, presentations, iPad |
| `16:9` | Widescreen | HD video, modern displays, YouTube |
| `21:9` | Ultrawide | Cinematic content, ultrawide monitors |
| `9:16` | Vertical | Mobile stories, TikTok, Instagram Reels |
| `4:5` | Portrait | Instagram portrait posts |
| `2:3` | Tall portrait | Traditional portrait photography |

## Basic Usage

### Simple Image with 16:9 Ratio

```tsx
import { Aspect } from '@/components/Aspect';

<Aspect ratio="16:9">
  <img src="/hero-image.jpg" alt="Hero banner" />
</Aspect>
```

### Square Avatar

```tsx
<Aspect ratio="1:1" rounded="full" className="w-24 h-24">
  <img src="/avatar.jpg" alt="User avatar" />
</Aspect>
```

### Video Container

```tsx
<Aspect ratio="16:9" objectFit="contain">
  <video src="/demo.mp4" controls />
</Aspect>
```

## Advanced Usage

### Custom Aspect Ratio

For specialized content like anamorphic cinema (2.35:1) or custom designs:

```tsx
<Aspect customRatio="2.35:1" objectFit="cover">
  <img src="/cinematic-banner.jpg" alt="Wide banner" />
</Aspect>
```

### Focal Point Positioning

Position images precisely when using `object-fit: cover`:

```tsx
<Aspect 
  ratio="16:9" 
  objectFit="cover"
  focalPoint={{ x: 75, y: 30 }}  // Focus on top-right area
>
  <img src="/landscape.jpg" alt="Mountain landscape" />
</Aspect>
```

**Focal Point Coordinates:**
- `x`: 0 (left) → 50 (center) → 100 (right)
- `y`: 0 (top) → 50 (center) → 100 (bottom)

### Loading Skeleton

Show an animated placeholder while content loads:

```tsx
<Aspect 
  ratio="16:9" 
  showSkeleton={true}
  background="var(--color-bg-subtle)"
>
  <img 
    src="/large-image.jpg" 
    alt="Content" 
    onLoad={() => setShowSkeleton(false)}
  />
</Aspect>
```

## Pre-configured Variants

For common use cases, use the specialized exports:

```tsx
import { 
  AspectSquare,
  AspectVideo,
  AspectPortrait,
  AspectStory,
  AspectCinematic 
} from '@/components/Aspect';

// Square (1:1)
<AspectSquare>
  <img src="/thumbnail.jpg" alt="Thumbnail" />
</AspectSquare>

// Video (16:9)
<AspectVideo>
  <iframe src="https://youtube.com/embed/..." />
</AspectVideo>

// Portrait (4:5)
<AspectPortrait objectFit="cover">
  <img src="/portrait.jpg" alt="Portrait" />
</AspectPortrait>

// Story (9:16)
<AspectStory>
  <video src="/story.mp4" />
</AspectStory>

// Cinematic (21:9)
<AspectCinematic>
  <img src="/ultrawide.jpg" alt="Panorama" />
</AspectCinematic>
```

## Component Props

```typescript
interface AspectProps {
  // Aspect ratio preset
  ratio?: '1:1' | '3:2' | '4:3' | '16:9' | '21:9' | '9:16' | '4:5' | '2:3';
  
  // Custom ratio (overrides ratio prop)
  customRatio?: string;  // e.g., '2.35:1', '1.91:1'
  
  // How content fits within container
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  
  // Focal point for image positioning (0-100 range)
  focalPoint?: { x: number; y: number };
  
  // Content to render inside container
  children: ReactNode;
  
  // Additional CSS classes
  className?: string;
  
  // Background color before content loads
  background?: string;  // Default: 'var(--color-bg-surface)'
  
  // Show animated loading skeleton
  showSkeleton?: boolean;
  
  // Border radius token
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

## Real-World Examples

### Project Card Preview

```tsx
<Aspect 
  ratio="4:3" 
  objectFit="cover"
  className="w-full"
  rounded="lg"
>
  <img 
    src={project.previewImage} 
    alt={`${project.title} preview`}
    loading="lazy"
  />
</Aspect>
```

### Hero Banner with Focal Point

```tsx
<Aspect 
  ratio="21:9"
  objectFit="cover"
  focalPoint={{ x: 60, y: 40 }}  // Focus on subject
  className="w-full max-w-7xl mx-auto"
>
  <img src="/hero.jpg" alt="Hero banner" />
</Aspect>
```

### Responsive Gallery Grid

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {images.map((img) => (
    <Aspect key={img.id} ratio="1:1" rounded="md">
      <img src={img.src} alt={img.alt} loading="lazy" />
    </Aspect>
  ))}
</div>
```

### Video Embed

```tsx
<Aspect ratio="16:9" className="w-full max-w-4xl mx-auto">
  <iframe
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    title="Video title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full border-0"
  />
</Aspect>
```

## Migration Guide

### Before (Manual Padding-Bottom Trick)

```tsx
// Old approach - brittle and not reusable
<div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
  <img 
    src="/image.jpg" 
    alt="Content"
    className="absolute inset-0 w-full h-full object-cover"
  />
</div>
```

### After (Aspect Component)

```tsx
// New approach - clean, type-safe, reusable
<Aspect ratio="16:9" objectFit="cover">
  <img src="/image.jpg" alt="Content" />
</Aspect>
```

## Performance Considerations

✅ **Zero Layout Shift** - Reserves space immediately, preventing CLS  
✅ **Lazy Loading** - Supports native `loading="lazy"` on images  
✅ **GPU Acceleration** - Uses transform for skeleton animation  
✅ **Minimal Bundle** - < 2KB gzipped  
✅ **Tree Shakeable** - Import only what you need

## Accessibility

The Aspect component follows WCAG 2.2 AA guidelines:

- ✅ Semantic HTML structure
- ✅ Proper ARIA attributes on skeleton loader (`aria-hidden="true"`)
- ✅ Respects `prefers-reduced-motion` for animations
- ✅ Maintains focus management
- ✅ Works with screen readers

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

## Technical Implementation

The Aspect component uses the **padding-bottom percentage technique**:

1. Container has `position: relative` and `padding-bottom: X%`
2. Padding percentage creates aspect ratio (e.g., 56.25% = 16:9)
3. Content is absolutely positioned with `inset: 0`
4. Content inherits container's aspect ratio

This approach is:
- Battle-tested across browsers
- Performant (no JavaScript calculations)
- Compatible with responsive designs
- Works with any content type

## Troubleshooting

### Image Not Filling Container

**Problem:** Image appears small or doesn't fill the aspect container.

**Solution:** Ensure the image has `w-full h-full` classes:

```tsx
<Aspect ratio="16:9">
  <img 
    src="/image.jpg" 
    alt="Content"
    className="w-full h-full object-cover"  // ← Add these classes
  />
</Aspect>
```

### Custom Ratio Not Working

**Problem:** Custom ratio displays incorrectly.

**Solution:** Use proper format with colon separator:

```tsx
// ✅ Correct
<Aspect customRatio="2.35:1">

// ❌ Wrong
<Aspect customRatio="2.35" />
<Aspect customRatio="2.35/1" />
```

### Focal Point Not Applying

**Problem:** Focal point doesn't change image position.

**Solution:** Must use `objectFit="cover"` for focal point to work:

```tsx
<Aspect 
  ratio="16:9"
  objectFit="cover"  // ← Required for focal point
  focalPoint={{ x: 75, y: 30 }}
>
  <img src="/image.jpg" alt="Content" />
</Aspect>
```

## Future Enhancements

Potential additions for future versions:

- [ ] Container query support for responsive ratios
- [ ] Art direction (different ratios per breakpoint)
- [ ] WebP/AVIF format detection
- [ ] Blur-up placeholder technique
- [ ] Intersection Observer for lazy loading
- [ ] Video poster frame support
- [ ] Caption overlay option

---

**Version:** 1.0.0  
**Last Updated:** November 6, 2025 (PR #3)  
**Maintainer:** Austin Carson
