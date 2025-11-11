/**
 * Data Adapter — Map existing project data → WorkSection.Project
 * Bridges GALLERY_PROJECTS shape to WorkSection component contract
 */

import type { Project as WSProject } from '../components/WorkSection';

// Local GalleryProject type — avoids importing from removed ProjectGallery component
type GalleryProject = {
  id: string;
  title: string;
  tag?: string;
  href: string;
  cover: string;
  alt?: string;
  ratio?: '4:5' | '16:9' | '1:1';
  year?: string;
  description?: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  tags?: string[];
  link?: string;
};

/**
 * Convert legacy gallery project to WorkSection-compatible format
 * @param p - Gallery project with id, title, cover, tag, href
 * @returns WorkSection.Project with category-based filtering
 */
export function toWorkSectionProject(p: GalleryProject): WSProject {
  const category = p.tag ?? 'Uncategorized';
  return {
    id: p.id,
    title: p.title,
    image: p.cover,
    category,
    year: p.year ?? '2025',
    client: extractClient(p.tag ?? ''),
    description: p.description ?? p.alt ?? '',
    fullDescription: p.fullDescription,
    challenge: p.challenge,
    solution: p.solution,
    results: p.results,
    tags: p.tags,
    link: p.link,
  };
}

/**
 * Extract client/type metadata from tag
 * Maps legacy tags to client labels for WorkSection display
 */
function extractClient(tag?: string): string {
  const clientMap: Record<string, string> = {
    'Design Portfolio': 'Personal',
    'Web App': 'Product',
    'E-commerce': 'Commercial',
    'Icon System': 'Design System',
    'AI Tooling': 'Product',
  };
  if (!tag) return 'Personal';
  return clientMap[tag] ?? 'Personal';
}

/**
 * Batch convert array of gallery projects
 * @param projects - Array of gallery projects
 * @returns Array of WorkSection-compatible projects
 */
export function adaptGalleryProjects(projects: GalleryProject[]): WSProject[] {
  return projects.map(toWorkSectionProject);
}
