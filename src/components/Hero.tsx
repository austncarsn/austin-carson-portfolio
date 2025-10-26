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
  <Section id="hero" border="bottom" bgClass="bg-paper" labelNumber="01" labelTitle="HERO" labelDelay={0}>
    {/* Subtle decorative element */}
  <div className="pointer-events-none absolute top-24 right-6 h-[220px] w-[220px] rounded-full bg-brand opacity-[0.03] blur-3xl sm:right-12 sm:h-[260px] sm:w-[260px] lg:top-32 lg:right-20 lg:h-[300px] lg:w-[300px]"></div>

      {/* Section Label is rendered by Section via props */}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Main Hero Content */}
          <div className="space-y-8">
            {/* Name Display with Accent */}
            <FadeInSection delay={100} direction="up">
              <div>
                  <h1 className="font-satoshi text-h3 md:text-h2 lg:text-h1 tracking-[-0.02em] leading-[0.95] mb-6 transition-all duration-700 group-hover:tracking-[-0.03em]">
                  AUSTIN CARSON
                </h1>
              </div>
            </FadeInSection>

            {/* Subtitle */}
            <FadeInSection delay={200} direction="up">
              <h2 className="font-satoshi font-medium text-h5 md:text-h4 lg:text-h2 leading-[1.3] text-text-primary tracking-[-0.01em]">
                Creative Technology and Interface Systems
              </h2>
            </FadeInSection>

            {/* Supporting Content */}
            <FadeInSection delay={300} direction="up">
              <div className="space-y-6">
                <p className="font-plex text-base leading-[1.6] text-text-muted">
                  I design clean, scalable interfaces that prioritize structure, clarity, and usability. My work combines front-end engineering with system-driven design to create products that feel effortless and are simple to maintain.
                </p>

                <p className="font-plex text-sm leading-[1.5] text-text-muted opacity-70">
                  Currently crafting modern UI systems and refining component logic — one build at a time.
                </p>
              </div>
            </FadeInSection>
          </div>

          {/* Right Column - Manifesto */}
          <FadeInSection delay={400} direction="up">
            <div className="lg:pt-16">
              <div className="border-l-2 border-brand pl-6 py-2">
                <TypewriterText 
                  lines={manifestoLines}
                  className="font-plex text-base text-text-muted leading-relaxed space-y-1 opacity-95"
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