"use client";
import DeleteArticlePopup from "@/app/components/articles/DeleteArticlePopup";
import Pagination from "@/app/components/articles/pagination";
import { IComment } from "@/app/components/CommentItem/CommentItem";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";

const CommentsTable = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [open, setOpen] = useState(false);
  const [DelId, setDelId] = useState(-1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/comments/${id}`)
      .then((res) => {
        toast.success("Comment deleted successfully");
        setComments(comments.filter((comment) => comment.id !== id));
        setOpen(false);
        setDelId(-1);
      })
      .catch((err) => {
        console.log(err.response);
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
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="border-t border-purple-200 hover:bg-purple-50 transition text-xl text-center"
              >
                <td className="px-4 py-5">{comment.text}</td>

                <td className="px-4 py-3 text-gray-600">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
                      onClick={() => {
                        setDelId(comment.id);
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

      <DeleteArticlePopup
        isOpen={open}
        onClose={() => setOpen(false)}
        handleDelete={handleDelete}
        id={DelId}
      />
    </div>
  );
};

export default CommentsTable;
