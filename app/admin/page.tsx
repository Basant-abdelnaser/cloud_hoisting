import React from "react";
import AddArticleForm from "./AddArticleForm";
import AdminSidbar from "./AdminSidbar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { User } from "../components/header/Header";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token || token === "undefined") {
    return redirect("/");
  }

  const user = jwtDecode(token!) as User;

  if (!user.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex bg-gray-100 mt-22 ">
      {/* Sidebar */}

      {/* Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-5 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-900">
            Add New Article
          </h1>

          <AddArticleForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
