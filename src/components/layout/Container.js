import React from 'react';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowSize';

const StyledContainer = styled.div.attrs(({ theme, $fluid, $noPadding }) => {
  const isSmallScreen = window.innerWidth <= parseInt(theme.breakpoints.sm);
  return {
    style: {
      maxWidth: $fluid ? '100%' : theme.maxWidth,
      padding: $noPadding ? '0' : `0 ${isSmallScreen ? theme.spacing.sm : theme.spacing.md}`
    }
  };
})`
  width: 100%;
  margin: 0 auto;
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
