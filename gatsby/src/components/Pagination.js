import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
  @media (max-width: 800px) {
    .word {
      display: none;
    }
    font-size: 1.4rem;
  }
`;

export default function Pagination({
  base,
  pageSize,
  totalCount,
  currentPage,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;
  return (
    <PaginationStyles>
      <Link
        title="Prev Page"
        disabled={!hasPrevPage}
        to={`${base}/${prevPage}`}
      >
        &#8592; <span className="word">Prev</span>
      </Link>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          key={`page-${index}`}
          to={`${base}/${index > 0 ? index + 1 : ''}`}
          className={currentPage === 1 && index === 0 ? 'current' : ''}
        >
          {index + 1}
        </Link>
      ))}
      <Link
        title="Next Page"
        disabled={!hasNextPage}
        to={`${base}/${nextPage}`}
      >
        <span className="word">Next</span> &#8594;
      </Link>
    </PaginationStyles>
  );
}
