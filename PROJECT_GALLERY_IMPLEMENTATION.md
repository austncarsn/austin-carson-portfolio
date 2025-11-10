# ProjectGallery Implementation

## Overview
Replaced the carousel-based Projects component with a clean filmstrip gallery (ProjectGallery) that features center-snap horizontal scrolling with focused card lift and brightness effects.

## Changes Made

### New Files Created

1. **src/components/ProjectGallery.tsx**
   - Clean filmstrip gallery with center-snap scrolling
   - Focused card lifts 8px and scales to 1.0 (unfocused cards scale to 0.95)
   - Minimal overlay: title + tag in bottom-left corner
   - Subtle progress bar indicator at bottom
   - Features:
     - Keyboard navigation: ←/→ pan 80% viewport, Home/End jump to edges
     - Reduced-motion support (disables transforms)
     - iOS momentum scrolling with WebkitOverflowScrolling
     - Focus-visible rings for accessibility
     - Aspect ratio support: 4:5, 16:9, 1:1
     - rAF loop for smooth scroll tracking (60fps)

2. **src/data/projectsGallery.ts**
   - Maps existing project data to ProjectGallery format
   - 5 projects with covers, titles, tags, and aspect ratios
   - Links to project detail pages via react-router

### Modified Files

1. **src/App.tsx**
   - Removed lazy-loaded Projects component
   - Added ProjectGallery direct import
   - Added GALLERY_PROJECTS data import
   - Replaced `<Projects />` with:
     ```tsx
     <section id="projects" className="my-16 px-6">
       <ProjectGallery projects={GALLERY_PROJECTS} className="mx-auto max-w-[1600px]" />
     </section>
     ```

2. **src/styles/tokens.css**
   - Fixed `--warm-tan` color from blue-purple (hue 275) to actual tan/beige (hue 75)
   - Updated both light and dark mode values
   - Reduced chroma from 0.12 to 0.08 for more muted appearance

### Existing Utilities Used
- `.scrollbar-none` - Already present in index.css for hiding scrollbars
- `.focus-ring` - Already present in a11y.css for accessible focus states

## Design Features

### Window Frame
- 18px rounded border with token-based `--warm-stone` color
- Linear gradient background (92% primary, 8% black)
- Inset shadow for depth: top highlight + bottom bevel
- Matches BaddieGallery aesthetic

### Cards
- Width: `min(64vw, 22rem)` - responsive but capped
- 14px rounded corners with overflow hidden
- Transform transitions: 220ms lift + scale + opacity
- Inset bevel shadow for premium feel
- Content-visibility: auto for performance

### Overlay Badge
- Bottom-left positioning with 4-unit padding
- Semi-transparent background: 55% primary / 45% black mix
- Subtle border with 70% warm-stone mix
- Drop shadow for separation
- Font-medium title + 70% opacity tag separator

### Progress Bar
- 24-unit (6rem) width, centered below gallery
- 1-unit (4px) height with rounded-full caps
- Background: white/10 opacity
- Active indicator uses `--warm-tan` token
- Minimum 8% width for visibility
- aria-hidden (decorative only)

## Accessibility

- ✅ Keyboard navigation (←/→, Home, End)
- ✅ Focus-visible rings on all interactive cards
- ✅ ARIA role="region" with aria-label="Projects"
- ✅ Reduced-motion support (disables transforms when data-reduced-motion present)
- ✅ Semantic link elements with alt text
- ✅ 44px minimum touch targets on mobile (cards are min 64vw)
- ✅ Lazy loading images with sizes attribute for performance

## Performance

- rAF loop (60fps) for scroll position tracking
- Passive scroll listeners (non-blocking)
- Content-visibility: auto for off-screen cards
- iOS momentum scrolling enabled
- Lazy image loading with responsive sizes
- No pagination dots or heavy animations
- Minimal DOM updates (only centerIndex + progress state)

## Comparison: Old vs New

### Before (Projects.tsx)
- Full carousel with ProjectReel component
- Multiple navigation options (dots, buttons)
- Complex animation system
- Fortune Box integration
- Section wrapper with grain texture
- ~246 lines

### After (ProjectGallery.tsx)
- Clean filmstrip with native scroll-snap
- Minimal UI (no dots, no buttons on cards)
- Simple transform-based focus effect
- Standalone component
- Window frame matches BaddieGallery
- ~155 lines

## Token Usage

- `--warm-stone` - borders, badge outlines
- `--warm-lightest` - badge text color
- `--warm-tan` - progress bar indicator (fixed to actual tan color)
- `--primary` - backgrounds (color-mix for transparency)
- Browser-native focus ring colors via `.focus-ring` utility

## Build Stats

- Build time: 2.79s
- 2030 modules transformed
- Main chunk: 136.92 kB (45.53 kB gzipped)
- No errors or warnings
- All TypeScript strict checks passed

## User Experience

1. **Browse**: Horizontal scroll with momentum on mobile
2. **Focus**: Centered card lifts and brightens automatically
3. **Navigate**: Arrow keys pan smoothly, Home/End jump to edges
4. **Discover**: Progress bar shows position in gallery
5. **Engage**: Click/tap any card to view full project details
6. **Accessibility**: Reduced motion users get instant snapping without transforms
