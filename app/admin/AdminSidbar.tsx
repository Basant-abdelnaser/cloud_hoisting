import Link from "next/link";
import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";

const AdminSidbar = () => {
  return (
    <div className="h-screen mt-15 bg-gray-200 p-4 md:p-6 shadow-md w-16 md:w-64 transition-all duration-300 fixed">
      {/* Dashboard */}
      <Link href="/admin">
        <div
          className="flex items-center justify-center md:justify-start gap-3 
                        text-purple-900 hover:bg-purple-100 p-2 rounded-lg transition"
        >
          <LuLayoutDashboard size={25} />
          <span className="hidden md:inline text-lg font-bold">Dashboard</span>
        </div>
      </Link>

      {/* Links */}
      <ul className="mt-6 space-y-4">
        <Link href="/admin/article-table">
          <li
            className="flex items-center justify-center md:justify-start gap-3 
                         text-purple-900 hover:bg-purple-100 p-2 rounded-lg transition cursor-pointer"
          >
            <MdOutlineArticle size={25} />
            <span className="hidden md:inline text-lg font-semibold">
              Articles
            </span>
          </li>
        </Link>

        <Link href="/admin/comments-table">
          <li
            className="flex items-center justify-center md:justify-start gap-3 
                         text-purple-900 hover:bg-purple-100 p-2 rounded-lg transition cursor-pointer"
          >
            <FaRegComments size={25} />
            <span className="hidden md:inline text-lg font-semibold">
              Comments
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminSidbar;
