import React, { useMemo } from 'react';
import { Button } from './common/primitives';
import { Download } from 'lucide-react';

// Reusable Section Header Component
const SectionHeader = ({ title }: { title: string }): React.JSX.Element => (
  <h2 className="text-xs uppercase tracking-wider mb-4 font-semibold text-neutral-900 border-b-2 border-accent pb-2">{title}</h2>
);

// Reusable Skill Card Component
const SkillCard = ({ title, skills }: { title: string; skills: string[] }): React.JSX.Element => (
  <div className="bg-surface border border-line p-4 rounded-lg shadow-sm">
    <div className="font-semibold text-neutral-900 mb-2">{title}</div>
    <ul className="list-disc list-inside text-sm text-neutral-700 space-y-1.5">
      {skills.map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
    </ul>
  </div>
);

// Reusable Job Card Component
const JobCard = ({ title, company, period, responsibilities }: { 
  title: string; 
  company: string; 
  period: string; 
  responsibilities: string[] 
}): React.JSX.Element => (
  <div className="mb-5">
    <div className="flex justify-between items-start mb-1">
      <div className="font-semibold text-neutral-900">{title}</div>
      <div className="text-neutral-600 text-sm whitespace-nowrap ml-4">{period}</div>
    </div>
    <div className="text-neutral-600 text-sm mb-3">{company}</div>
    <ul className="list-disc list-inside space-y-1.5 text-sm text-neutral-700">
      {responsibilities.map((resp, index) => (
        <li key={index}>{resp}</li>
      ))}
    </ul>
  </div>
);

// Reusable Project Card Component
const ProjectCard = ({ title, description, techStack }: { 
  title: string; 
  description: string[]; 
  techStack?: string 
}): React.JSX.Element => (
  <div className="mb-5">
    <div className="font-semibold text-neutral-900 mb-2">{title}</div>
    <ul className="list-disc list-inside space-y-1.5 text-sm text-neutral-700">
      {description.map((desc, index) => (
        <li key={index}>{desc}</li>
      ))}
    </ul>
    {techStack && <p className="text-sm text-neutral-600 mt-2 italic">{techStack}</p>}
  </div>
);

export default function Resume(): React.JSX.Element {
  // Data for AI training experience - memoized to prevent recreation on re-renders
  const aiTrainingExperience = useMemo(() => [
    {
      title: "AI Evaluator",
      company: "Various Platforms (Contract)",
      period: "2023–Present",
      responsibilities: [
        "Scored LLM outputs for coherence, reasoning, alignment, and safety across diverse tasks.",
        "Detected hallucination patterns and bias signals; provided structured feedback to improve model reliability.",
        "Refined prompts and annotation guidelines to increase consistency and reduce ambiguity.",
        "Annotated multimodal datasets with high precision, supporting cleaner training pipelines."
      ]
    }
  ], []);

  // Data for professional experience - memoized to prevent recreation on re-renders
  const professionalExperience = useMemo(() => [
    {
      title: "Client & Product Specialist",
      company: "Swarovski Crystal",
      period: "July 2024–July 2025",
      responsibilities: [
        "Exceeded monthly sales targets by ~20% through tailored client education and experience design.",
        "Optimized display layouts using behavioral insights, boosting engagement and conversion.",
        "Trained team members in client-first communication, knowledge retention, and brand storytelling."
      ]
    }
  ], []);

  // Data for projects - memoized to prevent recreation on re-renders
  const projects = useMemo(() => [
    {
      title: "Floral Design SVG — AI-Powered Web App",
      description: [
        "Built a generative tool allowing creators to produce, preview, and export scalable floral illustrations as SVGs.",
        "Integrated image-to-vector workflows and AI-assisted styling for rapid creative iteration."
      ],
      techStack: "Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Figma, Git, Canvas API, SVG Optimization"
    },
    {
      title: "AI Prompt Studio: Vehicles",
      description: [
        "Designed a focused interface for engineering and testing vehicle design prompts.",
        "Improved output consistency by standardizing prompt structures and evaluation criteria."
      ]
    },
    {
      title: "Cameo Store — Minimal E-Commerce Demo",
      description: [
        "Developed a clean, performant browsing experience showcasing attention to detail and micro-interactions."
      ]
    },
    {
      title: "American Heritage Icon Library",
      description: [
        "Created a scalable icon system with consistent stroke geometry, naming conventions, and export tooling."
      ]
    }
  ], []);

  return (
    <div className="min-h-screen bg-bg py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[8.5in] bg-surface rounded-xl border border-line p-8 md:p-12 shadow-lg">
          {/* Header Section */}
          <div className="mb-8">
            <div className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-2">AUSTIN CARSON</div>
            <div className="text-lg text-neutral-700 mb-4">Product Designer &amp; Front-End Developer</div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600">
              <span>Seattle, Washington</span>
              <a className="text-accent hover:underline" href="mailto:austinscarson@gmail.com">austinscarson@gmail.com</a>
              <a className="text-accent hover:underline" href="https://linkedin.com/in/austin-carson" target="_blank" rel="noopener noreferrer">linkedin.com/in/austin-carson</a>
              <span>(206) 620-4803</span>
            </div>
          </div>

          <div className="border-t border-line my-8" />

          {/* Summary Section */}
          <section className="mb-8">
            <SectionHeader title="Summary" />
            <p className="text-sm text-neutral-700 leading-relaxed">
              Product designer and front-end developer specializing in design systems, component architecture, and user-centered interfaces. Expertise spans Figma-to-code workflows, React development, and systematic design thinking. Creates cohesive digital experiences through thoughtful interaction design, accessible components, and performance-optimized front-end implementation. Bridges design and engineering to deliver polished, scalable products.
            </p>
          </section>

          {/* Core Competencies Section */}
          <section className="mb-8">
            <SectionHeader title="Core Competencies" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <SkillCard
                  title="Product Design"
                  skills={[
                    'User Interface & Experience Design',
                    'Design Systems & Component Libraries',
                    'Prototyping & User Flow Mapping',
                    'Responsive & Mobile-First Design',
                    'Accessibility (WCAG) & Inclusive Design',
                  ]}
                />
              </div>

              <div>
                <SkillCard
                  title="Frontend Development"
                  skills={[
                    'React, Next.js, TypeScript, Tailwind CSS',
                    'Component Architecture & State Management',
                    'Theme Systems & Design Tokens',
                    'Performance Optimization & Web Vitals',
                  ]}
                />
              </div>

              <div>
                <SkillCard
                  title="Design Tools & Workflow"
                  skills={[
                    'Figma, Adobe Creative Suite, Sketch',
                    'Version Control (Git) & Collaboration',
                    'SVG Optimization & Icon Systems',
                    'Design-to-Development Handoff',
                  ]}
                />
              </div>
            </div>
          </section>

          {/* AI Training Experience Section */}
          <section className="mb-8">
            <SectionHeader title="AI Training & Evaluation Experience" />
            {aiTrainingExperience.map((exp, index) => (
              <JobCard key={index} {...exp} />
            ))}
          </section>

          {/* Professional Experience Section */}
          <section className="mb-8">
            <SectionHeader title="Professional Experience" />
            {professionalExperience.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </section>

          {/* Projects Section */}
          <section className="mb-8">
            <SectionHeader title="Key Projects & Creative Work" />
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </section>

          {/* Education Section */}
          <section className="mb-8">
            <SectionHeader title="Education" />
            <p className="text-sm text-neutral-700">
              <span className="font-semibold text-neutral-900">B.S. in Biological Sciences</span><br />
              Southern Methodist University · 2020
            </p>
          </section>

          {/* Print/download button */}
          <div className="text-center mt-10 print:hidden border-t border-line pt-8">
            <p className="text-sm text-neutral-600 mb-4">To save as PDF: Press <strong>Cmd+P</strong> → Choose "Save as PDF" → Click Save.</p>
            <Button
              onClick={() => window.print()}
              variant="primary"
              size="md"
              iconBefore={<Download />}
              aria-label="Download resume as PDF"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}