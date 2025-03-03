import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${({ $fullScreen }) => $fullScreen ? '100vh' : '200px'};
  animation: ${fadeIn} 0.3s ease-in;
`;

const Spinner = styled.div`
  width: ${({ $size }) => $size || '40px'};
  height: ${({ $size }) => $size || '40px'};
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Text = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.lightText};
  text-align: center;
  font-size: 0.9rem;
`;

const LoadingSpinner = ({ 
  size, 
  fullScreen = false, 
  text = 'Loading...',
  showText = true 
}) => {
  return (
    <SpinnerWrapper $fullScreen={fullScreen}>
      <div>
        <Spinner $size={size} />
        {showText && <Text>{text}</Text>}
      </div>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;

// Usage examples:
// <LoadingSpinner /> - Default size with text
// <LoadingSpinner size="60px" /> - Custom size
// <LoadingSpinner fullScreen /> - Full screen loader
// <LoadingSpinner text="Processing..." /> - Custom text
// <LoadingSpinner showText={false} /> - Hide text
