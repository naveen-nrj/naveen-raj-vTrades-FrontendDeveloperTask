"use client";

import React, { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import SuccessModal from "../SuccessModal";
import Link from "next/link";

import { forgotPassword } from "@/lib/mockAPI";


export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // simple validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true); 
    const res = await forgotPassword({ email }); 
    setLoading(false); 

    if (!res.ok) {
      setError(res.error || "Something went wrong. Please try again later."); 
      return;
    }

    // store debug token & otp to use on later screens
    //refer mockAPI.ts and api folder for response
    if (res.data?.debug?.tempToken) {
      localStorage.setItem("mockResetToken", res.data.debug.tempToken); 
    }
    if (res.data?.debug?.otp) {
      localStorage.setItem("mockOtp", res.data.debug.otp); 
    }
    localStorage.setItem("mockOtpEmail", email); 

    setSuccessOpen(true);
  };

  return (
    <>
      <div className="p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Forgot Your Password?
        </h1>

        <p className="text-size12 text-gray-400 mb-6">
          Don't worry! Enter your email address, and we'll send you a link to reset it.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            placeholder="navinash@workhive.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
          />

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </Button>
          </div>

          <div className="pt-2 text-center">
            <Link href="/signin" className="text-size12 text-[#8854C0] hover:underline">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>

      {successOpen && (
        <SuccessModal
          iconSrc = "/success-email.svg"
          title="Link Sent Successfully!"
          message="Check your inbox. We've sent you an email with instructions to reset your password."
          redirectPage="/otp"
        />
      )}
    </>
  );
}
