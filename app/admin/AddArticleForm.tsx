"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddArticleForm = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    desc: "",
  });

  const [titleError, settitleError] = useState("");
  const [descError, setdescError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!articleData.title) {
      settitleError("title is required");
      toast.error("Add Error");
      isValid = false;
    }

    if (!articleData.desc) {
      setdescError("decription is required");
      toast.error("Add Error");
      isValid = false;
    }

    if (!isValid) return;
    toast.success("Added Successfully");

    console.log(articleData);
  };

  return (
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
        value={articleData.desc}
        onChange={(e) => {
          setArticleData({ ...articleData, desc: e.target.value });
          if (descError) setdescError("");
        }}
      />
      {descError && <p className="text-red-600">{descError}</p>}

      <button className="bg-purple-900 px-5 py-2 text-white rounded-2xl text-lg hover:bg-purple-700 transition-all duration-300">
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
