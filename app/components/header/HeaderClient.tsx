"use client"

import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import {  useState } from "react";
import { Menu, X } from "lucide-react";
import { User } from "./Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";

const HeaderClient = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "About", path: "/about" },
    { name: "Admin", path: "/admin" },
  ];

  const handleLogout = async () => {
    axios
      .get("http://localhost:3000/api/users/logout")
      .then((res) => {
        Cookies.remove("token");
        toast.success("Logout Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  

  return (
    <header className="bg-gray-200 shadow-md fixed w-full">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-purple-900"
        >
          <span>Cloud</span>
          <GrTechnology />
          <span>Hoisting</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className={`hover:text-purple-900 hover:text-xl transition-all duration-300 ${
                  active === link.name ? "text-purple-900 text-xl" : ""
                }`}
                onClick={() => setActive(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex gap-4 font-semibold">
          {user ? (
            <>
              <span className="text-purple-900">{user.username}</span>

              <Link
                href="/login"
                onClick={handleLogout}
                className="hover:bg-red-500 hover:text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setActive("Login")}
                className="hover:bg-purple-900 hover:text-white px-4 py-1 rounded-md transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setActive("Register")}
                className="hover:bg-purple-900 hover:text-white px-4 py-1 rounded-md transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 px-6 pb-4">
          <ul className="flex flex-col gap-4 font-semibold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path} onClick={() => setOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex gap-4 mt-4">
            {user ? (
              <>
                <span>{user.username}</span>
                <Link href="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderClient;
