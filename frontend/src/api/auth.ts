import api from "./endpoints"

export interface SignupPayload {name: string;email: string;password: string;role: "admin" | "recruiter" | "candidate"}

export interface LoginPayload {email: string;password: string}

export interface UpdateProfilePayload {name: string}

export interface ChangePasswordPayload {currentPassword: string;newPassword: string}

export const signup = (data: SignupPayload) => {return api.post("/auth/signup", data)};

export const login = (data: LoginPayload) => {return api.post("/auth/login", data)};

export const updateProfile = (data: UpdateProfilePayload) => {return api.put("/auth/profile", data)};

export const changePassword = (data: ChangePasswordPayload) => {return api.put("/auth/change-password", data)};

export interface Profile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "recruiter" | "candidate";
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {success: boolean;data: Profile;}

export const getProfile = () => {return api.get<ProfileResponse>("/auth/profile")};