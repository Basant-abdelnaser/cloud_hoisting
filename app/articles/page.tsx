"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ArticleItem from "../components/articles/ArticleItem";
import { Article } from "../utils/interfaces";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get<Article[]>(
          "https://jsonplaceholder.typicode.com/posts",
        );
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load articles");
        throw new Error("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl  mt-20 md:mx-8 lg:mx-auto">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticlesPage;
