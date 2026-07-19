import db from "../config/db";

export interface WorkExperience {
  company: string;
  location: string;
  role: string;
  start_date: string;
  end_date: string;
}

interface CreateCandidate {
  user_id: number;
  headline?: string;
  bio?: string;
  profile_image?: string;
  resume?: string;
  skills?: string;
  degree?: string;
  education?: string;
  education_timeline?: string;
  work_history?: WorkExperience[];
  experience?: number;
  current_company?: string;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period?: number;
  current_location?: string;
  preferred_location?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

interface UpdateCandidate {
  headline?: string;
  bio?: string;
  profile_image?: string;
  resume?: string;
  skills?: string;
  degree?: string;
  education?: string;
  education_timeline?: string;
  work_history?: WorkExperience[];
  experience?: number;
  current_company?: string;
  current_ctc?: number;
  expected_ctc?: number;
  notice_period?: number;
  current_location?: string;
  preferred_location?: string;
  portfolio_url?: string;
  linkedin_url?: string;
  github_url?: string;
}

const parseWorkHistory = (value: unknown): WorkExperience[] => {
  if (!value) return [];
  if (Array.isArray(value)) return value as WorkExperience[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const formatCandidate = (row: any) => {
  if (!row) return null;
  return {
    ...row,
    work_history: parseWorkHistory(row.work_history),
  };
};

const serializeWorkHistory = (workHistory?: WorkExperience[]) => {
  if (!workHistory?.length) return null;
  return JSON.stringify(workHistory);
};

export const getCandidateByUserId = async (user_id: number) => {
  const [rows]: any = await db.query(
    `SELECT * FROM candidates WHERE user_id = ? LIMIT 1`,
    [user_id]
  );
  return rows.length ? formatCandidate(rows[0]) : null;
};

export const createCandidate = async (candidate: CreateCandidate) => {
  const [result]: any = await db.query(
    `INSERT INTO candidates (user_id,headline,bio,profile_image,resume,skills,degree,education,education_timeline,work_history,experience,current_company,current_ctc,expected_ctc,notice_period,current_location,preferred_location,portfolio_url,linkedin_url,github_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      candidate.user_id,
      candidate.headline || null,
      candidate.bio || null,
      candidate.profile_image || null,
      candidate.resume || null,
      candidate.skills || null,
      candidate.degree || null,
      candidate.education || null,
      candidate.education_timeline || null,
      serializeWorkHistory(candidate.work_history),
      candidate.experience || 0,
      candidate.current_company || null,
      candidate.current_ctc || null,
      candidate.expected_ctc || null,
      candidate.notice_period || null,
      candidate.current_location || null,
      candidate.preferred_location || null,
      candidate.portfolio_url || null,
      candidate.linkedin_url || null,
      candidate.github_url || null,
    ]
  );
  return result.insertId;
};

export const updateCandidate = async (user_id: number, candidate: UpdateCandidate) => {
  const [result]: any = await db.query(
    `UPDATE candidates
     SET headline = ?,bio = ?,profile_image = ?,resume = ?,skills = ?,degree = ?,education = ?,education_timeline = ?,work_history = ?,experience = ?,current_company = ?,current_ctc = ?,expected_ctc = ?,notice_period = ?,current_location = ?,preferred_location = ?,portfolio_url = ?,linkedin_url = ?,github_url = ?
     WHERE user_id = ?`,
    [
      candidate.headline || null,
      candidate.bio || null,
      candidate.profile_image || null,
      candidate.resume || null,
      candidate.skills || null,
      candidate.degree || null,
      candidate.education || null,
      candidate.education_timeline || null,
      serializeWorkHistory(candidate.work_history),
      candidate.experience || 0,
      candidate.current_company || null,
      candidate.current_ctc || null,
      candidate.expected_ctc || null,
      candidate.notice_period || null,
      candidate.current_location || null,
      candidate.preferred_location || null,
      candidate.portfolio_url || null,
      candidate.linkedin_url || null,
      candidate.github_url || null,
      user_id,
    ]
  );
  return result.affectedRows;
};
