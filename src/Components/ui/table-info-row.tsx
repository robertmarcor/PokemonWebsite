import { cn } from "../../lib/utils";

type InfoRowProps = {
  className?: string;
  label: string;
  value: React.ReactNode;
};

export const InfoRow = ({ label, value, className }: InfoRowProps) => {
  return (
    <tr
      className={cn(
        className,
        "fade-border",
        "odd:bg-black/[.05] even:bg-black/[.01] dark:odd:bg-black/30 dark:even:bg-black/10"
      )}>
      {/* Fading border element */}
      <td className="p-1.5 z-10">{label}:</td>
      <td className="font-sans capitalize p-1.5 z-10">{value}</td>
    </tr>
  );
};
