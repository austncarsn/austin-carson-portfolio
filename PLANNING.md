# Portfolio Website Refactor - Planning Document

## Executive Summary
Comprehensive refactor to modernize architecture, centralize design tokens, improve accessibility, and establish enterprise-grade testing and CI/CD pipeline.

## Current State Analysis

### Issues Identified
1. **Hardcoded values**: Colors, spacing, and typography scattered across components
2. **Inconsistent responsive patterns**: Mix of breakpoint-based and container queries
3. **Token fragmentation**: Design tokens split between CSS variables and Tailwind config
4. **No standardized media handling**: Images/videos lack consistent aspect ratios
5. **Accessibility gaps**: Missing skip links, inconsistent heading hierarchy, contrast issues
6. **No testing infrastructure**: No unit tests, E2E tests, or performance budgets
7. **Manual CI/CD**: No automated testing, linting, or deployment checks

### Current Component Inventory
- Navigation.tsx ✅ (Recently refactored)
- Hero.tsx ⚠️ (Needs token migration)
- Projects.tsx ⚠️ (Needs token migration)
- ImageGallery.tsx ⚠️ (Needs Aspect component)
- ContactCTA.tsx ⚠️ (Needs token migration)
- Section.tsx ⚠️ (Needs container query support)
- AccentRow.tsx ✅ (Design element)
- TypewriterText.tsx ✅ (Animation component)
- ProjectCard.tsx ⚠️ (Needs primitive components)
- BarcodeNav.tsx 🔄 (Legacy - consider deprecating)

## Refactor Goals

### 1. Design Token System
**Priority: P0 (Highest)**

#### Token Layers
```
primitive → semantic → component
```

**Primitive tokens** (CSS variables)
- Color: Base palette, no context
- Space: 0.25rem steps (0, 1, 2, 3, 4, 6, 8, 12, 16...)
- Typography: Base font sizes, line heights, weights
- Radius: xs, sm, md, lg, xl, 2xl, full
- Shadow: xs, sm, md, lg, xl
- Motion: 100ms, 150ms, 200ms, 250ms

**Semantic tokens** (Mapped from primitives)
- color-bg-canvas, color-bg-surface, color-bg-elevated
- color-text-primary, color-text-secondary, color-text-muted
- color-border-subtle, color-border-strong
- color-interactive-primary, color-interactive-secondary

**Component tokens** (Composed from semantic)
- button-padding-y, button-padding-x
- card-border-radius, card-shadow
- input-height, input-border-width

#### Color Modes
- Light (default)
- Dark
- High Contrast

### 2. Fluid Typography System
**Priority: P0**

Implement fluid type scale using clamp():
```css
--font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
--font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
/* Scale continues: 1.25-1.333 ratio */
```

### 3. Responsive System
**Priority: P0**

#### Breakpoints
```
xs: 360px  (Small mobile)
sm: 640px  (Mobile)
md: 768px  (Tablet)
lg: 1024px (Laptop)
xl: 1280px (Desktop)
2xl: 1536px (Large desktop)
```

#### Container Queries
Enable `@container` for component-level responsiveness:
```tsx
<div className="@container">
  <Card className="@lg:flex-row @md:flex-col" />
</div>
```

### 4. Media Component (Aspect)
**Priority: P1**

Standardized aspect ratios:
- 1:1 (Square - Profile images, thumbnails)
- 3:2 (Classic photo)
- 4:3 (Standard display)
- 16:9 (Widescreen - Hero images, videos)
- 21:9 (Ultrawide)
- 9:16 (Vertical - Mobile stories)
- 4:5 (Instagram portrait)

Features:
- Focal point support
- object-fit: cover | contain
- Skeleton loading state
- Lazy loading built-in

### 5. Primitive UI Components
**Priority: P1**

Build foundation library:

#### Button
Variants:
- Size: xs, sm, md, lg
- Emphasis: primary, secondary, tertiary, ghost
- State: base, hover, focus, active, disabled, loading
- Icon: none, leading, trailing, both

#### Input/Select/Textarea
- Consistent sizing
- Error states
- Helper text
- Label integration
- Accessibility built-in

#### Card
- Header, body, footer composition
- Interactive variants
- Loading states

### 6. Accessibility (WCAG 2.2 AA)
**Priority: P0**

#### Requirements
- ✅ Contrast ratio: 4.5:1 for text, 3:1 for UI components
- ✅ Interactive targets: Minimum 44x44px
- ✅ Skip links: "Skip to main content"
- ✅ Heading hierarchy: Ordered h1-h6
- ✅ Keyboard navigation: Focus visible, logical tab order
- ✅ ARIA labels: Proper landmarks, roles, labels
- ✅ Reduced motion: Respect prefers-reduced-motion
- ✅ Form labels: Explicit label-input associations
- ✅ Alt text: Descriptive image alternatives

### 7. Testing Infrastructure
**Priority: P1**

#### Unit Tests (Vitest + RTL)
- Component rendering
- User interactions
- Accessibility checks (jest-axe)
- Token usage validation

#### E2E Tests (Playwright)
- Cross-browser: Chrome, Firefox, Safari, Edge
- Viewports: 360x740, 768x1024, 1280x800, 1600x900, 1920x1080, 2560x1080
- User flows: Navigation, form submission, gallery interaction
- Visual regression testing

### 8. CI/CD Pipeline
**Priority: P1**

#### GitHub Actions Workflows
1. **Build**: Compile TypeScript, bundle assets
2. **Typecheck**: Strict mode validation
3. **Lint**: ESLint + Prettier
4. **Test**: Unit + E2E
5. **LHCI**: Lighthouse CI with budgets
6. **Deploy**: Automated deployment on merge

#### Performance Budgets
```json
{
  "lighthouse": {
    "performance": 95,
    "accessibility": 98,
    "best-practices": 95,
    "seo": 95
  },
  "budgets": {
    "bundle-size": {
      "js": "200kb",
      "css": "50kb",
      "images": "500kb"
    },
    "metrics": {
      "fcp": 1800,
      "lcp": 2500,
      "cls": 0.1,
      "tti": 3800
    }
  }
}
```

### 9. Documentation
**Priority: P2**

Files to create:
- **README.md**: Project overview, setup, scripts
- **DESIGN-SYSTEM.md**: Token reference, component API
- **MIGRATION.md**: Step-by-step migration guide
- **ARCHITECTURE.md**: Technical decisions, patterns

Optional:
- Storybook for component playground
- Prop tables for API documentation

## Implementation Strategy

### PR Stack (Incremental Rollout)

#### PR #1: Design Token Foundation
- [ ] Create token CSS variables
- [ ] Update Tailwind config to consume tokens
- [ ] Document token usage
- [ ] No component changes yet

#### PR #2: Typography System
- [ ] Implement fluid type scale
- [ ] Create utility classes
- [ ] Update documentation
- [ ] Migrate 2-3 components as proof of concept

#### PR #3: Aspect Media Component
- [ ] Build Aspect primitive
- [ ] Add focal point support
- [ ] Create variants for all ratios
- [ ] Write tests
- [ ] Migrate ImageGallery

#### PR #4: Primitive UI Library
- [ ] Button component with variants
- [ ] Input/Select/Textarea
- [ ] Card component
- [ ] Write comprehensive tests
- [ ] Storybook stories (optional)

#### PR #5: Component Migration (Blocks)
- [ ] Migrate Hero with new primitives
- [ ] Migrate Projects with new primitives
- [ ] Migrate ContactCTA
- [ ] Update Navigation to use tokens
- [ ] Remove deprecated components

#### PR #6: Testing & CI
- [ ] Set up Vitest + RTL
- [ ] Write unit tests for primitives
- [ ] Set up Playwright
- [ ] Write E2E tests for critical paths
- [ ] Configure GitHub Actions

#### PR #7: Performance & Docs
- [ ] Implement code splitting
- [ ] Add image optimization
- [ ] Set up Lighthouse CI
- [ ] Write all documentation
- [ ] Final accessibility audit

## Success Criteria

### Technical
- ✅ 100% TypeScript strict mode
- ✅ Zero hardcoded colors/spacing in components
- ✅ All interactive targets ≥44px
- ✅ WCAG 2.2 AA compliant (axe DevTools)
- ✅ Lighthouse scores: P:95+, A:98+, BP:95+, SEO:95+
- ✅ 80%+ test coverage
- ✅ CI pipeline: All checks passing

### Developer Experience
- ✅ Clear token documentation
- ✅ Reusable primitive library
- ✅ Fast test feedback (<10s unit, <2min E2E)
- ✅ Automated PR checks
- ✅ Self-documenting components

### User Experience
- ✅ Consistent visual language
- ✅ Smooth responsive behavior
- ✅ Fast page loads (LCP <2.5s)
- ✅ Keyboard navigable
- ✅ Screen reader accessible

## Timeline Estimate

| Phase | Effort | Duration |
|-------|--------|----------|
| Token System | 4h | 1 day |
| Typography | 3h | 1 day |
| Aspect Component | 2h | 1 day |
| Primitive Library | 8h | 2 days |
| Component Migration | 6h | 2 days |
| Testing Setup | 6h | 2 days |
| CI/CD | 4h | 1 day |
| Documentation | 4h | 1 day |
| **Total** | **37h** | **11 days** |

## Risk Mitigation

### Breaking Changes
- Incremental PRs prevent big-bang refactor
- Feature flags for new components
- Parallel implementation (keep old until new is proven)

### Visual Regressions
- Visual regression tests (Playwright screenshots)
- Manual QA checklist per PR
- Staging environment for preview

### Performance Regressions
- Lighthouse CI budget enforcement
- Bundle size monitoring
- Core Web Vitals tracking

## Next Steps

1. ✅ Create this planning document
2. ⏳ Review and approve plan
3. ⏳ Begin PR #1: Design Token Foundation
4. ⏳ Set up project board for tracking
5. ⏳ Create PRs according to stack

---

**Document Status**: Draft v1.0
**Last Updated**: November 6, 2025
**Owner**: Austin Carson
