# Code Style Guide

This project follows a React + TypeScript stack with Tailwind CSS utility styling. The goal is to keep the portfolio clean, accessible, and maintainable.

## TypeScript
- Enable `strict` mode and avoid `any`. Prefer explicit return types for exported functions/components.
- Use utility types (`Pick`, `Record`, discriminated unions) instead of ad-hoc shapes.
- Guard DOM access (`document.getElementById`) with null checks and meaningful errors.

```ts
interface LinkCTAProps {
  label: string;
  href: string;
}

export function LinkCTA({ label, href }: LinkCTAProps): React.ReactElement {
  return (
    <a className="text-sm font-semibold" href={href}>
      {label}
    </a>
  );
}
```

## React
- Use functional components and hooks; never mutate props or state directly.
- Memoize only when profiling shows rerender pressure. Favor simple pure components.
- Respect accessibility preferences (e.g., reduced motion) inside effects/animations.
- Exported components require a JSDoc summary describing intent.

```tsx
/** Prompts visitors to get in touch with a responsive layout. */
export function ContactBanner(): React.ReactElement {
  // ...
}
```

## Naming
- Components: `PascalCase` (`ProjectCard`, `ScrollProgress`).
- Variables/functions: `camelCase` (`handleSubmit`).
- Constants: `SCREAMING_SNAKE_CASE` when global (`SCROLL_STORAGE_KEY`).

## Imports
- Prefer absolute `@/` paths for internal modules; group third-party imports first, then local.
- Remove unused imports immediately to keep lint clean.

## Tailwind CSS
- Group utilities logically: layout → spacing → typography → color → effects.
- Replace repeated literal colors with theme tokens or CSS variables when possible.
- Define recurring patterns as components or helper classes instead of duplicating long class strings.

```tsx
<div className="flex items-center justify-between px-6 py-4 text-sm text-muted-foreground">
  {/* ... */}
</div>
```

## Accessibility
- Use semantic elements (`<button>`, `<nav>`, `<main>`). Avoid `role` overrides unless required.
- Provide focus states with `focus-visible` utilities and `aria-current` for active navigation.
- Honor `prefers-reduced-motion` in animated components.

## Tooling
- Run `npm run lint` before commits; ESLint enforces the rules above.
- Format with Prettier using the provided `.prettierrc` (`npm run format`).
- Execute `npm run typecheck` to ensure the build stays type-safe.
