import React from 'react';
import styled from 'styled-components';
import { useSite } from '../../contexts/SiteContext';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.header + 1};
  opacity: ${({ $show }) => $show ? 1 : 0};
  transition: opacity 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ $progress }) => $progress}%;
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width 0.1s ease;
  }
`;

const ScrollProgress = () => {
  const { scrollProgress, isComplete } = useSite();
  const showProgress = scrollProgress > 0 && isComplete;

  return (
    <ProgressBar
      $show={showProgress}
      $progress={scrollProgress}
      role="progressbar"
      aria-valuenow={scrollProgress}
      aria-valuemin="0"
      aria-valuemax="100"
    />
  );
};

export default ScrollProgress;
