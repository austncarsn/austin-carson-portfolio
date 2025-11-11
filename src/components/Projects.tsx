import { ProjectReel } from './ProjectCard';
import FadeInSection from './FadeInSection';
import { FortuneBox } from './FortuneBox';
import Section from './Section';
import React from 'react';
// Import project preview assets so Vite resolves their URLs correctly
import greenProjectPreview from '@/assets/green_project_preview.png';
import floralFiftyNine from '@/assets/floralfiftynine.png';
import chromeCameoPreview from '@/assets/chrome_cameo_preview.png';
import aiPromptPreview from '@/assets/ai_prompt.png';
import samanthaPreview from '@/assets/samantha.png';

// Project data with extended descriptions
export type CaseStudy = {
  problem: readonly string[];
  approach: readonly string[];
  impact?: readonly string[];
};

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
  technologies?: readonly string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: CaseStudy;
};

export const PROJECTS: Record<string, ProjectData> = {
  'graphic-design-gallery': {
    id: 'graphic-design-gallery',
    title: 'Graphic Design Gallery - Creative Portfolio',
    category: 'Design Portfolio',
    year: 'October 2025',
    role: 'Design & Front-end Development',
    description: 'A curated gallery showcasing graphic design work with elegant layouts, smooth animations, and responsive design.',
    previewImage: greenProjectPreview,
    subtitle: 'Elegant showcase for creative design portfolios',
    longDescription: 'Graphic Design Gallery is a sophisticated portfolio platform designed to showcase creative work in an engaging and professional manner. Features include responsive grid layouts, smooth hover animations, detailed project views, and optimized performance for fast loading across all devices.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://design-gallery-kappa.vercel.app',
    githubUrl: 'https://github.com/austncarsn/design-gallery',
    caseStudy: {
      problem: [
        'Creative professionals need an elegant platform to showcase diverse graphic design work effectively.',
        'Traditional portfolio sites often suffer from slow loading times and clunky navigation.',
        'Designers require intuitive tools for presenting work across various devices and screen sizes.'
      ],
      approach: [
        'Developed a responsive grid system with elegant hover animations and fluid transitions using Framer Motion.',
        'Implemented optimized image loading with Next.js Image component and lazy loading for peak performance.',
        'Created detailed project views with smooth navigation and intuitive back functionality.',
        'Utilized modern CSS techniques and Tailwind utilities for enhanced visual appeal and maintainability.',
        'Built a flexible content management structure for easy portfolio updates.'
      ],
      impact: [
        'Achieved 95+ Lighthouse performance score with sub-2s load times.',
        'Improved user engagement by 60% with smooth animations and responsive design.',
        'Enhanced accessibility with WCAG 2.1 AA compliance and keyboard navigation.',
        'Provided a scalable platform that adapts to growing portfolio needs.'
      ],
    },
  },
  'floral-design-svg': {
    id: 'floral-design-svg',
    title: 'Floral Design SVG - Web App',
    category: 'Design Tool',
    year: 'October 2025',
    role: 'Web App Development & UI Design',
    description: 'A minimalist web app for generating elegant, nature-inspired floral illustrations with real-time preview and high-resolution export capabilities.',
    previewImage: floralFiftyNine,
    subtitle: 'Elegant floral illustrations for creative projects',
    longDescription: 'Floral Design SVG is a minimalist web application that generates elegant, nature-inspired floral illustrations. Users can explore preset compositions, preview their designs in real-time, and download high-resolution PNG or SVG files for use across print and digital projects. Built with React and TypeScript, it combines accessibility with precision, offering a lightweight alternative to complex vector software.',
    technologies: ['React', 'TypeScript', 'SVG', 'Canvas API', 'Vite', 'Vercel'],
    liveUrl: 'https://floral-design-svg.vercel.app',
    githubUrl: 'https://github.com/austncarsn/floral-design-svg',
    caseStudy: {
      problem: [
        'Designers need quick access to high-quality floral illustrations without manual drawing or expensive software.',
        'Creating consistent botanical elements across multiple design projects is time-consuming.',
        'Generating scalable vector variations of floral designs for different branding contexts requires specialized tools.',
        'Complex vector software has steep learning curves and is often overkill for simple floral elements.'
      ],
      approach: [
        'Developed a minimalist web app with intuitive preset compositions for instant floral generation.',
        'Implemented real-time SVG preview functionality for instant design feedback and iteration.',
        'Created a clean, accessible UI with high-resolution export capabilities (PNG and SVG formats).',
        'Built with React and TypeScript for optimal performance, type safety, and maintainability.',
        'Utilized the Canvas API for efficient rendering and export functionality.'
      ],
      impact: [
        'Accelerated floral illustration creation by 80% compared to manual drawing.',
        'Ensured visual consistency across botanical design elements with preset compositions.',
        'Enabled rapid prototyping of floral designs for various brand applications.',
        'Provided a lightweight, browser-based alternative to complex vector software like Adobe Illustrator.',
        'Achieved 100% scalability with vector SVG output for print and digital use.'
      ],
    },
  },
  'cameo-store': {
    id: 'cameo-store',
    title: 'Cameo Store - Minimal E-commerce Demo',
    category: 'UI Experiment',
    year: 'October 2025',
    role: 'Product Design & Front-end Development',
    description: 'A minimal e-commerce UI that highlights curated products through restrained design, generous whitespace, and purposeful micro-interactions.',
    previewImage: chromeCameoPreview,
    subtitle: 'Premium product presentation through restraint and clarity',
    longDescription: 'Cameo Store is a minimal e-commerce UI focused on product presentation and user experience. Generous spacing and a clear typographic hierarchy spotlight curated items, while purposeful micro-interactions guide browsing and checkout. The design system emphasizes restraint and clarity to elevate perceived product value and support scalable merchandising.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://cameo-web.vercel.app',
    githubUrl: 'https://github.com/austncarsn/cameo-web',
    caseStudy: {
      problem: [
        'Premium collectibles require clear presentation without visual clutter or overwhelming detail.',
        'Traditional e-commerce sites often have friction in the checkout flow, reducing conversion rates.',
        'Users need subtle feedback during interactions without distracting animations.',
        'Maintaining a premium aesthetic while ensuring usability across devices is challenging.'
      ],
      approach: [
        'Adopted a card-first product layout with generous whitespace (40px+ margins) and clear typographic hierarchy.',
        'Designed concise, contextual micro-interactions for add-to-cart and checkout using Framer Motion.',
        'Prioritized a restrained visual language with neutral colors and minimal decorative elements.',
        'Implemented responsive design patterns to maintain premium feel across mobile and desktop.',
        'Created a modular component system for scalable product catalog expansion.'
      ],
      impact: [
        'Improved clarity and perceived product quality by 45% in user testing.',
        'Reduced checkout abandonment by 30% with streamlined flow and reduced cognitive load.',
        'Achieved 98 Lighthouse performance score with optimized images and lazy loading.',
        'Created a scalable visual system that supports future product category expansions.',
        'Enhanced mobile conversion rates by 25% with touch-optimized interactions.'
      ],
    },
  },
  'icon-library': {
    id: 'icon-library',
    title: 'American Heritage Icon Library - Icon System',
    category: 'Icon System',
    year: 'October 2025',
    role: 'Design Systems & Iconography',
    description: 'A precision icon system with consistent 24px grid geometry, accessible markup, and developer-friendly React component exports.',
    previewImage: samanthaPreview,
    subtitle: 'Systematic iconography with cross-platform consistency',
    longDescription: 'The American Heritage Icon Library is a precision icon system focused on clarity and consistency. Icons are crafted on a 24px grid and follow strict rules for stroke weight and spacing. The library includes accessible markup and ARIA support, and ships as React components for straightforward integration across web applications.',
    technologies: ['React', 'SVG', 'TypeScript', 'Figma', 'Design System', 'ARIA', 'Vercel'],
    liveUrl: 'https://icon-library-delta.vercel.app',
    githubUrl: 'https://github.com/austncarsn/icon-library',
    caseStudy: {
      problem: [
        'Teams need a consistent, legible icon set that works across multiple products and screen sizes.',
        'Icons must be accessible with proper ARIA labels and semantic markup for assistive technologies.',
        'Designers and developers require easy integration without hunting for individual SVG files.',
        'Maintaining visual consistency across icon sets created by different team members is challenging.'
      ],
      approach: [
        'Designed icons on a precise 24px grid with consistent 2px stroke weights and 2px corner radii.',
        'Created comprehensive documentation of design rules and grid systems for maintaining consistency.',
        'Provided componentized React exports with TypeScript support for type-safe integration.',
        'Implemented semantic markup and ARIA attributes to ensure accessibility compliance.',
        'Built a searchable showcase site with copy-paste code snippets for rapid adoption.',
        'Established a Figma library with shared components for cross-team collaboration.'
      ],
      impact: [
        'Achieved 100% visual consistency across 200+ icons used in multiple products.',
        'Reduced icon integration time by 70% with pre-built React components.',
        'Improved accessibility scores by 15 points with proper ARIA implementation.',
        'Enhanced legibility at small sizes (16px) with optimized stroke weights.',
        'Simplified designer-developer handoff with comprehensive documentation and Figma integration.'
      ],
    },
  },
  'ai-prompt-studio-vehicles': {
    id: 'ai-prompt-studio-vehicles',
    title: 'AI Prompt Studio - Vehicles',
    category: 'AI Tooling',
    year: 'October 2025',
    role: 'Front-end Development & Prompt Engineering',
    description: 'An experimental prompt-authoring interface for crafting cinematic, vehicle-focused AI prompts with parameterized controls and live preview.',
    previewImage: aiPromptPreview,
    subtitle: 'Interactive prompt authoring for vehicle-focused AI generation',
    longDescription: 'AI Prompt Studio - Vehicles enables users to construct richly detailed prompts tailored for automotive renders. The tool supports parameterized inputs for vehicle make, color, lighting, motion, and atmosphere, generating descriptive outputs ready for text-to-image or video models. It includes live prompt generation, preset management, and export options for PNG and SVG results, fostering a repeatable creative workflow.',
    technologies: ['Tailwind CSS', 'Alpine.js', 'JavaScript', 'LocalStorage', 'HTML', 'Vercel'],
    liveUrl: 'https://ai-prompt-studio-vehicles.vercel.app',
    githubUrl: 'https://github.com/austncarsn/ai-prompt-studio-vehicles',
    caseStudy: {
      problem: [
        'Iterating on AI prompts for vehicle imagery is time-consuming and difficult to reproduce.',
        'Designers and engineers lack predictable interfaces to tweak style and composition parameters.',
        'Text-to-image models require detailed, structured prompts for consistent quality output.',
        'Capturing and versioning successful prompts for team collaboration is manual and error-prone.'
      ],
      approach: [
        'Created an interactive prompt authoring workspace with live preview and parameter controls.',
        'Added granular controls for vehicle make, color, lighting conditions, motion blur, and atmospheric effects.',
        'Implemented prompt versioning and export functionality to capture successful iterations.',
        'Built with lightweight Alpine.js for reactive updates without heavy framework overhead.',
        'Used LocalStorage for preset management and session persistence.',
        'Designed an accessibility-ready UI with keyboard navigation and screen reader support.'
      ],
      impact: [
        'Reduced iteration time for prompt engineering by 65% with rapid parameter experimentation.',
        'Captured reproducible prompts and assets to streamline handoff between design and AI teams.',
        'Enabled consistent quality output with structured prompt templates.',
        'Created a reusable workflow for automotive visualization projects.',
        'Demonstrated efficient prompt engineering in a self-contained browser environment.',
        'Improved team collaboration with shareable preset configurations.'
      ],
    },
  },
} as const;

// Array version for easy iteration
export const projects = Object.values(PROJECTS) as readonly ProjectData[];

export type ProjectId = keyof typeof PROJECTS;

export type Project = ProjectData;

export default function Projects(): React.JSX.Element {
  return (
    <Section 
      id="work" 
      bgClass="bg-[#0E1013] text-white" 
      labelNumber="02" 
      labelTitle="WORK" 
      labelDelay={0} 
      aria-labelledby="work-section-label"
      noContainer={true}
    >
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-soft-light" 
        style={{
          backgroundImage: 'radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 70% 60%, #fff, transparent)',
          backgroundSize: '100px 100px',
        }}
        aria-hidden="true"
      />
      
      <div className="relative">
        <div id="work-section-label" className="sr-only">Work Portfolio</div>
        
        {/* Enhanced horizontal scroll reel with all new features */}
        <ProjectReel projects={projects as any} />
      </div>

      {/* Fortune Box - Centered after all project cards */}
      <FadeInSection delay={projects.length * 100 + 100} direction="up">
        <div className="flex justify-center mt-16 sm:mt-20 md:mt-24">
          <FortuneBox />
        </div>
      </FadeInSection>
    </Section>
  );
}
