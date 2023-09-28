import MainScreen from "@/components/organisms/MainScreen";
import SpaceCarousel from "@/components/organisms/SpaceCarousel";
import React from "react";

const page = () => {
  return (
    <>
      <MainScreen
        title="Javascript"
        tag="Space"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
        cardArray={[
          {
            typeIsLink: true,
            href: "/space/id",
            title: "FVM",
            description: "Create pooled funds to support builders in your community.",
            buttonText: "Documentation",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            typeIsLink: true,
            href: "/space/id",
            title: "FRISK",
            description: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Documentation",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            typeIsLink: true,
            href: "/space/id",
            title: "Ceramic",
            description: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Documentation",
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
