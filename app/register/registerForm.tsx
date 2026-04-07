"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [RegData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!RegData.email) {
      setEmailError("Email is required");
      toast.error("Login Error");
      isValid = false;
    }
    if (!RegData.username) {
      setUsernameError("Username is required");
      toast.error("Username Error");
      isValid = false;
    }

    if (!RegData.password) {
      setPasswordError("Password is required");
      toast.error("Password Error");
      isValid = false;
    } else if (RegData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      toast.error("Password Error");
      isValid = false;
    }

    if (!isValid) return;
    toast.success("Login Successful");

    console.log(RegData);
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${emailError ? "border-red-600" : ""}`}
        type="text"
        placeholder="email"
        value={RegData.email}
        onChange={(e) => {
          setRegData({ ...RegData, email: e.target.value });
          if (emailError) setEmailError("");
        }}
      />
      {emailError && <p className="text-red-600">{emailError}</p>}
      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${emailError ? "border-red-600" : ""}`}
        type="text"
        placeholder="username"
        value={RegData.username}
        onChange={(e) => {
          setRegData({ ...RegData, username: e.target.value });
          if (usernameError) setUsernameError("");
        }}
      />
      {usernameError && <p className="text-red-600">{usernameError}</p>}

      <input
        className={`border-2 border-gray-400 p-2 rounded-lg shadow-md ${passwordError ? "border-red-600" : ""}`}
        type="password"
        placeholder="password"
        value={RegData.password}
        onChange={(e) => {
          setRegData({ ...RegData, password: e.target.value });
          if (passwordError) setPasswordError("");
        }}
      />
      {passwordError && <p className="text-red-600">{passwordError}</p>}

      <button className="bg-purple-900 px-5 py-2 text-white rounded-2xl text-lg hover:bg-purple-700 transition-all duration-300">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
