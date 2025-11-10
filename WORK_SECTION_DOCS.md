# WorkSection — Technical Guide

## Overview
Filterable, token-driven project list with enterprise a11y, reduced motion, and responsive 12-col grid.

## Data Shape
```ts
export type Project = {
  id: string;
  title: string;
  image: string;
  category: string;
  client?: string;
  href?: string;        // route or external link
  onClick?: () => void; // optional override
};
```

## Props

**`projects`** (required)

**`ImageWithFallback`** (required)

**`initialFilter`**, **`filters`**, **`onProjectOpen`** (optional)

## Tokens

**Background**: `--warm-lightest`

**Titles**: `--primary`

**Labels**: `--warm-stone`

**Category text**: `--warm-tan`

**Borders**: `--warm-medium`

**Shadow**: `--elev-1` (optional)

## Accessibility

Semantic list (`<ul><li>`), filter buttons with `aria-pressed` and `role="tab"`.

Whole row is a link; 44px min hit area.

`aria-live="polite"` on list container for SR feedback when filters change.

Focus styles via your global focus utility; no `outline: none`.

## Motion & Performance

Motion gated by `prefers-reduced-motion`.

GPU-accelerated transforms only; no layout thrash.

Images lazy by your `ImageWithFallback` impl; wrapper has fixed aspect ratio to prevent CLS.

Derived filters memoized; list filtering memoized.

## Responsive

**Mobile**: stacked, arrow badge shown md+.

**Tablet**: 12-col, image+title side-by-side.

**Desktop**: full layout; animated arrow indicator.

## Integration Patterns

### React Router

```tsx
import { useNavigate } from "react-router-dom";
const nav = useNavigate();
<WorkSection
  projects={projects.map(p => ({ ...p, onClick: () => nav(p.href!) }))}
  ImageWithFallback={ImageWithFallback}
/>
```

### Next.js Link
Use `onClick` or accept full-row `<a>` default and let the browser navigate. If you prefer `<Link>`, wrap rows in a custom renderer (advanced).

## Empty State

Displays a neutral message if filter returns zero results. Customize by checking `projects.length` before render.

## Testing Checklist

- **Keyboard**: filters and rows activate; focus ring visible.
- **Screen readers**: filters announce pressed state; list count changes announced.
- **Motion**: verify both reduced and normal.
- **Contrast**: labels ≥ 4.5:1; titles ≥ 3:1 at large sizes.
- **Mobile**: no horizontal scroll; tap targets comfy.

## Migration Notes

Safe to drop into any page; no global CSS beyond tokens & focus utility.

If your data uses different keys, map into `Project` at call site.

## Features
✅ Auto-derived category filters from project data  
✅ "All" filter shows everything  
✅ Keyboard navigation (Tab, Enter, Space)  
✅ Reduced motion support (respects user preferences)  
✅ ARIA semantics (tablist, live regions, status)  
✅ Focus indicators on all interactives  
✅ Token-driven styling (no magic colors)  
✅ Responsive grid layout  
✅ Lazy image loading  
✅ Hover effects with smooth transitions  

## Props

```typescript
type Project = {
  id: string;              // Unique identifier
  title: string;           // Project title
  image: string;           // Image URL
  category: string;        // Category for filtering
  client?: string;         // Optional client name
  href?: string;           // Optional link URL
  onClick?: () => void;    // Optional click handler
};

type WorkSectionProps = {
  projects: Project[];                    // Array of projects to display
  initialFilter?: string;                 // Starting filter (defaults to "All")
  onProjectOpen?: (p: Project) => void;   // Fallback handler if no href/onClick
  filters?: string[];                     // Optional explicit filter order
  ImageWithFallback?: (props: {          // Optional custom image component
    src: string;
    alt: string;
    className?: string;
  }) => JSX.Element;
};
```

## Basic Usage

```tsx
import { WorkSection } from './components/WorkSection';

const projects = [
  {
    id: "sora-ui",
    title: "AI-Powered Educational Interfaces",
    image: "/images/work/sora-01.jpg",
    category: "AI/Design Systems",
    client: "Personal",
    href: "/work/sora-ui"
  },
  {
    id: "chrome-cameo",
    title: "Chrome Cameo Extension",
    image: "/images/work/chrome-cameo.png",
    category: "Browser Extensions",
    client: "Freelance",
    onClick: () => console.log("Custom handler!")
  },
  // ... more projects
];

<WorkSection
  projects={projects}
  initialFilter="All"
/>
```

## Advanced Usage

### With Router Integration

```tsx
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <WorkSection
      projects={projects}
      onProjectOpen={(project) => navigate(`/work/${project.id}`)}
    />
  );
}
```

### With Custom Image Component

```tsx
import { ImageWithFallback } from './components/ImageWithFallback';

<WorkSection
  projects={projects}
  ImageWithFallback={ImageWithFallback}
/>
```

### With Custom Filter Order

```tsx
<WorkSection
  projects={projects}
  filters={["All", "AI/Design Systems", "Web Apps", "Browser Extensions"]}
  initialFilter="AI/Design Systems"
/>
```

## Accessibility Features

### Keyboard Navigation
- **Tab**: Navigate between filter buttons and project rows
- **Enter/Space**: Activate focused filter or project
- **Arrow Keys**: Navigate within filter tablist

### Screen Reader Support
```html
<!-- Semantic structure -->
<section aria-labelledby="work-heading">
  <h2 id="work-heading">Projects</h2>
  
  <div role="tablist" aria-label="Project filters">
    <button role="tab" aria-selected="true" aria-pressed="true">All</button>
    <button role="tab" aria-selected="false" aria-pressed="false">AI/Design Systems</button>
  </div>
  
  <ul aria-live="polite">
    <!-- Projects update announced -->
  </ul>
</section>
```

### Focus Management
- All interactive elements have visible focus indicators via `.focus-ring`
- Focus outline respects token system (`--focus-ring-color`)
- 44px minimum touch targets for mobile

### Live Regions
- Filter changes announced via `aria-live="polite"`
- Empty state has `role="status"` for screen reader notification

## Responsive Behavior

### Mobile (< 640px)
- Single column title
- Category and client stack vertically
- Arrow indicator hidden
- Reduced padding and gaps

### Tablet (640px - 1024px)
- 12-column grid activates
- Image takes 5 columns
- Title takes 6 columns
- Metadata displayed side-by-side

### Desktop (1024px+)
- Full 12-column layout
- Arrow indicator visible
- Larger typography
- Increased spacing

## Token System

All colors use CSS custom properties:

```css
/* Background */
--warm-lightest: oklch(20% 0.01 260);

/* Text */
--primary: oklch(98% 0.01 95);          /* Titles */
--warm-stone: oklch(88% 0.02 95);       /* Meta labels */
--warm-tan: oklch(70% 0.08 75);         /* Category text */

/* Borders */
--warm-medium: oklch(95% 0.02 85);      /* Dividers */

/* Shadows */
--elev-1: 0 1px 2px rgba(0,0,0,.12);    /* Image cards */
```

## Reduced Motion Support

The component detects `prefers-reduced-motion: reduce` and disables:
- Entry animations (fade/slide)
- Stagger delays
- Pulsing arrow animation

Static fallbacks are provided for all motion effects.

## Performance Optimizations

### Memoization
```typescript
const reduceMotion = useMemo(
  () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  []
);

const derivedFilters = useMemo(() => {
  // Auto-derive from categories
}, [projects, filters]);

const visible = useMemo(() => {
  // Filter projects based on active filter
}, [projects, activeFilter]);
```

### Lazy Loading
- Images use `loading="lazy"` attribute
- Off-screen images deferred until scroll

### GPU Acceleration
- Transforms use `will-change-transform`
- Smooth animations via `transform` (not `left/top`)

## Styling Customization

### Override Tokens
```css
:root[data-theme="noir"] {
  --primary: oklch(92% 0.02 85);        /* Lighter title */
  --warm-medium: oklch(88% 0.02 75);    /* Lighter dividers */
}
```

### Custom Classes
```tsx
<WorkSection
  projects={projects}
  className="custom-work-section"  // Add to section
/>
```

### Tailwind Extensions
```tsx
// Extend gap or spacing
<ul className="space-y-10">  {/* Instead of space-y-8 */}
```

## Testing

### Unit Tests
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('filters projects by category', async () => {
  render(<WorkSection projects={mockProjects} />);
  
  const aiFilter = screen.getByRole('tab', { name: /AI\/Design Systems/i });
  await userEvent.click(aiFilter);
  
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('keyboard navigation works', async () => {
  render(<WorkSection projects={mockProjects} />);
  
  const firstProject = screen.getAllByRole('link')[0];
  firstProject.focus();
  
  await userEvent.keyboard('{Enter}');
  
  expect(mockOnProjectOpen).toHaveBeenCalled();
});
```

### Accessibility Tests
```tsx
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<WorkSection projects={mockProjects} />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});
```

## Common Patterns

### Dynamic Categories
```tsx
const projects = await fetchProjects();
const categories = [...new Set(projects.map(p => p.category))];

<WorkSection
  projects={projects}
  filters={["All", ...categories]}
/>
```

### With Loading State
```tsx
function ProjectsPage() {
  const { data: projects, isLoading } = useProjects();
  
  if (isLoading) return <LoadingSkeleton />;
  
  return <WorkSection projects={projects} />;
}
```

### With Error Boundary
```tsx
<ErrorBoundary fallback={<ErrorMessage />}>
  <WorkSection projects={projects} />
</ErrorBoundary>
```

## Troubleshooting

### Filters Not Showing
- **Issue**: Only "All" filter appears
- **Fix**: Ensure `category` field is set on all projects
- **Check**: `projects.every(p => p.category)` returns true

### Images Not Loading
- **Issue**: Broken image icons
- **Fix**: Provide `ImageWithFallback` component with error handling
- **Example**:
```tsx
function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);
  
  if (error) return <div className={className}>Image unavailable</div>;
  
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
}
```

### Navigation Not Working
- **Issue**: Clicking project does nothing
- **Fix**: Provide either `href`, `onClick`, or `onProjectOpen`
- **Priority**: `onClick` > `href` > `onProjectOpen`

### Animations Janky
- **Issue**: Stuttering on scroll
- **Fix**: Ensure `will-change-transform` is applied
- **Check**: Browser DevTools Performance tab

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

### Polyfills Required
- None (uses modern APIs with graceful degradation)

### Feature Detection
```typescript
const reduceMotion = useMemo(
  () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  []
);
```

## Migration Guide

### From Old Projects Component

**Before:**
```tsx
<Projects
  title="My Work"
  items={projectData}
  showFilters={true}
/>
```

**After:**
```tsx
<WorkSection
  projects={projectData.map(item => ({
    id: item.slug,
    title: item.name,
    image: item.thumbnail,
    category: item.type,
    client: item.clientName,
    href: `/projects/${item.slug}`
  }))}
/>
```

## Future Enhancements

- [ ] Search functionality (filter by title/client)
- [ ] Sort options (date, alphabetical, category)
- [ ] Grid/List view toggle
- [ ] Infinite scroll / pagination
- [ ] Deep linking (URL params for active filter)
- [ ] Analytics tracking on filter/project clicks
- [ ] Image preloading on hover
- [ ] Share project via social media

## Related Components

- `ProjectDetail` - Individual project page
- `ImageWithFallback` - Error-safe image loading
- `FilterGroup` - Reusable filter component
- `ProjectCard` - Alternative card-based layout

## License

MIT License - Use freely in personal and commercial projects.
