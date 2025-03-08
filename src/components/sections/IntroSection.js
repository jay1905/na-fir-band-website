import React, { memo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../styles/PageAnimation';

const IntroWrapper = styled.section.attrs(({ theme }) => ({
  style: {
    padding: `${theme.spacing.xl} 0`,
    minHeight: `calc(100vh - ${theme.headerHeight})`
  }
}))`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1.attrs(({ theme }) => ({
  style: {
    fontSize: window.innerWidth <= parseInt(theme.breakpoints.md) ? '2.5rem' : '3.5rem',
    marginBottom: theme.spacing.lg,
    color: theme.colors.text
  }
}))`
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const Subtitle = styled.h2.attrs(({ theme }) => ({
  style: {
    fontSize: window.innerWidth <= parseInt(theme.breakpoints.md) ? '1.25rem' : '1.5rem',
    marginBottom: theme.spacing.xl,
    color: theme.colors.lightText
  }
}))`
  font-weight: 400;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  will-change: transform, opacity;
  visibility: visible;
`;

const IntroSection = memo(() => {
  return (
    <IntroWrapper>
      <Content
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Title>Na Fir</Title>
        </motion.div>
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Subtitle>Irish Folk from The Netherlands</Subtitle>
        </motion.div>
      </Content>
    </IntroWrapper>
  );
});

export default IntroSection;
