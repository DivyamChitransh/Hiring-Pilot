import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Calendar,
  Code2,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  MapPin,
  Pencil,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Candidate } from "@/types/Candidate";

interface CandidateProfileCardProps {
  candidate: Candidate;
}

const LinkedInIcon = () => (
  <svg className="h-5 w-5 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg className="h-5 w-5 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="mb-4 flex items-center gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
      {icon}
    </div>
    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
  </div>
);

const normalizeUrl = (url?: string | null) => {
  const trimmed = url?.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const hasValue = (value?: string | null) => Boolean(value?.trim());

const CandidateProfileCard = ({ candidate }: CandidateProfileCardProps) => {
  const profileImage = candidate.profile_image
    ? `${import.meta.env.VITE_SERVER_URL}/${candidate.profile_image}`
    : null;
  const resumeUrl = candidate.resume
    ? `${import.meta.env.VITE_SERVER_URL}/${candidate.resume}`
    : null;
  const resumeFileName = candidate.resume
    ? candidate.resume.split("/").pop()
    : null;
  const skills = candidate.skills
    ? candidate.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];
  const initials = candidate.headline
    ? candidate.headline
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  const workHistory = candidate.work_history ?? [];
  const degreeLabel = candidate.degree || candidate.education;

  const metaItems = [
    candidate.current_company && {
      icon: Building2,
      label: candidate.current_company,
    },
    { icon: MapPin, label: candidate.current_location },
    degreeLabel && {
      icon: GraduationCap,
      label: degreeLabel,
    },
    {
      icon: Briefcase,
      label: `${candidate.experience} Years Experience`,
    },
  ].filter(Boolean) as { icon: typeof Building2; label: string }[];

  const contactLinks = [
    {
      label: "Portfolio",
      url: normalizeUrl(candidate.portfolio_url),
      icon: <Globe className="h-5 w-5 text-slate-700" />,
    },
    {
      label: "LinkedIn",
      url: normalizeUrl(candidate.linkedin_url),
      icon: <LinkedInIcon />,
    },
    {
      label: "GitHub",
      url: normalizeUrl(candidate.github_url),
      icon: <GitHubIcon />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* Header Banner */}
        <div className="rounded-2xl bg-blue-600 px-8 py-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-28 w-28 shrink-0 rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white/20 text-3xl font-bold text-white shadow-md">
                  {initials}
                </div>
              )}

              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                  {candidate.headline}
                </h1>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/95">
                  {metaItems.map((item, index) => (
                    <Fragment key={item.label}>
                      {index > 0 && (
                        <span className="hidden text-white/40 sm:inline">|</span>
                      )}
                      <div className="flex items-center gap-1.5">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/candidate/edit" className="shrink-0 self-start lg:self-center">
              <Button
                variant="outline"
                className="gap-2 rounded-lg border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content — Left + Right columns */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* About Me */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<User className="h-4 w-4" />}
                title="About Me"
              />
              <p className="leading-7 text-slate-600">
                {candidate.bio || "No bio added yet."}
              </p>
            </div>

            {/* Skills */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<Code2 className="h-4 w-4" />}
                title="Skills"
              />
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">No skills added.</p>
              )}
            </div>

            {/* Work Experience */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <SectionHeader
                icon={<Briefcase className="h-4 w-4" />}
                title="Work Experience"
              />
              {workHistory.length > 0 ? (
                <div className="space-y-4">
                  {workHistory.map((job, index) => (
                    <div
                      key={`${job.company}-${job.role}-${index}`}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{job.role}</p>
                          <p className="text-sm font-medium text-blue-600">
                            {job.company}
                          </p>
                        </div>
                        <p className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {job.start_date} - {job.end_date}
                        </p>
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        {job.location}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  No previous work experience added.
                </p>
              )}
            </div>
          </div>

          {/* Right Column — Contact & Links */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<Globe className="h-4 w-4" />}
              title="Contact & Links"
            />
            <div className="space-y-3">
              {contactLinks.map((link) =>
                link.url ? (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span className="font-medium text-slate-800">
                        {link.label}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-blue-600">
                      Visit
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </a>
                ) : (
                  <div
                    key={link.label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 opacity-60"
                  >
                    <div className="flex items-center gap-3">
                      {link.icon}
                      <span className="font-medium text-slate-800">
                        {link.label}
                      </span>
                    </div>
                    <span className="text-sm text-slate-400">Not added</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row — Education, Location, Resume */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Education */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<GraduationCap className="h-4 w-4" />}
              title="Education"
            />
            {candidate.degree || candidate.education || candidate.education_timeline ? (
              <div className="space-y-1">
                {(candidate.degree || candidate.education) && (
                  <p className="font-semibold text-slate-900">
                    {candidate.degree || candidate.education}
                  </p>
                )}
                {candidate.degree && candidate.education && (
                  <p className="text-sm text-slate-500">{candidate.education}</p>
                )}
                {candidate.education_timeline && (
                  <p className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {candidate.education_timeline}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No education added.</p>
            )}
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<MapPin className="h-4 w-4" />}
              title="Location"
            />
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Current Location
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {candidate.current_location}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Preferred Location
                </p>
                <p className="mt-1 font-semibold text-slate-900">
                  {hasValue(candidate.preferred_location)
                    ? candidate.preferred_location
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Resume */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <SectionHeader
              icon={<FileText className="h-4 w-4" />}
              title="Resume"
            />
            {resumeUrl && resumeFileName ? (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="h-8 w-8 shrink-0 text-blue-600" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {resumeFileName}
                    </p>
                    <p className="text-sm text-slate-500">PDF</p>
                  </div>
                </div>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-blue-600"
                >
                  <Download className="h-4 w-4" />
                </a>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No resume uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileCard;
