import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BaseLayout from './layout/BaseLayout';
import LoadingSpinner from './common/LoadingSpinner';
import ErrorMessage from './common/ErrorMessage';
import LinkButton from './common/LinkButton';
import PostImage from './common/PostImage';
import { usePost, formatDate } from '../hooks/usePosts';

const PostWrapper = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const PostHeader = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const PostDate = styled.time`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 1rem;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostPage = () => {
  const { slug } = useParams();
  const { post, isLoading, error } = usePost(slug);

  if (isLoading) {
    return (
      <BaseLayout>
        <LoadingSpinner />
      </BaseLayout>
    );
  }

  if (error) {
    return (
      <BaseLayout>
        <ErrorMessage message={error} />
      </BaseLayout>
    );
  }

  if (!post) {
    return (
      <BaseLayout>
        <ErrorMessage message="Post not found" />
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <PostWrapper>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostDate>{formatDate(post.date)}</PostDate>
        </PostHeader>
        <PostImage src={post.image} alt={post.title} />
        <PostContent>
          {post.content}
        </PostContent>
        <Navigation>
          <LinkButton to="/blog">
            ← Back to Blog
          </LinkButton>
          <LinkButton to="/" primary>
            Home
          </LinkButton>
        </Navigation>
      </PostWrapper>
    </BaseLayout>
  );
};

export default PostPage;
