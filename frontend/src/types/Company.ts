export interface Company {
  id: number;
  name: string;
  email: string;
  website: string;
  phone?: string;
  location?: string;
  description?: string;
  industry?: string;
  logo?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCompanyPayload {
  name: string;
  email: string;
  website: string;
  phone?: string;
  location?: string;
  description?: string;
  industry?: string;
  logo?: string;
}

export interface UpdateCompanyPayload {
  name: string;
  email: string;
  website: string;
  phone?: string;
  location?: string;
  description?: string;
  industry?: string;
  logo?: string;
}

export interface GetCompaniesParams {
  page?: number;
  limit?: number;
}