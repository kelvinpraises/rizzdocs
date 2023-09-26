"use client";
import React, { useState } from "react";
import TextHead from "../atoms/TextHead";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import EmojiPicker from "./EmojiPicker";

const CreateNewDocfund = () => {
  const [selectedEmoji, setSelectedEmoji] = useState();

  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 items-start">
      <TextHead
        title="Create New DocFund"
        subtitle="Create pooled funds to support LX Devs in your community."
      />
      <div className=" w-[480px] flex flex-col gap-8">
        <div className=" flex flex-col gap-2 w-full">
          <p className=" text-sm font-medium">Title</p>
          <div className=" flex bg-[#DEE6E5] items-center pl-2 rounded-md">
            <EmojiPicker setSelectedEmoji={() => setSelectedEmoji} />
            <Input input={true} value={""} setValue={() => {}} />
          </div>
        </div>
        <Input
          label={"Token Amount"}
          input={true}
          value={""}
          setValue={() => {}}
        />
        <Input
          label={"Proposal Description"}
          input={false}
          value={""}
          setValue={() => {}}
        />
        <Input
          label={"Registration End Date"}
          date={true}
          input={true}
          value={""}
          setValue={() => {}}
        />
      </div>
      <Button text={"Submit"} handleClick={undefined} />
    </div>
  );
};

export default CreateNewDocfund;
