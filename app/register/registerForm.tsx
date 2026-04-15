"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "../components/spinner/spinner";
import { set } from "zod";

const RegisterForm = () => {
  const [RegData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!RegData.email) {
      setEmailError("Email is required");
      isValid = false;
    }
    if (!RegData.username) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!RegData.password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (RegData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;
    console.log(RegData);
    setloading(true);
    axios
      .post("https://cloud-hoisting-six.vercel.app/api/users/register", RegData)
      .then((res) => {
        toast.success("Registration Successful");
        router.replace("/"); //or push
        router.refresh();
        setloading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setloading(false);
      });
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <div>
        <input
          className={`border-2 w-full border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${emailError ? "border-red-500" : ""}`}
          type="text"
          placeholder="email"
          value={RegData.email}
          onChange={(e) => {
            setRegData({ ...RegData, email: e.target.value });
            if (emailError) setEmailError("");
          }}
        />

        {emailError && <p className="text-red-600">{emailError}</p>}
      </div>
      <div>
        <input
          className={`border-2 w-full border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${usernameError ? "border-red-500" : ""}`}
          type="text"
          placeholder="username"
          value={RegData.username}
          onChange={(e) => {
            setRegData({ ...RegData, username: e.target.value });
            if (usernameError) setUsernameError("");
          }}
        />
        {usernameError && <p className="text-red-600">{usernameError}</p>}
      </div>
      <div>
        <input
          className={`border-2 w-full border-gray-300 p-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${passwordError ? "border-red-500" : ""}`}
          type="password"
          placeholder="password"
          value={RegData.password}
          onChange={(e) => {
            setRegData({ ...RegData, password: e.target.value });
            if (passwordError) setPasswordError("");
          }}
        />
        {passwordError && <p className="text-red-600">{passwordError}</p>}
      </div>

      <button
        className="bg-purple-900 px-5 py-2 text-white rounded-2xl text-lg hover:bg-purple-700 transition-all duration-300 disabled:bg-purple-200"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
