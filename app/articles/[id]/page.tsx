"use client";
import AddComment from "@/app/components/comment/AddComment";
import CommentItem from "@/app/components/CommentItem/CommentItem";
import Spinner from "@/app/components/spinner/spinner";
import { Article } from "@/app/utils/interfaces";
import { useEffect, useState, use } from "react";
import { Comment } from "@/app/components/CommentItem/CommentItem";

export interface ArticleDetailsProps {
  params: Promise<{ id: string }>;
  searchParams: URLSearchParams;
}

export default function ArticleDetails({ params }: ArticleDetailsProps) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  if (!article)
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );
  const comments = article.comments as Comment[] | undefined;
  if (!comments) return null;
  const commentList = comments?.map((comment) => (
    <CommentItem key={comment.id} comment={comment} />
  ));

  return (
    <div className="mt-30 mx-auto w-full lg:w-1/2 md:w-3/4 mb-20">
      <div className=" bg-gray-100 p-9 rounded-lg shadow-md mb-10 ">
        <h1 className="text-2xl lg:text-3xl  font-bold mb-4">
          {article.title}
        </h1>
        <p className="text-xl">{article.description}</p>
      </div>
      <div>
        <AddComment />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <div className="flex flex-col gap-4">
          {comments?.length === 0 ? "No comments yet" : commentList}
        </div>
      </div>
    </div>
  );
}
