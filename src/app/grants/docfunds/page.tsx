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
            typeIsLink: true,
            href:"/grants/docfunds/1",
            title: "React Everywhere Challenge",
            text: "Create pooled funds to support builders in your community.",
            buttonText: "Open Fund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            typeIsLink: true,
            href:"/grants/docfunds/1",
            title: "DreamUp: Purple Rain Challenge",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Open Fund",
            buttonClick: "",
            buttonImg: "enter.svg",
          },
          {
            typeIsLink: true,
            href:"/grants/docfunds/1",
            title: "Retro Funds",
            text: "Showcase a project to qualify for an ecosystem funding round.",
            buttonText: "Open Fund",
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
