"use client";

import type { InputHTMLAttributes } from "react";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string | null;
  error?: string | null;
  className?: string;
};

export default function TextInput({
  label,
  hint = null,
  error = null,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-size12 font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}

      <input
        {...props}
        className={
          "w-full rounded-lg px-4 py-3 text-size14 bg-[#141417] border border-[#2a2b30] text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#6f42c1]"
        }
      />

      {hint && !error && <p className="mt-2 text-size12 text-gray-400">{hint}</p>}
      {error && <p className="mt-2 text-size12 text-red-400">{error}</p>}
    </div>
  );
}
