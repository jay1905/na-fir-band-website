import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ theme, $fluid }) => $fluid ? '100%' : theme.maxWidth};
  margin: 0 auto;
  padding: ${({ $noPadding, theme }) => $noPadding ? '0' : `0 ${theme.spacing.md}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ $noPadding, theme }) => $noPadding ? '0' : `0 ${theme.spacing.sm}`};
  }
`;

const Container = ({
  children,
  fluid = false,
  noPadding = false,
  as,
  ...props
}) => {
  const { width } = useWindowSize();
  const isMobile = width < parseInt(props.theme?.breakpoints?.md || '768px');

  return (
    <StyledContainer
      $fluid={fluid || isMobile}
      $noPadding={noPadding}
      as={as}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;

// Usage example:
// <Container>
//   <p>Content with max-width and padding</p>
// </Container>
//
// <Container fluid>
//   <p>Full-width content with padding</p>
// </Container>
//
// <Container noPadding>
//   <p>Content with max-width but no padding</p>
// </Container>
