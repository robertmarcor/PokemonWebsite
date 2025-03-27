import { Move, MoveFlavorText, VerboseEffect } from "@/models";
import { getTypeGradient, getTypeColor, getTypeBorderColor } from "@/data/colors";
import MoveInfoItem from "./move-info-item";
import TypeBadge from "@/Components/ui/type-badge";
import { getText } from "@/utils/utils";

interface MoveDetailedViewCardProps {
  move: Move;
}

export default function MoveDetailedViewCard({ move }: MoveDetailedViewCardProps) {
  return (
    <article
      className={`border-2 ${getTypeBorderColor(
        move.type.name
      )} rounded-lg shadow-md dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900`}>
      <MoveHeader name={move.name} id={move.id} type={move.type.name} />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <MoveBasicInfo
            type={move.type.name}
            category={move.damage_class?.name}
            power={move.power}
            accuracy={move.accuracy}
            pp={move.pp}
          />

          <MoveDescriptionSection
            description={
              getText<MoveFlavorText>(move.flavor_text_entries)?.flavor_text || "missing data"
            }
            effect={getText<VerboseEffect>(move.effect_entries)?.effect || "missing data"}
          />
        </div>
      </div>
    </article>
  );
}

interface MoveHeaderProps {
  name: string;
  id: number;
  type: string;
}
const MoveHeader = ({ name, id, type }: MoveHeaderProps) => {
  return (
    <header className={`${getTypeGradient(type)} p-6 text-white`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold capitalize">{name}</h1>
        <span className="px-3 py-1 rounded-full bg-black/40">#{id}</span>
      </div>
    </header>
  );
};

interface MoveBasicInfoProps {
  type: string;
  category: string | undefined;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
}

const MoveBasicInfo = ({ type, category, power, accuracy, pp }: MoveBasicInfoProps) => {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold">Move Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <MoveInfoItem label="Type">
          <TypeBadge type={type} />
        </MoveInfoItem>

        <MoveInfoItem label="Category">{category || "—"}</MoveInfoItem>

        <MoveInfoItem label="Power">{power || "—"}</MoveInfoItem>

        <MoveInfoItem label="Accuracy">{accuracy ? `${accuracy}%` : "—"}</MoveInfoItem>

        <MoveInfoItem label="PP">{pp || "—"}</MoveInfoItem>
      </div>
    </section>
  );
};

interface MoveDescriptionSectionProps {
  description: string;
  effect: string;
}

const MoveDescriptionSection = ({ description, effect }: MoveDescriptionSectionProps) => {
  return (
    <section>
      <p>{description}</p>
      <p>{effect}</p>
    </section>
  );
};
