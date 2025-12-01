import AuthLayout from '@/components/AuthLayout';
import CreatePasswordForm from "@/components/forms/CreatePasswordForm";

export default function OTPPage() {
  return (
    <AuthLayout> 
              <CreatePasswordForm/> 
    </AuthLayout>
  );
}
