import React, { useMemo, useState } from 'react';
/* eslint-disable no-unused-vars -- Some type-only parameter names (project/index) are used for clarity in callback types */
import type { JSX } from 'react';
import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ImageWithFallback } from './common/media/ImageWithFallback';

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
  role?: string;
};

type Props = {
  projects: Project[];
  initialFilter?: string;
  onProjectClick?: (project: Project, index: number) => void;
  filters?: string[];
};

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

// Filter Button Component
function FilterButton({
  filter,
  isActive,
  index,
  onClick,
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
      transition={
        reduce
          ? undefined
          : { delay: index * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }
      }
      viewport={{ once: true }}
      onClick={onClick}
      aria-pressed={isActive}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative px-6 md:px-10 py-3 md:py-4 overflow-hidden transition-all duration-500 group rounded-[16px] md:rounded-[20px]"
      style={{
        /* Make inactive filter buttons match the page surface so they blend in */
        backgroundColor: isActive ? 'var(--accent)' : 'var(--surface)',
        color: isActive ? 'var(--bg)' : 'var(--ink)',
        border: `1px solid ${isActive ? 'var(--accent)' : 'var(--line)'}`,
        /* subtle inner shadow on inactive buttons for a touch of affordance */
        boxShadow: isActive
          ? 'none'
          : 'inset 0 1px 0 rgba(0,0,0,0.06), inset 0 -1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <span className="relative z-10 text-[10px] md:text-xs tracking-[0.12em] uppercase font-normal">
        {filter}
      </span>
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
// We no longer use the old ProjectCard row here. The single-column ProjectCard
// used for project reels is implemented in `src/components/ProjectCard.tsx`.

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
      <div className="text-base font-medium" style={{ color: 'var(--ink)' }}>
        {value}
      </div>
    </div>
  );
}

export function WorkSection({
  projects,
  initialFilter = 'All',
  onProjectClick,
  filters,
}: Props): JSX.Element {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const FILTERS = useMemo(() => {
    if (filters) return ['All', ...filters];
    const cats = Array.from(new Set(projects.map((p: Project) => p.category))).sort();
    return ['All', ...cats];
  }, [projects, filters]);

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((p: Project) => p.category === activeFilter),
    [projects, activeFilter]
  );

  const handleProjectClick = (project: Project, index: number): void => {
    onProjectClick?.(project, index);
  };

  return (
    <div className="relative" style={{ color: 'var(--text)' }} aria-labelledby="work-heading">
      <div
        className="pointer-events-none absolute inset-x-0 -top-8 h-8"
        style={{
          background:
            'linear-gradient(180deg, transparent, color-mix(in oklab, var(--color-neutral-0) 6%, transparent))',
        }}
      />

  <div>
        {/* Header Section */}
        <header className="mb-16 md:mb-24 relative overflow-visible">
          <motion.div
            initial={usePrefersReducedMotion() ? undefined : { opacity: 0, y: 40 }}
            whileInView={usePrefersReducedMotion() ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={
              usePrefersReducedMotion()
                ? undefined
                : { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
            }
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 md:w-16 h-[1px]"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span
                className="text-[9px] md:text-[10px] tracking-[0.12em] md:tracking-[0.12em] uppercase font-normal"
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
            transition={
              usePrefersReducedMotion()
                ? undefined
                : { duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }
            }
            className="type-display-xl tracking-[-0.02em] mb-12 md:mb-16 font-display"
            style={{ color: 'var(--ink)' }}
          >
            Projects
          </motion.h2>

          {/* Perforated decorative rail beneath the projects header */}
          <div
            aria-hidden="true"
            className="perforated-rail absolute left-0 right-0 -bottom-6 md:-bottom-8"
          />

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

        <motion.div layout className="space-y-14">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id || project.title}
              className={`grid gap-8 items-center md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_minmax(0,1.1fr)]`}
            >
              {/* Left column: index/role/year */}
              <div className="text-sm text-muted leading-relaxed">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted/80">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="mt-2 font-medium text-default">{project.role}</p>
                {project.year && (
                  <p className="mt-1 text-muted/70">{project.year}</p>
                )}
              </div>

              {/* Middle column: image + title */}
              <div className="max-w-[640px] mx-auto w-full">
                {/* metadata for mobile (category/client) */}
                <div className="md:hidden mt-4 grid grid-cols-2 gap-4">
                  <MetaField label="Category" value={project.category} />
                  <MetaField label="Client" value={project.client} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <h3 className="type-heading-l mb-4 font-display" style={{ color: 'var(--ink)' }}>
                    {project.title}
                  </h3>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Right column: tags + CTA */}
              <div className="flex flex-col items-start md:items-end gap-3 text-sm">
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  data-testid={`case-study-${project.id}`}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] uppercase text-muted hover:text-default"
                  onClick={() => handleProjectClick(project, index)}
                >
                  View case study
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-border">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div
            className="py-20 text-center text-xl md:text-2xl"
            style={{ color: 'var(--muted)' }}
            role="status"
          >
            No projects found. Try another filter.
          </div>
        )}
      </div>
  </div>
  );
}
