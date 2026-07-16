import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import JobForm from "@/components/jobs/Jobform";
import {getJobById,updateJob,} from "@/api/jobs";
import type { Job } from "@/types/jobs";
import type { JobFormData } from "@/validations/job";
const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {fetchJob()}, []);
  const fetchJob = async () => {
    try {
      const { data } = await getJobById(Number(id));
      setJob(data.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch job");
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (formData: JobFormData) => {
    try {
      const { data } = await updateJob(Number(id),formData);
      toast.success(data.message);
      navigate("/jobs");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Update failed"
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!job) return null;
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Job
        </h1>
        <p className="mt-2 text-slate-500">
          Update job details.
        </p>
      </div>
      <JobForm
        defaultValues={job}
        submitText="Update Job"
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditJob;