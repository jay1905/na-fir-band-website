import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useFirstVisit from '../../hooks/useFirstVisit';
import { useSite } from '../../contexts/SiteContext';

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

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  will-change: transform, opacity;
  visibility: visible;
`;

const IntroSection = memo(() => {
  const contentRef = useRef(null);
  const cleanupRef = useRef();
  const { reveal, isComplete } = useSite();

  useEffect(() => {
    if (!isComplete) return;

    const timer = setTimeout(() => {
      const el = contentRef.current;
      if (el?.getBoundingClientRect && document.body.contains(el)) {
        try {
          cleanupRef.current = reveal(el, {
            delay: 100,
            distance: '20px',
            origin: 'bottom',
            duration: 600,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            scale: 1,
            opacity: 1,
            cleanup: true,
            mobile: true,
            container: document.documentElement,
            beforeReveal: (element) => {
              return document.body.contains(element);
            }
          });
        } catch (err) {
          console.warn('Error revealing intro:', err);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [reveal, isComplete]);

  return (
    <IntroWrapper>
      <Content ref={contentRef}>
        <Title>Na Fir</Title>
        <Subtitle>Celtic Folk Metal from Germany</Subtitle>
      </Content>
    </IntroWrapper>
  );
});

export default IntroSection;
