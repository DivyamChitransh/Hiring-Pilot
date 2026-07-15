import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters").max(50, "Password cannot exceed 50 characters"),
  role: z.enum(["candidate", "recruiter", "admin"]),
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) =>
      data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;