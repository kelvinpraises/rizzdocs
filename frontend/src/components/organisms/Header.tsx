import React from "react";
import Button from "../atoms/Button";

const Header = () => {
  return (
    <div className=" flex justify-between items-center px-4 min-h-[70px] bg-white pr-8">
      <img src="/logo.svg" alt="" />
      <Button text={"Connect wallet"} handleClick={""} />
    </div>
  );
};

export default Header;
