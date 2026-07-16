import db from "../config/db";

interface CreateJob {
  company_id: number;
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
  created_by: number;
}

interface UpdateJob {
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
}

export const findJobByTitle = async (company_id: number,title: string) => {
  const [rows]: any = await db.query(
    ` SELECT * FROM jobs WHERE company_id = ? AND LOWER(TRIM(title)) = LOWER(TRIM(?)) LIMIT 1
    `,[company_id, title]);
  return rows.length ? rows[0] : null;
};

export const findJobById = async (id: number) => {
  const [rows]: any = await db.query(
    `SELECT j.*,c.name AS company_name,c.logo AS company_logo,c.website AS company_website,c.email AS company_email
      FROM jobs j INNER JOIN companies c ON j.company_id = c.id
      WHERE j.id = ?
      LIMIT 1
    `,[id]
  );
  return rows.length ? rows[0] : null;
};

export const getJobs = async (limit: number,offset: number) => {
  const [rows]: any = await db.query(
    `SELECT j.*,c.name AS company_name,c.logo AS company_logo,c.website AS company_website,c.email AS company_email
      FROM jobs j INNER JOIN companies c ON j.company_id = c.id
      ORDER BY j.created_at DESC
      LIMIT ? OFFSET ?
    `,[limit, offset]
  );
  const [count]: any = await db.query(`SELECT COUNT(*) AS total FROM jobs`);

  return {data: rows,total: count[0].total};
};

export const getJobsByUser = async (created_by: number,limit: number,offset: number) => {
  const [rows]: any = await db.query(
    `
      SELECT j.*,c.name AS company_name,c.logo AS company_logo,c.website AS company_website,c.email AS company_email
      FROM jobs j INNER JOIN companies c ON j.company_id = c.id
      WHERE j.created_by = ?
      ORDER BY j.created_at DESC
      LIMIT ? OFFSET ?
    `,[created_by, limit, offset]);

  const [count]: any = await db.query(`SELECT COUNT(*) AS total FROM jobs WHERE created_by = ?`,[created_by]);
  return {data: rows,total: count[0].total};
};

export const findJobByTitleExcludingId = async (company_id: number,title: string,jobId: number) => {
  const [rows]: any = await db.query(
    `SELECT * FROM jobs WHERE company_id = ? AND LOWER(TRIM(title)) = LOWER(TRIM(?)) AND id != ?
      LIMIT 1
    `,[company_id, title, jobId]
  );
  return rows.length ? rows[0] : null;
};

export const createJob = async (job: CreateJob) => {
  const [result]: any = await db.query(
    `INSERT INTO jobs (company_id,title,description,location,employment_type,work_mode,experience_min,experience_max,salary_min,salary_max,openings,skills,application_deadline,created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      job.company_id,
      job.title,
      job.description,
      job.location || null,
      job.employment_type,
      job.work_mode,
      job.experience_min,
      job.experience_max,
      job.salary_min || null,
      job.salary_max || null,
      job.openings || 1,
      job.skills || null,
      job.application_deadline || null,
      job.created_by,
    ]
  );
  return result.insertId;
};

export const updateJob = async (id: number,job: UpdateJob) => {
  const [result]: any = await db.query(
    `UPDATE jobs SET title = ?,description = ?,location = ?,employment_type = ?,work_mode = ?,experience_min = ?,experience_max = ?,salary_min = ?,salary_max = ?,openings = ?,skills = ?,application_deadline = ?,status = ?WHERE id = ?`,
    [
      job.title,
      job.description,
      job.location || null,
      job.employment_type,
      job.work_mode,
      job.experience_min,
      job.experience_max,
      job.salary_min || null,
      job.salary_max || null,
      job.openings || 1,
      job.skills || null,
      job.application_deadline || null,
      job.status,
      id,
    ]
  );
  return result.affectedRows;
};

export const deleteJob = async (id: number) => {
  const [result]: any = await db.query(`DELETE FROM jobs WHERE id = ?`,[id]);

  return result.affectedRows;
};

export const getOpenJobs = async (limit: number,offset: number) => {
  const [rows]: any = await db.query(
    ` SELECT j.*,c.name AS company_name,c.logo AS company_logo,c.website AS company_website,c.email AS company_email
    FROM jobs j INNER JOIN companies c ON j.company_id = c.id
    WHERE j.status = 'Open'
    ORDER BY j.created_at DESC
    LIMIT ? OFFSET ?
    `,[limit, offset]);

  const [count]: any = await db.query(`SELECT COUNT(*) AS total FROM jobs WHERE status = 'Open'`);
  return {data: rows,total: count[0].total};
};