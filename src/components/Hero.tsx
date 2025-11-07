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
      ptClass="pt-16 px-4 sm:px-6 lg:px-16 xl:px-20 pb-16 sm:pb-20 lg:pb-24"
    >
      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,720px)_1fr]">
          {/* Main Card */}
          <div className="rounded-2xl border border-black/10 bg-[var(--paper,#FFFCEB)] shadow-[0_1px_0_rgba(0,0,0,.06),0_24px_60px_-24px_rgba(0,0,0,.28)]">
            <div className="rounded-2xl p-8 md:p-12 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,.6)]">
              {/* H1: WCAG 2.2 AA Compliant - 22-32px fluid */}
              <h1 className="text-h1 font-black text-neutral-900 mb-6">
                Austin Carson
              </h1>

              {/* H2: Subtitle - 20-28px fluid */}
              <p className="text-h2 font-semibold text-neutral-700 mb-6">
                Web Implementation & Interface Systems
              </p>

              {/* Body: 16px base, max 65ch line length for readability */}
              <div className="max-w-[65ch] space-y-4 text-base leading-relaxed text-neutral-800/90 mb-8">
                <p>
                  I build fast, accessible websites with production-grade components and design tokens.
                </p>
                <p>
                  From Figma to deployed, I ship pixel-accurate pages, reusable UI, and clean performance baselines so teams can iterate without rework.
                </p>
              </div>

              {/* CTAs: 48px minimum touch target (WCAG 2.5.5) */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 min-h-12 text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900 ring-offset-[var(--paper,#FFFCEB)]"
                >
                  View Work
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 min-h-12 text-base font-semibold text-neutral-900 bg-transparent border border-neutral-900/20 hover:bg-neutral-900/5 transition-colors duration-200"
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
                    className="px-6 py-4 text-base text-neutral-700 hover:bg-neutral-900/[0.02] transition-colors duration-150 cursor-default"
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
