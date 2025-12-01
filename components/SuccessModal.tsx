"use client";

import { useEffect } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

type SuccessModalProps = {
  iconSrc: string;
  iconAlt?: string;
  redirectPage? : string;
  title?: string;
  message?: string;
  buttonText?: string;
  iconBgClass?: string;
};

export default function SuccessModal({
  iconSrc,
  iconAlt = "",
  redirectPage,
  title = "Success!",
  message = "",
  buttonText = "Okay",
  iconBgClass = "bg-[#1fa01f]",
}: SuccessModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(redirectPage ? redirectPage : "/"); // <--- Redirect to custom page
  };

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Body */}
      <div className="relative w-full max-w-[500px] mx-auto rounded-2xl bg-[#222226] shadow-2xl overflow-hidden">
        <div className="p-10 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center shadow-md ${iconBgClass}`}
            >
              <img src={iconSrc} alt={iconAlt} className="w-12 h-12" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-center text-2xl md:text-3xl font-semibold text-white mb-4">
            {title}
          </h3>

          {/* Message */}
          {message && (
            <p className="text-center text-size12 text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {message}
            </p>
          )}

          {/* Footer button */}
          <div className="flex justify-end">
            <Button
              onClick={handleClose}
              className="rounded-xl px-6 py-3 bg-[#8854C0] hover:bg-[#8f4df2] text-size12"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
