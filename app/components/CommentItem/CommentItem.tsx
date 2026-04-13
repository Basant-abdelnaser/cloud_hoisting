import { FaRegEdit } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditModal from "../EditModal/EditModal";
export interface IComment {
  id: number;
  text: string;
  articleId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    username: string;
  };
}

const CommentItem = ({
  comment,
  user,
  handleDel,
}: {
  comment: IComment;
  user: any;
  handleDel: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState(comment.text);
  const router = useRouter();

  const getNewComment = (newComment: string) => {
    axios
      .put(`http://localhost:3000/api/comments/${comment.id}`, {
        text: newComment,
      })
      .then(() => {
        toast.success("Comment updated successfully");
        setNewComment(newComment);
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
        throw new Error("Failed to update comment");
      });
  };

  const handleDelete = () => {
    try {
      axios
        .delete(`http://localhost:3000/api/comments/${comment.id}`)
        .then(() => {
          toast.success("Comment deleted successfully");
        });
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete comment");
    }
  };

  return (
    <div>
      <div className="bg-purple-100 rounded-md p-4  flex flex-col gap-3 border border-purple-900 shadow-lg">
        <div className="flex justify-between items-center text-xl mb-3">
          <strong>{comment.user?.username || "Unknown"}</strong>
          <p className="text-white bg-purple-900 rounded-full px-2 ">
            {new Date(comment.updatedAt).toLocaleString()}
          </p>
        </div>
        <div>
          <p>{newComment}</p>
        </div>
        { user && user.id === comment.userId && (
          <div className="flex justify-end gap-3">
            <button
              className="p-2 rounded-full hover:bg-purple-200 transition-all duration-200 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaRegEdit
                size={20}
                className="text-purple-700 hover:scale-110 transition-transform"
              />
            </button>

            <button
              className="p-2 rounded-full hover:bg-red-100 transition-all duration-200 cursor-pointer"
              onClick={() => {
                handleDelete();
                handleDel(comment.id);
              }}
            >
              <CiTrash
                size={20}
                className="text-red-600 hover:scale-110 transition-transform"
              />
            </button>
          </div>
        )}
      </div>
      <EditModal
        setNewComment={getNewComment}
        isOpen={open}
        onClose={() => setOpen(false)}
        comment={comment.text}
      />
    </div>
  );
};

export default CommentItem;
