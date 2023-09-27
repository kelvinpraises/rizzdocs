"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import TextHead from "../atoms/TextHead";
import Card1 from "../molecules/Card1";
import VoteCard from "../molecules/VoteCard";
import Button from "../atoms/Button";

const ShowcaseSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-4">
    <div className=" flex justify-between">
      <p className=" text-sm">
        Submit a project to this showcase for a possible funded drip
      </p>
      <Button text={"Showcase Project"} handleClick={undefined} />
    </div>
    <div className="flex flex-col gap-8">
      <p className="font-bold text-xl">Projects</p>
      <div className="w-[520px]">{data && <Card1 {...data.showcase} />}</div>
    </div>
  </div>
);

const AllocateSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-4">
    <div className=" flex justify-between">
      <p className=" text-sm">
        Share your sentiments for what you think the projects are worth, will be
        averaged for final voting
      </p>
      <Button text={"Allocate Sentiment"} handleClick={undefined} />
    </div>
    <div className="flex flex-col gap-8">
      <p className="font-bold text-xl">Allocators</p>
      {data && <VoteCard {...data.allocate} />}
    </div>
  </div>
);

const VoteSection = ({ data }: { data: any }) => (
  <div className="flex flex-col gap-4">
    <div className=" flex justify-between">
      <p className=" text-sm">
        Vote on whether this fits well into your ecosystem
      </p>
      <Button text={"Accept Proposals"} handleClick={undefined} />
      <Button text={"Reject Proposals"} handleClick={undefined} />
      <Button text={"Skip Proposals"} handleClick={undefined} />
    </div>
    <div className="flex flex-col gap-8">
      <p className="font-bold text-xl">Vote Info</p>
      <div className="w-[520px]">{data && <Card1 {...data.vote} />}</div>
    </div>
  </div>
);

const FundsScreen = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  const [data, setData] = useState<{
    id: number;
    title: string;
    subtitle: string;
    showcase: {
      title: string;
      text: string;
      buttonText: string;
      buttonImg: string;
      buttonOnclick: () => void;
    };
    allocate: {
      name: string;
      address: string;
      totalToken: number;
    };
    vote: {
      title: string;
      text: string;
      buttonText: string;
      buttonImg: string;
      buttonOnclick: () => void;
    };
  }>();
  const [activeScreen, setActiveScreen] = useState("showcase");

  const storeData = [
    {
      id: 1,
      title: "React Everywhere Challenge",
      subtitle:
        "Supporting impactful retroactive project fundings for stakeholders and builders",
      showcase: {
        title: "React Everywhere Challenge",
        text: "Create pooled funds to support builders in your community.",
        buttonText: "Open Fund",
        buttonImg: "enter.svg",
        buttonOnclick: () => {
          throw new Error("Function not implemented.");
        },
      },
      allocate: {
        name: "@kelvinpraises",
        address: "0x0000000000000000000000000000000000000000",
        totalToken: 105,
      },
      vote: {
        title: "React Everywhere Challenge",
        text: "Create pooled funds to support builders in your community.",
        buttonText: "Open Fund",
        buttonImg: "enter.svg",
        buttonOnclick: () => {
          throw new Error("Function not implemented.");
        },
      },
    },
    {
      id: 2,

      title: "React Everywhere Challenge",
      subtitle:
        "Supporting impactful retroactive project fundings for stakeholders and builders",
      showcase: {
        title: "React Everywhere Challenge",
        text: "Create pooled funds to support builders in your community.",
        buttonText: "Open Fund",
        buttonImg: "enter.svg",
        buttonOnclick: () => {
          throw new Error("Function not implemented.");
        },
      },
      allocate: {
        name: "@kelvinpraises",
        address: "0x0000000000000000000000000000000000000000",
        totalToken: 105,
      },
      vote: {
        title: "React Everywhere Challenge",
        text: "Create pooled funds to support builders in your community.",
        buttonText: "Open Fund",
        buttonImg: "enter.svg",
        buttonOnclick: () => {
          throw new Error("Function not implemented.");
        },
      },
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
    <div className="flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
      <div className="flex gap-4 items-center">
        <p className="text-[40px] font-semibold">{data?.title}</p>
        <p className="text-sm font-semibold">DocFund</p>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-4">
          <p className="text-sm">Funded By</p>
          <p className="text-sm">Amount Funded</p>
          <p className="text-sm">Created</p>
        </div>
        <p>{data?.subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center text-[#B1BAC1]">
          <button
            className={`font-medium text-xl ${
              activeScreen === "showcase" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("showcase")}
          >
            Showcase
          </button>
          <button
            className={`font-medium text-xl ${
              activeScreen === "allocate" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("allocate")}
          >
            Allocate
          </button>
          <button
            className={`font-medium text-xl ${
              activeScreen === "vote" && "text-[#647684]"
            }`}
            onClick={() => setActiveScreen("vote")}
          >
            Vote
          </button>
        </div>

        <div className="flex flex-col pt-4 pb-8 gap-8">
          <p>{id}</p>
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
