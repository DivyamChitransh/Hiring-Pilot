import { ReactNode } from "react";

interface AuthCardProps {title: string;subtitle: string;children: ReactNode;}

const AuthCard = ({title,subtitle,children,}: AuthCardProps) => {
  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-slate-900">Hiring</span>{" "}
          <span className="text-blue-600">Pilot</span>
        </h1>

        <p className="mt-2 text-slate-500">
          Smart Recruitment Platform
        </p>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {title}
        </h2>

        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
};

export default AuthCard;