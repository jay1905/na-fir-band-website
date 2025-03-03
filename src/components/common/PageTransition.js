import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const PageTransition = ({ children, ...props }) => {
  return (
    <PageWrapper
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      {...props}
    >
      {children}
    </PageWrapper>
  );
};

export default PageTransition;

// Usage example:
// <PageTransition>
//   <YourPageContent />
// </PageTransition>
