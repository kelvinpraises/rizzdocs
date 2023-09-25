"use client"
import React from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";

const ProjectScreen = () => {
  const data = [
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
  ];
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8">
      <TextHead
        title={"Crystalrohr"}
        subtitle={"Captioning the everyday experience for a better tomorrow"}
        tag={"DocFund Project"}
      />
      <div className=" flex flex-col gap-8">
        <p className=" font-bold text-xl">Funds Applied</p>
        <div className=" grid grid-cols-2 gap-8">
          {data.map((card, index) => (
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
          {data.map((card, index) => (
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
