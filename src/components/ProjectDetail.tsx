import { useEffect, type ReactElement } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ImageWithFallback } from './common/media/ImageWithFallback';

interface Project {
  title: string;
  category: string;
  year: string;
  client: string;
  image: string;
  description: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
  tags?: string[];
  link?: string;
}

interface ProjectDetailProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const FALLBACK_RESULTS: string[] = [
  'Improved engagement and task completion for key flows.',
  'Clearer visual system and stronger brand expression.',
  'Successfully shipped and adopted by real users.',
];

export function ProjectDetail({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: ProjectDetailProps): ReactElement | null {
  const reduceMotion = usePrefersReducedMotion();

  // Body scroll lock
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isOpen) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = previous || '';
      };
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent): void => {
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!project) return null;

  const gallery =
    project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  const tags =
    project.tags && project.tags.length > 0
      ? project.tags
      : [project.category, project.year].filter(Boolean);

  const results =
    project.results && project.results.length > 0 ? project.results : FALLBACK_RESULTS;

  const titleId = 'project-detail-title';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            aria-hidden="true"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: 'rgba(39, 37, 31, 0.95)',
              backdropFilter: 'blur(10px)',
            }}
          />

          {/* Modal Content */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={reduceMotion ? undefined : { duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 py-8 md:px-8 md:py-12 lg:px-20">
              <motion.div
                initial={reduceMotion ? false : { y: 60, scale: 0.95, opacity: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { y: 0, scale: 1, opacity: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { y: 60, scale: 0.95, opacity: 0 }}
                transition={
                  reduceMotion ? undefined : { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
                }
                className="mx-auto max-w-7xl overflow-hidden rounded-3xl"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                {/* Header */}
                <div
                  className="sticky top-0 z-10 border-b px-6 py-6 md:px-12 md:py-8 backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(244, 250, 255, 0.95)',
                    borderColor: 'var(--line)',
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <motion.button
                      type="button"
                      aria-label="Close project detail"
                      onClick={onClose}
                      whileHover={reduceMotion ? undefined : { scale: 1.05, rotate: 90 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <X size={20} style={{ color: 'var(--ink)' }} />
                    </motion.button>

                    <div className="flex items-center gap-3">
                      {onPrev && (
                        <motion.button
                          type="button"
                          aria-label="View previous project"
                          onClick={onPrev}
                          whileHover={reduceMotion ? undefined : { scale: 1.05, x: -2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors"
                          style={{ borderColor: 'var(--line)' }}
                        >
                          <ArrowLeft size={20} style={{ color: 'var(--ink)' }} />
                        </motion.button>
                      )}
                      {onNext && (
                        <motion.button
                          type="button"
                          aria-label="View next project"
                          onClick={onNext}
                          whileHover={reduceMotion ? undefined : { scale: 1.05, x: 2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors"
                          style={{ borderColor: 'var(--line)' }}
                        >
                          <ArrowRight size={20} style={{ color: 'var(--ink)' }} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-8 md:px-12 md:py-12">
                  {/* Meta */}
                  <div className="mb-12 md:mb-20">
                    <div className="mb-6 flex items-center gap-4">
                      <div
                        className="h-[1px] w-12 md:w-16"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      <span
                        className="text-[9px] font-normal uppercase tracking-[0.12em] md:text-[10px] md:tracking-[0.12em]"
                        style={{ color: 'var(--muted)' }}
                      >
                        Case Study
                      </span>
                    </div>

                    <motion.h1
                      id={titleId}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.2 }}
                      className="type-display-2xl mb-8 tracking-[-0.02em] font-display"
                      style={{ color: 'var(--ink)' }}
                    >
                      {project.title}
                    </motion.h1>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.3 }}
                      className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8"
                    >
                      <div>
                        <div
                          className="mb-2 text-[10px] uppercase tracking-[0.12em]"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Client
                        </div>
                        <div
                          className="text-lg md:text-xl font-medium"
                          style={{ color: 'var(--ink)' }}
                        >
                          {project.client}
                        </div>
                      </div>

                      <div>
                        <div
                          className="mb-2 text-[10px] uppercase tracking-[0.12em]"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Year
                        </div>
                        <div
                          className="text-lg md:text-xl font-medium"
                          style={{ color: 'var(--ink)' }}
                        >
                          {project.year}
                        </div>
                      </div>

                      <div>
                        <div
                          className="mb-2 text-[10px] uppercase tracking-[0.3em]"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Category
                        </div>
                        <div
                          className="text-lg md:text-xl font-medium"
                          style={{ color: 'var(--ink)' }}
                        >
                          {project.category}
                        </div>
                      </div>

                      {project.link && (
                        <div>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={reduceMotion ? undefined : { scale: 1.02, y: -2 }}
                            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                            className="inline-flex items-center gap-2 rounded-2xl px-6 py-3"
                            style={{ backgroundColor: 'var(--accent)' }}
                          >
                            <span
                              className="text-xs uppercase tracking-[0.25em] font-semibold"
                              style={{ color: 'var(--color-text-inverse)' }}
                            >
                              Visit
                            </span>
                            <ExternalLink size={16} style={{ color: 'var(--color-text-inverse)' }} />
                          </motion.a>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.4 }}
                      className="flex flex-wrap gap-3"
                    >
                      {tags.map((tag, i) => (
                        <span
                          key={`${tag}-${i}`}
                          className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium"
                          style={{
                            backgroundColor: 'rgba(46,136,255,0.08)',
                            color: 'var(--accent)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Hero image */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduceMotion ? undefined : { delay: 0.5 }}
                    className="mb-12 md:mb-20"
                  >
                    <div className="aspect-video overflow-hidden rounded-3xl">
                      <ImageWithFallback
                        src={gallery[0]}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Four column narrative */}
                  <div className="mb-12 grid gap-12 md:mb-20 md:grid-cols-2 md:gap-16">
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.6 }}
                    >
                      <h3
                        className="mb-6 text-3xl tracking-[-0.01em] md:text-4xl font-display"
                        style={{ color: 'var(--ink)' }}
                      >
                        Overview
                      </h3>
                      <p
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.fullDescription ||
                          `${project.description} This project shows how I blend creativity with clear systems thinking, so the solution feels considered, practical, and easy to live with. Through careful planning and iterative design, I created an experience that resonates with users and supports measurable outcomes.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.7 }}
                    >
                      <h3
                        className="mb-6 text-3xl tracking-[-0.01em] md:text-4xl font-display"
                        style={{ color: 'var(--ink)' }}
                      >
                        The Challenge
                      </h3>
                      <p
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.challenge ||
                          `${project.client} needed a clear, cohesive experience that would stand out in a crowded space without losing the truth of their brand. The challenge was to create something that felt fresh and modern while staying honest to their constraints and core values.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.8 }}
                    >
                      <h3
                        className="mb-6 text-3xl tracking-[-0.01em] md:text-4xl font-display"
                        style={{ color: 'var(--ink)' }}
                      >
                        Solution
                      </h3>
                      <p
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.solution ||
                          `I approached the project with a user first mindset, using research and testing so every decision was grounded in real behavior. The final system brings structure to the experience, supports the brand story, and balances immediate needs with long term flexibility.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 0.9 }}
                    >
                      <h3
                        className="mb-6 text-3xl tracking-[-0.01em] md:text-4xl font-display"
                        style={{ color: 'var(--ink)' }}
                      >
                        Results
                      </h3>
                      <ul className="space-y-4">
                        {results.map((result, i) => (
                          <li key={`${result}-${i}`} className="flex items-start gap-3">
                            <div
                              className="mt-2 h-2 w-2 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: 'var(--accent)' }}
                            />
                            <span
                              className="text-lg leading-relaxed"
                              style={{ color: 'var(--muted)' }}
                            >
                              {result}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Gallery */}
                  {gallery.length > 1 && (
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: 1 }}
                      className="mb-12 md:mb-20"
                    >
                      <h3
                        className="mb-8 text-3xl tracking-[-0.01em] md:text-4xl font-display"
                        style={{ color: 'var(--ink)' }}
                      >
                        Project Gallery
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {gallery.slice(1).map((img, i) => (
                          <div
                            key={`${project.title}-gallery-${i}`}
                            className="aspect-[4/3] overflow-hidden rounded-2xl"
                          >
                            <ImageWithFallback
                              src={img}
                              alt={`${project.title} gallery ${i + 1}`}
                              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduceMotion ? undefined : { delay: 1.1 }}
                    className="py-12 text-center md:py-16"
                  >
                    <p
                      className="mb-8 text-xl md:text-2xl"
                      style={{ color: 'var(--muted)' }}
                    >
                      Interested in working together?
                    </p>
                    <motion.button
                      type="button"
                      whileHover={reduceMotion ? undefined : { scale: 1.05, y: -4 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                      className="rounded-2xl px-12 py-5"
                      style={{ backgroundColor: 'var(--accent)' }}
                      onClick={onClose}
                    >
                      <span
                        className="text-xs uppercase tracking-[0.25em] font-semibold"
                        style={{ color: 'var(--color-text-inverse)' }}
                      >
                        Get In Touch
                      </span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectDetail;
