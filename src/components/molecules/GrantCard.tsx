import React from "react";
import Emoji from "../atoms/Emoji";

interface ICard {
  institution: string;
  href: string;
  emoji: string;
}

const GrantCard = (card: ICard) => {
  return (
    <a href={card.href}>
      <div className=" p-4 gap-4 flex flex-col items-center bg-[#DEE6E5] rounded-[10px]">
        <div className="p-6 grid place-items-center bg-[#ffffff] rounded-full">
          <Emoji className="w-14 text-5xl" emoji={card.emoji} />
        </div>
        <p className=" text-xl font-semibold">{card.institution}</p>
      </div>
    </a>
  );
};

export default GrantCard;
