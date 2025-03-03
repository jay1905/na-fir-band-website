import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BaseLayout from './layout/BaseLayout';
import IntroSection from './sections/IntroSection';
import { 
  PostImage,
  LoadingSpinner,
  ErrorMessage,
  LinkButton,
  Pagination 
} from './common';
import { usePosts, formatDate } from '../hooks/usePosts';
import useScrollReveal from '../hooks/useScrollReveal';

const Main = styled.main`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Post = styled.article`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PostTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const PostDate = styled.time`
  color: ${({ theme }) => theme.colors.lightText};
  font-size: 0.9rem;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostExcerpt = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const HomePage = () => {
  const { posts, isLoading, error, totalPages } = usePosts(1, 6);
  const reveal = useScrollReveal();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cleanup = posts.map((_, index) => {
      const element = document.querySelector(`#post-${index}`);
      if (element) {
        return reveal(element, {
          delay: 200 * index,
          distance: '50px',
          origin: 'bottom',
        });
      }
      return () => {};
    });

    return () => cleanup.forEach(clean => clean());
  }, [posts, reveal]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return (
    <BaseLayout>
      <LoadingSpinner />
    </BaseLayout>
  );

  if (error) return (
    <BaseLayout>
      <ErrorMessage message={error} />
    </BaseLayout>
  );

  return (
    <BaseLayout>
      <IntroSection />
      <Main>
        <p>main</p>
        <PostsGrid>
          {posts.map((post, index) => (
            <Post key={post.id} id={`post-${index}`}>
              <PostImage src={post.image} alt={post.title} />
              <PostContent>
                <PostTitle>{post.title}</PostTitle>
                <PostDate>{formatDate(post.date)}</PostDate>
                <PostExcerpt>{post.excerpt}</PostExcerpt>
                <LinkButton to={`/post/${post.slug}`} primary>
                  Read More
                </LinkButton>
              </PostContent>
            </Post>
          ))}
        </PostsGrid>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        )}
      </Main>
    </BaseLayout>
  );
};

export default HomePage;
