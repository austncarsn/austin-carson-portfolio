import FadeInSection from './FadeInSection';
import TypewriterText from './TypewriterText';
import Section from './Section';
import React from 'react';

export default function Hero(): React.JSX.Element {
  const manifestoLines = [
  "The notebook is for ideas.",
  "The code is for products.",
  "The coffee is for both.",
  "",
  "My process: Question everything,",
  "prototype quickly, refine obsessively.",
  "",
  "Also: I take notes I never reference.",
  "But they help me think."
  ];

  return (
  <Section id="hero" border="bottom" bgClass="bg-canvas" labelNumber="01" labelTitle="HERO" labelDelay={0}>
    {/* Ambient gradient blur - modern, state-of-the-art aesthetic */}
  <div className="pointer-events-none absolute top-20 right-8 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-brand-400 to-accent-400 opacity-[0.04] blur-3xl sm:right-16 sm:h-[320px] sm:w-[320px] lg:top-24 lg:right-24 lg:h-[400px] lg:w-[400px]"></div>

      {/* Section Label is rendered by Section via props */}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-start">
          {/* Left Column - Main Hero Content */}
          <div className="space-y-10">
            {/* Name Display with refined typography */}
            <FadeInSection delay={100} direction="up">
              <div>
                  <h1 className="font-display text-h2 md:text-display-lg lg:text-display-xl tracking-tighter leading-none mb-8 text-text-primary transition-all duration-700">
                  AUSTIN CARSON
                </h1>
                <div className="h-[3px] w-16 bg-gradient-to-r from-brand to-accent rounded-full" />
              </div>
            </FadeInSection>

            {/* Subtitle with semantic spacing */}
            <FadeInSection delay={200} direction="up">
              <h2 className="font-display font-semibold text-h4 md:text-h3 lg:text-h2 leading-snug text-text-secondary tracking-tight max-w-xl">
                Creative Technology and Interface Systems
              </h2>
            </FadeInSection>

            {/* Supporting Content with refined hierarchy */}
            <FadeInSection delay={300} direction="up">
              <div className="space-y-5 max-w-lg">
                <p className="font-body text-body-lg leading-relaxed text-text-secondary">
                  I design clean, scalable interfaces that prioritize structure, clarity, and usability. My work combines front-end engineering with system-driven design to create products that feel effortless and are simple to maintain.
                </p>

                <p className="font-body text-base leading-relaxed text-text-muted">
                  Currently crafting modern UI systems and refining component logic — one build at a time.
                </p>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column - Manifesto */}
          <FadeInSection delay={400} direction="up">
            <div className="lg:pt-20">
              <div className="relative border-l-[3px] border-brand pl-8 py-4 bg-gradient-to-br from-brand-subtle/30 to-transparent">
                {/* Accent dot */}
                <div className="absolute -left-[7px] top-4 h-3 w-3 rounded-full bg-brand ring-4 ring-canvas" />
                
                <TypewriterText 
                  lines={manifestoLines}
                  className="font-body text-base text-text-secondary leading-relaxed space-y-1.5"
                  typingSpeed={20}
                  lineDelay={150}
                />
              </div>
            </div>
          </FadeInSection>
      </div>
    </Section>
  );
}