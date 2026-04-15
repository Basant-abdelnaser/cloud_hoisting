import React from "react";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const token = await (await cookies()).get("token")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 p-2 ">
      <div className=" p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">Login</h1>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
