import { ProjectCard } from './ProjectCard';
import FadeInSection from './FadeInSection';
import FortuneBox from './FortuneBox';
import Section from './Section';
import React from 'react';

// Project data with extended descriptions
export type CaseStudy = {
  problem: readonly string[];
  approach: readonly string[];
  impact?: readonly string[];
};

export const PROJECTS = {

  'floral-design-svg': {
    id: 'floral-design-svg',
  title: 'Floral Design SVG — Figma Plugin',
    category: 'Design Tool',
    year: '2025',
    role: 'Plugin Development & UI Design',
  description: 'A Figma plugin that generates intricate floral SVG illustrations with customizable parameters for petals, stems, and color palettes.',
  subtitle: 'Procedural floral illustrations for design workflows',
  longDescription: 'Floral Design SVG is a Figma plugin that creates beautiful, customizable floral illustrations using procedural generation. Users can adjust parameters for petal count, stem curvature, color schemes, and complexity levels to generate unique botanical designs perfect for branding, illustrations, and decorative elements.',
  technologies: ['Figma Plugin API', 'TypeScript', 'SVG', 'Canvas API', 'React'],
    
    liveUrl: 'https://floral-design-svg.vercel.app',
  githubUrl: 'https://floral-design-svg-git-main-austncarsns-projects.vercel.app',
  caseStudy: {
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
  },
  'cameo-store': {
    id: 'cameo-store',
  title: 'Cameo Store — Minimal E‑commerce Demo',
    category: 'UI Experiment',
    year: '2025',
    role: 'Product Design & Front-end Development',
  description: 'Minimal e-commerce UI that highlights curated products through restrained design and subtle micro-interactions.',
  subtitle: 'Premium product presentation through restraint and clarity',
  longDescription: 'Cameo Store is a minimal e-commerce UI focused on product presentation and user experience. Generous spacing and a clear typographic hierarchy spotlight curated items, while purposeful micro-interactions guide browsing and checkout. The design system emphasizes restraint and clarity to elevate perceived product value and support scalable merchandising.',
  technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    
    liveUrl: 'https://cameo-web.vercel.app',
  githubUrl: 'https://github.com/austncarsn/cameo-web.git',
  caseStudy: {
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
  },
  'clothing-web': {
    id: 'clothing-web',
  title: 'Clothing Web — Editorial E‑commerce Study',
    category: 'E-commerce Design Study',
    year: '2025',
    role: 'UI/UX Design & Front-end Development',
  description: 'An editorial e-commerce study exploring modular grids and reusable components for consistent product layouts.',
  subtitle: 'Scalable design systems with editorial product layouts',
  longDescription: 'Clothing Web explores editorial product presentation through responsive grid logic and reusable components. The study demonstrates how systematic component design and thoughtful layout detail enable cohesive aesthetics and rapid iteration for scalable commerce experiences.',
  technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'CSS Grid', 'Vercel'],
    
    liveUrl: 'https://clothing-web-eight.vercel.app',
  githubUrl: 'https://github.com/austncarsn/clothing-web.git',
  caseStudy: {
    problem: [
      'Create a flexible layout that supports both editorial content and product catalog experiences.',
      'Ensure layout consistency and clear product hierarchy across breakpoints.'
    ],
    approach: [
      'Develop a modular grid system with responsive breakpoints and a consistent spacing scale.',
      'Design reusable product card components that express hierarchy and scale across contexts.',
      'Systematize patterns to support rapid iteration and visual consistency.'
    ],
    impact: [
      'Faster iteration using reusable components and consistent grid rules.',
      'More cohesive visual language across editorial and product pages.',
      'Improved readability and responsiveness on all devices.'
    ],
  },
  },
  'icon-library': {
    id: 'icon-library',
  title: 'American Heritage Icon Library — Icon System',
    category: 'Icon System',
    year: '2025',
    role: 'Design Systems & Iconography',
  description: 'A precision icon system with consistent geometry, accessible markup, and developer-friendly component exports.',
  subtitle: 'Systematic iconography with cross-platform consistency',
  longDescription: 'The American Heritage Icon Library is a precision icon system focused on clarity and consistency. Icons are crafted on a 24px grid and follow strict rules for stroke weight and spacing. The library includes accessible markup and ARIA support, and ships as React components for straightforward integration.',
  technologies: ['React', 'SVG', 'TypeScript', 'Figma', 'Design System'],
    
    liveUrl: 'https://icon-library-delta.vercel.app',
    githubUrl: 'https://github.com/austncarsn/icon-library.git',
  caseStudy: {
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
  },
} as const;

export type ProjectId = keyof typeof PROJECTS;

export type Project = (typeof PROJECTS)[ProjectId];

// Array version for easy iteration
export const projects = Object.values(PROJECTS);

export default function Projects(): React.JSX.Element {
  return (
  <Section id="work" border="bottom" bgClass="bg-paper" labelNumber="02" labelTitle="WORK" labelDelay={0}>
      {/* Decorative Line Accent */}
      <div className="absolute top-24 left-1/2 w-full -translate-x-1/2 sm:top-32"></div>

      {/* Subtle decorative element */}
  <div className="pointer-events-none absolute bottom-24 left-6 h-[160px] w-[160px] rounded-full bg-brand opacity-[0.03] blur-3xl sm:left-12 sm:h-[180px] sm:w-[180px] lg:bottom-32 lg:left-20 lg:h-[200px] lg:w-[200px]"></div>

      {/* Section label is rendered by Section via props */}

      <div className="space-y-6 mt-16">
        {projects.map((project, index) => (
          <FadeInSection key={project.id} delay={index * 100} direction="up">
            <ProjectCard {...project} />
          </FadeInSection>
        ))}
      </div>

      {/* Fortune Box - Centered after all project cards */}
      <FadeInSection delay={projects.length * 100 + 100} direction="up">
        <div className="flex justify-center mt-24">
          <FortuneBox />
        </div>
      </FadeInSection>
    </Section>
  );
}