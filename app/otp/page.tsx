import OTPForm from "@/components/forms/OTPForm"; // adjust path if your components folder differs
import AuthLayout from '@/components/AuthLayout';

export default function OTPPage() {
  return (
    <AuthLayout> 
              <OTPForm/>
    </AuthLayout>
  );
}
