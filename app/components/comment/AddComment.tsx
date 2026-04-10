"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddComment = () => {
  const [comment, setComment] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) {
      toast.error("You Must Write Something");
    } else {
      toast.success("Comment Added Successfully");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={`border-2 border-gray-400 p-2 rounded-lg shadow-md  w-full mb-5 `}
          type="text"
          placeholder="Add New Comment..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button className="bg-purple-900 py-1 px-3 text-white rounded-md hover:bg-purple-800 transition-all duration-300 cursor-pointer">
          Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
