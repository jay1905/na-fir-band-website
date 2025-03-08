import React, { useEffect, useState, useRef } from 'react';
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
import { useSite } from '../contexts/SiteContext';

const Main = styled.main.attrs(({ theme }) => ({
  style: {
    padding: `${theme.spacing.xl} 0`
  }
}))``;

const PostsGrid = styled.div.attrs(({ theme }) => ({
  style: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl
  }
}))`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Post = styled.article.attrs(({ theme }) => ({
  style: {
    background: theme.colors.cardBg,
    opacity: 0,
    transform: 'translateY(20px)'
  }
}))`
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  will-change: transform, opacity;
  visibility: visible;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PostContent = styled.div.attrs(({ theme }) => ({
  style: {
    padding: theme.spacing.lg
  }
}))``;

const PostTitle = styled.h2.attrs(({ theme }) => ({
  style: {
    margin: `0 0 ${theme.spacing.sm}`,
    color: theme.colors.text
  }
}))`
  font-size: 1.5rem;
`;

const PostDate = styled.time.attrs(({ theme }) => ({
  style: {
    color: theme.colors.lightText,
    marginBottom: theme.spacing.sm
  }
}))`
  font-size: 0.9rem;
  display: block;
`;

const PostExcerpt = styled.p.attrs(({ theme }) => ({
  style: {
    margin: `0 0 ${theme.spacing.lg}`,
    color: theme.colors.text
  }
}))`
  line-height: 1.6;
`;

const HomePage = () => {
  const { posts, isLoading, error, totalPages } = usePosts(1, 6);
  const { reveal, isComplete } = useSite();
  const [currentPage, setCurrentPage] = useState(1);
  const postsRef = useRef([]);

  useEffect(() => {
    if (!isComplete || !posts.length) return;

    // Wait for posts to be mounted
    const timer = setTimeout(() => {
      const elements = posts.map((_, index) => document.querySelector(`#post-${index}`));
      
      // Only proceed if all elements are found and valid
      if (elements.every(el => el?.getBoundingClientRect)) {
        const cleanups = elements.map((element, index) => 
          reveal(element, {
            delay: 1200 + (150 * index), // Start after intro with consistent spacing
            distance: '20px',
            origin: 'bottom',
            duration: 600,
            easing: 'cubic-bezier(0.5, 0, 0, 1)',
            cleanup: true,
            scale: 1,
            opacity: 0,
            mobile: true,
            container: document.documentElement,
            beforeReveal: (el) => {
              // Ensure element is still valid
              return document.body.contains(el);
            }
          })
        );

        // Store refs for cleanup
        postsRef.current = cleanups;
      }
    }, 200); // Wait for DOM to stabilize

    return () => {
      clearTimeout(timer);
      postsRef.current.forEach(cleanup => cleanup && cleanup());
      postsRef.current = [];
    };
  }, [posts, reveal, isComplete]);

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
