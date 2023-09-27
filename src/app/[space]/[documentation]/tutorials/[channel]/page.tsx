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
      <div className=" w-[300px] p-8 min-h-[300px] h-min flex flex-col rounded-[10px] bg-white  shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)] items-start sticky top-0"></div>
    </>
  );
};

export default page;
