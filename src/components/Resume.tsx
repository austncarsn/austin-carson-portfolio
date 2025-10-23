import React from 'react';

export default function Resume(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-paper px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-[820px] bg-white p-8 shadow-sm">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="text-4xl font-extrabold tracking-tight">AUSTIN CARSON</div>
          <div className="font-plex text-lg text-text-muted mt-1">Creative Technologist &amp; AI Trainer</div>
          <div className="font-plex text-sm text-text-muted mt-2">
            Missoula, MT • <a href="https://austincarson.dev" className="underline">austincarson.dev</a> • <a href="https://linkedin.com/in/austin-carson-4b059731a" className="underline">linkedin.com/in/austin-carson</a>
            <br />austincarson@gmail.com • (206) 620-4803
          </div>
        </header>

        <hr className="my-6 border-structure" />

        {/* Summary */}
        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">Summary</h2>
          <p className="font-plex text-[15px] leading-[1.7] text-text-primary">Creative technologist bridging design, code, and machine learning. Combines expertise in interactive development, AI training (RLHF), and UX systems to build intelligent tools and refine model behavior. Proven in rapid prototyping, prompt engineering, bias detection, and crafting human-aligned AI experiences. Drives clarity through both technical precision and visual refinement.</p>
        </section>

        {/* Core Competencies */}
        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">Core Competencies</h2>

          <div className="mb-4">
            <div className="font-plex font-semibold">AI Training &amp; Evaluation</div>
            <ul className="list-disc list-inside text-text-muted mt-2">
              <li>Reinforcement Learning from Human Feedback (RLHF)</li>
              <li>Prompt Engineering &amp; Instruction Design</li>
              <li>Model Output Evaluation (Accuracy, Reasoning, Bias, Hallucination)</li>
              <li>Data Annotation &amp; Quality Scoring</li>
              <li>Task Compliance &amp; Instruction Refinement</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="font-plex font-semibold">Frontend Development</div>
            <ul className="list-disc list-inside text-text-muted mt-2">
              <li>React | Next.js | TypeScript | Tailwind CSS</li>
              <li>Responsive UIs | Component Libraries | Theme Systems</li>
              <li>Accessibility (WCAG) | Performance Optimization</li>
            </ul>
          </div>

          <div>
            <div className="font-plex font-semibold">Design &amp; Prototyping</div>
            <ul className="list-disc list-inside text-text-muted mt-2">
              <li>Figma | Design Systems | UI/UX Prototyping</li>
              <li>SVG Tooling | Visual Asset Automation</li>
              <li>Interactive Storytelling | Editorial Design</li>
            </ul>
          </div>
        </section>

        {/* Experience Sections */}
        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">AI Training &amp; Evaluation Experience</h2>
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-plex font-semibold">AI Evaluator</div>
                <div className="text-text-muted">Various Platforms (Contract)</div>
              </div>
              <div className="text-text-muted">2023–Present</div>
            </div>
            <ul className="list-disc list-inside mt-3 text-text-muted">
              <li>Scored LLM outputs for coherence, reasoning, alignment, and safety across diverse tasks.</li>
              <li>Detected hallucination patterns and bias signals; provided structured feedback to improve model reliability.</li>
              <li>Refined prompts and annotation guidelines to increase consistency and reduce ambiguity.</li>
              <li>Annotated multimodal datasets with high precision, supporting cleaner training pipelines.</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">Professional Experience</h2>
          <div className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-plex font-semibold">Client &amp; Product Specialist</div>
                <div className="text-text-muted">Swarovski Crystal — Seattle, WA</div>
              </div>
              <div className="text-text-muted">2024–Present</div>
            </div>
            <ul className="list-disc list-inside mt-3 text-text-muted">
              <li>Exceeded monthly sales targets by ~20% through tailored client education and experience design.</li>
              <li>Optimized display layouts using behavioral insights, boosting engagement and conversion.</li>
              <li>Trained team members in client-first communication, knowledge retention, and brand storytelling.</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">Key Projects &amp; Creative Work</h2>
          <div className="mb-4">
            <div className="font-plex font-semibold">Floral Design SVG — AI-Powered Web App</div>
            <ul className="list-disc list-inside mt-2 text-text-muted">
              <li>Built a generative tool allowing creators to produce, preview, and export scalable floral illustrations as SVGs.</li>
              <li>Integrated image-to-vector workflows and AI-assisted styling for rapid creative iteration.</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="font-plex font-semibold">AI Prompt Studio: Vehicles</div>
            <ul className="list-disc list-inside mt-2 text-text-muted">
              <li>Designed a focused interface for engineering and testing vehicle design prompts.</li>
              <li>Improved output consistency by standardizing prompt structures and evaluation criteria.</li>
            </ul>
          </div>
          <p className="mt-3 italic text-text-muted">Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Figma, Git, Canvas API, SVG Optimization</p>
        </section>

        <section className="mb-6">
          <h2 className="font-satoshi text-sm uppercase tracking-widest mb-2">Education</h2>
          <p className="font-plex font-semibold">B.S. in Biological Sciences — Southern Methodist University <span className="text-text-muted">2020</span></p>
        </section>

        <div className="mt-8 text-center no-print">
          <p className="text-sm text-text-muted">To save as PDF: Press <strong>Cmd+P</strong> → Choose "Save as PDF" → Click Save.</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-md"
          >
            Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  );
}
