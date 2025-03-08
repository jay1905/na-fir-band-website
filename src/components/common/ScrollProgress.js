import React from 'react';
import styled from 'styled-components';
import { useSite } from '../../contexts/SiteContext';

const ProgressBar = styled.div.attrs(({ $progress, $show }) => ({
  style: {
    opacity: $show ? 1 : 0,
    '--progress': `${$progress}%`
  }
}))`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.header + 1};
  transition: opacity 0.3s ease;
  will-change: opacity;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress);
    background-color: ${({ theme }) => theme.colors.accent};
    transition: width 0.1s ease;
    will-change: width;
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
