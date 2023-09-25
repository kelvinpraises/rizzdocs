"use client";
import Image from "next/image";
import React from "react";
import Button from "../atoms/Button";

interface ICardProps {
  image?: string;
  title: string;
  text: string;
  buttonText: string;
  buttonOnclick: () => {};
  buttonImg?: string;
}

const Card1 = (card: ICardProps) => {
  return (
    <div className=" p-8 flex flex-col gap-8 bg-[#DEE6E5] rounded-[10px] items-start">
      {card.image && (
        <Image width={40} height={40} src={`/${card.image}`} alt={""} />
      )}
      <div className=" flex flex-col gap-2">
        <p className=" text-xl font-semibold">{card.title}</p>
        <p>{card.text}</p>
      </div>
      <Button
        text={card.buttonText}
        handleClick={card.buttonOnclick}
        buttonImg={card.buttonImg}
      />
    </div>
  );
};

export default Card1;
