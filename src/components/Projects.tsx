import React, { type ReactElement, type CSSProperties } from 'react';
import { ProjectReel } from './ProjectCard';
import FadeInSection from './FadeInSection';
import { FortuneBox } from './FortuneBox';
import Section from './Section';

// Import project preview assets so Vite resolves their URLs correctly
import greenProjectPreview from '@/assets/green_project_preview.webp';
import vacuolePreview from '@/assets-optimized/vacuole.png';
import floralFiftyNine from '@/assets/floralfiftynine.png';
import chromeCameoPreview from '@/assets/chrome_cameo_preview.webp';
import aiPromptPreview from '@/assets/ai_prompt.webp';
import samanthaPreview from '@/assets/samantha.webp';

// ======================================
// Types
// ======================================

export type CaseStudy = {
  problem: readonly string[];
  approach: readonly string[];
  impact?: readonly string[];
};

export type ProjectTechnology = string;

export type ProjectData = {
  id: string;
  title: string;
  category: string;
  year: string;
  role?: string;
  description: string;
  previewImage: string;
  subtitle?: string;
  longDescription?: string;
  technologies?: readonly ProjectTechnology[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: CaseStudy;
};

export type ProjectId = keyof typeof PROJECTS;
export type Project = ProjectData;

// ======================================
// Project data
// ======================================

export const PROJECTS = {
  'cell-biology-visual-textbook': {
    id: 'cell-biology-visual-textbook',
    title: 'Cell Biology, Interactive Visual Textbook',
    category: 'Educational Resource',
    year: 'November 2025',
    role: 'Design and Front end Development',
    description:
      'An interactive visual resource for learning cell biology through detailed diagrams, a comprehensive glossary, and downloadable materials. Designed to make complex cellular structures accessible and memorable for students and educators.',
    previewImage: vacuolePreview,
    subtitle: 'Interactive, accessible cell biology learning',
    longDescription:
      'Cell Biology, Interactive Visual Textbook is a modern educational platform for learning cell biology. It features high quality interactive diagrams, a comprehensive glossary with audio playback, color coded categories, downloadable PDF resources, and accessibility features such as speech synthesis and larger text options. Optimized for both desktop and mobile, it makes complex cellular structures accessible and memorable for students and educators.',
    technologies: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Radix UI',
      'Motion library',
      'Lucide React',
      'jsPDF',
      'Sonner',
    ],
    githubUrl: 'https://github.com/austncarsn/biology-virtual-textbook',
    caseStudy: {
      problem: [
        'Cell biology concepts are often difficult for students to visualize and remember.',
        'Traditional textbooks lack interactive and accessible features for diverse learners.',
        'Educators need downloadable, high quality resources for teaching cellular structures.',
      ],
      approach: [
        'Designed interactive diagrams of cellular organelles and processes with detailed illustrations.',
        'Built a comprehensive glossary with expandable definitions and audio playback for accessibility.',
        'Implemented color coded categories and intuitive navigation for visual learning.',
        'Enabled PDF generation and download for figures and resources using jsPDF.',
        'Optimized for responsive design and accessibility, including speech synthesis and larger text options.',
      ],
      impact: [
        'Improved student engagement and retention through interactive visual learning.',
        'Enhanced accessibility for diverse learners with audio and text options.',
        'Provided educators with downloadable, high quality teaching materials.',
      ],
    },
  },
  'graphic-design-gallery': {
    id: 'graphic-design-gallery',
    title: 'Graphic Design Gallery, Creative Portfolio',
    category: 'Design Portfolio',
    year: 'October 2025',
    role: 'Design and Front end Development',
    description:
      'A curated gallery that showcases graphic design work with elegant layouts, smooth animations, and responsive design.',
    previewImage: greenProjectPreview,
    subtitle: 'Elegant showcase for creative design portfolios',
    longDescription:
      'Graphic Design Gallery is a sophisticated portfolio platform designed to present creative work in an engaging and professional way. Features include responsive grid layouts, smooth hover animations, detailed project views, and performance optimizations for fast loading across devices.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
    ],
    liveUrl: 'https://design-gallery-kappa.vercel.app',
    githubUrl: 'https://github.com/austncarsn/design-gallery',
    caseStudy: {
      problem: [
        'Creative professionals need an elegant platform to showcase diverse graphic design work effectively.',
        'Traditional portfolio sites often suffer from slow loading times and clunky navigation.',
        'Designers require intuitive tools for presenting work across various devices and screen sizes.',
      ],
      approach: [
        'Developed a responsive grid system with refined hover animations and fluid transitions using Framer Motion.',
        'Implemented optimized image loading with the Next.js Image component and lazy loading for performance.',
        'Created detailed project views with smooth navigation and intuitive back behavior.',
        'Used modern CSS techniques and Tailwind utilities for visual polish and maintainability.',
        'Built a flexible content structure for easy portfolio updates.',
      ],
      impact: [
        'Achieved a 95 plus Lighthouse performance score with sub two second load times.',
        'Improved user engagement with smooth animations and responsive layouts.',
        'Enhanced accessibility with WCAG 2.1 AA compliance and keyboard navigation.',
        'Provided a scalable platform that adapts to growing portfolio needs.',
      ],
    },
  },
  'floral-design-svg': {
    id: 'floral-design-svg',
    title: 'Floral Design SVG, Web App',
    category: 'Design Tool',
    year: 'October 2025',
    role: 'Web App Development and UI Design',
    description:
      'A minimalist web app for generating elegant, nature inspired floral illustrations with real time preview and high resolution export.',
    previewImage: floralFiftyNine,
    subtitle: 'Elegant floral illustrations for creative projects',
    longDescription:
      'Floral Design SVG is a minimalist web application that generates elegant, nature inspired floral illustrations. Users can explore preset compositions, preview designs in real time, and download high resolution PNG or SVG files for print and digital work. Built with React and TypeScript, it offers a lightweight alternative to complex vector tools.',
    technologies: ['React', 'TypeScript', 'SVG', 'Canvas API', 'Vite', 'Vercel'],
    liveUrl: 'https://floral-design-svg.vercel.app',
    githubUrl: 'https://github.com/austncarsn/floral-design-svg',
    caseStudy: {
      problem: [
        'Designers need quick access to high quality floral illustrations without manual drawing or expensive software.',
        'Creating consistent botanical elements across multiple design projects is time consuming.',
        'Generating scalable vector variations of floral designs for different branding contexts requires specialized tools.',
        'Complex vector software has steep learning curves and is often overkill for simple floral elements.',
      ],
      approach: [
        'Developed a minimalist web app with intuitive preset compositions for instant floral generation.',
        'Implemented real time SVG preview for instant design feedback and iteration.',
        'Created a clean, accessible interface with high resolution export in PNG and SVG formats.',
        'Built with React and TypeScript for performance, type safety, and maintainability.',
        'Used the Canvas API for efficient rendering and export.',
      ],
      impact: [
        'Accelerated floral illustration creation compared to manual drawing.',
        'Ensured visual consistency across botanical elements with preset compositions.',
        'Enabled rapid prototyping of floral designs for various brand applications.',
        'Provided a lightweight, browser based alternative to tools like Adobe Illustrator.',
        'Delivered fully scalable vector SVG output for print and digital use.',
      ],
    },
  },
  'cameo-store': {
    id: 'cameo-store',
    title: 'Cameo Store, Minimal Ecommerce Demo',
    category: 'UI Experiment',
    year: 'October 2025',
    role: 'Product Design and Front end Development',
    description:
      'A minimal ecommerce interface that highlights curated products through restraint, whitespace, and purposeful micro interactions.',
    previewImage: chromeCameoPreview,
    subtitle: 'Premium product presentation through restraint and clarity',
    longDescription:
      'Cameo Store is a minimal ecommerce interface focused on product presentation and user experience. Generous spacing and a clear typographic hierarchy spotlight curated items, while purposeful micro interactions guide browsing and checkout. The design system emphasizes restraint and clarity to elevate perceived product value and support scalable merchandising.',
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Vercel',
    ],
    liveUrl: 'https://cameo-web.vercel.app',
    githubUrl: 'https://github.com/austncarsn/cameo-web',
    caseStudy: {
      problem: [
        'Premium collectibles need clear presentation without visual clutter.',
        'Traditional ecommerce sites often introduce friction in the checkout flow, reducing conversion.',
        'Users need subtle feedback during interactions without distracting animation.',
        'Maintaining a premium aesthetic while staying usable across devices is challenging.',
      ],
      approach: [
        'Adopted a card first product layout with generous spacing and clear type hierarchy.',
        'Designed concise, contextual micro interactions for add to cart and checkout with Framer Motion.',
        'Prioritized a restrained visual language with neutral colors and minimal decoration.',
        'Implemented responsive patterns to keep the premium feel on mobile and desktop.',
        'Created a modular component system for scalable catalog expansion.',
      ],
      impact: [
        'Improved clarity and perceived product quality in user testing.',
        'Reduced checkout abandonment with a streamlined flow and reduced cognitive load.',
        'Achieved a high Lighthouse performance score with optimized images and lazy loading.',
        'Created a scalable visual system that supports future product categories.',
        'Enhanced mobile conversion rates with touch optimized interactions.',
      ],
    },
  },
  'icon-library': {
    id: 'icon-library',
    title: 'American Heritage Icon Library, Icon System',
    category: 'Icon System',
    year: 'October 2025',
    role: 'Design Systems and Iconography',
    description:
      'A precision icon system with a consistent 24px grid, accessible markup, and developer friendly React component exports.',
    previewImage: samanthaPreview,
    subtitle: 'Systematic iconography with cross platform consistency',
    longDescription:
      'The American Heritage Icon Library is a precision icon system focused on clarity and consistency. Icons are crafted on a 24px grid and follow strict rules for stroke weight and spacing. The library includes accessible markup and ARIA support, and ships as React components for straightforward integration across web applications.',
    technologies: [
      'React',
      'SVG',
      'TypeScript',
      'Figma',
      'Design System',
      'ARIA',
      'Vercel',
    ],
    liveUrl: 'https://icon-library-delta.vercel.app',
    githubUrl: 'https://github.com/austncarsn/icon-library',
    caseStudy: {
      problem: [
        'Teams need a consistent, legible icon set that works across multiple products and screen sizes.',
        'Icons must be accessible with proper ARIA labels and semantic markup for assistive technologies.',
        'Designers and developers want straightforward integration without hunting for individual SVG files.',
        'Maintaining visual consistency across icons created by different team members is difficult.',
      ],
      approach: [
        'Designed icons on a precise 24px grid with consistent stroke weights and corner radii.',
        'Documented design rules and grid systems for long term consistency.',
        'Provided componentized React exports with TypeScript support for type safe integration.',
        'Implemented semantic markup and ARIA attributes to support accessibility.',
        'Built a searchable showcase site with copy ready code snippets for rapid adoption.',
        'Established a Figma library with shared components for collaboration.',
      ],
      impact: [
        'Achieved strong visual consistency across hundreds of icons used in multiple products.',
        'Reduced icon integration time with pre built React components.',
        'Improved accessibility scores with proper ARIA implementation.',
        'Enhanced legibility at small sizes with tuned stroke weights.',
        'Simplified designer and developer handoff with documentation and Figma integration.',
      ],
    },
  },
  'ai-prompt-studio-vehicles': {
    id: 'ai-prompt-studio-vehicles',
    title: 'AI Prompt Studio, Vehicles',
    category: 'AI Tooling',
    year: 'October 2025',
    role: 'Front end Development and Prompt Engineering',
    description:
      'An experimental prompt authoring interface for cinematic, vehicle focused AI prompts with parameter controls and live preview.',
    previewImage: aiPromptPreview,
    subtitle: 'Interactive prompt authoring for vehicle focused AI generation',
    longDescription:
      'AI Prompt Studio, Vehicles enables users to construct richly detailed prompts tailored for automotive renders. The tool supports parameter inputs for vehicle make, color, lighting, motion, and atmosphere, generating descriptive outputs ready for text to image or video models. It includes live prompt generation, preset management, and export options for creative workflows.',
    technologies: [
      'Tailwind CSS',
      'Alpine.js',
      'JavaScript',
      'LocalStorage',
      'HTML',
      'Vercel',
    ],
    liveUrl: 'https://ai-prompt-studio-vehicles.vercel.app',
    githubUrl: 'https://github.com/austncarsn/ai-prompt-studio-vehicles',
    caseStudy: {
      problem: [
        'Iterating on AI prompts for vehicle imagery is time consuming and hard to reproduce.',
        'Designers and engineers lack predictable interfaces to tweak style and composition parameters.',
        'Text to image models need detailed, structured prompts for consistent quality.',
        'Capturing and versioning successful prompts for a team is manual and error prone.',
      ],
      approach: [
        'Created an interactive prompt workspace with live preview and parameter controls.',
        'Added granular controls for vehicle make, color, lighting conditions, motion blur, and atmosphere.',
        'Implemented prompt versioning and export to capture successful iterations.',
        'Built with lightweight Alpine.js for reactive updates without framework overhead.',
        'Used LocalStorage for preset management and session persistence.',
        'Designed an accessibility ready interface with keyboard navigation and screen reader support.',
      ],
      impact: [
        'Reduced iteration time for prompt engineering with rapid parameter experimentation.',
        'Captured reusable prompts and assets to streamline handoff between design and AI teams.',
        'Enabled consistent output quality with structured prompt templates.',
        'Created a reusable workflow for automotive visualization projects.',
        'Demonstrated efficient prompt engineering in a self contained browser environment.',
        'Improved team collaboration with shareable preset configurations.',
      ],
    },
  },
} as const satisfies Record<string, ProjectData>;

// Array version for easy iteration
export const projects: readonly ProjectData[] = Object.values(PROJECTS);

// ======================================
// Visual constants
// ======================================

const GRAIN_STYLE: CSSProperties = {
  // Use the centralized speckle token so the pattern can be themed from tokens.css
  backgroundImage: 'var(--pattern-speckle-white)',
  backgroundSize: '100px 100px',
};

// ======================================
// Component
// ======================================

export default function Projects(): ReactElement {
  return (
    <Section
      id="work"
      bgClass="bg-[var(--color-bg-canvas)] text-neutral-900"
      aria-labelledby="work-section-label"
      noContainer
    >
      {/* Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-soft-light"
        style={GRAIN_STYLE}
        aria-hidden="true"
      />

      <div className="relative">
        <div id="work-section-label" className="sr-only">
          Work portfolio
        </div>

        {/* Section header */}
        <div className="mx-auto mb-8 w-full max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="text-center md:text-left">
            <div className="type-meta text-[color:var(--color-text-secondary)]">
              Selected work
            </div>
            <h2 className="type-display-xl mt-3 text-[color:var(--color-text-primary)]">
              Projects
            </h2>
          </div>
        </div>

        <ProjectReel projects={projects} />
      </div>

      {/* Fortune Box */}
      <FadeInSection delay={projects.length * 100 + 100} direction="up">
        <div className="mt-16 flex justify-center sm:mt-20 md:mt-24">
          <FortuneBox />
        </div>
      </FadeInSection>
    </Section>
  );
}
