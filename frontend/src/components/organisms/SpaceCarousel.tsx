"use client";

import React, { useState } from "react";
import GrantCard from "../molecules/GrantCard";
import ConnectWallet from "../molecules/ConnectWallet";

const SpaceCarousel = () => {
  const [activeButton, setActiveButton] = useState("info");
  return (
    <div className=" max-w-[420px] w-full flex flex-col  bg-white rounded-[10px] h-full">
      <div className=" flex  items-center">
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "info" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tl-[10px]"
          }`}
          onClick={() => setActiveButton("info")}
        >
          Info
        </button>
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "contributors" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tr-[10px]"
          }`}
          onClick={() => setActiveButton("contributors")}
        >
          Contributors
        </button>
      </div>
      <div className="grid place-items-center flex-1">
        <ConnectWallet />
      </div>
      {/* <div className="flex flex-col gap-8 p-8 overflow-y-scroll">
        <GrantCard institution={"crystalrohr"} />
        <GrantCard institution={"crystalrohr"} />
        <GrantCard institution={"crystalrohr"} />
        <GrantCard institution={"crystalrohr"} />
      </div> */}
    </div>
  );
};

export default SpaceCarousel;
