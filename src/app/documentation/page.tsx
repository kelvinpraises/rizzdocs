import MainScreen from "@/components/organisms/MainScreen";
import SpaceCarousel from "@/components/organisms/SpaceCarousel";
import React from "react";

const page = () => {
  return (
    <>
      <MainScreen
        title="FVM"
        tag="Documentation"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
        cardArray={[
          {
            image: "rocket.svg",
            title: "Fund Ecosystem Projects",
            text: "Create pooled funds to support LX Devs in your community.",
            buttonText: "Create New DocFund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            image: "rocket.svg",
            title: "Receive Ecosystem Funding",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            image: "timer.svg",
            title: "Receive Ecosystem Funding",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
        ]}
      />
      <SpaceCarousel />
    </>
  );
};

export default page;
