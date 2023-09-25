"use client";
import React from "react";
import Card1 from "../molecules/Card1";

const CardCarousel = () => {
  return (
    <div className=" max-w-[420px] w-full flex flex-col gap-8 overflow-y-scroll">
      <Card1
        typeIsLink={true}
        href=""
        image={"timer.svg"}
        title={"New Space"}
        text={
          "Create a new space that reflects what a documentation is all about"
        }
        buttonText={"Propose New Space"}
        buttonOnclick={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
      <Card1
        typeIsLink={true}
        href=""
        image={"timer.svg"}
        title={"New Documentation"}
        text={
          "Propose a new documentation to be added to and maintained by RizzDocs"
        }
        buttonText={"Propose Documentation"}
        buttonOnclick={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
      <Card1
        typeIsLink={true}
        href=""
        image={"timer.svg"}
        title={"New Channel"}
        text={"Create a new channel you the "}
        buttonText={"Create Channel"}
        buttonOnclick={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
      <Card1
        typeIsLink={true}
        href="/grants"
        image={"timer.svg"}
        title={"RizzDocs Grants"}
        text={
          "Retro active fundings for amazing projects within the RizzDocs community "
        }
        buttonText={"Visits Grants"}
        buttonOnclick={function (): {} {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default CardCarousel;
