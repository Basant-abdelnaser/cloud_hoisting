import React from "react";
import { Geist } from "next/font/google";
import Header from "./components/header/Header";
import Hero from "./components/home/Hero";
import WebHoistingPlan from "./components/home/WebHoistingPlan";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const HomePage = () => {
  return (
    <div className="p-3">
      {/* <h1 className={` ${geistSans.className} text-5xl font-bold text-blue-600 `} >Hello Tailwind</h1> */}
      {/* <h1>Hello Tailwind</h1> */}
      <Hero />
      <h2 className="text-3xl font-bold text-center text-purple-900 mt-15 ">
        Choose Your Web Hoisting Plan
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl  mt-20  mb-20 md:mx-8 lg:mx-auto">
        <WebHoistingPlan />
        <WebHoistingPlan />
        <WebHoistingPlan />
      </div>
    </div>
  );
};

export default HomePage;
