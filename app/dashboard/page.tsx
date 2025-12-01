import AuthLayout from '@/components/AuthLayout';
import Link from "next/link";

export default function OTPPage() {
  return (
    <AuthLayout> 
       <div className="p-6 sm:p-8 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">
          Dashboard
        </h1>
            <Link href="/signin" className="text-size12 text-[#8854C0] hover:underline">
              Back to Sign In
            </Link>
          </div>
    </AuthLayout>
  );
}
