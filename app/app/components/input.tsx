import React from "react";
import { cn } from "../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

export const Input = ({ type, onChange, value, className }: InputProps) => {
  return (
    <div className={"text-black relative text-sm"}>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className={cn(
          "flex w-full items-center justify-center outline-none rounded-md text-lg font-medium ring-2 ring-black ring-offset-2",
          className
        )}
      />
    </div>
  );
};
