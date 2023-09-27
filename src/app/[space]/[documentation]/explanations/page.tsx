import MainScreen from "@/components/organisms/MainScreen";
import LibraryCarousel from "@/components/organisms/LibraryCarousel";
import React from "react";

const page = () => {
  return (
    <>
      <MainScreen
        title="FVM: Explanations"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
        cardArray={[
          {
            title: "Official",
            text: "Create pooled funds to support LX Devs in your community.",
            buttonText: "Create New DocFund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            title: "Jeremy",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Showcase Project",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
        ]}
      />
      <LibraryCarousel />
    </>
  );
};

export default page;
