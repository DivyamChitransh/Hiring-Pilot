import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {Briefcase,MapPin,Building2,IndianRupee,} from "lucide-react";
import { Button } from "@/components/ui/button";
import {getJobs,deleteJob} from "@/api/jobs";
import type { Job } from "@/types/jobs";

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [pagination, setPagination] = useState({page: 1,limit: 10,total: 0,totalPages: 1});

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await getJobs({page,limit});
      setJobs(data.data);
      setPagination(data.pagination);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmed) return;
    try {
      const { data } = await deleteJob(id);
      toast.success(data.message);
      fetchJobs();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {fetchJobs()}, [page]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Jobs
          </h1>

          <p className="text-sm text-slate-500">
            Total Jobs: {pagination.total}
          </p>
        </div>

        <Link to="/jobs/create">
          <Button>Create Job</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  <Briefcase size={20} />

                  {job.title}
                </h2>

                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <Building2 size={16} />

                  {job.company_name}
                </p>

                {job.location && (
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={16} />

                    {job.location}
                  </p>
                )}

                <p className="text-sm text-slate-500">
                  Employment :
                  {" "}
                  {job.employment_type}
                </p>

                <p className="text-sm text-slate-500">
                  Work Mode :
                  {" "}
                  {job.work_mode}
                </p>

                <p className="text-sm text-slate-500">
                  Experience :
                  {" "}
                  {job.experience_min} -{" "}
                  {job.experience_max} Years
                </p>

                {(job.salary_min ||
                  job.salary_max) && (
                  <p className="flex items-center gap-2 text-sm text-slate-500">
                    <IndianRupee size={16} />

                    {job.salary_min?.toLocaleString()} -
                    {" "}
                    {job.salary_max?.toLocaleString()}
                  </p>
                )}

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.status}
                </span>

                <div className="mt-5 flex gap-3">
                 <Link to={`/jobs/${job.id}`}>
                 <Button variant="outline">View</Button></Link>

                  <Link
                    to={`/jobs/edit/${job.id}`}
                  >
                    <Button variant="outline">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      handleDelete(job.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
        >
          Previous
        </Button>

        <span className="text-sm text-slate-500">
          Page {pagination.page} of{" "}
          {pagination.totalPages}
        </span>

        <Button
          disabled={
            page >= pagination.totalPages
          }
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Jobs;