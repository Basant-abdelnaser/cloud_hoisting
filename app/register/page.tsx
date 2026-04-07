import React from "react";
import RegisterForm from "./registerForm";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      <div className=" p-8 rounded-lg shadow-md w-full lg:w-1/2 bg-white">
        <h1 className="text-4xl font-bold mb-15 text-purple-900 ">Create New Account</h1>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
