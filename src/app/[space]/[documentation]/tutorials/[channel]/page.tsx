import ChannelScreen from "@/components/organisms/ChannelScreen";

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
            link: "/space/id/tutorials/1/editor",
          },
        ]}
      />
      <div className=" w-[300px] p-8 min-h-[300px] h-min flex flex-col rounded-[10px] bg-white  shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)] items-start sticky top-0"></div>
    </>
  );
};

export default page;
