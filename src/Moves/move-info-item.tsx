import { ReactNode } from "react";

interface MoveInfoItemProps {
  label: string;
  children: ReactNode;
}

export default function MoveInfoItem({ label, children }: MoveInfoItemProps) {
  return (
    <div className="p-3 rounded-md">
      <p className="">{label}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
