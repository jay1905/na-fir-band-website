import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';

const defaultRevealConfig = {
  duration: 1000,
  delay: 200,
  distance: '20px',
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 100,
  opacity: 0,
  origin: 'bottom',
  scale: 1,
  cleanup: true,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
};

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRevealRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Initialize ScrollReveal once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      scrollRevealRef.current = ScrollReveal({
        distance: '20px',
        duration: 600,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 0,
        opacity: 0,
        origin: 'bottom',
        scale: 1,
        cleanup: true,
        container: document.documentElement,
        desktop: true,
        mobile: true,
        reset: false,
        useDelay: 'always',
        viewFactor: 0.0,
        viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
      });

      setIsReady(true);
      setIsComplete(true); // Set complete immediately
      setIsFirstRender(false);

      return () => {
        if (scrollRevealRef.current) {
          scrollRevealRef.current.destroy();
          scrollRevealRef.current = null;
        }
      };
    } catch (err) {
      console.warn('Error initializing ScrollReveal:', err);
      // Even if ScrollReveal fails, we should still show content
      setIsComplete(true);
      setIsFirstRender(false);
    }
  }, []);

  useEffect(() => {
    // Update scroll progress
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);

    // Initial progress calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const reveal = (target, customConfig = {}) => {
    if (!scrollRevealRef.current || !target || !target.getBoundingClientRect) {
      return () => {};
    }

    try {
      const config = { ...defaultRevealConfig, ...customConfig };
      scrollRevealRef.current.reveal(target, config);
      
      return () => {
        if (scrollRevealRef.current) {
          scrollRevealRef.current.clean(target);
        }
      };
    } catch (err) {
      console.warn('Error applying ScrollReveal:', err);
      return () => {};
    }
  };

  const value = {
    isComplete,
    isFirstRender,
    scrollProgress,
    reveal,
    isReady
  };

  return (
    <SiteContext.Provider value={value}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};

export default SiteContext;
