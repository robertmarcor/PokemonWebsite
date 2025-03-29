import { getTypeColor } from "@/data/colors";

interface MoveTypeBadgeProps {
  type: string;
}

export default function MoveTypeBadge({ type }: MoveTypeBadgeProps) {
  return (
    <div className={`inline-block px-3 py-1 rounded-full text-white ${getTypeColor(type)}`}>
      {type}
    </div>
  );
}
