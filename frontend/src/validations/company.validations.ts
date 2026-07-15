import { z } from "zod";

export const companySchema = z.object({
  name: z.string().trim().min(3, "Company name must be at least 3 characters").max(100, "Company name cannot exceed 100 characters"),
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid company email"),
  website: z.string().trim().min(1, "Website is required").url("Please enter a valid website URL"),
  phone: z.string().trim().optional(),
  location: z.string().trim().optional(),
  description: z.string().trim().optional(),
  industry: z.string().trim().optional(),
  logo: z.string().trim().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;