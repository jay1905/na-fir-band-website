import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Mark the first render as complete after a delay
    const timer = setTimeout(() => {
      setIsFirstRender(false);
      setIsComplete(true);
    }, 100);

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
      clearTimeout(timer);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const value = {
    isComplete,
    isFirstRender,
    scrollProgress,
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
