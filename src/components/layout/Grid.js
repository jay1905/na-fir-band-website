import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }) => columns || 'repeat(12, 1fr)'};
  gap: ${({ gap, theme }) => gap || theme.spacing.md};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  margin: ${({ center }) => center ? '0 auto' : '0'};
  padding: ${({ padding, theme }) => padding || '0'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ mobileColumns }) => mobileColumns || '1fr'};
  }
`;

export const GridItem = styled.div`
  grid-column: ${({ span }) => `span ${span || 1}`};
  grid-row: ${({ rowSpan }) => rowSpan ? `span ${rowSpan}` : 'auto'};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: ${({ mobileSpan }) => mobileSpan ? `span ${mobileSpan}` : 'auto'};
  }
`;

export default Grid;

// Usage example:
// <Grid columns="repeat(3, 1fr)" gap="2rem">
//   <GridItem span={2}>Spans 2 columns</GridItem>
//   <GridItem>Single column</GridItem>
// </Grid>
