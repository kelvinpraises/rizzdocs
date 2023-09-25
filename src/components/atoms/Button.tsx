import Link from "next/link";
import React from "react";

interface buttonProps {
  text: string;
  handleClick: any;
  buttonImg?: string;
  link?: boolean;
  href?: string;
}

const Button = (button: buttonProps) => {
  return (
    <>
      {button.link ? (
        <a
          className=" py-4 px-8 rounded-[5px] text-sm font-semibold bg-[#313B3D] text-white flex items-center"
          href={button.href}
        >
          {button.text}
          {button.buttonImg && (
            <img src={`/${button.buttonImg}`} className=" pl-4" />
          )}
        </a>
      ) : (
        <button
          onClick={button.handleClick}
          className=" py-4 px-8 rounded-[5px] text-sm font-semibold bg-[#313B3D] text-white flex items-center"
        >
          {button.text}
          {button.buttonImg && (
            <img src={`/${button.buttonImg}`} className=" pl-4" />
          )}
        </button>
      )}
    </>
  );
};

export default Button;
