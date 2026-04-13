"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { set } from "zod";
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
      settitleError("title is required");

      isValid = false;
    }

    if (!articleData.description) {
      setdescError("decription is required");
      isValid = false;
    }

    if (!isValid) return;
    setLoading(true);
    axios
      .post("http://localhost:3000/api/articles", articleData)
      .then((res) => {
        toast.success("Article Added Successfully");
        setArticleData({ title: "", description: "" });
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        console.log(err.response);
        setLoading(false);
      });
  };

  return (
    <div>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <input
          className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${titleError ? "border-red-600" : ""}`}
          type="text"
          placeholder="Enter Article Title"
          value={articleData.title}
          onChange={(e) => {
            setArticleData({ ...articleData, title: e.target.value });
            if (titleError) settitleError("");
          }}
        />
        {titleError && <p className="text-red-600">{titleError}</p>}

        <textarea
          className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${descError ? "border-red-600" : ""}`}
          rows={4}
          cols={50}
          placeholder="Enter Article Description"
          value={articleData.description}
          onChange={(e) => {
            setArticleData({ ...articleData, description: e.target.value });
            if (descError) setdescError("");
          }}
        />
        {descError && <p className="text-red-600">{descError}</p>}

        <button
          className={` px-5 py-2 text-white rounded-2xl text-lg transition-all duration-300 ${loading ? "cursor-not-allowed bg-purple-200 hover:bg-purple-200" : "bg-purple-900 hover:bg-purple-700 cursor-pointer "}`}
        >
          {loading ? <Spinner /> : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddArticleForm;
