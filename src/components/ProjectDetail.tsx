import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { X, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./common/media/ImageWithFallback";
import { useEffect } from "react";
import type React from "react";

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

export function ProjectDetail({ project, isOpen, onClose, onNext, onPrev }: ProjectDetailProps): React.JSX.Element | null {
  const reduce = usePrefersReducedMotion();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
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

  const defaultGallery = project.gallery || [project.image];
  const defaultTags = project.tags || [project.category, project.year];
  const defaultResults = project.results || [
    '300% increase in user engagement',
    'Award-winning design recognition',
    'Successfully launched in 3 months'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? undefined : { duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ 
              backgroundColor: 'rgba(39, 37, 31, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? undefined : { duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 md:px-8 lg:px-20 py-8 md:py-12">
              <motion.div
                initial={reduce ? undefined : { y: 60, scale: 0.95 }}
                animate={reduce ? undefined : { y: 0, scale: 1 }}
                exit={reduce ? undefined : { y: 60, scale: 0.95 }}
                transition={reduce ? undefined : { duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="max-w-7xl mx-auto rounded-3xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                <div className="sticky top-0 z-10 px-6 md:px-12 py-6 md:py-8 border-b backdrop-blur-md"
                  style={{ 
                    backgroundColor: 'rgba(244, 250, 255, 0.95)',
                    borderColor: 'var(--line)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.05, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <X size={20} style={{ color: 'var(--ink)' }} />
                    </motion.button>

                    <div className="flex items-center gap-3">
                      {onPrev && (
                        <motion.button
                          onClick={onPrev}
                          whileHover={{ scale: 1.05, x: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors"
                          style={{ borderColor: 'var(--line)' }}
                        >
                          <ArrowLeft size={20} style={{ color: 'var(--ink)' }} />
                        </motion.button>
                      )}
                      {onNext && (
                        <motion.button
                          onClick={onNext}
                          whileHover={{ scale: 1.05, x: 2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors"
                          style={{ borderColor: 'var(--line)' }}
                        >
                          <ArrowRight size={20} style={{ color: 'var(--ink)' }} />
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 md:px-12 py-8 md:py-12">
                  <div className="mb-12 md:mb-20">
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="w-12 md:w-16 h-[1px]"
                        style={{ backgroundColor: 'var(--accent)' }}
                      />
                      <span 
                        className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium"
                        style={{ color: 'var(--muted)' }}
                      >
                        Case Study
                      </span>
                    </div>

                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl md:text-8xl lg:text-9xl tracking-[-0.02em] mb-8"
                      style={{ color: 'var(--ink)', fontWeight: 600 }}
                    >
                      {project.title}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8"
                    >
                      <div>
                        <div 
                          className="text-[10px] tracking-[0.3em] uppercase mb-2"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Client
                        </div>
                        <div 
                          className="text-lg md:text-xl"
                          style={{ color: 'var(--ink)', fontWeight: 500 }}
                        >
                          {project.client}
                        </div>
                      </div>
                      <div>
                        <div 
                          className="text-[10px] tracking-[0.3em] uppercase mb-2"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Year
                        </div>
                        <div 
                          className="text-lg md:text-xl"
                          style={{ color: 'var(--ink)', fontWeight: 500 }}
                        >
                          {project.year}
                        </div>
                      </div>
                      <div>
                        <div 
                          className="text-[10px] tracking-[0.3em] uppercase mb-2"
                          style={{ color: 'var(--muted)', opacity: 0.6 }}
                        >
                          Category
                        </div>
                        <div 
                          className="text-lg md:text-xl"
                          style={{ color: 'var(--ink)', fontWeight: 500 }}
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
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl"
                            style={{ backgroundColor: 'var(--accent)' }}
                          >
                            <span 
                              className="text-xs tracking-[0.25em] uppercase"
                              style={{ color: 'white', fontWeight: 600 }}
                            >
                              Visit
                            </span>
                            <ExternalLink size={16} style={{ color: 'white' }} />
                          </motion.a>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-3"
                    >
                      {defaultTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 rounded-full text-xs tracking-[0.2em] uppercase"
                          style={{ 
                            backgroundColor: 'rgba(255, 66, 0, 0.1)',
                            color: 'var(--accent)',
                            fontWeight: 500
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-12 md:mb-20"
                  >
                    <div className="aspect-video rounded-3xl overflow-hidden">
                      <ImageWithFallback
                        src={defaultGallery[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-12 md:mb-20">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 
                        className="text-3xl md:text-4xl mb-6 tracking-[-0.01em]"
                        style={{ color: 'var(--ink)', fontWeight: 600 }}
                      >
                        Overview
                      </h3>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.fullDescription || `${project.description}. This project showcased our ability to blend creativity with strategic thinking, delivering a solution that not only met the client's needs but exceeded their expectations. Through careful planning and innovative design, we created an experience that resonates with users and drives meaningful engagement.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <h3 
                        className="text-3xl md:text-4xl mb-6 tracking-[-0.01em]"
                        style={{ color: 'var(--ink)', fontWeight: 600 }}
                      >
                        The Challenge
                      </h3>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.challenge || `${project.client} needed a comprehensive solution that would help them stand out in a competitive market. The challenge was to create something that felt fresh and innovative while remaining true to their brand identity and core values.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h3 
                        className="text-3xl md:text-4xl mb-6 tracking-[-0.01em]"
                        style={{ color: 'var(--ink)', fontWeight: 600 }}
                      >
                        Our Solution
                      </h3>
                      <p 
                        className="text-lg leading-relaxed"
                        style={{ color: 'var(--muted)' }}
                      >
                        {project.solution || `We approached this project with a user-first mindset, conducting extensive research and testing to ensure every decision was informed by real data. Our team developed a comprehensive strategy that addressed both immediate needs and long-term goals.`}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <h3 
                        className="text-3xl md:text-4xl mb-6 tracking-[-0.01em]"
                        style={{ color: 'var(--ink)', fontWeight: 600 }}
                      >
                        Results
                      </h3>
                      <ul className="space-y-4">
                        {defaultResults.map((result, i) => (
                          <li 
                            key={i}
                            className="flex items-start gap-3"
                          >
                            <div 
                              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
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

                  {defaultGallery.length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="mb-12 md:mb-20"
                    >
                      <h3 
                        className="text-3xl md:text-4xl mb-8 tracking-[-0.01em]"
                        style={{ color: 'var(--ink)', fontWeight: 600 }}
                      >
                        Project Gallery
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {defaultGallery.slice(1).map((img, i) => (
                          <div 
                            key={i}
                            className="aspect-[4/3] rounded-2xl overflow-hidden"
                          >
                            <ImageWithFallback
                              src={img}
                              alt={`${project.title} gallery ${i + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-center py-12 md:py-16"
                  >
                    <p 
                      className="text-xl md:text-2xl mb-8"
                      style={{ color: 'var(--muted)' }}
                    >
                      Interested in working together?
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-12 py-5 rounded-2xl"
                      style={{ backgroundColor: 'var(--accent)' }}
                      onClick={onClose}
                    >
                      <span 
                        className="text-xs tracking-[0.25em] uppercase"
                        style={{ color: 'white', fontWeight: 600 }}
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
