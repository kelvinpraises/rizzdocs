import TextHead from "@/components/atoms/TextHead";
import GrantCarousel from "@/components/organisms/GrantCarousel";
import MainScreen from "@/components/organisms/MainScreen";
import React from "react";

const page = () => {
  return (
    <>
      <GrantCarousel />
      <MainScreen
        title="Ecosystem DocFunds"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
        cardArray={[
          {
            title: "Fund Ecosystem Projects",
            text: "Create pooled funds to support LX Devs in your community.",
            buttonText: "Create New DocFund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            title: "Receive Ecosystem Funding",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            title: "Receive Ecosystem Funding",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
        ]}
      />
      {/* <TextHead title='' /> */}
    </>
  );
};

export default page;
