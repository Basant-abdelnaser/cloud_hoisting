"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/spinner/spinner";

const AddArticleForm = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
  });

  const [titleError, settitleError] = useState("");
  const [descError, setdescError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!articleData.title) {
      settitleError("Title is required");
      isValid = false;
    }

    if (!articleData.description) {
      setdescError("Description is required");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    axios
      .post("https://cloud-hoisting-six.vercel.app/api/articles", articleData)
      .then(() => {
        toast.success("Article Added Successfully");
        setArticleData({ title: "", description: "" });
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Title */}
      <div>
        <input
          type="text"
          placeholder="Article Title"
          value={articleData.title}
          onChange={(e) => {
            setArticleData({ ...articleData, title: e.target.value });
            if (titleError) settitleError("");
          }}
          className={`w-full border rounded-lg px-3 py-2 text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-purple-500
            ${titleError ? "border-red-500" : "border-gray-300"}`}
        />
        {titleError && (
          <p className="text-red-500 text-sm mt-1">{titleError}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <textarea
          rows={5}
          placeholder="Article Description"
          value={articleData.description}
          onChange={(e) => {
            setArticleData({ ...articleData, description: e.target.value });
            if (descError) setdescError("");
          }}
          className={`w-full border rounded-lg px-3 py-2 text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none
            ${descError ? "border-red-500" : "border-gray-300"}`}
        />
        {descError && <p className="text-red-500 text-sm mt-1">{descError}</p>}
      </div>

      {/* Button */}
      <button
        disabled={loading}
        className={`w-full py-2.5 rounded-lg text-white font-medium transition
          ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-800"
          }`}
      >
        {loading ? <Spinner /> : "Add Article"}
      </button>
    </form>
  );
};

export default AddArticleForm;
