import React from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";
import TutorialCard from "../molecules/TutorialCard";

interface screenProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  funds?: string;
  link?: string;
  linkhref?: string;

  cardArray?: {
    emoji: string;
    title: string;
    datePosted: number;
    authorPfp: string;
    link: string;
  }[];
}
const ChannelScreen = (props: screenProps) => {
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
      <TextHead title={props.title} subtitle={props.subtitle} tag={props.tag} />
      {props.link?.length && (
        <a href={props.linkhref} className=" font-semibold">
          {props.link}
        </a>
      )}

      <div className=" grid grid-cols-2 gap-8">
        {props.cardArray?.map((card, index) => (
          <TutorialCard
            key={index}
            emoji={card.emoji}
            title={card.title}
            datePosted={card.datePosted}
            authorPfp={card.authorPfp}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ChannelScreen;
