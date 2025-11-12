import { motion } from 'motion/react';
import { Download, ExternalLink } from 'lucide-react';
import type { JSX } from 'react';

const SKILLS = [
  'UI/UX Design',
  'Product Design',
  'React Development',
  'TypeScript',
  'Design Systems',
  'Front-end Dev',
  'AI Integration',
  'User Research'
] as const;

interface HeroProps {
  firstName?: string;
  lastName?: string;
  role?: string;
  tagline?: string;
  bioShort?: string;
  bioExtended?: string[];
  initials?: string;
  skills?: readonly string[];
  resumeLink?: string;
  linkedInLink?: string;
}

export function Hero({
  firstName = 'Austin',
  lastName = 'Carson',
  role = 'Designer / Developer',
  tagline = 'A multidisciplinary designer focused on creating thoughtful digital experiences at the intersection of design and technology.',
  bioShort = "With expertise in React, TypeScript, and design systems, I craft elegant interfaces that bridge creativity with code.",
  bioExtended = [
    "With over 7 years of experience, I've had the privilege of working with startups and established brands to craft meaningful digital products that users love.",
    "My approach combines strategic thinking with meticulous attention to detail, ensuring every pixel serves a purpose."
  ],
  initials = 'AC',
  skills = SKILLS,
  resumeLink = '/resume',
  linkedInLink = 'https://linkedin.com/in/austincarson',
}: HeroProps = {}): JSX.Element {
  return (
    <section 
      className="relative min-h-screen px-8 md:px-16 py-24"
      style={{ backgroundColor: 'var(--chinese-white)' }}
    >
      <div className="max-w-6xl mx-auto min-h-[calc(100vh-12rem)] flex items-center">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 w-full">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="sticky top-24"
            >
              <div 
                className="aspect-[3/4] rounded-3xl mb-8 flex items-center justify-center"
                style={{ backgroundColor: 'var(--powder-blue)' }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-9xl font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  {initials}
                </motion.div>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-6 py-4 rounded-full flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'white'
                  }}
                >
                  <Download size={18} />
                  <span className="text-sm tracking-wide">Resume</span>
                </motion.a>

                <motion.a
                  href={linkedInLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)'
                  }}
                >
                  <ExternalLink size={18} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <div 
                  className="text-sm tracking-[0.3em] uppercase mb-4"
                  style={{ color: 'var(--muted)', opacity: 0.6 }}
                >
                  {role}
                </div>
                
                <h1 
                  className="text-[clamp(3rem,7vw,7rem)] leading-[0.85] tracking-tighter mb-6"
                  style={{ color: 'var(--ink)' }}
                >
                  {firstName}
                  <br />
                  {lastName}
                </h1>

                <p 
                  className="text-xl md:text-2xl leading-relaxed"
                  style={{ color: 'var(--muted)', opacity: 0.8 }}
                >
                  {tagline}
                </p>
              </div>

              <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                <p>{bioShort}</p>
                {bioExtended.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: 'var(--ink)', opacity: 0.6 }}
              >
                Expertise
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                    className="px-4 py-3 rounded-xl border-2"
                    style={{
                      borderColor: 'var(--line)',
                      backgroundColor: 'white'
                    }}
                  >
                    <span style={{ color: 'var(--ink)' }}>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-5 rounded-full"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white'
                }}
              >
                <span className="tracking-wide">Let's Work Together</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
