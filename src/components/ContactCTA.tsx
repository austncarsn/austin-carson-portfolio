import type { ReactElement } from 'react';
import FadeInSection from './FadeInSection';
import Section from './Section';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function ContactCTA(): ReactElement {
  return (
  <Section id="contact" border="bottom" bgClass="bg-paper">
      {/* Force columns to align to the top; prevent accidental stretching */}
  <div className="grid grid-cols-1 items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-24">
        {/* Left — Heading */}
        <FadeInSection delay={0} direction="right">
          <div className="space-y-4">
            <h2 className="font-satoshi text-[32px] leading-[1.0] tracking-[-0.02em] sm:text-[52px] lg:text-[72px]">
              Let's build something together.
            </h2>
            <p className="font-satoshi text-[18px] text-text-muted max-w-[520px]">
              If you have a project, an idea, or just want to collaborate, reach out and say hello.
            </p>
            <div className="mt-2 h-[3px] w-12 rounded-[1px] bg-brand" />
          </div>
        </FadeInSection>

        {/* Right — Contact Links (top-aligned, not centered) */}
        <FadeInSection delay={100} direction="left">
          <div className="flex min-h-0 flex-col self-start space-y-4">
            <a
              href="mailto:austncarsn@gmail.com"
              className="group inline-flex w-full items-center gap-3 px-6 py-4 bg-dark text-text-on-dark transition-all duration-300 hover:bg-brand hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
              aria-label="Email Austin"
            >
              <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-[14px] font-semibold tracking-wide uppercase">EMAIL</span>
                <span className="font-plex text-[13px] opacity-80">austncarsn@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-3 px-6 py-4 bg-surface border-2 border-structure text-text-primary transition-all duration-300 hover:border-brand hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
            >
              <Linkedin className="w-5 h-5 transition-all duration-300 group-hover:text-brand group-hover:scale-110" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-[14px] font-semibold tracking-wide uppercase">LINKEDIN</span>
                <span className="font-plex text-[13px] text-text-muted">View professional profile</span>
              </div>
            </a>

            <a
              href="https://github.com/austncarsn"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center gap-3 px-6 py-4 bg-surface border-2 border-structure text-text-primary transition-all duration-300 hover:border-dark hover:bg-white hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
            >
              <Github className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="flex flex-col items-start">
                <span className="font-satoshi text-[14px] font-semibold tracking-wide uppercase">GITHUB</span>
                <span className="font-plex text-[13px] text-text-muted">Browse code repositories</span>
              </div>
            </a>
          </div>
        </FadeInSection>
      </div>
    </Section>
  );
}
