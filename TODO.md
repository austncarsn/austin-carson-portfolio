# TODO

| Task | Estimate | Notes |
| --- | --- | --- |
| Consolidate repeated hex colors into Tailwind tokens or CSS variables | 1.5h | Requires defining a design token map and updating component class strings. |
| Replace inline `animate-[shake...]` utilities with a Tailwind plugin definition | 45m | Keeps animation config centralized and easier to tweak. |
| Audit `NotFound` contact link so it routes to the contact section via navigation helper | 30m | Reuse the section scroll helper to avoid broken anchors. |
| Expand README with deployment instructions (Vercel/Netlify) and contribution workflow | 45m | Clarify steps for new collaborators. |
| Add automated tests (React Testing Library) for navigation scrolling behavior | 2h | Ensures no reg regressions in anchor handling. |
| Evaluate remaining components for missing JSDoc summaries | 1h | Bring legacy files up to documentation standard. |
