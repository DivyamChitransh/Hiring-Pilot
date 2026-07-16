import { z } from "zod";

export const jobSchema = z.object({
    company_id: z.number().min(1, "Company is required"),
    title: z.string().trim().min(3, "Job title must be at least 3 characters").max(100, "Job title cannot exceed 100 characters"),
    description: z.string().trim().min(20, "Description must be at least 20 characters"),
    location: z.string().trim().optional(),
    employment_type: z.string().trim().min(1, "Employment type is required"),
    work_mode: z.enum(["On-site","Remote","Hybrid"]),
    experience_min: z.number().min(0, "Minimum experience must be at least 0"),
    experience_max: z.number().min(0, "Maximum experience must be at least 0"),
    salary_min: z.number().optional(),
    salary_max: z.number().optional(),
    openings: z.number().min(1).optional(),
    skills: z.string().trim().optional(),
    application_deadline: z.string().optional(),
  }).refine((data) => !data.salary_min || !data.salary_max || data.salary_max >= data.salary_min,{path: ["salary_max"],message:"Maximum salary must be greater than minimum salary"}
  );

export type JobFormData = z.infer<typeof jobSchema>;