import React, { useMemo, useState } from 'react';
/* eslint-disable no-unused-vars -- Some type-only parameter names (project/index) are used for clarity in callback types */
import type { JSX } from 'react';
// (ImageWithFallback used in other components; not required here)
import { ProjectCard } from './ProjectCard';

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

// WorkSection uses a simpler grid layout; removed motion helpers here.

// Filter Button Component

// Project Card Component
// We no longer use the old ProjectCard row here. The single-column ProjectCard
// used for project reels is implemented in `src/components/ProjectCard.tsx`.

// MetaField Component
// (FilterButton and MetaField removed; WorkSection now uses simpler layout buttons and ProjectCard)

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

  const rows = filteredProjects;

  return (
    <section aria-labelledby="work-heading">
      {/* Header: title + filters */}
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="text-xs font-mono tracking-[0.18em] uppercase text-muted/70">Selected work</p>
          <h2
            id="work-heading"
            className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-default"
          >
            Projects
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={
                  [
                    'rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors',
                    isActive
                      ? 'bg-pill text-inverse border-transparent'
                      : 'bg-surface text-muted border-border hover:text-default',
                  ].join(' ')
                }
                aria-pressed={isActive}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </header>

      {/* Rows */}
      <div className="space-y-12 lg:space-y-16">
        {rows.map((project, index) => (
          <article
            key={project.id}
            className="
              grid gap-y-8 gap-x-10
              md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.8fr)_minmax(0,1fr)]
              md:items-start
            "
          >
            {/* Left column: index + role */}
            <div className="text-xs sm:text-sm leading-relaxed text-muted">
              <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-muted/90">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-2 text-[13px] sm:text-sm font-medium text-default">{project.role ?? 'Design system'}</p>
              {project.year && <p className="mt-1 text-muted/80">{project.year}</p>}
            </div>

            {/* Middle column: the card */}
            <div className="max-w-[580px] w-full mx-auto">
              <ProjectCard
                id={project.id}
                title={project.title}
                category={project.category}
                year={project.year}
                role={project.role}
                description={project.description}
                previewImage={project.image}
              />
            </div>

            {/* Right column: tags + CTA */}
            <div className="flex flex-col items-start gap-3 text-sm md:items-end">
              <div className="flex flex-wrap gap-2 md:justify-end">
                {(project.tags ?? []).map((tag) => (
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
                onClick={() => onProjectClick?.(project, index)}
                data-testid={`case-study-${project.id}`}
                className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted hover:text-default"
              >
                View case study
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border">
                  <span className="block h-[3px] w-[10px] rounded-full bg-muted" />
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
