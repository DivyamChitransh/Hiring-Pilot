import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { login } from "@/api/auth";
import { setAuth  } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {loginSchema,LoginFormData} from "@/validations/auth.validation";

const LoginForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormData) => {
  try {
    const { data } = await login(formData);
    setAuth(data.token, data.user);
    toast.success(data.message);
    switch (data.user.role) {
      case "candidate":
        navigate("/candidate/dashboard", {replace: true});
        break;
      case "recruiter":
        navigate("/recruiter/dashboard", {replace: true});
        break;
      case "admin":
        navigate("/admin/dashboard", {replace: true});
        break;
      default:
        navigate("/", {replace: true});
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message ?? "Login failed");
    } else {
      toast.error("Something went wrong");
    }
  }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="h-12 rounded-xl pl-11"
            {...register("email")}
          />
        </div>

        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            id="password"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter your password"
            className="h-12 rounded-xl pl-11 pr-11"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="text-sm text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl text-base font-semibold"
      >
        {isSubmitting ? (
          "Signing In..."
        ) : (
          <>
            Sign In
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Footer */}

      <div className="space-y-3 text-center">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </button>

        <p className="text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;