/* ==========================================================================
   App Root Component — The Digital Heart of Your Experience
   ========================================================================== */

// ─── DEPENDENCIES ───────────────────────────────────────────────────────────
import type { ReactElement, ReactNode } from 'react';
import { lazy, Suspense, memo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { GALLERY_IMAGES } from './data/galleryImages';

// ─── LAZY LOADED COMPONENTS ─────────────────────────────────────────────────
const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const ImageGallery = lazy(() => import('./components/ImageGallery'));
const Projects = lazy(() => import('./components/Projects'));
const ContactCTA = lazy(() => import('./components/ContactCTA'));
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

// ─── ROOT APPLICATION COMPONENT ─────────────────────────────────────────────
/**
 * The core application shell orchestrating all user experiences
 * @returns {ReactElement} The complete application interface
 */
export default function App(): ReactElement {
  return (
    <Router>
      <ScrollToTop />
      <div 
        className="flex flex-col min-h-screen bg-background text-foreground"
        data-theme="light"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Navigation />
          
          <MainContent>
            <Routes>
              <Route 
                index 
                element={
                  <RouteTransition>
                    <Hero />
                    <ImageGallery images={GALLERY_IMAGES} />
                    <Projects />
                    <ContactCTA />
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