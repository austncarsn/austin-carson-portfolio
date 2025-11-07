import React, { memo } from 'react';
import Section from './Section';

/**
 * Modern Hero Component
 * Clean, cohesive design with refined typography
 */

const PRINCIPLES = [
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
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,720px)_1fr]">
          {/* Main Card */}
          <div className="rounded-2xl border border-black/10 bg-[var(--paper,#FFFCEB)] shadow-[0_1px_0_rgba(0,0,0,.06),0_24px_60px_-24px_rgba(0,0,0,.28)]">
            <div className="rounded-2xl p-8 md:p-12 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,.6)]">
              <h1 className="text-[clamp(48px,7vw,72px)] font-extrabold tracking-[-0.02em] leading-[1] text-neutral-900 mb-6">
                Austin Carson
              </h1>

              <p className="text-xl md:text-2xl font-semibold text-neutral-700 mb-6">
                Web Implementation & Interface Systems
              </p>

              <div className="max-w-[60ch] space-y-4 text-[17px] leading-[1.7] text-neutral-800/90 mb-8">
                <p>
                  I build fast, accessible websites with production-grade components and design tokens.
                </p>
                <p>
                  From Figma to deployed, I ship pixel-accurate pages, reusable UI, and clean performance baselines so teams can iterate without rework.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[15px] font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 ring-offset-[var(--paper,#FFFCEB)]"
                >
                  View Work
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[15px] font-semibold text-neutral-900 bg-transparent border border-neutral-900/20 hover:bg-neutral-900/5 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Principles Sidebar */}
          <aside className="pt-2">
            <div className="rounded-xl border border-neutral-900/10 bg-white/40 backdrop-blur-sm overflow-hidden">
              <div className="divide-y divide-neutral-900/10">
                {PRINCIPLES.map((principle) => (
                  <div
                    key={principle}
                    className="px-5 py-4 text-[15px] text-neutral-700 hover:bg-neutral-900/[0.02] transition-colors"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

const Hero = memo(HeroBase);
export default Hero;
