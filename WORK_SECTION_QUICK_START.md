# WorkSection — Quick Start

## Install
1. Add `src/components/WorkSection.tsx` (already built).
2. Ensure tokens exist:
   - `--warm-lightest`, `--primary`, `--warm-stone`, `--warm-tan`, `--warm-medium`, `--elev-1`

## Minimal Usage
```tsx
import { WorkSection, type Project } from "@/components/WorkSection";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const projects: Project[] = [
  { 
    id: "sora-ui", 
    title: "AI-Powered Educational Interfaces", 
    image: "/img/sora.jpg", 
    category: "AI/Design Systems", 
    client: "Personal", 
    href: "/work/sora-ui" 
  },
];

<WorkSection projects={projects} ImageWithFallback={ImageWithFallback} />
```

## Props

**`projects`**: `Project[]` (id, title, image, category, client?, href?, onClick?)

**`ImageWithFallback`**: `(props:{src;alt;className?}) => JSX.Element`

**`initialFilter?`**: `string`

**`filters?`**: `string[]` (override order; "All" auto-added)

**`onProjectOpen?`**: `(p: Project) => void`

## A11y & Motion

Fully keyboard navigable; Enter/Space activate row.

`prefers-reduced-motion` respected; animations soften/disable.

44px+ targets; visible focus.

## Verify (5-min)

1. Tab through filters and rows; Enter opens.
2. Try dark mode; confirm contrast on labels and borders.
3. Flip `prefers-reduced-motion`; arrow stops animating.
4. Shrink to 360px; image scales, text wraps, arrow visible on md+ only.
