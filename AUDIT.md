# Audit

## Types
- **High** Missing `tsconfig.json` prevented project-wide strict type checking.
- **Medium** Invalid `'instant'` scroll behavior cast in `src/components/ScrollToTop.tsx` risked runtime issues.
- **Low** Exported components lacked JSDoc, reducing clarity for future contributors.

## Accessibility
- **High** Section links in `src/components/Navigation.tsx` triggered full page reloads, breaking focus management when returning from detail pages.
- **Medium** Fortune widget used a `<div role="button">`, duplicating keyboard logic and omitting native semantics.
- **Medium** Navigation lacked `aria-current` signalling for the active location.
- **Medium** Contact CTA grid collapsed on small screens, impacting readability.
- **Low** 404 contact link pointed to `#contact`, which is absent on that route.

## Performance
- **Medium** Navigation forced document reloads for in-page anchors, discarding shell state.
- **Low** Scroll progress animation ignored reduced motion preferences.
- **Low** `Navigation` hash handler used `setTimeout` without cleanup.

## Dead Code
- **High** `src/components/ui/` directory and 30+ Radix/shadcn dependencies were unused.
- **Medium** `src/components/figma/ImageWithFallback.tsx` orphaned after design exploration.
- **Medium** `src/styles/globals.css` duplicated Tailwind output without being imported.

## Structure
- **High** `package.json` pulled in unused dependencies and lacked lint/typecheck scripts.
- **Medium** Vite aliases rewired versioned package names instead of fixing imports.
- **Low** Entry file `src/main.tsx` relied on non-null assertions and deviated from formatting baseline.

## Tailwind
- **Medium** Repeated literal color hex values across sections instead of shared tokens.
- **Medium** Navigation class strings mixed ordering, complicating auditing.
- **Low** Custom shake animation depended on global CSS rather than Tailwind plugin utilities.

## Content
- **Medium** `README.md` omitted lint, typecheck, and build guidance for collaborators.
- **Medium** Repository lacked `CODESTYLE.md` and `TODO.md` to document standards and follow-up work.

## Quick Wins (≤15 min each)
1. Normalize Tailwind color usage via design tokens or CSS variables.
2. Swap 404 contact link to route visitors to the actual contact section programmatically.
3. Convert remaining key components to include succinct JSDoc for consistency.
4. Introduce a Tailwind plugin for custom animations to replace inline definitions.
5. Expand README with deployment and contribution steps.
