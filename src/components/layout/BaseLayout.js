import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar';
import Footer from '../Footer';
import BottomNav from '../BottomNav';
import BackToTop from '../common/BackToTop';
import { pageTransition } from '../../styles/PageAnimation';
import Container from './Container';

const Main = styled.main.attrs(({ theme }) => ({
  style: {
    paddingTop: theme.headerHeight,
    paddingBottom: window.innerWidth <= parseInt(theme.breakpoints.md) ? theme.spacing.xl : '0'
  }
}))`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div.attrs(({ $noPadding, theme }) => ({
  style: {
    maxWidth: theme.maxWidth,
    padding: $noPadding ? '0' : 'inherit'
  }
}))`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  will-change: opacity, transform;
`;

const AnimatedContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  will-change: opacity, transform;
`;

const BaseLayout = ({ 
  children, 
  noPadding = false,
  noNavbar = false,
  noFooter = false,
  noBottomNav = false,
  ...props 
}) => {
  const [isTransitionComplete, setIsTransitionComplete] = useState(true);

  return (
    <>
      {!noNavbar && <NavBar />}
      <Main>
        <AnimatePresence mode="wait">
          <AnimatedContent
            key={window.location.pathname}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            onAnimationStart={() => {
              setIsTransitionComplete(false);
            }}
            onAnimationComplete={() => {
              setIsTransitionComplete(true);
              // Force ScrollReveal to re-evaluate after animation
              if (window.ScrollReveal) {
                window.ScrollReveal().sync();
              }
            }}
          >
            <Content $noPadding={noPadding} {...props}>
              {children}
            </Content>
          </AnimatedContent>
        </AnimatePresence>
      </Main>
      {!noFooter && <Footer />}
      {!noBottomNav && <BottomNav />}
      <BackToTop />
    </>
  );
};

export const PageLayout = ({ children, ...props }) => (
  <BaseLayout {...props}>
    <Container>
      {children}
    </Container>
  </BaseLayout>
);

export default BaseLayout;
