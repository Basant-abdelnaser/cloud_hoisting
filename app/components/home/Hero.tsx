import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";
import CloudImg from "../../../public/cloud-hosting.png";

const Hero = () => {
  return (
    <div className="mt-22 flex flex-col lg:flex-row px-2 justify-around items-center gap-2.5 ">
      <div className="sm:shadow-2xl  rounded-lg shadow-md md:w-lg  sm:w-md p-7">
        <h1 className="text-4xl font-bold mb-5">Cloud Hoisting</h1>
        <p className="text-lg">
          The best web hoisting solution for your online success
        </p>
        <div className="mt-5 flex flex-col gap-2 ">
          <div className="flex items-center gap-1 text-gray-500 font-bold  text-lg">
            <TiTick /> Easy To Use Control Panel
          </div>
          <div className="flex items-center gap-1 text-gray-500 font-bold  text-lg">
            <TiTick /> Secure Hoisting
          </div>
          <div className="flex items-center gap-1 text-gray-500 font-bold  text-lg">
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image
          src={CloudImg}
          alt="cloud hosting"
          width={500}
          height={500}
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
