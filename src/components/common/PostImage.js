import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const PostImage = ({ src, alt, ...props }) => (
  <ImageWrapper {...props}>
    <StyledImage src={src} alt={alt} loading="lazy" />
  </ImageWrapper>
);

export default PostImage;
