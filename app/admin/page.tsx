import React from "react";
import AddArticleForm from "./AddArticleForm";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { User } from "../components/header/Header";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const token = (await cookies()).get("token")?.value;
  console.log("token from admin", token);
  if (!token || token === "undefined") {
    return redirect("/");
  }
  const user = jwtDecode(token!) as User;
  if (!user.isAdmin) {
    redirect("/");
  }
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
