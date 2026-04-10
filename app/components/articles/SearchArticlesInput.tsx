"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchArticlesInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/articles/search?q=${searchText}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md  w-full `}
        type="search"
        placeholder="Search Articles..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
    </form>
  );
};

export default SearchArticlesInput;
