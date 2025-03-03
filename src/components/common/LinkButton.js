import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme, $primary }) => 
    $primary ? theme.colors.accent : 'transparent'};
  color: ${({ theme, $primary }) => 
    $primary ? 'white' : theme.colors.accent};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme, $primary }) => 
      $primary ? theme.colors.primary : theme.colors.accent};
    color: white;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  ${({ $fullWidth }) => $fullWidth && `
    width: 100%;
    text-align: center;
  `}

  ${({ $small }) => $small && `
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `}

  ${({ disabled }) => disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    &:hover {
      transform: none;
    }
  `}
`;

const StyledLink = styled(Link)`${buttonStyles}`;
const StyledAnchor = styled.a`${buttonStyles}`;
const StyledButton = styled.button`${buttonStyles}`;

const LinkButton = ({ 
  to, 
  href, 
  primary, 
  fullWidth, 
  small,
  disabled,
  onClick,
  children,
  ...props 
}) => {
  if (to) {
    return (
      <StyledLink 
        to={to} 
        $primary={primary} 
        $fullWidth={fullWidth}
        $small={small}
        disabled={disabled}
        {...props}
      >
        {children}
      </StyledLink>
    );
  }

  if (href) {
    return (
      <StyledAnchor 
        href={href}
        $primary={primary}
        $fullWidth={fullWidth}
        $small={small}
        disabled={disabled}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      $primary={primary}
      $fullWidth={fullWidth}
      $small={small}
      disabled={disabled}
      type="button"
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default LinkButton;

// Usage examples:
// <LinkButton to="/about">Internal Link</LinkButton>
// <LinkButton href="https://example.com">External Link</LinkButton>
// <LinkButton onClick={handleClick}>Button</LinkButton>
// <LinkButton primary>Primary Button</LinkButton>
// <LinkButton fullWidth>Full Width Button</LinkButton>
// <LinkButton small>Small Button</LinkButton>
// <LinkButton disabled>Disabled Button</LinkButton>
