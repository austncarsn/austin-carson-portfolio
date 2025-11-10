import { useMemo, useState } from "react";
import type { JSX } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export type Project = {
  id: string;
  title: string;
  image: string;
  category: string;
  client?: string;
  href?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (_project: Project) => void;
};

type Props = {
  projects: Project[];
  initialFilter?: string;
  // eslint-disable-next-line no-unused-vars
  onProjectOpen?: (_p: Project) => void;
  filters?: string[];
  // eslint-disable-next-line no-unused-vars
  ImageWithFallback?: (_props: {
    src: string;
    alt: string;
    className?: string;
  }) => JSX.Element;
};

export function WorkSection({
  projects,
  initialFilter = "All",
  onProjectOpen,
  filters,
  ImageWithFallback,
}: Props): JSX.Element {
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const navigate = useNavigate();

  // Detect reduced motion preference
  const reduceMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Auto-derive filters from project categories if not provided
  const derivedFilters = useMemo(() => {
    if (filters) return ["All", ...filters];
    const cats = Array.from(new Set(projects.map((p: Project) => p.category))).sort();
    return ["All", ...cats];
  }, [projects, filters]);

  // Filter projects by active category
  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p: Project) => p.category === activeFilter),
    [projects, activeFilter]
  );

  // Unified navigation handler
  const open = (p: Project): void => {
    if (p.onClick) {
      p.onClick(p);
      return;
    }
    if (p.href) {
      // Use React Router for internal navigation, native for external
      if (p.href.startsWith('http')) {
        window.location.href = p.href;
      } else {
        navigate(p.href);
      }
      return;
    }
    onProjectOpen?.(p);
  };

  // Default image component if none provided
  const ImageComponent = ImageWithFallback ?? (({ src, alt, className }: { src: string; alt: string; className?: string }): JSX.Element => (
    <img src={src} alt={alt} className={className} loading="lazy" />
  ));

  return (
    <section
      className="relative min-h-screen px-8 md:px-16 py-24"
      style={{ background: "var(--surface)", color: "var(--text)" }}
      aria-labelledby="work-heading"
    >
      {/* Gradient overlay for smooth transition from hero */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-8 h-8"
        style={{ background: 'linear-gradient(180deg, transparent, color-mix(in oklab, white 6%, transparent))' }}
      />
      
      <div className="max-w-[1800px] mx-auto relative">
        {/* Header + filters */}
        <div className="mb-16">
          <motion.h2
            id="work-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl tracking-tighter mb-10 md:mb-12"
            style={{ color: "color-mix(in oklab, var(--text) 95%, transparent)" }}
          >
            Projects
          </motion.h2>

          <div role="tablist" aria-label="Project filters" className="flex flex-wrap gap-3">
            {derivedFilters.map((filter, i) => (
              <motion.button
                key={filter}
                role="tab"
                aria-selected={activeFilter === filter}
                aria-pressed={activeFilter === filter}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : i * 0.06 }}
                viewport={{ once: true }}
                onClick={() => setActiveFilter(filter)}
                className="px-6 md:px-8 py-2.5 md:py-3 border-2 rounded-full transition-all duration-300 focus:outline-none focus-ring"
                style={{
                  borderColor: activeFilter === filter ? "var(--primary)" : "var(--warm-medium)",
                  backgroundColor: activeFilter === filter ? "var(--primary)" : "transparent",
                  color: activeFilter === filter ? "var(--warm-lightest)" : "var(--warm-stone)",
                }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Project list */}
        <ul className="space-y-6 md:space-y-8" aria-live="polite">
          {visible.map((project: Project, index: number) => (
            <motion.li
              key={project.id ?? project.title}
              initial={reduceMotion ? false : { opacity: 0, x: -50 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
              viewport={{ once: true }}
              className="group projects-row"
              style={{ borderBottom: '1.25px solid color-mix(in oklab, white 8%, transparent)' }}
            >
              {/* Anchor row so keyboard users can activate the whole row */}
              <a
                href={project.href || undefined}
                target={project.href?.startsWith("http") ? "_blank" : undefined}
                rel={project.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  // Helper: detect modified clicks (Cmd/Ctrl+Click, etc.)
                  const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
                  
                  // Only take over if we have a navigation target
                  const hasTarget = !!(project.href || project.onClick || onProjectOpen);
                  if (!hasTarget) return;

                  // For normal left-clicks, prevent default and use our open()
                  if (!isModified) {
                    e.preventDefault();
                    open(project);
                  }
                  // For Cmd/Ctrl+Click, let browser handle it (new tab)
                }}
                className="grid grid-cols-12 gap-4 md:gap-6 items-center py-6 md:py-8 border-b outline-none focus-ring"
                style={{ borderColor: "var(--warm-medium)" }}
              >
                {/* Number */}
                <div className="col-span-2 sm:col-span-1">
                  <span
                    className="text-2xl md:text-3xl tabular-nums"
                    style={{ color: 'color-mix(in oklab, white 35%, transparent)' }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Image */}
                <div className="col-span-10 sm:col-span-5 md:col-span-3">
                  <div 
                    className="relative aspect-[4/3] overflow-hidden rounded-xl projects-thumb"
                    style={{ boxShadow: '0 10px 24px color-mix(in oklab, black 35%, transparent)' }}
                  >
                    <ImageComponent
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="col-span-12 sm:col-span-6 md:col-span-3">
                  <h3
                    className="text-3xl md:text-5xl tracking-tighter transition-opacity group-hover:opacity-70"
                    style={{ color: 'color-mix(in oklab, white 92%, transparent)' }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Meta: Category */}
                <div className="col-span-6 md:col-span-2">
                  <div
                    className="text-[11px] md:text-sm tracking-wider uppercase mb-1"
                    style={{ color: 'color-mix(in oklab, white 60%, transparent)' }}
                  >
                    Category
                  </div>
                  <div className="text-base md:text-lg" style={{ color: "var(--accent)" }}>
                    {project.category}
                  </div>
                </div>

                {/* Meta: Client */}
                <div className="col-span-6 md:col-span-2">
                  <div
                    className="text-[11px] md:text-sm tracking-wider uppercase mb-1"
                    style={{ color: 'color-mix(in oklab, white 60%, transparent)' }}
                  >
                    Client
                  </div>
                  <div className="text-base md:text-lg" style={{ color: 'color-mix(in oklab, white 75%, transparent)' }}>
                    {project.client ?? "—"}
                  </div>
                </div>

                {/* Arrow - true button to prevent accidental navigation */}
                <div className="hidden md:flex md:col-span-1 justify-end">
                  {!reduceMotion ? (
                    <motion.button
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        open(project); 
                      }}
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                      aria-label={`Open ${project.title}`}
                    >
                      →
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        open(project); 
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                      aria-label={`Open ${project.title}`}
                    >
                      →
                    </button>
                  )}
                </div>
              </a>
            </motion.li>
          ))}

          {/* Empty state */}
          {visible.length === 0 && (
            <li 
              className="py-16 text-center text-xl md:text-2xl" 
              style={{ color: "var(--warm-stone)" }}
              role="status"
            >
              No projects found. Try another filter.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
