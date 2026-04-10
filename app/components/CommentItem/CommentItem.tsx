import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";

const CommentItem = () => {
  return (
    <div className="bg-purple-100 rounded-md p-4  flex flex-col gap-3 border border-purple-900 shadow-lg">
      <div className="flex justify-between items-center text-xl mb-3">
        <strong>Basant</strong>
        <p className="text-white bg-purple-900 rounded-full px-2 ">1/1/2026</p>
      </div>
      <div>
        <p>Thanks for this Article</p>
      </div>
      <div className="flex justify-end gap-3">
        <button className="p-2 rounded-full hover:bg-purple-200 transition-all duration-200 cursor-pointer">
          <FaRegEdit
            size={20}
            className="text-purple-700 hover:scale-110 transition-transform"
          />
        </button>

        <button className="p-2 rounded-full hover:bg-red-100 transition-all duration-200 cursor-pointer">
          <CiTrash
            size={20}
            className="text-red-600 hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
