import {MapPin,Briefcase,IndianRupee,Building2} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Job } from "@/types/jobs";

interface JobCardProps {
  job: Job;
  variant?: "dashboard" | "candidate" | "recruiter" | "admin";
  onAction?: (job: Job) => void;
}

function formatSalary(
  min?: number | null,
  max?: number | null
) {
  if (!min || !max) return "Not Disclosed";

  function format(value: number) {
    const lpa = value / 100000;

    return Number.isInteger(lpa)
      ? `${lpa} LPA`
      : `${lpa.toFixed(1)} LPA`;
  }

  return `${format(min)} - ${format(max)}`;
}

const JobCard = ({job,variant = "dashboard",onAction}: JobCardProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction(job);
      return;
    }

    switch (variant) {
      case "candidate":
        navigate(`/jobs/${job.id}`);
        break;

      case "recruiter":
        navigate(`/jobs/edit/${job.id}`);
        break;

      case "admin":
        navigate(`/jobs/${job.id}`);
        break;

      default:
        navigate(`/jobs/${job.id}`);
        break;
    }
  };

  const getButtonText = () => {
    switch (variant) {
      case "candidate":
        return "Apply Now";

      case "recruiter":
        return "Edit Job";

      case "admin":
        return "Manage";

      default:
        return "View Details";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-slate-100">
            {job.company_logo ? (
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/${job.company_logo}`}
                alt={job.company_name}
                className="h-full w-full rounded-lg object-cover"
              />
            ) : (
              <Building2 className="h-7 w-7 text-slate-500" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {job.title}
            </h3>

            <p className="mt-1 text-base text-slate-500">
              {job.company_name}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
            job.status === "Open"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {job.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-base text-slate-700">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-slate-500" />
          {job.work_mode}
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-slate-500" />
          {job.experience_min} - {job.experience_max} Years
        </div>

        <div className="flex items-center gap-2">
  <IndianRupee className="h-5 w-5 text-slate-500" />
  {formatSalary(job.salary_min, job.salary_max)}
</div>

        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-slate-500" />
          {job.location || "Not specified"}
        </div>
      </div>

      {/* Skills */}
      {job.skills && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.split(",").map((skill) => (
            <span
              key={skill.trim()}
              className="rounded-full bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="-mx-5 -mb-5 mt-5 flex items-center justify-end gap-3 border-t bg-slate-50 px-5 py-3">
        <Button
          variant="outline"
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          View Details
        </Button>

        {variant === "dashboard" ? (
          <Button>
            Apply Now
          </Button>
        ) : (
          <Button onClick={handleAction}>
            {getButtonText()}
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;