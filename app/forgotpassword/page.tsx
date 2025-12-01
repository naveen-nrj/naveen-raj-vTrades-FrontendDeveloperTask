import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import AuthLayout from '@/components/AuthLayout';

export const metadata = {
  title: "Forgot Password - Workhive",
};

export default function Page() {
  return (
    <AuthLayout> 
          <ForgotPasswordForm/>
    </AuthLayout>
  );
}
