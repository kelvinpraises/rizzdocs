"use client";

import React, { useState } from "react";
import GrantCard from "../molecules/GrantCard";

interface carousel {
  type?: string;
  institution?: string[];
  connected?: boolean;
}

const GrantCarousel = () => {
  const link = {
    project: [
      { institution: "crystalrohr", id: 1 },
      { institution: "uveryderiv", id: 2 },
      { institution: "crystals", id: 3 },
    ],
    docfund: [
      { institution: "raspberry", id: 1 },
      { institution: "orange", id: 2 },
      { institution: "mango", id: 3 },
    ],
  };

  const [activeButton, setActiveButton] = useState("projects");
  return (
    <div className=" max-w-[420px] w-full flex flex-col  bg-white rounded-[10px] h-full">
      <div className=" flex  items-center">
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "projects" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tl-[10px]"
          }`}
          onClick={() => setActiveButton("projects")}
        >
          Projects
        </button>
        <button
          className={` px-8 grid place-items-center text-xl font-medium flex-1 h-[70px] ${
            activeButton == "docfunds" &&
            " bg-[#DEE6E5] text-[#647684] rounded-tr-[10px]"
          }`}
          onClick={() => setActiveButton("docfunds")}
        >
          DocFunds
        </button>
      </div>
      <div className="flex flex-col gap-8 p-8 overflow-y-scroll">
        {activeButton == "projects" ? (
          <>
            {link.project.map((item, index) => (
              <GrantCard
                key={index}
                institution={item.institution}
                href={`/grants/projects/${item.id}`}
              />
            ))}
          </>
        ) : (
          <>
            {link.docfund.map((item, index) => (
              <GrantCard
                key={index}
                institution={item.institution}
                href={`/grants/docfunds/${item.id}`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GrantCarousel;
