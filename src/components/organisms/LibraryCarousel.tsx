"use client";

import React, { useState } from "react";
import GrantCard from "../molecules/GrantCard";
import ConnectWallet from "../molecules/ConnectWallet";

const LibraryCarousel = () => {
  const [activeButton, setActiveButton] = useState("Library");
  return (
    <div className=" max-w-[420px] w-full flex flex-col  bg-white rounded-[10px] h-full">
      <div className=" flex  items-center">
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "Library" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tl-[10px]"
          }`}
          onClick={() => setActiveButton("Library")}
        >
          Library
        </button>
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "Studio" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tr-[10px]"
          }`}
          onClick={() => setActiveButton("Studio")}
        >
          Studio
        </button>
      </div>
      <div className="grid place-items-center flex-1">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default LibraryCarousel;
