"use client";
import React, { useState } from "react";

const pages = [1, 2, 3, 4, 5];

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex justify-center items-center gap-2  mb-5">
    
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-3 py-1 rounded-lg bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => {
            setCurrentPage(page);
            console.log(page);
          }}
          className={`w-10 h-10 rounded-full text-lg transition-all
            ${
              currentPage === page
                ? "bg-purple-900 text-white scale-110"
                : "bg-gray-200 text-black hover:bg-purple-200"
            }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === pages.length}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-3 py-1 rounded-lg bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
