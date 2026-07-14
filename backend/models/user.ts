import db from "../config/db";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "recruiter" | "candidate";
}

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] || null;
};

export const findUserById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id]
  );

  return rows.length ? rows[0] : null;
};


export const findProfileById = async (id: number) => {
  const [rows]: any = await db.query(
    `SELECT id,name,email,role,is_verified,created_at,updated_at
    FROM users WHERE id = ? LIMIT 1
    `,[id]
  );
  return rows.length ? rows[0] : null;
};

export const createUser = async (user: CreateUser) => {
  const [result]: any = await db.query(
    `
        INSERT INTO users(name,email,password,role)
        VALUES(?,?,?,?)
    `,
    [user.name, user.email, user.password, user.role]
  );

  return result.insertId;
};

export const updateProfile = async (id: number,name: string) => {
  const [result]: any = await db.query(
    `UPDATE users SET name = ? WHERE id = ?`,[name, id]
  );

  return result.affectedRows;
};

export const updatePassword = async (id: number,password: string) => {
  const [result]: any = await db.query(
    `UPDATE users SET password = ? WHERE id = ?`,[password, id]);
    return result.affectedRows;
};

export const findUserPasswordById = async (id: number) => {
  const [rows]: any = await db.query(
    `SELECT id, password FROM users WHERE id = ? LIMIT 1`,[id]);
  return rows[0] || null;
};