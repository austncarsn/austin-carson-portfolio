
  # Modern Portfolio Homepage Layout

  This repository contains a Vite + React + TypeScript implementation of the Modern Portfolio Homepage Layout. The original design is available at <https://www.figma.com/design/BQNLmvuvCD2sIdWF31Jtd7/Modern-Portfolio-Homepage-Layout>.

  ## Getting Started

  ```bash
  npm install
  npm run dev
  ```

  The development server starts on <http://localhost:3000>. Vite's hot module replacement will reflect UI changes instantly.

  ## Available Scripts

  | Command | Description |
  | --- | --- |
  | `npm run dev` | Start the development server. |
  | `npm run build` | Produce a production build in `build/`. |
  | `npm run preview` | Preview the production build locally. |
  | `npm run lint` | Run ESLint with React, TypeScript, and accessibility rules. |
  | `npm run typecheck` | Execute TypeScript in `--noEmit` mode. |
  | `npm run format` | Check formatting via Prettier. |

  ## Tooling

  - TypeScript is configured in strict mode (`tsconfig.json`).
  - ESLint + Prettier ensure consistent style; fix autofixable issues with `npm run lint -- --fix`.
  - Absolute imports are supported through the `@` alias (`@/components/...`).

  ## Deployment

  Run `npm run build` and deploy the `build/` directory to your static host (e.g., Vercel, Netlify, GitHub Pages). The project uses `HashRouter`, so no server rewrite rules are required.
  