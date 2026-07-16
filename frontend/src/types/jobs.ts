export interface Job {
  id: number;
  company_id: number;
  company_name: string;
  company_logo?: string;
  company_email: string;
  company_website?: string;
  title: string;
  description: string;
  location?: string;
  employment_type: string;
  work_mode: "On-site" | "Remote" | "Hybrid";
  experience_min: number;
  experience_max: number;
  salary_min?: number;
  salary_max?: number;
  openings?: number;
  skills?: string;
  application_deadline?: string;
  status: "Open" | "Closed";
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface CreateJobPayload {
  company_id: number;
  title: string;
  description: string;
  location?: string;
  employment_type: string;
  work_mode: "On-site" | "Remote" | "Hybrid";
  experience_min: number;
  experience_max: number;
  status: "Open" | "Closed";
  salary_min?: number;
  salary_max?: number;
  openings?: number;
  skills?: string;
  application_deadline?: string;
}

export interface UpdateJobPayload
  extends Partial<CreateJobPayload> {}

export interface GetJobsParams {
  page?: number;
  limit?: number;
}