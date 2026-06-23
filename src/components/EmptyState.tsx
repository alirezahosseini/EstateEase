import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "No results found",
  description = "Try adjusting your filters or search query.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
        <FontAwesomeIcon icon={faInbox} className="text-2xl" />
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-[240px] text-sm text-slate-500">{description}</p>
    </div>
  );
}
