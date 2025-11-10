/**
 * WorkSection — Usage Examples
 * Copy-paste ready patterns for common use cases
 */

import { WorkSection, type Project } from "./components/WorkSection";

// Shared sample data
const base: Project[] = [
  {
    id: "sora-ui",
    title: "AI-Powered Educational Interfaces",
    image: "/img/sora.jpg",
    category: "AI/Design Systems",
    client: "Personal",
    href: "/work/sora-ui",
  },
  {
    id: "stamp",
    title: "Heritage Stamp System",
    image: "/img/stamp.jpg",
    category: "Brand Systems",
    client: "Self",
    href: "/work/stamp",
  },
  {
    id: "gallery",
    title: "Gallery Wall",
    image: "/img/wall.jpg",
    category: "UI/Interactions",
    client: "Personal",
    href: "/work/gallery",
  },
];

// Mock ImageWithFallback for examples
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

// ============================================================================
// 1) Minimal
// ============================================================================
export function ExampleMinimal() {
  return <WorkSection projects={base} ImageWithFallback={ImageWithFallback} />;
}

// ============================================================================
// 2) Initial filter
// ============================================================================
export function ExampleInitialFilter() {
  return (
    <WorkSection
      projects={base}
      initialFilter="UI/Interactions"
      ImageWithFallback={ImageWithFallback}
    />
  );
}

// ============================================================================
// 3) Custom filter order
// ============================================================================
export function ExampleCustomFilters() {
  return (
    <WorkSection
      projects={base}
      filters={["AI/Design Systems", "UI/Interactions", "Brand Systems"]}
      ImageWithFallback={ImageWithFallback}
    />
  );
}

// ============================================================================
// 4) Custom open handler (analytics hook or modal)
// ============================================================================
export function ExampleOnOpen() {
  return (
    <WorkSection
      projects={base.map((p) => ({ ...p, href: undefined }))}
      onProjectOpen={(p) => {
        console.log("Open", p.id);
        // route, modal, or analytics here
      }}
      ImageWithFallback={ImageWithFallback}
    />
  );
}

// ============================================================================
// 5) React Router integration
// ============================================================================
import { useNavigate } from "react-router-dom";

export function ExampleReactRouter() {
  const nav = useNavigate();
  return (
    <WorkSection
      projects={base.map((p) => ({ ...p, onClick: () => nav(p.href!) }))}
      ImageWithFallback={ImageWithFallback}
    />
  );
}

// ============================================================================
// 6) External links mixed with internal
// ============================================================================
export function ExampleMixedLinks() {
  const mix: Project[] = [
    ...base,
    {
      id: "github",
      title: "Open Source Kit",
      image: "/img/kit.jpg",
      category: "UI/Interactions",
      client: "OSS",
      href: "https://github.com/you/kit",
    },
  ];
  return <WorkSection projects={mix} ImageWithFallback={ImageWithFallback} />;
}

// ============================================================================
// 7) API-loaded projects with skeleton
// ============================================================================
import { useEffect, useState } from "react";

export function ExampleApiLoad() {
  const [data, setData] = useState<Project[] | null>(null);
  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then(setData);
  }, []);
  if (!data)
    return (
      <div className="p-16" style={{ color: "var(--warm-stone)" }}>
        Loading projects…
      </div>
    );
  return <WorkSection projects={data} ImageWithFallback={ImageWithFallback} />;
}

// ============================================================================
// 8) Dark mode container
// ============================================================================
export function ExampleDark() {
  return (
    <div data-theme="dark">
      <WorkSection projects={base} ImageWithFallback={ImageWithFallback} />
    </div>
  );
}

// ============================================================================
// 9) Custom ImageWithFallback shim (blur-up)
// ============================================================================
export function ExampleCustomImage() {
  const Img = (p: { src: string; alt: string; className?: string }) => (
    <img loading="lazy" {...p} />
  );
  return <WorkSection projects={base} ImageWithFallback={Img} />;
}

// ============================================================================
// 10) Page integration with hero slot above
// ============================================================================
export function ExamplePage() {
  return (
    <>
      <section
        className="px-8 md:px-16 py-20"
        style={{ backgroundColor: "var(--warm-lightest)" }}
      >
        <h1 className="text-7xl tracking-tighter" style={{ color: "var(--primary)" }}>
          Work
        </h1>
        <p className="mt-4 max-w-xl" style={{ color: "var(--warm-stone)" }}>
          Selected projects in AI interfaces, brand systems, and interaction design.
        </p>
      </section>
      <WorkSection projects={base} ImageWithFallback={ImageWithFallback} />
    </>
  );
}

// ============================================================================
// Example 1: Basic Usage with Static Data
// ============================================================================

const basicProjects: Project[] = [
  {
    id: "sora-ui",
    title: "AI-Powered Educational Interfaces",
    image: "/images/work/sora-ui.jpg",
    category: "AI/Design Systems",
    client: "Personal",
    href: "/work/sora-ui"
  },
  {
    id: "chrome-cameo",
    title: "Chrome Cameo Browser Extension",
    image: "/images/work/chrome-cameo.png",
    category: "Browser Extensions",
    client: "Freelance",
    href: "/work/chrome-cameo"
  },
  {
    id: "pizza-man",
    title: "Pizza Man Game Prototype",
    image: "/images/work/pizza-man.png",
    category: "Game Design",
    client: "Personal",
    href: "/work/pizza-man"
  }
];

export function BasicExample() {
  return <WorkSection projects={basicProjects} />;
}

// ============================================================================
// Example 2: With React Router Navigation
// ============================================================================

import { useNavigate } from 'react-router-dom';

export function RouterExample() {
  const navigate = useNavigate();

  return (
    <WorkSection
      projects={basicProjects}
      onProjectOpen={(project) => navigate(`/work/${project.id}`)}
      initialFilter="All"
    />
  );
}

// ============================================================================
// Example 3: With Custom Filter Order
// ============================================================================

const orderedProjects: Project[] = [
  ...basicProjects,
  {
    id: "green-project",
    title: "Green Initiative Dashboard",
    image: "/images/work/green-project.png",
    category: "Web Apps",
    client: "Sustainability Co",
    href: "/work/green-project"
  }
];

export function CustomFilterExample() {
  return (
    <WorkSection
      projects={orderedProjects}
      filters={["All", "AI/Design Systems", "Web Apps", "Browser Extensions", "Game Design"]}
      initialFilter="AI/Design Systems"
    />
  );
}

// ============================================================================
// Example 4: With Custom Image Component
// ============================================================================

import { useState } from 'react';

function ImageWithFallback({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ backgroundColor: 'var(--warm-medium)' }}
      >
        <span style={{ color: 'var(--warm-stone)' }}>Image unavailable</span>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <div 
          className={`${className} animate-pulse`}
          style={{ backgroundColor: 'var(--warm-medium)' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => setError(true)}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </>
  );
}

export function CustomImageExample() {
  return (
    <WorkSection
      projects={basicProjects}
      ImageWithFallback={ImageWithFallback}
    />
  );
}

// ============================================================================
// Example 5: With Custom Click Handlers
// ============================================================================

export function CustomClickExample() {
  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project);
    
    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'project_click', {
        project_id: project.id,
        project_title: project.title,
        project_category: project.category
      });
    }
    
    // Navigate with custom logic
    if (project.category === "External") {
      window.open(project.href, '_blank');
    } else {
      window.location.href = project.href || '#';
    }
  };

  const projectsWithHandlers: Project[] = basicProjects.map(p => ({
    ...p,
    onClick: () => handleProjectClick(p)
  }));

  return <WorkSection projects={projectsWithHandlers} />;
}

// ============================================================================
// Example 6: With API Data Loading
// ============================================================================

import { useEffect, useState } from 'react';

export function APIExample() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const mapped: Project[] = data.map((item: any) => ({
          id: item.slug,
          title: item.title,
          image: item.thumbnail_url,
          category: item.category_name,
          client: item.client_name,
          href: `/work/${item.slug}`
        }));
        setProjects(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return <WorkSection projects={projects} />;
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen px-8 md:px-16 py-24" style={{ backgroundColor: 'var(--warm-lightest)' }}>
      <div className="max-w-[1800px] mx-auto">
        <div className="h-24 w-64 mb-12 rounded animate-pulse" style={{ backgroundColor: 'var(--warm-medium)' }} />
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 rounded animate-pulse" style={{ backgroundColor: 'var(--warm-medium)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--warm-lightest)' }}>
      <div className="text-center">
        <h2 className="text-2xl mb-4" style={{ color: 'var(--danger)' }}>Error Loading Projects</h2>
        <p style={{ color: 'var(--warm-stone)' }}>{message}</p>
      </div>
    </div>
  );
}

// ============================================================================
// Example 7: With URL Query Param Sync
// ============================================================================

import { useSearchParams } from 'react-router-dom';

export function URLSyncExample() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('category') || 'All';

  const handleFilterChange = (filter: string) => {
    if (filter === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', filter);
    }
    setSearchParams(searchParams);
  };

  // Note: This would require extending WorkSection to accept onFilterChange
  // For now, use initialFilter to read from URL
  return (
    <WorkSection
      projects={basicProjects}
      initialFilter={activeFilter}
    />
  );
}

// ============================================================================
// Example 8: Full App Integration
// ============================================================================

export function FullAppExample() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <main>
      <WorkSection
        projects={basicProjects}
        initialFilter={searchParams.get('category') || 'All'}
        onProjectOpen={(project) => {
          // Track event
          console.log('Opening project:', project.id);
          
          // Navigate
          navigate(`/work/${project.id}`);
        }}
        ImageWithFallback={ImageWithFallback}
      />
    </main>
  );
}

// ============================================================================
// Example 9: With Featured Projects First
// ============================================================================

const featuredProjects: Project[] = [
  {
    id: "featured-1",
    title: "Featured: AI Design System",
    image: "/images/featured/ai-system.jpg",
    category: "Featured",
    client: "Major Corp",
    href: "/work/ai-system"
  },
  ...basicProjects
];

export function FeaturedExample() {
  return (
    <WorkSection
      projects={featuredProjects}
      filters={["All", "Featured", "AI/Design Systems", "Browser Extensions", "Game Design"]}
      initialFilter="Featured"
    />
  );
}

// ============================================================================
// Example 10: Minimal Configuration
// ============================================================================

export function MinimalExample() {
  // Just projects array - everything else is optional
  return <WorkSection projects={basicProjects} />;
}

// ============================================================================
// TypeScript Type Exports for Convenience
// ============================================================================

export type { Project } from './components/WorkSection';

// ============================================================================
// Utility: Transform CMS Data to Project Format
// ============================================================================

export function transformCMSProjects(cmsData: any[]): Project[] {
  return cmsData.map(item => ({
    id: item.id || item.slug,
    title: item.title || item.name,
    image: item.featured_image || item.thumbnail || '/placeholder.jpg',
    category: item.category || item.tags?.[0] || 'Uncategorized',
    client: item.client_name || item.company,
    href: item.url || `/work/${item.slug}`
  }));
}

// Usage with CMS:
// const cmsData = await fetchFromCMS();
// const projects = transformCMSProjects(cmsData);
// <WorkSection projects={projects} />
