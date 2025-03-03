import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import NavBar from '../NavBar';
import Footer from '../Footer';
import BottomNav from '../BottomNav';
import BackToTop from '../common/BackToTop';
import { pageTransition } from '../../styles/PageAnimation';
import Container from './Container';

const Main = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.headerHeight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-bottom: ${({ theme }) => theme.spacing.xl};
  }
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ $noPadding }) => $noPadding ? '0' : 'inherit'};
`;

const BaseLayout = ({ 
  children, 
  noPadding = false,
  noNavbar = false,
  noFooter = false,
  noBottomNav = false,
  ...props 
}) => {
  return (
    <>
      {!noNavbar && <NavBar />}
      <Main>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransition}
        >
          <Content $noPadding={noPadding} {...props}>
            {children}
          </Content>
        </motion.div>
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

// Usage examples:
// Basic layout with all elements:
// <BaseLayout>
//   <YourContent />
// </BaseLayout>
//
// Layout without padding:
// <BaseLayout noPadding>
//   <YourContent />
// </BaseLayout>
//
// Layout with container:
// <PageLayout>
//   <YourContent />
// </PageLayout>
