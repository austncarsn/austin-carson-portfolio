# Typography Migration Guide

## Overview
This document tracks the migration of components from hardcoded font sizes to the fluid typography token system.

## Typography Token Scale

Our design system uses fluid typography with `clamp()` functions that scale between viewport sizes:

### Display Sizes (Hero Headlines)
- `text-display-2xl` → 72-96px (4.5-6rem) - Primary hero headlines
- `text-display-xl` → 60-72px (3.75-4.5rem) - Secondary hero headlines  
- `text-display-lg` → 48-60px (3-3.75rem) - Section headers
- `text-display-md` → 40-48px (2.5-3rem) - Large headings
- `text-display-sm` → 32-40px (2-2.5rem) - Medium headings

### Heading Sizes
- `text-h1` → 32-36px (2-2.25rem) - Main section headings
- `text-h2` → 28-32px (1.75-2rem) - Sub-section headings
- `text-h3` → 24-28px (1.5-1.75rem) - Card/component headings
- `text-h4` → 20-24px (1.25-1.5rem) - Small headings
- `text-h5` → 18-20px (1.125-1.25rem) - Micro headings
- `text-h6` → 16-18px (1-1.125rem) - Tiny headings

### Body Sizes
- `text-body-xl` → 20-22px (1.25-1.375rem) - Large body text
- `text-body-lg` → 18-20px (1.125-1.25rem) - Lead paragraphs
- `text-body-md` → 16-18px (1-1.125rem) - Standard body (base)
- `text-body-sm` → 14-16px (0.875-1rem) - Small body text
- `text-body-xs` → 12-14px (0.75-0.875rem) - Micro text

### Utility Sizes
- `text-caption` → 12-13px (0.75-0.8125rem) - Captions, labels
- `text-overline` → 10-11px (0.625-0.6875rem) - Overline text, metadata

## Migration Examples

### Before (Hardcoded)
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  Austin Carson
</h1>
```

### After (Design Tokens)
```tsx
<h1 className="text-display-lg md:text-display-xl">
  Austin Carson
</h1>
```

### Before (Hardcoded with arbitrary values)
```tsx
<span className="text-[10px] sm:text-[11px]">
  METADATA
</span>
```

### After (Design Tokens)
```tsx
<span className="text-overline">
  METADATA
</span>
```

## Component Migration Status

### ✅ Completed
- [x] **Hero.tsx** - Already using token system
  - Display headlines: `text-display-2xl`
  - Subheadings: `text-h1` - `text-h4`
  - Body text: `text-body-lg`, `text-base`

- [x] **Navigation.tsx** - Minimal changes needed
  - Logo text uses inline sizing

### 🔄 In Progress
- [ ] **ProjectCard.tsx** - Needs comprehensive update
  - Metadata labels: `text-[10px]` → `text-overline`
  - Role badge: `text-xs sm:text-sm` → `text-caption`
  - Card title: `text-lg sm:text-xl md:text-2xl` → `text-h3`
  - Subtitle: `text-xs sm:text-sm` → `text-body-sm`
  - Description: `text-xs sm:text-sm` → `text-body-sm`
  - Button text: `text-sm` → `text-body-sm`

- [ ] **ContactCTA.tsx** - Needs update
  - Section headings and body text

- [ ] **FortuneBox.tsx** - Needs update
  - Labels and fortune text

### ⏳ Not Started
- [ ] **ProjectDetail.tsx**
- [ ] **Resume.tsx**
- [ ] **ImageGallery.tsx**
- [ ] **AccentRow.tsx**
- [ ] **BarcodeNav.tsx**

## Migration Checklist

For each component:

1. **Identify all text elements** with hardcoded sizes
2. **Map to appropriate token** from the scale above
3. **Replace** `text-[arbitrary]` and `text-{size}` with tokens
4. **Test responsiveness** across breakpoints (360px-1536px+)
5. **Verify contrast** meets WCAG 2.2 AA standards (4.5:1 body, 3:1 headings)
6. **Commit changes** with descriptive message

## Benefits of Token System

✅ **Consistency** - All typography uses the same scale
✅ **Responsive** - Fluid scaling eliminates breakpoint-specific sizes
✅ **Maintainable** - Change scale in one place (`tokens.css`)
✅ **Accessible** - Enforces minimum sizes for readability
✅ **Performance** - Reduces CSS bundle size (no arbitrary values)

## Next Steps

1. Migrate ProjectCard.tsx (highest impact - used across portfolio)
2. Migrate ContactCTA.tsx (complex component)
3. Update remaining components systematically
4. Remove all arbitrary font size values
5. Document component-specific patterns
6. Add visual regression tests

---

**Last Updated:** PR #2 (November 6, 2025)
