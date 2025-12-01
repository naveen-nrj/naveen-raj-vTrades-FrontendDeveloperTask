"use client";

import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  className?: string;
};

export default function PasswordInput({
  label,
  error = null,
  className = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`w-full relative ${className}`}>
      {label && (
        <label className="block text-size12 font-medium text-gray-200 mb-2">
          {label}
        </label>
      )}

      <div className="flex items-center bg-[#141417] border border-[#2a2b30] rounded-lg overflow-hidden">
        <input
          {...props}
          type={visible ? "text" : "password"}
          className="w-full px-4 py-3 bg-transparent text-size14 text-white placeholder:text-gray-400 outline-none"
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="p-3 text-gray-300  hover:text-white transition"
        >
          {visible ? <Eye/> : <EyeOff/>}
        </button>
      </div>

      {error && <p className="mt-2 text-size12 text-red-400">{error}</p>}
    </div>
  );
}
