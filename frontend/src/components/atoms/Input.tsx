import React from "react";

interface inputProps {
  label: string;
  input: boolean;
  value: string;
  setValue: React.ChangeEventHandler<HTMLElement>;
}

const Input = (prop: inputProps) => {
  return (
    <div className=" flex flex-col gap-2">
      <p className=" text-sm font-medium">{prop.label}</p>
      {prop.input ? (
        <input
          type="text"
          className=" bg-[#DEE6E5] p-4 rounded-md"
          value={prop.value}
          onChange={prop.setValue}
        />
      ) : (
        <textarea
          className=" bg-[#DEE6E5] p-4 rounded-md h-[113px]"
          value={prop.value}
          onChange={prop.setValue}
        />
      )}
    </div>
  );
};

export default Input;
