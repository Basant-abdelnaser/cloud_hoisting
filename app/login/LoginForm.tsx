"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "zod";
import Spinner from "../components/spinner/spinner";

const LoginForm = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let isValid = true;
    e.preventDefault();
    if (!loginData.email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!loginData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (loginData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;
    setLoading(true);
    axios
      .post("http://localhost:3000/api/users/login", loginData)
      .then((res) => {
        toast.success("Login Successful");
        router.replace("/"); //or push
        router.refresh();
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setLoading(false);
      });
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <div>
        <input
          className={`border-2 w-full border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${emailError ? "border-red-500" : ""}`}
          type="text"
          placeholder="email"
          value={loginData.email}
          onChange={(e) => {
            setLoginData({ ...loginData, email: e.target.value });
            if (emailError) setEmailError("");
          }}
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </div>
      <div>
        <input
          className={`border-2 w-full border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${passwordError ? "border-red-500" : ""}`}
          type="password"
          placeholder="password"
          value={loginData.password}
          onChange={(e) => {
            setLoginData({ ...loginData, password: e.target.value });
            if (passwordError) setPasswordError("");
          }}
        />
        {passwordError && <p className="text-red-500">{passwordError}</p>}
      </div>

      <button
        className="bg-purple-900 px-5 py-2 text-white rounded-2xl text-lg hover:bg-purple-700 transition-all duration-300 cursor-pointer disabled:bg-purple-200 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
