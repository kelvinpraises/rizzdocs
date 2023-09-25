import React from "react";

interface ICard {
  institution: string;
}

const GrantCard = (card: ICard) => {
  return (
    <div className=" p-4 gap-4 flex flex-col items-center bg-[#DEE6E5] rounded-[10px]">
      <div className=" w-[100px] h-[100px] bg-white rounded-full"></div>
      <p className=" text-xl font-semibold">{card.institution}</p>
    </div>
  );
};

export default GrantCard;