import {BriefcaseBusiness,LayoutDashboard,User} from "lucide-react";

export const candidateMenu = [
  {
    title: "Dashboard",
    path: "/candidate/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Profile",
    path: "/candidate",
    icon: User,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: BriefcaseBusiness,
  },
];

export const recruiterMenu = [
  {
    title: "Dashboard",
    path: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
];

export const adminMenu = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];