import db from "../config/db";

const createUsersTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin','recruiter','candidate') NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
};

const createCompaniesTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS companies (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      website VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      industry VARCHAR(100),
      location VARCHAR(255),
      logo VARCHAR(255),
      created_by INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT fk_company_creator
      FOREIGN KEY (created_by)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
};

const createJobsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      company_id INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      location VARCHAR(255),
      employment_type VARCHAR(20) NOT NULL,
      Work_mode ENUM('Remote','On-site','Hybrid') NOT NULL,
      experience_min INT DEFAULT 0,
      experience_max INT DEFAULT 0,
      salary_min INT,
      salary_max INT,
      openings INT DEFAULT 1,
      skills TEXT,
      application_deadline DATE,
      status ENUM('Open','Closed') DEFAULT 'Open',
      created_by INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT fk_job_company FOREIGN KEY(company_id) REFERENCES companies(id)
      ON DELETE CASCADE,
      CONSTRAINT fk_job_creator FOREIGN KEY(created_by) REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
};

const createCandidatesTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS candidates (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL UNIQUE,
      headline VARCHAR(255),
      bio TEXT,
      profile_image VARCHAR(255),
      resume VARCHAR(255),
      skills TEXT,
      degree VARCHAR(255),
      education TEXT,
      education_timeline VARCHAR(50),
      work_history JSON,
      experience INT DEFAULT 0,
      current_company VARCHAR(255),
      current_ctc DECIMAL(12,2),
      expected_ctc DECIMAL(12,2),
      notice_period INT,
      current_location VARCHAR(255),
      preferred_location VARCHAR(255),
      portfolio_url VARCHAR(255),
      linkedin_url VARCHAR(255),
      github_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,

      CONSTRAINT fk_candidate_user
      FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
};

const createApplicationsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT PRIMARY KEY AUTO_INCREMENT,
      job_id INT NOT NULL,
      candidate_id INT NOT NULL,
      resume VARCHAR(255) NOT NULL,
      cover_letter TEXT NULL,
      expected_salary DECIMAL(12,2) NULL,
      notice_period INT NULL,
      status ENUM('Applied','Screening','Interview','Rejected','Hired') DEFAULT 'Applied',
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE(job_id, candidate_id),
      CONSTRAINT fk_application_job
      FOREIGN KEY (job_id)
      REFERENCES jobs(id)
      ON DELETE CASCADE,
      CONSTRAINT fk_application_candidate
      FOREIGN KEY (candidate_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);
};

const migrateCandidatesTable = async () => {
  const migrations = [
    "ADD COLUMN degree VARCHAR(255) NULL AFTER skills",
    "ADD COLUMN education_timeline VARCHAR(50) NULL AFTER education",
    "ADD COLUMN work_history JSON NULL AFTER education_timeline",
  ];

  for (const migration of migrations) {
    try {
      await db.query(`ALTER TABLE candidates ${migration}`);
    } catch (error: any) {
      if (error?.code !== "ER_DUP_FIELDNAME") throw error;
    }
  }
};

export const initializeDatabase = async () => {

  await createUsersTable();
  await createCompaniesTable();
  await createJobsTable();
  await createCandidatesTable();
  await migrateCandidatesTable();
  await createApplicationsTable();
};