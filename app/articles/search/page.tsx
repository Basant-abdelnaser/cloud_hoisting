"use client";
import React, { use } from "react";

interface SearchArticlesProps {
  searchParams: Promise<{ q?: string }>;
}

const SearchArticlesPage = ({ searchParams }: SearchArticlesProps) => {
  const params = use(searchParams);

  return (
    <div className="mt-20 fix-height flex flex-col justify-center items-center">
      <h1>Search Page</h1>
      <h1>search text is {params.q}</h1>
    </div>
  );
};

export default SearchArticlesPage;
