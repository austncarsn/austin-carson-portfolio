import React, { memo } from 'react';
import Section from './Section';

/**
 * Elevated Hero Component
 * Clean card design with prominent CTAs and principles sidebar
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
          {/* Card */}
          <div className="rounded-2xl border border-black/10 bg-[var(--paper,#FFFCEB)] shadow-[0_1px_0_rgba(0,0,0,.06),0_24px_60px_-24px_rgba(0,0,0,.28)]">
            <div className="rounded-2xl p-7 md:p-10 [box-shadow:inset_0_0_0_1px_rgba(255,255,255,.6)]">
              <h1 className="text-[clamp(40px,7vw,84px)] font-extrabold tracking-[-0.02em] leading-[.95] text-neutral-900">
                Austin Carson
              </h1>

              <p className="mt-4 text-xl md:text-2xl font-semibold text-neutral-700">
                Web Implementation & Interface Systems
              </p>

              <div className="mt-5 max-w-[60ch] space-y-4 text-[17px] leading-[1.7] text-neutral-800/90">
                <p>
                  I build fast, accessible websites with production-grade components and design tokens.
                </p>
                <p>
                  From Figma to deployed, I ship pixel-accurate pages, reusable UI, and clean performance baselines so teams can iterate without rework.
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[15px] font-semibold text-white bg-[#7C8F82] hover:opacity-95 active:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/20 ring-offset-[var(--paper,#FFFCEB)]"
                >
                  View Work
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[15px] font-semibold text-neutral-900/80 bg-transparent border border-neutral-900/15 hover:bg-neutral-900/[0.04]"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Principles */}
          <aside className="pt-2 text-[15px] text-neutral-700">
            <ul className="divide-y divide-neutral-900/10 rounded-xl border border-neutral-900/10 bg-white/40 backdrop-blur-[2px]">
              {PRINCIPLES.map((principle) => (
                <li key={principle} className="px-5 py-4">
                  {principle}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </Section>
  );
}

const Hero = memo(HeroBase);
export default Hero;
