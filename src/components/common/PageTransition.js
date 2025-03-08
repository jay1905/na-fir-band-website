import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../styles/PageAnimation';

const PageTransition = ({ children, ...props }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      style={{ minHeight: '100vh' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

// Usage example:
// <PageTransition>
//   <YourPageContent />
// </PageTransition>
