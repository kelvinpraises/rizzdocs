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
            typeIsLink: true,
            href: "/space/id/tutorials",
            image: "rocket.svg",
            title: "Tutorials",
            description: "Create pooled funds to support builders in your community.",
            buttonText: "Tutorials",
            buttonClick: "",
          },
          {
            typeIsLink: true,
            href: "/space/id/guides",
            image: "rocket.svg",
            title: "How To Guides",
            description: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Guides",
            buttonClick: "",
          },
          {
            typeIsLink: true,
            href: "/space/id/explanations",
            image: "timer.svg",
            title: "Explanation",
            description: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Explanation",
            buttonClick: "",
          },
          {
            typeIsLink: true,
            href: "/space/id/reference",
            image: "timer.svg",
            title: "Reference",
            description: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Reference",
            buttonClick: "",
          },
        ]}
      />
      <SpaceCarousel />
    </>
  );
};

export default page;
