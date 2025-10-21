import type { ReactElement } from 'react';

import FadeInSection from './FadeInSection';

export default function Footer(): ReactElement {
  return (
  <footer className="relative w-full overflow-hidden bg-dark px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
      {/* container */}
      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Main */}
        <div className="grid grid-cols-1 items-start gap-10 border-b border-[#454951] pb-12 md:grid-cols-[1fr_auto] md:items-end">
          {/* Left: Name & Tagline (animate this only) */}
          <FadeInSection delay={0} direction="up">
            <div className="space-y-2">
              <h3 className="font-['Satoshi'] text-2xl tracking-wide text-text-on-dark">
                AUSTIN CARSON
              </h3>
              <p className="font-['Satoshi'] text-sm text-text-on-dark opacity-60">
                Design + Technology
              </p>
            </div>
          </FadeInSection>

          {/* Right: Links (animate, keep top/baseline stable) */}
          <FadeInSection delay={60} direction="up">
            <nav className="flex flex-wrap items-center justify-start gap-6 font-['Satoshi'] text-sm text-text-on-dark md:justify-end">
              <a
                href="https://www.linkedin.com/in/austncarsn"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-brand"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/austncarsn"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-brand"
              >
                GitHub
              </a>
              <a
                href="mailto:austncarsn@gmail.com"
                className="transition-colors duration-200 hover:text-brand"
              >
                Email
              </a>
            </nav>
          </FadeInSection>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-4 pt-8 sm:flex-row sm:items-center">
          <FadeInSection delay={120} direction="up">
            <p className="font-['Satoshi'] text-xs text-text-on-dark opacity-50">
              Missoula, Montana
            </p>
          </FadeInSection>
          <FadeInSection delay={150} direction="up">
            <p className="font-['Satoshi'] text-xs text-text-on-dark opacity-50">
              © 2025 All Rights Reserved
            </p>
          </FadeInSection>
        </div>
      </div>
    </footer>
  );
}
