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
      .get("https://cloud-hoisting-six.vercel.app/api/comments")
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios
      .delete(`https://cloud-hoisting-six.vercel.app/api/comments/${id}`)
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
    <div className="mt-18 px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-900 mb-6">
        Comments
      </h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-xs sm:text-sm md:text-base text-left">
          <thead className="bg-purple-100 text-purple-900 text-sm sm:text-lg md:text-2xl">
            <tr className="text-center">
              <th className="px-2 sm:px-4 py-3 sm:py-4">Title</th>
              <th className="px-2 sm:px-4 py-3 sm:py-4">Created At</th>
              <th className="px-2 sm:px-4 py-3 sm:py-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="border-t border-purple-200 hover:bg-purple-50 transition text-sm sm:text-lg md:text-xl text-center"
              >
                {/* Title */}
                <td className="px-2 sm:px-4 py-3 sm:py-5 wrap-break-words max-w-37.5 sm:max-w-none">
                  {comment.text}
                </td>

                {/* Date */}
                <td className="px-2 sm:px-4 py-3 text-gray-600">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-2 sm:px-4 py-3">
                  <div className="flex justify-center">
                    <button
                      className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition cursor-pointer"
                      onClick={() => {
                        setDelId(comment.id);
                        setOpen(true);
                      }}
                    >
                      <span className="hidden sm:inline">Delete</span>
                      <CiTrash />
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
