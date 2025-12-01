"use client";

import React, { useState } from "react";
import PasswordInput from "../PasswordInput";
import Button from "../Button";
import SuccessModal from "../SuccessModal";
import { useRouter } from "next/navigation";

import { createPassword  } from "@/lib/mockAPI";

export default function CreatePasswordForm() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const validate = () => {
    // basic checks: non-empty + match
    if (!password) {
      setConfirmError("Please enter a password.");
      return false;
    }
    if (!confirm) {
      setConfirmError("Please re-enter your password.");
      return false;
    }
    if (password !== confirm) {
      setConfirmError("Oops! Passwords Don't Match");
      return false;
    }
    setConfirmError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // call createPassword API 
    setLoading(true); 
    const token = localStorage.getItem("mockResetToken") || "";
    const res = await createPassword({ token, password }); 
    setLoading(false); 

    if (!res.ok) {
      setConfirmError(res.error || "Something went wrong. Please try again."); 
      return;
    }

    // on success, open modal
    setSuccessOpen(true);
    localStorage.removeItem("mockResetToken"); 
    localStorage.removeItem("mockOtp"); 
  };

  return (
    <>
      <div className="max-w-[450px] mx-auto p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Create New Password
        </h1>

        <p className="text-size12 text-gray-400 mb-6">
          Choose a strong and secure password to keep your account safe.
          Make sure it's easy for you to remember, but hard for others to guess!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password field */}
          <div>
            <label className="block text-size12 text-gray-200 mb-2">Password</label>
            <PasswordInput
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm field with error styling if mismatch */}
          <div>
            <label className="block text-size12 text-gray-200 mb-2">
              Re-enter your new password
            </label>
            <div className={confirmError ? "ring-0" : ""}>
              <div className={confirmError ? "rounded-lg border border-red-500 p-[1px]" : ""}>
                <PasswordInput
                  placeholder="Re-enter new password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (confirmError) setConfirmError(null); // clear on change
                  }}
                />
              </div>
            </div>

            {confirmError && (
              <p className="mt-2 text-size12 text-red-400 flex items-center gap-2">
                {/* optional icon */}
                <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M11.997 6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.997 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {confirmError}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </div>

      {successOpen && (
        <SuccessModal
          iconSrc="/success-tick.svg"
          iconAlt="Success"
          title="Password Created!"
          message="Your password has been successfully updated. You can now use your new password to log in."
          buttonText="Okay"
          iconBgClass="bg-[#1fa01f]"
          redirectPage="/signin"
          />
      )}
    </>
  );
}
