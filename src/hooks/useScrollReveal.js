import { useEffect, useRef } from 'react';
import ScrollReveal from 'scrollreveal';

const defaultConfig = {
  duration: 1000,
  delay: 200,
  distance: '20px',
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 100,
  opacity: 0,
  origin: 'bottom',
  rotate: { x: 0, y: 0, z: 0 },
  scale: 1,
  cleanup: false,
  container: window.document.documentElement,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
};

const useScrollReveal = () => {
  const scrollReveal = useRef(null);

  useEffect(() => {
    if (!scrollReveal.current) {
      scrollReveal.current = ScrollReveal();
    }
    return () => scrollReveal.current = null;
  }, []);

  const reveal = (target, config = {}) => {
    if (scrollReveal.current) {
      const mergedConfig = { ...defaultConfig, ...config };
      scrollReveal.current.reveal(target, mergedConfig);
      return () => {
        if (scrollReveal.current) {
          scrollReveal.current.clean(target);
        }
      };
    }
    return () => {};
  };

  return reveal;
};

export default useScrollReveal;
