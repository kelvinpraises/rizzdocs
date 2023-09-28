import React from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";

interface screenProps {
  title?: string;
  subtitle?: string;
  tag?: string;
  funds?: string;
  link?: string;
  linkhref?: string;

  cardArray?: {
    image?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonClick: any;
    buttonImg?: string;
    typeIsLink?: boolean;
    href?: string;
  }[];
}
const MainScreen = (props: screenProps) => {
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
      <TextHead title={props.title} subtitle={props.subtitle} tag={props.tag} />
      {props.link?.length && <a href={props.linkhref} className=" font-semibold">{props.link}</a>}

      <div className=" grid grid-cols-2 gap-8">
        {props.cardArray?.map((card, index) => (
          <Card1
            typeIsLink={card.typeIsLink}
            href={card.href}
            image={card.image}
            key={index}
            title={card.title}
            description={card.description}
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
