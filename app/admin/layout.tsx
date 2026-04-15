import React from "react";
import AdminSidbar from "./AdminSidbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard",
};

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <div className="fixed md:static z-50">
        <AdminSidbar />
      </div>

      {/* Content */}
      <div className="flex-1 ml-16 md:ml-70 p-4 md:p-8 transition-all">
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
