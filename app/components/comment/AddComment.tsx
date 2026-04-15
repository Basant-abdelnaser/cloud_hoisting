"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/navigation";

import { IComment } from "@/app/components/CommentItem/CommentItem";

const AddComment = ({
  articleId,
  commentsHandler,
}: {
  articleId: number;
  commentsHandler: (data: IComment[]) => void;
}) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) {
      toast.error("You Must Write Something");
    } else {
      setLoading(true);
      axios
        .post("https://cloud-hoisting-six.vercel.app/api/comments", {
          text: comment,
          articleId,
        })
        .then((res) => {
          toast.success("Comment Added Successfully");
          setComment("");
          setLoading(false);
          // router.refresh();
          console.log("answer first axios", res.data);

          axios
            .get(`https://cloud-hoisting-six.vercel.app/api/articles/${articleId}`)
            .then((res) => {
              console.log("answer second axios", res.data);
              commentsHandler(res.data.comments as IComment[]);
            })
            .catch((err) => {
              toast.error(err.response.data.error);
              setLoading(false);
            });
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          // console.log(err.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={`border-2 border-gray-400 p-2 rounded-lg shadow-md  w-full mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500 `}
          type="text"
          placeholder="Add New Comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className={`bg-purple-900 py-1 px-3 text-white rounded-md hover:bg-purple-800 transition-all duration-300 cursor-pointer ${loading ? "cursor-not-allowed bg-purple-200" : "cursor-pointer"}`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
