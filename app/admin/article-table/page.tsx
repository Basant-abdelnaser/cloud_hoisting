import { User } from "@/app/components/header/Header";
import { Article } from "@/app/utils/interfaces";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ArticlesTable from "./ArticlesTable";

const page = async () => {
  const token = (await cookies()).get("token")?.value;
  console.log("token from admin", token);
  if (!token || token === "undefined") {
    return redirect("/");
  }
  const user = jwtDecode(token!) as User;
  if (!user.isAdmin) {
    redirect("/");
  }

  return <ArticlesTable />;
};

export default page;
