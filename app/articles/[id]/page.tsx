"use client";
import AddComment from "@/app/components/comment/AddComment";
import CommentItem from "@/app/components/CommentItem/CommentItem";
import Spinner from "@/app/components/spinner/spinner";
import { Article } from "@/app/utils/interfaces";
import { useEffect, useState, use } from "react";
import { IComment } from "@/app/components/CommentItem/CommentItem";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import EditModal from "@/app/components/EditModal/EditModal";

export interface ArticleDetailsProps {
  params: Promise<{ id: string }>;
  searchParams: URLSearchParams;
}

export default function ArticleDetails({ params }: ArticleDetailsProps) {
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);
  const [commentsList, setCommnetsList] = useState<IComment[] | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleDelete = async (id: number) => {
    if (!commentsList) return;

    const newCommentsList: IComment[] = commentsList.filter(
      (comment) => comment.id !== id,
    );

    setCommnetsList(newCommentsList);
  };

  useEffect(() => {
    fetch(`https://cloud-hoisting-six.vercel.app/api/articles/${id}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then(async (data) => {
        setArticle(data);
        setCommnetsList(data.comments);
        console.log(data);
        // router.refresh();
      });

    axios
      .get(`http://localhost:3000/api/me`)
      .then((res) => {
        if (!res.data.token) return;
        setUser(jwtDecode(res.data.token));
        console.log(user);
      })
      .catch((err) => console.log("errooorr", err.response.data.error));
  }, [id]);

  if (!article)
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );

  if (!commentsList) return <Spinner />;
  const mappedComments = commentsList.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      user={user}
      handleDel={handleDelete}
    />
  ));

  const CommentsHandler = (data: IComment[]): void => {
    setCommnetsList(data);
  };

  return (
    <div className="mt-30 mx-auto w-full lg:w-1/2 md:w-3/4 mb-20 px-5">
      <div className=" bg-gray-100 p-9 rounded-lg shadow-md mb-10 ">
        <h1 className="text-2xl lg:text-3xl  font-bold mb-4">
          {article.title}
        </h1>
        <p className="text-gray-500 text-sm mb-4">
          {new Date(article.createdAt).toDateString()}
        </p>
        <p className="text-xl">{article.description}</p>
      </div>
      <div>
        <AddComment articleId={article.id} commentsHandler={CommentsHandler} />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <div className="flex flex-col gap-4">
          {mappedComments?.length === 0 ? "No comments yet" : mappedComments}
        </div>
      </div>
    </div>
  );
}
