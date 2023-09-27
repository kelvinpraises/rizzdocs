import LibraryCarousel from "@/components/organisms/LibraryCarousel";
import MainScreen from "@/components/organisms/MainScreen";
import React from "react";

const page = () => {
  return (
    <>
      <MainScreen
        title="FVM: Tutorials"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
        cardArray={[
          {
            typeIsLink: true,
            href: "/space/id/tutorials/1",
            title: "Official",
            text: "Create pooled funds to support LX Devs in your community.",
            buttonText: "Create New DocFund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            typeIsLink: true,
            href: "/space/id/tutorials/1",
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
