import { cn } from "../../lib/utils";

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

export const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <tr
      className={cn(
        "fade-border",
        "odd:bg-black/[.05] even:bg-black/[.01] dark:odd:bg-black/30 dark:even:bg-black/10"
      )}>
      {/* Fading border element */}
      <td className="font-semibold p-1.5 z-10">{label}:</td>
      <td className="font-sans capitalize p-1.5 z-10">{value}</td>
    </tr>
  );
};
