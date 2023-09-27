import ChannelScreen from "@/components/organisms/ChannelScreen";
import MainScreen from "@/components/organisms/MainScreen";
import SpaceCarousel from "@/components/organisms/SpaceCarousel";
import React from "react";

const page = () => {
  return (
    <>
      <ChannelScreen
        title="JEREMY"
        subtitle="Manifest your 10x deviness!"
        tag="FVM How To Guides"
        cardArray={[
          {
            emoji: "/pic.svg",
            title: "Adding deals to filecoin using light house deals",
            datePosted: 5,
            authorPfp: "/author.svg",
            link: "1",
          },
        ]}
      />

      <SpaceCarousel />
    </>
  );
};

export default page;
