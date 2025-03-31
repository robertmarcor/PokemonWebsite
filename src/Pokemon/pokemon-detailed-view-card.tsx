import { cn } from "@/lib/utils";
import { Pokemon, PokemonSpecies } from "../models";
import React from "react";

type Props = {
  children?: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
  title?: string;
  className?: string;
};

function PokemonDetailCard({ children, ref, title, className }: Props) {
  return (
    <section
      ref={ref}
      className={cn(
        className,
        "w-full px-4 py-6",
        "bg-background-secondary rounded-xl border",
        "transition-colors duration-300 shadow-lg"
      )}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default PokemonDetailCard;
