"use client";

import { useState, useEffect } from "react";
import OTPInput from "../OTPInput";
import Button from "../Button";
import { useRouter } from "next/navigation";

export default function OTPForm() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(30); // 30 sec timer
  const [resendAvailable, setResendAvailable] = useState(false);
  const [loading, setLoading] = useState(false); // <-- UPDATED


  // countdown
  useEffect(() => {
    if (secondsLeft <= 0) {
      setResendAvailable(true);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const handleResend = () => {
    // simulate resend
    setSecondsLeft(30);
    setResendAvailable(false);
    // call API to resend OTP if needed...
  };

   const handleContinue = async () => {
  setError(null);

  if (otp.length < 6) {
    setError("Please enter the 6-digit OTP.");
    return;
  }
  const storedOtp = localStorage.getItem("mockOtp");

  if (!storedOtp) {
    setError("No OTP found. Please request a new one.");
    return;
  }

  if (otp !== storedOtp) {                            
    setError("Incorrect OTP. Please try again.");     
    return;
  }

  const email = localStorage.getItem("mockOtpEmail") || "";

 

  // Navigate to next step
  router.push("/createpassword");
};

  return (
     <div className="p-6 sm:p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-2">Enter OTP</h2>

      <p className="text-size12 text-gray-400 mb-4">
        Enter the OTP that we have sent to your email address{" "}
        <span className="block">{localStorage.getItem("mockOtpEmail") || "<your-mail-id>"}</span>
      </p>

      <button
        type="button"
        className="text-size12 text-[#8854C0] mb-4"
        onClick={() => router.push("/forgotpassword")}
      >
        Change Email Address
      </button>

      <div className="mb-4">
        <OTPInput
          length={6}
          value={otp}
          onChange={(v) => setOtp(v)}
          inputClassName="" // customize if needed
        />
      </div>

      {error && <p className="text-red-400 text-size12 mb-3">{error}</p>}

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 text-size12 text-gray-400">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span>{secondsLeft} Sec</span>
        </div>

        <div className="flex-1" />

        {resendAvailable ? (
          <button
            type="button"
            className="text-size12 text-[#8854C0] underline"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        ) : null}
      </div>

      <div>
        <Button onClick={handleContinue} disabled={loading}> 
          {loading ? "Verifying..." : "Continue"} 
        </Button>
      </div>
    </div>
  )
}
