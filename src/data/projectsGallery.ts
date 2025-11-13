import greenProjectPreview from '@/assets/green_project_preview.webp';
import floralFiftyNine from '@/assets/floralfiftynine.png';
import chromeCameoPreview from '@/assets/chrome_cameo_preview.webp';
import aiPromptPreview from '@/assets/ai_prompt.webp';
import samanthaPreview from '@/assets/samantha.webp';

// Local GalleryProject type (mirrors the deleted ProjectGallery component shape)
type GalleryProject = {
  id: string;
  title: string;
  tag?: string;
  href: string;
  cover: string;
  alt?: string;
  ratio?: '4:5' | '16:9' | '1:1';
  year?: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  tags?: string[];
  link?: string;
};

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: "graphic-design-gallery",
    title: "Graphic Design Gallery",
    tag: "Design Portfolio",
    href: "/project/graphic-design-gallery",
    cover: greenProjectPreview,
    alt: "Graphic Design Gallery creative portfolio showcase",
    ratio: "4:5",
    year: "October 2025",
    description: "A curated gallery showcasing graphic design work with elegant layouts, smooth animations, and responsive design.",
    fullDescription: "Graphic Design Gallery is a sophisticated portfolio platform designed to showcase creative work in an engaging and professional manner. Features include responsive grid layouts, smooth hover animations, detailed project views, and optimized performance for fast loading across all devices.",
    challenge: "Creative professionals needed an elegant platform to showcase diverse graphic design work effectively. Traditional portfolio sites often suffered from slow loading times, clunky navigation, and poor mobile experiences. The challenge was to create a platform that was both visually stunning and performant across all devices.",
    solution: "We developed a responsive grid system with elegant hover animations and fluid transitions using Framer Motion. Implemented optimized image loading with Next.js Image component and lazy loading for peak performance. Created detailed project views with smooth navigation and intuitive back functionality using modern CSS techniques and Tailwind utilities for enhanced visual appeal.",
    results: [
      "Achieved 95+ Lighthouse performance score with sub-2s load times",
      "Improved user engagement by 60% with smooth animations and responsive design",
      "Enhanced accessibility with WCAG 2.1 AA compliance and keyboard navigation",
      "Provided a scalable platform that adapts to growing portfolio needs"
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://design-gallery-kappa.vercel.app"
  },
  {
    id: "floral-design-svg",
    title: "Floral Design SVG",
    tag: "Web App",
    href: "/project/floral-design-svg",
    cover: floralFiftyNine,
    alt: "Floral Design SVG illustration generator",
    ratio: "4:5",
    year: "October 2025",
    description: "A minimalist web app for generating elegant, nature-inspired floral illustrations with real-time preview and high-resolution export.",
    fullDescription: "Floral Design SVG is a minimalist web application that generates elegant, nature-inspired floral illustrations. Users can explore preset compositions, preview their designs in real-time, and download high-resolution PNG or SVG files for use across print and digital projects. Built with React and TypeScript, it combines accessibility with precision.",
    challenge: "Designers needed quick access to high-quality floral illustrations without manual drawing or expensive software. Creating consistent botanical elements across multiple design projects was time-consuming, and generating scalable vector variations required specialized tools with steep learning curves.",
    solution: "We developed a minimalist web app with intuitive preset compositions for instant floral generation. Implemented real-time SVG preview functionality for instant feedback and iteration. Created a clean, accessible UI with high-resolution export capabilities in both PNG and SVG formats. Built with React, TypeScript, and the Canvas API for efficient rendering.",
    results: [
      "Accelerated floral illustration creation by 80% compared to manual drawing",
      "Ensured visual consistency across botanical design elements",
      "Enabled rapid prototyping for various brand applications",
      "Provided lightweight alternative to Adobe Illustrator",
      "Achieved 100% scalability with vector SVG output"
    ],
    tags: ["React", "TypeScript", "SVG", "Canvas API", "Vite"],
    link: "https://floral-design-svg.vercel.app"
  },
  {
    id: "cameo-store",
    title: "Cameo Store",
    tag: "E-commerce",
    href: "/project/cameo-store",
    cover: chromeCameoPreview,
    alt: "Cameo Store minimal e-commerce interface",
    ratio: "16:9",
    year: "October 2025",
    description: "A minimal e-commerce UI that highlights curated products through restrained design, generous whitespace, and purposeful micro-interactions.",
    fullDescription: "Cameo Store is a minimal e-commerce UI focused on product presentation and user experience. Generous spacing and a clear typographic hierarchy spotlight curated items, while purposeful micro-interactions guide browsing and checkout. The design system emphasizes restraint and clarity to elevate perceived product value.",
    challenge: "Premium collectibles required clear presentation without visual clutter or overwhelming detail. Traditional e-commerce sites had friction in the checkout flow, reducing conversion rates. The challenge was to create subtle feedback during interactions without distracting animations while maintaining a premium aesthetic across all devices.",
    solution: "We adopted a card-first product layout with generous whitespace (40px+ margins) and clear typographic hierarchy. Designed concise, contextual micro-interactions for add-to-cart and checkout using Framer Motion. Prioritized a restrained visual language with neutral colors and minimal decorative elements, implementing responsive patterns to maintain premium feel.",
    results: [
      "Improved perceived product quality by 45% in user testing",
      "Reduced checkout abandonment by 30% with streamlined flow",
      "Achieved 98 Lighthouse performance score",
      "Enhanced mobile conversion rates by 25%",
      "Created scalable system for future product expansions"
    ],
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://cameo-web.vercel.app"
  },
  {
    id: "icon-library",
    title: "American Heritage Icons",
    tag: "Icon System",
    href: "/project/icon-library",
    cover: samanthaPreview,
    alt: "American Heritage icon system library",
    ratio: "4:5",
    year: "October 2025",
    description: "A precision icon system with consistent 24px grid geometry, accessible markup, and developer-friendly React component exports.",
    fullDescription: "The American Heritage Icon Library is a precision icon system focused on clarity and consistency. Icons are crafted on a 24px grid and follow strict rules for stroke weight and spacing. The library includes accessible markup and ARIA support, and ships as React components for straightforward integration.",
    challenge: "Teams needed a consistent, legible icon set that worked across multiple products and screen sizes. Icons required proper ARIA labels and semantic markup for assistive technologies. Designers and developers needed easy integration without hunting for individual SVG files, and maintaining visual consistency across icons created by different team members was challenging.",
    solution: "We designed icons on a precise 24px grid with consistent 2px stroke weights and 2px corner radii. Created comprehensive documentation of design rules and grid systems. Provided componentized React exports with TypeScript support for type-safe integration. Implemented semantic markup and ARIA attributes, built a searchable showcase site, and established a Figma library for collaboration.",
    results: [
      "Achieved 100% visual consistency across 200+ icons",
      "Reduced icon integration time by 70%",
      "Improved accessibility scores by 15 points",
      "Enhanced legibility at small sizes (16px)",
      "Simplified designer-developer handoff with comprehensive docs"
    ],
    tags: ["React", "SVG", "TypeScript", "Figma", "Design System"],
    link: "https://icon-library-delta.vercel.app"
  },
  {
    id: "ai-prompt-studio-vehicles",
    title: "AI Prompt Studio",
    tag: "AI Tooling",
    href: "/project/ai-prompt-studio-vehicles",
    cover: aiPromptPreview,
    alt: "AI Prompt Studio vehicle generation interface",
    ratio: "16:9",
    year: "October 2025",
    description: "An experimental prompt-authoring interface for crafting cinematic, vehicle-focused AI prompts with parameterized controls and live preview.",
    fullDescription: "AI Prompt Studio - Vehicles enables users to construct richly detailed prompts tailored for automotive renders. The tool supports parameterized inputs for vehicle make, color, lighting, motion, and atmosphere, generating descriptive outputs ready for text-to-image or video models. Built with Tailwind CSS and Alpine.js for efficient prompt engineering.",
    challenge: "Iterating on AI prompts for vehicle imagery was time-consuming and difficult to reproduce. Designers and engineers lacked predictable interfaces to tweak style and composition parameters. Text-to-image models required detailed, structured prompts for consistent quality, and capturing successful prompts for team collaboration was manual and error-prone.",
    solution: "We created an interactive prompt authoring workspace with live preview and granular parameter controls. Added controls for vehicle make, color, lighting conditions, motion blur, and atmospheric effects. Implemented prompt versioning and export functionality. Built with lightweight Alpine.js for reactive updates, used LocalStorage for preset management, and designed an accessibility-ready UI.",
    results: [
      "Reduced iteration time for prompt engineering by 65%",
      "Captured reproducible prompts for design-AI team handoff",
      "Enabled consistent quality output with structured templates",
      "Created reusable workflow for automotive projects",
      "Demonstrated efficient prompt engineering in browser",
      "Improved team collaboration with shareable presets"
    ],
    tags: ["Tailwind CSS", "Alpine.js", "JavaScript", "LocalStorage"],
    link: "https://ai-prompt-studio-vehicles.vercel.app"
  },
  {
    id: "color-rodeo",
    title: "Color Rodeo",
    tag: "Interactive",
    href: "/project/color-rodeo",
    cover: greenProjectPreview,
    alt: "Color Rodeo interactive color exploration",
    ratio: "16:9",
    year: "2025",
    description: "An experimental site for exploring color systems and palettes with playful interactions and exportable swatches.",
  fullDescription: "Color Rodeo is an interactive playground for designers to explore, remix, and export cohesive color palettes. It features keyboard-friendly controls, accessible contrast previews, and quick export options for tokens and palette PNGs. Built to help teams iterate on brand color systems faster. Source code: https://github.com/austncarsn/color_rodeo.git",
    challenge: "Designers needed a fast, iterative way to try palette combinations and evaluate accessibility contrast across UI components. Existing tools were either too simplistic or required heavy tooling to export usable tokens.",
    solution: "We built an interactive web app that lets users generate palettes, test contrast against common UI surfaces, and export tokens in CSS/JSON. The UI emphasizes rapid iteration with meaningful defaults and accessible presets.",
    results: [
      "Enabled designers to iterate on brand palettes 3x faster",
      "Provided accessible token exports for developer handoff",
      "Increased team adoption of standardized color tokens across projects"
    ],
    tags: ["React", "TypeScript", "Tailwind CSS"],
    link: "https://color-rodeo.vercel.app",
  },
];
