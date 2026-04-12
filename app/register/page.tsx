import React from "react";
import RegisterForm from "./registerForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const token = await (await cookies()).get("token")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      <div className=" p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">
          Create New Account
        </h1>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
