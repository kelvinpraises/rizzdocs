"use client";
import React, { useState } from "react";
import CardCarousel from "@/components/organisms/CardCarousel";
import MainScreen from "@/components/organisms/MainScreen";

export default function Home() {
  return (
    <>
      <div className=" flex-1 bg-white rounded-[10px] p-8 overflow-y-scroll flex flex-col gap-8 shadow-[0px_4px_15px_5px_rgba(226,229,239,0.25)]"></div>
      <CardCarousel />
    </>
  );
}
