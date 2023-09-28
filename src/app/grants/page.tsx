import GrantCarousel from "@/components/organisms/GrantCarousel";
import DocumentationScreen from "@/components/organisms/DocumentationScreen";
import React from "react";

const page = () => {
  const data = {
    title: "RizzDocs Grants",
    link: "View all docfunds",
    linkhref: "/grants/docfunds",
    subtitle: "Funding Excellence: Retroactive Grants for Learning Innovators",
    tag: "DocFund",
    cardArray: [
      {
        href: "/grants/new-docfund",
        typeIsLink: true,
        image: "rocket.svg",
        title: "Fund Ecosystem Projects",
        description:
          "Create pooled funds to support LX Devs in your community.",
        buttonText: "Create New DocFund",
        buttonClick: "",
      },
      {
        href: "/grants/showcase-project",
        typeIsLink: true,
        image: "timer.svg",
        title: "Receive Ecosystem Funding",
        description:
          "Showcase a project to qualify for an ecosystem funding round.",
        buttonText: "Showcase Project",
        buttonClick: "",
      },
    ],
  };
  return (
    <>
      <GrantCarousel />
      <DocumentationScreen {...data} />
    </>
  );
};

export default page;
