import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      <div className=" p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">Login</h1>
        <div>
        <LoginForm/>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
