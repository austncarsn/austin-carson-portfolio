import React, { useMemo, useState } from "react";
/* eslint-disable no-unused-vars -- Some type-only parameter names (project/index) are used for clarity in callback types */
import type { JSX } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ImageWithFallback } from "./common/media/ImageWithFallback";

export type Project = {
  id: string;
  title: string;
  image: string;
  category: string;
  year: string;
  client: string;
  description: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  gallery?: string[];
  tags?: string[];
  link?: string;
};

type Props = {
  projects: Project[];
  initialFilter?: string;
  onProjectClick?: (project: Project, index: number) => void;
  filters?: string[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
};

// Filter Button Component
function FilterButton({ 
  filter, 
  isActive, 
  index, 
  onClick 
}: { 
  filter: string; 
  isActive: boolean; 
  index: number; 
  onClick: () => void;
}): JSX.Element {
  const reduce = usePrefersReducedMotion();

  return (
    <motion.button
      initial={reduce ? undefined : fadeInUp.initial}
      whileInView={reduce ? undefined : fadeInUp.animate}
      transition={reduce ? undefined : { delay: index * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true }}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative px-6 md:px-10 py-3 md:py-4 overflow-hidden transition-all duration-500 group rounded-[16px] md:rounded-[20px]"
      style={{
        backgroundColor: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'var(--bg)' : 'var(--ink)',
        border: `1px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`
      }}
    >
      <span className="relative z-10 text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">{filter}</span>
      {!isActive && (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--accent)', opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}

// Project Card Component
function ProjectCard({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number; 
  onClick?: (_project: Project, _index: number) => void;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick?.(project, index)}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start md:items-center py-8 md:py-12 border-b cursor-pointer group"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Index Number */}
      <div className="hidden md:block md:col-span-1">
        <motion.span 
          className="text-3xl md:text-4xl tabular-nums"
          style={{ 
            color: 'var(--muted)', 
            opacity: isHovered ? 1 : 0.4,
            fontWeight: 300
          }}
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Project Title - First on mobile */}
      <div className="col-span-1 md:col-span-3 order-1 md:order-none">
        <motion.h3 
          className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.02em] mb-2 leading-[0.95]"
          style={{ 
            color: 'var(--ink)',
            fontWeight: 600
          }}
          animate={{ 
            x: isHovered ? 8 : 0,
            color: isHovered ? 'var(--accent)' : 'var(--ink)'
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          {project.title}
        </motion.h3>
        {/* Show metadata on mobile */}
        <div className="md:hidden mt-4 grid grid-cols-2 gap-4">
          <MetaField label="Category" value={project.category} />
          <MetaField label="Client" value={project.client} />
        </div>
      </div>

      {/* Project Image */}
      <div className="col-span-1 md:col-span-4 order-2 md:order-none">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-[20px]">
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Overlay with description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(255, 66, 0, 0.95)' }}
          >
            <span 
              className="text-xs md:text-sm tracking-[0.25em] uppercase text-center leading-relaxed"
              style={{ color: 'var(--bg)', fontWeight: 600 }}
            >
              {project.description}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Metadata - Hidden on mobile, shown in title section */}
      <div className="hidden md:grid col-span-3 grid-cols-2 gap-6">
        <MetaField label="Category" value={project.category} />
        <MetaField label="Client" value={project.client} />
      </div>

      {/* Arrow Indicator */}
      <div className="hidden md:flex col-span-1 justify-end">
        <motion.div
          animate={{ 
            x: isHovered ? 4 : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="w-14 h-14 rounded-full border flex items-center justify-center"
          style={{ borderColor: isHovered ? 'var(--accent)' : 'var(--line)' }}
        >
          <motion.span 
            className="text-xl"
            style={{ color: isHovered ? 'var(--accent)' : 'var(--muted)' }}
            animate={{ color: isHovered ? 'var(--accent)' : 'var(--muted)' }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// MetaField Component
function MetaField({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <div 
        className="text-[10px] tracking-[0.3em] uppercase mb-2 font-medium"
        style={{ color: 'var(--muted)', opacity: 0.6 }}
      >
        {label}
      </div>
      <div 
        className="text-base"
        style={{ color: 'var(--ink)', fontWeight: 500 }}
      >
        {value}
      </div>
    </div>
  );
}

export function WorkSection({
  projects,
  initialFilter = "All",
  onProjectClick,
  filters,
}: Props): JSX.Element {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }
    const el = sectionRef.current;
    if (!el || typeof window === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            obs.disconnect();
          }
        });
      },
      { root: null, threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReduced]);

  const FILTERS = useMemo(() => {
    if (filters) return ["All", ...filters];
    const cats = Array.from(new Set(projects.map((p: Project) => p.category))).sort();
    return ["All", ...cats];
  }, [projects, filters]);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p: Project) => p.category === activeFilter),
    [projects, activeFilter]
  );

  const handleProjectClick = (project: Project, index: number): void => {
    onProjectClick?.(project, index);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative min-h-screen px-8 md:px-16 py-24 projects-section ${isVisible ? 'is-visible' : ''}`}
      style={{ background: "var(--surface)", color: "var(--text)" }}
      aria-labelledby="work-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-8 h-8"
        style={{ background: 'linear-gradient(180deg, transparent, color-mix(in oklab, white 6%, transparent))' }}
      />
      
      <div className="max-w-[1800px] mx-auto">
  {/* Header Section */}
  <header className="mb-16 md:mb-24 relative overflow-visible">
          <motion.div
            initial={usePrefersReducedMotion() ? undefined : { opacity: 0, y: 40 }}
            whileInView={usePrefersReducedMotion() ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={usePrefersReducedMotion() ? undefined : { duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="w-12 md:w-16 h-[1px]"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span 
                className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium"
                style={{ color: 'var(--muted)' }}
              >
                Selected Work
              </span>
            </div>
          </motion.div>

          <motion.h2
            id="work-heading"
            initial={usePrefersReducedMotion() ? undefined : { opacity: 0, y: 40 }}
            whileInView={usePrefersReducedMotion() ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={usePrefersReducedMotion() ? undefined : { duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl tracking-[-0.02em] mb-12 md:mb-16"
            style={{ color: 'var(--ink)', fontWeight: 600 }}
          >
            Projects
          </motion.h2>

          {/* Perforated decorative rail beneath the projects header */}
          <div aria-hidden="true" className="perforated-rail absolute left-0 right-0 -bottom-6 md:-bottom-8" />

          <nav className="flex flex-wrap gap-3 md:gap-4" aria-label="Project filters">
            {FILTERS.map((filter, i) => (
              <FilterButton
                key={filter}
                filter={filter}
                isActive={activeFilter === filter}
                index={i}
                onClick={() => setActiveFilter(filter)}
              />
            ))}
          </nav>
        </header>

        <motion.div layout className="space-y-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              index={index}
              onClick={handleProjectClick}
            />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div 
            className="py-20 text-center text-xl md:text-2xl" 
            style={{ color: "var(--muted)" }}
            role="status"
          >
            No projects found. Try another filter.
          </div>
        )}
      </div>
    </section>
  );
}
