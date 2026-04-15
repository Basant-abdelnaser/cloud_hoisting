"use client";
import { ARTICLE_PER_PAGE } from "@/app/utils/constants";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const currentPage = Number(searchParams.get("page")) || 1;

  const [pages, setPages] = useState<number[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathhhh", pathname);

  const changePage = (page: number) => {
    if (pathname === "/admin/article-table") {
      router.push(`/admin/article-table?page=${page}`);
      console.log(page);
    } else if (pathname === "/articles") {
      router.push(`/articles?page=${page}`);
    }
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/articles/count`);
        console.log(res.data.count);
        // setnumOfPages(Number(res.data.count));

        let allpages = [];
        for (
          let i = 1;
          i <= Math.ceil(res.data.count / ARTICLE_PER_PAGE);
          i++
        ) {
          allpages.push(i);
        }
        setPages(allpages);
        console.log(pages);
      } catch (err) {
        console.error(err);
        throw new Error("Failed to load articles");
      }
    };

    getArticles();
  }, []);

  return (
    <div className="flex justify-center items-center gap-2  mb-5">
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-2 py-1 md:px-3 md:py-1  rounded-lg bg-gray-300 disabled:opacity-50 text-sm md:text-base"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`w-6 h-6 rounded-full  transition-all text-sm md:text-lg
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
        onClick={() => changePage(currentPage + 1)}
        className="px-2 py-1 md:px-3 md:py-1  rounded-lg bg-gray-300 disabled:opacity-50 text-sm md:text-base"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
