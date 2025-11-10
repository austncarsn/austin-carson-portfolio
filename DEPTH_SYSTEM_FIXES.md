# Unified Depth System Implementation

## Overview
Surgical fixes applied to unify the depth language across tokens and utilities, creating a consistent elevation system with perforated window frames and improved scroller affordances.

## Changes Applied

### 1. Unified Elevation Tokens (tokens.css)

**Added to both light and dark themes:**

```css
/* Light mode */
--elev-0: 0 0 0 rgba(0,0,0,0);
--elev-1: 0 1px 2px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.04);
--elev-2: 0 2px 8px rgba(0,0,0,.14), 0 0 0 1px rgba(0,0,0,.06);
--elev-3: 0 8px 24px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.08);

/* Dark mode - adjusted for visibility */
--elev-1: 0 1px 2px rgba(0,0,0,.24), 0 0 0 1px rgba(255,255,255,.06);
--elev-2: 0 2px 8px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.08);
--elev-3: 0 8px 24px rgba(0,0,0,.36), 0 0 0 1px rgba(255,255,255,.10);
```

**Surface tokens:**
```css
--chip-surface: color-mix(in oklch, #000 6%, transparent);
--frame-surface: color-mix(in oklch, #000 10%, transparent);
```

**Core palette refinement:**
```css
--cream: #FFFCEB;
--ink: oklch(.22 .03 260);
--gold: oklch(.74 .08 90);  /* Darkened for AA contrast on cream */
--accent: oklch(.88 .14 150);
```

### 2. Utility Classes (index.css)

**Shadow utilities:**
```css
.shadow-1 { box-shadow: var(--elev-1); }
.shadow-2 { box-shadow: var(--elev-2); }
.shadow-3 { box-shadow: var(--elev-3); }
```

**Window frame with perforated rails:**
```css
.window {
  border-radius: 18px;
  background: var(--frame-surface);
  box-shadow: var(--elev-2);
  position: relative;
}

/* Top and bottom perforation dots */
.window::before,
.window::after {
  content: "";
  position: absolute;
  left: 24px; right: 24px;
  height: 8px;
  background: radial-gradient(circle at 0 50%, rgba(0,0,0,.28) 2px, transparent 2px) repeat-x;
  background-size: 12px 8px;
  opacity: .35;
  filter: blur(.2px);
}

/* Inner bevel for depth */
.window .bevel {
  inset: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22), inset 0 -2px 6px rgba(0,0,0,.30);
}
```

**Scroller with snap:**
```css
.scroller {
  display: flex;
  gap: 16px;
  overflow: auto;
  scroll-snap-type: x mandatory;
  padding: 20px;
  scroll-padding: 20px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
```

**Edge fade affordance:**
```css
.edgeFade {
  pointer-events: none;
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, var(--cream) 0%, transparent 8%) left,
    linear-gradient(270deg, var(--cream) 0%, transparent 8%) right;
  background-repeat: no-repeat;
  background-size: 20% 100%;
  mix-blend-mode: soft-light;
}
```

**Noise texture:**
```css
.page-noise {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .02;
  background: url('data:image/svg+xml,...') repeat;
  mix-blend-mode: multiply;
}
```

### 3. ProjectGallery Component Updates

**Before:**
```tsx
<div className="relative rounded-[16px] border overflow-hidden" style={{...}}>
  <div ref={scrollerRef} className="scrollbar-none flex overflow-x-auto...">
```

**After:**
```tsx
<div className="window">
  <div className="bevel" />
  <div className="edgeFade" aria-hidden />
  <div ref={scrollerRef} className="scroller">
```

**Card improvements:**
- Mobile width: `78vw/18rem` (increased from 76vw)
- Desktop width: `58vw/20rem` (unchanged)
- Fixed aspect ratio: `aspectRatio` style property
- Content visibility: `contentVisibility: "auto"` for off-screen cards
- Chip uses `--chip-surface` token + `shadow-1`

### 4. BaddieGallery Component Updates

**Unified with window/bevel system:**
- Replaced custom frame styles with `.window` class
- Added `.bevel` div for consistent depth
- Prev/Next buttons use `--chip-surface` + `shadow-1`

### 5. Usage Hierarchy

**Shadow levels:**
- `shadow-1` - Hover states, contact chips, small elevated elements
- `shadow-2` - Window frames, gallery containers, main elevated sections
- `shadow-3` - Modals, hero spotlight, maximum elevation

**Surface tokens:**
- `--chip-surface` (6% black) - Small UI elements, badges, buttons
- `--frame-surface` (10% black) - Large containers, window frames

## Design Benefits

1. **Consistent Depth Language**: All elevation uses unified `--elev-*` tokens
2. **Perforated Rails**: Film strip aesthetic with procedural dot patterns
3. **Bevel System**: Reusable inner shadow for premium depth
4. **Edge Affordance**: Fade masks show scroll availability
5. **Mobile Optimized**: Larger cards (78vw) for better mobile browsing
6. **Performance**: `content-visibility: auto` for off-screen optimization
7. **Accessibility**: Maintained focus rings, ARIA labels, reduced motion support

## Build Stats

- Build time: 1.65s
- CSS: 83.56 kB (17.12 kB gzipped) - increased 2KB for utility classes
- 0 TypeScript errors
- 0 warnings

## Visual Hierarchy

```
Modal/Hero (shadow-3)
  └── Window Frames (shadow-2, .window, .bevel)
      └── Chips/Buttons (shadow-1, --chip-surface)
          └── Base Surface (--frame-surface)
```

## Token Reference

```css
/* Elevation */
--elev-1: subtle lift
--elev-2: container depth
--elev-3: modal spotlight

/* Surfaces */
--chip-surface: 6% overlay
--frame-surface: 10% overlay

/* Core palette */
--cream: #FFFCEB
--ink: oklch(.22 .03 260)
--gold: oklch(.74 .08 90)
--accent: oklch(.88 .14 150)
```

## Mobile Specifics

- Gallery cards: `78vw` minimum for better mobile browsing (was 76vw)
- Snap to center maintained
- Edge fades show scroll direction
- Touch-optimized with `-webkit-overflow-scrolling: touch`

## Next Priority Items (Not Yet Applied)

1. Header cleanup: Ghost button for Resume with disclosure menu
2. Marquee opacity: Reduce to 0.25 or remove behind nav
3. Hero baseline grid: Lock shared baseline, equalize gutters
4. Contact chips: Full-click targets with purpose verbs ("Send", "View", etc.)
5. Gold contrast: Text shadow for AA compliance on cream
6. Page noise: 2% texture overlay to reduce gradient banding
