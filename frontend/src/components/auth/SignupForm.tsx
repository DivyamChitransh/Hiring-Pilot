import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

import { signup } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  signupSchema,
  SignupFormData,
} from "@/validations/auth.validation";

const SignupForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "candidate",
    },
  });

  const onSubmit = async (formData: SignupFormData) => {
    try {
      const { data } = await signup(formData);

      toast.success(data.message);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Signup failed"
        );
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
      {/* Name */}

      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>

        <div className="relative">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            id="name"
            placeholder="Enter your full name"
            className="h-12 rounded-xl pl-11"
            {...register("name")}
          />
        </div>

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}

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
        <Label htmlFor="password">Password</Label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            className="h-12 rounded-xl pl-11 pr-11"
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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

      {/* Role */}

      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>

        <select
          id="role"
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 focus:border-blue-600 focus:outline-none"
          {...register("role")}
        >
          <option value="candidate">
            Candidate
          </option>

          <option value="recruiter">
            Recruiter
          </option>
        </select>

        {errors.role && (
          <p className="text-sm text-red-500">
            {errors.role.message}
          </p>
        )}
      </div>

      {/* Button */}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-xl text-base font-semibold"
      >
        {isSubmitting ? (
          "Creating Account..."
        ) : (
          <>
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;