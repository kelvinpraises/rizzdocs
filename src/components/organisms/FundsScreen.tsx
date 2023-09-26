"use client"
import React, { useState } from "react";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";
import VoteCard from "../molecules/VoteCard";

const ShowcaseSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-8">
    <p className="font-bold text-xl">Projects</p>
    <div className="w-[520px]">
      <Card1 {...data.showcase} />
    </div>
  </div>
);

const AllocateSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-8">
    <p className="font-bold text-xl">Allocators</p>
    <VoteCard {...data.allocate} />
  </div>
);

const VoteSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-8">
    <p className="font-bold text-xl">Vote Info</p>
    <div className="w-[520px]">
      <Card1 {...data.vote} />
    </div>
  </div>
);

const FundsScreen = () => {
  const [activeScreen, setActiveScreen] = useState("showcase");

  const data = {
    showcase: {
      title: "React Everywhere Challenge",
      text: "Create pooled funds to support builders in your community.",
      buttonText: "Open Fund",
      buttonImg: "enter.svg",
      buttonOnclick: () => {
        throw new Error("Function not implemented.");
      }
    },
    allocate: {
      name: "@kelvinpraises",
      address: "0x0000000000000000000000000000000000000000",
      totalToken: 105
    },
    vote: {
      title: "React Everywhere Challenge",
      text: "Create pooled funds to support builders in your community.",
      buttonText: "Open Fund",
      buttonImg: "enter.svg",
      buttonOnclick: () => {
        throw new Error("Function not implemented.");
      }
    }
  };

  return (
    <div className="flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8">
      <div className="flex gap-4 items-center">
        <p className="text-[40px] font-semibold">React Everywhere Challenge</p>
        <p className="text-sm font-semibold">DocFund</p>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-4">
          <p className="text-sm">Funded By</p>
          <p className="text-sm">Amount Funded</p>
          <p className="text-sm">Created</p>
        </div>
        <p>Supporting impactful retroactive project fundings for stakeholders and builders</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center text-[#B1BAC1]">
          <button
            className={`font-medium text-xl ${activeScreen === "showcase" && "text-[#647684]"}`}
            onClick={() => setActiveScreen("showcase")}
          >
            Showcase
          </button>
          <button
            className={`font-medium text-xl ${activeScreen === "allocate" && "text-[#647684]"}`}
            onClick={() => setActiveScreen("allocate")}
          >
            Allocate
          </button>
          <button
            className={`font-medium text-xl ${activeScreen === "vote" && "text-[#647684]"}`}
            onClick={() => setActiveScreen("vote")}
          >
            Vote
          </button>
        </div>
        <div className="flex flex-col pt-4 pb-8 gap-8">
          {(() => {
            switch (activeScreen) {
              case "showcase":
                return <ShowcaseSection data={data} />;
              case "allocate":
                return <AllocateSection data={data} />;
              case "vote":
                return <VoteSection data={data} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default FundsScreen;