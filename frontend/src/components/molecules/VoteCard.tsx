"use client";
import { useState } from "react";

interface cardProps {
  name: string;
  address: string;
  totalToken: number;
}

const VoteCard = (card: cardProps) => {
  const [showmore, setShowmore] = useState(false);
  return (
    <div className=" p-8 flex flex-col gap-4 w-full bg-[#DEE6E5] rounded-[20px]">
      <p className=" text-xl font-medium">{card.name}</p>
      <div className=" flex justify-between items-center">
        <div className=" p-4 flex items-center gap-2.5  rounded-[10px] bg-[#313B3D] text-white">
          <p className=" max-w-[480px] overflow-hidden">{card.address}</p>
          <img src="/export.svg" alt="" />
        </div>
        <div className=" w-[125px] p-4 rounded-[10px] bg-[#313B3D] grid place-items-center">
          <p className=" text-white">{card.totalToken}</p>
        </div>
        <button>
          <img src="/down.svg" alt="" onClick={() => setShowmore(!showmore)} />
        </button>
      </div>
      {showmore && (
        <div className=" flex flex-col gap-8 pt-4 items-start">
          <div className=" flex flex-col gap-4">
            {[1, 1, 1].map(() => (
              <div className=" flex gap-8  items-center">
                <div className=" flex gap-8 w-[450px]">
                  <div className=" p-4 w-full gap-4 bg-white rounded-[10px] flex">
                    <p className=" ">dsnbnmbmdssd</p>
                    <img src="/export-d.svg" alt="" />
                  </div>
                  <input className=" p-4 w-[125px] bg-white rounded-[10px]"/>
                </div>
                <p className=" ">USDT</p>
              </div>
            ))}
          </div>

          <button className=" py-4 px-8 rounded-[5px] text-sm font-semibold bg-green-600 text-white flex items-center">
            Submit Allocation
          </button>
        </div>
      )}
    </div>
  );
};

export default VoteCard;
