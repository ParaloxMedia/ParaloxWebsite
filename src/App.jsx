import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from './hooks/useCurrency';
import './styles/global.css';
import { Nav }            from './components/ui/Nav';
import { Footer }         from './components/ui/Footer';
import { ParticleLoader } from './components/ui/ParticleLoader';
import { HomePage }       from './pages/HomePage';
import { AboutPage }      from './pages/AboutPage';
import { ServicesPage }   from './pages/ServicesPage';
import { PackagesPage }   from './pages/PackagesPage';
import { GalleryPage }    from './pages/GalleryPage';
import { ContactPage }    from './pages/ContactPage';
import { CareersPage }    from './pages/CareersPage';
import { VapiWidget }     from './components/ui/VapiWidget';

function SiteLayout({ dark, setDark }) {
  const location = useLocation();
  const { fmt } = useCurrency();

  return (
    <>
      <Nav dark={dark} setDark={setDark} />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 9 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.33, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/"         element={<HomePage     dark={dark} fmt={fmt} />} />
            <Route path="/about"    element={<AboutPage    dark={dark} />} />
            <Route path="/services" element={<ServicesPage dark={dark} />} />
            <Route path="/packages" element={<PackagesPage dark={dark} />} />
            <Route path="/gallery"  element={<GalleryPage  dark={dark} />} />
            <Route path="/contact"  element={<ContactPage  dark={dark} />} />
            <Route path="/careers"  element={<CareersPage  dark={dark} />} />
            <Route path="*"         element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer dark={dark} />
      <VapiWidget dark={dark} />
    </>
  );
}

export default function App() {
  const [loaded,   setLoaded]   = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [dark,     setDark]     = useState(false);

  // Absolute safety net — show site after 15s even if loader never calls onDone
  useEffect(() => {
    const t = setTimeout(() => {
      setLoaded(true);
      setShowSite(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  const handleDone = () => {
    setLoaded(true);
    setTimeout(() => setShowSite(true), 300);
  };

  return (
    <BrowserRouter>
      <div style={{
        background: dark ? '#080510' : '#F8F5FF',
        color: dark ? '#F0E8FF' : '#1A0A2E',
        minHeight: '100vh',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        {/* Particle loader */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              key="loader"
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55 }}
            >
              <ParticleLoader onDone={handleDone} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main site */}
        <AnimatePresence>
          {showSite && (
            <motion.div
              key="site"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
            >
              <SiteLayout dark={dark} setDark={setDark} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
