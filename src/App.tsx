import type { ReactElement, ReactNode } from 'react';
import { lazy, Suspense, memo, useEffect, useState, useCallback } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { WorkSection } from './components/WorkSection';
import { GALLERY_PROJECTS } from './data/projectsGallery';
import { adaptGalleryProjects } from './data/workAdapter';
import type { Project } from './components/WorkSection';

const Hero = lazy(() => import('./components/features/hero/Hero').then(module => ({ default: module.Hero })));
const Contact2 = lazy(() => import('./components/Contact2').then(module => ({ default: module.Contact2 })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail').then(module => ({ default: module.default })));
const Resume = lazy(() => import('./components/Resume'));
const NotFound = lazy(() => import('./components/NotFound'));

const LoadingFallback = memo(function LoadingFallback(): ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="skeleton h-16 w-16 rounded-full" />
    </div>
  );
});

const RouteTransition = memo(function RouteTransition({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="animate-fade-in" data-state="open">
      {children}
    </div>
  );
});

const MainContent = memo(function MainContent({ children }: { children: ReactNode }): ReactElement {
  return (
    <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
      {children}
    </main>
  );
});

function ScrollToSection(): null {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
    
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  return null;
}

export default function App(): ReactElement {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projects = adaptGalleryProjects(GALLERY_PROJECTS);

  const handleProjectClick = useCallback((project: Project, index: number): void => {
    setSelectedProject(project);
    setSelectedIndex(index);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
      setSelectedIndex(-1);
    }, 300);
  }, []);

  const handleNextProject = useCallback((): void => {
    if (!projects || projects.length === 0) return;
    const nextIndex = (selectedIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
    setSelectedIndex(nextIndex);
  }, [projects, selectedIndex]);

  const handlePrevProject = useCallback((): void => {
    if (!projects || projects.length === 0) return;
    const prevIndex = selectedIndex === 0 ? projects.length - 1 : selectedIndex - 1;
    setSelectedProject(projects[prevIndex]);
    setSelectedIndex(prevIndex);
  }, [projects, selectedIndex]);

  return (
    <Router>
      <ScrollToTop />
      <ScrollToSection />
      <div 
        className="flex flex-col min-h-screen bg-background text-foreground"
        data-theme="light"
      >
        
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <MainContent>
              <Routes>
              <Route 
                index 
                element={
                  <RouteTransition>
                    <Hero />
                    
                    <div
                      className="section-bridge"
                      style={{
                        height: '64px',
                        background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)'
                      }}
                    />
                    
                    <section id="work" style={{ background: 'var(--surface)' }}>
                      <WorkSection 
                        projects={projects}
                        onProjectClick={handleProjectClick}
                      />
                    </section>
                    
                    <section id="contact" style={{ background: 'var(--surface)' }}>
                      <Contact2
                        directEmail="austncarsn@gmail.com"
                        phone="206-620-4803"
                        socials={[
                          { label: "LinkedIn", href: "https://linkedin.com/in/austincarson" },
                          { label: "GitHub", href: "https://github.com/austncarsn" },
                          { label: "Instagram", href: "https://instagram.com/austncarsn" },
                        ]}
                      />
                    </section>
                  </RouteTransition>
                } 
              />
              
              <Route
                path="/resume"
                element={
                  <RouteTransition>
                    <Resume />
                  </RouteTransition>
                }
              />
              
              <Route 
                path="*" 
                element={
                  <RouteTransition>
                    <NotFound />
                  </RouteTransition>
                } 
              />
            </Routes>
            </MainContent>
          </Suspense>
        </ErrorBoundary>

        <Suspense fallback={null}>
          <ProjectDetail 
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onNext={selectedIndex < projects.length - 1 ? handleNextProject : undefined}
            onPrev={selectedIndex > 0 ? handlePrevProject : undefined}
          />
        </Suspense>
      </div>
    </Router>
  );
}