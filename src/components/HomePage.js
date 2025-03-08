import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageTransition from './common/PageTransition';
import { staggerContainer, fadeInUp } from '../styles/PageAnimation';
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

const PostsGrid = styled(motion.div).attrs(({ theme }) => ({
  style: {
    gap: theme.spacing.lg,
    marginTop: theme.spacing.xl
  }
}))`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const Post = styled(motion.article).attrs(({ theme }) => ({
  style: {
    background: theme.colors.cardBg
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
  const [currentPage, setCurrentPage] = useState(1);

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
    <PageTransition>
      <BaseLayout>
      <IntroSection />
      <Main>
        <PostsGrid
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {posts.map((post, index) => (
            <Post 
              key={post.id}
              variants={fadeInUp}
            >
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
    </PageTransition>
  );
};

export default HomePage;
