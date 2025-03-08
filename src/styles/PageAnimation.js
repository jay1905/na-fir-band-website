export const pageTransition = {
  initial: {
    opacity: 1,
    y: 0
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    }
  }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const fadeInUp = {
  initial: {
    y: 20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const fadeIn = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const scaleUp = {
  initial: {
    scale: 0.95,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const slideIn = {
  initial: {
    x: -20,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

// Usage with framer-motion:
// import { motion } from 'framer-motion';
// import { pageTransition, fadeInUp } from '../styles/PageAnimation';
//
// <motion.div
//   initial="initial"
//   animate="animate"
//   exit="exit"
//   variants={pageTransition}
// >
//   <motion.div variants={fadeInUp}>
//     Content here
//   </motion.div>
// </motion.div>
