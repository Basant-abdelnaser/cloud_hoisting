import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
const AdminSidbar = () => {
  return (
    <div className="h-screen mt-15 bg-gray-200  p-7 shadow-md">
      <Link href="/admin">
        <div className="flex items-center gap-2 text-purple-900">
          <LuLayoutDashboard size={25} />
          <h1 className="text-2xl font-bold ">Dashboard</h1>
        </div>
      </Link>
      <div>
        <ul>
          <Link href="/admin/article-table">
            <li className="flex items-center gap-2 text-purple-900 mt-5 border-purple-900 border-b-2 w-fit">
              <h2 className="text-xl font-bold   ">Articles</h2>
              <MdOutlineArticle size={22} />
            </li>
          </Link>
          <Link href="/admin/comments-table">
            <li className="flex items-center gap-2 text-purple-900 mt-5 border-purple-900 border-b-2 w-fit">
              <h2 className="text-xl font-bold   ">Comments</h2>
              <FaRegComments size={22} />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidbar;
