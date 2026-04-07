"use client";
import { Article } from "@/app/utils/interfaces";
import { useEffect, useState, use } from "react";

interface ArticleDetailsProps {
  params: Promise<{ id: string }>;
  searchParams: URLSearchParams;
}

export default function ArticleDetails({ params }: ArticleDetailsProps) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="mt-20 mx-auto w-full lg:w-1/2 md:w-3/4 bg-gray-100 p-9 rounded-lg shadow-md mb-20 ">
      <h1 className="text-2xl lg:text-3xl  font-bold mb-4">{article.title}</h1>
      <p className="text-xl">{article.body}</p>
    </div>
  );
}
