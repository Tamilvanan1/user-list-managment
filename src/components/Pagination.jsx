import React from 'react';

const Pagination = ({ page, total, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: total }, (_, i) => i + 1).map(p => (
      <button key={p} disabled={p === page} onClick={() => onPageChange(p)}>
        {p}
      </button>
    ))}
  </div>
);

export default Pagination;
