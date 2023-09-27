"use client";
import React, { useEffect, useState } from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";
import { usePathname } from "next/navigation";
type Card = {
  title: string;
  text: string;
  buttonText: string;
  buttonClick: string;
};

type Data = {
  id: number;
  title: string;
  subtitle: string;
  tag: string;
  cardArray: Card[];
};

const ProjectScreen = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];

  const [data, setData] = useState<Data>();

  const storeData = [
    {
      id: 1,
      title: "Crystalrohr",
      subtitle: "Captioning the everyday experience for a better tomorrow",
      tag: "DocFund Project",
      cardArray: [
        {
          title: "Fund Ecosystem Projects",
          text: "Create pooled funds to support LX Devs in your community.",
          buttonText: "Create New DocFund",
          buttonClick: "",
        },
        {
          title: "Receive Ecosystem Funding",
          text: "Showcase a project to qualify for an ecosystem funding round.",
          buttonText: "Showcase Project",
          buttonClick: "",
        },
      ],
    },
    {
      id: 2,
      title: "Crystalrohr",
      subtitle: "Captioning the everyday experience for a better tomorrow",
      tag: "DocFund Project",
      cardArray: [
        {
          title: "Fund Ecosystem Projects",
          text: "Create pooled funds to support LX Devs in your community.",
          buttonText: "Create New DocFund",
          buttonClick: "",
        },
        {
          title: "Receive Ecosystem Funding",
          text: "Showcase a project to qualify for an ecosystem funding round.",
          buttonText: "Showcase Project",
          buttonClick: "",
        },
      ],
    },
  ];

  useEffect(() => {
    let newData = storeData.find((data) => data.id === parseInt(id));

    if (newData) {
      setData(newData);
      console.log(data);
    }
  }, [id]);

  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
      <TextHead title={data?.title} subtitle={data?.subtitle} tag={data?.tag} />
      <div className=" flex flex-col gap-8">
        <p className=" font-bold text-xl">Funds Applied</p>
        <div className=" grid grid-cols-2 gap-8">
          {data?.cardArray.map((card, index) => (
            <Card1
              key={index}
              title={card.title}
              text={card.text}
              buttonText={card.buttonText}
              buttonOnclick={function (): {} {
                throw new Error("Function not implemented.");
              }}
              buttonImg="enter.svg"
            />
          ))}
        </div>
      </div>

      <div className=" flex flex-col gap-8">
        <p className=" font-bold text-xl">Funded Drips</p>
        <div className=" grid grid-cols-2 gap-8">
          {data?.cardArray.map((card, index) => (
            <Card1
              key={index}
              title={card.title}
              text={card.text}
              buttonText={card.buttonText}
              buttonOnclick={function (): {} {
                throw new Error("Function not implemented.");
              }}
              buttonImg="enter.svg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
