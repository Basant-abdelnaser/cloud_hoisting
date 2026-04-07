import React from "react";
import AdminSidbar from "./AdminSidbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard" ,
  description: "This is Admin Dashboard",
};

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="  fixed left-0 top-0">
        <AdminSidbar />
      </div>
      <div className="ml-64 ">{children}</div>
    </div>
  );
};

export default AdminDashboardLayout;
