"use client";

import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { User } from "./Header";
import axios from "axios";
import { toast } from "react-toastify";
import { Cookie } from "next/font/google";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import path from "node:path";
import { set } from "zod";

const HeaderClient = ({ user }: { user: User | null }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };
  const router = useRouter();

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
        router.replace("/login");
        router.refresh();
      })
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };
  useEffect(() => {
    console.log(user);
  }, [user?.username]);

  return (
    <header className="bg-gray-200 shadow-md fixed w-full z-70">
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

        <ul className="hidden md:flex gap-6 font-semibold">
          {navLinks.map((link, index) => {
            if (!user?.isAdmin && index === 3) return null;

            return (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`transition-all duration-300 hover:text-purple-900 hover:text-xl ${
                    isActive(link.path) ? "text-purple-900 text-xl" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Auth Section */}
        <div className="hidden md:flex gap-4 font-semibold">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <span className="text-purple-900">
                  {user.username.toUpperCase()}
                </span>

                <Link
                  href="/login"
                  onClick={handleLogout}
                  className="hover:bg-red-500 hover:text-white px-4 py-1 rounded-md transition flex items-center gap-1"
                >
                  Logout
                  <CiLogout size={20} />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`hover:bg-purple-900 hover:text-white px-4 py-1 rounded-md transition  ${pathname === "/login" ? "bg-purple-900 text-white" : ""}`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`hover:bg-purple-900 hover:text-white px-4 py-1 rounded-md transition  ${pathname === "/register" ? "bg-purple-900 text-white" : ""}`}
              >
                Register
              </Link>
            </>
          )}
        </div>
        {/* Mobile Button */}
        <button className="md:hidden z-60" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-100 px-6 pb-4">
          <ul className="flex flex-col gap-4 font-semibold">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`transition-all duration-300 hover:text-purple-900 hover:text-xl ${
                    isActive(link.path) ? "text-purple-900 text-xl" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-5 font-semibold">
            {user ? (
              <>
                <span className="text-purple-900">
                  {user.username.toUpperCase()}
                </span>
                <p
                  className="bg-red-500 text-white px-4 py-1 rounded-md transition flex items-center gap-1"
                  onClick={handleLogout}
                >
                  Logout
                  <CiLogout size={20} />
                </p>
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
