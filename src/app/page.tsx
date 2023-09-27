"use client";
import React, { useState } from "react";
import CardCarousel from "@/components/organisms/CardCarousel";
import MainScreen from "@/components/organisms/MainScreen";

export default function Home() {
  const [promptName, setPromptName] = useState("");
  const [promptUrl, setPromptUrl] = useState("");

  const handlePrompt = () => {
    const name = prompt("please enter your name:");
    const url = prompt("Please enter the url to your avatar:");
    if (name !== null && url !== null) {
      setPromptName(name);
      setPromptUrl(url);
    }
  };

  return (
    <>
      <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]">
        <button onClick={handlePrompt}>Prompt</button>
        <p>Value 1: {promptName}</p>
        <p>Value 2: {promptUrl}</p>
      </div>
      <CardCarousel />
    </>
  );
}
