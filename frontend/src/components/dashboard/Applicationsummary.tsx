import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ApplicationSummaryProps {
  applied: number;
  pending: number;
  shortlisted: number;
  interview: number;
  rejected: number;
}

const ApplicationSummary = ({
  applied,
  pending,
  shortlisted,
  interview,
  rejected,
}: ApplicationSummaryProps) => {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Applied",
      value: applied,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Pending",
      value: pending,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Shortlisted",
      value: shortlisted,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Interview",
      value: interview,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Rejected",
      value: rejected,
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="space-y-5">
  {stats.map((item) => (
    <div
      key={item.label}
      className="flex items-center justify-between"
    >
      <span className="text-base font-medium text-slate-700">
        {item.label}
      </span>

      <span
        className={`rounded-full px-4 py-2 text-base font-bold ${item.color}`}
      >
        {item.value}
      </span>
    </div>
  ))}
</div>

      <Button
        variant="outline"
        className="mt-6 w-full"
        onClick={() => navigate("/applications")}
      >
        View All Applications
      </Button>
    </div>
  );
};

export default ApplicationSummary;