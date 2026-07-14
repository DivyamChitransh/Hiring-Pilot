import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <AuthLayout>
      <AuthCard
        title="Welcome Back"
        subtitle="Login to continue"
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;