import { useParams, Link } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PROJECTS, type ProjectId, type Project, type CaseStudy } from "../components/Projects";
import React from "react";

/* --------------------------- Utilities ------------------------------ */

function isExternal(url: string | undefined): boolean {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

/* --------------------------- Subcomponents -------------------------- */

function TechPill({ label }: { label: string }): React.JSX.Element {
  return (
    <span className="font-plex text-sm text-text-primary bg-surface border border-structure rounded-md px-4 py-2 transition-colors duration-200 hover:border-brand">
      {label}
    </span>
  );
}

function CtaLink({
  href,
  children,
  variant = "primary",
  icon,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
}): React.JSX.Element | null {
  if (!isExternal(href)) return null;
  
  const baseClasses = "inline-flex items-center gap-3 font-plex font-medium text-[15px] px-6 py-3 rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50";
  const variantClasses = variant === "primary"
    ? "bg-brand text-white hover:opacity-90"
    : "bg-surface border border-structure text-text-primary hover:border-brand hover:text-brand";
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses}`}
    >
      {children}
      {icon}
    </a>
  );
}

function ProjectMeta({
  category,
  year,
}: {
  category: string;
  year: string;
}): React.JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <span className="font-plex text-sm text-text-muted uppercase tracking-wider">
        {category}
      </span>
      <span className="w-1 h-1 rounded-full bg-brand" aria-hidden="true" />
      <span className="font-plex text-sm text-text-muted uppercase tracking-wider">
        {year}
      </span>
    </div>
  );
}

/* --------------------------- Main Component ---------------------------- */

export default function ProjectDetail(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [caseStudyLoading, setCaseStudyLoading] = useState(false);

  const project = useMemo<Project | null>(() => {
    const id = params.id as ProjectId | undefined;
    return id ? (PROJECTS[id] ?? null) : null;
  }, [params.id]);

  // Lazy load case study data
  useEffect(() => {
    if (project?.id && !caseStudy && !caseStudyLoading) {
      setCaseStudyLoading(true);
      import('../data/caseStudies').then(module => {
        const caseStudies = module.CASE_STUDIES;
        setCaseStudy(caseStudies[project.id as keyof typeof caseStudies] || null);
        setCaseStudyLoading(false);
      }).catch(() => {
        setCaseStudyLoading(false);
      });
    }
  }, [project?.id, caseStudy, caseStudyLoading]);

  if (!project) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center px-4">
        <div className="text-center space-y-6">
            <h1 className="font-satoshi text-4xl text-text-primary">Project Not Found</h1>
            <p className="font-plex text-text-muted">The project you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-plex font-medium text-text-primary hover:text-brand transition-colors duration-200 link-underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen w-full bg-paper">
      {/* Hero Section */}
  <section className="w-full border-b border-structure px-6 pb-16 pt-28 sm:px-10 sm:pt-32 md:pt-36 lg:px-16 lg:pt-40 xl:px-20 xl:pt-[140px]">
        <div className="mx-auto max-w-[1280px]">
          {/* Back Link */}
          <div className="mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-plex font-medium text-text-primary hover:text-brand transition-colors duration-200 link-underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>

          {/* Meta */}
          <div className="mb-6">
            <ProjectMeta category={project.category} year={project.year} />
          </div>

          {/* Title */}
          <div className="space-y-4 mb-12">
            <h1 className="font-satoshi text-[64px] leading-[1.1] text-text-primary tracking-[-0.02em]">
              {project.title}
            </h1>
            <div className="w-24 h-[3px] bg-brand rounded-[1px]"></div>
          </div>

          {/* Description */}
          <p className="font-plex text-[20px] leading-[1.7] text-text-muted max-w-[800px]">
            {project.description}
          </p>

          {/* Short case study summary */}
          {caseStudy && (
            <div className="mt-6 p-6 bg-surface border border-structure rounded-md max-w-[900px]">
              <h3 className="font-satoshi text-[18px] text-text-primary mb-4">Case Study</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-['Satoshi'] text-[14px] text-text-primary mb-2">Problem</h4>
                  <ul className="list-disc pl-5 font-plex text-[15px] text-text-muted leading-[1.6] space-y-2">
                    {caseStudy.problem.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-['Satoshi'] text-[14px] text-text-primary mb-2">Approach</h4>
                  <ul className="list-disc pl-5 font-plex text-[15px] text-text-muted leading-[1.6] space-y-2">
                    {caseStudy.approach.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {caseStudy.impact && (
                  <div>
                    <h4 className="font-['Satoshi'] text-[14px] text-text-primary mb-2">Impact</h4>
                    <ul className="list-disc pl-5 font-plex text-[15px] text-text-muted leading-[1.6] space-y-2">
                      {caseStudy.impact.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-6 py-16 sm:px-10 md:py-20 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-[1280px] space-y-16">
          {/* Long Description */}
          {project.longDescription && (
            <div className="space-y-6">
              <h2 className="font-satoshi text-[32px] text-text-primary tracking-[-0.01em]">
                Overview
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="font-plex text-[18px] leading-[1.8] text-text-muted whitespace-pre-line">
                  {project.longDescription}
                </p>
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-6">
              <h2 className="font-satoshi text-[32px] text-text-primary tracking-[-0.01em]">
                Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <TechPill key={index} label={tech} />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action Links */}
          <div className="flex flex-wrap gap-4 pt-8 border-t border-structure">
            <CtaLink href={project.liveUrl} variant="primary" icon={<ExternalLink className="h-4 w-4" />}>
              View Live Project
            </CtaLink>
            <CtaLink href={project.githubUrl} variant="secondary" icon={<ExternalLink className="h-4 w-4" />}>
              View on GitHub
            </CtaLink>
          </div>
        </div>
      </section>
    </article>
  );
}