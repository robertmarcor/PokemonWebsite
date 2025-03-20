import { Pokemon } from "../../models";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function PokemonHeader({ className, children }: Props) {
  return <div className={className}>{children}</div>;
}

export default PokemonHeader;
