"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ArticleItem from "../components/articles/ArticleItem";
import { Article } from "../utils/interfaces";
import SearchArticlesInput from "../components/articles/SearchArticlesInput";
import Pagination from "../components/articles/pagination";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        const res = await axios.get<Article[]>(
          "https://jsonplaceholder.typicode.com/posts",
        );
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
        throw new Error("Failed to load articles");
      }
    };

    getArticles();
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div className="mt-20 mx-auto  ">
      <div className="mb-5  ">
        <SearchArticlesInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mb-5  md:mx-8 lg:mx-auto">
        {articles.slice(0, 9).map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default ArticlesPage;
