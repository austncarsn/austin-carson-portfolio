import React, { memo } from 'react';
import FadeInSection from './FadeInSection';
import TypewriterText from './TypewriterText';
import LedText from './LedText';
import Section from './Section';

/**
 * Notes
 * - Funny, geeky manifesto lines added.
 * - Preserved layout and accessibility updates.
 */

const MANIFESTO_LINES = [
  'Tabs over spaces. Always.',
  'Commit messages are poetry.',
  'Dark mode is a lifestyle choice.',
  '',
  'I refactor in my sleep.',
  'Console.log is my therapist.',
  '',
  'One day I’ll delete node_modules.',
  'But not today.',
] as const;

const GradientBlob = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute right-4 top-16 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-brand-400 to-accent-400 opacity-[0.04] blur-3xl sm:right-8 sm:top-20 sm:h-[280px] sm:w-[280px] md:right-12 md:h-[320px] md:w-[320px] lg:right-16 lg:top-24 lg:h-[400px] lg:w-[400px] xl:right-20 xl:h-[450px] xl:w-[450px]"
  />
);

function HeroBase(): React.JSX.Element {
  return (
    <>
      <Section
        id="hero"
        bgClass="bg-canvas"
        labelNumber="01"
        labelTitle="HERO"
        labelDelay={0}
      >
        <GradientBlob />

        <div className="grid grid-cols-1 items-start gap-12 sm:gap-14 md:gap-16 lg:grid-cols-2 lg:gap-20 xl:gap-24 2xl:gap-32">
          <header className="space-y-10 sm:space-y-12">
            <FadeInSection delay={100} direction="up">
              <div>
                <LedText
                  text="AUSTIN CARSON"
                  as="h1"
                  delayStep={20}
                  className="mb-8 sm:mb-10 font-satoshi font-bold leading-none tracking-tighter text-text-primary transition-all duration-700 text-h2 sm:text-display-lg md:text-display-xl lg:text-display-2xl"
                />

                <div className="h-[3px] w-16 sm:w-20 rounded-full bg-gradient-to-r from-brand to-accent" />
              </div>
            </FadeInSection>

            <FadeInSection delay={200} direction="up">
              <h2 className="max-w-xl font-satoshi font-semibold leading-snug tracking-tight text-text-secondary text-h4 sm:text-h3 md:text-h2 lg:text-h1">
                Web Implementation & Interface Systems
              </h2>
            </FadeInSection>

            <FadeInSection delay={300} direction="up">
              <div className="max-w-lg space-y-5 sm:space-y-6">
                <p className="font-satoshi text-base sm:text-body-lg font-normal leading-relaxed text-text-secondary">
                  I build fast, accessible websites with production-grade components and tokens.
                </p>
                <p className="font-satoshi text-sm sm:text-base font-normal leading-relaxed text-text-muted">
                  From Figma to deployed, I ship pixel-accurate pages, reusable UI, and clean performance baselines so teams can iterate without rework.
                </p>
              </div>
            </FadeInSection>
          </header>

          <FadeInSection delay={400} direction="up">
            <aside className="lg:pt-20 xl:pt-24">
              <div className="relative bg-gradient-to-br from-brand-subtle/30 to-transparent pl-6 sm:pl-8 md:pl-10 py-5 sm:py-6 [border-left-width:3px] border-brand">
                <TypewriterText
                  lines={MANIFESTO_LINES as unknown as string[]}
                  className="space-y-2 font-satoshi text-sm sm:text-base font-normal leading-relaxed text-text-secondary"
                  typingSpeed={20}
                  lineDelay={150}
                />
              </div>
            </aside>
          </FadeInSection>
        </div>
      </Section>
    </>
  );
}

const Hero = memo(HeroBase);
export default Hero;