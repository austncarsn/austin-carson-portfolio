/* ==========================================================================
   App Root Component — The Digital Heart of Your Experience
   ========================================================================== */

// ─── DEPENDENCIES ───────────────────────────────────────────────────────────
import type { ReactElement, ReactNode } from 'react';
import { lazy, Suspense, memo, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { SiteHeader } from './components/SiteHeader';
import { WorkSection } from './components/WorkSection';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { GALLERY_PROJECTS } from './data/projectsGallery';
import { adaptGalleryProjects } from './data/workAdapter';

// ─── LAZY LOADED COMPONENTS ─────────────────────────────────────────────────
const HeroBrutalist = lazy(() => import('./components/HeroBrutalist').then(module => ({ default: module.HeroBrutalist })));
const Contact2 = lazy(() => import('./components/Contact2').then(module => ({ default: module.Contact2 })));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const Resume = lazy(() => import('./components/Resume'));
const NotFound = lazy(() => import('./components/NotFound'));

// ─── LOADING STATES ─────────────────────────────────────────────────────────
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

// ─── ACCESSIBILITY LANDMARKS ────────────────────────────────────────────────
const MainContent = memo(function MainContent({ children }: { children: ReactNode }): ReactElement {
  return (
    <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
      {children}
    </main>
  );
});

// ─── SMOOTH SCROLL HANDLER ──────────────────────────────────────────────────
function ScrollToSection(): null {
  const location = useLocation();

  useEffect(() => {
    // Only handle hash scrolling on the home route (/)
    if (location.pathname !== '/') return;
    
    // Check if URL has a hash like /#work or /#contact
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Wait for page to render
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // No hash - scroll to top on initial load
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  return null;
}

// ─── ROOT APPLICATION COMPONENT ─────────────────────────────────────────────
/**
 * The core application shell orchestrating all user experiences
 * @returns {ReactElement} The complete application interface
 */
export default function App(): ReactElement {
  return (
    <Router>
      <ScrollToTop />
      <ScrollToSection />
      <div 
        className="flex flex-col min-h-screen bg-background text-foreground"
        data-theme="noir"
      >
        <SiteHeader
          variant="noir"
          brandTitle="AUSTIN CARSON"
          since="Since 2025"
          items={[
            { label: "Index", href: "/" },
            { label: "Work", href: "#work" },
            { label: "Contact", href: "#contact" },
          ]}
          statusText="Open for collabs"
          cta={{ label: "Resume", href: "/resume", external: true }}
          tickerText="Available for projects • AI-Powered Educational Interfaces • Creative Tech & Design Systems"
          tickerSpeedSec={18}
          LinkComponent={Link}
        />
        
        <Suspense fallback={<LoadingFallback />}>
          <MainContent>
            <Routes>
              <Route 
                index 
                element={
                  <RouteTransition>
                    <HeroBrutalist />
                    
                    {/* Bridge gradient - smooth hero → projects handoff */}
                    <div
                      className="section-bridge"
                      style={{
                        height: '64px',
                        background: 'linear-gradient(180deg, var(--bg) 0%, var(--surface) 100%)'
                      }}
                    />
                    
                    <section id="work" style={{ background: 'var(--surface)' }}>
                      <WorkSection 
                        projects={adaptGalleryProjects(GALLERY_PROJECTS)} 
                        ImageWithFallback={ImageWithFallback}
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
                path="/project/:id" 
                element={
                  <RouteTransition>
                    <ProjectDetail />
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
      </div>
    </Router>
  );
}