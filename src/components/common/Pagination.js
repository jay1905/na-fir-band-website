import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PageButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme, $active }) => 
    $active ? theme.colors.accent : theme.colors.border};
  background-color: ${({ theme, $active }) => 
    $active ? theme.colors.accent : 'transparent'};
  color: ${({ theme, $active }) => 
    $active ? 'white' : theme.colors.text};
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
`;

const Ellipsis = styled.span`
  color: ${({ theme }) => theme.colors.lightText};
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

const generatePageNumbers = (currentPage, totalPages) => {
  const pages = [];

  if (totalPages <= 5) {
    // Show all pages if total is 5 or less
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      // Near the start
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
};

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onChange,
  ...props 
}) => {
  const pageNumbers = generatePageNumbers(currentPage, totalPages);

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationWrapper {...props}>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous page"
      >
        ←
      </PageButton>

      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>
        ) : (
          <PageButton
            key={page}
            $active={currentPage === page}
            onClick={() => handlePageChange(page)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </PageButton>
        )
      ))}

      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next page"
      >
        →
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
