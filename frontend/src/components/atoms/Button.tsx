import React from "react";

interface buttonProps {
  text: string;
  handleClick: any;
  buttonImg?: string;
}

const Button = (button: buttonProps) => {
  return (
    <button
      onClick={button.handleClick}
      className=" py-4 px-8 rounded-[5px] text-sm font-semibold bg-[#313B3D] text-white flex items-center"
    >
      {button.text}
      {button.buttonImg && (
        <img src={`/${button.buttonImg}`} className=" pl-4" />
      )}
    </button>
  );
};

export default Button;
