"use client";

import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "About", path: "/about" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <header className="bg-gray-200 shadow-md fixed  w-full">
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
                className={`"hover:text-purple-900 hover:text-xl ease-in-out transition-all duration-300" ${active === link.name ? "text-purple-900 text-xl" : ""}`}
                onClick={() => setActive(link.name)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex gap-4 font-semibold">
          <Link
            href="/login"
            className={`hover:bg-purple-900 hover: hover:text-white  hover:px-4  hover:py-1  hover:rounded-md  ease-in-out transition-all duration-300 ${active === "Login" ? "text-white bg-purple-900 px-4 py-1 rounded-md " : ""}`}
            onClick={() => setActive("Login")}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`hover:bg-purple-900 hover: hover:text-white  hover:px-4  hover:py-1  hover:rounded-md  ease-in-out transition-all duration-300 ${active === "Register" ? "text-white bg-purple-900 px-4 py-1 rounded-md " : ""}`}
            onClick={() => setActive("Register")}
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
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
            <Link
              href="/login"
              className={`hover:bg-purple-900 hover: hover:text-white  hover:px-4  hover:py-1  hover:rounded-md  ease-in-out transition-all duration-300 ${active === "Register" ? "text-white bg-purple-900 px-4 py-1 rounded-md " : ""}`}
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`hover:bg-purple-900 hover: hover:text-white  hover:px-4  hover:py-1  hover:rounded-md  ease-in-out transition-all duration-300 ${active === "Register" ? "text-white bg-purple-900 px-4 py-1 rounded-md " : ""}`}
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
