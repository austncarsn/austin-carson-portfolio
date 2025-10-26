import type { ReactElement } from 'react';
import FadeInSection from './FadeInSection';
import Section from './Section';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactCTA(): ReactElement {
  return (
  <Section id="contact" border="bottom" bgClass="bg-canvas">
      {/* Force columns to align to the top; prevent accidental stretching */}
  <div className="grid grid-cols-1 items-start gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left — Heading */}
        <FadeInSection delay={0} direction="right">
          <div className="space-y-6">
            <h2 className="font-satoshi text-h3 sm:text-h2 lg:text-display-lg leading-none tracking-tighter text-text-primary">
              Let's build something together.
            </h2>
            <p className="font-satoshi text-body-lg text-text-secondary leading-relaxed max-w-[540px]">
              If you have a project, an idea, or just want to collaborate, reach out and say hello.
            </p>
            <div className="mt-3 h-[3px] w-14 rounded-full bg-gradient-to-r from-brand to-accent" />
          </div>
        </FadeInSection>

        {/* Right — Contact Links (top-aligned, not centered) */}
        <FadeInSection delay={100} direction="left">
          <div className="flex min-h-0 flex-col self-start space-y-4">
            <a
              href="mailto:austncarsn@gmail.com"
              className="group inline-flex w-full items-center gap-4 px-7 py-5 bg-dark text-text-on-dark rounded-lg transition-all duration-base hover:bg-brand hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              aria-label="Email Austin"
            >
              <Mail className="w-5 h-5 transition-transform duration-base group-hover:scale-110" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-xs font-semibold tracking-wider uppercase">EMAIL</span>
                <span className="font-satoshi text-sm opacity-90">austncarsn@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-4 px-7 py-5 bg-paper border-2 border-structure text-text-primary rounded-lg transition-all duration-base hover:border-brand hover:bg-elevated hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Linkedin className="w-5 h-5 transition-all duration-base group-hover:text-brand group-hover:scale-110" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-xs font-semibold tracking-wider uppercase">LINKEDIN</span>
                <span className="font-satoshi text-sm text-text-muted">View professional profile</span>
              </div>
            </a>

            <a
              href="https://github.com/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-4 px-7 py-5 bg-paper border-2 border-structure text-text-primary rounded-lg transition-all duration-base hover:border-dark hover:bg-elevated hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              <Github className="w-5 h-5 transition-all duration-base group-hover:scale-110 group-hover:rotate-12" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-xs font-semibold tracking-wider uppercase">GITHUB</span>
                <span className="font-satoshi text-sm text-text-muted">Browse code repositories</span>
              </div>
            </a>
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
