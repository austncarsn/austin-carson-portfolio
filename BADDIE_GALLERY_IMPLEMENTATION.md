# BaddieGallery Implementation Guide

## Overview
Replaced the horizontal `ImageGallery` component with the new `BaddieGallery` slider featuring scroll-driven transitions, center-snap behavior, and full accessibility support.

## Components Added

### 1. `src/components/BaddieGallery.tsx`
**Features:**
- **Center-snap scrolling** with smooth momentum on iOS/trackpad
- **Scroll-driven transitions:**
  - Center card: scale 1.0, lift 10px, opacity 1.0
  - Cards 1 away: scale ~0.97, lift ~7px, opacity 0.83
  - Cards 2 away: scale ~0.94, lift ~3px, opacity 0.67
  - Cards 3+ away: scale 0.92, lift 0px, opacity 0.5
- **Perforation rails** (top/bottom) with decorative dots
- **Window frame** with inner bevel and edge masking
- **Keyboard navigation:**
  - `←/→` arrows: Scroll by 80% viewport width
  - `Home`: Jump to start
  - `End`: Jump to end
- **Reduced motion support:** Disables transforms, keeps snap-only
- **Accessibility:**
  - ARIA `role="region"` with `aria-label="Gallery"`
  - Cards are focusable (`tabIndex={0}`)
  - Focus rings visible above transforms/masks via `.focus-ring` utility

### 2. `src/styles/a11y.css`
Global accessibility utilities:
- `.focus-ring` utility class
- Ensures focus rings are visible with proper z-index above transforms

### 3. `src/index.css` (updated)
Added `@layer utilities` with `.scrollbar-none`:
- Hides scrollbars on supported browsers (Firefox, Chrome, Safari, Edge)
- Maintains scroll functionality

## Integration

### App.tsx
```tsx
import { BaddieGallery } from './components/BaddieGallery';
import { GALLERY_IMAGES } from './data/galleryImages';

// In route:
<section id="gallery" className="my-12 md:my-16 px-6">
  <BaddieGallery images={[...GALLERY_IMAGES]} className="mx-auto max-w-[1600px]" />
</section>
```

### main.tsx
```tsx
import './styles/a11y.css';
```

## Token Usage
All colors use your existing design tokens:
- `--warm-stone`: Borders, rails
- `--warm-lightest`: Perforation dots (40% opacity)
- `--primary`: Background gradient base
- `--focus-ring-color`: Focus rings

## Behavior

### Normal Scroll
- Smooth center-snap behavior
- Cards scale/lift/fade based on distance from center
- requestAnimationFrame loop for 60fps smoothness

### Reduced Motion
When `data-reduced-motion` attribute is present:
- No scale transforms
- No lift (translateY)
- Plain snap scrolling only
- Opacity transitions disabled

### Keyboard UX
- Gallery must be hovered or focused-within to activate
- Arrow keys scroll by 80% viewport (comfortable jump)
- Home/End for instant navigation to edges
- All actions use `behavior: "smooth"`

## Accessibility Compliance

✅ **WCAG 2.1 AA:**
- Keyboard navigable
- Focus visible (`.focus-ring` utility)
- Semantic HTML (`<section>`, `<figure>`, `role="region"`)
- Alt text support for all images
- No text contrast issues (decorative elements only)

✅ **Touch Targets:**
- Cards are naturally large (22rem = 352px height)
- Full horizontal scroll area

✅ **Reduced Motion:**
- Respects `prefers-reduced-motion` via `data-reduced-motion` attribute
- No forced animations

## Browser Support
- **iOS Safari:** Native momentum scrolling (`-webkit-overflow-scrolling: touch`)
- **Chrome/Edge/Safari:** Webkit scrollbar hiding
- **Firefox:** Scrollbar-width property
- **All modern browsers:** Scroll snap, requestAnimationFrame

## Performance
- **rAF scroll listener:** 60fps smooth, batched updates
- **No layout thrashing:** Reads then writes in separate cycles
- **Lazy center detection:** Only calculates on scroll
- **Passive scroll listener:** Non-blocking for native smooth scroll

## Next Steps (Optional)
1. Add scroll progress indicator using `progress` state (0-1)
2. Add touch gesture hints for mobile (swipe icons)
3. Add "Previous/Next" button controls for mouse users
4. Add lightbox modal on card click

## Files Modified
- ✅ `src/components/BaddieGallery.tsx` (created)
- ✅ `src/styles/a11y.css` (created)
- ✅ `src/index.css` (added scrollbar utilities)
- ✅ `src/main.tsx` (imported a11y.css)
- ✅ `src/App.tsx` (replaced ImageGallery with BaddieGallery)

## Build Status
✅ TypeScript compilation successful (0 errors)
✅ Production build successful
✅ Bundle size: ~130KB (main chunk)
