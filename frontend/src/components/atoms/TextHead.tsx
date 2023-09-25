import React from "react";

interface IHead {
  title?: string;
  subtitle?: string;
  tag?: string;
}

const TextHead = (prop: IHead) => {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" flex gap-4 items-center">
        <p className=" text-[40px] font-semibold">{prop.title}</p>
        <p className=" text-sm font-semibold">{prop.tag}</p>
      </div>
      <p>{prop.subtitle}</p>
    </div>
  );
};

export default TextHead;
