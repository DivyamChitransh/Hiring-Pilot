import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CandidateForm from "@/components/candidate/Candidatefrom"
import {getCandidateProfile,updateCandidate} from "@/api/candidate";
import type { Candidate } from "@/types/Candidate";
import type { CandidateFormData } from "@/validations/candidate";

const EditCandidate = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {fetchCandidate()}, []);

  const fetchCandidate = async () => {
    try {
      const { data } = await getCandidateProfile();
      setCandidate(data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch candidate profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (formData: CandidateFormData) => {
    try {
      const { data } = await updateCandidate(formData);
      toast.success(data.message);
      navigate("/candidate");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Update failed"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!candidate) return null;
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Profile</h1>
        <p className="mt-2 text-slate-500">Update your profile details.</p>
      </div>
      <CandidateForm defaultValues={candidate} submitText="Update Profile" onSubmit={handleUpdate}/>
    </div>
  );
};

export default EditCandidate;