"use client";

import { ReactNode } from "react";

export const Label = ({ children }: { children: ReactNode }) => {
  return (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
};
