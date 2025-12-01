"use client";
import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import TextInput from "../TextInput";
import PasswordInput from "../PasswordInput";
import CheckBox from "../CheckBox";
import Button from "../Button";
import { SocialButton } from "../SocialButton";

import { signIn } from "@/lib/mockAPI"; // <-- wrapper

export default function SignInForm() {
    const router = useRouter();
  

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
    setError(null);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    return true;
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true); 

    try {
      // call mock API wrapper
      const res = await signIn({ email, password }); 

      setLoading(false); 

      if (!res.ok) {
        // show error from mock API if present
        setError(res.error || "Sign in failed");
        return;
      }

      // success — store session token (mock) and redirect
      const token = res.data.session.token; 
      localStorage.setItem("mock_session", token); 

      router.push("/dashboard"); 
    } catch (err: any) {
      
      setLoading(false); 
      setError(err?.message || "An unexpected error occurred"); 
    }
  };

  return (
    <div className="w-full max-w-[450px] mx-auto">
      <div className=" p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">Sign In</h1>
        <p className="text-sm text-gray-400 mb-6">
          Manage your workspace seamlessly. Sign in to continue.
        </p>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
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
          <div className="flex items-center justify-between">
            <CheckBox label="Remember me" name="remember" />
            <Link
            href="/forgotpassword"
            className="text-base12 text-[#8854C0] hover:underline"
            >
            Forgot Password?
            </Link>
          </div>

                    {error && <p className="text-red-400 text-size12">{error}</p>}


          <div>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-700" />
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          <SocialButton
            icon={<img src="/google.svg" alt="Google" className="w-5 h-5" />}
            label="Sign In with Google"
            onClick={() => console.log("google")}
          />

          <SocialButton
            icon={<img src="/microsoft.svg" alt="Microsoft" className="w-5 h-5" />}
            label="Sign In with Microsoft"
            className="mt-3"
            onClick={() => console.log("ms")}
          />

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?  
            <Link
            href="/signup"
            className="text-base12 text-[#8854C0] hover:underline"
            >
            Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
