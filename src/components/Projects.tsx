import { ProjectCard } from './ProjectCard';
import FadeInSection from './FadeInSection';
import FortuneBox from './FortuneBox';
import Section from './Section';
import React from 'react';

// Project data with extended descriptions
export type CaseStudy = {
  problem: string[];
  approach: string[];
  impact?: string[];
};

export const PROJECTS = {
  

  'cameo-store': {
    id: 'cameo-store',
  title: 'Cameo Store — Minimal E‑commerce Demo',
    category: 'UI Experiment',
    year: '2025',
    role: 'Product Design & Front-end Development',
  description: 'A refined e-commerce interface exploring how minimal design, intentional whitespace, and micro-interactions create a premium shopping experience for curated collectibles. Focused on reducing visual noise while maintaining clear product hierarchy and purchase flow.',
  subtitle: 'Premium product presentation through restraint and clarity',
    longDescription: 'Cameo Store is a minimal e-commerce design experiment centered on product presentation and user experience. The interface favors clarity, generous spacing, and a concise visual hierarchy to highlight curated products and reduce cognitive load.\n\nThe design system emphasizes typography, spacing, and subtle micro-interactions that reinforce perceived quality and improve discoverability. Interaction patterns are intentionally restrained to guide users through browsing and checkout without distraction.\n\nThis project demonstrates how thoughtful restraint in design can enhance perceived value, increase focus on product details, and create a scalable system for premium product merchandising.',
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
  'east-texas-heritage': {
    id: 'east-texas-heritage',
  title: 'East Texas Heritage — Regional History Archive',
    category: 'Regional History Archive',
    year: '2025',
    role: 'Design, Research & Front-end Development',
  description: 'A digital preservation platform designed to collect, organize, and present regional history through scanned documents, oral histories, and community records. Built to prioritize readability, accessibility, and performance for researchers and community members across diverse network conditions.',
  subtitle: 'Accessible archival platform with optimized media delivery',
  longDescription: 'East Texas Heritage is a comprehensive digital archive dedicated to preserving and sharing the rich history of small towns throughout East Texas. The platform serves as a living document of the region\'s cultural heritage, featuring detailed histories, archival photographs, and personal stories from communities that have shaped this unique corner of America.\\n\\nThe website combines historical research with modern web technology to create an accessible, engaging experience. Each town profile includes founding histories, notable events, historical photographs, and oral histories from longtime residents. The interface prioritizes readability and navigation, making it easy for researchers, students, and history enthusiasts to explore the interconnected stories of these communities.\\n\\nThis project demonstrates how thoughtful design and technology can serve preservation efforts, ensuring that the stories of small-town East Texas remain accessible for future generations.',
  caseStudy: {
    problem: [
      'Preserve and present local history through mixed media including scanned documents and oral recordings.',
      'Deliver consistent readability for long-form content across devices and network conditions.'
    ],
    approach: [
      'Design a content-first interface with readable typography and clear navigation for long-form material.',
      'Optimize scanned media with progressive loading and compression strategies to improve performance.',
      'Implement accessible search and metadata to enhance discoverability for researchers and community members.'
    ],
    impact: [
      'Increased accessibility to archival materials for diverse audiences.',
      'Improved performance for users on limited bandwidth.',
      'A maintainable archive structure that supports community contributions.'
    ],
  },
  technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Markdown', 'Image Optimization'],
    
  liveUrl: 'https://east-texas-heritage.vercel.app',
  githubUrl: 'https://github.com/austncarsn/east-texas-heritage.git',
  },
  'clothing-web': {
    id: 'clothing-web',
  title: 'Clothing Web — Editorial E‑commerce Study',
    category: 'E-commerce Design Study',
    year: '2025',
    role: 'UI/UX Design & Front-end Development',
  description: 'An editorial-first e-commerce interface study demonstrating systematic design through modular grids, reusable components, and responsive breakpoints. Each product was individually rendered to explore how thoughtful component architecture creates visual consistency while enabling rapid iteration and scalability.',
  subtitle: 'Scalable design systems with editorial product layouts',
    longDescription: 'Clothing Web is a front-end e-commerce interface study focused on layout clarity, product hierarchy, and scalable design systems. Each clothing piece featured in this project was individually rendered to reflect my personal creative style and visual taste, allowing the interface to function as both a commerce layout and a curated aesthetic study.\\n\\nRather than building a full brand, this project explores responsive grid logic, reusable UI components, and minimal system architecture with a strong emphasis on editorial product presentation and crafted design detail. The interface demonstrates how thoughtful component design and systematic thinking can create a cohesive shopping experience.\\n\\nThe project showcases advanced grid layouts, responsive design patterns, and a modular component architecture that could scale to support a full e-commerce platform.',
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
  description: 'A comprehensive icon system built on a 24px grid with strict design principles for stroke weight, corner radii, and optical balance. Designed to ensure visual consistency across products, with componentized exports for developer adoption and full accessibility support including semantic markup and ARIA labels.',
  subtitle: 'Systematic iconography with cross-platform consistency',
    longDescription: 'The American Heritage Icon Library is a comprehensive set of precision-designed icons built for modern product interfaces. Each icon is crafted on an 24px grid system to ensure perfect pixel alignment and optical balance across all sizes.\\n\\nThe library focuses on clarity, consistency, and versatility. Every icon follows strict design principles including consistent stroke weights, corner radius, and negative space distribution. This systematic approach ensures that icons work harmoniously together, creating a unified visual language.\\n\\nBuilt with accessibility in mind, the library includes proper semantic markup, ARIA labels, and works seamlessly in both light and dark modes. The icons are available as React components, making them easy to integrate into any project.',
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
  'image-svg-converter': {
    id: 'image-svg-converter',
  title: 'Image SVG Converter — In‑Browser SVG Tracer',
    category: 'Developer Tool',
    year: '2025',
    role: 'Front-end Engineering & UX',
  description: 'A privacy-first browser tool that converts raster images to optimized SVG vectors entirely client-side. Built with adjustable tracing algorithms for color, smoothing, and detail control, demonstrating how to balance powerful functionality with accessible UX that does not overwhelm non-technical users.',
  subtitle: 'Client-side image processing with progressive controls',
    longDescription: 'The Image SVG Converter is a browser-based tool that transforms raster images into scalable vector graphics. Built entirely in the browser, this tool requires no server-side processing, ensuring privacy and instant results.\\n\\nThe converter uses advanced algorithms to trace bitmap images and generate clean, optimized SVG code. Users can adjust various settings including color threshold, curve smoothing, and detail level to fine-tune the output for their specific needs.\\n\\nThis project demonstrates practical problem-solving and builds a useful tool that designers and developers can use in their daily workflow. It showcases proficiency in canvas manipulation, SVG generation, and creating intuitive user interfaces for complex functionality.',
  technologies: ['React', 'Canvas API', 'SVG', 'TypeScript', 'Image Processing'],
    
    liveUrl: 'https://image-svg-converter-phi.vercel.app/',
  githubUrl: 'https://github.com/austncarsn/image-svg-converter.git',
  caseStudy: {
    problem: [
      'Convert raster images to vector format without sending user data to servers.',
      'Deliver performant in-browser processing with adjustable controls for different output needs.'
    ],
    approach: [
      'Implement client-side tracing algorithms with adjustable parameters for color, smoothing, and detail.',
      'Optimize canvas operations and processing pipelines to keep tracing responsive.',
      'Design progressive UI controls that expose advanced options without cluttering the interface.'
    ],
    impact: [
      'Enables privacy-first image conversion workflows for designers and developers.',
      'Balances power and simplicity, making advanced features discoverable but unobtrusive.',
      'Reduces reliance on server-side conversion and associated costs.'
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