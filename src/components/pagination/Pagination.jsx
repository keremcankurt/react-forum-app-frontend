import React from 'react';
import './pagination.scss';

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const pageNumbers = [];
  

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (totalItems < 5) {
    return null;
  }


  return (
    <nav>
      <ul className='pagination'>
        <li className={`page-item${currentPage <= 1 ? ' disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className='page-link'
            disabled={currentPage === 1}
          >
            Önceki
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item${currentPage === number ? ' active' : ''}`}>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item${currentPage === pageNumbers.length ? ' disabled' : ''}`}>
          <button
            onClick={() => paginate(currentPage + 1)}
            className='page-link'
            disabled={currentPage === pageNumbers.length}
          >
            Sonraki
          </button>
        </li>
      </ul>
    </nav>
  );
}
