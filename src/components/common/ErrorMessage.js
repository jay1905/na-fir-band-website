import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  min-height: ${({ fullHeight }) => fullHeight ? '100vh' : '300px'};
  animation: ${fadeIn} 0.3s ease-out;
`;

const Icon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.5rem;
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 500px;
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = ({
  title = 'Oops! Something went wrong',
  message = 'We encountered an error while processing your request.',
  fullHeight = false,
  onRetry,
  showRetry = true,
  ...props
}) => {
  return (
    <ErrorContainer 
      fullHeight={fullHeight}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      {...props}
    >
      <Icon role="img" aria-label="Error">⚠️</Icon>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {showRetry && onRetry && (
        <RetryButton 
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </RetryButton>
      )}
    </ErrorContainer>
  );
};

export default ErrorMessage;

// Usage examples:
// <ErrorMessage /> - Default error message
// <ErrorMessage 
//   title="404 Not Found"
//   message="The page you're looking for doesn't exist."
//   fullHeight
// />
// <ErrorMessage
//   message="Failed to load data"
//   onRetry={() => fetchData()}
// />
