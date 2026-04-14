"use client";

import { Article } from "@/app/utils/interfaces";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import Pagination from "@/app/components/articles/pagination";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import DeletePopup from "@/app/components/articles/DeleteArticlePopup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ArticlesTable = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [open, setOpen] = useState(false);
  const [DelId, setDelId] = useState(-1);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/articles?page=${page}`,
        );
        setArticles(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, [page]);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/articles/${id}`)
      .then(() => {
        setArticles(articles.filter((article) => article.id !== id));
        setOpen(false);
        toast.success("Article deleted successfully");
        setDelId(-1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete article");
      });
  };

  return (
    <div className="mt-22 px-4 ">
      <h1 className="text-2xl md:text-3xl font-bold text-purple-900 mb-6">
        Articles Table
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-sm text-left">
          <thead className="bg-purple-100 text-purple-900 text-2xl">
            <tr className="text-center">
              <th className="px-4 py-4">Title</th>
              <th className="px-4 py-4">Created At</th>
              <th className="px-4 py-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr
                key={article.id}
                className="border-t border-purple-200 hover:bg-purple-50 transition text-xl text-center"
              >
                <td className="px-4 py-5">{article.title}</td>

                <td className="px-4 py-3 text-gray-600">
                  {new Date(article.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
                      onClick={() => {
                        router.push(`/admin/article-table/edit/${article.id}`);
                      }}
                    >
                      Edit <FaRegEdit />
                    </button>

                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
                      onClick={() => {
                        setDelId(article.id);
                        setOpen(true);
                      }}
                    >
                      Delete <CiTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10">
        <Pagination />
      </div>
      <DeletePopup
        isOpen={open}
        onClose={() => setOpen(false)}
        handleDelete={handleDelete}
        id={DelId}
      />
    </div>
  );
};

export default ArticlesTable;
