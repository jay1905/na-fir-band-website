import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.header};
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.lightText};
  text-decoration: none;
  font-size: 0.8rem;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const BottomNav = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavList>
        <NavItem>
          <NavLink to="/" $active={location.pathname === '/'}>
            <Icon>🏠</Icon>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/blog" $active={location.pathname.includes('/blog')}>
            <Icon>📝</Icon>
            Blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink 
            as="a" 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Icon>🌐</Icon>
            Social
          </NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default BottomNav;
