import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CandidateForm from "@/components/candidate/Candidatefrom"
import { createCandidate } from "@/api/candidate";
import type { CandidateFormData } from "@/validations/candidate";
const CreateCandidate = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: CandidateFormData) => {
    try {
      const { data: response } = await createCandidate(data);
      toast.success(response.message);
      navigate("/candidate");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create candidate profile"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Complete your profile to start applying for jobs.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <CandidateForm
          submitText="Create Profile"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateCandidate;