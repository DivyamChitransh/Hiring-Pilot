export interface WorkExperience {
  company: string;
  location: string;
  role: string;
  start_date: string;
  end_date: string;
}

export interface Candidate {
  id: number;
  user_id: number;
  headline: string;
  bio?: string;
  profile_image?: string;
  resume: string;
  skills: string;
  degree?: string;
  education?: string;
  education_timeline?: string;
  work_history?: WorkExperience[];
  experience: number;
  current_company?: string;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period?: number;
  current_location: string;
  preferred_location?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCandidatePayload {
  headline: string;
  bio?: string;
  profile_image?: string;
  resume: string;
  skills: string;
  degree?: string;
  education?: string;
  education_timeline?: string;
  work_history?: WorkExperience[];
  experience: number;
  current_company?: string;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period?: number;
  current_location: string;
  preferred_location?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface UpdateCandidatePayload
  extends Partial<CreateCandidatePayload> {}

export interface CandidateResponse {
  success: boolean;
  message: string;
  data: Candidate;
}
