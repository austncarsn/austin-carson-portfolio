/**
 * WorkSection Integration — QA Checklist
 * Run before deploying to production
 */

// ============================================================================
// KEYBOARD NAVIGATION
// ============================================================================
// ☑ Tab through all filter buttons
// ☑ Tab through all project rows
// ☑ Press Enter on filter → filter changes
// ☑ Press Space on filter → filter changes
// ☑ Press Enter on project row → navigates/opens
// ☑ Focus indicators visible (2px solid var(--primary))
// ☑ Skip to main content link works

// ============================================================================
// REDUCED MOTION
// ============================================================================
// System Settings → Accessibility → Display → Reduce Motion → ON
// ☑ Arrow indicator animation STOPS (no translateX)
// ☑ Filter transitions still smooth (opacity only)
// ☑ No layout shift or jank during filter changes
// ☑ Image hover scale-110 disabled

// ============================================================================
// MOBILE 360px (iPhone SE / Small Android)
// ============================================================================
// DevTools → Responsive Design Mode → 360×640
// ☑ No horizontal overflow (body, containers)
// ☑ Filter buttons min 44px tap targets (iOS guideline)
// ☑ Project rows min 44px tap targets
// ☑ Arrow indicator hidden on mobile (md+ only)
// ☑ Text does not wrap awkwardly or truncate
// ☑ Grid layout: 1 column on mobile, 2 on tablet (md:), full on desktop (lg:)

// ============================================================================
// DARK MODE CONTRAST
// ============================================================================
// System → Appearance → Dark
// ☑ Filter button labels pass WCAG AA (4.5:1)
// ☑ Project titles pass WCAG AA
// ☑ Category/client labels pass WCAG AA (3:1 for large text)
// ☑ Border colors visible but not harsh
// ☑ Hover states perceptible in dark mode
// Chrome DevTools → Lighthouse → Accessibility → 100 score

// ============================================================================
// CUMULATIVE LAYOUT SHIFT (CLS)
// ============================================================================
// Chrome DevTools → Performance → Record 6s → Stop
// ☑ Image wrappers use aspect-[4/3] (prevents jump on load)
// ☑ Filter buttons have fixed height (no shift when switching)
// ☑ No content shifts after fonts load
// ☑ CLS score < 0.1 (good)

// ============================================================================
// FILTERS & EMPTY STATE
// ============================================================================
// ☑ "All" filter present as first option
// ☑ Filters auto-derived from project categories (sorted alphabetically)
// ☑ Clicking "All" shows all projects
// ☑ Clicking category filter shows only matching projects
// ☑ Empty state renders when no projects match filter
// ☑ Empty state has role="status" for screen readers
// ☑ aria-live="polite" announces filter changes to SR

// ============================================================================
// SCREEN READER (macOS VoiceOver)
// ============================================================================
// Safari → VoiceOver (Cmd+F5)
// ☑ Filters announced as "tab, 1 of 4, All"
// ☑ Selected filter announced with "selected"
// ☑ Project list announced as "list, 5 items"
// ☑ Each project row announced with title, category, client
// ☑ Filter changes announced via aria-live
// ☑ Image alt text descriptive (not "image" or filename)

// ============================================================================
// PERFORMANCE (Lighthouse)
// ============================================================================
// Chrome DevTools → Lighthouse → Performance
// ☑ First Contentful Paint < 1.8s
// ☑ Largest Contentful Paint < 2.5s
// ☑ Total Blocking Time < 200ms
// ☑ Cumulative Layout Shift < 0.1
// ☑ Images use loading="lazy"
// ☑ No unnecessary re-renders (check React DevTools Profiler)

// ============================================================================
// CROSS-BROWSER (BrowserStack or manual)
// ============================================================================
// ☑ Safari 16+ (macOS, iOS)
// ☑ Chrome 120+ (Windows, macOS, Android)
// ☑ Firefox 120+ (Windows, macOS)
// ☑ Edge 120+ (Windows)
// ☑ Mobile Safari iOS 15+ (iPhone 12, 13, 14, 15)
// ☑ Chrome Android 120+ (Pixel, Samsung)

// ============================================================================
// EDGE CASES
// ============================================================================
// ☑ Zero projects → empty state renders
// ☑ One project → no filter buttons (or only "All")
// ☑ Project with no href → onProjectOpen fires instead
// ☑ Project with external href → opens in new tab
// ☑ Very long project title → truncates or wraps gracefully
// ☑ Missing image → ImageWithFallback shows placeholder
// ☑ Duplicate category names → no filter duplication

// ============================================================================
// DATA VALIDATION
// ============================================================================
// ☑ All projects have unique `id` values
// ☑ All projects have `title`, `image`, `category`
// ☑ Categories are consistent (no typos: "Web App" vs "WebApp")
// ☑ Image paths exist and load correctly
// ☑ href values are valid (internal: /work/slug, external: https://)
// ☑ No TypeScript errors (npm run build)
// ☑ No console errors in browser

// ============================================================================
// TOKENS REQUIRED
// ============================================================================
// ☑ --warm-lightest (background)
// ☑ --primary (text, focus rings)
// ☑ --warm-stone (labels, metadata)
// ☑ --warm-tan (borders, filter backgrounds)
// ☑ --warm-medium (filter hover states)
// ☑ --elev-1 (image shadows)

// ============================================================================
// DEPLOYMENT CHECKLIST
// ============================================================================
// ☑ npm run build → no errors
// ☑ Vercel preview deploy → test on real device
// ☑ Lighthouse CI score > 90 (all categories)
// ☑ No broken links (internal or external)
// ☑ Analytics tracking verified (if enabled)
// ☑ SEO metadata present (if using microdata)
// ☑ Git commit with clear message: "feat: integrate WorkSection with filterable projects"

export {};
