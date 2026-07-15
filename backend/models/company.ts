import db from "../config/db";

interface CreateCompany {
  name: string;
  description?: string;
  website: string;
  email: string;
  phone?: string;
  industry?: string;
  location?: string;
  logo?: string;
  created_by: number;
}

interface UpdateCompany {
  name: string;
  description?: string;
  website: string;
  email: string;
  phone?: string;
  industry?: string;
  location?: string;
  logo?: string;
}

export const findCompanyByName = async (name: string,created_by: number) => {
  const [rows]: any = await db.query(
    `SELECT * FROM companies
     WHERE name = ? AND created_by = ?
     LIMIT 1`,
    [name, created_by]
  );
  return rows.length ? rows[0] : null;
};

export const findCompanyById = async (id: number) => {
  const [rows]: any = await db.query(
    `SELECT * FROM companies
     WHERE id = ?
     LIMIT 1`,
    [id]
  );
  return rows.length ? rows[0] : null;
};

export const getCompaniesByUser = async (created_by: number,limit: number,offset: number) => {
  const [rows]: any = await db.query(
    `SELECT *
     FROM companies
     WHERE created_by = ?
     ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [created_by, limit, offset]
  );
  return rows;
};

export const getCompanies = async (limit: number,offset: number) => {
  const [rows]: any = await db.query(
    ` SELECT * FROM companies ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  const [count]: any = await db.query(
    `SELECT COUNT(*) AS total FROM companies`
  );
  return { data: rows, total: count[0].total};
};

export const createCompany = async (
  company: CreateCompany
) => {
  const [result]: any = await db.query(
    `INSERT INTO companies(name,description,website,email,phone,industry,location,logo,created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      company.name,
      company.description || null,
      company.website || null,
      company.email,
      company.phone || null,
      company.industry || null,
      company.location || null,
      company.logo || null,
      company.created_by
    ]
  );
  return result.insertId;
};

export const updateCompany = async (id: number,company: UpdateCompany) => {
  const [result]: any = await db.query(
    `
      UPDATE companies
      SET name = ?, description = ?, website = ?, email = ?, phone = ?, industry = ?, location = ?, logo = ?    WHERE id = ?
    `,
    [ 
      company.name,
      company.description || null,
      company.website || null,
      company.email,
      company.phone || null,
      company.industry || null,
      company.location || null,
      company.logo || null,
      id
    ]
  );
  return result.affectedRows;
};

export const deleteCompany = async (id: number) => {
  const [result]: any = await db.query(
    `DELETE FROM companies WHERE id = ?`,
    [id]
  );
  return result.affectedRows;
};