import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useScrollReveal from '../../hooks/useScrollReveal';
import useFirstVisit from '../../hooks/useFirstVisit';
import { useSite } from '../../contexts/SiteContext';

const IntroWrapper = styled.section`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  min-height: calc(100vh - ${({ theme }) => theme.headerHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.lightText};
  font-weight: 400;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
`;

const IntroSection = () => {
  const contentRef = useRef(null);
  const reveal = useScrollReveal();
  const { isFirstVisit } = useFirstVisit();
  const { isComplete } = useSite();

  useEffect(() => {
    if (contentRef.current && isComplete) {
      const cleanup = reveal(contentRef.current, {
        delay: isFirstVisit ? 1000 : 200,
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        cleanup: true
      });

      return () => cleanup();
    }
  }, [reveal, isFirstVisit, isComplete]);

  return (
    <IntroWrapper>
      <Content ref={contentRef}>
        <Title>Na Fir</Title>
        <Subtitle>Celtic Folk Metal from Germany</Subtitle>
      </Content>
    </IntroWrapper>
  );
};

export default IntroSection;
