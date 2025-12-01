"use client";

import React from "react";

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
};

export const SocialButton = ({
  icon,
  label,
  className = "",
  onClick,
}: SocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full h-12 rounded-xl border border-gray-700
        flex items-center justify-center gap-3  /* UPDATED */
        text-white text-size12 hover:bg-white/5 transition
        ${className} 
      `}
    >
      <span className="flex items-center justify-center">
        {icon}
      </span>

      <span className="text-size12">{label}</span>
    </button>
  );
};
