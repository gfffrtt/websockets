import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center rounded-md text-text-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white hover:bg-black focus:ring-2 focus:ring-black focus:ring-offset-2",
        secondary:
          "bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2",
        outline:
          "bg-transparent border border-slate-300 hover:bg-slate-100 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
      },
      size: {
        default: "h-10 py-1 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  Icon?: React.ElementType;
}

export const Button = ({
  className,
  children,
  variant,
  size,
  Icon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      {Icon && <Icon />}
    </button>
  );
};
