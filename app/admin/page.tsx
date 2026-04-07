import React from "react";
import AddArticleForm from "./AddArticleForm";

const AdminPage = () => {
  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className=" p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">
          Add New Article
        </h1>
        <div>
          <AddArticleForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
