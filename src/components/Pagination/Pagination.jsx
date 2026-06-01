import React, { useEffect, useRef, useState } from "react";
import "./Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  maxVisiblePages = 7
}) => {
  const buttonRefs = useRef([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentBtn = buttonRefs.current[currentPage - 1];
    if (currentBtn) {
      const rect = currentBtn.getBoundingClientRect();
      const parentRect = currentBtn.parentElement.getBoundingClientRect();

      setUnderline({
        left: rect.left - parentRect.left,
        width: rect.width
      });
    }
  }, [currentPage, totalPages]);

  const generatePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const first = 1;
    const last = totalPages;
    const sideCount = 1;
    const middleCount = maxVisiblePages - 4;

    pages.push(first);

    let left = Math.max(currentPage - Math.floor(middleCount / 2), 2);
    let right = Math.min(currentPage + Math.floor(middleCount / 2), totalPages - 1);

    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");

    pages.push(last);

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="pagination-container">
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="pagination-dots">…</span>
        ) : (
          <button
            key={p}
            ref={(el) => (buttonRefs.current[p - 1] = el)}
            className={`pagination-btn ${p === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <div
        className="pagination-underline"
        style={{
          left: underline.left,
          width: underline.width
        }}
      />
    </div>
  );
};

export default Pagination;