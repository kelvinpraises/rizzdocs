"use client";
import React, { useState } from "react";
import TextHead from "../atoms/TextHead";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

const NewProjectForm = () => {
  return (
    <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 items-start">
      <TextHead
        title="Showcase Project"
        subtitle="Showcase a project to qualify for an ecosystem funding round."
      />
      <div className=" w-[480px] flex flex-col gap-8">
        <Input
          label={"Project Name"}
          input={true}
          value={""}
          setValue={() => {}}
        />
        <Input
          label={"Project Description"}
          input={false}
          value={""}
          setValue={() => {}}
        />
        <Input
          label={"Project Links"}
          input={true}
          value={""}
          setValue={() => {}}
        />
        <Input
          label={"Image URL"}
          input={true}
          value={""}
          setValue={() => {}}
        />
      </div>
      <Button text={"Complete"} handleClick={undefined} />
    </div>
  );
};

export default NewProjectForm;
