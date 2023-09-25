import MainScreen from "@/components/organisms/MainScreen";
import SpaceCarousel from "@/components/organisms/SpaceCarousel";
import React from "react";

const page = () => {
  return (
    <>
      <MainScreen
        title="FVM: References"
        subtitle="Supporting impactful retroactive project fundings for stakeholders and builders"
      />
      <SpaceCarousel />
    </>
  );
};

export default page;
