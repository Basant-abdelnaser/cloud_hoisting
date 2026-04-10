"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!loginData.email) {
      setEmailError("Email is required");
      toast.error("Login Error");
      isValid = false;
    }

    if (!loginData.password) {
      setPasswordError("Password is required");
      toast.error("Password Error");
      isValid = false;
    } else if (loginData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      toast.error("Password Error");
      isValid = false;
    }

    if (!isValid) return;
    toast.success("Login Successful");
    router.replace("/"); //or push
    console.log(loginData);
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${emailError ? "border-red-600" : ""}`}
        type="text"
        placeholder="email"
        value={loginData.email}
        onChange={(e) => {
          setLoginData({ ...loginData, email: e.target.value });
          if (emailError) setEmailError("");
        }}
      />
      {emailError && <p className="text-red-600">{emailError}</p>}

      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${passwordError ? "border-red-600" : ""}`}
        type="password"
        placeholder="password"
        value={loginData.password}
        onChange={(e) => {
          setLoginData({ ...loginData, password: e.target.value });
          if (passwordError) setPasswordError("");
        }}
      />
      {passwordError && <p className="text-red-600">{passwordError}</p>}

      <button className="bg-purple-900 px-5 py-2 text-white rounded-2xl text-lg hover:bg-purple-700 transition-all duration-300">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
