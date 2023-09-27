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
        tag="FVM Tutorials"
        cardArray={[
          {
            emoji: "1f62a",
            title: "Adding deals to filecoin using light house deals",
            datePosted: 5,
            authorPfp: "/author.svg",
            link: "/editor",
          },
        ]}
      />

      <SpaceCarousel />
    </>
  );
};

export default page;
