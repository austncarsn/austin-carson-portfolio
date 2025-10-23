// Lazy-loaded case study data to reduce initial bundle size
export const CASE_STUDIES = {
  'floral-design-svg': {
    problem: [
      'Designers need quick access to high-quality floral illustrations without manual drawing.',
      'Creating consistent botanical elements across multiple design projects.',
      'Generating variations of floral designs for different branding contexts.'
    ],
    approach: [
      'Develop a Figma plugin with intuitive parameter controls for floral generation.',
      'Implement procedural algorithms for realistic petal and stem creation.',
      'Create a clean UI that integrates seamlessly with Figma\'s design workflow.'
    ],
    impact: [
      'Accelerated floral illustration creation by 80% for design teams.',
      'Ensured visual consistency across botanical design elements.',
      'Enabled rapid prototyping of floral designs for various brand applications.'
    ],
  },
  'cameo-store': {
    problem: [
      'Present premium collectibles clearly without visual clutter or overwhelming detail.',
      'Reduce friction in the checkout flow while preserving a premium, calm aesthetic.',
      'Introduce subtle micro-interactions that enhance feedback without distracting users.'
    ],
    approach: [
      'Adopt a card-first product layout with generous whitespace and clear typographic hierarchy.',
      'Design concise, contextual micro-interactions for add-to-cart and checkout to improve perceived responsiveness.',
      'Prioritize a restrained visual language to maintain a premium product presentation.'
    ],
    impact: [
      'Improved clarity and perceived product quality across the catalog.',
      'A streamlined checkout experience with reduced cognitive load.',
      'A scalable visual system that supports future product expansions.'
    ],
  },
  'icon-library': {
    problem: [
      'Need for a consistent, legible icon set that works across multiple products and sizes.',
      'Ensure icons are accessible and easy to integrate into different interfaces.'
    ],
    approach: [
      'Design icons on a 24px grid with consistent stroke weights and corner radii to ensure harmony.',
      'Provide componentized exports and semantic markup to simplify adoption.',
      'Document design rules and export patterns for cross-product consistency.'
    ],
    impact: [
      'Greater visual consistency across products and platforms.',
      'Simplified developer adoption through componentized assets.',
      'Improved accessibility and legibility at small sizes.'
    ],
  },
} as const;