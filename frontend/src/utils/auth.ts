export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "candidate" | "recruiter" | "admin";
  is_verified: boolean;
}

export const setAuth = (token: string, user: AuthUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getUser = (): AuthUser | null => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    return JSON.parse(user) as AuthUser;
  } catch {
    return null;
  }
};

export const removeAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};