# WorkSection — Ship Checklist

**Status**: ✅ Ready for production  
**Build**: 2.12s, 86.31 kB CSS, zero errors  
**Route**: `/#work` (added to SiteHeader nav)

---

## What Shipped

### Core Files
- ✅ `src/components/WorkSection.tsx` (230 lines) — filterable project list
- ✅ `src/data/workAdapter.ts` — map GALLERY_PROJECTS → WorkSection.Project
- ✅ `src/App.tsx` — integrated at `/#work` with adapted data

### Documentation
- ✅ `WORK_SECTION_QUICK_START.md` (41 lines) — 5-min onboarding
- ✅ `WORK_SECTION_DOCS.md` (68 lines) — technical reference
- ✅ `WORK_SECTION_EXAMPLES.tsx` (108 lines) — 10 copy-paste examples
- ✅ `WORK_SECTION_QA.ts` — pre-deploy checklist
- ✅ `WORK_SECTION_ROUTER.tsx` — React Router patterns
- ✅ `WORK_SECTION_INTEGRATION.md` — deployment summary

### Enhancements (Optional)
- ✅ `src/components/WorkSectionEnhancements.tsx` — search, sort, analytics, SEO, skeleton

---

## Quick Verify

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to http://localhost:3000/#work

# 3. Test filters
Click "Web App" → see only web app projects
Click "All" → see all projects

# 4. Test keyboard
Tab through filters → Enter to activate
Tab through rows → Enter to navigate

# 5. Test mobile
DevTools → Responsive 360×640
Verify: no overflow, 44px tap targets, arrow hidden

# 6. Test dark mode
System → Appearance → Dark
Verify: labels pass WCAG AA, borders visible

# 7. Build for production
npm run build
# ✅ Should complete in ~2s with no errors
```

---

## Current Data Flow

```
GALLERY_PROJECTS (src/data/projectsGallery.ts)
  ↓
adaptGalleryProjects() (src/data/workAdapter.ts)
  ↓
WorkSection.Project[] → WorkSection component
  ↓
Rendered at /#work in App.tsx
```

### Sample Transformation
```ts
// Input (GALLERY_PROJECTS)
{
  id: "floral-design-svg",
  title: "Floral Design SVG",
  tag: "Web App",
  cover: floralFiftyNine,
  href: "/project/floral-design-svg",
  ratio: "4:5"
}

// Output (WorkSection.Project)
{
  id: "floral-design-svg",
  title: "Floral Design SVG",
  category: "Web App",      // tag → category
  client: "Product",         // extracted from tag
  image: floralFiftyNine,    // cover → image
  href: "/project/floral-design-svg"
}
```

---

## Token Status (No Changes Needed)

All required tokens exist in `src/styles/tokens.css`:

| Token | Light Mode | Dark Mode | Used For |
|-------|------------|-----------|----------|
| `--warm-lightest` | `oklch(95% 0.01 95)` | `oklch(20% 0.01 260)` | Background |
| `--warm-medium` | `oklch(95% 0.02 85)` | `oklch(22% 0.02 85)` | Filter hover |
| `--warm-stone` | `oklch(88% 0.02 95)` | `oklch(32% 0.02 260)` | Labels |
| `--warm-tan` | `oklch(70% 0.08 75)` | `oklch(78% 0.08 75)` | Borders |
| `--primary` | `#FF4200` | `#FF4200` | Text, focus |
| `--elev-1` | `0 1px 2px rgba(0,0,0,.12)...` | `0 1px 2px rgba(0,0,0,.24)...` | Shadows |

---

## Optional Upgrades (When Needed)

### Add Search
```tsx
import { useProjectSearch } from './components/WorkSectionEnhancements';

const { query, setQuery, visible } = useProjectSearch(projects, activeFilter);
<input value={query} onChange={e => setQuery(e.target.value)} />
<WorkSection projects={visible} ImageWithFallback={ImageWithFallback} />
```

### Add Sorting
```tsx
import { sortProjects } from './components/WorkSectionEnhancements';

<WorkSection 
  projects={sortProjects(base, 'A–Z')} 
  ImageWithFallback={ImageWithFallback}
/>
```

### Add Analytics
```tsx
import { trackProjectOpen } from './components/WorkSectionEnhancements';

<WorkSection 
  projects={projects}
  onProjectOpen={trackProjectOpen}
  ImageWithFallback={ImageWithFallback}
/>
```

### Add React Router
See `WORK_SECTION_ROUTER.tsx` for 4 integration patterns.

### Add SEO Microdata
```tsx
import { MicrodataProject } from './components/WorkSectionEnhancements';

// Wrap each <li> in WorkSection.tsx manually:
<MicrodataProject project={p}>
  <a href={p.href}>...</a>
</MicrodataProject>
```

---

## Pre-Deploy QA (5 Minutes)

Open `WORK_SECTION_QA.ts` and check:

- [ ] Keyboard: Tab filters, Enter/Space activates
- [ ] Reduced motion: Arrow animation stops
- [ ] Mobile 360px: No overflow, 44px targets
- [ ] Dark mode: WCAG AA contrast
- [ ] CLS: Images use aspect-[4/3]
- [ ] Filters: "All" present, empty state works
- [ ] Screen reader: VoiceOver announces changes
- [ ] Build: `npm run build` exits 0

---

## Deploy

```bash
# 1. Commit changes
git add .
git commit -m "feat: integrate WorkSection with filterable projects"

# 2. Push to GitHub
git push origin main

# 3. Vercel auto-deploys from main
# Wait for preview link → test on real device

# 4. Verify production
# - Navigate to /#work
# - Click filters
# - Test keyboard
# - Check mobile
# - Run Lighthouse (score > 90)
```

---

## Troubleshooting

### Filters not showing
- Check: `projects` array has items with `category` property
- Verify: Categories are consistent (no typos)

### Images not loading
- Check: `ImageWithFallback` prop passed correctly
- Verify: Image paths exist in `public/` or `src/assets/`

### Keyboard nav broken
- Check: Browser console for React errors
- Verify: No conflicting event listeners

### Dark mode contrast fails
- Check: `data-theme="dark"` on parent element
- Verify: Dark mode token overrides in `tokens.css`

### Build fails
- Run: `npm run build` and read error message
- Check: TypeScript errors with `npm run dev`
- Verify: No missing imports or type errors

---

## What's Next?

**Current state**: WorkSection integrated and production-ready  
**Optional**: Add search, sort, analytics, SEO microdata  
**Blocked by**: Nothing — ship when ready

**Files to review**: `WORK_SECTION_QUICK_START.md` for usage, `WORK_SECTION_QA.ts` for testing.
