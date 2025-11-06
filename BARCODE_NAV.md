# Barcode Navigation

A full-width navigation strip with dynamic barcode tint effects. Each nav item controls the color of the entire barcode region on hover/focus.

## Features

- **Full-width strip** above existing navigation (64px desktop, 56px tablet, 48px mobile)
- **Dynamic color tinting**: Hover/focus on any nav item changes the barcode tint to that item's color
- **Keyboard accessible**: Tab through items, tint responds to focus
- **Reduced motion support**: Instant color changes when user prefers reduced motion
- **Responsive**: Works from 320px to 1920px viewports

## Adding Navigation Items

Edit `src/components/BarcodeNav.tsx` and modify the `NAV_ITEMS` array:

```typescript
const NAV_ITEMS: Item[] = [
  { label: 'WORK', href: '#work', color: '#243B53' },
  { label: 'CONTACT', href: '#contact', color: '#1F6F50' },
  { label: 'GITHUB', href: 'https://github.com/austncarsn', color: '#7A271A', external: true },
  { label: 'RESUME', href: '/resume', color: '#5E4DB2' },
];
```

### Item Properties

- **label**: Display text (uppercase recommended)
- **href**: Link destination (use `#section` for in-page, `/path` for routes, or full URL for external)
- **color**: Hex color for barcode tint on hover/focus
- **external** (optional): Set to `true` for external links (adds `↗` icon and opens in new tab)

## CSS Variables

The following CSS variables control the barcode appearance (defined in `src/index.css`):

```css
--bar-surface: #FBF7ED;             /* Background behind barcode */
--bar-ink: rgba(12, 16, 20, 0.90);  /* Barcode stripe color */
--bar-accent-default: #2B3137;      /* Default tint when idle */
--bar-link: #1C2A39;                /* Link text color */
--bar-hover: color-mix(in oklab, var(--bar-accent) 12%, transparent);
--bar-focus: color-mix(in oklab, var(--bar-accent) 28%, black 0%);
```

## How It Works

1. **Base layer**: Cream-colored surface (`--bar-surface`)
2. **Barcode pattern**: Repeating vertical stripes using `repeating-linear-gradient`
3. **Tint overlay**: Color-mixed gradient that responds to `--bar-accent` CSS variable
4. **Interactive grid**: 4-column nav grid positioned above the visual layers
5. **Color control**: Each nav item updates `--bar-accent` on hover/focus, triggering the tint change

## Implementation

The component is integrated into the main navigation via:

```tsx
import BarcodeNav from './BarcodeNav';

// Inside Navigation component
return (
  <>
    <BarcodeNav />
    <nav>{/* existing nav content */}</nav>
  </>
);
```

## Accessibility

- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ Focus indicators with ring
- ✅ ARIA labels on all links
- ✅ External links marked with icon and proper `rel` attributes
- ✅ Respects `prefers-reduced-motion`
- ✅ Minimum 44px touch targets

## Performance

The barcode pattern uses CSS gradients (no images), ensuring:
- Fast rendering
- No HTTP requests
- Scales perfectly at any resolution
- Lightweight (< 1KB for the pattern)
