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
    githubUrl: 'https://github.com/austncarsn/design-gallery.git',
    caseStudy: {
      problem: [
        'Create an elegant platform to showcase diverse graphic design work effectively.',
        'Ensure fast loading and smooth user experience across all devices.',
        'Design intuitive navigation for exploring creative portfolios.'
      ],
      approach: [
        'Develop a responsive grid system with elegant hover animations and transitions.',
        'Implement optimized image loading and lazy loading for performance.',
        'Create detailed project views with smooth navigation and back functionality.',
        'Use modern CSS techniques and animations for enhanced visual appeal.'
      ],
      impact: [
        'Provided a professional platform for showcasing creative work.',
        'Improved user engagement with smooth animations and responsive design.',
        'Enhanced accessibility and performance for better user experience.'
      ],
    },
  },
  'floral-design-svg': {
    id: 'floral-design-svg',
    title: 'Floral Design SVG - Web App',
    category: 'Design Tool',
    year: 'October 2025',
    role: 'Web App Development & UI Design',
    description: 'Floral Design SVG - A minimalist web app for generating elegant, nature-inspired floral illustrations. Users can explore preset compositions, preview their designs, and download high-resolution PNG or SVG files for creative use across print and digital projects. Built with React and TypeScript, it blends accessibility with precision, offering a lightweight alternative to complex vector software.',
    previewImage: floralFiftyNine,
    subtitle: 'Elegant floral illustrations for creative projects',
    longDescription: 'Floral Design SVG is a minimalist web application that generates elegant, nature-inspired floral illustrations. Users can explore preset compositions, preview their designs in real-time, and download high-resolution PNG or SVG files for use across print and digital projects. Built with React and TypeScript, it combines accessibility with precision, offering a lightweight alternative to complex vector software.',
    technologies: ['React', 'TypeScript', 'SVG', 'Canvas API', 'Vite'],
    liveUrl: 'https://floral-design-svg.vercel.app',
    githubUrl: 'https://floral-design-svg-git-main-austncarsns-projects.vercel.app',
    caseStudy: {
      problem: [
        'Designers need quick access to high-quality floral illustrations without manual drawing.',
        'Creating consistent botanical elements across multiple design projects.',
        'Generating variations of floral designs for different branding contexts.'
      ],
      approach: [
        'Develop a minimalist web app with intuitive preset compositions for floral generation.',
        'Implement real-time preview functionality for instant design feedback.',
        'Create a clean, accessible UI with high-resolution export capabilities.',
        'Build with React and TypeScript for performance and maintainability.'
      ],
      impact: [
        'Accelerated floral illustration creation by 80% for design teams.',
        'Ensured visual consistency across botanical design elements.',
        'Enabled rapid prototyping of floral designs for various brand applications.',
        'Provided a lightweight alternative to complex vector software.'
      ],
    },
  },
  'cameo-store': {
    id: 'cameo-store',
    title: 'Cameo Store - Minimal E-commerce Demo',
    category: 'UI Experiment',
    year: 'October 2025',
    role: 'Product Design & Front-end Development',
    description: 'Minimal e-commerce UI that highlights curated products through restrained design and subtle micro-interactions.',
    previewImage: chromeCameoPreview,
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
  'icon-library': {
    id: 'icon-library',
    title: 'American Heritage Icon Library - Icon System',
    category: 'Icon System',
    year: 'October 2025',
    role: 'Design Systems & Iconography',
    description: 'A precision icon system with consistent geometry, accessible markup, and developer-friendly component exports.',
    previewImage: samanthaPreview,
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
  'ai-prompt-studio-vehicles': {
    id: 'ai-prompt-studio-vehicles',
    title: 'AI Prompt Studio - Vehicles',
    category: 'AI Tooling',
    year: 'October 2025',
    role: 'Front-end Development & Prompt Engineering',
    description: 'AI Prompt Studio - Vehicles is an experimental prompt-authoring interface for crafting cinematic, vehicle-focused prompts. It provides a streamlined workspace for designers and engineers to fine-tune AI text inputs, test stylistic variations, and export polished prompts and image assets. Built for clarity and control, it bridges visual design and generative model experimentation.',
    previewImage: aiPromptPreview,
    subtitle: 'Interactive prompt authoring for vehicle-focused AI generation',
    longDescription: 'AI Prompt Studio - Vehicles enables users to construct richly detailed prompts tailored for automotive renders. The tool supports parameterized inputs for vehicle make, color, lighting, motion, and atmosphere, generating descriptive outputs ready for text-to-image or video models. It includes live prompt generation, preset management, and export options for PNG and SVG results, fostering a repeatable creative workflow. Built with Tailwind CSS and Alpine.js, it demonstrates efficient prompt engineering in a self-contained browser environment.',
    technologies: ['Tailwind CSS', 'Alpine.js', 'HTML', 'LocalStorage', 'JavaScript', 'Accessibility-ready UI'],
    liveUrl: 'https://ai-prompt-studio-vehicles.vercel.app',
    githubUrl: 'https://github.com/austncarsn/ai-prompt-studio-vehicles.git',
    caseStudy: {
      problem: [
        'Iterating on AI prompts for vehicle imagery is time-consuming and hard to reproduce.',
        'Designers need a predictable interface to tweak style and composition parameters.',
      ],
      approach: [
        'Create an interactive prompt authoring workspace with live previews.',
        'Add parameter controls for style, lighting, and composition to make prompts reproducible.',
        'Implement prompt versioning and export to capture successful iterations.'
      ],
      impact: [
        'Reduced iteration time for prompt engineering by enabling rapid experimentation.',
        'Captured reproducible prompts and assets to streamline handoff between teams.'
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
