import { Building2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/Candidate";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/utils/auth";
interface ProfileSummaryProps {
  candidate: Candidate;
}

const ProfileSummary = ({ candidate }: ProfileSummaryProps) => {
  const navigate = useNavigate();
  const user = getUser();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {candidate.profile_image ? (
          <img src={`${import.meta.env.VITE_SERVER_URL}/${candidate.profile_image}`} alt={user?.name} className="h-24 w-24 rounded-full border object-cover"/>) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600"> {user?.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="mt-4 text-xl font-bold text-slate-800">{user?.name}</h2>
        <p className="text-sm text-slate-500">{candidate.headline}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail className="h-4 w-4" />{user?.email}</div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          {candidate.current_location}
        </div>
        {candidate.current_company && (
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Building2 className="h-4 w-4" />
            {candidate.current_company}
          </div>
        )}

        {candidate.linkedin_url && (
          <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-blue-600 hover:underline">
            LinkedIn
          </a>
        )}

        {candidate.github_url && (
          <a href={candidate.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-blue-600 hover:underline">
            GitHub
          </a>
        )}
      </div>

      <Button className="mt-6 w-full" onClick={() => navigate("/candidate/edit")}>
        Update Profile
      </Button>
    </div>
  );
};

export default ProfileSummary;