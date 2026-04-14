"use client";
import Spinner from "@/app/components/spinner/spinner";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { title } from "node:process";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { set } from "zod";

const ArticleEditForm = ({ id }: { id: string }) => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/articles/${id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err.respone);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedArticle = {
      title: article.title,
      description: article.description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/api/articles/${id}`, updatedArticle)
      .then((res) => {
        toast.success(res.data.message);
        setArticle({ title: "", description: "" });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.statusText);
        console.log(err.response);
        console.log("articleee", article);
        console.log(id);
        setLoading(false);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className=" mt-22 p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white  ">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">
          Edit Article
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={article.title}
            placeholder="title"
            onChange={(e) => setArticle({ ...article, title: e.target.value })}
            className="border-2 border-gray-400 p-2 rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2 ease-in-out transition-all duration-300  "
          />
          <textarea
            value={article.description}
            onChange={(e) =>
              setArticle({ ...article, description: e.target.value })
            }
            placeholder="description"
            className="border-2 border-gray-400 p-4 pt-2 rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2 ease-in-out transition-all duration-300  "
          />
          <button
            type="submit"
            className="bg-green-500 p-3 text-white rounded-lg cursor-pointer hover:bg-green-600"
          >
            {loading ? <Spinner /> : "Edit Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleEditForm;
