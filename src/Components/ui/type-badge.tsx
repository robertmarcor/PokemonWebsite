import { cn } from "@/lib/utils";
import { getTypeColor, getTypeRingColor } from "../../data/colors";

type Props = {
  type: string;
  className?: string;
};

function TypeBadge({ type, className }: Props) {
  const color = getTypeColor(type);
  const ring = getTypeRingColor(type);

  return (
    <span
      className={cn(
        className,
        ring,
        color,
        "uppercase px-2 rounded-md text-red-400 font-semibold text-shadow type-badge shadow-black"
      )}>
      {type}
    </span>
  );
}

export default TypeBadge;
