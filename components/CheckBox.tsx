"use client";

import type { InputHTMLAttributes } from "react";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="inline-flex items-center gap-2 text-size12 text-gray-300 cursor-pointer select-none">
      <input
        type="checkbox"
        {...props}
        className="w-4 h-4 rounded-sm bg-transparent border border-[#2a2b30] focus:ring-2 focus:ring-[#6f42c1]"
      />
      {label && <span>{label}</span>}
    </label>
  );
}
