// This hook is deprecated. Use the reveal function from SiteContext instead.
// Example:
// import { useSite } from '../contexts/SiteContext';
// const { reveal } = useSite();

const useScrollReveal = () => {
  console.warn('useScrollReveal is deprecated. Use reveal from SiteContext instead.');
  return () => {};
};

export default useScrollReveal;
