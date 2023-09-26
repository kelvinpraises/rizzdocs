"use client";
import {
  Emoji,
  EmojiStyle
} from "emoji-picker-react";
import Image from "next/image";

interface ICardProp {
  image: string;
  title: string;
  datePosted: number;
  authorPfp: string;
  link: string;
}

const TutorialCard = (card: ICardProp) => {
  return (
    <a href={card.link}>
      <div className=" flex flex-1 p-4 gap-4 items-center bg-[#DEE6E5] rounded-[10px]">
        <div className=" p-6 bg-white rounded-[10px]">
          <Emoji
            unified={card.image}
            emojiStyle={EmojiStyle.NATIVE}
            size={50}
          />
        </div>
        <div className=" flex flex-col gap-2">
          <p className=" text-xl font-semibold">{card.title}</p>
          <div className=" flex gap-4 items-center">
            <Image
              src={card.authorPfp}
              width={30}
              height={30}
              className=" rounded-full"
              alt={""}
            />
            <p>{`${card.datePosted} ${
              card.datePosted == 1 ? "day" : "days"
            } ago`}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default TutorialCard;
