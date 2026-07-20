import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {Briefcase,MapPin,User,FileText} from "lucide-react";
import { getCandidateProfile } from "@/api/candidate";
import { getJobs } from "@/api/jobs";
import type { Candidate } from "@/types/Candidate";
import type { Job } from "@/types/jobs";
import StatsCard from "@/components/dashboard/Statscard";
import JobCard from "@/components/jobs/Jobcard";
import ApplicationSummary from "@/components/dashboard/Applicationsummary";

const CandidateDashboard = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [candidateResponse, jobsResponse] = await Promise.all([
        getCandidateProfile(),
        getJobs({
          page: 1,
          limit: 5,
        }),
      ]);

      setCandidate(candidateResponse.data.data);

      setJobs(jobsResponse.data.data);

      setTotalJobs(jobsResponse.data.pagination.total);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex h-96 items-center justify-center">
        Candidate profile not found.
      </div>
    );
  }

 return (
  <div className="space-y-8">
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
      <h1 className="text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-2 text-blue-100">
        Discover your next opportunity today.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Available Jobs"
        value={totalJobs}
        icon={Briefcase}
      />

      <StatsCard
        title="Experience"
        value={`${candidate.experience} Years`}
        icon={User}
      />

      <StatsCard
        title="Location"
        value={candidate.current_location}
        icon={MapPin}
      />

      <StatsCard
        title="Resume"
        value={candidate.resume ? "Uploaded" : "Pending"}
        icon={FileText}
        actionLabel={candidate.resume ? "Download" : undefined}
        onAction={
          candidate.resume
            ? () => {
                const link = document.createElement("a");
                link.href = `${import.meta.env.VITE_SERVER_URL}/${candidate.resume}`;
                link.download = "";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            : undefined
        }
      />
    </div>

    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
  <div className="xl:col-span-2">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        Latest Jobs
      </h2>
    </div>

    <div className="space-y-5">
      {jobs.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          No jobs available.
        </div>
      ) : (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            variant="dashboard"
          />
        ))
      )}
    </div>
  </div>

  <div>
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        Application Summary
      </h2>
    </div>

    <ApplicationSummary
      applied={0}
      pending={0}
      shortlisted={0}
      interview={0}
      rejected={0}
    />
  </div>
</div>
  </div>
);
};

export default CandidateDashboard;