import api from "./endpoints"
import type {CreateJobPayload,UpdateJobPayload,GetJobsParams} from "@/types/jobs";

export const createJob = (data: CreateJobPayload) => api.post("/job/add", data);

export const getJobs = (params?: GetJobsParams) => api.get("/job", {params});

export const getJobById = (id: number) => api.get(`/job/${id}`);

export const updateJob = (id: number,data: UpdateJobPayload) => api.put(`/job/${id}`, data);

export const deleteJob = (id: number) => api.delete(`/job/${id}`);