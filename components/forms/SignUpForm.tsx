"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "../TextInput";
import PasswordInput from "../PasswordInput";
import Button from "../Button";
import { SocialButton } from "../SocialButton";
import SuccessModal from "../SuccessModal";

import { signUp } from "@/lib/mockAPI";


export default function SignUpForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<string | null>(null); // general error
  const [confirmError, setConfirmError] = useState<string | null>(null); // confirm mismatch
  const [loading, setLoading] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const validate = () => {
    setError(null);
    setConfirmError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    if (!confirm) {
      setConfirmError("Please confirm your password.");
      return false;
    }
    if (password !== confirm) {
      setConfirmError("Oops! Passwords don't match.");
      return false;
    }
    return true;
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); 
    const res = await signUp({ email, password }); 
    setLoading(false); 

    if (!res.ok) {
      setError(res.error || "Something went wrong. Please try again."); 
      return;
    }

    // success: show modal
    setSuccessOpen(true);
    };
  

  return (
    <>
      <div className="max-w-[450px] mx-auto p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">
          Sign Up
        </h1>

        <p className="text-size12 text-gray-400 mb-6">
          Manage your workspace seamlessly. Sign in to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            placeholder="navinash@workhive.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // show a small inline error (general) below if present
          />

          <PasswordInput
            label="Password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <label className="block text-size12 text-gray-200 mb-2">
              Confirm Password
            </label>

            <div className={confirmError ? "rounded-lg border border-red-500 p-1px" : ""}>
              <PasswordInput
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (confirmError) setConfirmError(null);
                }}
              />
            </div>

            {confirmError && (
              <p className="mt-2 text-size12 text-red-400">{confirmError}</p>
            )}
          </div>

          {error && <p className="text-red-400 text-size12">{error}</p>}

          <div>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-700" />
            <span className="mx-3 text-size12 text-gray-400">or</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          <SocialButton
            icon={<img src="/google.svg" alt="Google" className="w-5 h-5" />}
            label="Sign In with Google"
            onClick={() => console.log("Google signup")}
          />

          <SocialButton
            icon={<img src="/microsoft.svg" alt="Microsoft" className="w-5 h-5" />}
            label="Sign In with Microsoft"
            className="mt-3"
            onClick={() => console.log("Microsoft signup")}
          />

          <p className="text-center text-size12 text-gray-400 mt-6">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#8854C0] hover:underline"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </button>
          </p>
        </form>
      </div>

      {successOpen && (
        <SuccessModal
          iconSrc="/success-tick.svg"
          title="Account Created!"
          message="We've sent a verification link to your email. Verify and then sign in."
          buttonText="Okay"
          iconBgClass="bg-[#1fa01f]"
          redirectPage="/signin" 
          />
      )}
    </>
  );
}
