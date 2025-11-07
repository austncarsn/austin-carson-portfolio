import React, { memo } from 'react';
import FadeInSection from './FadeInSection';
import TypewriterText from './TypewriterText';
import Section from './Section';

/**
 * Elevated Hero Component
 * Two-column grid layout with refined typography hierarchy
 * Left: Name, subtitle, body with vertical rhythm
 * Right: Vertical accent rule + quips with optical alignment
 */

const QUIPS = [
  'Tabs over spaces. Always.',
  'Commit messages are poetry.',
  'Dark mode is a lifestyle choice.',
  'Console.log is my therapist.',
] as const;

function HeroBase(): React.JSX.Element {
  return (
    <Section
      id="hero"
      bgClass="bg-canvas"
      labelNumber="01"
      labelTitle="HERO"
      labelDelay={0}
      ptClass="pt-18 px-4 sm:px-6 lg:px-16 xl:px-20 pb-16 sm:pb-20 lg:pb-24"
    >
      {/* Two-column grid at LG+ breakpoint */}
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6">
          {/* Left column - Main content */}
          <div className="lg:col-span-7 space-y-6">
            <FadeInSection delay={100} direction="up">
              {/* Background panel card */}
              <div 
                className="rounded-soft p-8 sm:p-10 lg:p-12"
                style={{
                  background: 'var(--color-bg-panel)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), var(--shadow-low)',
                }}
              >
                {/* Name - 3xl/1.1, weight 700, color ink */}
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-ink mb-6">
                  Austin Carson
                </h1>

                {/* Subtitle - lg/1.35, weight 600, color muted */}
                <h2 className="text-lg lg:text-xl font-semibold leading-snug text-muted mb-6">
                  Web Implementation & Interface Systems
                </h2>

                {/* Body - md/1.5, max 75ch, color ink at 80% */}
                <div className="space-y-4 max-w-line">
                  <p className="text-base leading-relaxed text-primary-80">
                    I build fast, accessible websites with production-grade components and design tokens.
                  </p>
                  <p className="text-base leading-relaxed text-primary-80">
                    From Figma to deployed, I ship pixel-accurate pages, reusable UI, and clean performance baselines so teams can iterate without rework.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Right column - Accent rule + quips */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <FadeInSection delay={200} direction="up">
              <div className="flex gap-6 h-full pt-12">
                {/* Vertical accent rule - 2px, accent-mint, ~72% height */}
                <div 
                  className="w-[2px] rounded-full"
                  style={{
                    background: 'var(--color-accent-mint)',
                    height: '72%',
                    alignSelf: 'flex-start',
                  }}
                  aria-hidden="true"
                />

                {/* Quips stack - md, 60% opacity, spacing 16, optical center */}
                <div className="flex-1 space-y-4 pt-8">
                  <TypewriterText
                    lines={QUIPS as unknown as string[]}
                    className="space-y-4 font-satoshi text-base leading-normal opacity-60"
                    typingSpeed={20}
                    lineDelay={180}
                  />
                </div>
              </div>
            </FadeInSection>
          </div>

          {/* Mobile version of quips (below main content on small screens) */}
          <div className="lg:hidden">
            <FadeInSection delay={200} direction="up">
              <div 
                className="rounded-soft p-6 border-l-2"
                style={{
                  borderLeftColor: 'var(--color-accent-mint)',
                  background: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                <TypewriterText
                  lines={QUIPS as unknown as string[]}
                  className="space-y-3 font-satoshi text-sm leading-normal opacity-60"
                  typingSpeed={20}
                  lineDelay={180}
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </Section>
  );
}

const Hero = memo(HeroBase);
export default Hero;
