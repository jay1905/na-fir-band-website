import React from 'react';
import styled from 'styled-components';
import Flex from './layout/Flex';
import Container from './layout/Container';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled(Flex)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Column = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.2rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialLinks = styled(Flex)`
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.lightText};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <Container>
        <FooterContent>
          <Column>
            <Title>Na Fir</Title>
            <p style={{ color: 'var(--colors-lightText)' }}>
              Celtic Folk Metal from Germany
            </p>
          </Column>
          <Column>
            <Title>Links</Title>
            <List>
              <ListItem>
                <FooterLink to="/">Home</FooterLink>
              </ListItem>
              <ListItem>
                <FooterLink to="/blog">Blog</FooterLink>
              </ListItem>
            </List>
          </Column>
          <Column>
            <Title>Follow Us</Title>
            <SocialLinks>
              <FooterLink as="a" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Facebook
              </FooterLink>
              <FooterLink as="a" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Instagram
              </FooterLink>
            </SocialLinks>
          </Column>
        </FooterContent>
        <Copyright>
          © {currentYear} Na Fir. All rights reserved.
        </Copyright>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
