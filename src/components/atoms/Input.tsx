import React from "react";

interface inputProps {
  date?: boolean;
  label?: string;
  input: boolean;
  value: string;
  setValue: React.ChangeEventHandler<HTMLElement>;
}

const Input = (prop: inputProps) => {
  return (
    <div className=" flex flex-col gap-2 w-full">
      {prop.label && <p className=" text-sm font-medium">{prop.label}</p>}
      {prop.input ? (
        <input
          type={prop.date ? "datetime-local" : "text"}
          className=" bg-[#DEE6E5] p-4 rounded-md outline-none w-full"
          // value={prop.value}
          // onChange={prop.setValue}
        />
      ) : (
        <textarea
          className=" bg-[#DEE6E5] p-4 rounded-md h-[113px] outline-none"
          // value={prop.value}
          // onChange={prop.setValue}
        />
      )}
    </div>
  );
};

export default Input;
