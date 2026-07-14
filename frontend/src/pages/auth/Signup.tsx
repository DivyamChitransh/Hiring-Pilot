import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

const Signup = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Create your account to continue"
      >
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;