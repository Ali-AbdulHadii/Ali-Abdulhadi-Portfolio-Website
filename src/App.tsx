import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorTrail from './components/ui/CursorTrail';
import AmbientBackground from './components/background/AmbientBackground';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

// Inner component to access location for AnimatePresence
function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/projects"       element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/projects/:slug" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
        <Route path="/about"          element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact"        element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      {/* Global stars background on all pages */}
      <AmbientBackground />

      {/*
        relative + z-[1] creates a stacking context that sits above the
        fixed background canvas rendered globally.
        No background here — body provides #020510 so the canvas shows through.
      */}
      <div className="min-h-screen flex flex-col relative z-[1]">
        <Navbar />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>

      {/* Cursor trail — above everything at z-60 */}
      <CursorTrail />
    </HashRouter>
  );
}
