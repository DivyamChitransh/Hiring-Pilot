import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import JobForm from "@/components/jobs/Jobform";
import { createJob } from "@/api/jobs";
import type { JobFormData } from "@/validations/job";

const CreateJob = () => {
  const navigate = useNavigate();
  const handleSubmit = async (data: JobFormData) => {
    try {
      const { data: response } = await createJob({...data,status: "Open"});
      toast.success(response.message);
      navigate("/jobs");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to create job"
      );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Create Job
        </h1>

        <p className="mt-2 text-muted-foreground">
          Fill in the details below to publish a new job posting.
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <JobForm
          submitText="Create Job"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateJob;