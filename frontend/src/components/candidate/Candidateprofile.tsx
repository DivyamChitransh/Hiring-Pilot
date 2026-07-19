import { Link } from "react-router-dom";
import {Briefcase,Building2,FileText,Globe,GraduationCap,MapPin,Pencil,User} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/Candidate";
interface CandidateProfileCardProps {
  candidate: Candidate;
}

const CandidateProfileCard = ({candidate}: CandidateProfileCardProps) => {
  const profileImage = candidate.profile_image ? `${import.meta.env.VITE_SERVER_URL}/${candidate.profile_image}` : null;
  const resumeUrl = candidate.resume ? `${import.meta.env.VITE_SERVER_URL}/${candidate.resume}` : null;
  const skills = candidate.skills ? candidate.skills.split(",").map((skill) => skill.trim()).filter(Boolean) : [];
  const initials = candidate.headline ? candidate.headline.split(" ").map((word) => word[0]).join("").slice(0, 2).toUpperCase() : "";

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <div className="relative overflow-hidden rounded-3xl shadow-lg">
        <div className="h-40 rounded-t-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500" />        
        <div className="relative px-10 pb-4">
            <div className="-mt-28 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">            
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {profileImage ? ( 
                <img src={profileImage} alt="Profile" className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"/>) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-slate-200 text-4xl font-bold text-slate-700 shadow-lg">
                  {initials}
                </div>
              )}

              <div className="mb-6 space-y-2 text-white">
                <h1 className="text-4xl font-bold text-white">
                  {candidate.headline}
                </h1>

                <div className="flex flex-wrap gap-5 text-blue-100">
                  {candidate.current_company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>{candidate.current_company}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{candidate.current_location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{candidate.experience} Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/candidate/edit">
              <Button variant="secondary" className="gap-2 border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                <Pencil className="h-4 w-4" />Edit Profile</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">About Me</h2>
          </div>
          <p className="leading-7 text-slate-600">
            {candidate.bio || "No bio added yet."}
          </p>
        </div>
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <h2 className="mb-5 text-xl font-semibold">Contact & Links</h2>
          <div className="space-y-4">
            {candidate.portfolio_url && (
              <a href={candidate.portfolio_url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border p-3 transition hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span>Portfolio</span>
                </div>
                <span className="text-sm font-medium text-blue-600">Visit</span>
              </a>
            )}

            {candidate.linkedin_url && (
              <a href={candidate.linkedin_url} target="_blank"rel="noreferrer" className="flex items-center justify-between rounded-xl border p-3 transition hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-blue-600">LinkedIn</span>
                </div>
                <span className="text-sm font-medium text-blue-600">Visit</span>
              </a>
            )}

            {candidate.github_url && (
              <a href={candidate.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl border p-3 transition hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="h-5 w-5 text-blue-600">GitHub</span>
                </div>
                <span className="text-sm font-medium text-blue-600">Visit</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <h2 className="mb-6 text-xl font-semibold">Skills</h2>
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">{skill}</span>
            ))}
          </div>
        ) : (<p className="text-slate-500">No skills added.</p>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Career</h2>
          </div>
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Experience</span>
              <span className="font-semibold">
                {candidate.experience} Years
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Current Company</span>
              <span className="font-semibold">
                {candidate.current_company || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Current CTC</span>
              <span className="font-semibold">
                {candidate.current_ctc || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Expected CTC</span>
              <span className="font-semibold">
                {candidate.expected_ctc || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Notice Period</span>
              <span className="font-semibold">
                {candidate.notice_period ? `${candidate.notice_period} Days` : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="mb-6 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Education</span>
              <span className="font-semibold">
                {candidate.education || "-"}
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-500">Current Location</span>
              <span className="font-semibold">
                {candidate.current_location}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Preferred Location</span>
              <span className="font-semibold">
                {candidate.preferred_location || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-100 p-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold">Resume</h2>
              <p className="mt-1 text-slate-500">{candidate.resume ? candidate.resume.split("/").pop() : "No resume uploaded"}
              </p>
            </div>
          </div>

          {resumeUrl && (<a href={resumeUrl} target="_blank" rel="noreferrer">
            <Button>View Resume</Button></a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileCard;