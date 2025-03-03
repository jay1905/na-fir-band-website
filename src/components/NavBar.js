import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from './layout/Container';

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.headerHeight};
  background-color: ${({ theme, $transparent }) => 
    $transparent ? 'transparent' : theme.colors.background};
  border-bottom: 1px solid ${({ theme, $transparent }) => 
    $transparent ? 'transparent' : theme.colors.border};
  transition: all 0.3s ease;
  z-index: ${({ theme }) => theme.zIndex.header};
  transform: translateY(${({ $hide }) => ($hide ? '-100%' : '0')});
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover, &.active {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NavBar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      // Toggle transparency
      setIsTransparent(currentScroll === 0);

      // Hide/show based on scroll direction
      if (currentScroll > lastScroll && currentScroll > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <Header $transparent={isTransparent} $hide={isHidden}>
      <Container>
        <Nav>
          <Logo to="/">Na Fir</Logo>
          <NavLinks>
            <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </NavLink>
            <NavLink to="/blog" className={location.pathname.includes('/blog') ? 'active' : ''}>
              Blog
            </NavLink>
          </NavLinks>
        </Nav>
      </Container>
    </Header>
  );
};

export default NavBar;
