import React from "react";
import { TiTick } from "react-icons/ti";

const WebHoistingPlan = () => {
  return (
    <div className=" bg-gray-200 p-4 rounded-lg shadow-md text-center hover:-translate-y-8 hover:shadow-2xl ease-in-out transition-all duration-300">
      <h1 className="text-2xl font-bold mb-3 text-purple-900">Premium</h1>
      <strong className="text-3xl mb-3 block">$4.99/mo</strong>
      <p className="text-red-600 bg-red-200 w-fit mx-auto p-1.5 rounded-full text-sm mb-3">
        10% OFF
      </p>
      <h2 className="text-xl font-bold mb-3 text-purple-900">Top Features</h2>
      <ul className="">
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600 mb-3">
          <TiTick /> 100 Website
        </li>
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600 mb-3">
          <TiTick /> 100 GB SSD Storage
        </li>
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600 mb-3">
          <TiTick /> Weekly Backups
        </li>
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600">
          <TiTick /> Unlimited Bandwidth
        </li>
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600 mb-3">
          <TiTick /> Free SSl
        </li>
        <li className=" flex justify-center items-center gap-1.5 text-xl text-green-600 mb-3">
          <TiTick /> Free Email
        </li>
      </ul>
      <button className=" w-full text-purple-900 bg-white border-2 border-purple-900 px-4 py-1 rounded-full hover:bg-purple-900 hover:text-white ease-in-out transition-all duration-300">BUY NOW</button>
    </div>
  );
};

export default WebHoistingPlan;
