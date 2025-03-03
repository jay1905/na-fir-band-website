import { useState, useEffect } from 'react';

const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  const resetFirstVisit = () => {
    localStorage.removeItem('hasVisited');
    setIsFirstVisit(true);
  };

  return { isFirstVisit, resetFirstVisit };
};

export default useFirstVisit;
