import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getCandidateProfile } from "@/api/candidate";
import CandidateProfileCard from "@/components/candidate/Candidateprofile"
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/Candidate";

const CandidateProfile = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {fetchCandidate()}, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-lg font-medium text-slate-500">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Candidate Profile Not Found
        </h2>
        <p className="text-slate-500">
          Create your profile to start applying for jobs.
        </p>
        <Link to="/candidate/create">
          <Button>Create Profile</Button>
        </Link>
      </div>
    );
  }

  return <CandidateProfileCard candidate={candidate} />;
};

export default CandidateProfile;