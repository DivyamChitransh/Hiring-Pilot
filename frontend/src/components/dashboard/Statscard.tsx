import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  actionLabel,
  onAction,
}: StatsCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-bold text-slate-800">
            {value}
          </h3>

          {actionLabel && onAction && (
            <Button
              size="sm"
              variant="link"
              className="mt-1 h-auto p-0"
              onClick={onAction}
            >
              {actionLabel}
            </Button>
          )}
        </div>

        <div className="rounded-lg bg-slate-100 p-2">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;