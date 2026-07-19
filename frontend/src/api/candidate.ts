import api from "./endpoints";
import type {CreateCandidatePayload,UpdateCandidatePayload,Candidate,CandidateResponse} from "@/types/Candidate"

export const createCandidate = (data: CreateCandidatePayload) =>
  api.post("/candidates/create", data);

export const getCandidateProfile = () =>
  api.get<CandidateResponse>("/candidates");

export const updateCandidate = (data: UpdateCandidatePayload) =>
  api.put("/candidates/update", data);

