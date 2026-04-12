"use client";
import AddComment from "@/app/components/comment/AddComment";
import CommentItem from "@/app/components/CommentItem/CommentItem";
import { Article } from "@/app/utils/interfaces";
import { useEffect, useState, use } from "react";

export interface ArticleDetailsProps {
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
    <div className="mt-30 mx-auto w-full lg:w-1/2 md:w-3/4 mb-20">
      <div className=" bg-gray-100 p-9 rounded-lg shadow-md mb-10 ">
        <h1 className="text-2xl lg:text-3xl  font-bold mb-4">
          {article.title}
        </h1>
        <p className="text-xl">{article.body}</p>
      </div>
      <div>
        <AddComment />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <div className="flex flex-col gap-4">
          <CommentItem />
          <CommentItem />
        </div>
      </div>
    </div>
  );
}
