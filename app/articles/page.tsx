"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import ArticleItem from "../components/articles/ArticleItem";
import { Article } from "../utils/interfaces";
import SearchArticlesInput from "../components/articles/SearchArticlesInput";
import Pagination from "../components/articles/pagination";
import { useSearchParams } from "next/navigation";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [error, setError] = useState<string>("");

  // const setPageHandler = (page: number) => setPage(page);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get<Article[]>(
          `https://cloud-hoisting-six.vercel.app/api/articles?page=${page}`,
        );
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
        throw new Error("Failed to load articles");
      }
    };

    getArticles();
  }, [page]);

  if (error) return <h1>{error}</h1>;

  return (
    <div className="mt-20 mx-auto  p-3">
      <div className="mb-10 max-w-6xl md:mx-8 lg:mx-auto ">
        <SearchArticlesInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl  mb-5  md:mx-8 lg:mx-auto">
        {articles.map((article) => (
          <div key={article.id} className="min-w-75">
            <ArticleItem article={article} />
          </div>
        ))}
      </div>
      <div className="mt-15">
        <Pagination />
      </div>
    </div>
  );
};

export default ArticlesPage;
