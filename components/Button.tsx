"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};


export default function Button({
  variant = "primary",
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none";

  const primary =
    "w-full px-6 py-3 bg-[#8854C0] text-white shadow-sm hover:brightness-95"; 

  const ghost =
    "w-full px-5 py-3 bg-[#1f1f21] border border-[#2a2b30] text-white"; 

  const variantClass = variant === "primary" ? primary : ghost;

  return (
    <button {...props} className={`${base} ${variantClass} ${className}`}>
      {leftIcon && <span className="mr-3">{leftIcon}</span>}
      <span className="text-size12">{children}</span>
      {rightIcon && <span className="ml-3">{rightIcon}</span>}
    </button>
  );
}
