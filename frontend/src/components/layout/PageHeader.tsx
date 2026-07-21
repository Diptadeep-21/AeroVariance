import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-serif text-[30px] font-semibold tracking-tight text-[#111827]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-[#6B7280]">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}