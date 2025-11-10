/**
 * WorkSection — React Router Integration Pattern
 * Example: Replace <a> tags with React Router <Link> for client-side navigation
 */

import { Link, useNavigate } from 'react-router-dom';
import { WorkSection, type Project } from './components/WorkSection';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// ============================================================================
// Option 1: Use onClick handler with useNavigate
// ============================================================================
export function WorkSectionWithRouter() {
  const navigate = useNavigate();
  
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'My Project',
      image: '/img/project.jpg',
      category: 'Web App',
      client: 'Personal',
      href: '/work/project-1',
      onClick: () => navigate('/work/project-1'),
    },
  ];

  return <WorkSection projects={projects} ImageWithFallback={ImageWithFallback} />;
}

// ============================================================================
// Option 2: Custom WorkSection variant with React Router Link
// ============================================================================
// Copy WorkSection.tsx and replace the <a> tag at line ~135 with:
// 
// <Link
//   to={p.href!}
//   onClick={(e) => {
//     if (p.onClick) {
//       e.preventDefault();
//       p.onClick(p);
//     }
//   }}
//   className="grid grid-cols-12 gap-x-4 md:gap-x-6 items-center border-b py-6 md:py-8 group"
//   style={{
//     borderColor: 'var(--warm-tan)',
//     color: 'var(--primary)',
//     textDecoration: 'none',
//   }}
// >
//   {/* ...rest of row content */}
// </Link>

// ============================================================================
// Option 3: Mix internal (React Router) + external (native <a>) links
// ============================================================================
export function WorkSectionMixedLinks() {
  const navigate = useNavigate();

  const projects: Project[] = [
    // Internal route (React Router)
    {
      id: 'internal-project',
      title: 'Internal Project',
      image: '/img/internal.jpg',
      category: 'Web App',
      client: 'Personal',
      href: '/work/internal-project',
      onClick: () => navigate('/work/internal-project'),
    },
    // External link (native <a> with target="_blank")
    {
      id: 'github-repo',
      title: 'GitHub Repository',
      image: '/img/github.jpg',
      category: 'Open Source',
      client: 'OSS',
      href: 'https://github.com/you/repo',
      // No onClick → WorkSection will use native <a> tag
    },
  ];

  return <WorkSection projects={projects} ImageWithFallback={ImageWithFallback} />;
}

// ============================================================================
// Option 4: Conditional routing logic in onClick
// ============================================================================
export function WorkSectionConditionalRouting() {
  const navigate = useNavigate();

  const handleProjectOpen = (project: Project) => {
    // External links: open in new tab
    if (project.href?.startsWith('http')) {
      window.open(project.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // Internal links: use React Router
    if (project.href) {
      navigate(project.href);
    }
  };

  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'Internal Project',
      image: '/img/project.jpg',
      category: 'Web App',
      client: 'Personal',
      href: '/work/project-1',
    },
    {
      id: 'project-2',
      title: 'External Resource',
      image: '/img/external.jpg',
      category: 'Reference',
      client: 'Public',
      href: 'https://example.com',
    },
  ];

  return (
    <WorkSection
      projects={projects}
      onProjectOpen={handleProjectOpen}
      ImageWithFallback={ImageWithFallback}
    />
  );
}

export {};
