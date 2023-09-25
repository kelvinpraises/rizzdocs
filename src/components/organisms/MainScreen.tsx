import React from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";

interface screenProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  funds?: string;
  cardArray?: {
    image?: string;
    title: string;
    text: string;
    buttonText: string;
    buttonClick: any;
    buttonImg?: string;
  }[];
}
const MainScreen = (props: screenProps) => {
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8">
      <TextHead title={props.title} subtitle={props.subtitle} tag={props.tag} />
      <div className=" grid grid-cols-2 gap-8">
        {props.cardArray?.map((card, index) => (
          <Card1
            image={card.image}
            key={index}
            title={card.title}
            text={card.text}
            buttonText={card.buttonText}
            buttonOnclick={card.buttonClick}
            buttonImg={card.buttonImg}
          />
        ))}
      </div>
    </div>
  );
};

export default MainScreen;
