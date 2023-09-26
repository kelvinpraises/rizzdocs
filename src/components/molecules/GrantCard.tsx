import React from "react";
import { Emoji, EmojiStyle } from "emoji-picker-react";

interface ICard {
  institution: string;
  href: string;
  image: string;
}

const GrantCard = (card: ICard) => {
  return (
    <a href={card.href}>
      <div className=" p-4 gap-4 flex flex-col items-center bg-[#DEE6E5] rounded-[10px]">
        <Emoji unified={card.image} emojiStyle={EmojiStyle.NATIVE} size={100} />
        <p className=" text-xl font-semibold">{card.institution}</p>
      </div>
    </a>
  );
};

export default GrantCard;
