import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getUser } from "@/utils/auth";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Clock,
  CalendarDays,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getJobById } from "@/api/jobs";
import type { Job } from "@/types/jobs";

const JobDetails = () => {
  const { id } = useParams();
  const user = getUser();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const { data } = await getJobById(Number(id));

      setJob(data.data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to fetch job"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <div className="flex items-start justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {job.title}
            </h1>

            <div className="mt-3 flex flex-wrap gap-4 text-slate-600">

              <span className="flex items-center gap-2">
                <Building2 size={18} />
                {job.company_name}
              </span>

              {job.location && (
                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </span>
              )}
            </div>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              job.status === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {job.status}
          </span>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Employment Type
            </p>

            <p className="mt-1 font-medium">
              {job.employment_type}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Work Mode
            </p>

            <p className="mt-1 font-medium">
              {job.work_mode}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Experience
            </p>

            <p className="mt-1 font-medium">
              {job.experience_min} - {job.experience_max} Years
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Salary
            </p>

            <p className="mt-1 font-medium">
              ₹{job.salary_min?.toLocaleString()} - ₹
              {job.salary_max?.toLocaleString()}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Openings
            </p>

            <p className="mt-1 font-medium">
              {job.openings}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-slate-500">
              Deadline
            </p>

            <p className="mt-1 font-medium">
              {job.application_deadline}
            </p>
          </div>

        </div>

        {job.skills && (
          <div className="mt-8">

            <h2 className="mb-3 text-xl font-semibold">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {job.skills
                .split(",")
                .map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}

            </div>

          </div>
        )}

        <div className="mt-8">

          <h2 className="mb-3 text-xl font-semibold">
            Job Description
          </h2>

          <p className="leading-7 text-slate-600">
            {job.description}
          </p>

        </div>
        <div className="mt-8 flex gap-3">
          {user?.role === "candidate" ? (<Button>Apply Now</Button>) : (<>
           <Link to={`/jobs/edit/${job.id}`}>
            <Button>Edit Job</Button>
          </Link>
            <Button variant="outline">View Applications</Button>
          </>)}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;