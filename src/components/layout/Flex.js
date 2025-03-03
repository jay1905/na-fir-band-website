import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'stretch'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  gap: ${({ gap, theme }) => gap || theme.spacing.md};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  height: ${({ fullHeight }) => fullHeight ? '100%' : 'auto'};
  min-height: ${({ minHeight }) => minHeight || 'auto'};
  padding: ${({ padding }) => padding || '0'};
  margin: ${({ margin }) => margin || '0'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: ${({ mobileDirection }) => mobileDirection || 'column'};
    gap: ${({ mobileGap, theme }) => mobileGap || theme.spacing.sm};
  }
`;

export const FlexItem = styled.div`
  flex: ${({ flex }) => flex || '0 1 auto'};
  min-width: ${({ minWidth }) => minWidth || '0'};
  width: ${({ width }) => width || 'auto'};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};
  order: ${({ order }) => order || '0'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ mobileWidth }) => mobileWidth || '100%'};
    order: ${({ mobileOrder }) => mobileOrder || 'inherit'};
  }
`;

export default Flex;

// Usage example:
// <Flex direction="row" justify="space-between" align="center" gap="1rem">
//   <FlexItem flex="1">First item</FlexItem>
//   <FlexItem flex="2">Second item</FlexItem>
// </Flex>
