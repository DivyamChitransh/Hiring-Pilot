import api from "./endpoints"
import type {CreateCompanyPayload,UpdateCompanyPayload,GetCompaniesParams} from "@/types/Company";

export const createCompany = (data: CreateCompanyPayload) => api.post("/company/add", data);

export const getCompanies = (params?: GetCompaniesParams) =>api.get("/company", {params});

export const getCompanyById = (id: number) => api.get(`/company/${id}`);

export const updateCompany = (id: number,data: UpdateCompanyPayload) => api.put(`/company/${id}`, data);

export const deleteCompany = (id: number) => api.delete(`/company/${id}`);