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

const createApplicationsTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT PRIMARY KEY AUTO_INCREMENT,
      job_id INT NOT NULL,
      candidate_id INT NOT NULL,
      resume_url VARCHAR(500),
      status ENUM(
        'Applied',
        'Screening',
        'Interview',
        'Rejected',
        'Hired'
      ) DEFAULT 'Applied',
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      UNIQUE(job_id, candidate_id),

      CONSTRAINT fk_application_job
      FOREIGN KEY(job_id)
      REFERENCES jobs(id)
      ON DELETE CASCADE,

      CONSTRAINT fk_application_candidate
      FOREIGN KEY(candidate_id)
      REFERENCES users(id)
      ON DELETE CASCADE
    )
  `);

};

export const initializeDatabase = async () => {

  await createUsersTable();
  await createCompaniesTable();
  await createJobsTable();
  await createApplicationsTable();
};