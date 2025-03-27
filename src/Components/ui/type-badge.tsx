import { getTypeColor, getTypeRingColor } from "../../data/colors";

type Props = {
  type: string;
  className?: string;
};

function TypeBadge({ type, className }: Props) {
  const color = getTypeColor(type);
  const ring = getTypeRingColor(type);

  return (
    <div
      key={type}
      className={`${className} uppercase px-4 ${color} rounded-md text-white font-bold shadow-md ${ring}`}>
      <span className={`text-shadow shadow-black`}>{type}</span>
    </div>
  );
}

export default TypeBadge;
