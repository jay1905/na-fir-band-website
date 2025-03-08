import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import Loading from './components/common/Loading';
import ScrollProgress from './components/common/ScrollProgress';
import ScrollToTop from './components/common/ScrollToTop';
import BackToTop from './components/common/BackToTop';
import { SiteProvider } from './contexts/SiteContext';

const LOADING_DURATION = 500; // Reduced from 1500 to 500ms

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + LOADING_DURATION;

    const updateProgress = () => {
      const now = Date.now();
      const progress = ((now - startTime) / LOADING_DURATION) * 100;

      if (now < endTime) {
        setLoadingProgress(Math.min(progress, 100));
        requestAnimationFrame(updateProgress);
      } else {
        setLoadingProgress(100);
        setIsLoading(false);
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <SiteProvider>
          <GlobalStyles />
          {isLoading && (
            <Loading 
              progress={loadingProgress} 
              isComplete={!isLoading}
            />
          )}
          <ScrollProgress />
          <ScrollToTop />
          <BackToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="/blog/page/:page" element={<HomePage />} />
          </Routes>
        </SiteProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
