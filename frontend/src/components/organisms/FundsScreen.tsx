"use client";
import React, { useState } from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";
import VoteCard from "../molecules/VoteCard";

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
  }[];
}
const FundsScreen = (props: screenProps) => {
  const [screen, setScreen] = useState("vote");
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8">
      <div className=" flex gap-4 items-center">
        <p className=" text-[40px] font-semibold">React Everywhere Challenge</p>
        <p className=" text-sm font-semibold">DocFund</p>
      </div>
      <div className=" flex gap-4 flex-col">
        <div className=" flex items-center gap-4">
          <p className=" text-sm">Funded By</p>
          <p className=" text-sm">Amount Funded</p>
          <p className=" text-sm">Created</p>
        </div>
        <p>
          Supporting impactful retroactive project fundings for stakeholders and
          builders
        </p>
      </div>
      <div className=" flex flex-col gap-4">
        <div className=" flex gap-4 items-center">
          <button
            className={` font-medium text-xl ${
              screen == "vote" && " text-[#B1BAC1]"
            }`}
            onClick={() => setScreen("showcase")}
          >
            Showcase
          </button>
          <button
            className={` font-medium text-xl ${
              screen == "showcase" && " text-[#B1BAC1]"
            }`}
            onClick={() => setScreen("vote")}
          >
            Vote
          </button>
        </div>
        <div className=" flex flex-col pt-4 pb-8 gap-8">
          <div className=" flex flex-col gap-8">
            <p className=" font-bold text-xl">Info</p>
            <div className=" w-[520px]">
              <Card1
                title={"React Everywhere Challenge"}
                text={
                  "Create pooled funds to support builders in your community."
                }
                buttonText={"Open Fund"}
                buttonImg="enter.svg"
                buttonOnclick={function (): {} {
                  throw new Error("Function not implemented.");
                }}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-8">
            <p className=" font-bold text-xl">Voters</p>
            <VoteCard
              name={"@kelvinpraises"}
              address={"0x0000000000000000000000000000000000000000"}
              totalToken={105}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundsScreen;
