import GrantCarousel from "@/components/organisms/GrantCarousel";
import MainScreen from "@/components/organisms/MainScreen";
import React from "react";

const page = () => {
  return (
    <>
      <GrantCarousel />
      <MainScreen
        title="RizzDocs Grants"
        subtitle="Funding Excellence: Retroactive Grants for Learning Innovators"
        tag="DocFund"
        cardArray={[
          {
            image: "rocket.svg",
            title: "Fund Ecosystem Projects",
            text: "Create pooled funds to support LX Devs in your community.",
            buttonText: "Create New DocFund",
            buttonClick: "",
          },
          {
            image: "timer.svg",
            title: "Receive Ecosystem Funding",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
          },
        ]}
      />
    </>
  );
};

export default page;
