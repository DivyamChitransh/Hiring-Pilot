import { z } from "zod";

export const workExperienceSchema = z.object({
  company: z.string().trim().min(1, "Company name is required"),
  location: z.string().trim().min(1, "Location is required"),
  role: z.string().trim().min(1, "Role is required"),
  start_date: z.string().trim().min(1, "Start date is required"),
  end_date: z.string().trim().min(1, "End date is required"),
});

export const candidateSchema = z.object({
  headline: z
    .string()
    .trim()
    .min(3, "Headline must be at least 3 characters")
    .max(100, "Headline cannot exceed 100 characters"),
  bio: z.string().trim().optional(),
  profile_image: z.string().optional(),
  resume: z.string().min(1, "Resume is required"),
  skills: z.string().trim().min(1, "Skills are required"),
  degree: z.string().trim().optional(),
  education: z.string().trim().optional(),
  education_timeline: z.string().trim().optional(),
  work_history: z.array(workExperienceSchema).optional(),
  experience: z.number().min(0, "Experience must be at least 0"),
  current_company: z.string().trim().optional(),
  current_ctc: z.number().optional(),
  expected_ctc: z.number().optional(),
  notice_period: z.number().optional(),
  current_location: z.string().trim().min(1, "Current location is required"),
  preferred_location: z.string().trim().optional(),
  portfolio_url: z.string().trim().optional(),
  linkedin_url: z.string().trim().optional(),
  github_url: z.string().trim().optional(),
});

export type CandidateFormData = z.infer<typeof candidateSchema>;
export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;
