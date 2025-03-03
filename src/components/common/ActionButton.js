import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }

  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
`;

const ActionButton = ({ children, onClick, disabled, fullWidth, ...props }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    fullWidth={fullWidth}
    {...props}
  >
    {children}
  </StyledButton>
);

export default ActionButton;
