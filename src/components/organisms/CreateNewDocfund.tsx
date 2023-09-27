"use client";
import React, { useEffect, useReducer, useState } from "react";
import TextHead from "../atoms/TextHead";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import EmojiPicker from "./EmojiPicker";
export interface NewDocFund {
  selectedEmoji: string;
  title: string;
  tokenAmount: number;
  proposalDescription: string;
  registrationEndDate: number;
}

const CreateNewDocFund = () => {
  const [values, updateValues] = useReducer(
    (current: NewDocFund, update: Partial<NewDocFund>): NewDocFund => {
      const updatedTokenAmount = Math.max(0, update.tokenAmount || 0);

      return {
        ...current,
        ...update,
        tokenAmount: updatedTokenAmount,
        registrationEndDate:
          update.registrationEndDate || Math.floor(new Date().getTime() / 1000),
      };
    },
    {
      selectedEmoji: "",
      title: "",
      tokenAmount: 0,
      proposalDescription: "",
      registrationEndDate: Math.floor(new Date().getTime() / 1000), // Convert to Unix timestamp already in UTC
    }
  );

  function createDocFund() {
    // save to backend
    // route to the id
  }

  console.log(values);

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
            <EmojiPicker setSelectedEmoji={updateValues} />
            <Input
              input={true}
              value={values.title}
              onChange={(e) => updateValues({ title: e.target.value })}
            />
          </div>
        </div>
        <Input
          type="number"
          label={"Token Amount"}
          input={true}
          value={values.tokenAmount.toString()}
          onChange={(e) =>
            updateValues({ tokenAmount: parseFloat(e.target.value) })
          }
        />
        <Input
          label={"Proposal Description"}
          input={false}
          value={values.proposalDescription}
          onChange={(e) =>
            updateValues({ proposalDescription: e.target.value })
          }
        />
        <Input
          type="datetime-local"
          label={"Registration End Date"}
          input={true}
          value={
            isNaN(values.registrationEndDate)
              ? ""
              : new Date(
                  values.registrationEndDate * 1000 -
                    new Date().getTimezoneOffset() * 60000 // Convert Unix timestamp already in UTC to milliseconds and factor in timezone
                )
                  .toISOString()
                  .substring(0, 16)
          }
          onChange={
            (e) =>
              updateValues({
                registrationEndDate: Math.floor(
                  new Date(e.target.value).getTime() / 1000
                ),
              }) // Convert to Unix timestamp
          }
        />
      </div>
      <Button text={"Submit"} handleClick={createDocFund} />
    </div>
  );
};

export default CreateNewDocFund;
