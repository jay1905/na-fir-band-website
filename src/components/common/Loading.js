import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  animation: ${({ $isComplete }) => $isComplete ? fadeOut : 'none'} 0.3s ease forwards;
`;

const LogoWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 1px;
  overflow: hidden;
`;

const Progress = styled.div.attrs(({ $progress }) => ({
  style: {
    width: `${$progress}%`
  }
}))`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  transition: width 0.2s ease;
  will-change: width;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.heading};
  margin: 0;
`;

const Loading = ({ progress = 0, isComplete = false, onAnimationEnd }) => {
  return (
    <LoadingWrapper 
      $isComplete={isComplete} 
      onAnimationEnd={onAnimationEnd}
    >
      <LogoWrapper>
        <Logo>Na Fir</Logo>
      </LogoWrapper>
      <ProgressBar>
        <Progress $progress={progress} />
      </ProgressBar>
    </LoadingWrapper>
  );
};

export default Loading;
