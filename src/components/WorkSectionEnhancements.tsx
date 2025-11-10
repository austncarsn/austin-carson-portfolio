/**
 * WorkSection — Optional Enhancements
 * Production-ready upgrades for search, sort, analytics, SEO
 */

import { useState, useMemo } from 'react';
import type { Project } from './WorkSection';

// ============================================================================
// 1) Search Filter
// ============================================================================
export function useProjectSearch(projects: Project[], activeFilter: string) {
  const [query, setQuery] = useState('');

  const visible = useMemo(
    () =>
      projects
        .filter((p) => activeFilter === 'All' || p.category === activeFilter)
        .filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [projects, activeFilter, query]
  );

  return { query, setQuery, visible };
}

// ============================================================================
// 2) Sort Control
// ============================================================================
export type SortMode = 'Recent' | 'A–Z';

export function sortProjects(projects: Project[], mode: SortMode): Project[] {
  if (mode === 'A–Z') {
    return [...projects].sort((a, b) => a.title.localeCompare(b.title));
  }
  // "Recent" assumes projects are already in chronological order
  return projects;
}

// ============================================================================
// 3) Analytics Hook (integrate with your tracker)
// ============================================================================
export function trackProjectOpen(project: Project) {
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'work_open', {
      project_id: project.id,
      category: project.category,
      client: project.client,
    });
  }

  // Example: Plausible
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('Project View', {
      props: { id: project.id, category: project.category },
    });
  }

  console.log('[Analytics] Project opened:', project.id);
}

// ============================================================================
// 4) SEO Microdata Component
// ============================================================================
interface MicrodataProjectProps {
  project: Project;
  children: React.ReactNode;
}

export function MicrodataProject({ project, children }: MicrodataProjectProps) {
  return (
    <li itemScope itemType="https://schema.org/CreativeWork">
      <meta itemProp="name" content={project.title} />
      <meta itemProp="genre" content={project.category} />
      {project.image && <meta itemProp="image" content={project.image} />}
      {project.client && <meta itemProp="creator" content={project.client} />}
      {children}
    </li>
  );
}

// ============================================================================
// 5) Loading Skeleton
// ============================================================================
export function WorkSectionSkeleton() {
  return (
    <div className="px-8 md:px-16 py-24" style={{ color: 'var(--warm-stone)' }}>
      <div className="flex gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 w-24 rounded animate-pulse"
            style={{ backgroundColor: 'var(--warm-medium)' }}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded animate-pulse"
            style={{ backgroundColor: 'var(--warm-medium)' }}
          />
        ))}
      </div>
    </div>
  );
}
